(function () {

    const express = require("express"); 
    const app = express(); 
    const PORT = process.env.PORT || 3000; 
    
    app.use(express.json());
    
    const videoBitrates = [
        {id:1, bitrateHD:"1000"},
        {id:2, bitrateFullHD:"2500"},
        {id:3, bitrateQHD:"5000"}
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
        videoResolns.push(videoBitrate);
        app.send(videoBitrate);
    }); 
    
    app.get("/api/videoBitrates/:id", (req, res) => { 
        const videoBitrate = videoBitrates.find(c => c.id === parseInt(req.params.id));
        if(!videoBitrate) res.status(404).send('The videoResoln with the given Id was not found');
        res.send(videoBitrate); 
    }); 
    
    
        const ffmpeg = require("fluent-ffmpeg")
        
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


        ffmpeg(filename).videoBitrate(1000);
        ffmpeg(filename).videoBitrate('1000');
        ffmpeg(filename).videoBitrate('1000k');
        ffmpeg(filename).videoBitrate('1000k', true);
    
        })

    
    app.listen(PORT, () => { 
        console.log(`API is listening on port ${PORT}`); 
    });
    
    })()