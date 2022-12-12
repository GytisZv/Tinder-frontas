import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Carousel } from 'react-responsive-carousel';
import '../../node_modules/react-responsive-carousel/lib/styles/carousel.min.css';
import Cookies from 'universal-cookie';
import LogOut from './logOut';
import History from './history';
import DateFilter from './filter';
import { Socket } from 'socket.io-client';

const cookies = new Cookies();
const token = cookies.get('TOKEN');

const Profile = () => {
  const [userId, setUserId] = useState('');
  const [username, setUsername] = useState('');
  const [city, setCity] = useState('');
  const [gender, setGender] = useState('');
  const [avatar, setAvatar] = useState([]);
  const [addImg, setAddImg] = useState(false);
  const [newImg, setNewImg] = useState('');
  const [imageArray, setImageArray] = useState([]);

  useEffect(() => {
    // set configurations for the API call here
    const configuration = {
      method: 'get',
      url: 'http://localhost:3001/profile',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    // make the API call
    axios(configuration)
      .then((result) => {
        console.log(result);
        setUserId(result.data.data._id);
        setUsername(result.data.data.username);
        setGender(result.data.data.gender);
        setCity(result.data.data.city);
        setAvatar(result.data.data.avatar[0]);
        setImageArray(result.data.data.avatar);
      })
      .catch((error) => {
        error = new Error();
      });
  }, []);

  const handleImageAdd = (image) => {
    const configuration = {
      method: 'post',
      url: 'http://localhost:3001/addImage',
      data: {
        image: newImg,
        id: userId,
      },
    };
    axios(configuration)
      .then((result) => {
        console.log('result from addImage', result);
        if (result.data.message === 'empty field') {
          alert('Field cant be empty');
        }
        if (result.data.message === 'success') {
          window.location.reload();
        }
        if (result.data.message === 'exists') {
          alert('image with that url already exists');
        }
      })
      .catch((error) => {
        error = new Error();
      });
  };
  function handleChange(event) {
    setNewImg(event.target.value);
    console.log(newImg);
  }
  function handleDelete(selectedImage) {
    const configuration = {
      method: 'post',
      url: 'http://localhost:3001/deleteImage',
      data: {
        image: selectedImage,
        id: userId,
      },
    };
    axios(configuration)
      .then((result) => {
        console.log('result from deleteImage', result);
        if (result.data.message === 'success') {
          window.location.reload();
        }
      })
      .catch((error) => {
        error = new Error();
      });
  }
  function handleUpdateAvatar(selectedImage) {
    const configuration = {
      method: 'post',
      url: 'http://localhost:3001/updateImage',
      data: {
        image: selectedImage,
        id: userId,
      },
    };
    axios(configuration)
      .then((result) => {
        console.log('result from deleteImage', result);
        if (result.data.message === 'success') {
          window.location.reload();
        }
      })
      .catch((error) => {
        error = new Error();
      });
  }
  const imageClick = (e) => {
    console.log('this image is clicked', e);
  };
  if (!token) {
    return (
      <div className='container'>
        <div style={{ width: '40%', margin: 'auto' }}>
          <h2>You should log in or register</h2>
          <p>
            You can do so <Link to={'/userPage'}>HERE</Link>
          </p>
        </div>
      </div>
    );
  } else {
    return (
      <div className='container profile flex-d-c'>
        <LogOut />
        <h2>Hello, {username}, welcome to your profile page.</h2>
        <img className='profilePic' src={avatar} alt='profile' />
        <br style={{ borderBottom: '2px solid black' }} />
        <h3>Your gallery:</h3>
        <div className='profileImageArray'>
          <Carousel
            showThumbs={true}
            infiniteLoop={true}
            showIndicators={false}
          >
            {imageArray.map((image, index) => (
              <div className='profileGallery'>
                <img
                  src={image}
                  alt=''
                  id={image}
                  onClick={imageClick}
                  key={image}
                />
                <div>
                  <button
                    onClick={() => {
                      handleDelete(image);
                    }}
                    className='profileGalleryBtn animationShake text-danger'
                  >
                    Delete
                  </button>
                  <button
                    onClick={() => {
                      handleUpdateAvatar(image);
                    }}
                    className='profileGalleryBtn animationShake text-blue tilt-shaking'
                  >
                    Use as main
                  </button>
                </div>
              </div>
            ))}
          </Carousel>
        </div>

        {addImg ? (
          <div className='flex-d-c'>
            <input
              className='profileAddImgText'
              type='text'
              id='newUrl'
              onChange={handleChange}
              placeholder='enter url of a photo you want to add'
            ></input>
            <button
              className='profileBtn'
              onClick={() => {
                handleImageAdd();
              }}
            >
              Add
            </button>
          </div>
        ) : (
          <button className='profileBtn' onClick={() => setAddImg(true)}>
            Add more photos
          </button>
        )}
        <h5>About you:</h5>
        <p>From : {city}</p>
        <p>Gender: {gender}</p>

        <DateFilter />
        {imageArray.length > 1 ? (
          <Link className='linkas' style={{ height: '120px' }} to={'/datePage'}>
            DATING
          </Link>
        ) : (
          <>
            <h4>You should add more photos</h4>
          </>
        )}
        <div>
          <History />
        </div>
      </div>
    );
  }
};

export default Profile;
