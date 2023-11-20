const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
const port = 3000;

app.use(bodyParser.json());

const openaiApiKey = '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';

app.post('/api/chat', async (req, res) => {
    const userInput = req.body.userInput;

    try {
        // Make a request to the OpenAI API
        const response = await axios.post(
            'https://api.openai.com/v1/engines/davinci-codex/completions',
            {
                prompt: userInput,
                max_tokens: 150,
            },
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${openaiApiKey}`,
                },
            }
        );

        const chatGptResponse = response.data.choices[0].text;
        res.json({ response: chatGptResponse });
    } catch (error) {
        console.error('Error interacting with OpenAI API:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
