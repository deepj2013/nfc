import { createMenuService, getMenusByRole, getAllMenus } from '../../services/utitlityServices/menuServices.js';

export const createMenuController = async (req, res) => {
    try {
        const menu = await createMenuService(req.body);
        res.status(201).json(menu);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const getAllMenusController = async (req, res) => {
    try {
      
        const menus = await getAllMenus();

        res.status(200).json(menus);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
export const getMenusByRoleController = async (req, res) => {
    try {
      
        let role_Id = req.body.role_id; 
        const menus = await getMenusByRole(role_Id);
        res.status(200).json(menus);
    } catch (err) {
        console.error('Error fetching menus:', err);
        res.status(500).json({ error: err.message });
    }
};
