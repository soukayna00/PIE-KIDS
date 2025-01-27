// configuration
const express=require("express");
const mongoose=require("mongoose");
const dotenv=require("dotenv");
const cors =require('cors');
const cookieParser =require('cookie-parser');
const path = require('path');
const authMiddleware = require('../Back-end/Middleware/authMiddleware');
const jwt = require('jsonwebtoken');
const router = express.Router();



// basede donnée model
const Cours=require("./Models/Cours");
const Utilisateur=require("./Models/Utilisateur");
const Etudiant=require("./Models/Etudiant");
const Enseignant=require("./Models/Enseignant");
const Chapitre=require("./Models/Chapitre");
const Quiz=require("./Models/Quiz");
const TrancheAge = require("./Models/TrancheAge");  
const Competence=require("./Models/Competence")




// routes
const utilisateurRoutes = require('./Routes/utilisateurRoutes');
const EtudiantRoutes = require('./Routes/EtudiantsRoutes');
const ChapitresRoutes=require('./Routes/ChapitresRoutes');
const EnseignantRoutes=require('./Routes/EnseignantRoutes');
const CompetencesRoutes=require('./Routes/CompetencesRoutes');
const QuizRoutes=require('./Routes/QuizRoutes');
const CoursRoutes=require('./Routes/CoursRoutes');
const TrancheAgeRoutes = require('./Routes/TrancheAgeRoutes');  


const app = express();


app.use(express.json());
app.use(cors())
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/Etudiants',EtudiantRoutes);
app.use('/Enseignant',EnseignantRoutes);
app.use('/Utilisateurs',utilisateurRoutes);
app.use('/chapitres', ChapitresRoutes);
app.use('/competences', CompetencesRoutes);
app.use('/quiz', QuizRoutes);
app.use('/cours', CoursRoutes);
app.use('/trancheAge', TrancheAgeRoutes);


// Middleware to verify JWT token
// Middleware to verify JWT token
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ error: 'No token provided' });
  }

  // Verify token
  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({ error: 'Invalid token' });
    }
    req.user = decoded; // Attach decoded payload to request object
    next(); // Continue to the next middleware or route handler
  });
};

app.get('/verify-token', verifyToken, (req, res) => {
  if (!req.user) {
    return res.status(401).json({ error: 'Authentication failed' });
  }

  res.json({
    isAuthenticated: true,
    id: req.user._id,
    name: req.user.nom,
    role: req.user.role,
  });
});




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








