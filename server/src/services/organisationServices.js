import Organisation from '../models/master_organisation.js';



// Helper function to generate the next organizationId
const generateNextOrganisationId = (lastOrganisation) => {
    const prefix = 'OR';
    let nextId = 1;
    if (lastOrganisation) {
      // Extract the numeric part and increment it
      const lastIdNumber = parseInt(lastOrganisation.organizationId.slice(2), 10);
      nextId = lastIdNumber + 1;
    } 
    // Pad with leading zeros to make it 4 digits (e.g., '0001')
    const newIdNumber = nextId.toString().padStart(4, '0');
    return `${prefix}${newIdNumber}`;
  };
  
  // Check for duplicates
  const checkForDuplicateOrganisation = async (data) => {
    const { pan, gst, email, name, fullName } = data;
    const existingOrganisation = await Organisation.findOne({
      $or: [
        { pan },
        { gst },
        { email },
        { name },
        { fullName }
      ]
    });
    return existingOrganisation;
  };
  
  // Create an organization
  export const createOrganisation = async (data) => {
    try {
      // Check for duplicate organization based on pan, gst, email, name, fullName
      const duplicateOrganisation = await checkForDuplicateOrganisation(data);
      if (duplicateOrganisation) {
        throw new Error(
          `Organisation with PAN, GST, email, name, or full name already exists.`
        );
      }
   
      // Fetch the last created organization, sorted by creation date
      const lastOrganisation = await Organisation.findOne().sort({ createdAt: -1 });
      // Generate the next organizationId
      const newOrganisationId = generateNextOrganisationId(lastOrganisation);
      // Add the generated organizationId to the data
      const organisationData = { ...data, organizationId: newOrganisationId };
      // Save the organisation to MongoDB
      const organisation = new Organisation(organisationData);
      return await organisation.save();
  
    } catch (error) {
      throw new Error('Error creating organisation: ' + error.message);
    }
  };

// Update an organization by ID
export const updateOrganisationById = async (id, data) => {
  try {
     // Check for duplicate organization based on pan, gst, email, name, fullName
     const duplicateOrganisation = await checkForDuplicateOrganisation(data);
     if (duplicateOrganisation) {
       throw new Error(
         `Organisation with PAN, GST, email, name, or full name already exists.`
       )
     }
    const updatedOrganisation = await Organisation.findOneAndUpdate({organizationId : id}, data, { new: true });
    if (!updatedOrganisation) {
      throw new Error('Organisation not found');
    }
    return updatedOrganisation;
  } catch (error) {
    throw new Error('Error updating organisation: ' + error.message);
  }
};

// Find all organizations
export const findAllOrganisations = async () => {
  try {
    return await Organisation.find();
  } catch (error) {
    throw new Error('Error fetching organisations: ' + error.message);
  }
};

// Search organizations by one word or regex
export const searchOrganisations = async (searchTerm) => {
  try {
    const regex = new RegExp(searchTerm, 'i');  // Case-insensitive regex
    return await Organisation.find({
      $or: [
        { name: regex },
        { fullName: regex },
        { address: regex },
        { email: regex },
      ]
    });
  } catch (error) {
    throw new Error('Error searching organisations: ' + error.message);
  }
};
