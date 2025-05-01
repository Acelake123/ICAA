import { useState, useEffect} from "react";
import { useSelector } from "react-redux";

export default function Transaction() {
    const [hashArray, setHashArray] = useState([]);
const transaction = useSelector(state => state.data.tnxData);
console.log(transaction);
useEffect(() => {
  // Extract all hash values from the transaction array
  const newHashes = transaction.map((tnx) => tnx.hash);

  setHashArray(newHashes);
},[transaction]);

const handleHashClick = (hash) => {
    console.log("Clicked hash:", hash);
    // Add your logic here (e.g., fetch data, navigate, etc.)
  };
  
  return (
    <>
<div className="bg-gray-800 shadow rounded-lg p-6 row-span-2 max-h-96">
  <h2 className="text-xl font-semibold mb-4 text-white">Transactions</h2>
  <div className="max-h-72 overflow-y-auto overflow-x-hidden">
    <ul className="list-disc pl-5">
      {hashArray.map((hash, index) => (
        <li
          key={index}
          className="text-sm my-1 font-serif text-white cursor-pointer hover:text-blue-400"
          onClick={() => handleHashClick(hash)}
        >
          {hash}
        </li>
      ))}
    </ul>
  </div>
</div>


    </>
  );
};
