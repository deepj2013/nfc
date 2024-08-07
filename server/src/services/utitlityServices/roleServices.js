import Role from '../../models/roleModel.js';
// import { getRoleMenus } from '../../helpers/utilityHelper/roleHelper.js'

export const createRoleService = async (roleData) => {
        const lastRole= await Role.findOne().sort({ roleId: -1 }).exec();
        let role_id = lastRole ? lastRole.role_id + 1 : 1;
        roleData.role_id = role_id;
    
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
