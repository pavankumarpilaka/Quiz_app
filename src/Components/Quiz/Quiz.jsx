import React, { useState, useEffect, useRef } from 'react';
import './Quiz.css';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { data } from '../../assets/data';
import { saveQuizResult,getQuizHistory } from '../../utils/indexDB';



const Quiz = () => {
    let [index, setIndex] = useState(0);
    let [question, setQuestion] = useState(data[index]);
    let [lock, setLock] = useState(false);
    let [score, setScore] = useState(0);
    let [result, setResult] = useState(false);
    const [timeLeft, setTimeLeft] = useState(30);
    const timerRef = useRef(null);
    const [pieChartPercentage, setPieChartPercentage] = useState(0);
    const [numericAnswer, setNumericAnswer] = useState('');
    const [quizHistory, setQuizHistory] = useState([]); 


    let Option1 = useRef(null);
    let Option2 = useRef(null);
    let Option3 = useRef(null);
    let Option4 = useRef(null);
    let option_array = [Option1, Option2, Option3, Option4];

    useEffect(() => {
        setTimeLeft(30);
    }, [index]);

    useEffect(() => {
        if (timeLeft === 0) {
            next();
        }
        if (!result) {
            timerRef.current = setInterval(() => {
                setTimeLeft((prevTime) => prevTime - 1);
            }, 1000);
            return () => clearInterval(timerRef.current);
        }
    }, [timeLeft, index, result]);

    useEffect(() => {
        const calculatePercentage = () => {
            if (!data || data.length === 0) return 0;
            const percentage = (score / data.length) * 100;
            return isNaN(percentage) ? 0 : Number(percentage);
        };
        setPieChartPercentage(calculatePercentage());
    }, [score, data]);

    const check_ans = (e, ans) => {
        if (!lock) {
            if (question.type === 'numeric') {
                if (parseInt(numericAnswer) === question.ans) {
                    toast.success("Your Answer Is Correct!!", { autoClose: 2000 });
                    setScore(score + 1);
                } else {
                    toast.error("Your Answer Is Incorrect!!", { autoClose: 2000 });
                }
            } else {
                if (question.ans === ans) {
                    toast.success("Your Answer Is Correct!!", { autoClose: 2000 });
                    e.target.classList.add("correct");
                    setScore(score + 1);
                } else {
                    toast.error("Your Answer Is Incorrect!!", { autoClose: 2000 });
                    e.target.classList.add("wrong");
                    option_array[question.ans - 1].current.classList.add("correct");
                }
            }
            setLock(true);
            clearInterval(timerRef.current);
        }
    };

    const next = () => {
        if (lock === true || timeLeft === 0) {
            if (index === data.length - 1) {
                setResult(true);
    
                // Save history to IndexedDB
                saveQuizResult({
                    date: new Date().toLocaleString(),
                    score: score + (question.type === "numeric" && parseInt(numericAnswer) === question.ans ? 1 : 0),
                    totalQuestions: data.length,
                });
    
                return;
            }
    
            setIndex(++index);
            setQuestion(data[index]);
            setLock(false);
            setNumericAnswer(""); 
    
            option_array.map((option) => {
                option.current.classList.remove("wrong");
                option.current.classList.remove("correct");
                return null;
            });
    
            setTimeLeft(30);
        } else {
            toast.warning("Please Provide an answer or wait for the timer!", { autoClose: 2000 });
            return;
        }
    };
    
    
    const fetchHistory = async () => {
        const history = await getQuizHistory(); // Fetch history from IndexedDB
        setQuizHistory(history); // Update state with retrieved history
    };
    
    const reset = () => {
        setIndex(0);
        setQuestion(data[0]);
        setLock(false);
        setScore(0);
        setResult(false);
        setTimeLeft(30);
    };

    return (
        <div className='container'>
            <h1>Quiz App</h1><hr />
            {result ? (
                <>
                    <h2>You Scored {score} out of {data.length} </h2>
                    <button onClick={reset}>Reset</button>
                </>
            ) : (
                <>
                    <h2>{index + 1}. {question.question}</h2>
                    <div className="timer">Time Left: {timeLeft} seconds</div>
                    {question.type === 'numeric' ? (
                        <div className="numeric-question-container">
                            <input 
                                type="number"
                                value={numericAnswer}
                                onChange={(e) => setNumericAnswer(e.target.value)}
                                disabled={lock}
                                className="numeric-input"
                            />
                            <br/>
                            <button 
                                onClick={(e) => check_ans(e)} 
                                className="submit-button" 
                                disabled={lock || numericAnswer === ""}
                            >
                                Submit
                            </button>
                        </div>
                    ) : (
                        <ul>
                            <li ref={Option1} onClick={(e) => check_ans(e, 1)}>{question.option1}</li>
                            <li ref={Option2} onClick={(e) => check_ans(e, 2)}>{question.option2}</li>
                            <li ref={Option3} onClick={(e) => check_ans(e, 3)}>{question.option3}</li>
                            <li ref={Option4} onClick={(e) => check_ans(e, 4)}>{question.option4}</li>
                        </ul>
                    )}
                    <button onClick={next}>Next</button>
                    <div className="index">{index + 1} of {data.length} questions</div>
                </>
            )}
    
            <button onClick={fetchHistory} className="history-button">View Quiz History</button>
    
            {quizHistory.length > 0 && (
                <div className="quiz-history">
                    <h2>Past Quiz Results</h2>
                    <ul>
                        {quizHistory.map((attempt, index) => (
                            <li key={index}>
                                {attempt.date} - Score: {attempt.score}/{attempt.totalQuestions}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
    
};

export default Quiz;
