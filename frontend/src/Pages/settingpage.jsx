import { useState } from "react";

const SettingsPage = () => {
  const [notifications, setNotifications] = useState(true);
  const [username, setUsername] = useState("JohnDoe");
  const [theme, setTheme] = useState("light");

  const handleNotificationChange = () => {
    setNotifications(!notifications);
  };

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handleThemeChange = (e) => {
    setTheme(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("Settings updated!");
  };

  return (
    <div className={`min-h-screen ${theme === "light" ? "bg-gray-100" : "bg-gray-900"} p-8`}>
      <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <header className="text-center mb-6">
          <h1 className="text-3xl font-bold text-gray-800">Account Settings</h1>
          <p className="mt-2 text-lg text-gray-600">Update your preferences and settings below.</p>
        </header>

        <form onSubmit={handleSubmit}>
          {/* Notifications Toggle */}
          <div className="mb-6 flex items-center justify-between">
            <label className="text-gray-700 font-semibold">Enable Notifications</label>
            <input
              type="checkbox"
              checked={notifications}
              onChange={handleNotificationChange}
              className="toggle toggle-primary"
            />
          </div>

          {/* Username Input */}
          <div className="mb-6">
            <label htmlFor="username" className="block text-gray-700 font-semibold mb-2">
              Username
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={handleUsernameChange}
              className="w-full p-3 border border-gray-300 rounded-md"
              placeholder="Enter your username"
            />
          </div>

          {/* Theme Selection */}
          <div className="mb-6">
            <label htmlFor="theme" className="block text-gray-700 font-semibold mb-2">
              Select Theme
            </label>
            <select
              id="theme"
              value={theme}
              onChange={handleThemeChange}
              className="w-full p-3 border border-gray-300 rounded-md"
            >
              <option value="light">Light</option>
              <option value="dark">Dark</option>
            </select>
          </div>

          {/* Submit Button */}
          <div className="mb-6">
            <button
              type="submit"
              className="w-full py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 transition"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SettingsPage;
