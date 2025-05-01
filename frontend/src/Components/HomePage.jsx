import Header from "./Header/Header1";
import { useSelector } from "react-redux";
import SignUp from "./Auth/SignUp";
import Login from "./Auth/Login";
import Footer from "./Footer";
import { Link } from "react-router-dom";
export default function HomePage() {
    const register = useSelector(state => state.auth.signup);
    const login = useSelector(state => state.auth.login);
  return (
    <>
    <div className="flex flex-col min-h-screen">
      <Header />
      <main className="flex-grow flex justify-center items-center ">
    {register && <SignUp /> }
    {login && <Login /> }
    <div className="flex flex-col gap-7 ">
        <h1 className="text-7xl text-center">Cryptocurrency <br /> Monitoring System</h1>
    <Link to="/dashboard/overview"  className="border-2 px-5 max-w-28 mx-auto" >Track</Link>
        </div>
        {/* Content goes here */}
      </main>
      <Footer />
    </div>
    </>
  );
};
