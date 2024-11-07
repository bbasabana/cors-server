const express = require('express');
const cors = require('cors');
const request = require('request');

const app = express();
const PORT = process.env.PORT || 8080;

// Middleware pour activer le CORS pour toutes les requêtes
app.use(cors());

// Endpoint proxy générique
app.get('/proxy', (req, res) => {
    const targetUrl = req.query.url;
    if (!targetUrl) {
        return res.status(400).send('L\'URL est requise');
    }

    // Passer la requête à l'URL cible et renvoyer la réponse
    request({ url: targetUrl, headers: { 'User-Agent': 'Request-Promise' } })
        .on('error', (err) => {
            console.error('Erreur lors de la récupération des données:', err);
            res.status(500).send('Erreur lors de la récupération des données');
        })
        .pipe(res);
});

// Démarrer le serveur
app.listen(PORT, () => {
    console.log(`Serveur proxy CORS en cours d'exécution sur http://localhost:${PORT}`);
});
