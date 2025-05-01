// src/components/Header.jsx
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { authAction } from "../../store/auth";

export default function Header() {
  const dispatch = useDispatch();
  const isRegisterOpen = useSelector(state => state.auth.signup);
  const isLoginOpen    = useSelector(state => state.auth.login);

  function handleRegistration() {
    dispatch(authAction.signup());  // toggles signup boolean
  }
  function handleLogin() {
    dispatch(authAction.login());   // toggles login boolean
  }

  return (
    <header id="header" className="flex justify-around mt-6">
      <div id="logo-section">
        {/* your logo here */}
      </div>
      <nav>
        <ul id="hidden" className="flex gap-4">
          <li>
            <button onClick={handleRegistration}>
              {isRegisterOpen ? "Close Register" : "Register"}
            </button>
          </li>
          <li>
            <button onClick={handleLogin}>
              {isLoginOpen ? "Close Login" : "Login"}
            </button>
          </li>
        </ul>
      </nav>
    </header>
  );
}
  