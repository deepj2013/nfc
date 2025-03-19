import React, { useEffect, useState } from "react";
import CreateOrganization from "../../../components/Modal/CreateOrganization";
import { useDispatch, useSelector } from "react-redux";
import { organisationListservices } from "../../../redux/thunk/organizationMangementservices";
import { FaEdit } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import logo from "../../../assets/image/logo5.jpg";

function Organization() {
  const [isOpen, setisOpen] = useState(false);
  const { organisation } = useSelector(
    (state) => state.organisationMangementState
  );
  const [selectedOrganisation, setSelectedOrganisation] = useState(null);
  const navigate = useNavigate();

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(organisationListservices());
  }, []);

  return (
    <div>
      {/* <div className="mb-6 flex items-center justify-between">
        <p className="font-semibold text-2xl">Organization Management</p>
      </div> */}
      <div className="space-y-6">
        {organisation?.map((ele, ind) => (
          <div key={ind} className="bg-white p-6 rounded-lg shadow-md border border-gray-300 relative">
            <button
              className="absolute top-4 right-4 text-blue-500 hover:text-blue-700"
              onClick={() => {
                setSelectedOrganisation(ele);
                setisOpen(true);
              }}
            >
              <FaEdit size={20} />
            </button>
            <div className="flex flex-col items-center">
              <img src={logo} alt="Organization Logo" className="w-50 h-50  mb-4" />
            
              <h2 className="text-2xl font-semibold text-gray-900">{ele?.fullName}</h2>
              <a className="text-sm text-gray-500" target="_blank" href= "https://www.newfriendsclubdelhi.in/">{ele?.website}</a>
             
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6 w-full">
              <p><strong className="text-gray-700">Address:</strong> {ele?.address}</p>
              <p><strong className="text-gray-700">Contact Number:</strong> {ele?.phone}</p>
              <p><strong className="text-gray-700">GST:</strong> {ele?.gst}</p>
              <p><strong className="text-gray-700">TAN:</strong> {ele?.tan}</p>
              <div className="md:col-span-2">
                <strong className="text-gray-700">Facilities:</strong>
                <div className="flex flex-wrap gap-2 mt-2">
                  {ele?.facilities?.map((facility, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 rounded-full bg-gray-100 text-gray-900 text-sm font-normal"
                    >
                      {facility}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      <button
        className="w-full mt-6 bg-blue-600 text-white py-3 rounded-lg shadow-lg hover:bg-blue-700 transition duration-300"
        onClick={() => navigate("/managementcommity")}
      >
        Member of Clubs
      </button>
      <CreateOrganization
        selectedOrganisation={selectedOrganisation}
        isOpen={isOpen}
        onClose={() => setisOpen(false)}
      />
    </div>
  );
}

export default Organization;