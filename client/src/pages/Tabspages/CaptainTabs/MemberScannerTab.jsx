import { useState } from "react";
import { useDispatch } from "react-redux";
import { getMemberService } from "../../../redux/thunk/useMangementServices";
import { toast } from "react-toastify";

const MemberScannerTab = ({ memberInfo, setMemberInfo }) => {
  const [memberIdInput, setMemberIdInput] = useState("");
  const dispatch = useDispatch();

  const handleMemberScan = async () => {
    try {
      const response = await dispatch(getMemberService(memberIdInput)).unwrap();
      setMemberInfo(response.result);
      toast.success("Member verified!");
    } catch (err) {
      toast.error("Invalid Member ID");
      setMemberInfo(null);
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold text-gray-700">Scan Member QR / Enter ID</h2>

      <div className="flex items-center gap-3">
        <input
          type="text"
          value={memberIdInput}
          onChange={(e) => setMemberIdInput(e.target.value)}
          placeholder="Enter Member ID"
          className="border px-3 py-2 rounded w-full max-w-sm"
        />
        <button
          onClick={handleMemberScan}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Verify
        </button>
      </div>

      {memberInfo && (
        <div className="flex gap-4 items-center mt-4 p-4 border rounded shadow bg-gray-50">
          <img
            src={memberInfo?.photo || "https://via.placeholder.com/80"}
            alt="Member"
            className="w-20 h-20 rounded-full object-cover border"
          />
          <div>
            <p className="text-lg font-bold">{`${memberInfo.title || ""} ${memberInfo.firstName || ""} ${memberInfo.surname || ""}`}</p>
            <p className="text-sm text-gray-600">Mobile: {memberInfo.mobileNumber}</p>
            <p className="text-sm text-green-600 font-semibold">Wallet: ₹{memberInfo.balance}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default MemberScannerTab;