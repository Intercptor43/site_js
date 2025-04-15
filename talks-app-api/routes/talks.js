const express = require('express');
const router = express.Router();
const Talk = require('../models/Talk');

// Récupérer tous les talks
router.get('/', async(req, res) => {
    try {
        const talks = await Talk.find().sort({ date: -1 });
        res.json(talks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Récupérer un talk par son ID
router.get('/:id', async(req, res) => {
    try {
        const talk = await Talk.findById(req.params.id);
        if (!talk) {
            return res.status(404).json({ message: 'Talk non trouvé' });
        }
        res.json(talk);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Créer un nouveau talk
router.post('/', async(req, res) => {
    const talk = new Talk({
        title: req.body.title,
        speaker: req.body.speaker,
        date: req.body.date,
        description: req.body.description,
        status: req.body.status || 'planned'
    });

    try {
        const newTalk = await talk.save();
        res.status(201).json(newTalk);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Mettre à jour un talk
router.put('/:id', async(req, res) => {
    try {
        const talk = await Talk.findById(req.params.id);
        if (!talk) {
            return res.status(404).json({ message: 'Talk non trouvé' });
        }

        talk.title = req.body.title || talk.title;
        talk.speaker = req.body.speaker || talk.speaker;
        talk.date = req.body.date || talk.date;
        talk.description = req.body.description || talk.description;
        talk.status = req.body.status || talk.status;

        const updatedTalk = await talk.save();
        res.json(updatedTalk);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Supprimer un talk
router.delete('/:id', async(req, res) => {
    try {
        const result = await Talk.deleteOne({ _id: req.params.id });
        if (result.deletedCount === 0) {
            return res.status(404).json({ message: 'Talk non trouvé' });
        }
        res.json({ message: 'Talk supprimé avec succès' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;