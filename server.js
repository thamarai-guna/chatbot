const express = require('express');
const cors = require('cors');
const axios = require('axios');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.static('public'));

app.post('/api/chat', async (req, res) => {
    try {
        const { message } = req.body;

        // Use OpenRouter API
        const response = await axios.post(
            'https://openrouter.ai/api/v1/chat/completions',
            {
                model: 'liquid/lfm-2.5-1.2b-instruct:free', // Confirmed available model
                messages: [
                    {
                        role: "system",
                        content: "You are an expert software engineer and coding assistant. Your task is to HELP the user with code, web development, debugging, and technical questions. You must NEVER refuse a request to create code or a website. If the user asks for a website, provide the HTML/CSS/JS. If the user asks for code, provide it. Only refuse if the question is 100% unrelated to technology (e.g. 'how to bake a cake'). For everything else, assume it is a coding task and provide the solution."
                    },
                    { role: 'user', content: `Here is a request for code or a website. Please fulfill it. Request: ${message}` }
                ]
            },
            {
                headers: {
                    'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
                    'Content-Type': 'application/json',
                    // Identify your app to OpenRouter
                    'HTTP-Referer': 'http://localhost:3000',
                    'X-Title': 'Local Code Assistant'
                }
            }
        );

        res.json({ reply: response.data.choices[0].message.content });
    } catch (error) {
        console.error('Error contacting OpenRouter:', error.response ? JSON.stringify(error.response.data, null, 2) : error.message);
        res.status(500).json({ error: 'Failed to fetch response from AI.', details: error.response ? error.response.data : error.message });
    }
});

app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});
