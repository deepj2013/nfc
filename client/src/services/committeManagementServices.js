import axios from "axios";
import { BASE } from "../utils/Urls";
const API_BASE = `${BASE}mgmt`; // Updated path


export const getAllMemberList = async () => {
  try {
    const res = await axios.get(`${BASE}user/members`);
    return res.data;
  } catch (err) {
    throw err.response?.data?.error || "Failed to fetch member list";
  }
};


// ✅ Create committee member
export const createCommittee = async (data) => {
  try {
    const res = await axios.post(`${API_BASE}/admin/committee`, data);
    return res.data;
  } catch (err) {
    throw err.response?.data?.error || "Failed to create committee member";
  }
};

// ✅ Get all committee members (admin)
export const getAllCommittee = async () => {
  try {
    const res = await axios.get(`${API_BASE}/admin/committee`);
    return res.data;
  } catch (err) {
    throw err.response?.data?.error || "Failed to fetch committee members";
  }
};

// ✅ Get single committee member by ID
export const getCommitteeById = async (id) => {
  try {
    const res = await axios.get(`${API_BASE}/admin/committee/${id}`);
    return res.data;
  } catch (err) {
    throw err.response?.data?.error || "Failed to fetch committee member";
  }
};

// ✅ Update committee member
export const updateCommittee = async (id, data) => {
  try {
    const res = await axios.put(`${API_BASE}/admin/committee/${id}`, data);
    return res.data;
  } catch (err) {
    throw err.response?.data?.error || "Failed to update committee member";
  }
};

// ✅ Delete (soft delete)
export const deleteCommittee = async (id) => {
  try {
    const res = await axios.delete(`${API_BASE}/admin/committee/${id}`);
    return res.data;
  } catch (err) {
    throw err.response?.data?.error || "Failed to delete committee member";
  }
};

// ✅ Public: get current active committee
export const getPublicCommittee = async () => {
  try {
    const res = await axios.get(`${API_BASE}/public/committee`);
    return res.data;
  } catch (err) {
    throw err.response?.data?.error || "Failed to fetch public committee list";
  }
};