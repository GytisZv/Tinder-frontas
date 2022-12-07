import Cookies from 'universal-cookie';
const cookies = new Cookies();

function LogOut() {
  const logout = () => {
    // destroy the cookie
    cookies.remove('TOKEN', { path: '/' });
    // redirect user to the landing page
    window.location.href = '/';
  };
  return (
    <button
      onClick={() => {
        logout();
      }}
      className='logOutBtn animationShake text-danger'
    >
      Log out
    </button>
  );
}

export default LogOut;
