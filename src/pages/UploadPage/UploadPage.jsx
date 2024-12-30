import React, { useState } from "react";
import "./UploadPage.css";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import Comments from "../../components/Comments/Comments";
import StarRatings from "react-star-ratings";
import { LuShare2 } from "react-icons/lu";
import policyTemplate from '../../assets/PolicyTemplate.pdf';
import { IoIosArrowForward } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const UploadPage = ({ userType }) => {
    // Define the stages of the process
    const stages = [
        { id: 1, label: "Learning Details" },
        { id: 2, label: "Assessment Configuration" },
        { id: 3, label: "Review and Preview" },
    ];

    const [currentStep, setCurrentStep] = useState(1); // Track the current step
    const [courseDetails, setCourseDetails] = useState({
        title: "",
        author: "",
        category: "",
        targetAudience: "",
        language: "",
        level: "",
        price: "",
    });

    const [curriculum, setCurriculum] = useState([
        { videoTitle: "", thumbnail: "", transcript: "", description: "", duration: "", status: "draft" },
    ]);

    const [assessmentConfig, setAssessmentConfig] = useState({
        triggerTime: "",
        assessmentTitle: "",
        type: "Multiple Choice",
        questions: [],
    });

    // Handle "Next" button click
    const handleNext = () => {
        if (currentStep < stages.length) {
            setCurrentStep((prevStep) => prevStep + 1);
        }
    };

    // Handle "Previous" button click
    const handlePrev = () => {
        if (currentStep > 1) {
            setCurrentStep((prevStep) => prevStep - 1);
        }
    };

    // Handle Course Details input change
    const handleCourseDetailsChange = (e) => {
        const { name, value } = e.target;
        setCourseDetails((prevDetails) => ({
            ...prevDetails,
            [name]: value,
        }));
    };

    // Handle Curriculum input change
    const handleCurriculumChange = (index, e) => {
        const { name, value } = e.target;
        const updatedCurriculum = [...curriculum];
        updatedCurriculum[index][name] = value;
        setCurriculum(updatedCurriculum);
    };

    const handleAssessmentChange = (e) => {
        const { name, value } = e.target;
        setAssessmentConfig((prevConfig) => ({
            ...prevConfig,
            [name]: value,
        }));
    };

    const handleQuestionChange = (index, e) => {
        const updatedQuestions = [...assessmentConfig.questions];
        updatedQuestions[index][e.target.name] = e.target.value;
        setAssessmentConfig((prevConfig) => ({
            ...prevConfig,
            questions: updatedQuestions,
        }));
    };

    const handleOptionChange = (questionIndex, optionIndex, e) => {
        const updatedQuestions = [...assessmentConfig.questions];
        updatedQuestions[questionIndex].options[optionIndex] = e.target.value;
        setAssessmentConfig((prevConfig) => ({
            ...prevConfig,
            questions: updatedQuestions,
        }));
    };

    const handleMultiSelectChange = (questionIndex, optionIndex, event) => {
        const updatedQuestions = [...assessmentConfig.questions];
        const selectedOptions = updatedQuestions[questionIndex].selectedOptions || [];

        if (event.target.checked) {
            selectedOptions.push(updatedQuestions[questionIndex].options[optionIndex]);
        } else {
            const optIdx = selectedOptions.indexOf(updatedQuestions[questionIndex].options[optionIndex]);
            if (optIdx > -1) selectedOptions.splice(optIdx, 1);
        }

        updatedQuestions[questionIndex].selectedOptions = selectedOptions;
        setAssessmentConfig((prevConfig) => ({
            ...prevConfig,
            questions: updatedQuestions,
        }));
    };

    const handleCorrectOptionChange = (index, e) => {
        const updatedQuestions = [...assessmentConfig.questions];
        updatedQuestions[index].correctOption = e.target.value;
        setAssessmentConfig((prevConfig) => ({
            ...prevConfig,
            questions: updatedQuestions,
        }));
    };

    const handleImageUpload = (index, e) => {
        const file = e.target.files[0];
        const updatedQuestions = [...assessmentConfig.questions];
        updatedQuestions[index].image = URL.createObjectURL(file);
        setAssessmentConfig((prevConfig) => ({
            ...prevConfig,
            questions: updatedQuestions,
        }));
    };

    const handleMatchingTextChange = (index, e) => {
        const updatedQuestions = [...assessmentConfig.questions];
        updatedQuestions[index].matchingText = e.target.value;
        setAssessmentConfig((prevConfig) => ({
            ...prevConfig,
            questions: updatedQuestions,
        }));
    };

    const [imagePreviews, setImagePreviews] = useState([]);

    const handleImagePreview = (inputIndex, event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                // Update the specific image preview
                setImagePreviews((prevPreviews) => {
                    const updatedPreviews = [...prevPreviews];
                    updatedPreviews[inputIndex] = e.target.result;
                    return updatedPreviews;
                });
            };
            reader.readAsDataURL(file);
            handleImageUpload(index, event); // Call the original handler
        }
    };

    const handleAddQuestion = () => {
        setAssessmentConfig((prevConfig) => ({
            ...prevConfig,
            questions: [
                ...prevConfig.questions,
                {
                    questionText: "",
                    options: assessmentConfig.type === "Multiple Choice" || assessmentConfig.type === "Multi-Select"
                        ? ["", "", "", ""]
                        : [],
                    correctOption: "",
                    selectedOptions: [],
                    matchingText: "",
                    image: null,
                    isSaved: false,
                },
            ],
        }));
    };

    const handleSaveQuestion = (index) => {
        const updatedQuestions = [...assessmentConfig.questions];
        const question = updatedQuestions[index];

        // Add the correct answer based on the question type
        if (assessmentConfig.type === "Multiple Choice") {
            question.correctAnswer = question.options[question.correctOptionIndex];
        } else if (assessmentConfig.type === "Multi-Select") {
            question.correctAnswer = question.selectedOptions;
        } else if (assessmentConfig.type === "True/False") {
            question.correctAnswer = question.correctOption;
        } else if (assessmentConfig.type === "Match the Image") {
            question.correctAnswer = question.matchingText;
        }

        // Mark the question as saved
        question.isSaved = true;

        // Update the assessment config
        setAssessmentConfig({ ...assessmentConfig, questions: updatedQuestions });
    };

     const navigate = useNavigate();
      const handleSubmit = () => {
        toast.success('Action successfully completed!', {
            position: 'top-right',
            autoClose: 3000, // Closes after 3 seconds
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
        });
    
        setTimeout(() => {
            navigate(-1); // Navigate back to the previous page
        }, 3100); // Ensure toast is visible before navigating
    };

    // Calculate progress bar width
    const progressWidth = `${((currentStep - 1) / (stages.length - 1)) * 100}%`;

    return (
        <main className="main-wrapper">
                  <ToastContainer />
            
            <div className="d-flex justify-content-center">
                <div className="steps-wrapper">
                    <div className="steps">
                        {stages.map((stage, index) => (
                            <div className="d-flex flex-column align-items-center" key={stage.id}>
                                <span className={`step ${index < currentStep ? "active" : ""}`}>
                                    {index + 1}
                                </span>

                            </div>
                        ))}

                        <div className="progress-bar">
                            <span className="progress" style={{ width: progressWidth }}></span>
                        </div>
                    </div>
                </div>
            </div>


            {/* Display content based on the current step */}
            <div className="d-flex justify-content-between align-items-start my-3">
                <div className="step-content">
                    <h2>{stages[currentStep - 1].label}</h2>
                </div>

                <div className="buttons">
                    <button
                        className="btn btn-prev"
                        onClick={handlePrev}
                        disabled={currentStep === 1}
                    >
                        <AiOutlineArrowLeft />
                    </button>
                    <button
                        className="btn btn-next"
                        onClick={handleNext}
                        disabled={currentStep === stages.length}
                    >
                        <AiOutlineArrowRight />
                    </button>
                </div>
            </div>
            <div className="upload-content">
                {/* Combine the "Course Details" and "Curriculum" sections in Step 1 */}
                {currentStep === 1 && (
                    <div className="step-content">
                        {/* Course Details Form */}
                        <div className="category-selection">
                            {/* <h3>Learning Details</h3> */}
                            <div className="row">
                                <div className="col-md-6">
                                    <input
                                        type="text"
                                        name="title"
                                        placeholder="Title"
                                        className="upload-input"
                                        value={courseDetails.title}
                                        onChange={handleCourseDetailsChange}
                                    />
                                </div>
                                <div className="col-md-6">
                                    <input
                                        type="text"
                                        name="author"
                                        className="upload-input"
                                        placeholder="Author Name"
                                        value={courseDetails.author}
                                        onChange={handleCourseDetailsChange}
                                    />
                                </div>
                                <div className="col-md-6">
                                    <select
                                        name="category"
                                        className="upload-input"
                                        value={courseDetails.category}
                                        onChange={handleCourseDetailsChange}
                                    >
                                        <option value="">Select Category</option>
                                        <option value="Policy">Policy</option>
                                        <option value="Orientation">Orientation</option>
                                        <option value="Training">Training</option>
                                    </select>
                                </div>
                                <div className="col-md-6">
                                    <input
                                        type="text"
                                        name="language"
                                        placeholder="Language"
                                        className="upload-input"
                                        value={courseDetails.language}
                                        onChange={handleCourseDetailsChange}
                                    />
                                </div>
                                <div className="col-md-6">
                                    <select
                                        name="level"
                                        value={courseDetails.level}
                                        onChange={handleCourseDetailsChange}
                                        className="upload-input"
                                    >
                                        <option value="">Select Level</option>
                                        <option value="Beginner">Beginner</option>
                                        <option value="Intermediate">Intermediate</option>
                                        <option value="Advanced">Advanced</option>
                                    </select>
                                </div>
                            </div>
                        </div>

                        {/* Curriculum Form */}
                        <div className="curriculum-section">
                            {/* <h3>Curriculum</h3> */}
                            {curriculum.map((module, index) => (
                                <div key={index} className="module-form">

                                    <div className="row">


                                        <div className="col-md-6" >
                                            <textarea
                                                name="transcript"
                                                placeholder="Transcript"
                                                value={module.transcript}
                                                onChange={(e) => handleCurriculumChange(index, e)}
                                                className="upload-input"
                                            />
                                        </div>
                                        <div className="col-md-6" >
                                            <textarea
                                                name="description"
                                                placeholder="Description"
                                                value={module.description}
                                                onChange={(e) => handleCurriculumChange(index, e)}
                                                className="upload-input"
                                            />
                                        </div>
                                        <div className="col-md-6" >
                                            <input
                                                type="number"
                                                name="duration"
                                                placeholder="Duration (minutes)"
                                                value={module.duration}
                                                onChange={(e) => handleCurriculumChange(index, e)}
                                                className="upload-input"
                                            />
                                        </div>
                                        {/* <div className="col-md-6" >
                                            <select
                                                name="status"
                                                value={module.status}
                                                onChange={(e) => handleCurriculumChange(index, e)}
                                                className="upload-input"
                                            >
                                                <option value="draft">Draft</option>
                                                <option value="in-progress">In Progress</option>
                                            </select>
                                        </div> */}
                                        <div className="col-md-6" >

                                            {/* Conditional File Upload Input Based on Category */}
                                            {courseDetails.category === 'Policy' && (
                                                <div className="file-upload">
                                                    <input
                                                        type="file"
                                                        name="policyFile"
                                                        accept="application/pdf"
                                                        className="upload-input"
                                                        onChange={(e) => handleCurriculumChange(index, e)}
                                                    />
                                                    <label>Upload PDF (Policy)</label>
                                                </div>
                                            )}

                                            {courseDetails.category === 'Orientation' && (
                                                <div className="file-upload">
                                                    <input
                                                        type="file"
                                                        name="orientationFile"
                                                        accept=".ppt,.pptx"
                                                        className="upload-input"
                                                        onChange={(e) => handleCurriculumChange(index, e)}
                                                    />
                                                    <label>Upload PPT (Orientation)</label>
                                                </div>
                                            )}
                                            {courseDetails.category === 'Training' && (
                                                <div className="file-upload">
                                                    <input
                                                        type="file"
                                                        name="trainingFile"
                                                        accept="video/*"
                                                        className="upload-input"
                                                        onChange={(e) => handleCurriculumChange(index, e)}
                                                    />
                                                    <label>Upload Video (Training)</label>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Step 2: Assessment Configuration */}
                {currentStep === 2 && (
                    <div className="step-content">
                        <div className="row">
                            {courseDetails.category === 'Training' && (
                                <div className="col-md-6">
                                    <input
                                        type="number"
                                        name="triggerTime"
                                        placeholder="Trigger Time (minutes)"
                                        value={assessmentConfig.triggerTime}
                                        onChange={handleAssessmentChange}
                                        className="upload-input"
                                    />
                                </div>
                            )}
                            <div className="col-md-6">
                                <input
                                    type="text"
                                    name="assessmentTitle"
                                    placeholder="Assessment Title"
                                    value={assessmentConfig.assessmentTitle}
                                    onChange={handleAssessmentChange}
                                    className="upload-input"
                                />
                            </div>

                            <div className="col-md-6">
                                <select
                                    name="type"
                                    value={assessmentConfig.type}
                                    onChange={handleAssessmentChange}
                                    className="upload-input"
                                >
                                    <option value="Multiple Choice">Multiple Choice</option>
                                    {/* <option value="Multi-Select">Multi-Select</option> */}
                                    <option value="True/False">True/False</option>
                                    <option value="Match the Image">Match the Image</option>

                                </select>
                            </div>
                        </div>

                        {/* Dynamic Question Section */}
                        <div className="questions-section">
                            <div className="d-flex justify-content-between align-items-center">
                                <h3>Questions</h3>
                                <button
                                    className="upload-button"
                                    onClick={handleAddQuestion}
                                    disabled={!assessmentConfig.questions.every((q) => q.isSaved)}
                                >
                                    Add Question
                                </button>
                            </div>
                            {assessmentConfig.questions.map((question, index) => (
                                <div key={index} className="question-form">
                                    {/* Display the question number */}
                                    <div className="question-number">
                                        Question {index + 1}
                                    </div>
                                    <textarea
                                        name="questionText"
                                        placeholder="Question Text"
                                        className="upload-input"
                                        value={question.questionText}
                                        onChange={(e) => handleQuestionChange(index, e)}
                                        disabled={question.isSaved}
                                    />
                                    <div className="row">
                                        {assessmentConfig.type === "Multiple Choice" &&
                                            question.options.map((option, optIndex) => (
                                                <div className="col-md-6" key={optIndex}>
                                                    <input
                                                        type="text"
                                                        className="upload-input"
                                                        placeholder={`Option ${optIndex + 1}`}
                                                        value={option}
                                                        onChange={(e) => handleOptionChange(index, optIndex, e)}
                                                        disabled={question.isSaved}
                                                    />
                                                </div>
                                            ))}
                                    </div>

                                    <div className="row">
                                        {assessmentConfig.type === "Multi-Select" &&
                                            question.options.map((option, optIndex) => (
                                                <div className="col-md-6" key={optIndex}>
                                                    <input
                                                        type="text"
                                                        className="upload-input"
                                                        placeholder={`Option ${optIndex + 1}`}
                                                        value={option}
                                                        onChange={(e) => handleOptionChange(index, optIndex, e)}
                                                        disabled={question.isSaved}
                                                    />
                                                </div>
                                            ))}
                                    </div>

                                    <div className="d-flex gap-4 mb-3">
                                        {assessmentConfig.type === "True/False" && (
                                            <div className="true-false-options d-flex gap-4 ">
                                                <label className="d-flex gap-1">
                                                    <input
                                                        type="radio"
                                                        name={`correctOption-${index}`}
                                                        value="True"
                                                        checked={question.correctOption === "True"}
                                                        onChange={(e) => handleCorrectOptionChange(index, e)}
                                                        disabled={question.isSaved}
                                                    />
                                                    True
                                                </label>
                                                <label className="d-flex gap-1">
                                                    <input
                                                        type="radio"
                                                        name={`correctOption-${index}`}
                                                        value="False"
                                                        checked={question.correctOption === "False"}
                                                        onChange={(e) => handleCorrectOptionChange(index, e)}
                                                        disabled={question.isSaved}
                                                    />
                                                    False
                                                </label>
                                            </div>
                                        )}
                                    </div>

                                    {assessmentConfig.type === "Match the Image" && (
                                        <>
                                            {[...Array(4)].map((_, inputIndex) => (
                                                <div className="match-image-section d-flex" key={inputIndex}>
                                                    <div>
                                                        <input
                                                            type="file"
                                                            accept="image/*"
                                                            className="form-control"
                                                            onChange={(e) => handleImagePreview(inputIndex, e)}
                                                            disabled={question.isSaved}
                                                        />
                                                        {imagePreviews[inputIndex] && (
                                                            <img
                                                                src={imagePreviews[inputIndex]}
                                                                alt={`Preview ${inputIndex + 1}`}
                                                                style={{ width: "100px", height: "100px", marginTop: "10px" }}
                                                            />
                                                        )}
                                                    </div>
                                                    <input
                                                        type="text"
                                                        placeholder="Matching Text"
                                                        className="upload-input h-25"
                                                        value={question.matchingText || ""}
                                                        onChange={(e) => handleMatchingTextChange(index, e)}
                                                        disabled={question.isSaved}
                                                    />
                                                </div>
                                            ))}
                                        </>
                                    )}

                                    {!question.isSaved ? (
                                        <button
                                            className="upload-button"
                                            onClick={() => handleSaveQuestion(index)}
                                        >
                                            Save Question
                                        </button>
                                    ) : (
                                        <span className="question-saved-label">Saved</span>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                )}


                {/* Step 3: Review and Preview */}
                {currentStep === 3 && (
                    <div className="step-content">
                        <div>
                            <div className="d-flex flex-wrap justify-content-between">
                                <h3>Preview</h3>
                                <div className="d-flex gap-1">
                                    <button className="upload-button" onClick={handleSubmit} >Save as Draft
                                    </button>{userType === "Admin" ?
                                        <button className="upload-button" onClick={handleSubmit}>Publish
                                        </button> :
                                        <button className="upload-button" onClick={handleSubmit}>Sumbit for Approval
                                        </button>
                                    }
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-8">
                                    <div className="d-flex align-items-center justify-content-between">
                                        <h3>{courseDetails?.title ? courseDetails.title : "Title"}</h3>
                                        {
                                            <button className="primary-button" >
                                                Check your Knowledge <IoIosArrowForward size={24} />
                                            </button>
                                        }
                                    </div>

                                    <div className="library-content-container">
                                        {/* {courseDetails.category === 'Policies' && ( */}
                                        <embed
                                            src={policyTemplate}
                                            className="document"
                                            title="Policy"
                                        />
                                        {/* )} */}

                                        {/* {courseDetails.category === 'Orientations' && (
                <iframe
                  src={`https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(course?.document)}`}
                  width="100%"
                  height="600px"
                  frameBorder="0"
                  title={course?.title}
                  className="document"
                  style={{
                    border: 'none',
                    borderRadius: '8px',
                  }}
                ></iframe>
              )} */}

                                        {/* {courseDetails.category === 'Trainings' && ( */}
                                        {/* <video
                  src={course?.document} 
                  controls
                  width="100%"
                  className="document"
                  title="Training Video"
                  ref={videoRef}
                  onTimeUpdate={updateTimeHandler}

                  onProgress={bufferHandler}
                /> */}
                                        {/* )} */}
                                    </div>

                                    <div className="px-3">
                                        <div className="d-flex justify-content-between align-items-center mb-3">
                                            <b>
                                                {courseDetails?.category} <i>by</i> <span className="author-name">{courseDetails?.author ? courseDetails?.author : "Author"}</span>
                                            </b>
                                            <div className="d-flex gap-3">
                                                <div >
                                                    <LuShare2 size={24} />
                                                </div>
                                                <div >
                                                    <StarRatings
                                                        rating={0}
                                                        starRatedColor="gold"
                                                        //   changeRating={handleRatingChange}
                                                        numberOfStars={5}
                                                        starDimension="24px"
                                                        starSpacing="2px"
                                                        name="courseRating"
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                        <p className="text-secondary" dangerouslySetInnerHTML={{ __html: curriculum?.description }} />
                                    </div>
                                </div>

                                <div className="col-md-4">
                                    <Comments />
                                </div>
                            </div>
                        </div>

                    </div>
                )}
            </div>
        </main>
    );
};

export default UploadPage;
