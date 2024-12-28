import React from 'react'
import LibraryData from '../../data/LibraryData'
import { Link } from 'react-router-dom'
import { OverlayTrigger } from 'react-bootstrap'
import { FaGraduationCap } from 'react-icons/fa6'
import { Avatar, Tooltip } from '@mui/material'
import { MdRemoveRedEye } from 'react-icons/md'
import profile from "../../assets/profile.avif";

const Approvals = () => {
    const renderTooltip = (title) => (
        <Tooltip id="button-tooltip" >
            {title}
        </Tooltip>
    );
  return (
    <div>
        <h1>My Approvals</h1>

        <div className='row'>
            {LibraryData.LibraryData.courses.map((course, index) =>
             <div className="col-md-4 col-lg-3 col-sm-6 mb-3" key={course.id}>

             <Link to={`/library/${course.category}/${course.id}`} className='text-decoration-none text-dark ' >
                 <div className="library-card border rounded-4 h-100 bg-light">
                     <div className="position-relative">
                         <img src={course.thumbnailImage} alt={course.title} className="rounded-3 img-fluid" width="100%" />
                     </div>
                     <div className="p-3 d-flex flex-column justify-content-between">
                         <div className=" d-flex justify-content-between mb-2">
 
                             <OverlayTrigger placement="top" delay={{ show: 10 }} overlay={renderTooltip(course.title)}>
                                 <h5 className='library-title' id={`tooltip-${course.id}`}>{course.title} </h5>
                             </OverlayTrigger>
                             <div>
                             </div>
                         </div>
 
                         <div className="d-flex flex-wrap align-items-center justify-content-between">
                             <span className="reviewText">
                                 {/* {getStars(course?.rating)} {course?.rating.toFixed(1)} */}
                                 <p className='recent-course-description' dangerouslySetInnerHTML={{ __html: course?.description }}  />
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
                                         {/* <MdRemoveRedEye size={20} className="" style={{ color: "green" }} />
                                          */}
                                 <span className="imageBadge">{course.category}</span>

                                     </button>
                                 </Link>
                             </div>
                         </div>
                     </div>
                 </div>
             </Link>
         </div>
 
            )}
        </div>
    </div>
  )
}

export default Approvals