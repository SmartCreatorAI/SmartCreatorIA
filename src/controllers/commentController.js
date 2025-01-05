const commentAnalysisService = require('../services/commentAnalysisService');

exports.respondToComment = async (req, res) => {
    try {
        const { comment } = req.body;
        if (!comment) throw new Error("Comment text is required.");

        const response = await commentAnalysisService.generateReply(comment);
        res.status(200).json({ reply: response });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};