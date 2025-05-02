import React, { useEffect, useState } from 'react';

const TransactionFeed = () => {
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const socket = new WebSocket('ws://localhost:8080');

    socket.onopen = () => {
      console.log('Connected to WebSocket server');
    };

    socket.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);

        // Ignore welcome messages
        if (data.hash && data.from && data.to) {
          // @ts-ignore
          setTransactions((prev) => [data, ...prev]);
        }
      } catch (err) {
        console.error("Error parsing WebSocket message:", err);
      }
    };

    socket.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    return () => {
      socket.close();
    };
  }, []);

  return (
    <div style={{ padding: '1rem' }}>
      <h2>Live Ethereum Transactions</h2>
      {transactions.length === 0 ? (
        <p>No transactions yet...</p>
      ) : (
        <ul>
          {transactions.map((tx) => (
            <li key={tx.hash} style={{ marginBottom: '1rem' }}>
              <strong>From:</strong> {tx.from}<br />
              <strong>To:</strong> {tx.to}<br />
              <strong>Value:</strong> {tx.value}<br />
              <strong>Time:</strong> {tx.timeStamp}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TransactionFeed;
