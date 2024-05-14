const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UtilisateurSchema = new Schema({
    nom: String,
    email: String,
    motDePasse: String,
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
