
const express = require('express');
const videoController = require('../controllers/videoController');
const audioController = require('../controllers/audioController');
const youtubeController = require('../controllers/youtubeController');

const router = express.Router();

router.post('/generate-video', videoController.generateVideo);
router.post('/generate-audio', audioController.generateAudio);
router.post('/upload', youtubeController.uploadVideo);

module.exports = router;
