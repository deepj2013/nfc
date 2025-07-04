import {
    createCommitteeMember,
    getAllCommitteeMembers,
    getCommitteeMemberById,
    updateCommitteeMember,
    deleteCommitteeMember,
    getCurrentCommitteePublic,
  } from "../services/managingCommitteeServices.js";
  
  // ✅ Create new committee member (Admin)
  export const createCommitteeController = async (req, res, next) => {
    try {
        
        const result = await createCommitteeMember(req.body);
      
      return res.status(201).json({ msg: "Committee member created successfully", result });
    } catch (error) {
      next({ status: 400, message: error.message });
    }
  };
  
  // ✅ Get all committee members (Admin)
  export const getAllCommitteeController = async (req, res, next) => {
    try {
      const filter = req.query || {};
      const result = await getAllCommitteeMembers(filter);
      return res.status(200).json({ msg: "Committee members fetched", result });
    } catch (error) {
      next({ status: 500, message: error.message });
    }
  };
  
  // ✅ Get single committee member by ID (Admin)
  export const getCommitteeByIdController = async (req, res, next) => {
    try {
      const result = await getCommitteeMemberById(req.params.id);
      return res.status(200).json({ msg: "Committee member fetched", result });
    } catch (error) {
      next({ status: 404, message: error.message });
    }
  };
  
  // ✅ Update committee member by ID (Admin)
  export const updateCommitteeController = async (req, res, next) => {
    try {
      const result = await updateCommitteeMember(req.params.id, req.body);
      return res.status(200).json({ msg: "Committee member updated successfully", result });
    } catch (error) {
      next({ status: 400, message: error.message });
    }
  };
  
  // ✅ Delete (soft-delete) committee member (Admin)
  export const deleteCommitteeController = async (req, res, next) => {
    try {
      const result = await deleteCommitteeMember(req.params.id);
      return res.status(200).json({ msg: "Committee member marked inactive", result });
    } catch (error) {
      next({ status: 400, message: error.message });
    }
  };
  
  // ✅ Public: Get currently active committee
  export const getCurrentCommitteePublicController = async (req, res, next) => {
    try {
      const result = await getCurrentCommitteePublic();
      return res.status(200).json({ msg: "Current active committee fetched", result });
    } catch (error) {
      next({ status: 500, message: error.message });
    }
  };