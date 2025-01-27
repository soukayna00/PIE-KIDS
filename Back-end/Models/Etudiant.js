const mongoose = require('mongoose');
const Utilisateur = require('./Utilisateur'); 
const Schema = mongoose.Schema;

const EtudiantSchema = new Schema({
    age: Number,
    coursAttribues: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Cours'
    },
    quizCompletes: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Quiz'
    },
    CompetencesAquises: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Competence'
    }
});

const Etudiant = Utilisateur.discriminator('Etudiant', EtudiantSchema);


module.exports = Etudiant;
