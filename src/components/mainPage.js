import { Link } from 'react-router-dom';
import LogOut from './logOut';

function MainPage() {
  return (
    <div className=''>
      <div className='container flex-d-c'>
        <Link className='linkas' to='/profile'>
          Profile
        </Link>
        <Link className='linkas' to='/datePage'>
          Dating
        </Link>
        <LogOut />
      </div>
    </div>
  );
}

export default MainPage;
