const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ChapitreSchema = new Schema({
    titre: String,
    content: String,
    resources: [{
        filename: String,
    }]
});

const Chapitre = mongoose.model('Chapitre', ChapitreSchema);

module.exports = Chapitre;
