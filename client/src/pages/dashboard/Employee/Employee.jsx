import React, { useEffect, useState } from 'react';
import Table from '../../../components/common/Table';
import CreateEmployee from '../../../components/Employee/CreateEmployee';
import { IoSearch } from "react-icons/io5";
import { useDispatch, useSelector } from 'react-redux';
import { employeeListServices, roleListServices } from '../../../redux/thunk/useMangementServices';

function Employee() {
  const [isOpen, setisOpen] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [showViewModal, setShowViewModal] = useState(false);

  const { employees } = useSelector((state) => state.userStateMangementState);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(employeeListServices());
    dispatch(roleListServices());
  }, []);

  const handleView = (user) => {
    setSelectedUser(user);
    setShowViewModal(true);
  };

  const handleEdit = (user) => {
    console.log("Edit user:", user);
  };

  const handleToggleStatus = (user) => {
    console.log("Toggle status:", user);
  };

  const handleChangePassword = (user) => {
    console.log("Change password:", user);
  };

  const filteredEmployees = employees?.filter((emp) =>
    emp.user_name?.toLowerCase().includes(searchText.toLowerCase()) ||
    emp.email_id?.toLowerCase().includes(searchText.toLowerCase())
  ) || [];

  return (
    <div>
      <div className='mb-6 flex items-center justify-between'>
        <p className='font-semibold text-lg'>Employee Management</p>
        <button
          onClick={() => setisOpen(true)}
          className='bg-theme text-white px-6 py-3 rounded-md shadow hover:shadow-lg hover:-translate-y-1 transition-all'
        >
          Add Employee
        </button>
      </div>

      <div className='mb-4 flex'>
        <div className='flex relative items-center rounded-lg overflow-hidden bg-white shadow-md'>
          <input
            className='w-[300px] px-4 text-sm h-full py-3 outline-none'
            placeholder='Search Employee...'
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <IoSearch className='absolute right-2 text-gray-500' />
        </div>
      </div>

      <Table
        data={filteredEmployees}
        onView={handleView}
        onEdit={handleEdit}
        onStatusToggle={handleToggleStatus}
        onChangePassword={handleChangePassword}
      />

      <CreateEmployee isOpen={isOpen} onClose={() => setisOpen(false)} />

      {/* View Modal */}
      {showViewModal && selectedUser && (
        <div className='fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50'>
          <div className='bg-white w-[90%] max-w-md p-6 rounded-lg shadow-lg'>
            <h2 className='text-lg font-bold mb-4'>Employee Details</h2>
            <p><strong>Name:</strong> {selectedUser.user_name}</p>
            <p><strong>Role:</strong> {selectedUser.role_name}</p>
            <p><strong>Email:</strong> {selectedUser.email_id}</p>
            <p><strong>Mobile:</strong> {selectedUser.mobile_number}</p>
            <p><strong>Status:</strong> {selectedUser.is_active ? "Active" : "Inactive"}</p>
            <p><strong>Last Login:</strong> {new Date(selectedUser.last_logged_in_out).toLocaleString()}</p>
            <p><strong>Created At:</strong> {new Date(selectedUser.date_created).toLocaleString()}</p>
            <p><strong>Invalid Attempts:</strong> {selectedUser.invalid_attempts}</p>
            <button
              className='mt-4 px-4 py-2 bg-gray-800 text-white rounded'
              onClick={() => setShowViewModal(false)}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Employee;