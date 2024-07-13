import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './navigationButtons.css';
import { Dropdown } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import icon from './person.svg';
import helpIcon from './question-lg.svg'; 

const NavigationButtons = () => {
  const navigate = useNavigate();
  const [showHelp, setShowHelp] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);

  const handleSignOut = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  const handleViewProfile = () => {
    navigate('/profile'); 
  };

  const handleMapClick = () => {
    navigate('/map');
  }

  const handleProfileOpen = () => {
    if (showHelp) {
        setShowHelp(false);
    }
    setProfileOpen(true);
  }

  const handleHelp = () => {
    if (profileOpen) {
        setProfileOpen(false);
    }
    setShowHelp(!showHelp); 
  };


  return (
    <div className="navigationButtons">
        <Dropdown className="help-dropdown">
            <Dropdown.Toggle as="div" className="help-icon" onClick={handleHelp}>
                <img src={helpIcon} alt="help icon" />
            </Dropdown.Toggle>
        </Dropdown>

        <Dropdown className="avatar-dropdown" onClick={handleProfileOpen}>
            <Dropdown.Toggle as="div" className="avatar">
                <img src={icon} alt="avatar icon" />
            </Dropdown.Toggle>

            <Dropdown.Menu align="end">
                <Dropdown.Item onClick={handleViewProfile}>View Profile</Dropdown.Item>
                <Dropdown.Item onClick={handleMapClick}>Map</Dropdown.Item>
                <Dropdown.Item onClick={handleSignOut}>Sign Out</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>

      {showHelp && (
        <div className="help-text">
          <p>How to use Trip Tracker:</p>
          <br></br>
          <ul>
            <li>Double click anywhere on the map and fill out the trip information form to log a trip! Only the title and visit date are required!</li>
            <br></br>
            <li>Click on any pre-existing pin to get a full trip summary!</li>
            <br></br>
            <li>View profile options by clicking the user icon in the top right!</li>
            <br></br>
            <li>Click the help icon again to close this tab!</li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default NavigationButtons;
