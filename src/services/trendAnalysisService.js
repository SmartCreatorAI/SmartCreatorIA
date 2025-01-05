const axios = require('axios');

exports.getTrendingTopics = async (region = 'US') => {
    try {
        // Simulated API call (replace with actual YouTube or trend API)
        const trendingTopics = [
            "AI-generated content",
            "Top 10 gameplay tips",
            "Best productivity hacks"
        ];

        return trendingTopics;
    } catch (error) {
        throw new Error("Failed to fetch trending topics.");
    }
};