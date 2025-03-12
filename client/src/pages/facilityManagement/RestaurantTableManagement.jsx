import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  getTablesByRestaurant,
  addTable,
  updateTable,
  changeTableStatus,
  getRestaurantDetails,
} from "../../services/facilytRestaurantTableServices";
// import {
//   startOccupation,
//   endOccupation,
//   getOccupiedTableDetails,
// } from "../../services/occupiedTableService";
import Button from "../../components/common/Button";
import {
  Card,
  CardContent,
  Modal,
} from "../../components/common/CommonComponent";
import Input from "../../components/common/Input";

const TableManagement = () => {
  const { restaurantId } = useParams();
  const [tables, setTables] = useState([]);
  const [restaurant, setRestaurant] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedTable, setSelectedTable] = useState(null);
  const [newTableData, setNewTableData] = useState({ seatType: "" });
  const [occupiedData, setOccupiedData] = useState({});
  const [menuItems, setMenuItems] = useState([]);
  const [occupiedTimers, setOccupiedTimers] = useState({});
  
  const handleChairClick = (table) => {
    if (table.currentStatus === "Occupied") {
      const confirmChange = window.confirm(
        "Do you want to mark this table as available?"
      );
      if (confirmChange) {
        changeTableStatus(table.table_id, "Available");
        setOccupiedTimers((prev) => ({ ...prev, [table.table_id]: null }));
      }
    } else {
      changeTableStatus(table.table_id, "Occupied");
      setOccupiedTimers((prev) => ({ ...prev, [table.table_id]: Date.now() }));
    }
  };

  // Function to calculate elapsed time
  const calculateTimeElapsed = (startTime) => {
    if (!startTime) return "0:00";
    const elapsed = Math.floor((Date.now() - startTime) / 1000);
    const minutes = Math.floor(elapsed / 60);
    const seconds = elapsed % 60;
    return `${minutes}:${seconds < 10 ? `0${seconds}` : seconds}`;
  };

  // Update Timer Every Second
  useEffect(() => {
    const interval = setInterval(() => {
      setOccupiedTimers((prev) => ({ ...prev }));
    }, 1000);

    return () => clearInterval(interval);
  }, []);
  useEffect(() => {
    fetchRestaurantDetails();
    fetchTables();
  }, [restaurantId]);

  const fetchRestaurantDetails = async () => {
    try {
      const data = await getRestaurantDetails(restaurantId);
      setRestaurant(data);
    } catch (error) {
      console.error("Failed to fetch restaurant details", error);
    }
  };

  const fetchTables = async () => {
    try {
      const data = await getTablesByRestaurant(restaurantId);
      setTables(data);
    } catch (error) {
      console.error("Failed to fetch tables", error);
    }
  };

  const handleAddTable = async (restaurantId, newTableData) => {
    try {
      await addTable(restaurantId, newTableData);
      setModalOpen(false);
      fetchTables();
    } catch (error) {
      console.error("Error adding table", error);
    }
  };

  const handleUpdateTable = async (table_id, newTableData) => {
    try {
      await updateTable(selectedTable.table_id, newTableData);
      setModalOpen(false);
      fetchTables();
    } catch (error) {
      console.error("Error updating table", error);
    }
  };

  const handleChangeStatus = async (tableId, status) => {
    try {
      await changeTableStatus(tableId, status);
      fetchTables();
    } catch (error) {
      console.error("Error changing status", error);
    }
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-6 p-4 border rounded-lg shadow-md bg-white">
        <h2 className="text-2xl font-bold text-gray-800 border px-4 py-2 rounded-full">
          {restaurant?.name}
        </h2>
        <Button
          onClick={() => setModalOpen(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg flex items-center gap-2 shadow-md hover:bg-blue-600"
          name={
            <>
              <i className="ri-add-line text-lg"></i>
              <span className="hidden sm:inline"> + Add Table</span>
            </>
          }
        />
      </div>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-blue-100 text-blue-800 p-4 rounded-lg shadow-md flex flex-col items-center border">
          <h3 className="text-lg font-semibold">Total Tables</h3>
          <p className="text-2xl font-bold">{tables.length}</p>
        </div>
        <div className="bg-green-100 text-green-800 p-4 rounded-lg shadow-md flex flex-col items-center border">
          <h3 className="text-lg font-semibold">Total Capacity</h3>
          <p className="text-2xl font-bold">
            {tables.reduce((sum, table) => sum + table.seatType, 0)}
          </p>
        </div>
        <div className="bg-red-100 text-red-800 p-4 rounded-lg shadow-md flex flex-col items-center border">
          <h3 className="text-lg font-semibold">Occupied</h3>
          <p className="text-2xl font-bold">
            {tables.filter((t) => t.currentStatus === "Occupied").length}
          </p>
        </div>
        <div className="bg-yellow-100 text-yellow-800 p-4 rounded-lg shadow-md flex flex-col items-center border">
          <h3 className="text-lg font-semibold">Available</h3>
          <p className="text-2xl font-bold">
            {tables.filter((t) => t.currentStatus === "Available").length} Table
          </p>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-4 mt-10">
        {tables.map((table) => {
          const totalChairs = table.seatType;
          const halfChairs = Math.floor(totalChairs / 2);
          const isOdd = totalChairs % 2 !== 0;

          return (
            <div
              key={table.table_id}
              className="flex flex-col items-center justify-center p-4 border rounded-lg shadow-md bg-white relative"
            >
              {/* Table Name at the Top */}
              <h3 className="absolute -top-6 text-gray-700 font-semibold bg-white px-3 py-1 rounded-md shadow-md">
                {table.table_id}
              </h3>

              {/* Top Chairs */}
              <div className="flex gap-4 mb-2">
                {Array.from({ length: halfChairs }).map((_, index) => (
                  <button
                    key={`top-${index}`}
                    className={`w-10 h-10 rounded-full border-2 transition-all duration-200 ${
                      table.currentStatus === "Occupied"
                        ? "bg-red-500 border-red-700 animate-pulse"
                        : "bg-green-500 border-green-700 hover:scale-110"
                    }`}
                    onClick={() => handleChairClick(table)}
                  />
                ))}
              </div>

              <div className="flex items-center justify-center relative">
                {/* Left Chair if Odd */}
                {isOdd && (
                  <button
                    className={`w-10 h-10 rounded-full border-2 transition-all duration-200 absolute -left-10 ${
                      table.currentStatus === "Occupied"
                        ? "bg-red-500 border-red-700 animate-pulse"
                        : "bg-green-500 border-green-700 hover:scale-110"
                    }`}
                    onClick={() => handleChairClick(table)}
                  />
                )}

                {/* Table in the Center */}
                <div
                  className={`${
                    isOdd ? "w-28 h-16" : "w-20 h-20"
                  } bg-gray-900 text-white flex items-center justify-center rounded-lg shadow-lg`}
                >
                  <span className="text-xl font-bold">
                    T-{table.tableNumber}
                  </span>
                </div>

                {/* Right Chair */}
                <button
                  className={`w-10 h-10 rounded-full border-2 transition-all duration-200 absolute -right-10 ${
                    table.currentStatus === "Occupied"
                      ? "bg-red-500 border-red-700 animate-pulse"
                      : "bg-green-500 border-green-700 hover:scale-110"
                  }`}
                  onClick={() => handleChairClick(table)}
                />
              </div>

              {/* Bottom Chairs */}
              <div className="flex gap-4 mt-2">
                {Array.from({ length: halfChairs }).map((_, index) => (
                  <button
                    key={`bottom-${index}`}
                    className={`w-10 h-10 rounded-full border-2 transition-all duration-200 ${
                      table.currentStatus === "Occupied"
                        ? "bg-red-500 border-red-700 animate-pulse"
                        : "bg-green-500 border-green-700 hover:scale-110"
                    }`}
                    onClick={() => handleChairClick(table)}
                  />
                ))}
              </div>

              {/* Timer Display if Occupied */}
              {table.currentStatus === "Occupied" && (
                <div className="mt-3 text-red-500 bg-gray-200 px-4 py-2 rounded-md shadow-md">
                  <p className="font-semibold">
                    Occupied for: {calculateTimeElapsed(table.startTime)}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Modal for Adding/Editing Table */}
      {modalOpen && (
        <Modal
          onClose={() => {
            setModalOpen(false);
            setSelectedTable(null);
          }}
        >
          <h2 className="text-2xl font-bold">
            {selectedTable ? "Edit Table" : "Add Table"}
          </h2>
          <Input
            type="text"
            placeholder="Table ID"
            value={
              selectedTable
                ? selectedTable.table_id
                : `${restaurant?.name?.substring(0, 5).toUpperCase()}-T${
                    tables.length + 1
                  }`
            }
            disabled
          />
          <Input
            type="text"
            placeholder="Restaurant ID"
            value={restaurantId}
            disabled
          />
          <Input
            type="number"
            placeholder="Table Number"
            value={
              selectedTable ? selectedTable.tableNumber : tables.length + 1
            }
            onChange={(e) =>
              setNewTableData({ ...newTableData, tableNumber: e.target.value })
            }
          />
          <select
            value={newTableData.seatType}
            onChange={(e) =>
              setNewTableData({ ...newTableData, seatType: e.target.value })
            }
            className="border rounded-lg p-2 w-full"
          >
            <option value="2">2-Seater</option>
            <option value="3">3-Seater</option>
            <option value="4">4-Seater</option>
            <option value="5">5-Seater</option>
            <option value="6">6-Seater</option>
            <option value="7">7-Seater</option>
            <option value="8">8-Seater</option>
            <option value="9">9-Seater</option>
            <option value="10">10-Seater</option>
          </select>
          <Button
            onClick={() =>
              selectedTable
                ? handleUpdateTable(selectedTable.table_id, newTableData)
                : handleAddTable(restaurantId, newTableData)
            }
            name={selectedTable ? "Update Table" : "Add Table"}
          >
            {selectedTable ? "Update Table" : "Add Table"}
          </Button>
        </Modal>
      )}
    </div>
  );
};

export default TableManagement;
