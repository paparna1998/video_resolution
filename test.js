const express = require("express"); 
const app = express(); 
const PORT = process.env.PORT || 3001; 

app.use(express.json());

const videoResolns = [
    {id:1, rerolution:'1280 x 720'},
    {id:2, rerolution:'1920 x 1080'},
    {id:3, rerolution:'2560 x 1440'}
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

app.listen(PORT, () => { 
    console.log(`API is listening on port ${PORT}`); 
});