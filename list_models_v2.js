const axios = require('axios');
require('dotenv').config();

async function listModels() {
    try {
        const response = await axios.get('https://openrouter.ai/api/v1/models', {
            headers: {
                'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`
            }
        });

        const models = response.data.data;
        console.log("Total models:", models.length);

        // Filter for relevant models
        const freeModels = models.filter(m => m.id.includes('free'));
        const deepseekModels = models.filter(m => m.id.includes('deepseek'));
        const googleModels = models.filter(m => m.id.includes('google'));

        console.log("\n--- Free Models ---");
        freeModels.slice(0, 5).forEach(m => console.log(m.id));

        console.log("\n--- Deepseek Models ---");
        deepseekModels.slice(0, 5).forEach(m => console.log(m.id));

        console.log("\n--- Google Models ---");
        googleModels.slice(0, 5).forEach(m => console.log(m.id));

    } catch (error) {
        console.error("Error:", error.message);
    }
}

listModels();
