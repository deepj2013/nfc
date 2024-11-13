import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { errorToast, successToast, logger } from "../../utils/Helper";
import Button from "../../components/common/Button";
import FormInput from "../../components/common/FormInput";
import {
  getMemberService,
  memberCheckInService,
  memberCheckOutService,
  guestCheckInService,
  guestCheckOutService,
} from "../../redux/thunk/memberServices"; // Assuming these services exist
import moment from "moment";

const MemberCheckInCheckOut = () => {
  const dispatch = useDispatch();
  const [memberNumber, setMemberNumber] = useState("");
  const [memberDetails, setMemberDetails] = useState(null);
  const [checkInHistory, setCheckInHistory] = useState([]);
  const [isVerifying, setIsVerifying] = useState(false);
  const [guestDetails, setGuestDetails] = useState({
    name: "",
    mobileNumber: "",
    address: "",
    facilities: [],
  });
  const [showGuestForm, setShowGuestForm] = useState(false);

  const verifyMemberHandler = async () => {
    if (!memberNumber) {
      errorToast("Please enter a member number.");
      return;
    }

    setIsVerifying(true);
    try {
      const response = await dispatch(getMemberService(memberNumber)).unwrap();
      successToast("Member verified successfully!");
      setMemberDetails(response.result); // Member details from backend
      setCheckInHistory(response.result.checkInHistory || []); // Check-in history from backend
    } catch (error) {
      logger(error);
      errorToast("Member not found. Please check the number and try again.");
    } finally {
      setIsVerifying(false);
    }
  };

  const handleCheckIn = async () => {
    try {
      await dispatch(memberCheckInService({ memberId: memberDetails.memberId })).unwrap();
      successToast("Member checked in successfully!");
      verifyMemberHandler(); // Refresh data
    } catch (error) {
      logger(error);
      errorToast("Failed to check in member.");
    }
  };

  const handleCheckOut = async () => {
    try {
      await dispatch(memberCheckOutService({ memberId: memberDetails.memberId })).unwrap();
      successToast("Member checked out successfully!");
      verifyMemberHandler(); // Refresh data
    } catch (error) {
      logger(error);
      errorToast("Failed to check out member.");
    }
  };

  const handleGuestCheckIn = async () => {
    try {
      const payload = {
        memberId: memberDetails.memberId,
        ...guestDetails,
      };
      await dispatch(guestCheckInService(payload)).unwrap();
      successToast("Guest checked in successfully!");
      setShowGuestForm(false);
      verifyMemberHandler(); // Refresh data
    } catch (error) {
      logger(error);
      errorToast("Failed to check in guest.");
    }
  };

  const handleGuestCheckOut = async (guestId) => {
    try {
      await dispatch(guestCheckOutService({ guestId })).unwrap();
      successToast("Guest checked out successfully!");
      verifyMemberHandler(); // Refresh data
    } catch (error) {
      logger(error);
      errorToast("Failed to check out guest.");
    }
  };

  const handleGuestChange = (e) => {
    const { name, value } = e.target;
    setGuestDetails((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-6">
        <h2 className="text-3xl font-bold text-gray-700 mb-6">Member Check-In/Check-Out</h2>

        <div className="flex items-center gap-4 mb-6">
          <FormInput
            width="flex-1"
            label="Enter Member Number"
            placeholder="Member Number"
            value={memberNumber}
            onChange={(e) => setMemberNumber(e.target.value)}
          />
          <Button
            name="Verify"
            width="w-auto"
            onClick={verifyMemberHandler}
            disabled={isVerifying}
            style={"bg-blue-500 hover:bg-blue-600 text-white"}
          />
        </div>

        {memberDetails && (
          <>
            <p className="text-lg font-medium">Name: <span className="font-bold">{memberDetails.name}</span></p>
            <p className="text-lg font-medium">Mobile: <span className="font-bold">{memberDetails.mobileNumber}</span></p>
            <p className="text-lg font-medium">Member ID: <span className="font-bold">{memberDetails.memberId}</span></p>
            <p className="text-lg font-medium">Dependents: <span className="font-bold">{memberDetails.dependents.length}</span></p>
          </>
        )}

        <div className="grid grid-cols-2 gap-6 mt-6">
          {/* Left Column: History */}
          <div className="bg-gray-50 p-4 rounded-lg shadow-md">
            <h3 className="text-xl font-bold mb-4">Check-In/Check-Out History</h3>
            {checkInHistory.length > 0 ? (
              <table className="min-w-full bg-white border border-gray-200 rounded-md">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="p-4 text-left text-sm font-medium text-gray-600">Date</th>
                    <th className="p-4 text-left text-sm font-medium text-gray-600">Check-In</th>
                    <th className="p-4 text-left text-sm font-medium text-gray-600">Check-Out</th>
                  </tr>
                </thead>
                <tbody>
                  {checkInHistory.map((record, idx) => (
                    <tr key={idx} className={idx % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                      <td className="p-4 text-sm text-gray-900">{moment(record.date).format("DD-MM-YYYY")}</td>
                      <td className="p-4 text-sm text-green-600">{record.checkInTime || "-"}</td>
                      <td className="p-4 text-sm text-red-600">{record.checkOutTime || "-"}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p>No history available.</p>
            )}
          </div>

          {/* Right Column: Actions */}
          <div className="bg-gray-50 p-4 rounded-lg shadow-md">
            <h3 className="text-xl font-bold mb-4">Actions</h3>
            <Button
              name="Check In"
              style="bg-green-500 hover:bg-green-600 text-white w-full mb-4"
              onClick={handleCheckIn}
            />
            <Button
              name="Check Out"
              style="bg-red-500 hover:bg-red-600 text-white w-full mb-4"
              onClick={handleCheckOut}
            />
            <Button
              name="Guest Check-In"
              style="bg-blue-500 hover:bg-blue-600 text-white w-full"
              onClick={() => setShowGuestForm(true)}
            />
          </div>
        </div>

        {/* Guest Check-In Form */}
        {showGuestForm && (
          <div className="mt-6 bg-gray-50 p-4 rounded-lg shadow-md">
            <h3 className="text-xl font-bold mb-4">Guest Check-In</h3>
            <FormInput label="Guest Name" name="name" value={guestDetails.name} onChange={handleGuestChange} />
            <FormInput label="Mobile Number" name="mobileNumber" value={guestDetails.mobileNumber} onChange={handleGuestChange} />
            <FormInput label="Address" name="address" value={guestDetails.address} onChange={handleGuestChange} />
            <FormInput
              label="Facilities"
              name="facilities"
              value={guestDetails.facilities}
              onChange={(e) => setGuestDetails((prev) => ({ ...prev, facilities: e.target.value.split(",") }))}
              placeholder="Enter comma-separated facilities"
            />
            <Button
              name="Check In Guest"
              style="bg-blue-500 hover:bg-blue-600 text-white w-full mt-4"
              onClick={handleGuestCheckIn}
            />
          </div>
        )}

        {memberDetails?.guests?.length > 0 && (
          <div className="mt-6 bg-gray-50 p-4 rounded-lg shadow-md">
            <h3 className="text-xl font-bold mb-4">Guest Check-Out</h3>
            {memberDetails.guests.map((guest, idx) => (
              <div key={idx} className="flex justify-between items-center mb-2">
                <p className="text-sm text-gray-900">{guest.name} - {guest.mobileNumber}</p>
                <Button
                  name="Check Out Guest"
                  style="bg-red-500 hover:bg-red-600 text-white text-xs"
                  onClick={() => handleGuestCheckOut(guest.guestId)}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MemberCheckInCheckOut;
