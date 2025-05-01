import InputField from '../../UI/InputField';
import Button from '../../UI/Button';
import Modal from '../../UI/Modal';

import { useDispatch, useSelector } from 'react-redux';
import { authAction } from '../../store/auth';
import { useEffect } from 'react';

import { useNavigate } from 'react-router-dom';
import { BACKEND_URL } from '../../config';

export default function SignUp() {
  const dispatch = useDispatch();
  const open = useSelector(state => state.auth.signup);
  const navigate = useNavigate();

  async function submitHandle(event) {
    event.preventDefault();
    const fd = new FormData(event.target);
    const customerData = Object.fromEntries(fd.entries()); // { email: test@example.com }
    console.log(customerData); // Check the output here
    const res = await fetch(`${BACKEND_URL}/api/v1/user/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(customerData), // Send the object directly
    });

    const data = await res.json(); // Properly await the response
    console.log("data is ", data);
    
    if (!res.ok) {
      const errorData = await res.json(); // Parse the error response if needed
      throw new Error(errorData.message || 'Failed to sign up');
    }

    else{
      navigate("/dashboard/overview")
    }
    
    
  }

  function handleCloseSignup() {
    dispatch(authAction.signup());
  }
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        handleCloseSignup();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    // Cleanup event listener on unmount
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []); 
  return (
    <Modal open={open}>
      <div className="p-8 space-y-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center ">Sign Up</h2>
        <form className="space-y-4" onSubmit={submitHandle}>

          {/* <div className="flex gap-4">
            <InputField id="firstName" label="First Name" type="text" name="firstName" />
            <InputField id="lastName" label="Last Name" type="text" name="lastName" />
          </div> */}
          <InputField id="email" label="Email" type="email" name="email" />
          <InputField id="password" label="Password" type="password" name="password" />
          {/* <InputField id="confirm-password" label="Confirm Password" type="password" name="confirmPassword" /> */}
          <div className="flex justify-end gap-3 mx-5">
            <Button textonly onClick={handleCloseSignup}>Close</Button>
            <Button className="bg-yellow-300" type="submit">Sign up</Button>
          </div>
        </form>
      </div>
    </Modal>
  );
}
