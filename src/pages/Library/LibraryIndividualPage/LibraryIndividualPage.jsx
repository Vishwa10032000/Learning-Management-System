import React, { useEffect, useState } from 'react';
import { Player } from '@lottiefiles/react-lottie-player';
import './LibraryIndividualPage.css';
import { IoIosArrowForward } from 'react-icons/io';
import { LuShare2 } from 'react-icons/lu';
import { FaHeart, FaRegHeart } from 'react-icons/fa6';
import Comments from '../../../components/Comments/Comments';
import { useNavigate, useParams } from 'react-router-dom';
import LibraryData from '../../../data/LibraryData';
import loadingAnimation from '../../../assets/loadingAnimation.json'; // Your Lottie animation file
import TeamsLogo from '../../../assets/TeamsLogo.png';
import OutlookLogo from '../../../assets/OutlookLogo.png';
import Modal from 'react-bootstrap/Modal';
import Assessment from '../../Assessment/Assessment';
import { useRef } from 'react';
import question from '../../Assessment/AssessmentQuestion';
import StarRatings from 'react-star-ratings';
import { MdPublish } from 'react-icons/md';
import { GiReturnArrow } from 'react-icons/gi';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const LibraryIndividualPage = ({userType}) => {
  const { category, id } = useParams();
  const [course, setCourse] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [showShareModal, setShowShareModal] = useState(false); // Modal state
  const [showAssessment, setShowAssessment] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [testQuestion, setTestQuestion] = useState([]);
  const [selectedQuestion, setSelectedQuestions] = useState([]);

  useEffect(() => {
    const questionsData = question.filter((question) => question.category === category);
    setQuestions(questionsData);
  }, []);
  const videoRef = useRef(null);
  const progressRef = useRef(null);
  const bufferRef = useRef(null);

  const [currentTime, setCurrentTime] = useState(0);
  const [rating, setRating] = useState(0);
  const [trainingScore, setTainingScore] = useState(0);

  const fetchCourse = () => {
    const courseItem = LibraryData.LibraryData.courses.find(
      (item) => item.category === category && item.id === parseInt(id, 10)
    );
    setTimeout(() => {
      setCourse(courseItem);
      setIsLoading(false);
    }, 4000);
  };

  useEffect(() => {
    fetchCourse();
  }, [category, id]);


  const handleRatingChange = (newRating) => {
    setRating(newRating);
    console.log(`Course rated: ${newRating} stars`);
  };


  const handleShareClick = () => {
    setShowShareModal(true);
  };

  const closeModal = () => {
    setShowShareModal(false);
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

  const handleShareInTeams = () => {
    const teamsLink = `https://teams.microsoft.com/l/chat/0/0?users=&message=${encodeURIComponent(
      `Check out this course: ${course?.title} - ${window.location.href}`
    )}`;
    window.open(teamsLink, '_blank');
  };

  const handleShareInOutlook = () => {
    const subject = encodeURIComponent(`Check out this course: ${course?.title}`);
    const body = encodeURIComponent(
      `Hi,\n\nI found this course interesting and thought you might like it:\n\n${window.location.href}\n\nBest regards!`
    );
    const outlookLink = `mailto:?subject=${subject}&body=${body}`;
    window.open(outlookLink, '_blank');
  };



  const updateTimeHandler = () => {
    if (videoRef.current) {
      const currentTime = videoRef.current.currentTime;
      setCurrentTime(currentTime);

      if (progressRef.current) {
        const progressPercentage = (currentTime / videoRef.current.duration) * 100;
        progressRef.current.style.width = `${progressPercentage}%`;
      }

      if (category === "Trainings") {
        const unansweredQuestions = questions.filter((q) => {
          const isAlreadyAnswered = testQuestion.some((testQ) => testQ.id === q.id);
          const isEligibleForDisplay = q.questionShowTime <= currentTime;

          return !isAlreadyAnswered && isEligibleForDisplay;
        });


        if (unansweredQuestions.length > 0 && !showAssessment) {
          videoRef.current.pause();
          setShowAssessment(true);
          setSelectedQuestions(unansweredQuestions)
          setTestQuestion((prev) => [...prev, ...unansweredQuestions.map((q) => q)]);

        }
      }
    }
  };


  const bufferHandler = () => {
    if (videoRef.current && bufferRef.current) {
      const buffer = videoRef.current.buffered.length
        ? videoRef.current.buffered.end(0)
        : 0;
      const percentage = (buffer / videoRef.current.duration) * 100;
      bufferRef.current.style.width = `${percentage}%`;
    }
  };

  const handleAssesst = (closeAssesst, score) => {
    if (closeAssesst) {
      setShowAssessment(false);
      if (category === "Trainings") {
        setSelectedQuestions([]);
        videoRef.current.play();
        setTainingScore(score);
      }
    }
  }

  return (
    <div className="library-individual-page">
      <ToastContainer />
      {isLoading && (
        <div className="loading-overlay">
          <Player
            autoplay
            loop
            src={loadingAnimation}
            style={{ height: '200px', width: '200px' }}
          />
        </div>
      )}

      {!isLoading && (
        <div className="row">
          <div className="col-md-8">
            <div className="d-flex align-items-center justify-content-between">
              <h4>{course?.title}</h4>
              {category.toLowerCase() !== 'trainings' && 
                <button className="primary-button" onClick={() => setShowAssessment(true)}>
                  Check your Knowledge <IoIosArrowForward size={24} />
                </button>
              }
            </div>

            <div className="library-content-container">
              {category === 'Policies' && (
                <embed
                  src={course?.document}
                  className="document"
                  title="Policy"
                />
              )}

              {category === 'Orientations' && (
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
              )}

              {category === 'Trainings' && (
                <video
                  src={course?.document} // Assuming course.document is the video URL
                  controls
                  width="100%"
                  className="document"
                  title="Training Video"
                  ref={videoRef}
                  onTimeUpdate={updateTimeHandler}

                  onProgress={bufferHandler}
                />
              )}
            </div>

            <div className="px-3">
              <div className="d-flex justify-content-between align-items-center mb-3">
                <b>
                  {course?.category} <i>by</i> <span className="author-name">{course?.instructor}</span>
                </b>
                <div className="d-flex gap-3">
                  <div onClick={handleShareClick}>
                    <LuShare2 size={16} />
                  </div>
                  <div >
                    <StarRatings
                      rating={rating}
                      starRatedColor="gold"
                      changeRating={handleRatingChange}
                      numberOfStars={5}
                      starDimension="16px"
                      starSpacing="2px"
                      name="courseRating"
                    />
                  </div>
                </div>
              </div>

              <p className="text-secondary " dangerouslySetInnerHTML={{ __html: course?.description }} />
            </div>
          </div>

          <div className="col-md-4">
            <Comments />
            {userType === "Admin" && <div className='d-flex justify-content-center   gap-2 my-3'><button className='upload-button d-flex align-items-center justify-content-center gap-1' onClick={handleSubmit}><MdPublish size={24}/> Publish</button><button className='upload-button d-flex align-items-center justify-content-center gap-2' onClick={handleSubmit}><GiReturnArrow size={20} />Return</button></div>}
          </div>
        </div>
      )}

      {showShareModal && (
        <div className="modal-share">
          <div className="modal-share-content">
            <h4>Share this Course</h4>
            <button className='' onClick={handleShareInTeams}><img src={TeamsLogo} className='bg-white p-1 rounded' alt='TeamsLogo' width="30px" height="30px" /> Share in Teams</button> OR
            <button onClick={handleShareInOutlook}><img src={OutlookLogo} className='bg-white p-1 rounded' alt='TeamsLogo' width="30px" height="30px" />Share in Outlook</button>
            <button onClick={closeModal} className="close-button">
              Close
            </button>
          </div>
        </div>
      )}

      {/* Assessment*/}
      <Modal
        className='modal-xl'
        show={showAssessment}
        onBackdropClick={() => setShowAssessment(false)}
        backdrop='static'
        keyboard={false}
        // fullscreen={true}
        centered
      >
        <Assessment onDataChange={handleAssesst} category={category} Questions={selectedQuestion} QuestionCount={testQuestion.length} Score={trainingScore} showQuestion ={showAssessment} />
      </Modal>

    </div>
  );
};

export default LibraryIndividualPage;
