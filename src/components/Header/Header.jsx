import React, { useEffect, useState } from 'react';
import './Header.css';
import { FaArrowLeftLong } from 'react-icons/fa6';
// import { MdOutlineNotificationsActive } from 'react-icons/md';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import profile from '../../assets/profile.png';
import UploadIcon from '../../assets/upload.png';
import BellIcon from '../../assets/school-bell.png';
import headerName from '../../assets/headerName.png';

// import UploadCourseModal from '../UploadCourseModel/UploadCourseModel';


const Header = ({ userType, setUserType }) => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleToggle = () => {
    // Toggle between "Admin" and "User"
    setUserType((prevType) => (prevType === 'Admin' ? 'User' : 'Admin'));
  };
  // const [showModal, setShowModal] = useState(false);

  // const handleUploadClick = () => setShowModal(true);
  // const handleCloseModal = () => setShowModal(false);

  // Check if the current path has a parent (contains '/')
  const showBackButton = location.pathname.split('/').length > 2;

  return (
    <div className='header'>
      <div className='d-flex gap-2'>
        {showBackButton && (
          <button
            type='button'
            className='primary-button'
            onClick={() => navigate(-1)} // Navigate back
          >
            <FaArrowLeftLong size={18} /> Back
          </button>
        )}

        {location.pathname !== '/upload/course' &&
          <div className=''><Link to='/upload/course' className='text-decoration-none'>
            <button className='secondary-button '>
              {/* <FcUpload size={20} /> */}
              <img src={UploadIcon} alt="upload" width="20px" height="20px" />
              Upload
            </button></Link>
          </div>
        }
        {/* {showModal && <UploadCourseModal show={showModal} onClose={handleCloseModal} />} */}
      </div>
      <div className='header-title'>
        {/* <img src={headerName} alt='headerName' width="100px" height="45px" />
         */}
         <h5 className='header-name'>STOP</h5>
      </div>

      <div className='d-flex align-items-center gap-4'>
      <div className="toggle-container">
          <span>{userType}</span>
          <label className="switch">
            <input
              type="checkbox"
              checked={userType === 'Admin'}
              onChange={handleToggle}
            />
            <span className="slider"></span>
          </label>
        </div>

        <div>
          {/* <MdOutlineNotificationsActive size={24} /> */}
          <img src={BellIcon} alt="upload" width="25px" height="25px" />

        </div>
        <div>
          <img src={profile} alt='profile' className='profile-image' />
        </div>
      </div>
    </div>
  );
};

export default Header;
