import { Link } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';
import Cookies from 'universal-cookie';
const cookies = new Cookies();

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [login, setLogin] = useState(false);
  const [errormsg, setErrormsg] = useState('');
  const handleSubmit = (e) => {
    // prevent the form from refreshing the whole page
    e.preventDefault();
    const configuration = {
      method: 'post',
      url: 'http://localhost:3001/login',
      data: {
        username,
        password,
      },
    };
    axios(configuration)
      .then((result) => {
        setErrormsg(result.data.message);
        console.log('result ===', result.data.message);
        if (result.data.message === 'online') {
          setLogin(true);
          cookies.set('TOKEN', result.data.token, {
            path: '/',
          });
          window.location.href = '/profile';
        }
      })
      .catch((error) => {
        error = new Error();
      });
  };

  return (
    <div className='container'>
      <form className='flex-d-c form-body' onSubmit={(e) => handleSubmit(e)}>
        <input
          className='form__input'
          type='text'
          value={username}
          id='username'
          onChange={(e) => setUsername(e.target.value)}
          placeholder='Username'
        />
        <input
          className='form__input'
          type='password'
          value={password}
          id='password'
          onChange={(e) => setPassword(e.target.value)}
          placeholder='password'
        />
        <button
          className='logOutBtn text-success'
          variant='primary'
          type='submit'
          onClick={(e) => handleSubmit(e)}
        >
          Login
        </button>

        <p>{errormsg}</p>
      </form>
    </div>
  );
}

export default Login;
