const AddressInfo = ({
  address = "0x4838b106...5f97",
  label = "dark_web",
  totalReceived = "1.51m ETH",
  totalSent = "103.15k ETH",
  balance = "1.46m ETH",
  tokenHoldings = "53.8 USD (3 tokens)",
  lastUsage = "Dec 11, 2024 06:16:23",
  firstUsage = "Apr 04, 2023 22:38:23",
  transactionsSummary = "2m (1m | 986k)",
}) => {
  return (
    <div className="p-4 w-80 bg-gray-800 text-gray-200 rounded-lg shadow-lg">
      {/* Header: Address and label */}
      <div className="flex items-center space-x-2 mb-4">
        <div className="h-6 w-6 rounded-full bg-gray-600"></div>
        <div className="flex flex-col">
          <div className="text-sm text-gray-400">ETH address</div>
          <div className="text-lg font-semibold text-white truncate">
            {address}
          </div>
        </div>
      </div>

      {/* Label */}
      <div className="text-blue-400 text-sm mb-4">{label}</div>

      {/* Summary of stats */}
      <div className="border-t border-gray-700 pt-4 space-y-2 mb-4">
        <div className="flex justify-between">
          <span className="text-gray-400 text-sm">Total received</span>
          <span className="font-semibold">{totalReceived}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-400 text-sm">Total sent</span>
          <span className="font-semibold">{totalSent}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-400 text-sm">Balance ETH</span>
          <span className="font-semibold">{balance}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-400 text-sm">Token holdings</span>
          <span className="font-semibold">{tokenHoldings}</span>
        </div>
      </div>

      {/* Usage times */}
      <div className="border-t border-gray-700 pt-4 mb-4 space-y-2">
        <div className="flex justify-between">
          <span className="text-gray-400 text-sm">Last usage</span>
          <span className="font-semibold">{lastUsage}</span>
        </div>
        <div className="flex justify-between">
          <span className="text-gray-400 text-sm">First usage</span>
          <span className="font-semibold">{firstUsage}</span>
        </div>
      </div>

      {/* Transactions summary */}
      <div className="border-t border-gray-700 pt-4">
        <div className="flex items-center justify-between">
          <span className="text-gray-400 text-sm">Transactions</span>
          <span className="font-semibold">{transactionsSummary}</span>
        </div>
      </div>
    </div>
  );
};

export default AddressInfo;
