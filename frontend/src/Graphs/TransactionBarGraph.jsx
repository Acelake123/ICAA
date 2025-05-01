import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';

const TransactionBarGraph = ({ data }) => {
  // Process the data to group by date and calculate the total value
  const groupedData = data.reduce((acc, transaction) => {
    const date = new Date(transaction.time).toISOString().split('T')[0]; // Extract only the date
    acc[date] = (acc[date] || 0) + transaction.value;
    return acc;
  }, {});

  // Convert grouped data into an array format for Recharts
  const chartData = Object.entries(groupedData).map(([date, totalValue]) => ({
    date,
    value: totalValue,
  }));

  return (
    <div className="w-full max-w-4xl p-4">
      <h2 className="text-center text-lg font-semibold mb-4">Total Transaction Value Per Day</h2>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart data={chartData} margin={{ top: 20, right: 20, left: 20, bottom: 20 }}>
          <XAxis dataKey="date" tick={{ fontSize: 12 }} />
          <YAxis tick={{ fontSize: 12 }} />
          <Tooltip formatter={(value) => value.toFixed(4)} />
          <Bar dataKey="value" fill="#4a90e2" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default TransactionBarGraph;
