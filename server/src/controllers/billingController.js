import {
    createBillService,
    settleBillService,
    getCurrentBillsService,
    getSettledBillsService,
    printInvoiceService
  } from "../services/billingServices.js";
  
  export const createBill = async (req, res) => {
    try {
      const result = await createBillService(req.body);
      res.status(201).json({ msg: "Bill created", result });
    } catch (error) {
      res.status(500).json({ msg: "Error creating bill", error: error.message });
    }
  };
  
  export const settleBill = async (req, res) => {
    try {
      const result = await settleBillService(req.params.billId, req.body.paymentMethod);
      res.status(200).json({ msg: "Bill settled", result });
    } catch (error) {
      res.status(500).json({ msg: "Error settling bill", error: error.message });
    }
  };
  
  export const getCurrentBills = async (req, res) => {
    try {
      const result = await getCurrentBillsService();
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ msg: "Failed to fetch current bills", error: error.message });
    }
  };
  
  export const getSettledBills = async (req, res) => {
    try {
      const { date, memberId, paymentMethod } = req.query;
      const result = await getSettledBillsService({ date, memberId, paymentMethod });
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ msg: "Failed to fetch settled bills", error: error.message });
    }
  };
  
  export const printInvoice = async (req, res) => {
    try {
      const result = await printInvoiceService(req.params.billId);
      
      res.status(200).json({ msg: "Invoice ready", invoice: result });
    } catch (error) {
      res.status(500).json({ msg: "Failed to generate invoice", error: error.message });
    }
  };
  