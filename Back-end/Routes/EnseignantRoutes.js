const express = require('express');
const Enseignant = require('../Models/Enseignant');
const Utilisateur=require('../Models/Utilisateur')
const router = express.Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');



router.post('/', async (req, res) => {
    const enseignant = new Enseignant(req.body);
    try {
        await enseignant.save();
        res.status(201).json(enseignant);
    } catch (e) {
        res.status(400).json(e);
    }
});

// Lire tous les enseignants
router.get('/', async (req, res) => {
    try {
        const enseignants = await Enseignant.find({}).populate('courscrees');
        res.status(200).json(enseignants);
    } catch (e) {
        res.status(500).json(e);
    }
});

// Lire un enseignant par ID
router.get('/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const enseignant = await Enseignant.findById(id).populate('courscrees');
        if (!enseignant) {
            return res.status(404).send();
        }
        res.status(200).json(enseignant);
    } catch (e) {
        res.status(500).json(e);
    }
});

// Mettre à jour un enseignant
router.patch('/:id', async (req, res) => {
    const id = req.params.id;
    const updates = Object.keys(req.body);
    const allowedUpdates = ['courscrees'];
    const isValidOperation = updates.every(update => allowedUpdates.includes(update));

    if (!isValidOperation) {
        return res.status(400).json({ error: 'Invalid updates!' });
    }

    try {
        const enseignant = await Enseignant.findByIdAndUpdate(id, req.body, { new: true, runValidators: true }).populate('courscrees');
        if (!enseignant) {
            return res.status(404).send();
        }
        res.json(enseignant);
    } catch (e) {
        res.status(400).json(e);
    }
});

router.delete('/:id', async (req, res) => {
    try {
        const enseignant = await Enseignant.findByIdAndDelete(req.params.id);
        if (!enseignant) {
            return res.status(404).send();
        }
        res.json(enseignant);
    } catch (e) {
        res.status(500).json(e);
    }
});

router.post('/register-enseignant', async (req, res) => {
    try {
      const { nom, age,email, motDePasse } = req.body;
  
      // Check if the user already exists
      const existingUser = await Utilisateur.findOne({ email });
      if (existingUser) {
        return res.status(400).json({ message: 'Email déjà utilisé' });
      }
  
      // Hash the password
      const hashedPassword = await bcrypt.hash(motDePasse, 10);
  
      // Create a new user
      const NvEtudiant = new Utilisateur({ nom, age, email,role:'Enseignant', motDePasse: hashedPassword });
      await NvEtudiant.save();
  
      // Create a token
      const token = jwt.sign({ _id: NvEtudiant._id }, process.env.JWT_PRIVATEKEY);
  
      res.status(201).json({ token });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Une erreur est survenue lors de l\'inscription.' });
    }
  });

module.exports = router;
