import React, { useEffect, useState } from "react";
import {
  getAllMenuServices,
  getMenuByRoleServices,
} from "../../../redux/thunk/micellaneousServices";
import { useDispatch } from "react-redux";
import { MdClose } from "react-icons/md";

function AccessControlModal({
  isOpen,
  onClose,
  roleId,
  createdBy = 1,
  onSubmit,
}) {
  const [allMenus, setAllMenus] = useState([]);
  const [activeMenuIds, setActiveMenuIds] = useState([]);
  const [isEditMode, setIsEditMode] = useState(false);

  const dispatch = useDispatch();

  const fetchData = async () => {
    try {
      const allMenuResponse = await dispatch(getAllMenuServices()).unwrap();
      const roleMenuResponse = await dispatch(
        getMenuByRoleServices({ role_id: roleId })
      ).unwrap();
      console.log("All menu response ",typeof allMenuResponse, allMenuResponse, );
      setAllMenus(allMenuResponse || []);
      const roleMenus = roleMenuResponse?.map((menu) => menu.menuId);
      setActiveMenuIds(roleMenus);
      console.log("roleMenus,", typeof roleMenus, roleMenus);
    } catch (error) {
      console.error("Error fetching access control data:", error);
    }
  };

  useEffect(() => {
    if (isOpen && roleId) {
      fetchData();
    }
  }, [isOpen, roleId]);

  const toggleMenuAccess = (menuId) => {
    if (!isEditMode) return;
    setActiveMenuIds((prev) =>
      prev.includes(menuId)
        ? prev.filter((id) => id !== menuId)
        : [...prev, menuId]
    );
  };

  const handleSubmit = () => {
    const payload = {
      role_id: roleId,
      menu_ids: activeMenuIds,
      created_by: createdBy,
      updated_by: createdBy,
    };
    onSubmit(payload);
    setIsEditMode(false);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-100 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white w-[60vw] max-h-[90vh] overflow-y-auto rounded-lg p-6 relative">
        <button
          className="absolute top-4 right-4 text-gray-600"
          onClick={onClose}
        >
          <MdClose size={24} />
        </button>

        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">
            Access Control for Role #{roleId}
          </h2>
          <button
            onClick={() => setIsEditMode(!isEditMode)}
            className="bg-blue-600 text-white px-4 py-2 rounded"
          >
            {isEditMode ? "Cancel" : "Edit"}
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {allMenus.map((menu) => {
            const isActive = activeMenus.includes(menu.menuId);
            return (
              <div
                key={menu.menuId}
                className={`p-4 border rounded cursor-pointer transition ${
                  isActive ? "bg-green-100 border-green-500" : "bg-white"
                }`}
              >
                <p className="font-semibold">{menu.menuName}</p>
                <p className="text-xs text-gray-500">{menu.routeUrl}</p>
              </div>
            );
          })}
        </div>

        {isEditMode && (
          <div className="mt-6 text-right">
            <button
              onClick={handleSubmit}
              className="bg-green-600 text-white px-6 py-2 rounded"
            >
              Save Access
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default AccessControlModal;
