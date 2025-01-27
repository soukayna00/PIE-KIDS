
const express = require('express');
const Etudiant = require('../Models/Etudiant');
const Utilisateur=require('../Models/Utilisateur')
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const router = express.Router();
// const authMiddleware = require('../Middleware/authMiddleware');



router.post('/register', async (req, res) => {
  try {
    const { nom, age, email, motDePasse } = req.body;

    // Check if the user already exists
    const existingUser = await Utilisateur.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'Email déjà utilisé' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(motDePasse, 10);

    // Create a new user
    const NvEtudiant = new Utilisateur({ nom, age, email,role:'Etudiant', motDePasse: hashedPassword });
    await NvEtudiant.save();

    // Create a token
    const token = jwt.sign({ _id: NvEtudiant._id }, process.env.JWT_PRIVATEKEY);

    res.status(201).json({ token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Une erreur est survenue lors de l\'inscription.' });
  }
});

// etudiant  routes   Login 
router.post('/login', async (req, res) => {
  try {
    const { email, motDePasse } = req.body;

    // Find user by email
    const user = await Utilisateur.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'L\'email ou le mot de passe est incorrect.' });
    }

    // Log the stored password and the one being compared
    console.log(`Stored password: ${user.motDePasse}`);
    console.log(`Provided password: ${motDePasse}`);

    // Compare the provided password with the stored hashed password
    const isPasswordValid = await bcrypt.compare(motDePasse, user.motDePasse);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'L\'email ou le mot de passe est incorrect.' });
    }

    // Create a token
    const token = jwt.sign({ _id: user._id }, process.env.JWT_PRIVATEKEY);

    // Send response with user details and token
    res.status(200).json({
      token,
      id: user._id,
      name: user.name,
      role: user.role
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Une erreur est survenue lors de la connexion.' });
  }
});

// router.post('/detailCours/:courses._id',async(req,res)=>{
    
// })


//   inscription a un cour 
// router.post('/:id/inscription', async (req, res) => {
//   const etudiantId = req.params.id;
//   const { coursId } = req.body;

//   try {
//       const etudiant = await Etudiant.findById(etudiantId);
//       if (!etudiant) {
//           return res.status(404).json({ error: "Etudiant non trouvé" });
//       }

//       const cours = await Cours.findById(coursId);
//       if (!cours) {
//           return res.status(404).json({ error: "Cours non trouvé" });
//       }

//       // Ajoutez le cours à la liste des cours suivis par l'étudiant
//       etudiant.coursSuivis.push(coursId);
//       await etudiant.save();

//       res.status(200).json({ message: "Inscription réussie" });
//   } catch (error) {
//       res.status(500).json({ error: error.message });
//   }
// });


// router.post('/test-password', async (req, res) => {
//   const { password } = req.body;
//   try {
//     // Hash the password
//     const hashedPassword = await bcrypt.hash(password, 10);
//     console.log(`Hashed password: ${hashedPassword}`);

//     // Compare the password
//     const isPasswordValid = await bcrypt.compare(password, hashedPassword);
//     console.log(`Password valid: ${isPasswordValid}`);

//     if (isPasswordValid) {
//       res.status(200).json({ message: 'Password is valid' });
//     } else {
//       res.status(400).json({ message: 'Password is invalid' });
//     }
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'An error occurred' });
//   }
// });


  
//   router.get('/utilisateurs',async(req,res)=>{
//       const ListesUtilisateurs=await Utilisateur.find();
      
//        res.json(ListesUtilisateurs)
//   })

  module.exports = router;