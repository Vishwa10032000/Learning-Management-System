import React, { useEffect, useRef, useState } from "react";
import card1 from "../../assets/Travel-policy.png";
import card2 from "../../assets/SharePoint.svg";
import card3 from "../../assets/BigPicture.svg";
import "./Dashboard.css";
import Avatar from '@mui/material/Avatar';

import { SlArrowRight } from "react-icons/sl";
import { CiEdit } from "react-icons/ci";
import { FaAngleLeft, FaAngleRight } from "react-icons/fa6";
import profile from "../../assets/profile.avif";
import userProfile from "../../assets/profile.png";
import { MdAccessTime } from "react-icons/md";
import { FaCalendarAlt } from "react-icons/fa";




const courses = [
    {
        id: 1,
        title: "Travel Policy - 2025",
        description: "Know Your travel advance and Reimbursement process.",
        image: card1,
        category: "Policies",
        author: "Human Resources",
    },
    {
        id: 2,
        title: "SharePoint Insights",
        description: "Understanding SharePoint basics.",
        image: card2,
        category: "Trainings",
        author: "SharePoint Team",
    },
    {
        id: 3,
        title: "IT Big Picture",
        description: "To understand the process and procedures of various tools and applications.",
        image: card3,
        category: "Orientations",
        author: "IT Team",
    },
    {
        id: 4,
        title: "Travel Policy - 2025",
        description: "Know Your travel advance and Reimbursement process.",
        image: card1,
        category: "Policies",
        author: "Human Resources",
    },
];

const schedules = [
    {
        id: 1,
        title: "Travel Policy - 2025",
        description: "Know Your travel advance and Reimbursement process.",
        category: "Policies",
        author: "Human Resources",
        avatar: profile,
        duration: "00:05:30",
        date: "2024-11-20T14:10:04Z",
    },
    {
        id: 2,
        title: "SharePoint Insights",
        description: "Understanding SharePoint basics with tools like built-in usage analytics and Power BI.",
        category: "Trainings",
        author: "SharePoint Team",
        avatar: profile,
        duration: "01:05:30",
        date: "2024-11-20T14:10:04Z",
    },
    {
        id: 3,
        title: "IT Big Picture",
        description: "To understand the process and procedures of various tools and applications.",
        category: "Orientations",
        author: "IT Team",
        avatar: profile,
        duration: "00:15:30",
        date: "2024-11-02T14:10:04Z",
    },
    {
        id: 4,
        title: "Travel Policy - 2025",
        description: "Know Your travel advance and Reimbursement process.",
        category: "Policies",
        author: "Human Resources",
        avatar: profile,
        duration: "00:05:30",
        date: "2024-01-12T14:10:04Z",
    },
    {
        id: 5,
        title: "SharePoint Insights",
        description: "Understanding SharePoint Basics.",
        category: "Trainings",
        author: "SharePoint Team",
        avatar: profile,
        duration: "01:05:30",
        date: "2024-11-10T14:10:04Z",
    },
    {
        id: 6,
        title: "IT Big Picture",
        description: "To understand the process and procedures of various tools and applications.",
        category: "Orientations",
        author: "IT Team",
        avatar: profile,
        duration: "00:14:30",
        date: "2024-10-20T14:10:04Z",
    },
];



const DurationFormat = (duration) => {

    const [hours, minutes, seconds] = duration.split(':').map(Number);
    const totalMinutes = hours * 60 + minutes + seconds / 60;

    if (totalMinutes >= 60) {
        const formattedHours = Math.floor(totalMinutes / 60);
        const formattedMinutes = Math.round(totalMinutes % 60);
        return `${formattedHours} hour${formattedHours > 1 ? 's' : ''} ${formattedMinutes} minute${formattedMinutes !== 1 ? 's' : ''}`;
    } else {
        return `${Math.round(totalMinutes)} minute${Math.round(totalMinutes) !== 1 ? 's' : ''}`;
    }
}
const TimeFormat = (date) => {
    const PolicyDate = new Date(date);
    const now = new Date();
    const timeDifference = Math.max(now - PolicyDate, 0);

    const hours = Math.floor(timeDifference / (1000 * 60 * 60));
    const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    const weeks = Math.floor(days / 7);

    if (hours < 24) {
        return `${hours} hr${hours !== 1 ? 's' : ''} ago`;
    } else if (days < 7) {
        return `${days} day${days !== 1 ? 's' : ''} ago`;
    } else if (days < 30) {
        return `${weeks} week${weeks !== 1 ? 's' : ''} ago`;
    } else {
        return PolicyDate.toLocaleDateString("en-US", {
            year: "numeric",
            month: "short",
            day: "numeric",
        });
    }
};


