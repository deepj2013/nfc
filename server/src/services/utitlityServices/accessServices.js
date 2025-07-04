import AccessControl from './../../models/accessModel.js'

export const createAccessServices = async (acessData) => {
    try {
      const access = new AccessControl(acessData);
      return await access.save();
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: err.message });
    }
};

export const updateAccessServices = async ({ role_id, menu_ids, created_by, updated_by }) => {
  try {
    // Remove duplicates in menu_ids
    const uniqueMenuIds = [...new Set(menu_ids)];

    // Check if role_id access already exists
    const existingAccess = await AccessControl.findOne({ role_id });

    if (existingAccess) {
      // Update existing access
      existingAccess.menu_ids = uniqueMenuIds;
      existingAccess.updated_by = updated_by;
      return await existingAccess.save();
    } else {
      // Create new access document
      const newAccess = new AccessControl({
        role_id,
        menu_ids: uniqueMenuIds,
        created_by,
        updated_by,
      });
      return await newAccess.save();
    }

  } catch (err) {
    console.error("Service Error - updateAccessServices:", err);
    throw new Error("Failed to update access control");
  }
};

