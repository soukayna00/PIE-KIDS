const mongoose=require('mongoose');
const Schema=mongoose.Schema;
const { Ressources } = require('./Ressources');

const ChapitreSchema = new Schema({
    titre: String,
    ressources: [{
        type:mongoose.Types.ObjectId,
        ref:'Ressources'
    }] 
});

const Chapitre = mongoose.model('Chapitre', ChapitreSchema);

module.exports =  Chapitre