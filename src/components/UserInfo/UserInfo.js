import React, { useState, useEffect } from 'react';
import './userInfo.css';
import { getUserInfo } from '../../api/api';
import { useNavigate } from 'react-router-dom';
import ProfileNav from '../Profile/ProfileNav';
import NavigationButtons from '../NavBar/NavigationButtons';

const UserInfo = () => {
    const [userInfo, setUserInfo] = useState(null);
    const [selectedTab, setSelectedTab] = useState('user-information');
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

    useEffect(() => {
        const fetchUserInfo = async () => {
            const user = await getUserInfo();
            setUserInfo(user);
        };

        fetchUserInfo();
        navigate('/profile/user-information');
    }, []);

    return (
        <div className="profile-container">
            <ProfileNav selectedTab={selectedTab} handleTabChange={handleTabChange} />
            <div className="profile-content">
                <div className="user-info">
                    {userInfo && (
                        <>
                            <h2>Hello {userInfo.name}!</h2>
                            <p className="info-line">Member since {new Date(userInfo.createdDate).toLocaleDateString()}</p>
                            <p className="info-line">Email: {userInfo.email}</p>
                            <p className="info-line">You have logged {userInfo.entryCount} trips!</p>
                            {userInfo.favoriteTrip && (
                                <p className="info-line">Your favorite trip was when you visited {userInfo.favoriteTrip.title}</p>
                            )}
                        </>
                    )}
                </div>
                <NavigationButtons />
            </div>
        </div>
    );
};

export default UserInfo;
