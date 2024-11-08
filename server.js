const express = require('express');
const cors = require('cors');
const request = require('request');

const app = express();
const PORT = process.env.PORT || 8080;

// Activer CORS pour toutes les requêtes
app.use(cors());

// Route proxy avec support de l'authentification si nécessaire
app.get('/proxy', (req, res) => {
    const targetUrl = req.query.url;
    if (!targetUrl) {
        return res.status(400).json({ error: 'L\'URL est requise' });
    }

    // Ajouter des en-têtes optionnels pour l'authentification si requis
    const options = {
        url: targetUrl,
        headers: {
            'User-Agent': 'Request-Promise',
            // 'Authorization': 'Bearer VOTRE_JETON' // Décommentez et remplacez si nécessaire
        }
    };

    // Requête vers l'URL cible
    request(options, (error, response, body) => {
        if (error) {
            console.error('Erreur lors de la récupération des données:', error);
            return res.status(500).json({ error: 'Erreur lors de la récupération des données' });
        }

        // Vérification de la réponse HTTP
        if (response.statusCode !== 200) {
            console.error('Erreur de réponse:', response.statusCode);
            return res.status(response.statusCode).json({ error: `Erreur ${response.statusCode}` });
        }

        // Envoyer le contenu récupéré au client
        res.send(body);
    });
});

// Démarrage du serveur
app.listen(PORT, () => {
    console.log(`Serveur proxy CORS en cours d'exécution sur le port ${PORT}`);
});
