import React, { useEffect, useState } from "react";
import { FaRegEdit } from "react-icons/fa";
import { AiOutlineDelete } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import CreateRole from "../../../components/Role/CreateRole";
import { getAllRoleServices, getMenuByRoleServices } from "../../../redux/thunk/micellaneousServices";
import { useDispatch } from "react-redux";
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

const Card = ({ role, onEditClick }) => {
  return (
    <div key={role.id} className="border py-3 px-4 bg-theme/10">
      <div className="flex items-center justify-between">
        <p className="h28 font-semibold text-theme">{role.role_name}</p>

        <div className="flex gap-2">
          {/* Pass the role ID when the edit icon is clicked */}
          <FaRegEdit className="text-xl text-theme" onClick={() => onEditClick(role.role_id)} />
          <MdDelete className="text-xl text-red-600" />
        </div>
      </div>
      <p className="text-sm font-normal text-theme">{role.role_description}</p>
      <p className="text-gray-600 font-medium text-xs">
        {moment(role?.date_created).format("MMMM Do YYYY, h:mm:ss a")}
      </p>
    </div>
  );
};
