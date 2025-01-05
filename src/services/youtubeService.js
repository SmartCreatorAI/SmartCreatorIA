const { google } = require('googleapis');
const fs = require('fs');

exports.upload = async (videoPath, { title, description, tags = [], playlistId = null }) => {
    if (!fs.existsSync(videoPath)) throw new Error("Video file not found.");

    const auth = new google.auth.GoogleAuth({
        keyFile: './config/credentials.json',
        scopes: ['https://www.googleapis.com/auth/youtube.upload'],
    });

    const youtube = google.youtube({ version: 'v3', auth });

    const requestBody = {
        snippet: {
            title,
            description,
            tags,
        },
        status: {
            privacyStatus: 'public',
        },
    };

    if (playlistId) {
        requestBody.snippet.playlistId = playlistId;
    }

    const response = await youtube.videos.insert({
        part: 'snippet,status',
        requestBody,
        media: { body: fs.createReadStream(videoPath) },
    });

    return response.data;
};