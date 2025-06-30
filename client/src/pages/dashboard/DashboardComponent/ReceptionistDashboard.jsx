
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const ReceptionistDashboard = () => {
  const stats = [
    { title: "Today's Check-ins", value: 38 },
    { title: "Today's Check-outs", value: 27 },
    { title: "Payments Collected", value: "₹1,12,500" },
    { title: "Pending Bills", value: "₹23,400" },
    { title: "Room Bookings", value: 9 },
    { title: "Events Booked", value: 6 },
    { title: "Smart Cards Issued", value: 4 },
    { title: "Annual Fee Collected", value: "₹58,000" },
  ];

  const actions = [
    "Member Check-In",
    "Member Check-Out",
    "Validate Smart Card",
    "Book Event",
    "Book Room",
    "Book Hall",
    "Book Activity",
    "View Pending Bills",
    "Collect Payment",
    "Issue Smart Card",
    "Annual Fee Collection",
    "Create Token/Ticket"
  ];

  const chartData = [
    { name: "Rooms", bookings: 9 },
    { name: "Events", bookings: 6 },
    { name: "Activities", bookings: 12 },
    { name: "Halls", bookings: 4 },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-sky-100 p-6 text-gray-800">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-6 text-blue-900">Receptionist Dashboard</h1>

        {/* Stats Section */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
          {stats.map((stat, i) => (
            <div
              key={i}
              className="bg-white shadow-lg rounded-2xl p-5 hover:shadow-xl transition duration-300 border border-blue-100"
            >
              <p className="text-sm text-gray-500 mb-2">{stat.title}</p>
              <p className="text-2xl font-bold text-blue-700">{stat.value}</p>
            </div>
          ))}
        </div>

        {/* Booking Summary Chart */}
        <div className="bg-white rounded-2xl p-6 shadow-md mb-8 border border-gray-200">
          <h2 className="text-lg font-semibold mb-4 text-blue-800">Booking Summary</h2>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="bookings" fill="#3b82f6" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Action Buttons */}
        <div className="bg-white rounded-2xl p-6 shadow-md border border-gray-200">
          <h2 className="text-lg font-semibold mb-4 text-blue-800">Quick Actions</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
            {actions.map((action, index) => (
              <button
                key={index}
                className="bg-blue-600 text-white text-sm font-medium py-2 px-3 rounded-xl hover:bg-blue-700 transition"
              >
                {action}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReceptionistDashboard;