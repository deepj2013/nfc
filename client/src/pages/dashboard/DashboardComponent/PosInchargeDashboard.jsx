import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import {
  getAllRestaurantDetail,
  getTablesByRestaurant,
  getRestaurantMenuServices,
} from "../../../services/facilytRestaurantTableServices";
import { getMemberService } from "../../../redux/thunk/useMangementServices";
import {
  createBill,
  placeOrder,
  getAllOrders,
  getSettledBills,
} from "../../../services/posApiServices";

import CurrentOrders from "../../user/CurrentOrders";
import SettledBills from "../../user/SettledBills";
import OrderForm from "../../user/OrderForm";
import PaymentModal from "../../user/PaymentModal";

const POSInchargeDashboard = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [restaurants, setRestaurants] = useState([]);
  const [tables, setTables] = useState([]);
  const [menuItems, setMenuItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  const [selectedRestaurant, setSelectedRestaurant] = useState("");
  const [selectedTable, setSelectedTable] = useState("");
  const [memberId, setMemberId] = useState("");
  const [walletBalance, setWalletBalance] = useState(null);
  const [memberName, setMemberName] = useState("");

  const [cartItems, setCartItems] = useState([]);
  const [currentOrders, setCurrentOrders] = useState([]);
  const [settledBills, setSettledBills] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [billId, setBillId] = useState(null);

  const calculateTotal = (items) =>
    items.reduce((total, item) => total + item.price * item.quantity, 0);

  useEffect(() => {
    fetchRestaurants();
    fetchOrdersAndBills();
  }, []);

  const fetchRestaurants = async () => {
    try {
      const data = await getAllRestaurantDetail();
      setRestaurants(data);
    } catch (err) {
      toast.error("Failed to fetch restaurants.");
    }
  };

  const fetchOrdersAndBills = async () => {
    try {
      const ordersRes = await getAllOrders();
      const billsRes = await getSettledBills();

      setCurrentOrders(ordersRes.data);
      setSettledBills(billsRes.data);
    } catch (err) {
      toast.error("Failed to fetch orders or bills.");
    }
  };

  const handleRestaurantSelect = async (restaurantId) => {
    setSelectedRestaurant(restaurantId);
    try {
      const tableData = await getTablesByRestaurant(restaurantId);
      setTables(tableData);

      const menuData = await getRestaurantMenuServices(restaurantId);
      const MenusData = menuData?.data.menuItems || [];
      setMenuItems(MenusData);
      setCategories([...new Set(MenusData.map((item) => item.category))]);
    } catch (err) {
      toast.error("Failed to load tables or menu.");
    }
  };

  const handleMemberVerification = async () => {
    try {
      const response = await dispatch(getMemberService(memberId)).unwrap();
      const data = response.result;
      const fullName = `${data.title || ""} ${data.firstName || ""} ${
        data.middleName || ""
      } ${data.surname || ""}`;
      setMemberName(fullName.trim());
      setWalletBalance(data.balance || 0);
    } catch (err) {
      toast.error("Member not found.");
    }
  };

  const handleAddToCart = (item) => {
    const existing = cartItems.find((i) => i._id === item._id);
    if (existing) {
      toast.info("Item already added.");
      return;
    }

    const priceData = item.price_info[0];
    const price = priceData.is_offer ? priceData.offer_price : priceData.price;

    const newItem = {
      ...item,
      quantity: 1,
      price,
    };

    setCartItems([...cartItems, newItem]);
  };

  const handlePlaceOrder = async () => {
    const payload = {
      tableId: selectedTable,
      restaurant_id: selectedRestaurant,
      memberId,
      items: cartItems,
      totalAmount: calculateTotal(cartItems),
      placedBy: "POS",
    };

    try {
      const response = await placeOrder(payload);
      const orderId = response.data.result._id;

      const billRes = await createBill({
        orderId,
        tableId: selectedTable,
        memberId,
        totalAmount: payload.totalAmount,
      });

      setBillId(billRes.data.result._id);
      toast.success("Order placed and bill generated!");
      navigate("/Billing");
    } catch (error) {
      toast.error(error.response?.data?.error || "Failed to place order.");
    }
  };

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">
        POS Incharge Dashboard
      </h1>

      {/* Restaurant / Table / Member Section */}
      <div className="grid grid-cols-4 gap-4 mb-6">
        <div>
          <label className="text-sm font-medium">Select Restaurant</label>
          <select
            className="w-full border p-2 rounded"
            value={selectedRestaurant}
            onChange={(e) => handleRestaurantSelect(e.target.value)}
          >
            <option value="">Select Restaurant</option>
            {restaurants.map((r) => (
              <option key={r.restaurant_id} value={r.restaurant_id}>
                {r.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="text-sm font-medium">Select Table</label>
          <select
            className="w-full border p-2 rounded"
            value={selectedTable}
            onChange={(e) => setSelectedTable(e.target.value)}
          >
            <option value="">Select Table</option>
            {tables.map((t) => (
              <option key={t.table_id} value={t.table_id}>
                {t.tableNumber}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="text-sm font-medium">Member ID</label>
          <input
            className="w-full border p-2 rounded"
            value={memberId}
            onChange={(e) => setMemberId(e.target.value)}
            placeholder="Enter Member ID"
          />
          <button
            onClick={handleMemberVerification}
            className="mt-2 w-full bg-blue-500 text-white px-3 py-1 rounded"
          >
            Verify
          </button>
        </div>
        {memberName && (
          <div className="bg-white p-3 rounded shadow">
            <p className="text-sm font-semibold">👤 {memberName}</p>
            <p className="text-green-600 text-sm">Wallet: ₹{walletBalance}</p>
          </div>
        )}
      </div>

      {/* Menu Items by Category */}
      {categories.length > 0 && (
        <div className="mb-4">
          <h3 className="text-lg font-semibold text-gray-700 mb-2">
            Menu Categories
          </h3>
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-3 py-1 rounded ${
                  selectedCategory === cat
                    ? "bg-blue-600 text-white"
                    : "bg-gray-200"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      )}

      {selectedCategory && (
        <div className="grid grid-cols-3 gap-4 mb-6">
          {menuItems
            .filter((item) => item.category === selectedCategory)
            .map((item) => (
              <div
                key={item._id}
                className="border p-3 rounded bg-white shadow text-center"
              >
                <img
                  src={item.images[0]}
                  alt={item.name}
                  className="w-full h-32 object-cover rounded"
                />
                <h4 className="font-semibold mt-2">{item.name}</h4>
                <p className="text-sm text-gray-500">
                  ₹
                  {item.price_info[0].is_offer
                    ? item.price_info[0].offer_price
                    : item.price_info[0].price}
                </p>
                <button
                  onClick={() => handleAddToCart(item)}
                  className="mt-2 bg-green-600 text-white px-3 py-1 rounded text-sm"
                >
                  Add to Cart
                </button>
              </div>
            ))}
        </div>
      )}

      {/* Cart Summary */}
      <div className="bg-white p-4 rounded shadow mb-6">
        <h3 className="text-lg font-semibold mb-2">Cart Items</h3>
        {cartItems.length > 0 ? (
          <ul>
            {cartItems.map((item, i) => (
              <li key={i} className="text-sm mb-1">
                {item.name} x {item.quantity} = ₹{item.price * item.quantity}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500 text-sm">No items in cart.</p>
        )}
        <div className="mt-3 text-right font-bold">
          Total: ₹{calculateTotal(cartItems)}
        </div>
      </div>

      {/* Place Order Button */}
      <div className="text-right">
        <button
          onClick={handlePlaceOrder}
          className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition"
        >
          Place Order
        </button>
      </div>

      {/* Order & Bill Sections */}
      <div className="grid grid-cols-3 gap-4 mt-6">
        <div className="col-span-2 bg-white p-4 shadow rounded-lg">
          <h2 className="text-lg font-semibold text-gray-700 mb-2">
            Current Orders
          </h2>
          <CurrentOrders
            orders={currentOrders}
            setSelectedOrder={setSelectedOrder}
          />
        </div>

        <div className="bg-white p-4 shadow rounded-lg">
          <h2 className="text-lg font-semibold text-gray-700 mb-2">
            Settled Bills
          </h2>
          <SettledBills bills={settledBills} />
        </div>
      </div>

      {selectedOrder && (
        <OrderForm
          order={selectedOrder}
          setShowPaymentModal={setShowPaymentModal}
        />
      )}
      {showPaymentModal && (
        <PaymentModal setShowPaymentModal={setShowPaymentModal} />
      )}
    </div>
  );
};

export default POSInchargeDashboard;