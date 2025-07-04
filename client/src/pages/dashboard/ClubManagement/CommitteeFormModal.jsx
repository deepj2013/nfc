import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getMemberService } from "../../../redux/thunk/useMangementServices";

const CommitteeFormModal = ({ onClose, onSubmit, initialData }) => {
  const dispatch = useDispatch();
  const [memberId, setMemberId] = useState(initialData?.member_id || "");
  const [roleTitle, setRoleTitle] = useState(initialData?.role_title || "");
  const [tenureStart, setTenureStart] = useState(initialData?.tenure_start?.split("T")[0] || "");
  const [tenureEnd, setTenureEnd] = useState(initialData?.tenure_end?.split("T")[0] || "");
  const [memberDetails, setMemberDetails] = useState(null);
  const [fetching, setFetching] = useState(false);
  const [fetchError, setFetchError] = useState("");

  const handleFetchMember = async () => {
    setFetching(true);
    setFetchError("");
    setMemberDetails(null);
    try {
      const res = await dispatch(getMemberService(memberId)).unwrap();
      setMemberDetails(res.result);
      setFetchError("");
    } catch (err) {
      setFetchError("Member not found or error fetching member.");
      setMemberDetails(null);
    } finally {
      setFetching(false);
    }
  };

  const handleSubmit = () => {
    if (!memberId || !roleTitle || !tenureStart || !tenureEnd || (!initialData && !memberDetails)) {
      alert("Please fill all fields and verify member.");
      return;
    }
    const payload = {
      member_id: memberId,
      role_title: roleTitle,
      tenure_start: tenureStart,
      tenure_end: tenureEnd,
      updated_by: 1,
      created_by: 1,
    };
    onSubmit(payload);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-start pt-20 z-50">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-2xl p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold">
            {initialData ? "Edit Committee Member" : "Add Committee Member"}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-600 hover:text-red-500 text-2xl"
          >
            &times;
          </button>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-gray-700 mb-1">Member ID</label>
            <div className="flex gap-2">
              <input
                type="text"
                value={memberId}
                onChange={e => setMemberId(e.target.value)}
                className="w-full px-3 py-2 border rounded"
                placeholder="Enter Member ID"
                disabled={!!initialData}
              />
              {!initialData && (
                <button
                  type="button"
                  onClick={handleFetchMember}
                  className="bg-blue-500 text-white px-4 py-2 rounded"
                  disabled={!memberId || fetching}
                >
                  {fetching ? "Fetching..." : "Fetch Member"}
                </button>
              )}
            </div>
            {fetchError && <div className="text-red-500 text-sm mt-1">{fetchError}</div>}
            {memberDetails && (
              <div className="mt-2 p-2 border rounded bg-gray-50">
                <div><b>Name:</b> {[memberDetails.firstName, memberDetails.middleName, memberDetails.surname].filter(Boolean).join(" ")}</div>
                <div><b>Mobile:</b> {memberDetails.mobileNumber}</div>
                <div><b>Email:</b> {memberDetails.emailId}</div>
              </div>
            )}
          </div>

          <div>
            <label className="block text-gray-700 mb-1">Role</label>
            <select
              value={roleTitle}
              onChange={(e) => setRoleTitle(e.target.value)}
              className="w-full px-3 py-2 border rounded"
            >
              <option value="">Select Role</option>
              {["President", "Vice President","General Secretary", "Secretary", "Treasurer", "Admin Head /Advisor to President", "Member", "Permanent Invitee", "Special Invitee"].map(
                (role, i) => (
                  <option key={i} value={role}>
                    {role}
                  </option>
                )
              )}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-gray-700 mb-1">Start Date</label>
              <input
                type="date"
                value={tenureStart}
                onChange={(e) => setTenureStart(e.target.value)}
                className="w-full px-3 py-2 border rounded"
              />
            </div>
            <div>
              <label className="block text-gray-700 mb-1">End Date</label>
              <input
                type="date"
                value={tenureEnd}
                onChange={(e) => setTenureEnd(e.target.value)}
                className="w-full px-3 py-2 border rounded"
              />
            </div>
          </div>

          <div className="text-right pt-4">
            <button
              onClick={handleSubmit}
              className="bg-theme text-white px-6 py-2 rounded-lg"
              disabled={!roleTitle || !tenureStart || !tenureEnd || (!initialData && !memberDetails)}
            >
              {initialData ? "Update" : "Create"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommitteeFormModal;