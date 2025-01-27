const express = require('express');
const router = express.Router();
const { Quiz } = require('../Models/Quiz');


// Route to create a new quiz

router.post('/', async (req, res) => {
    try {
        const quizData = req.body;
        console.log('Received Quiz Data:', quizData);
        const newQuiz = new Quiz(quizData);
        const savedQuiz = await newQuiz.save();
        res.status(201).json(savedQuiz);
    } catch (error) {
        console.error('Error creating quiz:', error.message);
        console.error('Validation errors:', error.errors);
        res.status(400).json({ message: 'Failed to create quiz', error: error.message });
    }
});
// Route to get all quizzes
router.get('/', async (req, res) => {
    try {
        const quizzes = await Quiz.find({});
        res.status(200).json(quizzes);
    } catch (error) {
        console.error('Error fetching quizzes:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Route to get a single quiz by ID
router.get('/:id', async (req, res) => {
    try {
        const quizId = req.params.id;
        const quiz = await Quiz.findById(quizId);
        if (!quiz) {
            return res.status(404).json({ message: 'Quiz not found' });
        }
        res.status(200).json(quiz);
    } catch (error) {
        console.error('Error fetching quiz:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Route to update a quiz by ID
router.put('/:id', async (req, res) => {
    try {
        const quizId = req.params.id;
        const updatedQuizData = req.body;
        const updatedQuiz = await Quiz.findByIdAndUpdate(quizId, updatedQuizData, { new: true });
        if (!updatedQuiz) {
            return res.status(404).json({ message: 'Quiz not found' });
        }
        res.status(200).json(updatedQuiz);
    } catch (error) {
        console.error('Error updating quiz:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

// Route to delete a quiz by ID
router.delete('/:id', async (req, res) => {
    try {
        const quizId = req.params.id;
        const deletedQuiz = await Quiz.findByIdAndDelete(quizId);
        if (!deletedQuiz) {
            return res.status(404).json({ message: 'Quiz not found' });
        }
        res.status(200).json({ message: 'Quiz deleted successfully' });
    } catch (error) {
        console.error('Error deleting quiz:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
});

module.exports = router;
