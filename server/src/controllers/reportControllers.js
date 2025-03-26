import { getDailySalesService, getMemberReportService, getPaymentModeBreakdownService, getTableUsageService, getTopItemsService } from "../services/reportServices.js";

  
  export const getDailySales = async (req, res) => {
    try {
      const result = await getDailySalesService(req.query.date);
      res.status(200).json(result);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  
  export const getTableUsage = async (req, res) => {
    try {
      const result = await getTableUsageService();
      res.status(200).json(result);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  
  export const getTopItems = async (req, res) => {
    try {
      const result = await getTopItemsService();
      res.status(200).json(result);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  
  export const getPaymentModeBreakdown = async (req, res) => {
    try {
      const result = await getPaymentModeBreakdownService();
      res.status(200).json(result);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };
  
  export const getMemberReport = async (req, res) => {
    try {
      const result = await getMemberReportService(req.params.memberId);
      res.status(200).json(result);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };