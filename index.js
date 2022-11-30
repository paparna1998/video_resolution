(function () {

const express = require("express"); 
const ffmpeg = require("fluent-ffmpeg");
const app = express(); 
const PORT = process.env.PORT || 3000; 

app.use(express.json());

const videoResolns = [
    {id:1, resolutionHD:"1280x720.mp4"},
    {id:2, resolutionFullHD:"1920x1080.mp4"},
    {id:3, resolutionQHD:"2560x1440.mp4"}
]

// For testing purposes 
app.get("/", (req, res) => { 
    res.send("Hello World"); 
}); 

app.get("/api/videoResolns", (req, res) => { 
    res.send(videoResolns); 
}); 

app.post("/api/videoResolns", (req, res) => { 
    const videoResoln = {
        id: videoResolns.length + 1,
        name: req.body.name
    };
    videoResolns.push(videoResoln);
    app.send(videoResoln);
}); 

app.get("/api/videoResolns/:id", (req, res) => { 
    const videoResoln = videoResolns.find(c => c.id === parseInt(req.params.id));
    if(!videoResoln) res.status(404).send('The videoResoln with the given Id was not found');
    res.send(videoResoln); 
}); 

    
    const args = process.argv.slice(2)

    //get name without extension
    function baseName(str){
        let base = new String(str).substring(str.lastIndexOf('/') + 1)
        if(base.lastIndexOf(".") != -1){
            base = base.substring(0,base.lastIndexOf("."));
        }

        return base;
    }

    args.forEach((val)=>{
        let filename = val

        console.log(val)

        let basename = baseName(filename)

        console.log(basename)

        ffmpeg(filename) 

        //Generate 720P video

        .output(basename + "-" + videoResolns[0].resolutionHD)
        .videoCodec('libx264')
        .noAudio()
        .size(videoResolns[0].resolutionHD)


        //Generate 1080P video
        .output(basename + "-" + videoResolns[1].resolutionFullHD)
        .videoCodec('libx264')
        .noAudio()
        .size(JSON.stringify(videoResolns[1].resolutionFullHD))


        //Generate 1440P video
        .output(basename + "-" + videoResolns[2].resolutionQHD)
        .videoCodec('libx264')
        .noAudio()
        .size(JSON.stringify(videoResolns[2].resolutionQHD))

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
    })

app.listen(PORT, () => { 
    console.log(`API is listening on port ${PORT}`); 
});

})()