import React from "react";
import { useSelector } from "react-redux";

// Helper Functions
const formatTimestamp = (timestamp) => {
  const date = new Date(timestamp * 1000);
  return date.toLocaleString(); // Convert timestamp to local date and time
};

const formatEtherValue = (value) => {
  return `${(parseFloat(value) / 1e18).toFixed(4)} ETH`; // Convert wei to ETH
};

const formatGasPrice = (gasPrice) => {
  return `${(parseFloat(gasPrice) / 1e9).toFixed(2)} Gwei`; // Convert wei to Gwei
};


const TransactionDetails = ({ data }) => {
    const details = useSelector(state => state.data.tnxData);
    const filteredData = details.filter(
        (obj) => obj.hash === null && obj.to !== undefined && obj.to !== ""
      );
  return (
    <div className="p-6 max-w-4xl mx-auto bg-white shadow-md rounded-lg border border-gray-200 mt-10">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Transaction Details</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex flex-col">
          <span className="text-gray-600 font-semibold">Block Number</span>
          <span className="text-gray-900">{data.blockNumber}</span>
        </div>
        <div className="flex flex-col">
          <span className="text-gray-600 font-semibold">Block Hash</span>
          <span className="text-gray-900 truncate">{data.blockHash}</span>
        </div>
        <div className="flex flex-col">
          <span className="text-gray-600 font-semibold">Timestamp</span>
          <span className="text-gray-900">{formatTimestamp(data.timeStamp)}</span>
        </div>
        <div className="flex flex-col">
          <span className="text-gray-600 font-semibold">Transaction Hash</span>
          <span className="text-gray-900 truncate">{data.hash}</span>
        </div>
        <div className="flex flex-col">
          <span className="text-gray-600 font-semibold">From</span>
          <span className="text-gray-900 truncate">{data.from}</span>
        </div>
        <div className="flex flex-col">
          <span className="text-gray-600 font-semibold">To</span>
          <span className="text-gray-900 truncate">{data.to}</span>
        </div>
        <div className="flex flex-col">
          <span className="text-gray-600 font-semibold">Ether Value</span>
          <span className="text-gray-900">{formatEtherValue(data.value)}</span>
        </div>
        <div className="flex flex-col">
          <span className="text-gray-600 font-semibold">Gas Price</span>
          <span className="text-gray-900">{formatGasPrice(data.gasPrice)}</span>
        </div>
        <div className="flex flex-col">
          <span className="text-gray-600 font-semibold">Gas Used</span>
          <span className="text-gray-900">{data.gasUsed}</span>
        </div>
        <div className="flex flex-col">
          <span className="text-gray-600 font-semibold">Transaction Index</span>
          <span className="text-gray-900">{data.transactionIndex}</span>
        </div>
        <div className="flex flex-col">
          <span className="text-gray-600 font-semibold">Confirmations</span>
          <span className="text-gray-900">{data.confirmations}</span>
        </div>
        <div className="flex flex-col">
          <span className="text-gray-600 font-semibold">Transaction Status</span>
          <span className="text-gray-900">{data.txreceipt_status === "1" ? "Success" : "Failed"}</span>
        </div>
      </div>
    </div>
  );
};

// Sample Usage
const sampleData = {
  blockNumber: "16983956",
  blockHash: "0x6bc93e0b1bd2d443f9ead61eeca915978b8f3926817cc283503c094c210b757b",
  timeStamp: "1680714551",
  hash: "0x6269b3e0a2a3f2eec68437c24425fa9d5309c035068ca14f7a8e67b2f0458253",
  nonce: "4",
  transactionIndex: "449",
  from: "0x4838b106fce9647bdf1e7877bf73ce8b0bad5f97",
  to: "0x4675c7e5baafbffbca748158becba61ef3b0a263",
  value: "29341804665473308",
  gas: "21000",
  gasPrice: "40286762374",
  input: "0x",
  methodId: "0x",
  functionName: "",
  contractAddress: "",
  cumulativeGasUsed: "21081975",
  txreceipt_status: "1",
  gasUsed: "21000",
  confirmations: "4274975",
  isError: "0",
};

export default function App() {
  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <TransactionDetails data={sampleData} />
    </div>
  );
}


import Modal from '../UI/Modal';
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import  { useNavigate } from "react-router-dom"


export default function Login(){
  const dispatch = useDispatch();
  const open = useSelector(state => state.ui.showDetail);
  const transactionDetail = useSelector(state => state.data.tnxData)
  const navigate = useNavigate();

  function handleCloseLogin(){
    dispatch(authAction.showLogin());
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

    
    navigate("/Dashboard")
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
