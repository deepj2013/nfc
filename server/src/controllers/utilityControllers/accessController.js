import {createAccessServices} from '../../services/utitlityServices/accessServices.js'

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



