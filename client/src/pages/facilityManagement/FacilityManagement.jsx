import React, { useEffect, useState } from "react";
import Button from "../../components/common/Button";
import { IoAddCircleSharp } from "react-icons/io5";
import RestaurantModal from "./AddRestaurant";
import { getAllRestaurantServices } from "../../redux/thunk/micellaneousServices";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { logger } from "../../utils/Helper";

const MenuCard = ({ name, cuisines, image, hours }) => (
  <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
    <div className="flex">
      <div className="w-1/4 relative">
        <img src={image} alt={name} className="w-full h-40 object-cover" />
        <div className="absolute top-1/2 left-2 transform -translate-y-1/2">
          <button className="bg-black bg-opacity-50 text-white p-1 rounded-full">
            &lt;
          </button>
        </div>
        <div className="absolute top-1/2 right-2 transform -translate-y-1/2">
          <button className="bg-black bg-opacity-50 text-white p-1 rounded-full">
            &gt;
          </button>
        </div>
      </div>
      <div className="w-3/4 p-4">
        <div className="flex justify-between items-start mb-2">
          <h2 className="text-2xl font-bold text-gray-800">{name}</h2>
          <p className="text-sm text-gray-600">{cuisines}</p>
        </div>
        <div className="grid grid-cols-7 gap-2 mb-4">
          {Object.entries(hours).map(([day, time]) => (
            <div key={day} className="bg-gray-100 p-1 rounded text-center">
              <p className="font-semibold text-sm">{day}</p>
              <p className="text-xs text-gray-600">{time}</p>
            </div>
          ))}
        </div>
        <div className="flex justify-between items-center">
          <div className="space-x-2">
            <button className="px-4 py-1 border border-gray-300 rounded text-gray-600 hover:bg-gray-100">
              Delete
            </button>
            <button className="px-4 py-1 border border-gray-300 rounded text-gray-600 hover:bg-gray-100">
              Edit
            </button>
          </div>
          <div className="flex items-center">
            <a
              href="#"
              className="text-blue-600 hover:underline mr-2 text-sm flex items-center"
            >
              View More
              <span className="ml-1">→</span>
            </a>
            <button className="px-4 py-1 bg-blue-700 text-white rounded hover:bg-blue-800">
              Menu
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
);

function FacilityManagement() {
  const [isOpen, setIsOpen] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const getFacilityHandler = async () => {
    console.log("getFacilityHandler");

    try {
      let response = await dispatch(getAllRestaurantServices()).unwrap();
      console.log("getFacilityHandler09", response);
    } catch (error) {
      console.log("getFacilityHandler1234");

      logger(error);
    }
  };

  useEffect(() => {
    getFacilityHandler();
  }, []);
  const menus = [
    {
      name: "INDIAN MENU",
      cuisines: "North Indian, FastFood, Chinese",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202024-10-03%20at%2022.52.35-xYhgSqRmzqQ20rYE0SjANqWf7IAnYY.png",
      hours: {
        Mon: "11:00 - 23:00",
        Tue: "11:00 - 23:00",
        Wed: "11:00 - 23:00",
        Thu: "11:00 - 23:00",
        Fri: "11:00 - 23:00",
        Sat: "11:00 - 23:00",
        Sun: "11:00 - 23:00",
      },
    },
    {
      name: "CHINESE MENU",
      cuisines: "Chinese",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202024-10-03%20at%2022.52.35-xYhgSqRmzqQ20rYE0SjANqWf7IAnYY.png",
      hours: {
        Mon: "11:00 - 23:00",
        Tue: "11:00 - 23:00",
        Wed: "11:00 - 23:00",
        Thu: "11:00 - 23:00",
        Fri: "11:00 - 23:00",
        Sat: "11:00 - 23:00",
        Sun: "11:00 - 23:00",
      },
    },
    {
      name: "CONTINENTAL MENU",
      cuisines: "Italian",
      image:
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot%202024-10-03%20at%2022.52.35-xYhgSqRmzqQ20rYE0SjANqWf7IAnYY.png",
      hours: {
        Mon: "11:00 - 23:00",
        Tue: "11:00 - 23:00",
        Wed: "11:00 - 23:00",
        Thu: "11:00 - 23:00",
        Fri: "11:00 - 23:00",
        Sat: "11:00 - 23:00",
        Sun: "11:00 - 23:00",
      },
    },
  ];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6 flex items-center justify-between">
        <p className="text-3xl font-bold">Restaurant</p>
        <div className="flex gap-4">
          <div className="flex gap-4">
            <Button
              onClick={() => {
                setIsOpen(true);
              }}
              rigntIcon={<IoAddCircleSharp className="text-2xl" />}
              name={"Add Member"}
            />
          </div>
        </div>
      </div>
      {menus.map((menu, index) => (
        <MenuCard key={index} {...menu} />
      ))}
      <RestaurantModal
        setIsOpen={setIsOpen}
        isOpen={isOpen}
        onClose={() => {
          setIsOpen(false);
        }}
      />
    </div>
  );
}

export default FacilityManagement;
