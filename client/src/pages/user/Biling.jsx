import React, { useState, useEffect } from "react";
import { getMemberService } from "../../redux/thunk/useMangementServices";
import { useDispatch } from "react-redux";
import {
  getAllRestaurantDetail,
  getTablesByRestaurant,
  getRestaurantMenuServices,
} from "../../services/facilytRestaurantTableServices";

const TopBar = ({ onRestaurantSelect }) => {
  const dispatch = useDispatch();
  const [memberID, setMemberID] = useState("");
  const [memberName, setMemberName] = useState("");
  const [memberMobile, setMemberMobile] = useState("");
  const [walletBalance, setWalletBalance] = useState("");
  const [memberImage, setMemberImage] = useState(
    "https://static.vecteezy.com/system/resources/thumbnails/036/594/092/small_2x/man-empty-avatar-photo-placeholder-for-social-networks-resumes-forums-and-dating-sites-male-and-female-no-photo-images-for-unfilled-user-profile-free-vector.jpg"
  );
  const [restaurants, setRestaurants] = useState([]);
  const [selectedRestaurant, setSelectedRestaurant] = useState("");
  const [tables, setTables] = useState([]);
  const [menuItems, setMenuItems] = useState([]);
  const [category, setCategories] = useState([]);

  useEffect(() => {
    fetchRestaurants();
  }, []);

  const fetchRestaurants = async () => {
    try {
      const data = await getAllRestaurantDetail();
      setRestaurants(data);
    } catch (error) {
      console.error("Failed to fetch restaurants", error);
    }
  };

  // const handleRestaurantSelect = async (restaurantId) => {
  //   if (selectedRestaurant !== restaurantId) {
  //     setSelectedRestaurant(restaurantId);
  //     setTables([]);
  //   }
  //   try {
  //     const tableData = await getTablesByRestaurant(restaurantId);
  //     setTables(tableData);

  //     const menuData = await getRestaurantMenuServices(restaurantId);
  //     let MenusData = menuData?.data.menuItems || [];

  //     setMenuItems(MenusData);
  //     setCategories([...new Set(MenusData.map((item) => item.category))]);
  //   } catch (error) {
  //     console.error("Failed to fetch tables or menu", error);
  //     setMenuItems([]);
  //   }
  // };
  const handleRestaurantSelect = async (restaurantId) => {
    setSelectedRestaurant(restaurantId);
    onRestaurantSelect(restaurantId); // Send selected restaurant to parent (POSBilling)
    try {
        const tableData = await getTablesByRestaurant(restaurantId);
        setTables(tableData);
    } catch (error) {
        console.error("Failed to fetch tables", error);
    }
};

  const fetchMemberDetails = async () => {
    try {
      const response = await dispatch(getMemberService(memberID)).unwrap();
      if (response?.msg === "Member details fetched successfully") {
        const data = response.result;
        setMemberName(
          `${data?.title || ""} ${data?.firstName || ""} ${data?.middleName || ""} ${data?.surname || ""}`.trim()
        );
        setWalletBalance(data?.balance || 0);
        setMemberMobile(data?.mobileNumber);
        setMemberImage(
          data?.profileImage ||
            "https://ps.w.org/user-avatar-reloaded/assets/icon-256x256.png?rev=2540745"
        );
      }
    } catch (error) {
      console.error("Error fetching member details:", error);
    }
  };

  return (
    <div className="p-4 bg-white shadow-lg rounded-lg">
      {/* Top Section - Member Search */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="col-span-2 flex items-center">
          {/* Profile Picture */}
          <div className="w-16 h-16 border rounded-full bg-white overflow-hidden flex items-center justify-center">
            <img
              src={memberImage}
              alt="Member"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Member ID Input */}
          <div className="ml-3 w-full">
            <label className="text-xs font-medium text-gray-700">Member ID</label>
            <div className="flex items-center">
              <input
                type="text"
                className="border p-2 w-3/4 rounded-md text-sm focus:ring focus:ring-blue-300"
                placeholder="Enter Member ID"
                value={memberID}
                onChange={(e) => setMemberID(e.target.value)}
              />
              <button
                className="ml-2 bg-blue-500 text-white px-3 py-2 rounded-md text-sm hover:bg-blue-600 transition"
                onClick={fetchMemberDetails}
              >
                Fetch
              </button>
            </div>
          </div>
        </div>

        {/* Member Info */}
        {memberName && (
          <div className="col-span-2 flex flex-col justify-center bg-gray-50 p-3 rounded-md shadow-sm">
            <h4 className="text-md font-semibold text-gray-700">{memberName}</h4>
            <p className="text-sm text-gray-600">📞 {memberMobile}</p>
            <div className="mt-2 bg-white px-3 py-1 rounded-md shadow-sm text-sm">
              <span className="text-gray-700 font-semibold">Wallet:</span>
              <span className="text-blue-600 font-bold ml-2">₹{walletBalance}</span>
            </div>
          </div>
        )}
      </div>

      {/* Middle Section - Restaurant Selection */}
      <div className="mt-4 grid grid-cols-3 gap-4">
        {/* Restaurant Selection */}
        <div>
          <label className="block text-xs font-medium">Select Restaurant</label>
          <select
            className="border p-2 w-full rounded-md text-sm"
            value={selectedRestaurant}
            onChange={(e) => handleRestaurantSelect(e.target.value)}
          >
            <option value="">-- Select Restaurant --</option>
            {restaurants.map((restaurant) => (
              <option key={restaurant.restaurant_id} value={restaurant.restaurant_id}>
                {restaurant.name}
              </option>
            ))}
          </select>
        </div>

        {/* Table Selection */}
        <div>
          <label className="block text-xs font-medium">Table Name</label>
          <select className="border p-2 w-full rounded-md text-sm">
            <option value="">-- Select Table --</option>
            {tables.map((table) => (
              <option key={table.table_id} value={table.table_id}>
                {table.table_id}
              </option>
            ))}
          </select>
        </div>

        {/* Order Processing Options */}
        <div>
          <label className="block text-xs font-medium">Order Processing</label>
          <div className="mt-1 flex flex-wrap gap-1 text-xs">
            <label className="flex items-center">
              <input type="radio" name="orderProcess" className="mr-1" /> Order
            </label>
            <label className="flex items-center">
              <input type="radio" name="orderProcess" className="mr-1" /> Billing
            </label>
            <label className="flex items-center">
              <input type="radio" name="orderProcess" className="mr-1" /> Settlement
            </label>
          </div>
        </div>
      </div>
    </div>
  );
};

