import React, { useEffect, useState } from 'react';
import '../FavoriteTrips/trips.css';
import { listRecentTrips } from '../../api/api';



const RecentTrips = () => {
  const [recentTrips, setRecentTrips] = useState([]);

  useEffect(() => {
    const fetchRecentTrips = async () => {
      try {
        const data = await listRecentTrips();
        console.log(data);
        setRecentTrips(data); 
      } catch (error) {
        if (error.response && error.response.status === 401) {
          localStorage.removeItem('token');
          window.location.href = '/login';
        } else {
          console.error('Error fetching recent trips:', error);
        }
      }
    };

    fetchRecentTrips();
  }, []);

  return (
    <div className="trips">
      {recentTrips.map(trip => (
        <div key={trip._id} className="trip-card">
          <h3>{trip.title}</h3>
          <p className="info-line">{new Date(trip.visitDate).toLocaleDateString()}</p>
          <p className="info-line">Rating: {trip.rating} / 10</p>
          <img src={trip.image || 'https://www.smallworldvacations.com/wp-content/uploads/2018/01/dcl-fallback-image-768x432.jpg'} alt={trip.title} className="trip-image" />
        </div>
      ))}
    </div>
  );
};

export default RecentTrips;
