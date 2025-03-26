import {
    assignTableService,
    releaseTableService,
    getActiveOccupiedTablesService,
    getOccupiedDurationService
  } from "../services/tableServices.js";
  
  export const assignTable = async (req, res) => {
    try {
      const result = await assignTableService(req.body);
      res.status(201).json({ msg: "Table assigned", result });
    } catch (error) {
      res.status(400).json({ msg: "Failed to assign table", error: error.message });
    }
  };
  
  export const releaseTable = async (req, res) => {
    try {
      const result = await releaseTableService(req.params.table_id);
      res.status(200).json({ msg: "Table released", result });
    } catch (error) {
      res.status(500).json({ msg: "Failed to release table", error: error.message });
    }
  };
  
  export const getActiveOccupiedTables = async (req, res) => {
    try {
      const result = await getActiveOccupiedTablesService();
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ msg: "Failed to fetch active occupied tables", error: error.message });
    }
  };
  
  export const getOccupiedDuration = async (req, res) => {
    try {
      const result = await getOccupiedDurationService(req.params.table_id);
      res.status(200).json(result);
    } catch (error) {
      res.status(500).json({ msg: "Failed to get duration", error: error.message });
    }
  };
  