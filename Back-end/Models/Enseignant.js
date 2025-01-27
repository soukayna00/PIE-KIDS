const mongoose = require('mongoose');
const Utilisateur = require('./Utilisateur');
const Schema = mongoose.Schema;

const EnseignantSchema = new Schema({
    courscrees: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Cours'
    }
});

const Enseignant = Utilisateur.discriminator('Enseignant', EnseignantSchema);

module.exports = Enseignant;
