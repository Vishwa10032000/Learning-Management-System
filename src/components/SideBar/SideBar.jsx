import React, { useState } from 'react';
import './SideBar.css';
import logo from '../../assets/logo.svg';
import { Link, useLocation } from 'react-router-dom';
import { AiOutlineAppstore } from 'react-icons/ai';
import { IoBookOutline, IoHomeOutline, IoSettingsOutline } from 'react-icons/io5';
import { RiChatUnreadLine, RiExpandLeftLine, RiExpandRightLine } from 'react-icons/ri';
import { FcAndroidOs, FcBusinessman, FcEngineering, FcFolder, FcHome, FcMultipleDevices, FcServices, FcSurvey } from 'react-icons/fc';

const SideBar = ({ userType }) => {
  const [isExpanded, setIsExpanded] = useState(true);

  const location = useLocation();

  // Function to determine if a route is active
  const isActive = (path) => location.pathname === path;
  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };


  return (
    <div className={`sidebar ${isExpanded ? 'expanded' : ''}`} >
      <div>
        <Link to='/' className='logo'>
          <img src={logo} alt='logo' width="30px" height="30px" />
          <h3 className={`nav-text ${isExpanded ? 'active' : ''}`}>EduVerse</h3>
        </Link>
        
        </div>
        
        <div className='nav-items'>
          <div className={`nav-item ${isActive('/') ? 'active' : ''}`}>
            <div className='right-border'></div>
            <Link to='/' className='nav-link'><FcHome size={24} /> <span className={`nav-text ${isExpanded ? 'active' : ''}`}>Home</span></Link>
          </div>
          <div className={`nav-item ${isActive('/dashboard') ? 'active' : ''}`}>
            <div className='right-border'></div>
            <Link to='/dashboard' className='nav-link'><FcBusinessman size={24} /> <span className={`nav-text ${isExpanded ? 'active' : ''}`}>Dashboard</span></Link>
          </div>
          <div className={`nav-item ${isActive('/library') ? 'active' : ''}`}>
            <div className='right-border'></div>
            <Link to='/library' className='nav-link'><FcFolder size={24} /> <span className={`nav-text ${isExpanded ? 'active' : ''}`}>Library</span> </Link>
          </div>
          <div className={`nav-item ${isActive('/apps') ? 'active' : ''}`}>
            <div className='right-border'></div>
            <Link to='/apps' className='nav-link'><FcMultipleDevices size={24} /><span className={`nav-text ${isExpanded ? 'active' : ''}`}>Solutions</span></Link>
          </div>
          {/* <div className={`nav-item ${isActive('/settings') ? 'active' : ''}`}>
            <div className='right-border'></div>
            <Link to='/settings' className='nav-link'><FcServices size={24} /><span className={`nav-text ${isExpanded ? 'active  ' : ''}`}> Settings</span></Link>
          </div> */}
          {userType === 'Admin' &&
            <div className={`nav-item ${isActive('/approvals') ? 'active' : ''}`}>
              <div className='right-border'></div>
              <Link to='/approvals' className='nav-link'><FcSurvey size={24} /><span className={`nav-text ${isExpanded ? 'active' : ''}`}>Approvals</span></Link>
            </div>
          }
        </div>

        <span className={`nav-text ps-4 ${isExpanded ? 'active' : ''}`}><b><i>"Serving the world for essential"</i></b> </span>


      <div className='expand-collapse-button-container'>
        <button className='expand-collapse-button'
          onClick={toggleSidebar} >{isExpanded ?
            <RiExpandRightLine size={24} /> : <RiExpandLeftLine size={24} />
          }
        </button>
      </div>
    </div>
  );
};

export default SideBar;
