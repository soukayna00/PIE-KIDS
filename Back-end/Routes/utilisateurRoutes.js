
const express = require('express');
const Utilisateur = require('../Models/Utilisateur');

const router = express.Router();



// utilisateurs  routes
// router.post('/utilisateurs/Inscription',async(req,res)=>{
//     const NvUtilisateur=new Utilisateur();
//     const Utilisateur_nom=req.body.Utilisateur_nom;
//     const Utilisateur_email=req.body.Utilisateur_email;
//     const Utilisateur_motDePasse=req.body.Utilisateur_motDePasse;
  
//     NvUtilisateur.nom=Utilisateur_nom;
//     NvUtilisateur.email=Utilisateur_email;
//     NvUtilisateur.motDePasse=Utilisateur_motDePasse;
//     NvUtilisateur.role='Etudiant';

//     await NvUtilisateur.save();
//     res.json(NvUtilisateur)
  
//   });
  
  router.get('/',async(req,res)=>{
      const ListesUtilisateurs=await Utilisateur.find();
      
       res.json(ListesUtilisateurs)
  })

  module.exports = router;