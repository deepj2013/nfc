import React, { useState, useEffect } from "react";
import { getMemberService } from "../../redux/thunk/useMangementServices";
import { useDispatch } from "react-redux";
import {
  getAllRestaurantDetail,
  getTablesByRestaurant,
  getRestaurantMenuServices,
} from "../../services/facilytRestaurantTableServices";

const TopBar = () => {
  const dispatch = useDispatch();
  const [memberID, setMemberID] = useState("");
  const [memberName, setMemberName] = useState("");
  const [walletBalance, setWalletBalance] = useState("");
  const [memberImage, setMemberImage] = useState(
    "https://static.vecteezy.com/system/resources/thumbnails/036/594/092/small_2x/man-empty-avatar-photo-placeholder-for-social-networks-resumes-forums-and-dating-sites-male-and-female-no-photo-images-for-unfilled-user-profile-free-vector.jpg"
  );
  const [restaurants, setRestaurants] = useState([]);
  const [selectedRestaurant, setSelectedRestaurant] = useState("");
  const [tables, setTables] = useState([]);
  const [menuItems, setMenuItems] = useState([]);
  const [filteredMenu, setFilteredMenu] = useState([]);
  const [selectedItems, setSelectedItems] = useState([]);
  const [tableStatus, setTableStatus] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

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

  const handleRestaurantSelect = async (restaurantId) => {
    if (selectedRestaurant !== restaurantId) {
      setSelectedRestaurant(restaurantId);
    }
    try {
      const tableData = await getTablesByRestaurant(restaurantId);
      setTables(tableData);

      const menuData = await getRestaurantMenuServices(restaurantId);
      let MenusData = menuData?.data.menuItems;

      if (Array.isArray(MenusData)) {
        setMenuItems(MenusData);
        setCategories([...new Set(MenusData.map((item) => item.category))]);
        
      } else {
        setMenuItems([]); // Ensure menuItems is always an array
      }
    } catch (error) {
      console.error("Failed to fetch tables or menu", error);
      setMenuItems([]); // Ensure menuItems is always an array
    }
  };

  const handleOrderClick = async () => {
    try {
        const menuData = await getRestaurantMenuServices(selectedRestaurant);
        const tables = await getTablesByRestaurant(selectedRestaurant);

        let menuList = menuData?.data.menuItems || [];
        setMenuItems(menuList);
        setFilteredMenu(menuList); // Set for search filtering
        setTableStatus(tables); // Store table status data
    } catch (error) {
        console.error("Failed to fetch menu & table status", error);
    }
};

const handleSearch = (e) => {
  const query = e.target.value;
  setSearchQuery(query);

  if (query.trim() === "") {
      setFilteredMenu(menuItems); // Reset filter if empty
  } else {
      const regex = new RegExp(query, "i");
      setFilteredMenu(menuItems.filter(item => regex.test(item.name)));
  }
};


const handleAddItem = (item) => {
  setSelectedItems(prev => {
      const existing = prev.find(i => i._id === item._id);
      if (existing) {
          return prev.map(i =>
              i._id === item._id ? { ...i, qty: i.qty + 1 } : i
          );
      }
      return [...prev, { ...item, qty: 1, additionalInfo: "" }];
  });
};

// Handle additional input for items
const handleAdditionalInput = (id, value) => {
  setSelectedItems(prev =>
      prev.map(i => (i._id === id ? { ...i, additionalInfo: value } : i))
  );
};

  const fetchMemberDetails = async () => {
    try {
      let memberNumber = memberID;
      const response = await dispatch(getMemberService(memberNumber)).unwrap();

      if (response?.msg === "Member details fetched successfully") {
        const data = response.result;

        // Construct Full Name
        const fullName = `${data?.title || ""} ${data?.firstName || ""} ${
          data?.middleName || ""
        } ${data?.surname || ""}`.trim();

        // Set State with Response Data
        setMemberName(fullName);
        setWalletBalance(data?.balance || 0);
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
    <div className="p-2 bg-gray-100 shadow-md rounded-lg w-full">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-2 bg-white p-3 rounded-lg shadow-lg text-xs">
        <div className="col-span-2 flex items-center">
          {/* Picture Box - Reduced to 10% */}
          <div className="border border-gray-400 w-25 h-30 flex items-center justify-center text-xs text-gray-500 bg-gray-100 rounded mr-2">
            <img
              src={memberImage}
              alt="Member"
              className="w-full h-full object-cover rounded"
            />
          </div>

          {/* Input Fields - Adjusted to 30% */}
          <div className="w-full">
            {/* Heading for Member Details */}
            <h4 className="text-sm font-semibold text-gray-700 justification-center mb-2">
              Find Member Details
            </h4>

            <div className="flex items-center mb-1">
              <label className="w-1/4 text-xs font-medium">Mem No</label>
              <input
                type="text"
                className="border p-1 w-1/3 rounded text-xs"
                placeholder="Enter Member No"
                value={memberID}
                onChange={(e) => setMemberID(e.target.value)}
              />
              <button
                className="ml-2 bg-blue-500 text-white px-2 py-1 rounded text-xs"
                onClick={fetchMemberDetails}
              >
                Fetch
              </button>
            </div>
            <div className="flex items-center mb-1">
              <label className="w-1/4 text-xs font-medium">Name</label>
              <input
                type="text"
                className="border p-1 w-1/3 rounded text-xs bg-gray-200"
                disabled
                value={memberName}
              />
            </div>
            <div className="flex items-center">
              <label className="w-1/4 text-xs font-medium">Balance</label>
              <input
                type="text"
                className="border p-1 w-1/3 rounded text-xs bg-gray-200"
                disabled
                value={`₹ ${walletBalance}`}
              />
            </div>
          </div>
        </div>

        {/* Middle Section - Discounts & Coupons (25%) */}
        <div className="col-span-1">
          <h2 className="text-sm font-semibold">Discounts & Coupons</h2>
          <div className="mt-1 flex items-center text-xs">
            <input type="checkbox" className="mr-2" /> BirthDay Discount
          </div>
          <div className="mt-1 flex flex-wrap gap-1 text-xs">
            <label className="flex items-center">
              <input type="checkbox" className="mr-1" /> Comp
            </label>
            <label className="flex items-center text-purple-700">
              <input type="checkbox" className="mr-1" /> Party
            </label>
            <label className="flex items-center">
              <input type="checkbox" className="mr-1" /> Coupon
            </label>
          </div>
          <div className="mt-1">
            <label className="block text-xs font-medium">Coupon Type</label>
            <select className="border p-1 w-full rounded text-xs">
              <option value="">--Select--</option>
            </select>
          </div>
          <div className="mt-1">
            <input type="checkbox" className="mr-2" /> Delivery Discount
          </div>
        </div>

        {/* Right Section - Order & Billing (25%) */}
        <div className="col-span-1">
          <h2 className="text-sm font-semibold">Order & Billing</h2>

          {/* Restaurant Selection */}
          <div className="mt-2">
            <label className="block text-xs font-medium">
              Select Restaurant
            </label>
            <select
              className="border p-1 w-full rounded text-xs"
              value={selectedRestaurant}
              onChange={(e) => handleRestaurantSelect(e.target.value)}
            >
              <option value="">--Select Restaurant--</option>
              {restaurants.map((restaurant) => (
                <option key={restaurant.restaurant_id} value={restaurant.restaurant_id}>
                  {restaurant.name}
                </option>
              ))}
            </select>
          </div>

          {/* Table Selection (Depends on Selected Restaurant) */}
          <div className="mt-2">
            <label className="block text-xs font-medium">Table Name</label>
            <select className="border p-1 w-full rounded text-xs">
              <option value="">--Select Table--</option>
              {tables.map((table) => (
                <option key={table.table_id} value={table.table_id}>
                  {table.table_id}
                </option>
              ))}
            </select>
          </div>

          {/* Order Processing Options */}
          <div className="mt-1 flex flex-wrap gap-1 text-xs">
            <label className="flex items-center">
              <input type="radio" name="orderProcess" className="mr-1" /> Order
            </label>
            <label className="flex items-center">
              <input type="radio" name="orderProcess" className="mr-1" />{" "}
              Billing
            </label>
            <label className="flex items-center">
              <input type="radio" name="orderProcess" className="mr-1" />{" "}
              Settlement
            </label>
          </div>

          {/* Remark Section */}
          <div className="mt-1">
            <label className="block text-xs font-medium">Remark</label>
            <input
              type="text"
              className="border p-1 w-full rounded text-xs"
              placeholder="Enter Remark"
            />
          </div>
        </div>
      </div>
      <div className="col-span-2 mt-4">
    <h2 className="text-sm font-semibold">Menu & Order Selection</h2>

    {/* Search Input */}
    <input
        type="text"
        className="border p-2 w-full rounded text-xs mt-2"
        placeholder="Search Menu..."
        value={searchQuery}
        onChange={handleSearch}
    />

    {/* Table Status */}
    <div className="mt-2">
        <h3 className="text-xs font-medium">Table Status</h3>
        <ul className="text-xs">
            {tableStatus.map((table, index) => (
                <li key={index} className={table.isOccupied ? "text-red-600" : "text-green-600"}>
                    {table.name}
                </li>
            ))}
        </ul>
    </div>

    {/* Menu Items List */}
    <div className="grid grid-cols-3 gap-2 mt-3">
        {filteredMenu.map(item => (
            <button
                key={item._id}
                className="bg-purple-600 text-white p-2 rounded text-xs hover:bg-purple-700"
                onClick={() => handleAddItem(item)}
            >
                {item.name} - ₹{item.price}
            </button>
        ))}
    </div>

    {/* Selected Items List */}
    <div className="mt-4">
        <h3 className="text-xs font-medium">Selected Items</h3>
        {selectedItems.map(item => (
            <div key={item._id} className="flex items-center justify-between border p-2 rounded mt-2">
                <span className="text-xs">{item.name}</span>
                <input
                    type="number"
                    className="border p-1 w-12 text-xs rounded"
                    value={item.qty}
                    min="1"
                    onChange={(e) => handleAddItem({ ...item, qty: parseInt(e.target.value) })}
                />
                <input
                    type="text"
                    className="border p-1 w-32 text-xs rounded"
                    placeholder="Additional Notes"
                    value={item.additionalInfo}
                    onChange={(e) => handleAdditionalInput(item._id, e.target.value)}
                />
            </div>
        ))}
    </div>
</div>
    </div>



  );
};

function POSBilling() {
  return (
    <div className="p-2">
      <TopBar />
    </div>
  );
}

export default POSBilling;
