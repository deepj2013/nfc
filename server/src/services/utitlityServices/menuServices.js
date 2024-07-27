import Menu from '../../models/menuModel.js';
import { getRoleMenus } from '../../helpers/utilityHelper/roleHelper.js'

export const createMenuService = async (menuData) => {
    const menu = new Menu(menuData);
    return await menu.save();
};






export const getMenusByRole = async (roleId) => {
    const roleMenuNames = getRoleMenus(roleId);
    return await Menu.find({ menuName: { $in: roleMenuNames }, isActive: 1 });
};
