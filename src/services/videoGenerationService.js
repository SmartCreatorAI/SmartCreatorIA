const ffmpeg = require('fluent-ffmpeg');
const path = require('path');

exports.createVideo = async (text, options = {}) => {
    const {
        inputImage = './public/templates/videoTemplate.mp4',
        audioPath = './public/uploads/audio.mp3',
        outputFormat = 'mp4',
        subtitles = null,
    } = options;

    const outputVideo = `./public/uploads/output.${outputFormat}`;

    return new Promise((resolve, reject) => {
        let command = ffmpeg(inputImage)
            .input(audioPath)
            .videoCodec('libx264')
            .audioCodec('aac')
            .format(outputFormat)
            .outputOptions('-shortest') // Ensures video length matches audio
            .output(outputVideo);

        if (subtitles) {
            const subtitlesPath = path.resolve('./public/uploads/subtitles.srt');
            fs.writeFileSync(subtitlesPath, subtitles, 'utf-8');
            command = command.input(subtitlesPath).outputOptions('-vf subtitles=subtitles.srt');
        }

        command
            .on('end', () => resolve(outputVideo))
            .on('error', reject)
            .run();
    });
};