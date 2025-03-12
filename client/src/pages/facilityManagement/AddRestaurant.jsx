import React, { useEffect, useState } from "react";
import ModalWrapper from "../../layout/ModalWrapper";
import { useDispatch } from "react-redux";
import {
  createRestaurantServices,
  updateRestaurantServices,
} from "../../redux/thunk/micellaneousServices";
import { logger, successToast } from "../../utils/Helper";
import moment from "moment";

export default function RestaurantModal({ isOpen, onClose, menuEdit, types }) {
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
  const DAYS = [
    { label: "Sunday", value: 0 },
    { label: "Monday", value: 1 },
    { label: "Tuesday", value: 2 },
    { label: "Wednesday", value: 3 },
    { label: "Thursday", value: 4 },
    { label: "Friday", value: 5 },
    { label: "Saturday", value: 6 },
  ];
  const [restaurantData, setRestaurantData] = useState({
    name: "",
    type: "Third-Party",
    commissionRate: 30,
    description: "",
    cuisines: [],
    images: [],
    timings: [
      {
        days: [0, 1, 2, 3, 4, 5, 6],
        openingTime: "11:00",
        closingTime: "22:00",
      },
    ], // ✅ Ensure it's an array
    isOpen: true,
    createdBy: 1,
    updatedBy: 1,
  });

  useEffect(() => {
    if (menuEdit !== null && types === "edit") {
      setRestaurantData({
        ...menuEdit,
        images: menuEdit.images || [],
        cuisines: menuEdit.cuisines || [],
        timings: Array.isArray(menuEdit.timings)
          ? menuEdit.timings
          : [
              {
                days: [0, 1, 2, 3, 4, 5, 6],
                openingTime: "11:00",
                closingTime: "22:00",
              },
            ], // ✅ Ensure `timings` is an array
        updatedBy: 1,
      });
    } else {
      setRestaurantData({
        name: "",
        type: "Third-Party",
        commissionRate: 30,
        description: "",
        cuisines: [],
        images: [],
        timings: [
          {
            days: [0, 1, 2, 3, 4, 5, 6],
            openingTime: "11:00",
            closingTime: "22:00",
          },
        ], // ✅ Ensure default `timings`
        isOpen: true,
        createdBy: 1,
        updatedBy: 1,
      });
    }
  }, [isOpen]);

  // Handle Input Change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRestaurantData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle Image Upload
  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    const imageURLs = files.map((file) => URL.createObjectURL(file));
    setRestaurantData((prev) => ({
      ...prev,
      images: [...prev.images, ...imageURLs],
    }));
  };

  // Update Restaurant Timings
  // Function to Toggle Day Selection
  const toggleDay = (dayValue) => {
    setRestaurantData((prev) => {
      let updatedTimings = [...prev.timings];

      // Check if the day is already selected
      const existingDayIndex = updatedTimings.findIndex((t) =>
        t.days.includes(dayValue)
      );

      if (existingDayIndex > -1) {
        // If already present, remove that day
        updatedTimings = updatedTimings
          .map((t) => ({
            ...t,
            days: t.days.filter((d) => d !== dayValue),
          }))
          .filter((t) => t.days.length > 0); // Remove empty timing objects
      } else {
        // If not present, add a new timing entry
        updatedTimings.push({
          days: [dayValue],
          openingTime: "11:00 AM",
          closingTime: "10:00 PM",
        });
      }

      return { ...prev, timings: updatedTimings };
    });
  };

  // Function to Update Opening/Closing Time for a Specific Day
  const updateTiming = (dayValue, field, value) => {
    setRestaurantData((prev) => {
      const updatedTimings = prev.timings.map((t) =>
        t.days.includes(dayValue) ? { ...t, [field]: value } : t
      );
      return { ...prev, timings: updatedTimings };
    });
  };

  // Handle Submit (Add or Update)
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (types === "edit") {
        await dispatch(updateRestaurantServices(restaurantData)).unwrap();
        successToast("Restaurant updated successfully!");
      } else {
        await dispatch(createRestaurantServices(restaurantData)).unwrap();
        successToast("Restaurant added successfully!");
      }
      onClose();
    } catch (error) {
      logger(error);
    }
  };

  return (
    <ModalWrapper isOpen={isOpen} onClose={onClose}>
      <div className="w-full max-w-4xl bg-white p-6 rounded-lg shadow-lg mx-auto my-10 flex flex-col md:flex-row h-[90vh]">


      <form onSubmit={handleSubmit} className="flex flex-col-reverse md:flex-col gap-6 w-full">
          {/* 📸 Preview Section */}
          <div className="w-full md:w-[100%] h-[35vh] bg-gray-100 p-6 rounded-lg flex-shrink-0">
            <h3 className="text-lg font-semibold ">Preview</h3>
            <div className="bg-white p-4 rounded-lg shadow-lg">
              <h2 className="text-2xl font-bold text-gray-800">
                {restaurantData.name || "Restaurant Name"}
              </h2>
              <p className="text-gray-600">
                {restaurantData.description || "Description will appear here."}
              </p>

              {/* Dynamic Image Preview */}
              <div className="mt-2 grid grid-cols-3 gap-2">
                {restaurantData.images.length > 0 ? (
                  restaurantData.images?.map((img, index) => (
                    <img
                      key={index}
                      src={img}
                      alt="Preview"
                      className="w-full h-20 object-cover rounded"
                    />
                  ))
                ) : (
                  <p className="text-gray-400">No images uploaded.</p>
                )}
              </div>
            </div>
          </div>

          {/* 📝 Form Section */}
          <div className="flex-1 h-[80vh] overflow-y-auto p-4">
            {/* Name */}
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Name
            </label>
            <input
              type="text"
              name="name"
              value={restaurantData.name}
              onChange={handleInputChange}
              className="border rounded w-full py-2 px-3 text-gray-700 mb-3"
              placeholder="Restaurant Name"
            />

            {/* Type */}
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Type
            </label>
            <select
              name="type"
              value={restaurantData.type}
              onChange={handleInputChange}
              className="border rounded w-full py-2 px-3 text-gray-700 mb-3"
            >
              <option value="Own">Own</option>
              <option value="Partnership">Partnership</option>
              <option value="Third-Party">Third-Party</option>
            </select>

            {/* Commission Rate (Only if Partnership/Third-Party) */}
            {(restaurantData.type === "Partnership" ||
              restaurantData.type === "Third-Party") && (
              <>
                <label className="block text-gray-700 text-sm font-bold mb-2">
                  Commission Rate (%)
                </label>
                <input
                  type="number"
                  name="commissionRate"
                  value={restaurantData.commissionRate}
                  onChange={handleInputChange}
                  className="border rounded w-full py-2 px-3 text-gray-700 mb-3"
                  placeholder="Commission Rate"
                />
              </>
            )}

            {/* Description */}
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Description
            </label>
            <textarea
              name="description"
              value={restaurantData.description}
              onChange={handleInputChange}
              className="border rounded w-full py-2 px-3 text-gray-700 mb-3"
              placeholder="Write a short description"
            />

            {/* Cuisines */}
            <label className="block text-gray-700 text-sm font-bold mb-2">
              Cuisines
            </label>
            <div className="border rounded w-full py-2 px-3 text-gray-700 mb-3">
              {CUISINES_DATA.map((cuisine) => (
                <button
                  key={cuisine.value}
                  type="button"
                  onClick={() => {
                    setRestaurantData((prev) => ({
                      ...prev,
                      cuisines: prev.cuisines.includes(cuisine.value)
                        ? prev.cuisines.filter((c) => c !== cuisine.value)
                        : [...prev.cuisines, cuisine.value],
                    }));
                  }}
                  className={`m-1 px-3 py-1 border rounded ${
                    restaurantData.cuisines.includes(cuisine.value)
                      ? "bg-blue-500 text-white"
                      : "bg-gray-100 text-gray-700"
                  }`}
                >
                  {cuisine.label}
                </button>
              ))}
            </div>

            <label className="block text-gray-700 text-sm font-bold mb-2">
              Image Links
            </label>
            {restaurantData.images.map((image, index) => (
              <div key={index} className="flex items-center mb-2">
                <input
                  type="text"
                  value={image}
                  onChange={(e) => {
                    const newImages = [...restaurantData.images];
                    newImages[index] = e.target.value;
                    setRestaurantData((prev) => ({
                      ...prev,
                      images: newImages,
                    }));
                  }}
                  className="border rounded w-full py-2 px-3 text-gray-700"
                  placeholder="Enter image URL"
                />
                <button
                  type="button"
                  onClick={() => {
                    setRestaurantData((prev) => ({
                      ...prev,
                      images: prev.images.filter((_, i) => i !== index),
                    }));
                  }}
                  className="ml-2 text-red-500 hover:text-red-700"
                >
                  ❌
                </button>
              </div>
            ))}
            <button
              type="button"
              onClick={() =>
                setRestaurantData((prev) => ({
                  ...prev,
                  images: [...prev.images, ""],
                }))
              }
              className="mt-2 px-3 py-1 border rounded bg-green-500 text-white"
            >
              ➕ Add Image Link
            </button>

            <div>
              {/* Multi-Select Days */}
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Select Open Days
              </label>
              <div className="flex flex-wrap gap-2 mb-4">
                {DAYS.map((day) => (
                  <button
                    key={day.value}
                    type="button"
                    onClick={() => toggleDay(day.value)}
                    className={`px-3 py-1 border rounded ${
                      Array.isArray(restaurantData.timings) &&
                      restaurantData.timings.some((t) =>
                        t.days.includes(day.value)
                      )
                        ? "bg-blue-500 text-white"
                        : "bg-gray-100 text-gray-700"
                    }`}
                  >
                    {day.label}
                  </button>
                ))}
              </div>

              {/* Show Opening & Closing Time for Selected Days */}
              {/* Opening & Closing Time (Only Once for Selected Days) */}
              <div className="mb-4 border p-3 rounded">
                {/* <p className="font-bold text-gray-700">
                  Open on:{" "}
                  {restaurantData.timings.days
                    .map((d) => DAYS[d].label)
                    .join(", ")}
                </p> */}

                <div className="flex space-x-4 mt-2">
                  {/* Opening Time */}
                  <div className="flex flex-col">
                    <label className="block text-gray-700 text-sm font-bold">
                      Opening Time
                    </label>
                    <input
                      type="time"
                      value={
                        Array.isArray(restaurantData.timings) &&
                        restaurantData.timings.length > 0
                          ? restaurantData.timings[0].openingTime
                          : ""
                      }
                      onChange={(e) =>
                        setRestaurantData((prev) => ({
                          ...prev,
                          timings: prev.timings.map((t, i) =>
                            i === 0 ? { ...t, openingTime: e.target.value } : t
                          ),
                        }))
                      }
                      className="border rounded py-2 px-3 text-gray-700"
                    />
                  </div>

                  {/* Closing Time */}
                  <div className="flex flex-col">
                    <label className="block text-gray-700 text-sm font-bold">
                      Closing Time
                    </label>
                    <input
                      type="time"
                      value={
                        Array.isArray(restaurantData.timings) &&
                        restaurantData.timings.length > 0
                          ? restaurantData.timings[0].closingTime
                          : ""
                      }
                      onChange={(e) =>
                        setRestaurantData((prev) => ({
                          ...prev,
                          timings: prev.timings.map((t, i) =>
                            i === 0 ? { ...t, closingTime: e.target.value } : t
                          ),
                        }))
                      }
                      className="border rounded py-2 px-3 text-gray-700"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded"
            >
              {types === "edit" ? "Update Restaurant" : "Add Restaurant"}
            </button>
          </div>
        </form>
      </div>
    </ModalWrapper>
  );
}
