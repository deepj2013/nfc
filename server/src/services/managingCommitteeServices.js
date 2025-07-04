import ManagingCommittee from "../models/ManagingCommittee.js";
import { MemberData } from "../models/member_Model.js"; // Adjusted import

// ✅ Validate tenure period
const validateTenure = (start, end) => {
  if (new Date(start) >= new Date(end)) {
    throw new Error("Tenure start date must be before end date");
  }
};

// ✅ Compose full name from member data
const composeFullName = (member) => {
  return [member.firstName, member.middleName, member.surname].filter(Boolean).join(" ");
};

// ✅ Create Committee Member
export const createCommitteeMember = async (data) => {
  try {
    console.log("🟡 Input Data Received:", data);

    validateTenure(data.tenure_start, data.tenure_end);

    const member = await MemberData.findOne({ memberId: data.member_id });
    
    if (!member) {
      console.warn("⚠️ No member found with memberId:", data.member_id);
      throw new Error("Member not found");
    }

    console.log("✅ Member found:", {
      name: composeFullName(member),
      mobile: member.mobileNumber,
      email: member.emailId
    });

    const role = data.role_title.toUpperCase();

    // Only apply unique check for "President"
    if (role === "PRESIDENT") {
      const existingPresident = await ManagingCommittee.findOne({
        role_title: /president/i,
        is_active: true,
        $or: [
          {
            tenure_start: { $lte: data.tenure_end },
            tenure_end: { $gte: data.tenure_start },
          },
        ],
      });
    
      if (existingPresident) {
        throw new Error("Another President already exists during this tenure");
      }
    }

    const newEntry = new ManagingCommittee({
      ...data,
      name: composeFullName(member),
      contact_number: member.mobileNumber,
      email: member.emailId,
    });

    const saved = await newEntry.save();
    console.log("✅ Committee Member Saved:", saved);

    return saved;
  } catch (err) {
    console.error("🔥 Error in createCommitteeMember:", err.message);
    throw new Error("Create Committee Member Error: " + err.message);
  }
};

// ✅ Get All Committee Members (Admin)
export const getAllCommitteeMembers = async (filter = {}) => {
  try {
    return await ManagingCommittee.find(filter).sort({ tenure_start: -1 });
  } catch (err) {
    throw new Error("Fetch Committee Members Error: " + err.message);
  }
};

// ✅ Get One Committee Member by ID
export const getCommitteeMemberById = async (id) => {
  try {
    const data = await ManagingCommittee.findById(id);
    if (!data) throw new Error("Committee member not found");
    return data;
  } catch (err) {
    throw new Error("Get Committee Member Error: " + err.message);
  }
};

// ✅ Update Committee Member by ID
export const updateCommitteeMember = async (id, updateData) => {
  try {
    if (updateData.tenure_start && updateData.tenure_end) {
      validateTenure(updateData.tenure_start, updateData.tenure_end);
    }

    const updated = await ManagingCommittee.findByIdAndUpdate(id, updateData, { new: true });
    if (!updated) throw new Error("Committee member not found or update failed");

    return updated;
  } catch (err) {
    throw new Error("Update Committee Member Error: " + err.message);
  }
};

// ✅ Soft Delete Committee Member
export const deleteCommitteeMember = async (id) => {
  try {
    const deleted = await ManagingCommittee.findByIdAndUpdate(id, { is_active: false }, { new: true });
    if (!deleted) throw new Error("Committee member not found");
    return deleted;
  } catch (err) {
    throw new Error("Delete Committee Member Error: " + err.message);
  }
};

// ✅ Public: Get Currently Active Committee
export const getCurrentCommitteePublic = async () => {
  try {
    const today = new Date();
    return await ManagingCommittee.find({
      is_active: true,
      tenure_start: { $lte: today },
      tenure_end: { $gte: today },
    }).select("role_title name contact_number email");
  } catch (err) {
    throw new Error("Public Committee Fetch Error: " + err.message);
  }
};