import { createRoleService, getRoleService } from '../../services/utitlityServices/roleServices.js';

export const createRoleController = async (req, res) => {
    try {
        const role = await createRoleService(req.body);
        res.status(201).json(role);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

export const getRoleController = async (req, res) => {
    try {
        const result = await getRoleService();
        // to check if roles are fetched correctly  // remove this line when done  //
        res.status(200).json({ msg: "Success", result });
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: err.message });
    }
};

