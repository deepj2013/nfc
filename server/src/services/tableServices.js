import OccupiedTable from "../models/facility_restaurant_occuipied_table.js";
import {
  validateMember,
  validateRestaurantTable,
  validateRestaurant
} from "../utils/validators.js";

export const assignTableService = async (data) => {
  // Validate member
  await validateMember(data.memberId);

  // Validate restaurant
  await validateRestaurant(data.restaurant_id);

  // Validate table and its relation to restaurant
  await validateRestaurantTable(data.table_id, data.restaurant_id);

  // Check if table is already occupied
  const activeLog = await OccupiedTable.findOne({
    table_id: data.table_id,
    status: "Occupied"
  });
  if (activeLog) throw new Error("Table is already occupied");
  const table = await validateRestaurantTable(data.table_id, data.restaurant_id);

  if (table.currentStatus !== "Available") {
    throw new Error("Table is not available for assignment");
  }
  // Proceed to create log
  const newEntry = new OccupiedTable({
    table_id: data.table_id,
    restaurant_id: data.restaurant_id,
    memberId: data.memberId,
    assignedBy: data.assignedBy
  });

  return await newEntry.save();
};

export const releaseTableService = async (table_id) => {
  const record = await OccupiedTable.findOne({ table_id, status: "Occupied" });
  if (!record) throw new Error("No active occupancy found for this table");

  record.status = "Released";
  record.releasedAt = new Date();

  return await record.save();
};

// export const releaseTableService = async (table_id) => {
//   console.log(table_id)
//   // ✅ Step 1: Validate table exists
//   const table = await RestaurantTable.findOne({ table_id });
//   if (!table) throw new Error("Invalid Table ID");

//   // ✅ Step 2: Find active occupancy log
//   const activeRecord = await OccupiedTable.findOne({ table_id, status: "Occupied" });
//   if (!activeRecord) throw new Error("No active occupancy found for this table");

//   // ✅ Step 3: Mark as Released
//   activeRecord.status = "Released";
//   activeRecord.releasedAt = new Date();
//   await activeRecord.save();

//   // ✅ Step 4: Optionally update the table's current status
//   table.currentStatus = "Available";
//   await table.save();

//   return {
//     msg: "Table released successfully",
//     releasedLog: activeRecord,
//   };
// };

export const getActiveOccupiedTablesService = async () => {
  return await OccupiedTable.find({ status: "Occupied" }).sort({ occupiedAt: -1 });
};

export const getOccupiedDurationService = async (table_id) => {
  const record = await OccupiedTable.findOne({ table_id, status: "Occupied" });
  if (!record || !record.occupiedAt) throw new Error("Table is not currently occupied");

  const now = new Date();
  const minutes = Math.floor((now - record.occupiedAt) / 60000);
  return { table_id, durationInMinutes: minutes };
};
