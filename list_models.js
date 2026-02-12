const axios = require('axios');
require('dotenv').config();

async function listModels() {
    try {
        const response = await axios.get('https://openrouter.ai/api/v1/models', {
            headers: {
                'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`
            }
        });

        console.log("Status:", response.status);
        console.log("Models:", response.data.data.map(m => m.id).filter(id => id.includes('free') || id.includes('gemini') || id.includes('deepseek')).slice(0, 20));
    } catch (error) {
        console.error("Error listing models:", error.response ? error.response.data : error.message);
    }
}

listModels();
