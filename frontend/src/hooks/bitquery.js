import axios from "axios";

const BITQUERY_API_URL = "https://graphql.bitquery.io";
const BITQUERY_API_KEY = "YOUR_API_KEY_HERE";

export const fetchTransactionDetails = async (transactionHash) => {
  const query = `
    query ($transactionHash: String!) {
      EVM(dataset: combined, network: eth) {
        Transactions(where: { Hash: { is: $transactionHash } }) {
          Hash
          From
          To
          Value
          Gas
          GasPrice
          Block {
            Number
            Hash
            Time
          }
        }
      }
    }
  `;

  const variables = { transactionHash };

  try {
    const response = await axios.post(
      BITQUERY_API_URL,
      {
        query,
        variables,
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'X-API-KEY': BITQUERY_API_KEY,
        },
      }
    );

    return response.data.data.EVM.Transactions;
  } catch (error) {
    throw new Error(error.response?.data?.errors[0]?.message || error.message);
  }
};

// Usage Example
(async () => {
  try {
    const transactionHash = "0x201a26bee54c430ec46dd6e16c06b638e9e772284c2584631897725a65d0cad1";
    const transactionDetails = await fetchTransactionDetails(transactionHash);
    console.log("Transaction Details:", transactionDetails);
  } catch (error) {
    console.error("Error fetching transaction details:", error.message);
  }
})();
