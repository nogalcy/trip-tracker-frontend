import React from 'react';
import './profile.css';

const ProfileNav = ({ selectedTab, handleTabChange }) => {
    return (
        <div className="profile-nav">
            <button className={selectedTab === 'recent' ? 'active' : ''} onClick={() => handleTabChange('recent')}>Recent Trips</button>
            <button className={selectedTab === 'favorites' ? 'active' : ''} onClick={() => handleTabChange('favorites')}>Favorite Trips</button>
            <button className={selectedTab === 'user-information' ? 'active' : ''} onClick={() => handleTabChange('user-information')}>User Information</button>
        </div>
    );
};

export default ProfileNav;
