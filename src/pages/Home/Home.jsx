import React, { useEffect, useRef, useState } from 'react'
import heroImageBg from '../../assets/heroImage.svg'
import './Home.css'
import PolicyImage from "../../assets/policy.svg";
import TrainingImage from "../../assets/training.svg";
import OrientationImage from "../../assets/orientation.svg";
import SolutionsImage from "../../assets/apps.svg";

import { motion } from "framer-motion";
import { Link } from 'react-router-dom';
import { IoIosArrowDropright } from 'react-icons/io';

const Home = () => {

  const heroContent = [
    {
      title: "Explore the available Solutions",
      description:
        "Whenever a new requirement arise it is always a good practice to explore the existing solutions before looking out for a new product.",
      image: SolutionsImage,
      indicator: "Solutions",
      link: "/apps"
    },
    {
      title: "Elevate Your Core Skill with our Trainings",
      description:
        "Empower the skills needed to excel in the ever-evolving changes in the Core Functions. It also boosts the user's ability and confidence in their executions.",
      image: TrainingImage,
      indicator: "Trainings",
      link: "/library/Trainings"
    },{
      title: "Big Picture",
      description:
        "Orientations are crafted to provide you with the essential knowledge of a process or a function in any department. Understanding the Big Picture creates critical impacts in the user's performance.",
      image: OrientationImage,
      indicator: "Orientations",
      link: "/library/Orientations"
    },
    {
      title: "Do's and Dont's of Your Company",
      description:
        "Policies are designed to meet the company standards based on the instructions by the Management, Legal Team and from the experts of Core Functions.",
      image: PolicyImage,
      indicator: "Policies",
      link: "/library/Policies"
    },
    
   
    
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const timerRef = useRef(null); // Ref to store the interval ID
  const cycleTime = 15000; // Interval duration

  // Start the interval
  const startTimer = () => {
    timerRef.current = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % heroContent.length);
    }, cycleTime);
  };

  // Clear the interval
  const resetTimer = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    startTimer();
  };

  useEffect(() => {
    startTimer(); // Start the interval on mount
    return () => clearInterval(timerRef.current); // Cleanup on unmount
  }, []);

  const handleIndicatorClick = (index) => {
    setCurrentIndex(index);
    resetTimer(); // Reset the timer on indicator click
  };

  const textVariants = {
    initial: { opacity: 0, x: -50 },
    animate: { opacity: 1, x: 0, transition: { duration: 0.5 } },
    exit: { opacity: 0, x: 50, transition: { duration: 0.5 } },
  };

  const imageVariants = {
    initial: { opacity: 0, scale: 0.9 },
    animate: { opacity: 1, scale: 1, transition: { duration: 0.5 } },
    exit: { opacity: 0, scale: 0.9, transition: { duration: 0.5 } },
  };
  return (
    <div className='home'>
      <div className='hero-image-container'>
        <img src={heroImageBg} alt='heroImageBg' className='hero-image-bg' />
        <div class="hero-content">
          <div className="row">
            
             {/* Hero Image Section */}
             <div className="col-md-6">
              <motion.div
                key={currentIndex} // Ensures re-render for animations
                variants={imageVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="d-flex align-items-center justify-content-center h-100"
              >
                <img
                  src={heroContent[currentIndex].image}
                  className="image-shadow"
                  alt="hero-image"
                  width="100%"
                />
              </motion.div>
            </div>
            {/* Indicators */}
            <div className="col-md-6 col-lg-6">
              <div className="d-flex flex-column justify-content-center gap-4 h-100">

                <motion.div
                  key={currentIndex} // Ensures re-render for animations
                  variants={textVariants}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  className="transition"
                >
                  {/* <h1 className="hero-welcome">
                  Welcome back,<br />{" "}
                  <span className="hero-user">John Deo!</span>
                </h1> */}
                  <div>
                    <h1 className="hero-title">{heroContent[currentIndex].title}</h1>
                    <p className="hero-description">
                      {heroContent[currentIndex].description}
                    </p>
                    <Link className="text-decoration-none" to={`${heroContent[currentIndex].link}`}><button className="button-one" >Explore Now <IoIosArrowDropright size={24} /></button></Link>
                  </div>
                </motion.div>
                <div className="mb-5 indicator-container">
                {heroContent.map((item, index) => (
                  <span
                    key={index}
                    className={`indicator ${index === currentIndex ? "active" : ""
                      }`}
                    onClick={() => handleIndicatorClick(index)}
                  >
                    {item.indicator}
                  </span>
                ))}
              </div>
              </div>
             
            </div>           
          </div>
        </div>
      </div>
    </div>
  )
}

export default Home