import React from "react";
import { FaEdit, FaEye, FaLock, FaUnlock } from "react-icons/fa";
import { MdOutlinePassword } from "react-icons/md";

function Table({ data, onEdit, onChangePassword, onStatusToggle, onView }) {
  return (
    <div>
      <div className="flex flex-col">
        <div className="overflow-x-auto pb-4">
          <div className="min-w-full inline-block align-middle">
            <div className="overflow-hidden shadow bg-white rounded-lg border-gray-300">
              <table className="table-auto min-w-full rounded-xl">
                <thead>
                  <tr className="bg-gray-50">
                    <th className="p-5 text-left text-sm font-semibold text-gray-900">User ID</th>
                    <th className="p-5 text-left text-sm font-semibold text-gray-900 min-w-[150px]">Full Name & Mobile</th>
                    <th className="p-5 text-left text-sm font-semibold text-gray-900 min-w-[150px]">Role</th>
                    <th className="p-5 text-left text-sm font-semibold text-gray-900">Email</th>
                    <th className="p-5 text-left text-sm font-semibold text-gray-900">Address</th>
                    <th className="p-5 text-left text-sm font-semibold text-gray-900">Status</th>
                    <th className="p-5 text-left text-sm font-semibold text-gray-900">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-300">
                  {data?.map((ele, ind) => (
                    <tr key={ele._id || ind} className="bg-white hover:bg-gray-50">
                      <td className="p-5 text-sm text-gray-900">{ele.user_id}</td>
                      <td className="px-5 py-3">
                        <div className="w-48 flex items-center gap-3">
                          <img
                            src="https://pagedone.io/asset/uploads/1697536419.png"
                            className="w-10 h-10 rounded-full"
                            alt="profile"
                          />
                          <div>
                            <p className="text-sm text-gray-900">{ele.user_name}</p>
                            <p className="text-xs text-gray-400">{ele.mobile_number}</p>
                          </div>
                        </div>
                      </td>
                      <td className="p-5 text-sm text-gray-900">{ele.email_id}</td>
                      <td className="p-5 text-sm text-gray-900">{ele.address || "N/A"}</td>
                      <td className="p-5 text-sm">
                        <span className={`px-3 py-1 rounded-full text-xs font-medium ${ele.is_active ? 'bg-green-200 text-green-800' : 'bg-red-200 text-red-800'}`}>
                          {ele.is_active ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                      <td className="p-5">
                        <div className="flex items-center gap-2">
                          <button onClick={() => onEdit(ele)} title="Edit" className="p-2 bg-blue-500 text-white rounded-full"><FaEdit /></button>
                          <button onClick={() => onChangePassword(ele)} title="Change Password" className="p-2 bg-yellow-500 text-white rounded-full"><MdOutlinePassword /></button>
                          <button onClick={() => onStatusToggle(ele)} title={ele.is_active ? "Deactivate" : "Activate"} className={`p-2 text-white rounded-full ${ele.is_active ? 'bg-red-500' : 'bg-green-500'}`}>
                            {ele.is_active ? <FaLock /> : <FaUnlock />}
                          </button>
                          <button onClick={() => onView(ele)} title="View Details" className="p-2 bg-gray-800 text-white rounded-full"><FaEye /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                  {data?.length === 0 && (
                    <tr>
                      <td colSpan={6} className="text-center py-6 text-gray-400">No employees found</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Table;