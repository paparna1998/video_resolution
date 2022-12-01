(function () {

const express = require("express"); 
const ffmpeg = require("fluent-ffmpeg");
const app = express(); 
const PORT = process.env.PORT || 3001; 

app.use(express.json());

const videoResolns = [
  {id:1, resolutionHD:"1280x720.mp4"},
  {id:2, resolutionFullHD:"1920x1080.mp4"},
  {id:3, resolutionQHD:"2560x1440.mp4"}
]

    const videoBitrates = [
        {id:1, bitrateHD:"1000k"},
        {id:2, bitrateFullHD:"8000k"},
        {id:3, bitrateQHD:"16000k"}
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
          //Generate 720P video
          // console.log(1)
        ffmpeg(filename) 
          .output(basename + "-" + videoResolns[0].resolutionHD)
          .videoCodec('libx264')
          .noAudio()
          .size(videoResolns[0].resolutionHD)
          .videoBitrate(videoBitrates[0].bitrateHD , true)
          .videoBitrate(videoBitrates[0].bitrateFullHD , true)
          .videoBitrate(videoBitrates[0].bitrateQHD , true)
          .on('error',(err)=>{
            console.log(err)
          })
          .on('progress',(progress)=>{
            console.log('... frames' + progress.frames)
          })
          .on('end',()=>{
            console.log('Finished processing.')
          })
          .run()
          }

          else if(req.params.id == 2){
            console.log(filename)
          ffmpeg(filename) 
          .output(basename + "-" + videoResolns[1].resolutionFullHD)
          .videoCodec('libx264')
          .noAudio()
          .size(videoResolns[1].resolutionFullHD)
          .videoBitrate(videoBitrates[1].bitrateHD , true)
          .videoBitrate(videoBitrates[1].bitrateFullHD , true)
          .videoBitrate(videoBitrates[1].bitrateQHD , true)
          .on('error',(err)=>{
            console.log(err)
          })
          .on('progress',(progress)=>{
            console.log('... frames' + progress.frames)
          })
          .on('end',()=>{
            console.log('Finished processing.')
          })
          .run()
          }
          else{
          ffmpeg(filename) 
          .output(basename + "-" + videoResolns[2].resolutionQHD)
          .videoCodec('libx264')
          .noAudio()
          .size(videoResolns[2].resolutionQHD)
          .videoBitrate(videoBitrates[2].bitrateHD , true)
          .videoBitrate(videoBitrates[2].bitrateFullHD , true)
          .videoBitrate(videoBitrates[2].bitrateQHD , true)
          .on('error',(err)=>{
            console.log(err)
          })
          .on('progress',(progress)=>{
            console.log('... frames' + progress.frames)
          })
          .on('end',()=>{
            console.log('Finished processing.')
          })
          .run()
          }
    })
    res.send(videoBitrate); 
  }); 

app.listen(PORT, () => { 
    console.log(`API is listening on port ${PORT}`); 
});

})()



