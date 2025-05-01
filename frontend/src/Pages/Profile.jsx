// TransactionList.jsx
const transactions = [
  {
    hash: "0x5b8e6a5b66315067b908a44aa2e28728482ece1ceff3c17232dc9d266f801088",
    from: "Binance: Hot Wallet",
    to: "0x6e2a43be0b1d33b726f0ca3b8de60b3482b8b050",
    timeStamp: undefined,
    value: 0,
    flagged: true,
  },
  {
    hash: "0xe7ae2382120b5ff958953e58537eabc6ce7a8ffd838a51f8e08019b2ae205e31",
    from: "Binance: Hot Wallet",
    to: "0x6e2a43be0b1d33b726f0ca3b8de60b3482b8b050",
    timeStamp: undefined,
    value: 0,
    flagged: true,
  },
  // Add more transactions if needed
];

const Profile = () => {
  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h2 style={{ textAlign: 'center', color: '#333' }}>Transaction List</h2>
      {transactions.length === 0 ? (
        <p style={{ textAlign: 'center', color: '#777' }}>No transactions available.</p>
      ) : (
        transactions.map((transaction, index) => (
          <div
            key={transaction.hash}
            style={{
              border: `2px solid ${transaction.flagged ? 'red' : '#ddd'}`,
              borderRadius: '8px',
              padding: '15px',
              margin: '10px 0',
              boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
              backgroundColor: transaction.flagged ? 'gray' : 'gray',
            }}
          >
            <h3 style={{ marginBottom: '10px', color: transaction.flagged ? 'red' : '#333' }}>
              Transaction {index + 1}
            </h3>
            <p><strong>Transaction Hash:</strong> {transaction.hash}</p>
            <p><strong>From:</strong> {transaction.from || 'Unknown'}</p>
            <p><strong>To:</strong> {transaction.to || 'Unknown'}</p>
            <p><strong>TimeStamp:</strong> {transaction.timeStamp || 'N/A'}</p>
            <p><strong>Value:</strong> {transaction.value} ETH</p>
            <p><strong>Flagged:</strong> {transaction.flagged ? 'Yes' : 'No'}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default Profile;
