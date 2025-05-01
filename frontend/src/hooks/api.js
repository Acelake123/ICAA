export default async function fetchTransactions(id) {
  const baseUrl = "https://api.etherscan.io/api"; // Corrected base URL
  const params = new URLSearchParams({
    chainid: 1,
    module: "account",
    action: "txlist",
    address: id,
    startblock: 0,
    endblock: 99999999,
    page: 1,
    offset: 10,
    sort: "asc",
    apikey: "VDAY6E5TAIPCKA8SU5CRTJZK13JW186BPW",
  });

  const url = `${baseUrl}?${params.toString()}`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();

    if (data.status === "0") {
      console.error(`Error from API: ${data.message}`);
      return [];
    } else {
      console.log("Transaction data:", data.result);
      return data.result;
    }
  } catch (error) {
    console.error("Error fetching transactions:", error);
    return [];
  }
}
