import { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import Select from 'react-select';

const Create = () => {
  const [username, setUsername] = useState(null);
  const [register, setRegister] = useState(false);
  const [city, setCity] = useState(null);
  const [gender, setGender] = useState(null);
  const [password, setPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);
  const [age, setAge] = useState(null);
  const options = [
    { value: 'Male', label: 'Diedas' },
    { value: 'Female', label: 'Motriška' },
  ];
  const handleInputChange = (e) => {
    const { id, value } = e.target;
    if (id === 'username') {
      setUsername(value);
    }
    if (id === 'city') {
      setCity(value);
    }
    if (id === 'gender') {
      setGender(value);
    }
    if (id === 'password') {
      setPassword(value);
    }
    if (id === 'confirmPassword') {
      setConfirmPassword(value);
    }
    if (id === 'age') {
      setAge(value);
    }
  };

  const handleSubmit = () => {
    console.log(username, password, city, gender, age, confirmPassword);
    const configuration = {
      method: 'post',
      url: 'http://localhost:3001/register',
      data: {
        username,
        password,
        age,
        city,
        gender,
      },
    };
    axios(configuration)
      .then((result) => {
        if (result.data.message === 'taken') {
          alert('Username is already taken');
        } else if (result.data.message === 'empty') {
          alert('Some of the fields are empty');
        } else {
          setRegister(true);
        }
      })
      .catch((error) => {
        error = new Error();
      });
  };
  const handleSelect = (e) => {
    console.log(e);
    setGender(e.value);
  };

  return (
    <div className='container'>
      <h3>Create a new profile</h3>
      <div className='form-body'>
        <div className='form-create-input'>
          <label className='form__label' for='username'>
            Enter your username{' '}
          </label>
          <input
            className='form__input'
            type='text'
            value={username}
            onChange={(e) => handleInputChange(e)}
            id='username'
            placeholder='Username'
          />
        </div>
        <div className='form-create-input'>
          <label className='form__label' for='password'>
            Password{' '}
          </label>
          <input
            className='form__input'
            type='password'
            id='password'
            value={password}
            onChange={(e) => handleInputChange(e)}
            placeholder=''
          />
        </div>
        <div className='form-create-input'>
          <label className='form__label' for='confirmPassword'>
            Confirm Password{' '}
          </label>
          <input
            className='form__input'
            type='password'
            id='confirmPassword'
            value={confirmPassword}
            onChange={(e) => handleInputChange(e)}
            placeholder=''
          />
        </div>
        <div className='form-create-input'>
          <label className='form__label' for='city'>
            City{' '}
          </label>
          <input
            type='text'
            name=''
            id='city'
            value={city}
            className='form__input'
            onChange={(e) => handleInputChange(e)}
            placeholder='city'
          />
        </div>
        <div className='form-create-input'>
          <label className='form__label' for='gender'>
            Gender{' '}
          </label>
          <Select
            options={options}
            value={options.value}
            onChange={handleSelect}
          />
          {/* <input
            type='gender'
            id='gender'
            className='form__input'
            value={gender}
            onChange={(e) => handleInputChange(e)}
            placeholder='gender'
          /> */}
        </div>
        <div className='form-create-input'>
          <label className='form__label' for='age'>
            Enter your age{' '}
          </label>
          <input
            type='number'
            id='age'
            className='form__input'
            value={age}
            onChange={(e) => handleInputChange(e)}
            placeholder='25'
          />
        </div>

        <div class='footer'>
          {register ? (
            <>
              <p className='text-success'>You Are Registered Successfully</p>
              <Link className='' to='/'>
                Home
              </Link>
            </>
          ) : (
            <button onClick={() => handleSubmit()} type='submit' class='btn'>
              Register
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
export default Create;