const MenuDisplay = ({ selectedRestaurant }) => {
  const [menuItems, setMenuItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    if (selectedRestaurant) {
      fetchMenu(selectedRestaurant);
    }
  }, [selectedRestaurant]);

  const fetchMenu = async (restaurantId) => {
    try {
      const menuData = await getRestaurantMenuServices(restaurantId);
      let items = menuData?.data.menuItems || [];
      setMenuItems(items);
      setCategories([...new Set(items.map((item) => item.category))]);
    } catch (error) {
      console.error("Failed to fetch menu", error);
    }
  };

  return (
    <div className="grid grid-cols-12 gap-4 mt-4">
      {/* Left - Category List */}
      <div className="col-span-2 bg-gray-50 p-4 rounded-md shadow-md">
        <h4 className="text-md font-semibold mb-3">Categories</h4>
        {categories.map((cat, index) => (
          <button
            key={index}
            className={`block w-full py-1 px-2 rounded-md text-sm ${selectedCategory === cat ? "bg-blue-500 text-white" : "bg-gray-100 text-gray-700"}`}
            onClick={() => setSelectedCategory(cat)}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Middle - Menu Grid */}
      <div className="col-span-6 grid grid-cols-3 gap-4">
        {menuItems
          .filter((item) => selectedCategory === "" || item.category === selectedCategory)
          .map((item) => (
            <div key={item.id} className="border p-3 rounded-md shadow-sm">
              <h5 className="font-semibold">{item.name}</h5>
              <p className="text-sm text-gray-500">₹{item.price}</p>
            </div>
          ))}
      </div>
    </div>
  );
};



function POSBilling() {
  const [selectedRestaurant, setSelectedRestaurant] = useState("");

  return (
    <div className="p-4 bg-gray-50 min-h-screen">
      <TopBar onRestaurantSelect={setSelectedRestaurant} />
      <MenuDisplay selectedRestaurant={selectedRestaurant} />
    </div>
  );
}

export default POSBilling;