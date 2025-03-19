import React from "react";

const TableSelection = ({ tables, setSelectedTable, occupiedTime }) => {
  return (
    <div className="grid grid-cols-4 gap-4">
      {tables.map((table) => (
        <div
          key={table.id}
          className={`p-4 rounded-lg shadow-md cursor-pointer text-center transition ${
            table.status === "Vacant" ? "bg-green-100 hover:bg-green-200" : "bg-red-100 hover:bg-red-200"
          }`}
          onClick={() => setSelectedTable(table)}
        >
          <h2 className="text-lg font-semibold">{table.name}</h2>
          <p className="text-sm">{table.status}</p>
          {table.status === "Occupied" && (
            <p className="text-xs text-gray-600">Occupied: {occupiedTime[table.id] || 0} mins</p>
          )}
        </div>
      ))}
    </div>
  );
};

export default TableSelection;