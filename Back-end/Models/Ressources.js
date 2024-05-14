

const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const RessourcesSchema = new Schema({
    type: { 
        type: String, 
        required: true,
        enum: ['video', 'pdf', 'audio'] 
    },
    contenu: String, 
    filename: String, 
    fileUrl: String, 
    metadata: { type: Object } 
});

const Ressources = mongoose.model('Ressources', RessourcesSchema);

module.exports={Ressources}