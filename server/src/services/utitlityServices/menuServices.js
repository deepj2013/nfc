import Menu from "../../models/menuModel.js";
import AccessControl from "../../models/accessModel.js";

export const createMenuService = async (menuData) => {
  // Fetch the highest menuId from the collection and increment it by 1
  const lastMenu = await Menu.findOne().sort({ menuId: -1 }).exec();
  let menuId = lastMenu ? lastMenu.menuId + 1 : 1;

  // Add the new menuId to the menuData
  menuData.menuId = menuId;

  // Create a new Menu instance with the updated menuData
  const menu = new Menu(menuData);

  // Save the new menu item
  await menu.save();

  // Resolve the Promise
  return Promise.resolve(menu);
};

export const getMenusByRole = async (roleId) => {
  // Fetch the menu names for the given role from the database

  const pipeline = [
    {
      $match:
        {
          role_id: roleId
        }
    },
    {
      $lookup: {
        from: "menus",
        localField: "menu_ids",
        foreignField: "menuId",
        as: "menus"
      }
    },
    {
      $unwind: "$menus"
    },
    {
      $project:
        {
          _id: 0,
          Menu_name: "$menus.menuName",
          Menu_Id: "$menus.menuId",
          submenus: "$menus.subMenus",
          routeUrl : "$menus.routeUrl",
          iconClass: "$menus.iconClass",
          menuOrder: "$menus.menuOrder",
        }
    }
  ]

// Execute the aggregation pipeline
const result = await AccessControl.aggregate(pipeline).exec();

return result;
};

export const getAllMenus = async () => {
  return await Menu.find({ isActive: 1 });
};
