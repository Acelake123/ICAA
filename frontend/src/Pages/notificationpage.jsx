import { useState, useEffect } from "react";

const NotificationPage = () => {
  const [profile, setProfile] = useState({
    name: "John Doe",
    email: "johndoe@example.com",
  });
  const [notifications, setNotifications] = useState([]);
  const [message, setMessage] = useState("");  // Assuming you want to use message

  // WebSocket URL (replace this with your actual WebSocket URL)
  const websocketUrl = "ws://localhost:8080"; // Example WebSocket server URL

  // WebSocket connection setup
  useEffect(() => {
    const ws = new WebSocket(websocketUrl);

    ws.onopen = () => {
      console.log("Connected to WebSocket");
    };

    ws.onmessage = (event) => {
      const notification = JSON.parse(event.data);
      setNotifications((prevNotifications) => [notification, ...prevNotifications]);
      setMessage(notification.message);  // Update message state
    };

    ws.onclose = () => {
      console.log("Disconnected from WebSocket");
    };

    // Clean up WebSocket connection when component unmounts
    return () => {
      ws.close();
    };
  }, []);

  useEffect(() => {
    // Simulate fetching initial profile data
    setProfile({
      name: "John Doe",
      email: "johndoe@example.com",
    });
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Profile Section */}
      <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-lg p-6 mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-4">Profile</h1>
        <div className="text-gray-700 mb-4">
          <p><strong>Name:</strong> {profile.name}</p>
          <p><strong>Email:</strong> {profile.email}</p>
        </div>
      </div>

      {/* Notifications Section */}
      <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Notifications</h2>

        {/* Display the most recent message */}
        {message && (
          <div className="p-4 mb-4 bg-yellow-100 text-yellow-800 rounded-lg">
            <p>{message}</p>
          </div>
        )}

        <ul className="space-y-4">
          {notifications.length === 0 ? (
            <li className="text-gray-500">No new notifications</li>
          ) : (
            notifications.map((notification, index) => (
              <li key={index} className="bg-gray-50 p-4 rounded-lg shadow-md">
                <p className="text-gray-800">{notification.message}</p>
                <p className="text-sm text-gray-500">{notification.timestamp}</p>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
};

export default NotificationPage;
