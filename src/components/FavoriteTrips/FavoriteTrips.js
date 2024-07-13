import React, { useEffect, useState } from 'react';
import './trips.css';
import { listFavoriteTrips } from '../../api/api';
import { useNavigate } from 'react-router-dom';
import ProfileNav from '../Profile/ProfileNav';
import NavigationButtons from '../NavBar/NavigationButtons';

const FavoriteTrips = () => {
  const [favoriteTrips, setFavoriteTrips] = useState([]);
  const [selectedTab, setSelectedTab] = useState('favorites');
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
    const fetchFavoriteTrips = async () => {
      const trips = await listFavoriteTrips();
      setFavoriteTrips(trips);
    };

    fetchFavoriteTrips();
    navigate('/profile/favorites');
  }, []);

  return (
    <div className="profile-container">
      <ProfileNav selectedTab={selectedTab} handleTabChange={handleTabChange} />
      <div className="profile-content">
        <div className="trips">
          {favoriteTrips.map(trip => (
            <div key={trip._id} className="trip-card">
              <h3>{trip.title}</h3>
              <p className="info-line">{new Date(trip.visitDate).toLocaleDateString()}</p>
              <p className="info-line">Rating: {trip.rating} / 10</p>
              <img src={trip.image || 'https://www.smallworldvacations.com/wp-content/uploads/2018/01/dcl-fallback-image-768x432.jpg'} alt={trip.title} className="trip-image" />
            </div>
          ))}
        </div>
        <NavigationButtons />
      </div>
    </div>
  );
};

export default FavoriteTrips;
