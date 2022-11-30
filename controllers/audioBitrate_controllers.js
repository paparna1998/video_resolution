(function () {

    const express = require("express"); 
    const ffmpeg = require("fluent-ffmpeg");
    const app = express(); 
    const PORT = process.env.PORT || 3001; 
    
    app.use(express.json());
    
        const audioBitrates = [
            {id:1, bitrateHD:"160Kbps"},
            {id:2, bitrateFullHD:"320Kbps"},
            {id:3, bitrateQHD:"1411Kbps"}
        ]
    
    // For testing purposes 
    app.get("/", (req, res) => { 
        res.send("Hello World"); 
    }); 
    
    app.get("/api/audioBitrates", (req, res) => { 
        res.send(audioBitrates); 
    }); 
    
    app.post("/api/audioBitrates", (req, res) => { 
        const audioBitrate = {
            id: audioBitrates.length + 1,
            name: req.body.name
        };
        audioBitrates.push(audioBitrate);
        app.send(audioBitrate);
    }); 
    
    app.get("/api/audioBitrates/:id", (req, res) => { 
        const audioBitrate = audioBitrates.find(c => c.id === parseInt(req.params.id));
        if(!audioBitrate) res.status(404).send('The audioBitrate with the given Id was not found');
        
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
            .output(basename + "-" + audioBitrates[0].bitrateHD)
            .audioCodec('libmp3lame')
            .noAudio()
            .size(audioBitrates[0].bitrateHD)
            .audioBitrate(128)
            .audioBitrate('128')
            .audioBitrate('128k')
            }
    
            
            else if(req.params.id == 2){
                ffmpeg(filename)
                .output(basename + "-" + audioBitrates[1].bitrateFullHD)
                .audioCodec('libmp3lame')
                .noAudio()
                .size(audioBitrates[0].bitrateFullHD)
                .audioBitrate(128)
                .audioBitrate('128')
                .audioBitrate('128k')
                } 
                
                
            else {
                ffmpeg(filename)
                .output(basename + "-" + audioBitrates[2].bitrateQHD)
                .audioCodec('libmp3lame')
                .noAudio()
                .size(audioBitrates[0].bitrateQHD)
                .audioBitrate(128)
                .audioBitrate('128')
                .audioBitrate('128k')
                }
        })
        res.send(audioBitrate); 
      }); 
    
    app.listen(PORT, () => { 
        console.log(`API is listening on port ${PORT}`); 
    });
    
    })()
    
    
    
    