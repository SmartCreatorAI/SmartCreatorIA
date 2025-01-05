const axios = require('axios');

exports.generateReply = async (comment) => {
    // Simulate AI response generation (can integrate OpenAI API or other ML models)
    const predefinedReplies = [
        "Thank you for your feedback!",
        "That's an interesting point!",
        "We appreciate your support!"
    ];

    // Placeholder logic to pick a random reply
    const reply = predefinedReplies[Math.floor(Math.random() * predefinedReplies.length)];
    return reply;
};