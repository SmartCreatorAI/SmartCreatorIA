
const ttsService = require('../services/textToSpeechService');

exports.generateAudio = async (req, res) => {
    try {
        const audioPath = await ttsService.generateAudio(req.body.text);
        res.status(200).json({ message: 'Audio created', audioPath });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
