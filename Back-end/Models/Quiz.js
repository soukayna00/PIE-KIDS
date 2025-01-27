const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OptionSchema = new Schema({
    text: { type: String, required: true },
    isCorrect: { type: Boolean, required: true }
});

const QuestionSchema = new Schema({
    text: { type: String, required: true },
    options: [OptionSchema],
    explanation: { type: String }
});

const QuizSchema = new Schema({
    title: { type: String, required: true },
    description: { type: String },
    course: {
        type: mongoose.Types.ObjectId,
        ref: 'Cours'
    },
    questions: [QuestionSchema],
    updatedAt: { type: Date }
});

QuizSchema.pre('save', function (next) {
    this.updatedAt = Date.now();
    next();
});

const Quiz = mongoose.model('Quiz', QuizSchema);

module.exports = { Quiz };
