import  { useState } from "react";
import { fetchTransactions } from "../hooks/etherscanApi";
import { Search } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { searchAction } from "../store/ui";
import { DataAction } from "../store/data";


const SearchBar = () => {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const detectType = (value) => {
    if (value.startsWith("0x") && value.length === 66) {
      dispatch(searchAction.detectedType('transaction'));
      console.log('hi');
      return; // Transaction hash
    } else if (!value.startsWith("0x") && !isNaN(value)) {
      dispatch(searchAction.detectedType('block'));
      return; // Block number
    } else if (value.startsWith("0x") && value.length === 42) {
      dispatch(searchAction.detectedType('wallet id'));
      return; // Wallet address
    } else {
      dispatch(searchAction.detectedType('unknown'));
      return; // Invalid input
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const type = detectType(input);

    if (type === "unknown") {
      console.log({
        error:
          "Invalid input. Please enter a valid transaction hash, block number, or wallet address.",
      });
      return;
    }

    setLoading(true);
    try {
      dispatch(DataAction.loadCurrentWalletId(input));
      const data = await fetchTransactions(input);
      dispatch(DataAction.loadData(data));
    } catch (error) {
      console.log({ error: error.message });
    } finally {
      setLoading(false);
    }
  };
  const handleChange = (e) => {
    const value = e.target.value;
    setInput(value);
  };

  return (
  <form onSubmit={handleSubmit} className="flex justify-between bg-gray-900 rounded w-full">
    <label className="flex-grow">
      <input
        className="bg-gray-900 text-gray-300 w-full p-2 outline-none"
        type="text"
        value={input}
        onChange={handleChange}
        placeholder="Search..."
        required
      />
    </label>
    <button
      type="submit"
      disabled={loading}
      className="p-2 disabled:opacity-50"
    >
      <Search className="text-gray-400" />
    </button>
  </form>

  );
};

export default SearchBar;
