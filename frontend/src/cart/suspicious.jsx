import React, { useState } from "react";
import { useSelector } from "react-redux";
const SuspiciousAccountsFinder = ({graphData}) => {
  const [transactionThreshold, setTransactionThreshold] = useState(5);
  const [valueThreshold, setValueThreshold] = useState(10);
  const [repetitiveThreshold, setRepetitiveThreshold] = useState(3);
  const [isolationFlag, setIsolationFlag] = useState(true);
  const [flaggedAccounts, setFlaggedAccounts] = useState([
    "0x5c47902c8c80779cb99235e42c354e53f38c3b0d",
  ]);
  const [suspiciousAccounts, setSuspiciousAccounts] = useState([]);
const graph = graphData;
//   const graph = {
//     nodes: [
//       { id: "0x6f65cfb9547264e4f179c23b9b371c5e7f0d2b62", label: "0x6...b62" },
//       { id: "0x5c47902c8c80779cb99235e42c354e53f38c3b0d", label: "0x5...b0d" },
//       { id: "0x413e86a54ee4ef3f67a2aaf4cd2e552fb3e869e9", label: "0x4...9e9" },
//       { id: "0xa060b6fa587f673aa06e69e17acfc72226c796d3", label: "0xa...6d3" },
//     ],
//     edges: [
//       {
//         from: "0x6f65cfb9547264e4f179c23b9b371c5e7f0d2b62",
//         to: "0x5c47902c8c80779cb99235e42c354e53f38c3b0d",
//         label: "4.0000 ETH",
//       },
//       {
//         from: "0x413e86a54ee4ef3f67a2aaf4cd2e552fb3e869e9",
//         to: "0x5c47902c8c80779cb99235e42c354e53f38c3b0d",
//         label: "14.0000 ETH",
//       },
//       {
//         from: "0xa060b6fa587f673aa06e69e17acfc72226c796d3",
//         to: "0x5c47902c8c80779cb99235e42c354e53f38c3b0d",
//         label: "4.0000 ETH",
//       },
//     ],
//   };

  const findSuspiciousAccounts = (
    graph,
    transactionThreshold,
    valueThreshold,
    repetitiveThreshold,
    isolationFlag,
    flaggedAccounts
  ) => {
    const { nodes, edges } = graph;

    const adjacencyList = new Map();
    const transactions = new Map();

    edges.forEach((edge) => {
      if (!adjacencyList.has(edge.from)) {
        adjacencyList.set(edge.from, []);
      }
      adjacencyList.get(edge.from).push(edge.to);

      if (!transactions.has(edge.from)) {
        transactions.set(edge.from, []);
      }
      transactions.get(edge.from).push({
        to: edge.to,
        value: parseFloat(edge.label.split(" ")[0]),
      });
    });

    const suspiciousAccounts = new Set();

    nodes.forEach((node) => {
      const accountId = node.id;
      const outgoingTransactions = transactions.get(accountId) || [];
      const incomingTransactions = edges.filter(
        (edge) => edge.to === accountId
      );

      if (
        outgoingTransactions.length + incomingTransactions.length >=
        transactionThreshold
      ) {
        suspiciousAccounts.add(accountId);
      }

      const totalValue = outgoingTransactions.reduce(
        (sum, tx) => sum + tx.value,
        0
      );
      if (totalValue >= valueThreshold) {
        suspiciousAccounts.add(accountId);
      }

      const repetitionCount = outgoingTransactions.reduce((map, tx) => {
        map[tx.value] = (map[tx.value] || 0) + 1;
        return map;
      }, {});
      if (Object.values(repetitionCount).some((count) => count >= repetitiveThreshold)) {
        suspiciousAccounts.add(accountId);
      }

      if (
        isolationFlag &&
        outgoingTransactions.length === 0 &&
        incomingTransactions.length === 0
      ) {
        suspiciousAccounts.add(accountId);
      }

      const interactsWithFlagged = outgoingTransactions.some((tx) =>
        flaggedAccounts.includes(tx.to)
      );
      if (interactsWithFlagged) {
        suspiciousAccounts.add(accountId);
      }
    });

    return Array.from(suspiciousAccounts);
  };

  const handleRunAnalysis = () => {
    const result = findSuspiciousAccounts(
      graph,
      parseInt(transactionThreshold, 10),
      parseFloat(valueThreshold),
      parseInt(repetitiveThreshold, 10),
      isolationFlag,
      flaggedAccounts
    );
    setSuspiciousAccounts(result);
  };

  return (
    <div className="p-6 font-sans">
      <h1 className="text-2xl font-bold mb-4">Suspicious Accounts Finder</h1>
      <div className="mb-6 grid grid-cols-1 gap-4">
        <div>
          <label className="block text-sm font-medium text-white">
            Transaction Threshold
          </label>
          <input
            type="number"
            value={transactionThreshold}
            onChange={(e) => setTransactionThreshold(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 text-black rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-white">
            Value Threshold (ETH)
          </label>
          <input
            type="number"
            value={valueThreshold}
            onChange={(e) => setValueThreshold(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 text-black rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-white">
            Repetitive Threshold
          </label>
          <input
            type="number"
            value={repetitiveThreshold}
            onChange={(e) => setRepetitiveThreshold(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 text-black rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
        <div className="flex items-center">
          <input
            type="checkbox"
            checked={isolationFlag}
            onChange={(e) => setIsolationFlag(e.target.checked)}
            className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 text-black rounded"
          />
          <label className="ml-2 block text-sm font-medium text-white">
            Isolation Flag
          </label>
        </div>
        <div>
          <label className="block text-sm font-medium text-white">
            Flagged Accounts (comma-separated)
          </label>
          <input
            type="text"
            value={flaggedAccounts.join(",")}
            onChange={(e) => setFlaggedAccounts(e.target.value.split(","))}
            className="mt-1 block w-full p-2 border border-gray-300 text-black rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          />
        </div>
      </div>
      <button
        onClick={handleRunAnalysis}
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
      >
        Analyze Accounts
      </button>
      <h2 className="text-lg font-medium mt-6">Results</h2>
      {suspiciousAccounts.length > 0 ? (
        <ul className="list-disc pl-6">
          {suspiciousAccounts.map((account) => (
            <li key={account}>{account}</li>
          ))}
        </ul>
      ) : (
        <p>No suspicious accounts found.</p>
      )}
    </div>
  );
};

export default SuspiciousAccountsFinder;
