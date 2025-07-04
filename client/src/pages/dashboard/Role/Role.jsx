import { useEffect, useState } from "react";
import { FaRegEdit, FaAtom } from "react-icons/fa";
import { useDispatch } from "react-redux";
import moment from "moment";

import CreateRole from "../../../components/Role/CreateRole";
import AccessControlModal from "./AccessControlModal";

import {
  getAllRoleServices,
  getMenuByRoleServices,
 
} from "../../../redux/thunk/micellaneousServices";
import { updateRoleAccessControlServices } from "../../../redux/thunk/adminServices";

function Role() {
  const [roleData, setRoleData] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedRoleId, setSelectedRoleId] = useState(null);
  const [menuData, setMenuData] = useState([]);
  const [accessModalOpen, setAccessModalOpen] = useState(false);

  const dispatch = useDispatch();

  const getRoleHandler = async () => {
    try {
      const response = await dispatch(getAllRoleServices()).unwrap();
      setRoleData(response?.result);
    } catch (error) {
      console.log(error);
    }
  };

  const getMenuByRole = async (roleId) => {
    try {
      const response = await dispatch(getMenuByRoleServices(roleId)).unwrap();
      setMenuData(response?.menus);
    } catch (error) {
      console.log(error);
    }
  };

  const handleEditClick = async (roleId) => {
    setSelectedRoleId(roleId);
    await getMenuByRole(roleId);
    setIsOpen(true);
  };

  const handleAccessClick = (roleId) => {
    setSelectedRoleId(roleId);
    setAccessModalOpen(true);
  };

  const handleAccessSubmit = async (payload) => {
    try {
      await dispatch(updateRoleAccessControlServices(payload)).unwrap();
      alert("Access updated successfully.");
      setAccessModalOpen(false);
    } catch (err) {
      console.error("Error updating access:", err);
    }
  };

  useEffect(() => {
    getRoleHandler();
  }, []);

  return (
    <div>
      <div className="flex items-center justify-between">
        <p className="font-semibold h28">Role Management</p>
        <button
          onClick={() => setIsOpen(true)}
          className="bg-theme text-white p-3 px-6 rounded-md shadow hover:shadow-lg hover:-translate-y-1 transition-transform"
        >
          Add Role
        </button>
      </div>

      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {roleData.map((role, ind) => (
          <Card
            key={ind}
            role={role}
            onEditClick={handleEditClick}
            onAccessClick={handleAccessClick}
          />
        ))}
      </div>

      {/* Modals */}
      <CreateRole
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        selectedRoleId={selectedRoleId}
        menuData={menuData}
      />

      <AccessControlModal
        isOpen={accessModalOpen}
        onClose={() => setAccessModalOpen(false)}
        roleId={selectedRoleId}
        onSubmit={handleAccessSubmit}
      />
    </div>
  );
}

export default Role;

// Card Component
const Card = ({ role, onEditClick, onAccessClick }) => {
  return (
    <div className="border py-3 px-4 bg-theme/10 rounded-md shadow-sm">
      <div className="flex items-center justify-between">
        <p className="h28 font-semibold text-theme">{role.role_name}</p>
        <div className="flex gap-3 items-center">
          <div className="relative group">
            <FaRegEdit
              className="text-xl text-blue-600 cursor-pointer"
              onClick={() => onEditClick(role.role_id)}
            />
            <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-all duration-200">
              Edit Role
            </span>
          </div>

          <div className="relative group">
            <FaAtom
              className="text-xl text-blue-600 cursor-pointer"
              onClick={() => onAccessClick(role.role_id)}
            />
            <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-all duration-200">
              Access Control
            </span>
          </div>
        </div>
      </div>

      <p className="text-sm font-normal text-theme">{role.role_description}</p>
      <p className="text-gray-600 font-medium text-xs">
        {moment(role?.date_created).format("MMMM Do YYYY, h:mm:ss a")}
      </p>
    </div>
  );
};