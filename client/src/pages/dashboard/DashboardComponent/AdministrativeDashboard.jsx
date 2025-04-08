import React, { useEffect, useState } from "react";
import { getAllOrders, getSettledBills } from "../../../services/posApiServices";
import { getAllRestaurantDetail } from "../../../services/facilytRestaurantTableServices";
import Card  from "../../../components/common/Card";
import CardContent from "../../../components/common/CardContent"
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from "recharts";
import { FaWallet, FaUsers, FaChartLine, FaClock } from "react-icons/fa";

const COLORS = ["#8884d8", "#82ca9d", "#ffc658"];

const AdministrativeDashboard = () => {
  const [orders, setOrders] = useState([]);
  const [bills, setBills] = useState([]);
  const [restaurants, setRestaurants] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const [orderRes, billRes, restaurantRes] = await Promise.all([
        getAllOrders(),
        getSettledBills(),
        getAllRestaurantDetail(),
      ]);
      setOrders(orderRes.data);
      setBills(billRes.data);
      setRestaurants(restaurantRes);
    } catch (err) {
      console.error("Failed to fetch dashboard data", err);
    }
  };

  // Aggregate stats
  const today = new Date().toISOString().slice(0, 10);
  const todayBills = bills.filter(bill => bill.createdAt?.slice(0, 10) === today);
  const todaySales = todayBills.reduce((sum, b) => sum + (b.totalAmount || 0), 0);

  const weeklySales = bills.reduce((sum, bill) => {
    const date = new Date(bill.createdAt);
    const now = new Date();
    const diff = (now - date) / (1000 * 60 * 60 * 24);
    return diff <= 7 ? sum + (bill.totalAmount || 0) : sum;
  }, 0);

  const memberWallets = bills.reduce((acc, b) => acc + (b.closingBalance || 0), 0);

  const categorySales = {};
  orders.forEach((order) => {
    order.items.forEach((item) => {
      categorySales[item.category] = (categorySales[item.category] || 0) + item.price * item.quantity;
    });
  });

  const pieData = Object.entries(categorySales).map(([key, value]) => ({ name: key, value }));

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Administrative Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardContent className="flex items-center gap-4">
            <FaChartLine size={24} className="text-blue-500" />
            <div>
              <p className="text-gray-600 text-sm">Today's Sales</p>
              <h2 className="text-xl font-bold">₹{todaySales}</h2>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-4">
            <FaChartLine size={24} className="text-green-500" />
            <div>
              <p className="text-gray-600 text-sm">Weekly Sales</p>
              <h2 className="text-xl font-bold">₹{weeklySales}</h2>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-4">
            <FaWallet size={24} className="text-yellow-500" />
            <div>
              <p className="text-gray-600 text-sm">Total Wallet Balance</p>
              <h2 className="text-xl font-bold">₹{memberWallets}</h2>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="flex items-center gap-4">
            <FaUsers size={24} className="text-purple-500" />
            <div>
              <p className="text-gray-600 text-sm">Orders Today</p>
              <h2 className="text-xl font-bold">{todayBills.length}</h2>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-4 rounded shadow">
          <h3 className="text-lg font-semibold mb-2">Sales by Category</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={pieData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-4 rounded shadow">
          <h3 className="text-lg font-semibold mb-2">Category Breakdown</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie data={pieData} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={80}>
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Legend />
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default AdministrativeDashboard;