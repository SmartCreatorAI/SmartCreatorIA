
const youtubeService = require('../services/youtubeService');

exports.uploadVideo = async (req, res) => {
    try {
        const uploadStatus = await youtubeService.upload(req.body.videoPath, req.body.title, req.body.description);
        res.status(200).json({ message: 'Video uploaded', uploadStatus });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};