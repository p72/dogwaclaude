const express = require('express');
const cors = require('cors');
const fetch = require('node-fetch');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// ミドルウェア
app.use(cors());
app.use(express.json({ limit: '10mb' }));
app.use(express.static(__dirname));

// Claude API プロキシエンドポイント
app.post('/api/claude', async (req, res) => {
    try {
        const { apiKey, messages, model } = req.body;

        if (!apiKey) {
            return res.status(400).json({ error: 'APIキーが必要です' });
        }

        const response = await fetch('https://api.anthropic.com/v1/messages', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': apiKey,
                'anthropic-version': '2023-06-01'
            },
            body: JSON.stringify({
                model: model || 'claude-sonnet-4-20250514',
                max_tokens: 1024,
                messages: messages
            })
        });

        const data = await response.json();

        if (!response.ok) {
            console.error('Claude API Error:', data);
            return res.status(response.status).json(data);
        }

        res.json(data);
    } catch (error) {
        console.error('Server Error:', error);
        res.status(500).json({ error: error.message });
    }
});

// ルートパス
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
    console.log(`🐕 犬監視カメラサーバーが起動しました!`);
    console.log(`http://localhost:${PORT} でアクセスできます`);
});
