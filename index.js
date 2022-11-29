(function () {

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

        ffmpeg(filename) 

        //Generate 720P video
        .output(basename + "-1280x720.mp4")
        .videoCodec('libx264')
        .noAudio()
        .size('1280x720')


        //Generate 1080P video
        .output(basename + "-1920x1080.mp4")
        .videoCodec('libx264')
        .noAudio()
        .size('1920x1080')


        //Generate 1440P video
        .output(basename + "-2560x1440.mp4")
        .videoCodec('libx264')
        .noAudio()
        .size('2560x1440')

        //Generate 1080P video
        .output(basename + "-2048 x 1080.mp4")
        .videoCodec('libx264')
        .noAudio()
        .size('2048 x 1080')

        //Generate 2160P video
        .output(basename + "-3840 x 2160.mp4")
        .videoCodec('libx264')
        .noAudio()
        .size('3840 x 2160')


        //Generate 4320P video
        .output(basename + "-7680 x 4320.mp4")
        .videoCodec('libx264')
        .noAudio()
        .size('7680 x 4320')







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

})()