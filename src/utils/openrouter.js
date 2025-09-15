import axios from "axios";

/**
 * Sends a personalized budgeting request to the AI backend
 * @param {string} userPrompt - What the user wants to ask
 * @returns {Promise<string>} - AI's smart, witty, and friendly advice
 */
export const askAI = async (userPrompt) => {
    const fullPrompt = {
        systemPrompt: `You are PocketWise AI, a sharp, helpful, and professional budgeting assistant. 
        Give short, clear financial tips—max 5 sentences. Keep it motivating and practical.`,
        userPrompt: userPrompt,
    };

    try {
        const response = await axios.post('http://localhost:3001/ai', fullPrompt);
        return response.data.result;
    } catch (error) {
        console.error('AI Error:', error.response?.data || error.message);
        return 'PocketWise AI error 😔. Try again later.';
    }
};

/**
 * Utility function to craft a smart prompt from user budget data
 * @param {object} data - The user's budget breakdown
 * @returns {string} - Formatted prompt
 */
export const buildPrompt = (data) => {
    return `Here’s my budget data: ${JSON.stringify(
        data
    )}. Analyze it and give me specific tips to improve my savings, reduce waste, and optimize spending.`;
};
