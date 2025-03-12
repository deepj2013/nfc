import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const defaultData = [
  { name: "Page A", uv: 4000, pv: 2400, amt: 2400 },
  { name: "Page B", uv: 3000, pv: 1398, amt: 2210 },
  { name: "Page C", uv: 2000, pv: 9800, amt: 2290 },
  { name: "Page D", uv: 2780, pv: 3908, amt: 2000 },
  { name: "Page E", uv: 1890, pv: 4800, amt: 2181 },
  { name: "Page F", uv: 2390, pv: 3800, amt: 2500 },
  { name: "Page G", uv: 3490, pv: 4300, amt: 2100 },
];

export default function Chart({ data = defaultData }) {
  return (
    <div className="w-full h-96 bg-white p-6 rounded-lg shadow-md">
      <ResponsiveContainer width="100%" height={400}>
        <BarChart
          data={data}
          margin={{ top: 10, right: 30, left: 10, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          {/* ✅ Explicitly pass all required props to XAxis */}
          <XAxis dataKey="name" tick={{ fill: "#000" }} />
          {/* ✅ Explicitly pass all required props to YAxis */}
          <YAxis tick={{ fill: "#000" }} />
          <Tooltip />
          <Legend />
          <Bar dataKey="pv" fill="#8884d8" barSize={40} />
          <Bar dataKey="uv" fill="#82ca9d" barSize={40} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}