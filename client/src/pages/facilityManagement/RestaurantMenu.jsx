import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { IoAddCircleSharp } from "react-icons/io5";
import { FaEdit, FaBookOpen, FaPlusCircle } from "react-icons/fa"; // Icons for Edit, Recipe
import MenuModal from "./MenuModal";
import RecipeModal from "./menuRecipeModal";
import { useParams } from "react-router-dom";
import { getRecipeForMenuService, getRestaurantMenuServices } from "../../redux/thunk/micellaneousServices";

const MenuManagement = () => {
  const { restaurantId } = useParams();
  const dispatch = useDispatch();
  const [isMenuModalOpen, setIsMenuModalOpen] = useState(false);
  const [isRecipeModalOpen, setIsRecipeModalOpen] = useState(false);
  const [menuEdit, setMenuEdit] = useState(null);
  const [selectedMenuForRecipe, setSelectedMenuForRecipe] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [recipeData, setRecipeData] = useState(null);

  // ✅ Fetch menus from Redux store
  useEffect(() => {
    dispatch(getRestaurantMenuServices({ restaurant_id: restaurantId }));
  }, [dispatch, restaurantId]);

  const { menus, loading, error } = useSelector((state) => state.menu);


  const handleViewRecipe = async (menu) => {
    try {
      const response = await dispatch(getRecipeForMenuService(menu._id)).unwrap();
      console.log(response.data)
      setRecipeData(response.data); // ✅ Store fetched recipe
      setSelectedMenuForRecipe(menu);
      setIsRecipeModalOpen(true); // ✅ Open modal after fetching data
    } catch (error) {
      console.error("Failed to fetch recipe:", error);
    }
  };
  const displayedMenus = menus.length ? menus : [];
  const categories = menus.length
    ? [...new Set(menus.map((m) => m.category))]
    : [];

  return (
    <div className="container mx-auto px-4 py-8 flex gap-6">
      {/* Sidebar */}
      <aside className="w-1/4 p-4 bg-gray-100 rounded-lg">
        <h2 className="text-lg font-bold mb-3">Categories</h2>
        <ul>
          <li
            className={`cursor-pointer p-2 rounded ${
              selectedCategory === "All" ? "bg-blue-500 text-white" : ""
            }`}
            onClick={() => setSelectedCategory("All")}
          >
            All
          </li>
          {categories.map((category) => (
            <li
              key={category}
              className={`cursor-pointer p-2 rounded ${
                selectedCategory === category ? "bg-blue-500 text-white" : ""
              }`}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </li>
          ))}
        </ul>
      </aside>

      {/* Main Content */}
      <main className="flex-1">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Menu Management</h1>
          <button
            className="flex items-center bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600"
            onClick={() => {
              setMenuEdit(null);
              setIsMenuModalOpen(true);
            }}
          >
            <IoAddCircleSharp className="mr-2" /> Add Menu
          </button>
        </div>

        {/* Menu Items */}
        <div className="grid grid-cols-2 gap-6">
          {displayedMenus.map((menu) => (
            <div
              key={menu._id}
              className="bg-white rounded-lg shadow-md overflow-hidden p-4"
            >
              {/* Menu Image */}
              <img
                src={menu.images[0]}
                alt={menu.name}
                className="w-full h-40 object-cover rounded-lg"
              />

              {/* Menu Details */}
              <h2 className="text-xl font-bold mt-2">{menu.name}</h2>
              <p className="text-gray-600">{menu.description}</p>

              {/* Pricing */}
              <div className="mt-2">
                {menu.price_info.length > 0 && (
                  <p className="text-gray-700">
                    <span className="line-through text-red-500">
                      ₹{menu.price_info[0].price}
                    </span>
                    <span className="text-lg font-bold text-green-600 ml-2">
                      ₹{menu.price_info[0].offer_price}
                    </span>
                  </p>
                )}
              </div>

              {/* Buttons */}
              <div className="flex justify-between items-center mt-4">
                {/* Edit Menu */}
                <button
                  className="flex items-center bg-yellow-500 text-white px-3 py-1 rounded shadow-md hover:bg-yellow-600"
                  onClick={() => {
                    setMenuEdit(menu); // ✅ Set the full menu object
                    setIsMenuModalOpen(true);
                  }}
                >
                  <FaEdit className="mr-1" /> Edit
                </button>

                {/* Add Recipe Button (Editable) */}
                <button
                  className="flex items-center bg-blue-500 text-white px-3 py-1 rounded shadow-md hover:bg-blue-600"
                  onClick={() => {
                    setSelectedMenuForRecipe(menu);
                    setIsRecipeModalOpen(true);
                  }}
                >
                  <FaPlusCircle className="mr-1" /> Add Recipe
                </button>

                {/* View Recipe Button (Read-Only) */}
                <button
                  className="flex items-center bg-green-500 text-white px-3 py-1 rounded shadow-md hover:bg-green-600"
                  onClick={() => handleViewRecipe(menu)} // ✅ API Call Before Opening Modal
                >
                  <FaBookOpen className="mr-1" /> View Recipe
                </button>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Menu Modal */}
      {isMenuModalOpen && (
        <MenuModal
          isOpen={isMenuModalOpen}
          onClose={() => setIsMenuModalOpen(false)}
          menuEdit={menuEdit}
          types={menuEdit ? "edit" : "new"} // ✅ Correctly passing types
          restaurantId={restaurantId}
        />
      )}

      {/* Recipe Modal */}
       {/* Recipe Modal */}
       {isRecipeModalOpen && (
        <RecipeModal
          isOpen={isRecipeModalOpen}
          onClose={() => setIsRecipeModalOpen(false)}
          menu={selectedMenuForRecipe}
          recipeData={recipeData} // ✅ Pass fetched recipe
          readOnly={true} // ✅ Read-Only Mode
        />
      )}
    </div>
  );
};

export default MenuManagement;
