import { useEffect, useState } from "react";
import GraphComponent from "./Graph";
import { useSelector } from "react-redux";
import fetchTransactions from "../hooks/api";
import SuspiciousAccountsFinder from "../cart/suspicious";

const dummyData = {
  nodes: [],
  edges: [],
};

const Chain = () => {
  const data = useSelector(state => state.data.tnxData);
  const walletId = useSelector(state => state.data.currentWalletID);
  const [graphData, setGraphData] = useState(dummyData);
  console.log('graham',graphData);
  
  async function callApi(id) {
    try {
      console.log("Fetching transactions for ID:", id);

      // Call the API
      const fetchData = await fetchTransactions(id || walletId);

      if (!fetchData || !Array.isArray(fetchData)) {
        throw new Error("Invalid data received from API.");
      }

      console.log("Fetched Data:", fetchData);

      // Filter valid transactions
      const filtered = fetchData.filter(
        (obj) => obj.to && obj.from // Include only transactions with `to` and `from`
      );

      if (!filtered.length) {
        console.warn("No valid transactions found.");
        return;
      }

      // Create unique nodes
      const uniqueAddresses = new Set(graphData.nodes.map((node) => node.id));
      const newNodes = [];
      
      
      filtered.flatMap((tx) => [tx.from, tx.to]).forEach((address) => {
        if (!uniqueAddresses.has(address)) {
          uniqueAddresses.add(address);
      
          // Assign a unique count as the label
          newNodes.push({
            id: address, // Unique ID of the node
            label: `${address.slice(0, 3)}...${address.slice(-3)}`, // Counting number as the label
          });
      
        }
      });
      

      // Create unique edges
      const existingEdges = new Set(
        graphData.edges.map((edge) => `${edge.from}-${edge.to}`)
      );

      const newEdges = filtered
      .map((tx) => ({
        from: tx.from,
          to: tx.to,
          label: `${(tx.value / 1e18).toFixed(4)} ETH`
        }))
        .filter(
          (edge) => !existingEdges.has(`${edge.from}-${edge.to}`) // Filter out existing edges
        );
        
        // Merge the new nodes and edges into the existing graph data
        const updatedGraphData = {
          nodes: [...graphData.nodes, ...newNodes],
          edges: [...graphData.edges, ...newEdges],
        };

      setGraphData(updatedGraphData);
     
      console.log("Updated Graph Data:", updatedGraphData);
    } catch (error) {
      // Log the error and show a user-friendly message if necessary
      console.error("Error fetching transactions:", error.message || error);
    }
  }

  useEffect(() => {
    callApi(); // Fetch initial data
  }, [data]);


  return (
    <div>
      <GraphComponent data={graphData} onNodeClick={callApi} />
      <SuspiciousAccountsFinder graphData={graphData} />
    </div>
  );
};

export default Chain;
