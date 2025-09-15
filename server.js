import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import axios from 'axios';


dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

const PORT = 3001;

app.post('/ai', async (req, res) => {
    const { systemPrompt, userPrompt } = req.body;
    console.log('🟢 Received prompt:', userPrompt);

    try {
        const response = await axios.post(
            'https://openrouter.ai/api/v1/chat/completions',
            {
                model: "mistralai/devstral-small-2505:free",
                messages: [
                    { role: 'system', content: systemPrompt || 'You are a helpful budgeting assistant.' },
                    { role: 'user', content: userPrompt }
                ]
            },
            {
                headers: {
                    'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
                    'Content-Type': 'application/json',
                    'HTTP-Referer': 'http://localhost:5173',
                    'X-Title': 'Pocketwise App'
                }
            }
        );

        res.json({ result: response.data.choices[0].message.content });
    } catch (error) {
        console.error('❌ Proxy error caught:');
        if (error.response) {
            console.error('Status:', error.response.status);
            console.error('Data:', error.response.data);
        } else if (error.request) {
            console.error('No response received:', error.request);
        } else {
            console.error('Error message:', error.message);
        }

        res.status(500).json({ error: 'AI proxy error' });
    }
});



app.listen(PORT, () => {
    console.log(`AI proxy running on http://localhost:${PORT}`);
});
