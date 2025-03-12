import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IoAddCircleSharp } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
import Button from "../../components/common/Button";
import RestaurantModal from "./AddRestaurant";
import { createSelector } from "reselect";
import {
  getAllRestaurantServices,
  toggleRestaurantStatusService,
} from "../../redux/thunk/micellaneousServices";
import { logger } from "../../utils/Helper";
import { useCallback } from "react";
import { FaEdit, FaToggleOn, FaToggleOff } from "react-icons/fa";

// 🍽️ Restaurant Card Component
const RestaurantCard = ({
  restaurant,
  setType,
  setIsOpen,
  setRestaurantEdit,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handleToggleStatus = async () => {
    try {
      await dispatch(
        toggleRestaurantStatusService({
          restaurantId: restaurant?.restaurant_id,
        })
      ).unwrap();
      dispatch(getAllRestaurantServices()); // Refresh state after toggle
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md flex items-center justify-between p-4 w-[95%]  border hover:shadow-lg transition">
      {/* 🖼️ Image Section (20%) */}
      <div className="w-[15%] min-w-[100px]">
        <img
          src={restaurant.images?.[0] || "https://via.placeholder.com/150"}
          alt={restaurant.name}
          className="w-20 h-20 object-cover rounded-lg"
        />
      </div>

      {/* 📌 Restaurant Info (30%) */}
      <div className="w-[35%] px-5 ">
        <h2 className="text-lg font-bold text-gray-800">{restaurant.name}</h2>
        <p className="text-gray-600 text-sm line-clamp-2">
          {restaurant.description}
        </p>
      </div>

      {/* ⚡ Actions (40%) */}
      <div className="w-4/10 flex flex-row flex-wrap gap-2 mx-4 justify-start">
        <button
          className="px-3 py-1 text-xs md:text-sm bg-blue-700 text-white rounded hover:bg-blue-800"
          onClick={() => navigate(`/restaurant/${restaurant.restaurant_id}/menu`)}
        >
          Menu
        </button>

        <button
          className="px-3 py-1 text-xs md:text-sm bg-gray-500 text-white rounded hover:bg-gray-600"
          onClick={() => navigate(`/restaurant/${restaurant.restaurant_id}/tables`)}
        >
          Tables
        </button>
        <button
          className="px-3 py-1 text-xs md:text-sm bg-purple-500 text-white rounded hover:bg-purple-600"
          onClick={() =>
            navigate(`/restaurant/${restaurant.restaurant_id}/appoint-captain`)
          }
        >
          Captain
        </button>
        <button
          className="px-3 py-1 text-xs md:text-sm bg-yellow-500 text-white rounded hover:bg-yellow-600"
          onClick={() => navigate(`/restaurant/${restaurant.restaurant_id}/appoint-pos`)}
        >
          POS
        </button>
        <button
          className="px-3 py-1 text-xs md:text-sm bg-orange-500 text-white rounded hover:bg-yellow-600"
          onClick={() => navigate(`/restaurant/${restaurant.restaurant_id}/kitchen`)}
        >
          Kitchen
        </button>
      </div>

      {/* 🟢 Active/Inactive Button (10%) */}
      <div className="w-[10%] flex justify-end pr-2 gap-2">
        {/* Toggle Active/Inactive Button */}
        <button
          onClick={handleToggleStatus}
          className={`p-2 rounded-full ${
            restaurant.isOpen ? "bg-green-500" : "bg-red-500"
          } text-white`}
        >
          {restaurant.isOpen ? (
            <FaToggleOn size={18} />
          ) : (
            <FaToggleOff size={18} />
          )}
        </button>

        {/* Edit Button */}
        <button
          className="p-2 border border-gray-300 rounded-full text-gray-600 hover:bg-gray-100"
          onClick={() => {
            setRestaurantEdit(restaurant);
            setIsOpen(true);
            setType("edit");
          }}
        >
          <FaEdit size={18} />
        </button>
      </div>
    </div>
  );
};

// 🍽️ Restaurant Management Page
function RestaurantManagement() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const fetchRestaurants = useCallback(() => {
    dispatch(getAllRestaurantServices());
  }, [dispatch]);

  useEffect(() => {
    fetchRestaurants();
  }, [fetchRestaurants]);

  // Memoized Selector to Prevent Unnecessary Re-renders
  const selectRestaurantState = (state) => state?.restaurant || {};

  // ✅ Use a safe fallback to prevent errors
  const selectRestaurantsData = createSelector(
    [(state) => state?.restaurant ?? {}], // ✅ Safe fallback for undefined
    (restaurantState) => {
      return {
        restaurants: restaurantState?.restaurants || [],
        loading: restaurantState?.loading || false,
        error: restaurantState?.error || null,
      };
    }
  );

  const { restaurants, loading, error } = useSelector(selectRestaurantsData);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [restaurantEdit, setRestaurantEdit] = useState(null);
  const [type, setType] = useState("");

  // 📌 Fetch Restaurants from API
  useEffect(() => {
    dispatch(getAllRestaurantServices());
  }, [dispatch]);

  useEffect(() => {
    dispatch(getAllRestaurantServices());
  }, [dispatch]);

  
  return (
    <div className="container mx-auto px-2 py-1">
      <div className="mb-2 flex items-center justify-between">
        <p className="text-3xl font-bold">Restaurant Management</p>

        {/* ➕ Add Restaurant Button */}
        <Button
          onClick={() => {
            setRestaurantEdit(null);
            setType("add");
            setIsModalOpen(true);
          }}
          rightIcon={<IoAddCircleSharp className="text-2xl" />}
          name="Add Restaurant"
        />
      </div>

      {/* 🔄 Loading State */}
      {loading && (
        <p className="text-center text-gray-600">Loading restaurants...</p>
      )}

      {/* ❌ Error State */}
      {/* {error && <p className="text-center text-red-500">{error}</p>} */}

      {/* 🚀 Show Restaurants */}
      {restaurants?.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-1 gap-1 ">
          {restaurants?.map((restaurant) => (
            <RestaurantCard
              key={restaurant?._id}
              restaurant={restaurant}
              setIsOpen={setIsModalOpen}
              setType={setType}
              setRestaurantEdit={setRestaurantEdit}
            />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-600">No restaurants found.</p>
      )}

      {/* 🛠 Add/Edit Restaurant Modal */}
      {isModalOpen && (
        <RestaurantModal
          isOpen={isModalOpen}
          onClose={() => {
            setIsModalOpen(false);
            setRestaurantEdit(null);
            setType(""); // Ensure clean state when closing modal
          }}
          menuEdit={restaurantEdit}
          types={type}
        />
      )}
    </div>
  );
}

export default RestaurantManagement;
