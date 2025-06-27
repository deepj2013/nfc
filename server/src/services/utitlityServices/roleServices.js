import Role from '../../models/roleModel.js';
// import { getRoleMenus } from '../../helpers/utilityHelper/roleHelper.js'

export const createRoleService = async (roleData) => {
    // Find the last role by sorting role_id in descending order
    const lastRole = await Role.findOne().sort({ role_id: -1 }).exec();
    
    // If a role exists, increment role_id by 1; otherwise, start from 1
    let role_id = lastRole ? lastRole.role_id + 1 : 1;
    roleData.role_id = role_id;

    // Create and save the new role
    const role = new Role(roleData);
    return await role.save();
};

export const getRoleService = async () => {
    const pipeline = [
        { $match: { is_active: true } },
    ];
    const roles = await Role.aggregate(pipeline);
    return roles;
};
