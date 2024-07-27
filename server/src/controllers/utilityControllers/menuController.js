import { createMenuService, getMenusByRole } from '../../services/utitlityServices/menuServices.js';

export const createMenuController = async (req, res) => {
    try {
        const menu = await createMenuService(req.body);
        res.status(201).json(menu);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const getMenusByRoleController = async (req, res) => {
    try {
        const menus = await getMenusByRole(req.params.roleId);
        res.status(200).json(menus);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};
