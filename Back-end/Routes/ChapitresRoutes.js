// EnseignantRoutes.js
const express = require('express');
const router = express.Router();
const Chapitre=require('../Models/Chapitre')

//ajouter un chapitre
router.get('/', async(req, res) => {
try{
     const chapitre=new Chapitre(req.body);
     await chapitre.save();
     res.status('201').send(chapitre);

}catch(error){
   res.status('400').send(error)
}
});


// tous les chapitres
router.get('/', async (req, res) => {
  try {
      const chapitres = await Chapitre.find();
      res.send(chapitres);
  } catch (error) {
      res.status(500).send(error);
  }
});

router.get('/:id', async (req, res) => {
  const id = req.params.id;
  try {
      const chapitre = await Chapitre.findById(id);
      if (!chapitre) {
          return res.status(404).send();
      }
      res.send(chapitre);
  } catch (error) {
      res.status(500).send(error);
  }
});

//  editer par id

router.patch('/:id', async (req, res) => {
  const id = req.params.id;
  const updates = Object.keys(req.body);
  const allowedUpdates = ['titre', 'ressources'];
  const isValidOperation = updates.every(update => allowedUpdates.includes(update));

  if (!isValidOperation) {
      return res.status(400).send({ error: 'Invalid updates!' });
  }

  try {
      const chapitre = await Chapitre.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
      if (!chapitre) {
          return res.status(404).send();
      }
      res.send(chapitre);
  } catch (error) {
      res.status(400).send(error);
  }});





  
  router.delete('/:id', async (req, res) => {
    const id = req.params.id;
    try {
        const chapitre = await Chapitre.findByIdAndDelete(id);
        if (!chapitre) {
            return res.status(404).send();
        }
        res.send(chapitre);
    } catch (error) {
        res.status(500).send(error);
    }
});


module.exports = router;
