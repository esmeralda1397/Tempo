// server.js
require('dotenv').config();
const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;
const API_KEY = '858f99880915348c9d5421b7fba76297';

app.use(cors());
app.use(express.static('public'));

app.get('/api/clima/:cidade', async (req, res) => {
    const cidade = req.params.cidade;
    try {
        const response = await axios.get(
            `https://api.openweathermap.org/data/2.5/weather?lat= ${cidade}&appid=${API_KEY}&units=metric&lang=pt_br`
        );
        const temperatura = response.data.main.temp;
        const nomeCidade = response.data.name;
        res.json({ cidade: nomeCidade, temperatura: temperatura.toFixed(1) });
    } catch (error) {
        res.status(500).json({ error: 'Não foi possível obter a temperatura.' });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
});