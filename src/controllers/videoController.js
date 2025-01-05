
const videoService = require('../services/videoGenerationService');

exports.generateVideo = async (req, res) => {
    try {
        const videoPath = await videoService.createVideo(req.body.text);
        res.status(200).json({ message: 'Video created', videoPath });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
