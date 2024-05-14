

const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const QuestionSchema=new Schema({
    question:String,
    reponses:[String],
    reponseCorrecte :String
});


const Question = mongoose.model('Question', QuestionSchema);

module.exports={Question}