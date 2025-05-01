import { useState } from "react";
import { useNavigate } from "react-router-dom"; // If you're using React Router for navigation

const LogoutPage = () => {
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const [message, setMessage] = useState("");

  const navigate = useNavigate(); // Hook to navigate to another page after logout

  const handleLogout = () => {
    setIsLoggingOut(true);

    // Simulating a logout process (you can add actual logic for logout here)
    setTimeout(() => {
      setMessage("You have successfully logged out.");
      setIsLoggingOut(false);
      // Redirect to login page (or home page)
      navigate("/login"); // Assuming you have a /login route
    }, 2000); // Simulating a delay (e.g., API call)
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-100 p-6">
      <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-md">
        <header className="text-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Logout</h1>
          <p className="mt-2 text-lg text-gray-600">Are you sure you want to log out?</p>
        </header>

        {message && (
          <div className="bg-green-100 text-green-700 border border-green-300 p-4 mb-6 rounded-md">
            {message}
          </div>
        )}

        {!isLoggingOut && (
          <div className="flex justify-center">
            <button
              onClick={handleLogout}
              className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700 transition"
            >
              Logout
            </button>
          </div>
        )}

        {isLoggingOut && (
          <div className="text-center text-gray-600">
            <p>Logging out...</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default LogoutPage;
