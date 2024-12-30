import React, { useEffect, useState } from 'react';
import "./Library.css";
import { IoListSharp } from 'react-icons/io5';
import { TbLayoutGridFilled } from 'react-icons/tb';
import { FaRegStar, FaStarHalfAlt } from "react-icons/fa";
import { FaGraduationCap } from "react-icons/fa";
import { MdRemoveRedEye } from "react-icons/md";
import { MdAccessTime } from "react-icons/md";
import Select from 'react-select';
import Avatar from '@mui/material/Avatar';

// import library from './LibraryData';
import profile from "../../assets/profile.avif";
import { Link, useParams } from 'react-router-dom';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';
import LibraryData from '../../data/LibraryData';
import { FaStar } from 'react-icons/fa6';

const renderTooltip = (title) => (
    <Tooltip id="button-tooltip" >
        {title}
    </Tooltip>
);

const filterData = [
    { value: "Policies", label: "Policies" },
    { value: "Orientations", label: "Orientations" },
    { value: "Trainings", label: "Trainings" },
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
const Library = () => {
    const { category } = useParams();
    // console.log(category);

    const [listView, setListView] = useState('card');
    const [statusFilter, setStatusFilter] = useState(null);
    const [courses, setCourses] = useState(LibraryData.LibraryData.courses || []);

    // console.log(LibraryData.LibraryData.courses);
    const handleStatusFilter = (selectedOption) => {
        setStatusFilter(selectedOption?.value || '');
    };

    useEffect(() => {
        if (category) {
            setStatusFilter(category);
        }
    }, [category]);

    const filteredCourses = statusFilter
        ? courses.filter((course) => course.category === statusFilter)
        : courses;

    const getStars = (rating) => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            if (i <= rating) {
                stars.push(<FaStar key={i} style={{ color: "#f1c40f" }} size={12} />);
            } else if (i - rating < 1) {
                stars.push(<FaStarHalfAlt key={i} style={{ color: "#f1c40f" }} size={12} />);
            } else {
                stars.push(<FaRegStar key={i} style={{ color: "#f1c40f" }} size={12} />);
            }
        }
        return stars;
    };

    const renderCourseCard = (course) => (

        <div className="col-md-4 col-lg-3 col-sm-6" key={course.id}>


            <Link to={`/library/${course.category}/${course.id}`} className='text-decoration-none text-dark' >
                <div className="library-card border d-flex flex-column justify-content-between bg-light rounded-4 h-100">
                    <div className="library-image-container">
                        <img src={course.thumbnailImage} alt={course.title} className="library-image" width="100%" height="100%" />
                    </div>
                    <div className="p-3 d-flex flex-column justify-content-between">
                        <div className=" d-flex justify-content-between mb-2">

                            <OverlayTrigger placement="top" delay={{ show: 10 }} overlay={renderTooltip(course.title)}>
                                <h5 className='library-title' id={`tooltip-${course.id}`}>{course.title} </h5>
                            </OverlayTrigger>
                            
                        </div>

                        <div className="d-flex flex-wrap align-items-center justify-content-between">
                            <span className="reviewText">
                                {getStars(course?.rating)} {course?.rating.toFixed(1)}
                            </span>
                            <span className="reviewText">
                                <MdRemoveRedEye style={{ color: "#ffa500" }} size={15} /> {course.enrolled} Views
                            </span>
                        </div>
                        <hr />
                        <div className="d-flex justify-content-between ">
                            <div className='d-flex  align-items-center'>
                                <Avatar alt="Cindy Baker" src={profile} sx={{ width: 28, height: 28 }} />
                                <div className="author">
                                    <i>by</i>  <span className="">{course.instructor}</span>
                                </div>
                            </div>

                            <div className="d-flex justify-content-end">
                                <Link to={`/library/${course.category}/${course.id}`} className='text-decoration-none' >
                                    <button className="reviewButton">
                                    <div>
                                <span className="imageBadge">{course.category}</span>
                            </div>
                                    </button>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </Link>
            </div>

    );

    const renderCourseList = (course) => (
        <div className="border rounded-4 d-flex flex-wrap mb-3" key={course.id}>
            <div className="col-sm-4 col-12">
                <div className="position-relative library-image-container">
                    <img src={course.thumbnailImage} alt={course.title} className="rounded-3 library-image" width="100%" />
                    <div className="position-absolute top-0 start-0 p-3">
                        <span className="imageBadge">{course.category}</span>
                    </div>
                </div>
            </div>
            <div className="col-sm-8 col-12 p-3">
                <h5>{course.title}</h5>
                <p className="text-secondary">
                    <i>by</i> <span className="text-black">{course.instructor}</span>
                </p>
                <div className="d-flex align-items-center justify-content-start gap-3 mb-5">
                    <span className="reviewText">
                        <FaRegStar style={{ color: "#f1c40f" }} size={20} /> {course.rating} ({course.reviews})
                    </span>
                    <span className="reviewText">
                        <FaGraduationCap style={{ color: "#ffa500" }} size={20} /> {course.enrolled} Views
                    </span>
                    <span className="reviewText">
                        <MdAccessTime style={{ color: "#ffa500" }} size={20} />
                        {course.category.toLowerCase() === "training" ? DurationFormat(course.duration) : TimeFormat(course.date)}
                    </span>
                </div>
                <div>
                    <hr />
                    <div className='d-flex align-items-center justify-content-between'>
                        <div className='d-flex  align-items-center'>
                            <Avatar alt="Cindy Baker" src={profile} sx={{ width: 28, height: 28 }} />
                            <div className="author">
                                <span className='fst-italic'> by</span> <span className="">{course.instructor}</span>
                            </div>
                        </div>
                        <Link to={`/library/${course.category}/${course.id}`} className='text-decoration-none' >
                            <button className="reviewButton">
                                <MdRemoveRedEye size={20} className="me-1" style={{ color: "green" }} />
                                View
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </div >
    );

    return (
        <div className="container-fluid mt-3">
            <div className="d-flex justify-content-between">
                <h5>All {statusFilter === "Policies" ? "Policies" : (statusFilter === "Orientations" ? "Orientations" : (statusFilter === "Trainings" ? "Trainings" : " Learnings "))}</h5>
                <div>
                    <div className="d-flex gap-3">
                        <Select
                            isClearable
                            isSearchable
                            onChange={handleStatusFilter}
                            options={filterData}
                            value={filterData.find((option) => option.value === statusFilter)}
                            classNamePrefix="select"
                            placeholder="Filter by Category"
                            styles={{
                                control: (provided) => ({
                                    ...provided,
                                    width: 200,
                                    minHeight: 35,
                                    height: 35,
                                }),
                                menuList: (provided) => ({
                                    ...provided,
                                    maxHeight: 150,
                                    overflowY: "auto",
                                    padding: 0,
                                }),
                            }}
                        />
                        {/* <button
                            className={`toggleButton ${listView === "list" ? 'active' : ''}`}
                            onClick={() => setListView('list')}
                        >
                            <IoListSharp />
                        </button> */}
                        <button
                            className={`toggleButton ${listView === "card" ? 'active' : ''}`}
                            onClick={() => setListView('card')}
                        >
                            <TbLayoutGridFilled />
                        </button>
                    </div>
                </div>
            </div>

            <div className="mt-4">
                {listView === 'list'
                    ? filteredCourses?.map(renderCourseList)
                    : <div className="row g-4">{filteredCourses.map(renderCourseCard)}</div>}
            </div>
        </div>
    );
};

export default Library;
