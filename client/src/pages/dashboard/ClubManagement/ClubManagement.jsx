import React, { useEffect, useState } from "react";
import {
  getAllCommittee,
  createCommittee,
  updateCommittee,
} from "../../../services/committeManagementServices";
import CommitteeFormModal from "./CommitteeFormModal";
import { useDispatch } from "react-redux";
import { getMemberService } from "../../../redux/thunk/useMangementServices";

const BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5100";

const CommitteeManager = () => {
  const [committeeMembers, setCommitteeMembers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editData, setEditData] = useState(null);
  const [memberProfiles, setMemberProfiles] = useState({});
  const dispatch = useDispatch();

  useEffect(() => {
    loadCommittee();
  }, []);

  const loadCommittee = async () => {
    try {
      const res = await getAllCommittee();
      const data = res?.result || [];
      const today = new Date();
      const active = data.filter((entry) => {
        const start = new Date(entry.tenure_start);
        const end = new Date(entry.tenure_end);
        return entry.is_active && start <= today && end >= today;
      });
      setCommitteeMembers(active);
      // Fetch member profiles for each committee member
      fetchMemberProfiles(active);
    } catch (err) {
      alert("Failed to load committee: " + err.message);
    }
  };

  // Fetch member profiles for all committee members
  const fetchMemberProfiles = async (members) => {
    const profiles = {};
    await Promise.all(
      members.map(async (entry) => {
        try {
          const res = await dispatch(getMemberService(entry.member_id)).unwrap();
          profiles[entry.member_id] = res.result;
        } catch (err) {
          profiles[entry.member_id] = null;
        }
      })
    );
    setMemberProfiles(profiles);
  };

  const openCreateModal = () => {
    setEditData(null);
    setShowModal(true);
  };

  const openEditModal = (data) => {
    setEditData(data);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setEditData(null);
  };

  const handleSubmit = async (formData) => {
    try {
      if (editData) {
        await updateCommittee(editData._id, formData);
        alert("Committee member updated");
      } else {
        await createCommittee(formData);
        alert("Committee member created");
      }
      handleCloseModal();
      loadCommittee();
    } catch (err) {
      alert("Save failed: " + err.message);
    }
  };

  return (
    <div className="p-8">
      <div className="flex justify-between mb-6">
        <h2 className="text-xl font-bold text-theme">Managing Committee</h2>
        <button
          onClick={openCreateModal}
          className="bg-theme text-white px-4 py-2 rounded"
        >
          Add Committee Member
        </button>
      </div>

      <table className="w-full bg-white shadow rounded overflow-hidden">
        <thead className="bg-gray-100 text-gray-700">
          <tr>
            <th className="p-1">Sr. No.</th>
            <th className="p-4">Member</th>
            <th className="p-3">Role</th>
            <th className="p-3">Email</th>
            <th className="p-3">Tenure</th>
            <th className="p-3">Actions</th>
          </tr>
        </thead>
        <tbody>
          {committeeMembers.map((entry, idx) => {
            const profile = memberProfiles[entry.member_id];
            const profilePicture = profile?.profilePicture;
            const memberName = profile
              ? [profile.firstName, profile.middleName, profile.surname].filter(Boolean).join(" ")
              : entry.name;
            const mobileNumber = profile?.mobileNumber || entry.contact_number;
            const imageUrl = profilePicture
              ? `${BASE_URL}/api/utility/file/${profilePicture.replace("/uploads/", "")}`
              : "https://cdn.pixabay.com/photo/2019/08/11/18/59/icon-4399701_1280.png";
            return (
              <tr key={entry._id} className="border-b">
                <td className="p-3 text-center">{idx + 1}</td>
                <td className="p-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={imageUrl}
                      alt="Profile"
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div className="data">
                      <p className="font-normal text-sm text-gray-900">
                        {memberName}
                      </p>
                      <p className="font-normal text-xs leading-5 text-gray-400">
                        {mobileNumber}
                      </p>
                    </div>
                  </div>
                </td>
                <td className="p-3">{entry.role_title}</td>
                <td className="p-3">{entry.email}</td>
                <td className="p-3">
                  {new Date(entry.tenure_start).toLocaleDateString()} -{" "}
                  {new Date(entry.tenure_end).toLocaleDateString()}
                </td>
                <td className="p-3">
                  <button
                    onClick={() => openEditModal(entry)}
                    className="bg-blue-500 text-white px-3 py-1 rounded mr-2"
                  >
                    Edit
                  </button>
                </td>
              </tr>
            );
          })}
          {committeeMembers.length === 0 && (
            <tr>
              <td colSpan="5" className="text-center text-gray-500 p-4">
                No active committee members
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {showModal && (
        <CommitteeFormModal
          onClose={handleCloseModal}
          onSubmit={handleSubmit}
          initialData={editData}
        />
      )}
    </div>
  );
};

export default CommitteeManager;