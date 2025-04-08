import axios from "axios";
import {BASE} from "../utils/Urls"


// Fetch Member Wallet
export const fetchWalletBalance = async (memberId) => {
  const res = await axios.get(`${BASE}wallet/balance/${memberId}`);
  return res.data;
};

// Assign Table
export const assignTableToMember = async (payload) => {
  return await axios.post(`${BASE}occupied/assign`, payload);
};

// Release Table
export const releaseTable = async (table_id) => {
  return await axios.patch(`${BASE}occupied/release/${table_id}`);
};

// Place Order
export const placeOrder = async (payload) => {
  return await axios.post(`${BASE}orders/place`, payload);
};

// Generate Bill
export const createBill = async (payload) => {
  return await axios.post(`${BASE}billing/create`, payload);
};

// Settle Bill
export const settleBill = async (billId, method) => {
  return await axios.patch(`${BASE}billing/settle/${billId}`, { paymentMethod: method });
};

// Print Invoice
export const printInvoice = async (billId) => {
  return await axios.post(`${BASE}billing/print-invoice/${billId}`);
};

// Get Current Bills
export const getCurrentBills = async () => {
  return await axios.get(`${BASE}billing/current`);
};

// Get Member Transaction History
export const getTransactionHistory = async (memberId) => {
  return await axios.get(`${BASE}member/${memberId}/transactions`);
};

export const getAllOrders = async () => {
  return await axios.get(`${BASE}orders/allorders`);
};

export const getSettledBills = async () => {
  return await axios.get(`${BASE}billing/settled`);
};

export const getOrderById = async (orderId) => {
  return await axios.get(`${BASE}orders/${orderId}`);
  
};

export const getInvoiceById = async (billId) => {
  return await axios.get(`${BASE}billing/print-invoice/${billId}`);
};

export const getOrgDetail = async () =>{
  return await axios.get(`${BASE}user/organisation`)
}

export const getKitchenOrders = async (restaurantId) => {
  return await axios.get(`${BASE}kitchen/orders`, {
    params: {
      restaurant_id: restaurantId
    }
  });
};
// export const getKitchenOrders = async (restaurantId) =>{ return await axios.get(`${BASE}kitchen/orders/${restaurantId}`) }

export const updateKitchenOrderStatus = async (orderId, payload) => {
  console.log(orderId, "dat", payload)
  return await axios.patch(`${BASE}kitchen/update-status/${orderId}`, payload);
};

export const updateKitchenOrderItemStatus = async (itemId,orderId, payload) => {
  return await axios.patch(`${BASE}kitchen/update-itemstatus/${orderId}/${itemId}`, payload);
};