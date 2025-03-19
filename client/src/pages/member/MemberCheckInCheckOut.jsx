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
  memberCheckInOutHistory,
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
      const historyCheckin = await dispatch(
        memberCheckInOutHistory(memberNumber)
      ).unwrap();
      setCheckInHistory(historyCheckin.data.history); // Check-in history from backend
      console.log(checkInHistory, "history");
    } catch (error) {
      logger(error);
      errorToast("Member not found. Please check the number and try again.");
    } finally {
      setIsVerifying(false);
    }
  };

  const handleCheckIn = async () => {
    try {
      await dispatch(
        memberCheckInService({
          memberId: memberDetails.memberId,
          createdBy: 1,
          location: "Gate Entry",
        })
      ).unwrap();
      successToast("Member checked in successfully!");
      verifyMemberHandler(); // Refresh data
    } catch (error) {
      logger(error);
      errorToast("Failed to check in member.");
    }
  };

  const handleCheckOut = async () => {
    try {
      await dispatch(
        memberCheckOutService({
          memberId: memberDetails.memberId,
          createdBy: 1,
          location: "Restaurant",
        })
      ).unwrap();
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
    <div className="bg-gray-50 min-h-screen flex justify-center ">
      <div className="w-full bg-white shadow-lg rounded-lg p-5">
        {/* Header */}
        <h2 className="text-xl font-semibold text-gray-800 border-b pb-3 mb-4">
          Member Check-In/Check-Out
        </h2>

        {/* Input Section */}
        <div className="flex items-center gap-3 mb-4">
          <FormInput
            width="flex-1"
            label="Member ID"
            placeholder="Enter Member ID"
            value={memberNumber}
            onChange={(e) => setMemberNumber(e.target.value)}
            className="text-sm"
          />
          <Button
            name={isVerifying ? "Verifying..." : "Verify"}
            width="w-auto"
            onClick={verifyMemberHandler}
            disabled={isVerifying}
            style="bg-blue-500 hover:bg-blue-600 text-white px-3 py-2 rounded-md text-sm"
          />
        </div>

        {/* Member Info */}
        {memberDetails && (
          <div className="flex items-center bg-gray-100 p-3 rounded-md shadow-sm">
            {/* Profile Image */}
            <div className="w-14 h-14 rounded-full border bg-white overflow-hidden flex items-center justify-center mr-3">
              {memberDetails?.profilePicture ? (
                <img
                  src={memberDetails.profilePicture}
                  alt="Member"
                  className="w-full h-full object-cover"
                />
              ) : (
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg"
                  alt="No Image"
                  className="w-10 h-10"
                />
              )}
            </div>

            {/* Details */}
            <div className="flex-1 text-gray-700">
              <h4 className="text-sm font-semibold">
                {memberDetails?.title} {memberDetails?.firstName}{" "}
                {memberDetails?.middleName} {memberDetails?.surname}
              </h4>
              <p className="text-xs">
                📞 {memberDetails?.mobileNumber || "N/A"}
              </p>
            </div>

            {/* Wallet Balance */}
            <div className="flex items-center bg-white px-3 py-1 rounded-md shadow-sm text-sm">
              <span className="text-gray-700 font-semibold">Wallet:</span>
              <span className="text-blue-600 font-bold ml-2">
                ₹{memberDetails?.balance || "0.00"}
              </span>
            </div>
          </div>
        )}

        {/* History & Actions */}
        <div className="grid grid-cols-2 gap-5 mt-2">
          {/* Check-In/Check-Out History */}
          <div className="bg-gray-50 p-3 rounded-lg shadow-sm">
            <h3 className="text-md font-semibold mb-3">Check-In/Out History</h3>
            {checkInHistory.length > 0 ? (
              <table className="w-full text-xs border border-gray-200 rounded-md">
                <thead className="bg-gray-100 text-gray-600">
                  <tr>
                    <th className="p-2 text-left">Date</th>
                    <th className="p-2 text-left">location</th>
                    <th className="p-2 text-left">Check-In</th>
                    <th className="p-2 text-left">Check-Out</th>
                  </tr>
                </thead>
                <tbody>
                  {checkInHistory.map((record, idx) => (
                    <tr
                      key={idx}
                      className={idx % 2 === 0 ? "bg-gray-50" : "bg-white"}
                    >
                      <td className="p-2">
                        {moment(record.date).format("DD-MM-YYYY")}
                      </td>
                      <td className="p-2">
                        {record.location}

                      </td>
                      <td className="p-2 text-green-600">
                        {record.checkInTime
                          ? new Date(record.checkInTime).toLocaleString(
                              "en-IN",
                              {
                                timeZone: "Asia/Kolkata",
                                hour: "2-digit",
                                minute: "2-digit",
                                hour12: true,
                              }
                            )
                          : "-"}
                      </td>
                      <td className="p-2 text-red-600">
                        {record.checkOutTime
                          ? new Date(record.checkOutTime).toLocaleString(
                              "en-IN",
                              {
                                timeZone: "Asia/Kolkata",
                                hour: "2-digit",
                                minute: "2-digit",
                                hour12: true,
                              }
                            )
                          : "-"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <p className="text-sm text-gray-600">No history available.</p>
            )}
          </div>

          {/* Actions */}
          <div className="bg-gray-50 p-2 rounded-lg shadow-sm">
            <h3 className="text-md font-semibold mb-3">Actions</h3>
            <Button
              name="Check In"
              style="bg-green-500 hover:bg-green-600 text-white w-full py-2 text-sm mb-2"
              onClick={handleCheckIn}
            />
            <Button
              name="Check Out"
              style="bg-red-500 hover:bg-red-600 text-white w-full py-2 text-sm mb-2"
              onClick={handleCheckOut}
            />
            <Button
              name="Guest Check-In"
              style="bg-blue-500 hover:bg-blue-600 text-white w-full py-2 text-sm"
              onClick={() => setShowGuestForm(true)}
            />
          </div>
        </div>

        {/* Guest Check-In Form */}
        {showGuestForm && (
          <div className="mt-4 bg-gray-50 p-3 rounded-lg shadow-sm">
            <h3 className="text-md font-semibold mb-3">Guest Check-In</h3>

            <FormInput
              label="Guest Name"
              name="name"
              value={guestDetails.name}
              onChange={handleGuestChange}
              className="text-sm"
              placeholder={"Enter Guest name"}
            />
            <FormInput
              label="Mobile Number"
              name="mobileNumber"
              value={guestDetails.mobileNumber}
              onChange={handleGuestChange}
              className="text-sm"
              placeholder={"Enter Guest mobile Number"}
            />
            <FormInput
              label="Address"
              name="address"
              value={guestDetails.address}
              onChange={handleGuestChange}
              className="text-sm"
              placeholder={"Enter Guest Address"}
            />
            <FormInput
              label="Facilities"
              name="facilities"
              value={guestDetails.facilities}
              onChange={(e) =>
                setGuestDetails((prev) => ({
                  ...prev,
                  facilities: e.target.value.split(","),
                }))
              }
              placeholder="Enter comma-separated facilities"
              className="text-sm"
            />
            <Button
              name="Check In Guest"
              style="bg-blue-500 hover:bg-blue-600 text-white w-full py-2 mt-3 text-sm"
              onClick={handleGuestCheckIn}
            />
          </div>
        )}

        {/* Guest Check-Out */}
        {memberDetails?.guests?.length > 0 && (
          <div className="mt-4 bg-gray-50 p-3 rounded-lg shadow-sm">
            <h3 className="text-md font-semibold mb-3">Guest Check-Out</h3>
            {memberDetails.guests.map((guest, idx) => (
              <div
                key={idx}
                className="flex justify-between items-center mb-2 text-sm"
              >
                <p className="text-gray-700">
                  {guest.name} - {guest.mobileNumber}
                </p>
                <Button
                  name="Check Out Guest"
                  style="bg-red-500 hover:bg-red-600 text-white px-3 py-1 text-xs"
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
