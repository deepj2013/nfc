import React, { useEffect, useState } from "react";
import ModalWrapper from "../../layout/ModalWrapper";
import { useDispatch } from "react-redux";
import {
  createRestaurantMenuServices,
  updateRestaurantMenuServices,
} from "../../redux/thunk/micellaneousServices";
import { logger, successToast } from "../../utils/Helper";
import { useParams } from "react-router-dom";

export default function MenuModal({
  isOpen,
  onClose,
  menuEdit,
  types,
  restaurantId,
}) {
  const dispatch = useDispatch();

  const CUISINES_DATA = [
    { label: "Italian", value: "Italian" },
    { label: "Chinese", value: "Chinese" },
    { label: "Thai", value: "Thai" },
    { label: "Indian", value: "Indian" },
    { label: "French", value: "French" },
    { label: "Japanese", value: "Japanese" },
    { label: "Mexican", value: "Mexican" },
  ];

  const FOOD_CATEGORIES = [
    "Appetizers",
    "Soups",
    "Salads",
    "Main Course",
    "Pasta",
    "Pizza",
    "Burgers",
    "Sandwiches",
    "Seafood",
    "Steaks",
    "BBQ",
    "Desserts",
    "Beverages",
    "Breakfast",
    "Brunch",
    "Vegan",
    "Gluten-Free",
    "Indian",
    "Chinese",
    "Mexican",
    "Italian",
    "Japanese",
    "French",
    "Mediterranean",
    "Fast Food",
    "Healthy",
    "Kosher",
    "Halal",
    "Dairy-Free",
    "Other",
  ];

  const FOOD_TYPES = [
    "Veg",
    "Non-Veg",
    "Vegan",
    "Gluten-Free",
    "Dairy-Free",
    "Kosher",
    "Halal",
    "Other",
  ];


  useEffect(() => {
    console.log("Editing Menu Data in Modal:", menuEdit);
    if (menuEdit && types === "edit") {
      setMenuData({
        menuId: menuEdit._id || "",  // ✅ Ensure menuId is set only for edit mode
        category: menuEdit.category || "",
        name: menuEdit.name || "",
        description: menuEdit.description || "",
        images: menuEdit.images || [],
        food_type: menuEdit.food_type || "",
        cuisines: menuEdit.cuisines || "",
        is_available: menuEdit.is_available ?? true,
        is_bestseller: menuEdit.is_bestseller ?? false,
        price_info: menuEdit.price_info.length
          ? menuEdit.price_info
          : [
              {
                price: "",
                offer_price: "",
                is_offer: false,
                tax_percentage: "",
                discount_percentage: "",
              },
            ],
        restaurantId: menuEdit.restaurantId || restaurantId,
        createdBy: menuEdit.createdBy || 1,
        updatedBy: menuEdit.updatedBy || 1,
      });
    } else {
      setMenuData({
        category: "",
        name: "",
        description: "",
        images: [],
        food_type: "",
        cuisines: "",
        is_available: true,
        is_bestseller: false,
        price_info: [
          {
            price: "",
            offer_price: "",
            is_offer: false,
            tax_percentage: "",
            discount_percentage: "",
          },
        ],
        restaurantId,
        createdBy: 1,
        updatedBy: 1,
      });
    }
  }, [menuEdit, types, isOpen]); // ✅ Correct Dependencies
  console.log(menuEdit)
  const [menuData, setMenuData] = useState({
    menuId: menuEdit._id,
    category: "",
    name: "",
    description: "",
    images: [],
    food_type: "",
    cuisines: "",
    is_available: true,
    is_bestseller: false,
    price_info: [
      {
        price: "",
        offer_price: "",
        is_offer: false,
        tax_percentage: "",
        discount_percentage: "",
      },
    ],
    restaurantId,
    createdBy: 1,
    updatedBy: 1,
  });
  // Handle Input Change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setMenuData((prev) => ({
      ...prev,
      [name]: value, // Updates cuisine in state
    }));
  };
  // State for New Image URL Input
  const [newImageUrl, setNewImageUrl] = useState("");

  // Function to Add Image URL
  const addImage = () => {
    if (newImageUrl.trim() !== "") {
      setMenuData((prev) => ({
        ...prev,
        images: [...prev.images, newImageUrl], // ✅ Store only the string URL
      }));
      setNewImageUrl(""); // Clear input after adding
    }
  };

  // Function to Remove an Image
  const removeImage = (index) => {
    setMenuData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  // Function to Update Image Detail
  const updateImageDetail = (index, value) => {
    setMenuData((prev) => {
      const updatedImages = [...prev.images];
      updatedImages[index].detail = value;
      return { ...prev, images: updatedImages };
    });
  };

  // Handle Price Input Change
  const handlePriceChange = (index, field, value) => {
    setMenuData((prev) => {
      const updatedPriceInfo = [...prev.price_info];
      updatedPriceInfo[index] = {
        ...updatedPriceInfo[index],
        [field]: Number(value), // ✅ Convert to Number
      };

      // ✅ Auto-calculate discount percentage
      const price = updatedPriceInfo[index].price;
      const offer_price = updatedPriceInfo[index].offer_price;

      if (price > 0 && offer_price > 0 && offer_price < price) {
        updatedPriceInfo[index].discount_percentage = Math.round(
          ((price - offer_price) / price) * 100
        );
      } else {
        updatedPriceInfo[index].discount_percentage = 0; // Reset if invalid
      }

      return { ...prev, price_info: updatedPriceInfo };
    });
  };

  // Handle Toggle Change
  const handleToggleChange = (field) => {
    setMenuData((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  // Handle Submit (Add or Update)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const menuPayload = {
        ...menuData,
        menuId: types === "edit" ? menuData.menuId : undefined, // ✅ Only pass menuId for updates
        images: menuData.images.map((img) => img.trim()), // ✅ Ensure strings
      };
  
      if (types === "edit") {
        console.log("Submitting Updated Menu Data:", menuPayload);
        await dispatch(updateRestaurantMenuServices({ menuPayload })).unwrap();
        successToast("Menu updated successfully!");
      } else {
        console.log("Submitting New Menu Data:", menuPayload);
        await dispatch(createRestaurantMenuServices(menuPayload)).unwrap();
        successToast("Menu added successfully!");
      }
      onClose();
    } catch (error) {
      logger(error);
    }
  };

  return (
    <ModalWrapper isOpen={isOpen} onClose={onClose}>
      <div className="w-full max-w-3xl bg-white p-6 rounded-lg shadow-lg mx-auto my-10 flex flex-col h-[90vh]">
        <h2 className="text-xl font-bold mb-4">
          {types === "edit" ? "Edit Menu" : "Add New Menu"}
        </h2>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-4 overflow-y-auto h-[80vh]"
        >
          {/* Category */}
          <label className="block text-gray-700 text-sm font-bold">
            Category
          </label>
          <select
            name="category"
            value={menuData.category}
            onChange={handleInputChange}
            className="border rounded w-full p-2"
          >
            <option value="">Select Category</option>
            {FOOD_CATEGORIES.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>

          {/* Menu Name */}
          <label className="block text-gray-700 text-sm font-bold">
            Menu Name
          </label>
          <input
            type="text"
            name="name"
            value={menuData.name}
            onChange={handleInputChange}
            className="border rounded w-full p-2"
            placeholder="Enter menu name"
          />

          {/* Food Type */}
          <label className="block text-gray-700 text-sm font-bold">
            Food Type
          </label>
          <select
            name="food_type"
            value={menuData.food_type}
            onChange={handleInputChange}
            className="border rounded w-full p-2"
          >
            <option value="">Select Food Type</option>
            {FOOD_TYPES.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
          {/* Cuisine Selection Dropdown */}
          <label className="block text-gray-700 text-sm font-bold">
            Cuisine
          </label>
          <select
            name="cuisines"
            value={menuData.cuisines}
            onChange={handleInputChange}
            className="border rounded w-full p-2"
          >
            <option value="" disabled>
              Select Cuisine
            </option>
            {CUISINES_DATA.map((cuisine) => (
              <option key={cuisine.value} value={cuisine.value}>
                {cuisine.label}
              </option>
            ))}
          </select>

          {/* Description */}
          <label className="block text-gray-700 text-sm font-bold">
            Description
          </label>
          <input
            name="description"
            value={menuData.description}
            onChange={handleInputChange}
            className="border rounded w-full p-2"
            placeholder="Describe the dish"
          />

          {/* Image Upload & URL Input */}
          <label className="block text-gray-700 text-sm font-bold">
            Upload Images (or Paste URL)
          </label>

          {/* Add Image URL */}
          <div className="flex items-center gap-2 mb-2">
            <input
              type="text"
              placeholder="Paste Image URL"
              value={newImageUrl}
              onChange={(e) => setNewImageUrl(e.target.value)}
              className="border p-2 rounded w-full"
            />
            <button
              type="button"
              onClick={addImage}
              className="bg-green-500 text-white px-3 py-2 rounded"
            >
              ➕
            </button>
          </div>

          {/* Image Previews */}
          <div className="grid grid-cols-3 gap-2 mt-2">
            {menuData.images.length > 0 ? (
              menuData.images.map((image, index) => (
                <div key={index} className="relative p-2 border rounded">
                  {/* ✅ Ensure Correct Preview Display */}
                  <img
                    src={image} // ✅ Ensure correct URL is used
                    alt={`Preview ${index}`}
                    className="w-full h-16 object-cover rounded"
                  />

                  {/* Remove Image Button */}
                  <button
                    type="button"
                    onClick={() => removeImage(index)}
                    className="absolute top-0 right-0 bg-red-500 text-white px-2 rounded text-xs"
                  >
                    ✕
                  </button>
                </div>
              ))
            ) : (
              <p className="text-gray-400">No images uploaded.</p>
            )}
          </div>

          {/* Pricing */}
          <h3 className="text-lg font-semibold">Pricing Details</h3>
          <div className="grid grid-cols-2 gap-2">
            <input
              type="number"
              name="price"
              value={menuData.price_info[0]?.price || ""}
              onChange={(e) => handlePriceChange(0, "price", e.target.value)}
              className="border rounded p-2"
              placeholder="Price (₹)"
            />
            <input
              type="number"
              name="offer_price"
              value={menuData.price_info[0]?.offer_price || ""}
              onChange={(e) =>
                handlePriceChange(0, "offer_price", e.target.value)
              }
              className="border rounded p-2"
              placeholder="Offer Price (₹)"
            />
          </div>
          <div className="grid grid-cols-2 gap-2">
            <input
              type="number"
              name="tax_percentage"
              value={menuData.price_info[0].tax_percentage}
              onChange={(e) =>
                handlePriceChange(0, "tax_percentage", e.target.value)
              }
              className="border rounded p-2"
              placeholder="Tax Percentage (%)"
            />
            {/* Discount Percentage (Auto-Calculated) */}
            <input
              type="number"
              name="discount_percentage"
              value={menuData.price_info[0].discount_percentage || 0}
              className="border rounded p-2 bg-gray-100 cursor-not-allowed"
              placeholder="Discount (%)"
              readOnly
            />
          </div>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              name="is_offer"
              checked={menuData.price_info[0].is_offer}
              onChange={(e) =>
                handlePriceChange(0, "is_offer", e.target.checked)
              }
              className="w-4 h-4"
            />
            <label className="text-gray-700 text-sm font-bold">
              Is Offer Available?
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white p-2 rounded"
          >
            {types === "edit" ? "Update Menu" : "Add Menu"}
          </button>
        </form>
      </div>
    </ModalWrapper>
  );
}
