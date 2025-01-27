const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UtilisateurSchema = new Schema({
    nom: {
        type:String,
        required:true
    },
    email: {
        type:String,
        required:true
    },
    motDePasse: {
        type:String,
        required:true
    },
    role: {
        type: String,
        enum: ['Etudiant', 'Enseignant']
    }
}, 
{
    discriminatorKey: 'role' 
}
);

const Utilisateur = mongoose.model('Utilisateur', UtilisateurSchema);

module.exports = Utilisateur;
