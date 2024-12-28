import { HashRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import SideBar from './components/SideBar/SideBar';
import Header from './components/Header/Header';
import Home from './pages/Home/Home';

import Dashboard from './pages/Dashboard/Dashboard';
import LibraryIndividualPage from './pages/Library/LibraryIndividualPage/LibraryIndividualPage';
import Library from './pages/Library/Library';
import AppsList from './pages/Apps/Apps';
import IndividualApps from './pages/Apps/AppsIndividual';
import Assessment from './pages/Assessment/Assessment';

import UploadPage from './pages/UploadPage/UploadPage';
import { useState } from 'react';
import Approvals from './pages/Approvals/Approvals';
// import AppsList from './pages/Apps/Apps';

function App() {
  const [userType, setUserType] = useState('User');

  return (
    <HashRouter>
      <div style={{ display: 'flex', height: '100vh', minHeight: "600px", width: "100%" }}>
        <SideBar userType={userType} />
        <div style={{ flex: '1', display: 'flex', flexDirection: 'column', width: '100vw', height: "100%", padding: "10px" }}>
          <Header userType={userType}  setUserType={setUserType} />
          <div className='main-container'   >
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path='/dashboard' element={<Dashboard />} />
              <Route path='/approvals' element={<Approvals />} />
              <Route path='/library/:category?' element={<Library />} />
              <Route path='/library/:category/:id' element={<LibraryIndividualPage userType={userType} />} />
              <Route path='/apps' element={<AppsList />} />
              <Route path='/individual/:appId' element={<IndividualApps />} />
              <Route path='/assessment' element={<Assessment />} />
              <Route path='/upload/course' element={<UploadPage userType={userType} />} />
            </Routes>
          </div>
        </div>
      </div>
    </HashRouter>
  );
}

export default App;
