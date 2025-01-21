import React, { useState, useEffect } from "react";
import Button from "../../components/common/Button";
import { IoAddCircleSharp } from "react-icons/io5";
import RestaurantModal from "./AddRestaurant";
import { getAllRestaurantServices } from "../../redux/thunk/micellaneousServices";
import { useDispatch } from "react-redux";
import { logger } from "../../utils/Helper";

const MenuCard = ({ menu, setType, setIsOpen, setMenuEdit }) => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6">
      <div className="flex">
        <div className="w-1/4">
          <img
            src={menu.images}
            alt={menu.name}
            className="w-full h-40 object-cover"
          />
        </div>
        <div className="w-3/4 p-4">
          <h2 className="text-2xl font-bold text-gray-800">{menu.name}</h2>
          <div className="flex justify-between items-center mt-4">
            <button
              onClick={() => {
                setMenuEdit(menu);
                setIsOpen(true);
                setType("edit");
              }}
              className="px-4 py-1 border border-gray-300 rounded text-gray-600 hover:bg-gray-100"
            >
              Edit
            </button>
            <button className="px-4 py-1 bg-blue-700 text-white rounded hover:bg-blue-800">
              View Menu
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

function Restaurant() {
  const [isOpen, setIsOpen] = useState(false);
  const [restaurantData, setRestaurantData] = useState([]);
  const [menuEdit, setMenuEdit] = useState(null);
  const [type, setType] = useState("");

  const dispatch = useDispatch();

  const getFacilityHandler = async () => {
    try {
      const response = await dispatch(getAllRestaurantServices()).unwrap();
      if (response.success) {
        setRestaurantData(response.data);
      }
    } catch (error) {
      logger(error);
    }
  };

  useEffect(() => {
    getFacilityHandler();
  }, []);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6 flex items-center justify-between">
        <p className="text-3xl font-bold">Restaurant Management</p>
        <Button
          onClick={() => setIsOpen(true)}
          rightIcon={<IoAddCircleSharp className="text-2xl" />}
          name="Add Restaurant"
        />
      </div>
      {restaurantData.map((menu, index) => (
        <MenuCard
        key={index}
        setIsOpen={setIsOpen}
        menu={menu}
        setType={setType}
        type={type}
        menuEdit={menuEdit}
        setMenuEdit={setMenuEdit}
        />
      ))}
      <RestaurantModal
       setType={setType}
       types={type}
       IsOpen={setIsOpen}
       isOpen={isOpen}
       menuEdit={menuEdit}
       onClose={() => {
         setIsOpen(false);
       }}
      />
    </div>
  );
}

export default Restaurant;