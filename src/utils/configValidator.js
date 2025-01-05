exports.validateConfig = (config) => {
    const requiredKeys = ["GOOGLE_API_KEY", "YOUTUBE_API_KEY"];
    requiredKeys.forEach(key => {
        if (!config[key]) throw new Error(`Missing required configuration: ${key}`);
    });
    return true;
};