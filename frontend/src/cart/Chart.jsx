import  { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

// Helper function to convert timestamp to date
const timestampToDate = (timestamp) => {
  const date = new Date(timestamp * 1000); // Convert seconds to milliseconds
  return date.toISOString().split("T")[0]; // Extract date in YYYY-MM-DD format
};

// Helper function to aggregate transactions by date
const aggregateByDate = (data) => {
  const aggregatedData = data.reduce((acc, transaction) => {
    const date = timestampToDate(transaction.timeStamp); // Convert timestamp to date
    const value = parseFloat(transaction.value) / 1e18; // Convert wei to ETH

    if (acc[date]) {
      acc[date] += value; // Add value to the existing date
    } else {
      acc[date] = value; // Initialize the date with the value
    }

    return acc;
  }, {});

  // Convert the aggregated object to an array suitable for Recharts
  return Object.entries(aggregatedData).map(([date, value]) => ({
    date,
    value,
  }));
};

const TransactionsChart = () => {
  const [chartsData, setChartsData] = useState([]);
const data = useSelector(state=>state.data.tnxData);
console.log('data is', data);
  useEffect(() => {
    if (data && data.length > 0) {
      const aggregatedData = aggregateByDate(data); // Aggregate transactions by date
      setChartsData(aggregatedData);
    }
  }, [data]);

  return (
    <div className="bg-gray-800 shadow-lg rounded-lg p-6  col-span-2 row-span-2 m-4">
      {chartsData.length > 0 ? (
        <>
          <h2 className="text-lg font-bold text-white mb-4">
            Transactions Over Time
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={chartsData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#444" />
              <XAxis
                dataKey="date"
                stroke="#ddd"
                tickFormatter={(date) => date.split("-")[2]} // Show day only
              />
              <YAxis stroke="#ddd" />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#2d3748",
                  border: "none",
                  borderRadius: "4px",
                }}
                labelStyle={{ color: "#fff" }}
                formatter={(value) => `${value.toFixed(2)} ETH`}
              />
              <Line
                type="monotone"
                dataKey="value"
                stroke="#82ca9d"
                strokeWidth={2}
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </>
      ) : (
        <p className="text-gray-400 text-center">No data available</p>
      )}
    </div>
  );
};

export default TransactionsChart;
