import { useState } from "react";
import "./WalletPage.css";

const WalletPage = () => {
    const [balance] = useState("5.6789 BTC");
    const transactions = [
        { date: "2024-12-10", description: "Received from Wallet XYZ", amount: "+1.2345 BTC", status: "Completed" },
        { date: "2024-12-09", description: "Sent to Wallet ABC", amount: "-0.5000 BTC", status: "Completed" },
        { date: "2024-12-08", description: "Transaction Fee", amount: "-0.0005 BTC", status: "Completed" },
    ];

    const sendCrypto = () => {
        alert("Redirecting to send cryptocurrency interface...");
    };

    const receiveCrypto = () => {
        alert("Redirecting to receive cryptocurrency interface...");
    };

    return (
        <div className="min-h-screen bg-gray-100 p-4">
            <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-6">
                <header className="text-center border-b pb-4 mb-4">
                    <h1 className="text-2xl font-bold text-gray-800">My Crypto Wallet</h1>
                </header>

                <section className="mb-6">
                    <h2 className="text-xl font-semibold text-gray-700">Wallet Balance</h2>
                    <p className="text-3xl font-bold text-green-600 mt-2">{balance}</p>
                </section>

                <section className="mb-6 flex justify-around">
                    <button
                        onClick={sendCrypto}
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
                    >
                        Send
                    </button>
                    <button
                        onClick={receiveCrypto}
                        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
                    >
                        Receive
                    </button>
                </section>

                <section>
                    <h2 className="text-xl font-semibold text-gray-700 mb-4">Recent Transactions</h2>
                    <table className="w-full border-collapse border border-gray-200 text-left">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="border border-gray-200 px-4 py-2">Date</th>
                                <th className="border border-gray-200 px-4 py-2">Description</th>
                                <th className="border border-gray-200 px-4 py-2">Amount</th>
                                <th className="border border-gray-200 px-4 py-2">Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {transactions.map((transaction, index) => (
                                <tr key={index} className="odd:bg-white even:bg-gray-50">
                                    <td className="border border-gray-200 px-4 py-2">{transaction.date}</td>
                                    <td className="border border-gray-200 px-4 py-2">{transaction.description}</td>
                                    <td className="border border-gray-200 px-4 py-2">{transaction.amount}</td>
                                    <td className="border border-gray-200 px-4 py-2">{transaction.status}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </section>
            </div>
        </div>
    );
};

export default WalletPage;
