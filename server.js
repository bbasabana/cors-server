const express = require('express');
const cors = require('cors');
const request = require('request');

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());

app.get('/proxy', (req, res) => {
    const targetUrl = req.query.url;
    if (!targetUrl) {
        return res.status(400).send('L\'URL est requise');
    }

    request(targetUrl)
        .on('error', (err) => {
            console.error('Erreur lors de la récupération des données:', err);
            res.status(500).send('Erreur lors de la récupération des données');
        })
        .pipe(res);
});

app.listen(PORT, () => {
    console.log(`Serveur proxy CORS en cours d'exécution sur le port ${PORT}`);
});
