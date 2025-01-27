import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './quiz.css';

export default function Quiz() {
    const [quizData, setQuizData] = useState(null);

    useEffect(() => {
        // Fetch quiz data from API
        const fetchQuizData = async () => {
            try {
                const response = await axios.get('http://localhost:4000/quiz');
                console.log('Response from API:', response.data);
                setQuizData(response.data);
            } catch (error) {
                console.error('Error fetching quiz data:', error);
            }
        };
        fetchQuizData();
    }, []);

    const handleOptionChange = (qIndex, oIndex) => {
        if (!quizData || !quizData.questions) return; // Add a guard clause
        const updatedQuestions = [...quizData.questions];
        updatedQuestions[qIndex].options.forEach((option, index) => {
            option.isSelected = index === oIndex;
        });
        setQuizData(prevState => ({
            ...prevState,
            questions: updatedQuestions
        }));
    };

    const handleSubmit = async e => {
        e.preventDefault();
        try {
            // Submit quiz data
            console.log('Quiz data:', quizData);
        } catch (error) {
            console.error('Error submitting quiz:', error);
        }
    };

    console.log('Quiz data:', quizData); // Add this console.log to track quizData

    return (
        <div className='container'>
            {quizData && quizData.questions ? (
                <form onSubmit={handleSubmit}>
                    {quizData.questions.map((question, qIndex) => (
                        <div key={question._id}>
                            <p>{question.text}</p>
                            {question.options.map((option, oIndex) => (
                                <div key={option._id}>
                                    <input
                                        type="radio"
                                        id={`option${oIndex}`}
                                        name={`question${qIndex}`}
                                        value={option.text}
                                        checked={option.isSelected}
                                        onChange={() => handleOptionChange(qIndex, oIndex)}
                                    />
                                    <label htmlFor={`option${oIndex}`}>{option.text}</label>
                                </div>
                            ))}
                        </div>
                    ))}
                    <button type="submit">Submit Quiz</button>
                </form>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
}
