import axios from 'axios';
import { useEffect, useState } from 'react';
import io from 'socket.io-client';
import Cookies from 'universal-cookie';
import LogOut from './logOut';
import { Carousel } from 'react-responsive-carousel';
import { Link } from 'react-router-dom';
const cookies = new Cookies();
const token = cookies.get('TOKEN');
const socket = io.connect('http://localhost:3001');

function DatePage() {
  const [allUsers, setAllUsers] = useState([]);
  const [isLoading, setLoading] = useState(true);
  const [currentUserIndex, setCurrentUserIndex] = useState(0);
  const [exhausted, setExhausted] = useState(false);

  useEffect(() => {
    const configuration = {
      method: 'get',
      url: 'http://localhost:3001/getAll',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    // make the API call
    axios(configuration)
      .then((result) => {
        console.log('result = ', result);
        const allUsers = result.data.otherUsers;
        const usersWeNeed = allUsers.filter((user) => {
          return (
            !result.data.iLike.includes(user.username) &&
            !result.data.iDislike.includes(user.username)
          );
        });
        if (usersWeNeed.length === 0) {
          setExhausted(true);
        }
        setAllUsers(usersWeNeed);
        setLoading(false);
      })
      .catch((error) => {
        error = new Error();
        console.log('error ===', error);
      });
  }, []);
  const handleIndexChange = () => {
    const nextIndex = currentUserIndex + 1;
    if (nextIndex >= allUsers.length) {
      setExhausted(true);
    } else {
      console.log('nextIndex ===', nextIndex);
      setCurrentUserIndex(nextIndex);
    }
  };
  const handleLikeDislike = (emotion) => {
    socket.emit('liked', {
      message: `someone liked ${allUsers[currentUserIndex].username}`,
    });
    // siunciam emotion ( like / dislike) ir back'e idedam i like/dislike array dabar prisijungusio user'io
    const configuration = {
      method: 'post',
      url: 'http://localhost:3001/likeDislike',
      headers: {
        Authorization: `Bearer ${token}`,
        emotion: emotion,
        who: allUsers[currentUserIndex].username,
      },
    }; // make the API call
    axios(configuration)
      .then((result) => {
        console.log('result = ', result);
        if (!result.error) {
          handleIndexChange();
        }
      })
      .catch((error) => {
        error = new Error();
        console.log('error ===', error);
      });
  };
  if (isLoading) {
    return <p>Loading...</p>;
  } else {
    return (
      <div className='container flex-d-c'>
        <LogOut />
        <h3>Check out other people :</h3>
        {exhausted ? (
          <div>
            <p>Looks like we got no other users to show you</p>
            <p>You can adjust your preferences to allow broader search</p>
            <p>
              Back to your <Link to={'/Profile'}>Profile</Link>
            </p>
          </div>
        ) : (
          <>
            <div className='datingWindow'>
              <Carousel
                showThumbs={false}
                autoPlay={true}
                stopOnHover={true}
                infiniteLoop={true}
                interval={2000}
                showIndicators={false}
              >
                {allUsers[currentUserIndex].avatar.map((image, index) => (
                  <div>
                    <img src={image} alt='' id={image} key={image} />
                  </div>
                ))}
              </Carousel>
              <div className='datingWindowInfo'>
                <p>{allUsers[currentUserIndex].username}</p>
                {allUsers[currentUserIndex].gender === 'Male' ? (
                  <p>
                    He is from: {allUsers[currentUserIndex].city} and he's
                    {allUsers[currentUserIndex].age} years old
                  </p>
                ) : (
                  <p>
                    She is from {allUsers[currentUserIndex].city} and she's
                    {allUsers[currentUserIndex].age} years old
                  </p>
                )}
              </div>
            </div>
            <div className='likeDislike'>
              <button
                className='dislikeBtn'
                onClick={() => handleLikeDislike('dislike')}
              >
                no no no
              </button>
              <button
                className='likeBtn'
                onClick={() => handleLikeDislike('like')}
              >
                uuu yeah beibi
              </button>
            </div>
          </>
        )}
      </div>
    );
  }
}

export default DatePage;
