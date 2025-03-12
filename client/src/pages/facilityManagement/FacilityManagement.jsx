import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import FacilityModal from "./FacilityModal";
import { getAllFacilitiesService } from "../../redux/thunk/micellaneousServices";

function FacilityDashboard() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFacility, setSelectedFacility] = useState(null);

  useEffect(() => {
    dispatch(getAllFacilitiesService());
  }, [dispatch]);
  
  const { facilities, loading, error } = useSelector((state) => {
    
    return state.facilityState || { facilities: [] }; // ✅ Match key in `index.js`
  });

  

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Facility Dashboard</h1>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600"
          onClick={() => {
            setSelectedFacility(null);
            setIsModalOpen(true);
          }}
        >
          + Add Facility
        </button>
      </div>

      {loading ? (
        <p className="text-center text-gray-600">Loading facilities...</p>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : facilities.length === 0 ? (
        <p className="text-center text-gray-600">No facilities found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {facilities.map((facility) => (
            <div
              key={facility._id}
              className="bg-white rounded-lg shadow-md overflow-hidden cursor-pointer w-full"
            >
              <img src={facility.image} alt={facility.name} className="w-full h-48 sm:h-40 object-cover" />
              <div className="p-4">
                <h2 className="text-xl font-bold text-gray-800">{facility.name}</h2>
                <p className="text-gray-600 mt-2">{facility.description}</p>
                <div className="flex justify-between items-center mt-4">
                  <button
                    className="bg-green-500 text-white px-3 py-1 rounded"
                    onClick={() => navigate(facility.route)}
                  >
                    View
                  </button>
                  <button
                    className="bg-yellow-500 text-white px-3 py-1 rounded"
                    onClick={() => {
                      setSelectedFacility(facility);
                      setIsModalOpen(true);
                    }}
                  >
                    Edit
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add/Edit Facility Modal */}
      {isModalOpen && (
        <FacilityModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          facility={selectedFacility}
        />
      )}
    </div>
  );
}

export default FacilityDashboard;