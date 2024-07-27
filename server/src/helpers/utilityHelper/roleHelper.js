export const getRoleMenus = (roleId) => {
    // Define role-based menu access here
    const roleMenus = {
        1: ['Dashboard', 'Users', 'Settings'], // Example role 1 access
        2: ['Dashboard', 'Profile']            // Example role 2 access
    };

    return roleMenus[roleId] || [];
};
