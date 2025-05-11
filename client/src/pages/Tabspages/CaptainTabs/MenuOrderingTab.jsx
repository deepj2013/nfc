import React, { useEffect, useState } from "react";
import { getRestaurantMenuServices } from "../../../services/facilytRestaurantTableServices";
import { toast } from "react-toastify";

const MenuOrderTab = ({ selectedRestaurant, onCartUpdate }) => {
  const [menuItems, setMenuItems] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [cart, setCart] = useState([]);

  useEffect(() => {
    if (selectedRestaurant) {
      fetchMenus(selectedRestaurant);
    }
  }, [selectedRestaurant]);

  const fetchMenus = async (restaurantId) => {
    try {
      const res = await getRestaurantMenuServices(restaurantId);
      const items = res.data.menuItems || [];
      setMenuItems(items);
      setCategories([...new Set(items.map((item) => item.category))]);
    } catch (err) {
      toast.error("Failed to fetch menus");
    }
  };

  const handleAdd = (item) => {
    const existing = cart.find((i) => i._id === item._id);
    const priceInfo = item.price_info[0];
    const price = priceInfo.is_offer ? priceInfo.offer_price : priceInfo.price;

    if (existing) {
      const updatedCart = cart.map((i) =>
        i._id === item._id ? { ...i, quantity: i.quantity + 1 } : i
      );
      setCart(updatedCart);
    } else {
      setCart([...cart, { ...item, quantity: 1, price }]);
    }
  };

  const handleRemove = (item) => {
    const existing = cart.find((i) => i._id === item._id);
    if (!existing) return;

    if (existing.quantity === 1) {
      setCart(cart.filter((i) => i._id !== item._id));
    } else {
      const updatedCart = cart.map((i) =>
        i._id === item._id ? { ...i, quantity: i.quantity - 1 } : i
      );
      setCart(updatedCart);
    }
  };

  useEffect(() => {
    onCartUpdate(cart);
  }, [cart]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-5 gap-4">
      {/* Category Tabs */}
      <div className="col-span-1 bg-white p-4 rounded shadow h-fit">
        <h3 className="font-semibold text-gray-700 mb-2">Categories</h3>
        <div className="space-y-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`block w-full px-3 py-2 text-left rounded ${
                selectedCategory === cat
                  ? "bg-blue-600 text-white"
                  : "bg-gray-100 text-gray-800"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Menu + Cart */}
      <div className="col-span-4 grid grid-cols-1 xl:grid-cols-3 gap-4">
        {/* Menu Grid */}
        <div className="col-span-2">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {menuItems
              .filter((item) => item.category === selectedCategory)
              .map((item) => {
                const priceInfo = item.price_info[0];
                const price = priceInfo.is_offer
                  ? priceInfo.offer_price
                  : priceInfo.price;
                const cartItem = cart.find((i) => i._id === item._id);
                return (
                  <div
                    key={item._id}
                    className="border p-3 bg-white rounded shadow text-center"
                  >
                    <img
                      src={item.images[0]}
                      alt={item.name}
                      className="w-full h-32 object-cover rounded"
                    />
                    <h4 className="font-semibold mt-2">{item.name}</h4>
                    <p className="text-sm text-gray-500">₹{price}</p>
                    <div className="mt-2 flex items-center justify-center gap-2">
                      <button
                        onClick={() => handleRemove(item)}
                        className="px-2 py-1 bg-gray-300 rounded text-black text-sm"
                      >
                        -
                      </button>
                      <span className="text-sm font-semibold">
                        {cartItem?.quantity || 0}
                      </span>
                      <button
                        onClick={() => handleAdd(item)}
                        className="px-2 py-1 bg-green-500 text-white rounded text-sm"
                      >
                        +
                      </button>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>

        {/* Cart Summary */}
        <div className="bg-white p-4 rounded shadow h-fit">
          <h4 className="font-semibold text-lg mb-2">Selected Items</h4>
          {cart.length > 0 ? (
            <ul className="text-sm space-y-1">
              {cart.map((item) => (
                <li key={item._id}>
                  {item.name} × {item.quantity} = ₹{item.price * item.quantity}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 text-sm">No items selected.</p>
          )}
          <div className="mt-3 font-bold text-right">
            Total: ₹
            {cart.reduce((sum, item) => sum + item.price * item.quantity, 0)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenuOrderTab;