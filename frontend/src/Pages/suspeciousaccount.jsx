import { useState } from "react";
import "./SuspiciousAccountPage.css";

const SuspiciousAccountPage = () => {
  const [reason, setReason] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    setMessage(`Your report for suspicious activity with reason "${reason}" has been submitted.`);
    setReason("");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-2xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <header className="text-center mb-6">
          <h1 className="text-3xl font-bold text-red-600">Suspicious Account Activity</h1>
          <p className="mt-2 text-lg text-gray-600">Please fill out the form below if you suspect any unusual activity.</p>
        </header>

        {message && (
          <div className="bg-green-100 text-green-700 border border-green-300 p-4 mb-6 rounded-md">
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="reason" className="block text-gray-700 font-semibold mb-2">
              Reason for Suspicion:
            </label>
            <textarea
              id="reason"
              className="w-full p-3 border border-gray-300 rounded-md"
              rows="5"
              value={reason}
              onChange={(e) => setReason(e.target.value)}
              placeholder="Describe the suspicious activity..."
              required
            ></textarea>
          </div>

          <div className="mb-6">
            <button
              type="submit"
              className="w-full py-3 bg-red-600 text-white font-semibold rounded-md hover:bg-red-700 transition"
            >
              Submit Report
            </button>
          </div>
        </form>

        <footer className="text-center text-gray-500 text-sm">
          <p>If you need immediate assistance, please contact our support team.</p>
        </footer>
      </div>
    </div>
  );
};

export default SuspiciousAccountPage;
