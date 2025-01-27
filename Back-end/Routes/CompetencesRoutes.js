const express = require('express');
const router = express.Router();
const { Competence } = require('../Models/Competence');

router.post('/', async (req, res) => {
    try {
        console.log('Requête body:', req.body); 
        const competence = new Competence(req.body);
        await competence.save();
        console.log('Compétence créée:', competence);
        res.status(201).json(competence);
    } catch (error) {
        console.error('Erreur lors de la création de la compétence :', error); 
        res.status(400).json(error);
    }
});

router.get('/all', async (req, res) => {
    try {
        const competences = await Competence.find();
        res.status(200).json(competences);
    } catch (error) {
        console.error('Erreur lors de la récupération de toutes les compétences :', error);
        res.status(500).json(error);
    }
});

// Route pour obtenir une compétence par son ID
router.get('/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const competence = await Competence.findById(id);
        if (!competence) {
            return res.status(404).send('Cette compétence n\'existe pas');
        }
        res.status(200).json(competence);
    } catch (error) {
        console.error('Erreur lors de la récupération de la compétence par ID :', error);
        res.status(500).json(error);
    }
});

// Route pour mettre à jour une compétence par son ID
router.patch('/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const competence = await Competence.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
        if (!competence) {
            return res.status(404).send('Cette compétence n\'existe pas');
        }
        res.status(200).json(competence);
    } catch (error) {
        console.error('Erreur lors de la mise à jour de la compétence par ID :', error);
        res.status(400).json(error);
    }
});

// Route pour supprimer une compétence par son ID
router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const competence = await Competence.findByIdAndDelete(id);
        if (!competence) {
            res.status(401).send('Supprimée avec succès');
        } else {
            res.status(200).send('La compétence existe toujours');
        }
    } catch (error) {
        console.error('Erreur lors de la suppression de la compétence par ID :', error);
        res.status(500).json(error);
    }
});

module.exports = router;
