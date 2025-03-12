import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { successToast, errorToast } from "../../utils/Helper";
import {
  addFacilityCategoryService,
  updateFacilityCategoryService,
  getAllFacilitiesService,
} from "../../redux/thunk/micellaneousServices";

const FacilityModal = ({ isOpen, onClose, facility }) => {
  const dispatch = useDispatch();
  const [facilityData, setFacilityData] = useState({
    name: "",
    description: "",
    image: "",
    route: "",
  });

  useEffect(() => {
    if (facility) {
      setFacilityData(facility);
    } else {
      setFacilityData({ name: "", description: "", image: "", route: "" });
    }
  }, [facility]);

  const handleChange = (e) => {
    setFacilityData({ ...facilityData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    if (!facilityData.name || !facilityData.description || !facilityData.image || !facilityData.route) {
      errorToast("All fields are required");
      return;
    }

    try {
      if (facility) {
        await dispatch(updateFacilityCategoryService({ id: facility._id, data: facilityData })).unwrap();
        successToast("Facility updated successfully!");
      } else {
        await dispatch(addFacilityCategoryService(facilityData)).unwrap();
        successToast("Facility added successfully!");
      }
      dispatch(getAllFacilitiesService()); // Refresh list
      onClose();
    } catch (error) {
      errorToast(error.message || "Failed to process facility");
    }
  };

  return (
    <div className={`fixed inset-0 flex items-center justify-center px-4 sm:px-6 bg-black bg-opacity-50 ${isOpen ? "visible" : "invisible"}`} style={{ marginLeft: "15px" }}>
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg sm:max-w-md md:max-w-lg lg:max-w-xl">
        <h2 className="text-xl font-bold mb-4">{facility ? "Edit Facility" : "Add Facility"}</h2>
        
        <label className="block font-medium">Facility Name</label>
        <input type="text" name="name" value={facilityData.name} placeholder="Facility Name" className="border p-2 w-full mb-2" onChange={handleChange} />

        <label className="block font-medium">Description</label>
        <input type="text" name="description" value={facilityData.description} placeholder="Description" className="border p-2 w-full mb-2" onChange={handleChange} />

        <label className="block font-medium">Image URL</label>
        <input type="text" name="image" value={facilityData.image} placeholder="Image URL" className="border p-2 w-full mb-2" onChange={handleChange} />

        {facilityData.image && (
          <div className="border p-2 mt-2 rounded shadow">
            <h3 className="font-semibold text-sm mb-2">Preview:</h3>
            <img src={facilityData.image} alt="Preview" className="w-full h-auto max-h-56 object-cover rounded" />
          </div>
        )}

        <label className="block font-medium">Route</label>
        <input type="text" name="route" value={facilityData.route} placeholder="Route" className="border p-2 w-full mb-2" onChange={handleChange} />

        <div className="flex flex-col sm:flex-row justify-end gap-2">
          <button className="bg-gray-400 text-white px-4 py-2 rounded" onClick={onClose}>Cancel</button>
          <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={handleSubmit}>
            {facility ? "Update" : "Add"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default FacilityModal;