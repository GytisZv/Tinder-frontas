import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import App from './App';
import Login from './components/login';
import Create from './components/create';
import Profile from './components/profile';
import UserPage from './components/userPage';
import MainPage from './components/mainPage';
import DatePage from './components/datePage';
import ProtectedRoutes from './components/authComponent';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<App />} />
        <Route path='/mainPage' element={<MainPage />} />
        <Route path='/datePage' element={<DatePage />} />
        <Route path='/userPage' element={<UserPage />} />
        <Route path='/login' element={<Login />} />
        <Route path='/create' element={<Create />} />
        <Route path='/profile' component={<Profile />} element={<Profile />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
