import mongoose from "mongoose";

const billingSchema = new mongoose.Schema({
  orderId: { type: mongoose.Schema.Types.ObjectId, ref: "Order", required: true },
  billNumber: { type: String, required: true, unique: true },
  memberId: { type: String },
  tableId: { type: String, required: true },
  totalAmount: { type: Number, required: true },
  paymentMethod: {
    type: String,
    enum: ["Cash", "Card", "Wallet"],
    default: "Cash"
  },
  isSettled: { type: Boolean, default: false },
  settledAt: { type: Date },
  createdAt: { type: Date, default: Date.now }
});

const Billing = mongoose.model("Billing", billingSchema);
export default Billing;
