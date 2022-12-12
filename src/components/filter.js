import axios from 'axios';
import { useEffect, useState } from 'react';
import Select from 'react-select';
import { useForm } from 'react-hook-form';

import Cookies from 'universal-cookie';
const cookies = new Cookies();
const token = cookies.get('TOKEN');

function DateFilter() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    console.log(data);
    setGender(data.gender);
    setStartingAge(data.startingAge);
    setEndingAge(data.endingAge);
    setCity(data.city);
  };
  const [gender, setGender] = useState('');
  const [startingAge, setStartingAge] = useState(0);
  const [endingAge, setEndingAge] = useState(100);
  const [city, setCity] = useState('');
  const handleFilterSubmit = (data) => {
    console.log('data', data);

    const configuration = {
      method: 'post',
      url: 'http://localhost:3001/updatePreferences',
      headers: {
        Authorization: `Bearer ${token}`,
        gender: data.Gender,
        startingAge: data.startingAge,
        endingAge: data.endingAge,
        city: data.City,
      },
    };

    axios(configuration)
      .then((result) => {
        console.log('result = ', result);
        if (result.data.message === 'success') {
          alert('successfully updated preferences');
        }
      })
      .catch((error) => {
        error = new Error();
        console.log('error ===', error);
      });
    console.log();
  };
  return (
    <div>
      <h3>You can submit your preferences here:</h3>
      <form
        className='filterForm'
        onSubmit={handleSubmit((data) => {
          handleFilterSubmit(data);
        })}
      >
        <label className='labelis'>
          Gender:{' '}
          <select {...register('Gender')}>
            <option value='Male'>Male</option>
            <option value=' Female'> Female</option>
          </select>
        </label>
        <label className='labelis'>
          City:{' '}
          <input type='undefined' placeholder='City' {...register('City')} />
        </label>
        <label className='labelis'>
          Age from:{' '}
          <input
            type='undefined'
            placeholder='startingAge'
            {...register('startingAge')}
          />
        </label>
        <label className='labelis'>
          Age to:{' '}
          <input
            type='undefined'
            placeholder='endingAge'
            {...register('endingAge')}
          />
        </label>

        <input style={{ width: '70px', alignSelf: 'center' }} type='submit' />
      </form>
    </div>
  );
}

export default DateFilter;
