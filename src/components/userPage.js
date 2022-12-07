import { Link } from 'react-router-dom';

function UserPage() {
  return (
    <div className='container flex-d-c'>
      <Link className='linkas' to='/login'>
        Login
      </Link>
      <Link className='linkas' to='/create'>
        Create
      </Link>
    </div>
  );
}

export default UserPage;
