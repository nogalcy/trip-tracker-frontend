import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import SignUp from './components/Auth/Signup.js';
import Login from './components/Auth/Login.js';
import Map from './components/Map/Map.js';
import Profile from './components/Profile/Profile.js';
import UserInfo from './components/UserInfo/UserInfo.js';
import FavoriteTrips from './components/FavoriteTrips/FavoriteTrips.js';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/register' element={<SignUp />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/map' element={<Map />}></Route>
        <Route path='/profile' element={<Profile />}></Route>
        <Route path='/profile/favorites' element={<FavoriteTrips />}></Route>
        <Route path='/profile/user-information' element={<UserInfo />}></Route>
        <Route path='/' element={<Navigate to='/register' />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
