
const express=require("express");
const mongoose=require("mongoose");
const dotenv=require("dotenv");

const Utilisateur=require("./Models/Utilisateur");
const Ressource=require('./Models/Ressources');
const Chapitre=require("./Models/Chapitre");
const Cours=require("./Models/Cours");
const Quiz=require("./Models/Quiz");
const Question=require('./Models/Question')
const Etudiant=require("./Models/Etudiant");
const Enseignant=require("./Models/Enseignant");


const utilisateurRoutes = require('./Routes/utilisateurRoutes');



const app = express();

app.use(express.json());
app.use( utilisateurRoutes);

dotenv.config();

const PORT = process.env.PORT || 4000;
const MONGO_url=process.env.MONGO_url;












mongoose.connect(MONGO_url)
  .then(() => {
    console.log("Database connected successfully.");
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log('Error connecting to database:', error);
  });








