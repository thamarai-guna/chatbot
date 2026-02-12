const axios = require('axios');
require('dotenv').config();

async function listModels() {
    try {
        const response = await axios.get('https://openrouter.ai/api/v1/models', {
            headers: { 'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}` }
        });
        const free = response.data.data.filter(m => m.id.includes(':free'));
        console.log("Free Models Found:", free.length);
        free.slice(0, 5).forEach(m => console.log(m.id));
    } catch (error) {
        console.error("Error:", error.message);
    }
}
listModels();
