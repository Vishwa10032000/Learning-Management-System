import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import "./Assessment.css";
import submitted from "../../assets/submitted.json";
import question from "./AssessmentQuestion";
import DragAndDrop from "./DargAndDrop";
import { Modal } from "react-bootstrap";



const Assessment = ({ onDataChange, category, Questions, QuestionCount, Score }) => {

    const [questions, setQuestions] = useState([]);

    useEffect(() => {
        // Filter questions based on category
        if (Questions.length > 0 && category === "Trainings") {
            const trainingQuestions = Questions.filter((q) => q.category === "Trainings");
            setQuestions(trainingQuestions);
        } else if (category === "Policies") {
            const policy = question.filter(
                (q) => q.category === "Policies");
            setQuestions(policy);
        } else if (category === "Orientations") {
            const OrientationQuestions = question.filter(
                (q) => q.category === "Policies");
            setQuestions(OrientationQuestions);
        }
    }, [category, Questions]);


    const [userAnswers, setUserAnswers] = useState({});
    const [showResults, setShowResults] = useState(false);
    const [score, setScore] = useState(0);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [closeAssesst, setCloseAssesst] = useState(false);
    const [submitStatus, setSubmitStatus] = useState(false);
    const questionsCount = QuestionCount ? QuestionCount : questions.length;

    useEffect(() => {
        if (closeAssesst) {
            onDataChange(closeAssesst, score);
        }
    }, [closeAssesst, onDataChange]);

    const handleOptionChange = (questionId, answer, isMultiple) => {
        setUserAnswers((prev) => {
            const currentAnswers = prev[questionId] || [];
            if (isMultiple) {
                return {
                    ...prev,
                    [questionId]: currentAnswers.includes(answer)
                        ? currentAnswers.filter((a) => a !== answer)
                        : [...currentAnswers, answer],
                };
            } else {
                return {
                    ...prev,
                    [questionId]: [answer],
                };
            }
        });
    };

    const handleSubmit = () => {
        console.log(userAnswers);
        const unansweredQuestions = questions.filter(
            (q) => !userAnswers[q.id] || userAnswers[q.id].length === 0
        );

        if (unansweredQuestions.length > 0) {
            Swal.fire({
                title: "Incomplete Assessment",
                text: "Please answer all the questions before submitting",
                width: 400,
                height: 200,
                background: "#fffff",
                confirmButtonColor: "#3085d6",
                confirmButtonText: "Ok",
            });

            return;
        }

        let calculatedScore = 0;
        questions.forEach((q) => {
            const userAnswer = userAnswers[q.id] || [];
            if (
                q.questionType.toLowerCase() === "single" &&
                userAnswer.length === 1 &&
                userAnswer[0] === q.correctAnswer[0]
            ) {
                calculatedScore++;
            } else if (
                q.questionType.toLowerCase() === "multiple" &&
                userAnswer.length === q.correctAnswer.length &&
                userAnswer.every((ans) => q.correctAnswer.includes(ans))
            ) {
                calculatedScore++;
            }
        });

        if (category.toLowerCase() === "training") {
            setScore(Score + calculatedScore)
        } else {
            setScore(calculatedScore);
        }
        setShowResults(true);
        setSubmitStatus(true);
        setTimeout(() => {
            setSubmitStatus(false);
        }, 4000);

    };

    const handleNext = () => {
        if (currentQuestionIndex < questions.length - 1) {
            setCurrentQuestionIndex((prev) => prev + 1);
        }
    };

    const handlePrevious = () => {
        if (currentQuestionIndex > 0) {
            setCurrentQuestionIndex((prev) => prev - 1);
        }
    };

    const handleDragDrop = (id, answerStatus) => {
        setUserAnswers((prev) => ({ ...prev, [id]: [answerStatus] }));
    }

    return (
        <div className=" p-4 row" style={{ minHeight: "600px" }}>
            <h3 className="pb-2">Check Your Understanding</h3>
            {questions.length > 0 ? (
                <div className=" row ">
                    <div key={questions[currentQuestionIndex].id} className="mb-2 row align-items-start">
                        <h5>
                            {currentQuestionIndex + 1 + `)`} {questions[currentQuestionIndex].question}
                        </h5>
                        {questions[currentQuestionIndex].questionType.toLowerCase() === "drag&drop" ? (
                            <DragAndDrop data={questions[currentQuestionIndex]} onDataChange={handleDragDrop} />) :
                            <div className="row">
                                <div className=" col-md-6 col-sm-12 col-12 mb-2">
                                    {questions[currentQuestionIndex].options.map((option) => {
                                        const isSelected = userAnswers[questions[currentQuestionIndex].id]?.includes(option);

                                        return (
                                            <div
                                                key={`${questions[currentQuestionIndex].id}-${option}`}
                                                className="form-check p-2 mb-2 border rounded-3"
                                            >
                                                <input
                                                    type={
                                                        questions[currentQuestionIndex].questionType.toLowerCase() === "single"
                                                            ? "radio"
                                                            : "checkbox"
                                                    }
                                                    name={`question-${questions[currentQuestionIndex].id}`}
                                                    id={`question-${questions[currentQuestionIndex].id}-option-${option}`}
                                                    value={option}
                                                    checked={isSelected || false}
                                                    onChange={() =>
                                                        handleOptionChange(
                                                            questions[currentQuestionIndex].id,
                                                            option,
                                                            questions[currentQuestionIndex].questionType.toLowerCase() ===
                                                            "multiple"
                                                        )
                                                    }
                                                    disabled={showResults}
                                                    className="form-check-input mx-2"
                                                />
                                                <label
                                                    htmlFor={`question-${questions[currentQuestionIndex].id}-option-${option}`}
                                                    className="form-check-label"
                                                >
                                                    {option}
                                                </label>
                                            </div>
                                        );
                                    })}
                                </div>
                                {questions[currentQuestionIndex].type === "image" &&
                                    <div className="col-md-6 col-sm-12 col-12 mb-2" >
                                        <div className=" d-flex justify-content-center align-items-center rounded-2" >
                                            <div className="option-images row w-75 g-2 px-2 pb-2 ">
                                                {questions[currentQuestionIndex]?.images.map((image, index) => (
                                                    <div className="col-6 " key={`image-${index}`}>
                                                        <div className={`option-image-container ${userAnswers[questions[currentQuestionIndex]?.id]?.includes(questions[currentQuestionIndex]?.options[index]) ? "option-image-active" : ""}`}
                                                            onClick={() =>
                                                                handleOptionChange(
                                                                    questions[currentQuestionIndex]?.id,
                                                                    questions[currentQuestionIndex]?.options[index],
                                                                    questions[currentQuestionIndex]?.questionType.toLowerCase() === "multiple"
                                                                )
                                                            }
                                                        >
                                                            <img
                                                                src={image}
                                                                alt={`Option ${index}`}
                                                                className="option-image"

                                                            />
                                                        </div>
                                                    </div>
                                                ))}
                                            </div>

                                        </div>
                                    </div>
                                }
                            </div>
                        }

                    </div>

                    {showResults && (
                        <div>
                            <h2>Results</h2>
                            <p> Your score: {score} / {questionsCount}</p>
                        </div>
                    )}
                </div>
            ) : (
                <p>No questions available for the selected category.</p>
            )}

            <Modal.Footer className="justify-content-between align-self-end">

                <button onClick={handlePrevious} disabled={currentQuestionIndex === 0} className="previous-button">
                    Previous
                </button>
                {currentQuestionIndex < questions.length - 1 ? (
                    <button onClick={handleNext} className="next-button">
                        Next
                    </button>
                ) : !showResults && questions.length > 0 ? (
                    <button onClick={handleSubmit} className="submit-button">
                        Submit
                    </button>
                ) : (
                    <button onClick={() => setCloseAssesst(true)} className="close-button">
                        Close
                    </button>
                )}

            </Modal.Footer>

           
        </div >
    );
};

export default Assessment;
