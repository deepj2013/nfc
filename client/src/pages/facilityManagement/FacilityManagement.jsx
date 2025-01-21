import React from "react";
import { useNavigate } from "react-router";

const facilities = [
  {
    name: "Restaurant",
    description: "Manage all restaurant-related activities.",
    image: "https://lh3.googleusercontent.com/2aN8OFmMsO9RcK1nBW1ph-7Kt4iassjOZJGuY30WhP4xWTCAMhgsDa7jZYJVrxqv9CYnO7EjK7OAi6ow8mNaJByImBhm=w1200-rw", // Replace with a restaurant image
    route: "/restaurantmanagement",
  },
  {
    name: "Gym",
    description: "Manage gym sessions and memberships.",
    image: "https://t3.ftcdn.net/jpg/03/29/60/84/360_F_329608479_vP9nFK795X8lWmoTa8DPhMgoewQ7U1lG.jpg", // Replace with a gym image
    route: "/gym",
  },
  {
    name: "Swimming Pool",
    description: "Track swimming pool usage and bookings.",
    image: "https://i0.wp.com/theluxurytravelexpert.com/wp-content/uploads/2016/01/villa-honegg-switzerland.jpg?ssl=1", // Replace with a swimming pool image
    route: "/swimming-pool",
  },
];

function FacilityDashboard() {
  const navigate = useNavigate();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Facility Dashboard</h1>
      <div className="grid grid-cols-3 gap-6">
        {facilities.map((facility, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer"
            onClick={() => navigate(facility.route)}
          >
            <img
              src={facility.image}
              alt={facility.name}
              className="w-full h-40 object-cover"
            />
            <div className="p-4">
              <h2 className="text-xl font-bold text-gray-800">
                {facility.name}
              </h2>
              <p className="text-gray-600 mt-2">{facility.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default FacilityDashboard;