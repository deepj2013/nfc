import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";

const ChairSelectionTab = ({ selectedTable, totalChairs = 8, onGuestChange }) => {
  const [occupiedChairs, setOccupiedChairs] = useState([]);
  const [guestCount, setGuestCount] = useState(0);
  const [memberCount, setMemberCount] = useState(1); // default 1 member

  useEffect(() => {
    const totalSelected = guestCount + memberCount;
    if (totalSelected > totalChairs) {
      toast.warn("Not enough chairs available");
    } else {
      const occupied = Array.from({ length: totalSelected }, (_, i) => i + 1);
      setOccupiedChairs(occupied);
      onGuestChange({ guestCount, memberCount, extraCharge: calculateExtraCharge(guestCount) });
    }
  }, [guestCount, memberCount, totalChairs]);

  const calculateExtraCharge = (guestCount) => {
    if (guestCount <= 8) return guestCount * 100;
    return (8 * 100) + ((guestCount - 8) * 250);
  };

  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-xl font-bold mb-4">Chair Selection</h2>

      <p className="text-gray-700 mb-2">
        Table: <span className="font-medium">{selectedTable?.name || "Not Selected"}</span>
      </p>

      <div className="flex items-center gap-4 mb-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">Members</label>
          <input
            type="number"
            min={1}
            max={totalChairs}
            value={memberCount}
            onChange={(e) => setMemberCount(parseInt(e.target.value))}
            className="mt-1 border p-2 w-24 rounded"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">Guests</label>
          <input
            type="number"
            min={0}
            max={totalChairs - memberCount}
            value={guestCount}
            onChange={(e) => setGuestCount(parseInt(e.target.value))}
            className="mt-1 border p-2 w-24 rounded"
          />
        </div>
      </div>

      <div className="grid grid-cols-4 gap-2 mt-4">
        {Array.from({ length: totalChairs }, (_, i) => i + 1).map((chair) => (
          <div
            key={chair}
            className={`p-3 text-center rounded font-semibold ${
              occupiedChairs.includes(chair)
                ? "bg-green-500 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            Chair {chair}
          </div>
        ))}
      </div>

      <div className="mt-6 text-right">
        <p className="text-sm text-gray-600">
          Guests: <strong>{guestCount}</strong>, Members: <strong>{memberCount}</strong>
        </p>
        <p className="text-sm font-semibold text-blue-700">
          Extra Charges: ₹{calculateExtraCharge(guestCount)}
        </p>
      </div>
    </div>
  );
};

export default ChairSelectionTab;