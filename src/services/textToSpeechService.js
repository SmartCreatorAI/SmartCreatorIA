const fs = require('fs');
const util = require('util');
const textToSpeech = require('@google-cloud/text-to-speech');

const client = new textToSpeech.TextToSpeechClient();

exports.generateAudio = async (text, options = {}) => {
    if (!text) throw new Error("Text is required for TTS generation.");

    const {
        languageCode = 'en-US',
        ssmlGender = 'NEUTRAL',
        speakingRate = 1.0,
        pitch = 0.0,
    } = options;

    const request = {
        input: { text },
        voice: { languageCode, ssmlGender },
        audioConfig: { audioEncoding: 'MP3', speakingRate, pitch },
    };

    const [response] = await client.synthesizeSpeech(request);

    const writeFile = util.promisify(fs.writeFile);
    const outputPath = './public/uploads/audio.mp3';

    await writeFile(outputPath, response.audioContent, 'binary');
    return outputPath;
};