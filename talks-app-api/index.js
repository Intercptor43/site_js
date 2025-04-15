require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const talkRoutes = require('./routes/talks');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Rotes
app.use('/api/talks', talkRoutes);

// Connexion à MongoDB
mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost:27017/talks-manager')
    .then(() => console.log('Connecté à MongoDB'))
    .catch((err) => console.error('Erreur de connexion à MongoDB:', err));

app.listen(PORT, () => {
    console.log(`Serveur démarré sur le port ${PORT}`);
});