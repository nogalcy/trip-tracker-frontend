import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import SignUp from './components/Auth/Signup.js';
import Login from './components/Auth/Login.js';
import Map from './components/Map/Map.js';
import Profile from './components/Profile/Profile.js';
import UserInfo from './components/UserInfo/UserInfo.js';
import FavoriteTrips from './components/FavoriteTrips/FavoriteTrips.js';

const isAuthenticated = () => !!localStorage.getItem('token');

const ProtectedRoute = ({element}) => {
  return isAuthenticated() ? element : <Navigate to="/login" />;
}

const App = () => {
  return (
    <HashRouter>
      <Routes>
        <Route path='/' element={<Navigate to='/register' />}></Route>
        <Route path='/register' element={<SignUp />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/map' element={<ProtectedRoute element={<Map />} />}></Route>
        <Route path='/profile' element={<ProtectedRoute element={<Profile />} />}></Route>
        <Route path='/profile/favorites' element={<ProtectedRoute element={<FavoriteTrips />} />}></Route>
        <Route path='/profile/user-information' element={<ProtectedRoute element={<UserInfo />} />}></Route>
      </Routes>
    </HashRouter>
  );
}

export default App;
