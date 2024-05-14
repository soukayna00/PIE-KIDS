

const mongoose=require('mongoose');
const Schema=mongoose.Schema;

const QuizSchema=new Schema({
    tite:String,
    Questions:{
        type:mongoose.Types.ObjectId,
        ref:'Question'
    }
})

const Quiz = mongoose.model('Quiz', QuizSchema);

module.exports={Quiz}