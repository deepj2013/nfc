import React, { useEffect, useState } from "react";
import { FaRegEdit , FaAtom} from "react-icons/fa";
import {  MdOutlineSecurityUpdate } from "react-icons/md";
import CreateRole from "../../../components/Role/CreateRole";
import { getAllRoleServices, getMenuByRoleServices } from "../../../redux/thunk/micellaneousServices";
import { useDispatch } from "react-redux";
import { Tooltip } from "react-tooltip";
import moment from "moment";

function Role() {
  const [roleData, setRoleData] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedRoleId, setSelectedRoleId] = useState(null);
  const [menuData, setMenuData] = useState([]); // To store the menus for the selected role

  const dispatch = useDispatch();

  // Fetch all roles
  const getRoleHandler = async () => {
    try {
      let response = await dispatch(getAllRoleServices()).unwrap();
      setRoleData(response?.result);
    } catch (error) {
      console.log(error);
    }
  };

  // Fetch menu items by roleId
  const getMenuByRole = async (roleId) => {
    try {
      let response = await dispatch(getMenuByRoleServices(roleId)).unwrap();
      setMenuData(response?.menus); // Assuming the response contains menus array
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getRoleHandler();
  }, []);

  // When clicking edit, open the modal and fetch menus for that role
  const handleEditClick = async (roleId) => {
    setSelectedRoleId(roleId);
    await getMenuByRole(roleId); // Fetch menus for the role
    setIsOpen(true); // Open the modal
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <p className="font-semibold h28">Role Management</p>
        <button
          onClick={() => setIsOpen(true)}
          className="bg-theme text-white p-3 px-6 rounded-md
                            flex flex-row  items-center justify-center py-3 lg:text-base font-medium leading-6 capitalize duration-100 transform shadow cursor-pointer focus:ring-4 focus:ring-theme focus:ring-opacity-50 focus:outline-none sm:mb-0 lg:px-8 hover:shadow-lg hover:-translate-y-4"
        >
          Add Role
        </button>
      </div>

      <div className="mt-10 grid grid-cols-3 gap-4">
        {roleData.map((role, ind) => (
          <Card role={role} key={ind} onEditClick={handleEditClick} />
        ))}
      </div>

      {/* Pass the menuData to CreateRole modal */}
      <CreateRole
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        selectedRoleId={selectedRoleId} // Pass the selected role ID if needed
        menuData={menuData} // Pass the menus for that role
      />
    </div>
  );
}

export default Role;

const Card = ({ role, onEditClick, onAccessClick }) => {
  return (
    <div key={role.role_id} className="border py-3 px-4 bg-theme/10 rounded-md shadow-sm">
      <div className="flex items-center justify-between">
        <p className="h28 font-semibold text-theme">{role.role_name}</p>

        <div className="flex gap-3 items-center">
          {/* Edit Role */}
          <div className="relative group">
            <FaRegEdit
              className="text-xl text-blue-600 cursor-pointer"
              onClick={() => onEditClick(role.role_id)}
            />
            <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-all duration-200">
              Edit Role
            </span>
          </div>

          {/* Access Control */}
          <div className="relative group">
            <FaAtom
              className="text-xl text-blue-600 cursor-pointer"
              onClick={() => onAccessClick(role.role_id)}
            />
            <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-all duration-200">
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