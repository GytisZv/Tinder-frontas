import axios from 'axios';
import { useEffect, useState } from 'react';
import io from 'socket.io-client';
import Cookies from 'universal-cookie';
const cookies = new Cookies();
const token = cookies.get('TOKEN');

const socket = io.connect('http://localhost:3001');

function History() {
  const [stateTest, setStateTest] = useState();
  const [peopleILike, setpeopleILike] = useState([]);
  const [peopleWhoLikeMe, setpeopleWhoLikeMe] = useState([]);
  useEffect(() => {
    socket.on('refresh', (data) => {
      setStateTest(data);
      window.location.reload();
    });
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
        const usersILike = result.data.iLike;
        const meLike = result.data.likeMe.map((e) => {
          return e.username;
        });
        setpeopleILike(usersILike);
        setpeopleWhoLikeMe(meLike);
      })
      .catch((error) => {
        error = new Error();
        console.log('error ===', error);
      });
  }, []);
  return (
    <div className='historyDiv'>
      <div>
        <p>People you liked:</p>
        <ul className='historyUl'>
          {peopleILike.map((e) => {
            return (
              <li
                style={{
                  border: peopleWhoLikeMe.includes(e) ? '1px solid green' : '',
                  borderRadius: peopleWhoLikeMe.includes(e) ? '20%' : '',
                  color: peopleWhoLikeMe.includes(e) ? 'green' : 'black',
                }}
              >
                {e}
              </li>
            );
          })}
        </ul>
      </div>
      <div>
        <p>People that liked you:</p>
        <ul className='historyUl'>
          {peopleWhoLikeMe.map((e) => {
            return (
              <li
                style={{
                  border: peopleILike.includes(e) ? '1px solid green' : '',
                  borderRadius: peopleILike.includes(e) ? '20%' : '',
                  color: peopleILike.includes(e) ? 'green' : 'black',
                }}
              >
                {e}
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

export default History;
