// import mongoose from "mongoose";

// const occupiedTableSchema = new mongoose.Schema(
//   {
//     restaurant_id: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Restaurant",
//       required: true,
//     },
//     table_id: {
//       type: String,
//       required: true,
//     },
//     startTime: {
//       type: Date,
//       required: true,
//       default: Date.now,
//     },
//     endTime: {
//       type: Date,
//       default: null,
//     },
//     menuItems: [
//       {
//         item_id: {
//           type: mongoose.Schema.Types.ObjectId,
//           ref: "MenuItem",
//           required: true,
//         },
//         name: {
//           type: String,
//           required: true,
//         },
//         quantity: {
//           type: Number,
//           required: true,
//           min: 1,
//         },
//         price: {
//           type: Number,
//           required: true,
//         },
//       },
//     ],
//     totalAmount: {
//       type: Number,
//       required: true,
//       default: 0,
//     },
//   },
//   { timestamps: true }
// );

// const OccupiedTable = mongoose.model("OccupiedTable", occupiedTableSchema);
// export default OccupiedTable;

import mongoose from "mongoose";

const occupiedTableSchema = new mongoose.Schema(
  {
    table_id: { type: String, required: true }, // Link to RestaurantTable
    restaurant_id: { type: Number, required: true },
    memberId: { type: String, required: false },
    occupiedAt: { type: Date, default: Date.now },
    releasedAt: { type: Date, default: null },
    status: {
      type: String,
      enum: ["Occupied", "Released"],
      default: "Occupied"
    },
    assignedBy: { type: String, enum: ["Captain", "POS", "Rider"], required: true }
  },
  { timestamps: true }
);

const OccupiedTable = mongoose.model("OccupiedTable", occupiedTableSchema);
export default OccupiedTable;
