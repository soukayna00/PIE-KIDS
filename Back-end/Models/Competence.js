

const mongoose=require('mongoose');
const Schema=mongoose.Schema;


const CompetenceSchema=new Schema({
    Titre:String
 });


 const Competence=mongoose.model('Competence',CompetenceSchema);

 module.exports = { Competence}