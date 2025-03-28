import Billing from "../models/billingModel.js";
import Order from "../models/orderModel.js";
import { v4 as uuidv4 } from "uuid";

export const createBillService = async ({ orderId, orderNumber, tableId, memberId, totalAmount }) => {
  const billNumber = "BILL-" + uuidv4().slice(0, 8).toUpperCase();

  const newBill = new Billing({
    orderId,
    orderNumber,
    tableId,
    memberId,
    totalAmount,
    billNumber
  });

  return await newBill.save();
};

export const settleBillService = async (billId, paymentMethod) => {
  const bill = await Billing.findById(billId);
  if (!bill) throw new Error("Bill not found");
  if (bill.isSettled) throw new Error("Bill already settled");

  bill.paymentMethod = paymentMethod;
  bill.isSettled = true;
  bill.settledAt = new Date();

  return await bill.save();
};

export const getCurrentBillsService = async () => {
  return await Billing.find({ isSettled: false }).sort({ createdAt: -1 });
};

export const getSettledBillsService = async ({ date, memberId, paymentMethod }) => {
  const query = { isSettled: true };
  if (date) query.settledAt = { $gte: new Date(date), $lte: new Date(date + "T23:59:59") };
  if (memberId) query.memberId = memberId;
  if (paymentMethod) query.paymentMethod = paymentMethod;

  return await Billing.find(query).sort({ settledAt: -1 });
};




export const printInvoiceService = async (billId) => {
  
  const bill = await Billing.findOne({ billNumber: billId }).populate("orderId");

if (!bill) throw new Error("Bill not found");
console.log(bill)
  const order = bill.orderId;

console.log(order)
  const items = order.items.map((item) => {
    const total = item.price * item.quantity;
    return {
      name: item.name,
      qty: item.quantity,
      rate: item.price,
      total: total.toFixed(2)
    };
  });

  const subtotal = items.reduce((acc, cur) => acc + parseFloat(cur.total), 0);
  const cgst = +(subtotal * 0.025).toFixed(2);
  const sgst = +(subtotal * 0.025).toFixed(2);
  const grandTotal = +(subtotal + cgst + sgst).toFixed(2);

  const invoice = {
    billNumber: bill.billNumber,
    date: new Date().toLocaleString("en-IN"),
    table: bill.tableId,
    memberId: bill.memberId,
    paymentMode: bill.paymentMethod,
    items,
    subtotal: subtotal.toFixed(2),
    cgst,
    sgst,
    grandTotal,
    footerNote: "Thank you! Visit Again!"
  };

  return invoice;
};