const Calendar = () => {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [currentWeekDates, setCurrentWeekDates] = useState([]);

    useEffect(() => {
        // Get the current week dates based on the selected date
        const startOfWeek = new Date(selectedDate);
        startOfWeek.setDate(selectedDate.getDate() - selectedDate.getDay()); // Set to start of the week
        const weekDates = Array.from({ length: 7 }, (_, i) => {
            const date = new Date(startOfWeek);
            date.setDate(startOfWeek.getDate() + i);
            return date;
        });
        setCurrentWeekDates(weekDates);
    }, [selectedDate]);

    const handlePrevClick = () => {
        const newDate = new Date(selectedDate);
        newDate.setDate(selectedDate.getDate() - 7); // Move to previous week
        setSelectedDate(newDate);
    };

    const handleNextClick = () => {
        const newDate = new Date(selectedDate);
        newDate.setDate(selectedDate.getDate() + 7); // Move to next week
        setSelectedDate(newDate);
    };

    const handleDateClick = (date) => {
        setSelectedDate(date);
    };

    return (
        <div className="calendar-container p-2 shadow-sm ">
            <div className="d-flex align-items-center justify-content-between mb-3">
                {currentWeekDates.map((date, index) => (
                    <div
                        key={index}
                        className={`date-view ${selectedDate.toDateString() === date.toDateString() ? "selected-date" : ""}`}
                        onClick={() => handleDateClick(date)}
                    >
                        <span className={`${selectedDate.toDateString() === date.toDateString() ? "date-field" : ""}`}>{date.getDate()}</span>
                        <span className="text-sm">
                            {date.toLocaleDateString("en-US", { weekday: "short" })}
                        </span>
                    </div>
                ))}
            </div>
            <div className="d-flex gap-2 justify-content-end">
                <button
                    className=" date-nav-button shadow-sm"
                    onClick={handlePrevClick}
                >
                    <FaAngleLeft />
                </button>
                <button
                    className="date-nav-button shadow-sm"
                    onClick={handleNextClick}
                >
                    <FaAngleRight />
                </button>
            </div>
        </div>
    );
};




