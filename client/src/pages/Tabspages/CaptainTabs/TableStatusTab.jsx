import React, { useEffect, useState } from "react";
import { getTablesByRestaurant } from "../../../services/facilytRestaurantTableServices";
import moment from "moment";
import { toast } from "react-toastify";

const TableOverviewTab = ({ selectedRestaurant }) => {
  const [tables, setTables] = useState([]);
  const [timers, setTimers] = useState({});

  const fetchTables = async () => {
    try {
      const res = await getTablesByRestaurant(selectedRestaurant);
      setTables(res);
    } catch (err) {
      toast.error("Failed to fetch tables");
    }
  };

  useEffect(() => {
    if (selectedRestaurant) {
      fetchTables();
    }
  }, [selectedRestaurant]);

  useEffect(() => {
    const interval = setInterval(() => {
      const newTimers = {};
      tables.forEach((t) => {
        if (t.occupiedAt) {
          const diff = moment.utc(moment().diff(moment(t.occupiedAt))).format("HH:mm:ss");
          newTimers[t.table_id] = diff;
        }
      });
      setTimers(newTimers);
    }, 1000);
    return () => clearInterval(interval);
  }, [tables]);

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
      {tables.map((table) => (
        <div
          key={table.table_id}
          className={`rounded-xl p-4 shadow text-center ${
            table.status === "Occupied" ? "bg-red-100" : "bg-green-100"
          }`}
        >
          <h4 className="text-lg font-bold">Table {table.tableNumber}</h4>
          <p className="text-sm text-gray-700">
            Status:{" "}
            <span className={table.status === "Occupied" ? "text-red-600" : "text-green-600"}>
              {table.status}
            </span>
          </p>
          {table.status === "Occupied" && (
            <p className="text-xs text-gray-500 mt-1">
              ⏱ {timers[table.table_id] || "00:00:00"}
            </p>
          )}
        </div>
      ))}
    </div>
  );
};

export default TableOverviewTab;