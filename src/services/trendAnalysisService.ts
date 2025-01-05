interface Trend {
    keyword: string;
    popularity: number;
}

/**
 * Simulate fetching trending topics.
 */
export const getTrendingTopics = async (): Promise<Trend[]> => {
    const simulatedTrends: Trend[] = [
        { keyword: "AI Content Creation", popularity: 92 },
        { keyword: "YouTube Growth Tips", popularity: 85 },
        { keyword: "Top Gaming Strategies", popularity: 78 },
    ];

    return simulatedTrends.sort((a, b) => b.popularity - a.popularity);
};

/**
 * Suggest topics based on a keyword.
 * @param keyword The keyword to search trends for.
 */
export const suggestTopics = async (keyword: string): Promise<Trend[]> => {
    const trends = await getTrendingTopics();
    return trends.filter(trend => trend.keyword.toLowerCase().includes(keyword.toLowerCase()));
};