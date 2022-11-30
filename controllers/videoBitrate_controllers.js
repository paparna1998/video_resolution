(function () {

const express = require("express"); 
const ffmpeg = require("fluent-ffmpeg");
const app = express(); 
const PORT = process.env.PORT || 3001; 

app.use(express.json());

    const videoBitrates = [
        {id:1, bitrateHD:"5000kbps"},
        {id:2, bitrateFullHD:"8000kbps"},
        {id:3, bitrateQHD:"16000kbps"}
    ]

// For testing purposes 
app.get("/", (req, res) => { 
    res.send("Hello World"); 
}); 

app.get("/api/videoBitrates", (req, res) => { 
    res.send(videoBitrates); 
}); 

app.post("/api/videoBitrates", (req, res) => { 
    const videoBitrate = {
        id: videoBitrates.length + 1,
        name: req.body.name
    };
    videoBitrates.push(videoBitrate);
    app.send(videoBitrate);
}); 

app.get("/api/videoBitrates/:id", (req, res) => { 
    const videoBitrate = videoBitrates.find(c => c.id === parseInt(req.params.id));
    if(!videoBitrate) res.status(404).send('The videoBitrate with the given Id was not found');
    
    // const args = process.argv.slice(2)
    const args  = ['video.mp4'];

    //get name without extension
    function baseName(str){
        let base = new String(str).substring(str.lastIndexOf('/') + 1)
        if(base.lastIndexOf(".") != -1){
            base = base.substring(0,base.lastIndexOf("."));
        }

        return base;
    }

    console.log(args);
    args.forEach((val)=>{
        let filename = val

        // console.log(val)

        var basename = baseName(filename)

        // console.log(basename)

        
        if(req.params.id == 1){
        ffmpeg(filename)
        .output(basename + "-" + videoBitrates[0].bitrateHD)
        .videoCodec('libx264')
        .noAudio()
        .size(videoBitrates[0].bitrateHD)
        .videoBitrate(1000)
        // .videoBitrate('1000')
        // .videoBitrate('1000k')
        // .videoBitrate('1000k', true)
          }

        
        else if(req.params.id == 2){
            ffmpeg(filename)
            .output(basename + "-" + videoBitrates[1].bitrateFullHD)
            .videoCodec('libx264')
            .noAudio()
            .size(videoBitrates[0].bitrateFullHD)
            .videoBitrate(1000)
            .videoBitrate('1000')
            .videoBitrate('1000k')
            .videoBitrate('1000k', true)
            } 
            
            
        else {
            ffmpeg(filename)
            .output(basename + "-" + videoBitrates[2].bitrateQHD)
            .videoCodec('libx264')
            .noAudio()
            .size(videoBitrates[0].bitrateQHD)
            .videoBitrate(1000)
            .videoBitrate('1000')
            .videoBitrate('1000k')
            .videoBitrate('1000k', true)
            }
    })
    res.send(videoBitrate); 
  }); 

app.listen(PORT, () => { 
    console.log(`API is listening on port ${PORT}`); 
});

})()



