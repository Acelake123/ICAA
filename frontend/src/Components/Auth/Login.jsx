import InputField from '../../UI/InputField';
import Button from '../../UI/Button';
import Modal from '../../UI/Modal';
import { BACKEND_URL } from '../../config';

import { useDispatch, useSelector } from 'react-redux';
import { authAction } from '../../store/auth';
import { useEffect } from 'react';
import  { useNavigate } from "react-router-dom"


export default function Login(){
  const dispatch = useDispatch();
  const open = useSelector(state => state.auth.login);
  const navigate = useNavigate();

  function handleCloseLogin(){
    dispatch(authAction.login());
  }

  async function handleLogin(event) {
    event.preventDefault();
    const fd = new FormData(event.target);
    const customerData = Object.fromEntries(fd.entries());
    console.log(customerData);

    const res = await fetch(`${BACKEND_URL}/api/v1/user/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(customerData),
    });

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(errorData.message || 'Failed to sign up');
    }
    else{
      dispatch(authAction.setLogin(true));
      navigate("/dashboard/overview")
    }
  }

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        handleCloseLogin();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  return (
    <Modal open={open}>
      <div className="p-8 space-y-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center ">Log in</h2>
        <form className="space-y-4" onSubmit={handleLogin}>
          <InputField id="email" label="Email" type="email" name="email" />
          <InputField id="password" label="Password" type="password" name="password" />
          <div className='flex justify-end gap-3 mx-5'>
            <Button textonly onClick={handleCloseLogin}>Close</Button>
            <Button className='bg-yellow-300' type="submit">Login</Button>
          </div>
        </form>
      </div>
    </Modal>
  );
};
