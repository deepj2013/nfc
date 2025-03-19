import { useState, useEffect } from "react";
import TableSelection from "../../user/TableSelection";
import OrderForm from "../../user/OrderForm";

const CaptainDashboard = () => {
  const [selectedTable, setSelectedTable] = useState(null);
  const [occupiedTime, setOccupiedTime] = useState({});
  const [currentMember, setCurrentMember] = useState(null);

  // Dummy table data
  const dummyTables = [
    { id: 1, name: "T1", status: "Vacant" },
    { id: 2, name: "T2", status: "Occupied", occupiedAt: "2025-03-19T12:30:00Z" },
    { id: 3, name: "T3", status: "Vacant" },
    { id: 4, name: "T4", status: "Occupied", occupiedAt: "2025-03-19T13:00:00Z" },
  ];

  // Update occupied time every second
  useEffect(() => {
    const interval = setInterval(() => {
      const newTimes = {};
      dummyTables.forEach((table) => {
        if (table.status === "Occupied" && table.occupiedAt) {
          const occupiedDuration = Math.floor((new Date() - new Date(table.occupiedAt)) / 60000);
          newTimes[table.id] = occupiedDuration;
        }
      });
      setOccupiedTime(newTimes);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-4 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Captain Dashboard</h1>

      {/* Table Selection */}
      <TableSelection 
        tables={dummyTables} 
        setSelectedTable={setSelectedTable} 
        occupiedTime={occupiedTime} 
      />

      {/* Order Form (Only shows when a table is selected) */}
      {selectedTable && (
        <OrderForm order={{ table: selectedTable.name, member: currentMember }} />
      )}
    </div>
  );
};

export default CaptainDashboard;