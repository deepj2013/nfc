import {createAccessServices, updateAccessServices } from '../../services/utitlityServices/accessServices.js'

import Menu from "../../models/menuModel.js";

export const createAccessController = async (req, res) => {
    try {
        const { role_id, menu_ids, created_by, updated_by } = req.body;
        let AccessData = { role_id, menu_ids, created_by, updated_by}
        const accessControl = await createAccessServices(AccessData);
       
        res.status(200).json(accessControl);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};



export const updateAccessController = async (req, res) => {
  try {
    const { role_id, menu_ids, created_by, updated_by } = req.body;

    // Validation
    if (!role_id || !Array.isArray(menu_ids) || menu_ids.length === 0) {
      return res.status(400).json({ error: "role_id and valid menu_ids are required" });
    }

    // Validate menu_ids: check if all menus exist
    const validMenus = await Menu.find({ menuId: { $in: menu_ids } }).distinct("menuId");
    const invalidMenuIds = menu_ids.filter(id => !validMenus.includes(id));
    if (invalidMenuIds.length > 0) {
      return res.status(400).json({ error: `Invalid menu_ids: ${invalidMenuIds.join(", ")}` });
    }

    const payload = { role_id, menu_ids, created_by, updated_by };

    const result = await updateAccessServices(payload);
    res.status(200).json({ message: "Access updated successfully", result });

  } catch (err) {
    console.error("Update Access Error:", err);
    res.status(500).json({ error: "Internal server error" });
  }
};