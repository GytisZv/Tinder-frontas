import {
  BrowserRouter,
  useNavigate,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'universal-cookie';
import UserPage from './components/userPage';
const cookies = new Cookies();
const token = cookies.get('TOKEN');

function App() {
  const [loggedIn, setLoggedIn] = useState();
  const [message, setMessage] = useState('');
  const navigate = useNavigate();
  useEffect(() => {
    if (!token) {
      setMessage('Nera prisijungusiu');
      setLoggedIn(false);
      navigate('/userPage');
    }
    if (token) {
      setMessage('Kazkas prisijunges lygtais');
      setLoggedIn(true);
      navigate('/mainPage');
    }
  }, []);

  return;
}

export default App;
