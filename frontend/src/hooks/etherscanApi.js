
export  async function fetchTransactions (waletId){
    const baseUrl = "https://api.etherscan.io/v2/api";
    //  const baseUrl = "https://api-holesky.etherscan.io/api"
    const params = new URLSearchParams({
      chainid: 1,
      module: "account",
      action: "txlist",
      address: waletId,
      startblock: 0,
      endblock: 99999999,
      page: 1,
      offset: 20,
      sort: "asc",
      apikey: 'VDAY6E5TAIPCKA8SU5CRTJZK13JW186BPW',
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
      } else {
        const filteredData = data.result.filter(
            (obj) => obj.to !== null && obj.to !== undefined && obj.to !== ""
          );
          console.log(filteredData);
        return filteredData;
      }
    } catch (error) {
      console.error("Error fetching transactions:", error);
    }
  };
  
  