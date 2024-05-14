

const mongoose=require('mongoose');
const Schema=mongoose.Schema;


const CoursShema=new Schema({
    titre:String,
    enseignant:{
        type:mongoose.Types.ObjectId,
        ref:'Enseignant'
    },
    chapitres: [{
        type:mongoose.Types.ObjectId,
        ref:'Chapitre'
    }],
    trancheAge: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'TrancheAge'
    },
    Etudiants:[{
        type:mongoose.Types.ObjectId,
        ref:'Etudiant'
     }],
     Competences:[{
        type:mongoose.Types.ObjectId,
        ref:'Competence'
     }],
     quiz: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Quiz'
    }
})


const Cours = mongoose.model('Cours', CoursShema);

module.exports = { Cours}