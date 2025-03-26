

import Billing from "../models/billingModel.js";
import OccupiedTable from "../models/facility_restaurant_occuipied_table.js";
import { MemberTransactionHistory, Wallet } from "../models/member_Model.js";
import Order from "../models/orderModel.js";

export const getDailySalesService = async (date) => {
  const from = new Date(date + "T00:00:00");
  const to = new Date(date + "T23:59:59");

  const result = await Billing.aggregate([
    { $match: { settledAt: { $gte: from, $lte: to }, isSettled: true } },
    { $group: { _id: null, totalSales: { $sum: "$totalAmount" }, count: { $sum: 1 } } }
  ]);

  return result[0] || { totalSales: 0, count: 0 };
};

export const getTableUsageService = async () => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const tables = await OccupiedTable.find({ occupiedAt: { $gte: today } });

  const summary = tables.map((entry) => {
    const duration = entry.releasedAt
      ? Math.floor((new Date(entry.releasedAt) - new Date(entry.occupiedAt)) / 60000)
      : Math.floor((Date.now() - new Date(entry.occupiedAt)) / 60000);

    return {
      table_id: entry.table_id,
      memberId: entry.memberId,
      durationInMinutes: duration
    };
  });

  return summary;
};

export const getTopItemsService = async () => {
  const result = await Order.aggregate([
    { $unwind: "$items" },
    { $group: { _id: "$items.name", totalQty: { $sum: "$items.quantity" } } },
    { $sort: { totalQty: -1 } },
    { $limit: 10 }
  ]);
  return result;
};

export const getPaymentModeBreakdownService = async () => {
  const result = await Billing.aggregate([
    { $match: { isSettled: true } },
    { $group: { _id: "$paymentMethod", total: { $sum: "$totalAmount" } } }
  ]);
  return result;
};

export const getMemberReportService = async (memberId) => {
  const transactions = await MemberTransactionHistory.find({ memberId }).sort({ createdAt: -1 });
  const walletData = await Wallet.findOne({ memberId });

  return {
    walletBalance: walletData?.balance || 0,
    transactions
  };
};