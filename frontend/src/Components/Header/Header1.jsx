
import { useDispatch, useSelector } from 'react-redux';
import { authAction } from '../../store/auth'

export default function Header() {
  const dispatch = useDispatch();
  const register = useSelector((state) => state.auth.register);
  function handleRegistration() {
 dispatch(authAction.signup());
  }
  function handleLogin() {
 dispatch(authAction.showLogin());
  }
  function handleContact(){
    // dispatch(authAction.)
  }
console.log(register);
  return (
    <header id="header" className='flex justify-around mt-6'>
      <div id="logo-section">
      </div>
      <nav>
        <ul id="hidden">
          <li>
            <button  className="" onClick={handleRegistration}>
              Register
            </button>
          </li>
          <li>
            <button onClick={handleLogin}>Login</button>
          </li>
        </ul>
      </nav>
    </header>
  );
}
