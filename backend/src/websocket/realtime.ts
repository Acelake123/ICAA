import 'dotenv/config';
import { WebSocketServer } from 'ws';
import axios from 'axios';

const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API;
const ETH_ADDRESS = '0xe760cb4876Ece39Ae861233CedA0C0Ea0D87F2d6';

let lastTransactionHash = "";

// Fetch latest transactions
async function fetchLatestTransactions(address:any) {
  const url = `https://api-sepolia.etherscan.io/api
?module=account
&action=txlist
&address=${address}
&startblock=0
&endblock=99999999
&page=1
&offset=5
&sort=desc
&apikey=${ETHERSCAN_API_KEY}`.replace(/\s+/g, "");

  try {
    const response = await axios.get(url);
    if (response.data.status === "1" && response.data.result.length > 0) {
      return response.data.result;
    }
    return [];
  } catch (error) {
    console.error("Error fetching data:", error.message);
    return [];
  }
}

// Monitor and broadcast new transactions
export function startTransactionMonitor(wss) {
  console.log("🚀 Ethereum transaction monitor started...");

  async function broadcastNewTransactions() {
    const transactions = await fetchLatestTransactions(ETH_ADDRESS);

    if (transactions.length > 0) {
      const latestTx = transactions[0];

      if (latestTx.hash !== lastTransactionHash) {
        lastTransactionHash = latestTx.hash;

        const newTransaction = {
          hash: latestTx.hash,
          from: latestTx.from,
          to: latestTx.to,
          value: `${(latestTx.value / 1e18).toFixed(6)} ETH`,
          timeStamp: new Date(latestTx.timeStamp * 1000).toLocaleString(),
        };

        console.log("📢 Broadcasting:", newTransaction);

        wss.clients.forEach((client) => {
          if (client.readyState === client.OPEN) {
            client.send(JSON.stringify(newTransaction));
          }
        });
      }
    }
  }

  setInterval(broadcastNewTransactions, 10000); // Every 10 seconds
}