const useScroll = () => {
    const scrollRef = useRef(null);
    const [leftArrow, setLeftArrow] = useState(false);
    const [rightArrow, setRightArrow] = useState(true);

    const handleScroll = () => {
        if (scrollRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
            setLeftArrow(scrollLeft > 0);
            setRightArrow(scrollLeft + clientWidth < scrollWidth);
        }
    };

    const scrollLeft = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({
                left: -300,
                behavior: 'smooth',
            });
        }
    };

    const scrollRight = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({
                left: 300,
                behavior: 'smooth',
            });
        }
    };

    useEffect(() => {
        const ref = scrollRef.current;
        if (ref) {
            handleScroll(); // Initialize the visibility of arrows
            ref.addEventListener('scroll', handleScroll);
        }
        return () => {
            if (ref) ref.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return { scrollRef, leftArrow, rightArrow, scrollLeft, scrollRight };
};





const Dashboard = () => {

    const recentViewScroll = useScroll();
    const scheduleScroll = useScroll();

    return (
        <div className="container-fluid dashboard" >
            <div className="row flex-md-row-reverse mt-2">
                <div className="col-md-12 col-lg-4 col-sm-12  mb-3 ">
                    <div className="d-flex flex-md-row flex-column flex-lg-column align-items-center shadow rounded-4 p-2 h-100">
                        <div className="row w-100 ">
                            <div className="col-md-6 col-12 col-lg-12 ">
                                <div className="d-flex justify-content-between align-items-center p-2">
                                    <h5>Profile</h5>
                                    <div>
                                        <button className="profile-edit">
                                            <CiEdit size={15} />
                                        </button>
                                    </div>
                                </div>
                                <div className="d-flex flex-column justify-content-center align-items-center mb-2">
                                    <Avatar alt="Trevor Henderson" src={userProfile} sx={{ width: 110, height: 110 }} />
                                    <div className="my-2 d-flex gap-1">
                                        <h6>Manikandan</h6>
                                        {/* <RiVerifiedBadgeFill size={20} color="#cba1fc" /> */}
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-6 col-12 col-lg-12 align-content-end ">
                                <div className="p-3 row">
                                    {Calendar()}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="col-md-12 col-lg-8 col-sm-12 mb-3">
                    <div className="shadow  rounded-4 h-100 p-2 ">
                        <div className=" d-flex justify-content-between px-2">
                            <h5>Recent Views</h5>
                            <div className="d-flex gap-3 p-2">

                                <button className=" date-nav-button shadow-sm" onClick={recentViewScroll.scrollLeft}
                                    disabled={!recentViewScroll.leftArrow}>
                                    <FaAngleLeft />
                                </button>

                                <button
                                    className="date-nav-button shadow-sm"
                                    onClick={recentViewScroll.scrollRight}
                                    disabled={!recentViewScroll.rightArrow}
                                >
                                    <FaAngleRight />
                                </button>
                            </div>
                        </div>
                        <div className="d-flex flex-row flex-wrap justify-content-evenly">
                            <div className="recent-view" ref={recentViewScroll.scrollRef}>
                                {courses.map((course) => (
                                    <div key={course.id} className="col-md-6 col-lg-4 col-sm-6 col-12 mb-3">
                                        <div className={`course-card course-${course.id} py-2 row h-100 `}>
                                            <div>
                                                <img src={course.image} alt={course.title} className="img-thumbnail rounded-4 mb-2 w-100" />
                                            </div>
                                            <div className="align-items-start">
                                                <h5 className="recent-course-title">{course.title}</h5>
                                                <div className="recent-course-category mb-2">
                                                    {course.category}
                                                </div>
                                                <p className="recent-course-description mb-2">{course.description}</p>
                                            </div>
                                            <div className="d-flex justify-content-between align-items-end">
                                                <div className="d-flex align-items-center">
                                                    <Avatar alt={course.author} src={profile} sx={{ width: 28, height: 28 }} />
                                                    <div className="px-2 author-signature gap-1 d-flex"><span className='fst-italic'>by</span>{course.author}</div>
                                                </div>
                                                <div>
                                                    <button className={`courseButton course-${course.id}`}>
                                                        <SlArrowRight size={15} />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="row mb-3 shadow rounded-4  mx-0">
                <div className="p-3">
                    <div className=" d-flex justify-content-between">
                        <h5>My Schedule</h5>
                        <div className="d-flex gap-3 p-2">
                            <button
                                className="date-nav-button shadow-sm"
                                onClick={scheduleScroll.scrollLeft}
                                disabled={!scheduleScroll.leftArrow}
                            >
                                <FaAngleLeft />
                            </button>
                            <button
                                className="date-nav-button shadow-sm"
                                onClick={scheduleScroll.scrollRight}
                                disabled={!scheduleScroll.rightArrow}
                            >
                                <FaAngleRight />
                            </button>
                        </div>
                    </div>

                    <div className=" schedule-content row gx-2 " ref={scheduleScroll.scrollRef}>
                        {schedules.map((schedule, index) => (
                            <div key={schedule.id} className="col-12 col-sm-6 col-md-4 col-lg-3 mb-2 ">
                                <div className={`schedule-card p-3 m-0 row ${index % 2 === 0 ? "odd" : "even"}`}>
                                    <div className="align-content-start">
                                        <h5 className="mb-2 schedule-title">{schedule.title}</h5>
                                        <div className="schedule-card-category mb-2">
                                            {schedule.category}
                                        </div>
                                        <div className="recent-course-description mb-2">
                                            {schedule.description}
                                        </div>
                                        <div className="schedule-review-time mb-2">
                                            <MdAccessTime style={{ color: "#ffa500" }} size={20} />
                                            <span className="ms-2">{DurationFormat(schedule.duration)}</span>
                                        </div>
                                        <div className="schedule-review-time mb-2">
                                            <FaCalendarAlt style={{ color: "#ffa500" }} size={18} />
                                            <span className="ms-2">{TimeFormat(schedule.date)}</span>
                                        </div>

                                    </div>
                                    <div className="align-content-end">
                                        <div className="d-flex align-items-center">
                                            <Avatar
                                                alt={schedule.author}
                                                src={schedule.avatar}
                                                sx={{ width: 28, height: 28 }}
                                            />
                                            <div className="px-2 author-signature gap-1 d-flex"><span className='fst-italic'>by</span>{schedule.author}</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Dashboard;