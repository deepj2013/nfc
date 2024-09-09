import { createOrganisation, updateOrganisationById, findAllOrganisations, searchOrganisations } from '../services/organisationServices.js';

// Create Organization
export const createOrganisationController = async (req, res) => {
  try {
    const result = await createOrganisation(req.body);
    res.status(201).json({ msg: 'Organisation created successfully', result });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Update Organization by ID
export const updateOrganisationController = async (req, res) => {
  try {
    const result = await updateOrganisationById(req.params.id, req.body);
    res.status(200).json({ msg: 'Organisation updated successfully', result });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// Get all Organizations
export const findAllOrganisationsController = async (req, res) => {
  try {
    const result = await findAllOrganisations();
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Search Organizations by word or regex
export const searchOrganisationsController = async (req, res) => {
  try {
    const searchTerm = req.query.q;
    const result = await searchOrganisations(searchTerm);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
