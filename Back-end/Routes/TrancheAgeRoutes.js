const express = require('express');
const TrancheAge = require('../Models/TrancheAge');
const router = express.Router();

// Créer une tranche d'âge
router.post('/', async (req, res) => {
    const trancheAge = new TrancheAge(req.body);
    try {
        await trancheAge.save();
        res.status(201).json(trancheAge);
    } catch (e) {
        res.status(400).json(e);
    }
});

// Lire toutes les tranches d'âge
router.get('/', async (req, res) => {
    try {
        const tranchesAge = await TrancheAge.find({});
        res.status(200).json(tranchesAge);
    } catch (e) {
        res.status(500).json(e);
    }
});

// Lire une tranche d'âge par ID
router.get('/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const trancheAge = await TrancheAge.findById(id);
        if (!trancheAge) {
            return res.status(404).send();
        }
        res.status(200).json(trancheAge);
    } catch (e) {
        res.status(500).json(e);
    }
});

// Mettre à jour une tranche d'âge
router.patch('/:id', async (req, res) => {
    const id = req.params.id;
    const updates = Object.keys(req.body);
    const allowedUpdates = ['ageMin', 'ageMax'];
    const isValidOperation = updates.every(update => allowedUpdates.includes(update));

    if (!isValidOperation) {
        return res.status(400).json({ error: 'Invalid updates!' });
    }

    try {
        const trancheAge = await TrancheAge.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
        if (!trancheAge) {
            return res.status(404).send();
        }
        res.json(trancheAge);
    } catch (e) {
        res.status(400).json(e);
    }
});

// Supprimer une tranche d'âge
router.delete('/:id', async (req, res) => {
    try {
        const trancheAge = await TrancheAge.findByIdAndDelete(req.params.id);
        if (!trancheAge) {
            return res.status(404).send();
        }
        res.json(trancheAge);
    } catch (e) {
        res.status(500).json(e);
    }
});

module.exports = router;
