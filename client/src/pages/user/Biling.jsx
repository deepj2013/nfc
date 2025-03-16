import React, { useState, useEffect } from "react";
import Button from "../../components/common/Button";
import Input from "../../components/common/Input";
import {
  getAllRestaurantDetail,
  getTablesByRestaurant,
  getRestaurantMenuServices,
} from "../../services/facilytRestaurantTableServices";
import { FaPlus, FaSearch } from "react-icons/fa";

const POSBilling = () => {
  const [selectedRestaurant, setSelectedRestaurant] = useState("");
  const [selectedTable, setSelectedTable] = useState("");
  const [memberId, setMemberId] = useState("");
  const [walletBalance, setWalletBalance] = useState(null);
  const [menuItems, setMenuItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [orderItems, setOrderItems] = useState([]);
  const [invoiceData, setInvoiceData] = useState(null);
  const [restaurants, setRestaurants] = useState([]);
  const [tables, setTables] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [customNotes, setCustomNotes] = useState("");
  const [viewType, setViewType] = useState("table"); // Default to Table-wise view
  const [ongoingBills, setOngoingBills] = useState([]); // Default to empty array
  const [showTableView, setShowTableView] = useState(false); // Default to hidden
  const [showItemWiseView, setShowItemWiseView] = useState(false);
  const [searchQuery, setSearchQuery] = useState("")
 
  const calculateTotalBill = (tableId) => {
    const bill = ongoingBills.find((bill) => bill.table === tableId);
    return bill ? bill.totalAmount : 0;
  };
  useEffect(() => {
    fetchRestaurants();
  }, []);
  // Mock fetching ongoing bills for the selected restaurant
  useEffect(() => {
    if (selectedRestaurant) {
      setOngoingBills([
        { table: "Table 1", memberId: "M123", totalAmount: 450 },
        { table: "Table 2", memberId: "M456", totalAmount: 1200 },
      ]); // Mock data; replace with API call later
    }
  }, [selectedRestaurant]); // ✅ Depend only on `selectedRestaurant`
  const calculateSubtotal = (orderItems) => {
    if (!orderItems || orderItems.length === 0) return 0; // ✅ Prevents errors if empty
    return orderItems.reduce((sum, item) => sum + item.totalPrice, 0);
  };

  const calculateOccupiedTime = (startTime) => {
    if (!startTime) return "N/A"; // If no start time, return N/A
    const start = new Date(startTime);
    const now = new Date();
    const diff = Math.floor((now - start) / 1000); // Difference in seconds

    const hours = Math.floor(diff / 3600);
    const minutes = Math.floor((diff % 3600) / 60);
    const seconds = diff % 60;

    return `${hours}h ${minutes}m ${seconds}s`;
  };
  const calculateTax = (orderItems) => {
    if (!orderItems || orderItems.length === 0) return 0;
    const taxRate = 0.05; // 5% tax
    return calculateSubtotal(orderItems) * taxRate;
  };

  const calculateTotal = (orderItems) => {
    return calculateSubtotal(orderItems) + calculateTax(orderItems);
  };

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
        setMenuItems([]); // Fallback to empty array if API response is incorrect
      }
    } catch (error) {
      console.error("Failed to fetch tables or menu", error);
      setMenuItems([]); // Ensure menuItems is always an array
    }
  };

  const handleMemberVerification = async () => {
    // Mock API Call for Member Verification
    const mockWalletBalance = Math.floor(Math.random() * 5000);
    setWalletBalance(mockWalletBalance);
  };

  const handleAddItem = (item) => {
    setOrderItems([...orderItems, item]);
  };

  const handlePrintInvoice = () => {
    setInvoiceData({
      table: selectedTable,
      memberId,
      orderItems,
    });
  };
  const addToInvoice = () => {
    if (!selectedItem) return;

    const newItem = {
      ...selectedItem,
      quantity,
      customNotes,
      totalPrice:
        quantity *
        (selectedItem.price_info[0].is_offer
          ? selectedItem.price_info[0].offer_price
          : selectedItem.price_info[0].price),
    };

    setOrderItems([...orderItems, newItem]);
    setShowModal(false);
  };
  const openModal = (item) => {
    setSelectedItem(item);
    setQuantity(1);
    setCustomNotes("");
    setShowModal(true);
  };

  return (
    <div className="p-1 bg-gray-100 min-h-screen">
      <div className="flex items-center justify-between bg-white p-2 rounded-lg shadow-md  border">
        <div className="flex flex-col">
          <label className="text-gray-700 font-semibold">
            Select Restaurant
          </label>
          <select
            className="p-2 border rounded-md w-52"
            onChange={(e) => handleRestaurantSelect(e.target.value)}
          >
            <option value="">Select Restaurant</option>
            {restaurants.map((restaurant) => (
              <option key={restaurant._id} value={restaurant.restaurant_id}>
                {restaurant.name}
              </option>
            ))}
          </select>
        </div>
        <div className="flex flex-col">
          <label className="text-gray-700 font-semibold">Select Table</label>
          <select
            className="p-2 border rounded-md w-52"
            onChange={(e) => setSelectedTable(e.target.value)}
          >
            <option value="">Select Table</option>
            {tables.map((table) => (
              <option key={table.table_id} value={table.table_id}>
                {table.tableNumber}
              </option>
            ))}
          </select>
        </div>

        <div className="flex flex-col">
          <label htmlFor="memberId">Member ID</label>
          <div className="flex items-center gap-1">
            <Input
              type="text"
              className="w-40"
              value={memberId}
              onChange={(e) => setMemberId(e.target.value)}
            />
            <Button
              name="Verify"
              onClick={handleMemberVerification}
              className="bg-blue-500 text-white px-1 py-2 rounded-md"
            />
          </div>
          {walletBalance !== null && (
            <p className="text-green-600 mt-1 text-sm">
              Wallet Balance: Rs. {walletBalance}
            </p>
          )}
        </div>
      </div>
      <div className="p-2 bg-gray-100 min-h-screen">
        <div className="flex flex-wrap items-center gap-4">
          <div className="p-6 bg-gray-100 min-h-screen">
            {/* Category Selection */}
            <div className="flex gap-4">
              {/* Left - Categories (15%) */}
              <div className="w-1/6 bg-white p-4 rounded-lg shadow-md h-screen overflow-y-auto">
                <h3 className="text-lg font-bold mb-3">Categories</h3>
                {categories.map((category) => (
                  <Button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    name={category}
                    className={`w-full mb-2 text-black ${
                      selectedCategory === category
                        ? "bg-blue-500 text-white"
                        : "bg-gray-100"
                    }`}
                  />
                ))}
              </div>

              {/* Center - Menu Items (65%) */}
              {/* Search Bar */}
<div className="relative mb-4">
  <FaSearch className="absolute left-3 top-3 text-gray-500" />
  <input
    type="text"
    className="w-full p-2 pl-10 border rounded-md"
    placeholder="Search menu..."
    value={searchQuery}
    onChange={(e) => setSearchQuery(e.target.value)}
  />
</div>

{/* Menu Items Grid */}
<div className="grid grid-cols-3 gap-4 p-4 border rounded-lg shadow-md bg-white">
                {menuItems
                  .filter(
                    (item) =>
                      !selectedCategory || item.category === selectedCategory
                  )
                  .map((item, index) => (
                    <div
                      key={index}
                      className="bg-white p-4 rounded-lg shadow-md text-center cursor-pointer hover:scale-105 transition"
                      onClick={() => openModal(item)}
                    >
                      <img
                        src={item.images[0]}
                        alt={item.name}
                        className="w-full h-32 object-cover rounded-md"
                      />
                      <h4 className="text-lg font-semibold mt-2">
                        {item.name}
                      </h4>
                      <p className="text-gray-600 text-sm">
                        {item.description}
                      </p>
                      <p className="font-bold text-green-600">
                        {item.price_info[0].is_offer
                          ? `Rs. ${item.price_info[0].offer_price}`
                          : `Rs. ${item.price_info[0].price}`}
                      </p>
                      <button
  onClick={() => openModal(item)}
  className="bg-blue-500 text-white p-2 rounded-full mt-2"
>
  <FaPlus />
</button>
                    </div>
                  ))}
              </div>

              {/* Right - Ongoing Bills (20%) */}
              <div className="w-1/5 bg-white p-4 rounded-lg shadow-md h-screen overflow-y-auto">
                <h3 className="text-lg font-bold mb-3">Ongoing Bills</h3>
                <Button
                  onClick={() => setShowTableView(true)} // Toggle visibility
                  className="bg-gray-700 text-white px-4 py-2 rounded-md flex items-center gap-2"
                  rigntIcon={<i className="ri-eye-line"></i>} // Pass the icon separately
                  name="Table View" // Pass text as a string
                />

                <Button
                  onClick={() => setShowItemWiseView(true)}
                  className="bg-gray-700 text-white px-4 py-2 rounded-md flex items-center gap-2"
                  rigntIcon={<i className="ri-file-list-line"></i>}
                  name="Item Wise View"
                />

                <div className="flex justify-between mb-3 border-b pb-2">
                  <button
                    onClick={() => setViewType("table")} // Update state correctly
                    className={`p-2 w-1/2 ${
                      viewType === "table"
                        ? "border-b-2 border-blue-500 font-bold"
                        : ""
                    }`}
                  >
                    Table-wise
                  </button>
                  <button
                    onClick={() => setViewType("member")} // Update state correctly
                    className={`p-2 w-1/2 ${
                      viewType === "member"
                        ? "border-b-2 border-blue-500 font-bold"
                        : ""
                    }`}
                  >
                    Member-wise
                  </button>
                </div>

                {viewType === "table" ? (
                  <div>
                    {ongoingBills.length > 0 ? (
                      viewType === "table" ? (
                        <div>
                          {ongoingBills
                            .filter((bill) => bill.table === selectedTable)
                            .map((bill, index) => (
                              <div
                                key={index}
                                className="bg-gray-100 p-2 mb-2 rounded-md"
                              >
                                <p className="font-semibold">
                                  Table {bill.table}
                                </p>
                                <p className="text-sm text-gray-600">
                                  Total: Rs. {bill.totalAmount}
                                </p>
                              </div>
                            ))}
                        </div>
                      ) : (
                        <div>
                          {ongoingBills
                            .filter((bill) => bill.memberId === memberId)
                            .map((bill, index) => (
                              <div
                                key={index}
                                className="bg-gray-100 p-2 mb-2 rounded-md"
                              >
                                <p className="font-semibold">
                                  Member {bill.memberId}
                                </p>
                                <p className="text-sm text-gray-600">
                                  Total: Rs. {bill.totalAmount}
                                </p>
                              </div>
                            ))}
                        </div>
                      )
                    ) : (
                      <p className="text-gray-600">No ongoing bills</p>
                    )}
                  </div>
                ) : (
                  <div>
                    {ongoingBills
                      .filter((bill) => bill.memberId === memberId)
                      .map((bill, index) => (
                        <div
                          key={index}
                          className="bg-gray-100 p-2 mb-2 rounded-md"
                        >
                          <p className="font-semibold">
                            Member {bill.memberId}
                          </p>
                          <p className="text-sm text-gray-600">
                            Total: Rs. {bill.totalAmount}
                          </p>
                        </div>
                      ))}
                  </div>
                )}
              </div>
            </div>
            {/* Modal for Quantity and Customization */}
            {showTableView && (
              <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
                  <h3 className="text-xl font-bold">
                    Table {selectedTable} Details
                  </h3>
                  <p className="text-gray-600">
                    Occupied for: {calculateOccupiedTime(selectedTable)}
                  </p>
                  <p className="font-bold text-green-600">
                    Total Bill: Rs. {calculateTotalBill(selectedTable)}
                  </p>
                  <Button
                    name="Close"
                    onClick={() => setShowTableView(false)}
                  />
                </div>
              </div>
            )}
            {showModal && (
              <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
                <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
                  <h3 className="text-xl font-bold">{selectedItem.name}</h3>
                  <p>{selectedItem.description}</p>
                  <p className="font-bold text-green-600">
                    Price:{" "}
                    {selectedItem.price_info[0].is_offer
                      ? `Rs. ${selectedItem.price_info[0].offer_price}`
                      : `Rs. ${selectedItem.price_info[0].price}`}
                  </p>
                  <label className="block mt-4">Quantity:</label>
                  <input
                    type="number"
                    min="1"
                    value={quantity}
                    onChange={(e) =>
                      setQuantity(Math.max(1, parseInt(e.target.value) || 1))
                    }
                    className="border p-2 rounded w-full"
                  />
                  <label className="block mt-4">Customization:</label>
                  <textarea
                    value={customNotes}
                    onChange={(e) => setCustomNotes(e.target.value)}
                    className="border p-2 rounded w-full"
                  />
                  <div className="flex justify-end gap-4 mt-4">
                    <Button name="Cancel" onClick={() => setShowModal(false)} />
                    <Button name="Add to Order" onClick={addToInvoice} />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      <div className="mt-6 p-4 bg-white rounded-lg shadow-md">
        <h3 className="text-xl font-semibold border-b pb-2 mb-4">
          Order Summary
        </h3>
        {orderItems.length > 0 ? (
          <table className="w-full text-left">
            <thead>
              <thead className="bg-gray-200">
                <tr className="border-b text-left">
                  <th className="p-3">Item</th>
                  <th className="p-3 text-center">Qty</th>
                  <th className="p-3 text-right">Price</th>
                  <th className="p-3 text-right">Total</th>
                </tr>
              </thead>
            </thead>
            <tbody>
              {orderItems.map((item, index) => (
                <tr key={index} className="border-b">
                  <td className="p-2">{item.name}</td>
                  <td className="p-2">{item.quantity}</td>
                  <td className="p-2">
                    Rs.{" "}
                    {item.price_info[0].is_offer
                      ? item.price_info[0].offer_price
                      : item.price_info[0].price}
                  </td>
                  <td className="p-2">Rs. {item.totalPrice}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-gray-600">No items added</p>
        )}
      </div>
      <div className="mt-4 p-4 border-t">
        <p className="flex justify-between text-lg">
          <span>Subtotal:</span>{" "}
          <span>Rs. {calculateSubtotal(orderItems)}</span>
        </p>
        <p className="flex justify-between text-lg">
          <span>Tax (5%):</span> <span>Rs. {calculateTax(orderItems)}</span>
        </p>
        <p className="flex justify-between text-xl font-bold mt-2">
          <span>Net Payable:</span>{" "}
          <span>Rs. {calculateTotal(orderItems)}</span>
        </p>
      </div>
      <Button
        onClick={handlePrintInvoice}
        className="bg-green-600 text-white px-6 py-3 mt-4 rounded-md w-full hover:bg-green-700 transition-all"
        rigntIcon={<i className="ri-printer-line"></i>} // Icon for printing invoice
        name="Print Invoice"
      ></Button>
      {invoiceData && (
        <div className="mt-4 p-4 border rounded shadow-md bg-white">
          <h3 className="text-xl font-bold">Invoice</h3>
          <p>Table: {invoiceData.table}</p>
          <p>Member ID: {invoiceData.memberId}</p>
          <p>Items:</p>
          {invoiceData.orderItems.map((item, index) => (
            <p key={index}>
              {item.name} - Rs. {item.price}
            </p>
          ))}
        </div>
      )}
    </div>
  );
};

export default POSBilling;
