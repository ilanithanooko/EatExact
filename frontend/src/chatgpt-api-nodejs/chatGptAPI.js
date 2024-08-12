const axios = require("axios");

// OpenAI API key
const apiKey = process.env.OPENAI_API_KEY;

// Function to call the ChatGPT API
async function callChatGPT(prompt) {
    const url = "https://api.openai.com/v1/chat/completions";

    const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
    };

    const data = {
        model: "gpt-4o",
        messages: [
            { role: "system", content: "you are a recipe developer mastering in creating recipes for allergic or dietary restricted individuals." },
            { role: "user", content: prompt },
        ],
    };

    try {
        const response = await axios.post(url, data, { headers });
        const result = response.data.choices[0].message.content;
        return result;
    } catch (error) {
        console.error(
            "Error calling ChatGPT API:",
            error.response ? error.response.data : error.message
        );
        throw error;
    }
}
module.exports = callChatGPT;