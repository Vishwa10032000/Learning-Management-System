import React, { useEffect, useState } from 'react';
import './Header.css';
import { FaArrowLeftLong } from 'react-icons/fa6';
// import { MdOutlineNotificationsActive } from 'react-icons/md';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import profile from '../../assets/profile.png';
import UploadIcon from '../../assets/upload.png';
import BellIcon from '../../assets/school-bell.png';
import headerName from '../../assets/headerName.png';
import { FcBusinessman, FcFolder, FcHome, FcMultipleDevices, FcSurvey } from 'react-icons/fc';
import { CgClose, CgMenuRight } from 'react-icons/cg';

// import UploadCourseModal from '../UploadCourseModel/UploadCourseModel';


const Header = ({ userType, setUserType }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);


  // Function to determine if a route is active
  const isActive = (path) => location.pathname === path;

  const handleToggle = () => {
    // Toggle between "Admin" and "User"
    setUserType((prevType) => (prevType === 'Admin' ? 'User' : 'Admin'));
  };

  const handleMenuToggle = () => {
    setIsMenuOpen((prev) =>!prev);
  };
  // const [showModal, setShowModal] = useState(false);

  // const handleUploadClick = () => setShowModal(true);
  // const handleCloseModal = () => setShowModal(false);

  // Check if the current path has a parent (contains '/')
  const showBackButton = location.pathname.split('/').length > 2;

  return (
    <div className='header d-flex flex-wrap'>
      <div className='d-flex  gap-2'>
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

      <div className='menu-toggle' onClick={handleMenuToggle}>
        {isMenuOpen ?  <CgClose size={28}/> : <CgMenuRight size={28} /> }
      </div>

      <div className={`header-menu ${isMenuOpen ? 'active' : ''}`}>

        <div className='header-items'>
          <div className={`nav-item ${isActive('/') ? 'active' : ''}`}>
            <div className='right-border'></div>
            <Link to='/' onClick={handleMenuToggle} className='nav-link'><FcHome size={24} /> <span>Home</span></Link>
          </div>
          <div className={`nav-item ${isActive('/dashboard') ? 'active' : ''}`}>
            <div className='right-border'></div>
            <Link onClick={handleMenuToggle} to='/dashboard' className='nav-link'><FcBusinessman size={24} /> <span>Dashboard</span></Link>
          </div>
          <div className={`nav-item ${isActive('/library') ? 'active' : ''}`}>
            <div className='right-border'></div>
            <Link onClick={handleMenuToggle} to='/library' className='nav-link'><FcFolder size={24} /> <span>Library</span> </Link>
          </div>
          <div className={`nav-item ${isActive('/apps') ? 'active' : ''}`}>
            <div className='right-border'></div>
            <Link onClick={handleMenuToggle} to='/apps' className='nav-link'><FcMultipleDevices size={24} /><span >Solutions</span></Link>
          </div>
          {/* <div className={`nav-item ${isActive('/settings') ? 'active' : ''}`}>
                  <div className='right-border'></div>
                  <Link to='/settings' className='nav-link'><FcServices size={24} /><span className={`nav-text ${isExpanded ? 'active  ' : ''}`}> Settings</span></Link>
                </div> */}
          {userType === 'Admin' &&
            <div className={`nav-item ${isActive('/approvals') ? 'active' : ''}`}>
              <div className='right-border'></div>
              <Link onClick={handleMenuToggle} to='/approvals' className='nav-link'><FcSurvey size={24} /><span>Approvals</span></Link>
            </div>
          }
        </div>

        <div className='d-flex align-items-center gap-4'>
          <div className="toggle-container">
            {/* <span>{userType}</span> */}
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
    </div>
  );
};

export default Header;
