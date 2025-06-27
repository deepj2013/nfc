import AccessControl from './../../models/accessModel.js'

export const createAccessServices = async (acessData) => {
    try {
      const access = new AccessControl(acessData);
      return await access.save();
    } catch (err) {
        console.log(err);
        res.status(500).json({ error: err.message });
    }
};

