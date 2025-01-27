import React, { useState } from 'react';
import axios from 'axios';
import Sidebar from '../Sidebar/sidebar';
import './quiz.css'

export default function QuizForm() {
    const [quizData, setQuizData] = useState({
        title: '',
        description: '',
        questions: [
            {
                text: '',
                options: [
                    { text: '', isCorrect: false }
                ],
                explanation: ''
            }
        ]
    });

    const handleQuizChange = e => {
        const { name, value } = e.target;
        setQuizData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleQuestionChange = (index, e) => {
        const { name, value } = e.target;
        const updatedQuestions = quizData.questions.map((question, qIndex) => {
            if (index === qIndex) {
                return { ...question, [name]: value };
            }
            return question;
        });
        setQuizData(prevState => ({
            ...prevState,
            questions: updatedQuestions
        }));
    };

    const handleOptionChange = (qIndex, oIndex, e) => {
        const { name, value, type, checked } = e.target;
        const updatedOptions = quizData.questions[qIndex].options.map((option, optIndex) => {
            if (oIndex === optIndex) {
                return { ...option, [name]: type === 'checkbox' ? checked : value };
            }
            return option;
        });
        const updatedQuestions = quizData.questions.map((question, questionIndex) => {
            if (qIndex === questionIndex) {
                return { ...question, options: updatedOptions };
            }
            return question;
        });
        setQuizData(prevState => ({
            ...prevState,
            questions: updatedQuestions
        }));
    };

    const addQuestion = () => {
        setQuizData(prevState => ({
            ...prevState,
            questions: [...prevState.questions, { text: '', options: [{ text: '', isCorrect: false }], explanation: '' }]
        }));
    };

    const addOption = qIndex => {
        const updatedQuestions = quizData.questions.map((question, index) => {
            if (index === qIndex) {
                return { ...question, options: [...question.options, { text: '', isCorrect: false }] };
            }
            return question;
        });
        setQuizData(prevState => ({
            ...prevState,
            questions: updatedQuestions
        }));
    };

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:4000/quiz', quizData);
            console.log('Quiz created successfully:', response.data);
            // Reset form data
            setQuizData({
                title: '',
                description: '',
                questions: [
                    {
                        text: '',
                        options: [
                            { text: '', isCorrect: false }
                        ],
                        explanation: ''
                    }
                ]
            });
        } catch (error) {
            console.error('Error creating quiz:', error);
        }
    };

    return (
      <div className='container'>
        <Sidebar/>
        <form onSubmit={handleSubmit}>
            <div>
                <label>Title:</label>
                <input type="text" name="title" value={quizData.title} onChange={handleQuizChange} />
            </div>
            <div>
                <label>Description:</label>
                <textarea name="description" value={quizData.description} onChange={handleQuizChange}></textarea>
            </div>
            {quizData.questions.map((question, qIndex) => (
                <div key={qIndex}>
                    <label>Question {qIndex + 1}:</label>
                    <input type="text" name="text" value={question.text} onChange={e => handleQuestionChange(qIndex, e)} />
                    {question.options.map((option, oIndex) => (
                        <div key={oIndex}>
                            <label>Option {oIndex + 1}:</label>
                            <input
                                type="text"
                                name="text"
                                value={option.text}
                                onChange={e => handleOptionChange(qIndex, oIndex, e)}
                            />
                            <label>
                                Correct:
                                <input
                                    type="checkbox"
                                    name="isCorrect"
                                    checked={option.isCorrect}
                                    onChange={e => handleOptionChange(qIndex, oIndex, e)}
                                />
                            </label>
                        </div>
                    ))}
                    <button type="button" onClick={() => addOption(qIndex)}>Add Option</button>
                    <div>
                        <label>Explanation:</label>
                        <input type="text" name="explanation" value={question.explanation} onChange={e => handleQuestionChange(qIndex, e)} />
                    </div>
                </div>
            ))}
            <button type="button" onClick={addQuestion}>Add Question</button>
            <button type="submit">Submit Quiz</button>
        </form>
        </div>
    );
}
