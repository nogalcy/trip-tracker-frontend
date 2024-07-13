import React, { useState } from 'react';
import './profile.css';
import RecentTrips from '../RecentTrips/RecentTrips';
import FavoriteTrips from '../FavoriteTrips/FavoriteTrips';
import UserInfo from '../UserInfo/UserInfo';
import NavigationButtons from '../NavBar/NavigationButtons';
import ProfileNav from './ProfileNav';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
    const [selectedTab, setSelectedTab] = useState('recent');
    const navigate = useNavigate();

    const handleTabChange = (tab) => {
        setSelectedTab(tab);
        if (tab === 'recent') {
            setSelectedTab('recent');
            navigate('/profile');
        } else {
            setSelectedTab(`${tab}`);
            navigate(`/profile/${tab}`);
        }
        window.scrollTo(0, 0);
    };

    return (
        <div className="profile-container">
            <ProfileNav selectedTab={selectedTab} handleTabChange={handleTabChange} />
            <div className="profile-content">
                {selectedTab === 'recent' && <RecentTrips />}
                {selectedTab === 'favorites' && <FavoriteTrips />}
                {selectedTab === 'userInfo' && <UserInfo />}
            </div>
            <NavigationButtons />
        </div>
    );
};

export default Profile;
