// HomePage.jsx
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

import Header from "./Header/Header1";
import SignUp from "./Auth/SignUp";
import Login from "./Auth/Login";
import Footer from "./Footer";

import { authAction } from "../store/auth";

export default function HomePage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // read the two flags
  const showSignup = useSelector(state => state.auth.signup);
  const isLoggedIn  = useSelector(state => state.auth.login);

  const handleTrackClick = () => {
    if (isLoggedIn) {
      // user already signed in → go straight to dashboard
      navigate("/dashboard/overview");
    } else {
      // not logged in → open the sign-up modal
      dispatch(authAction.setSignup(true));
      // ensure login modal is closed
      dispatch(authAction.setLogin(false));
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      {/* modals */}
      {showSignup && <SignUp />}
      {isLoggedIn && <Login />}

      <main className="flex-grow flex flex-col justify-center items-center gap-8">
        <h1 className="text-7xl text-center">
          Cryptocurrency <br />
          Monitoring System
        </h1>

        <button
          onClick={handleTrackClick}
          className="border-2 px-5 py-2 rounded-lg hover:bg-gray-100 transition"
        >
          Track
        </button>
      </main>

      <Footer />
    </div>
  );
}
