import React, { useEffect, useState } from "react";
import { getMemberService } from "../../redux/thunk/useMangementServices";
import { useDispatch } from "react-redux";
import {
  getAllRestaurantDetail,
  getTablesByRestaurant,
} from "../../services/facilytRestaurantTableServices";

const TopBar = ({ memberId, setMemberId, selectedRestaurant, setSelectedRestaurant, selectedTable, setSelectedTable, setMemberDetails }) => {
  const dispatch = useDispatch();
  const [memberInfo, setMemberInfo] = useState(null);
  const [restaurants, setRestaurants] = useState([]);
  const [tables, setTables] = useState([]);

  useEffect(() => {
    loadRestaurants();
  }, []);

  const loadRestaurants = async () => {
    const data = await getAllRestaurantDetail();
    setRestaurants(data);
  };

  const handleRestaurantChange = async (restId) => {
    setSelectedRestaurant(restId);
    const tableData = await getTablesByRestaurant(restId);
    setTables(tableData);
  };

  const fetchMemberDetails = async () => {
    try {
      const res = await dispatch(getMemberService(memberId)).unwrap();
      if (res?.msg === "Member details fetched successfully") {
        const m = res.result;
        const fullName = [m.title, m.firstName, m.middleName, m.surname].filter(Boolean).join(" ");
        const member = {
          name: fullName,
          mobile: m.mobileNumber,
          wallet: m.balance,
          image: m.profileImage || "https://via.placeholder.com/100x100.png?text=No+Image"
        };
        setMemberInfo(member);
        setMemberDetails(member); // To send back to parent
      }
    } catch (err) {
      console.error("Error fetching member details:", err);
    }
  };

  return (
    <div className="flex flex-wrap items-end justify-between bg-white p-4 rounded-lg shadow mb-4">
      {/* Member ID Section */}
      <div className="flex items-end gap-3">
        <div>
          <label className="block text-sm font-semibold text-gray-600">Member ID</label>
          <input
            value={memberId}
            onChange={(e) => setMemberId(e.target.value)}
            className="border p-2 rounded w-40"
            placeholder="Enter Member ID"
          />
        </div>
        <button
          onClick={fetchMemberDetails}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
        >
          Fetch
        </button>
      </div>

      {/* Member Info Box */}
      {memberInfo && (
        <div className="flex items-center gap-3 border p-2 rounded bg-gray-50 shadow">
          <img
            src={memberInfo.image}
            alt="Member"
            className="w-12 h-12 object-cover rounded-full border"
          />
          <div>
            <p className="font-bold">{memberInfo.name}</p>
            <p className="text-sm text-gray-600">📞 {memberInfo.mobile}</p>
            <p className="text-sm text-green-600 font-semibold">Wallet ₹{memberInfo.wallet}</p>
          </div>
        </div>
      )}

      {/* Restaurant Dropdown */}
      <div>
        <label className="block text-sm font-semibold text-gray-600">Select Restaurant</label>
        <select
          className="border p-2 rounded w-52"
          value={selectedRestaurant}
          onChange={(e) => handleRestaurantChange(e.target.value)}
        >
          <option value="">-- Select --</option>
          {restaurants.map((r) => (
            <option key={r.restaurant_id} value={r.restaurant_id}>
              {r.name}
            </option>
          ))}
        </select>
      </div>

      {/* Table Dropdown */}
      <div>
        <label className="block text-sm font-semibold text-gray-600">Select Table</label>
        <select
          className="border p-2 rounded w-52"
          value={selectedTable}
          onChange={(e) => setSelectedTable(e.target.value)}
        >
          <option value="">-- Select Table --</option>
          {tables.map((t) => (
            <option key={t.table_id} value={t.table_id}>
              Table {t.table_id}
            </option>
          ))}fxda
        </select>
      </div>
    </div>
  );
};

export default TopBar;