import mongoose from 'mongoose';

const SocialMediaSchema = new mongoose.Schema({
    platform: { type: String, required: true },  // e.g., 'Facebook', 'Instagram'
    url: { type: String, required: true }        // URL to the social media profile
});

const ClubOrganizationSchema = new mongoose.Schema({
    organizationId: { type: String, required: true, unique: true },  // Unique organization identifier like 'OR0001'
    name: { type: String, required: true },       // Short name of the organization
    fullName: { type: String, required: true },   // Full registered name of the organization
    address: { type: String, required: true },    // Full address
    phone: { type: String, required: true },      // Contact number
    email: { type: String, required: true },      // Contact email
    pan: { type: String, required: true },        // PAN number
    tan:{ type: String, required: true },        // TAN number
    gst: { type: String, required: true },        // GST number
    logoUrl: { type: String },                    // URL of the logo image
    website: { type: String },                    // Official website URL
    socialMedia: { type: [SocialMediaSchema], default: [] }, // Social media accounts with platform and URL
    facilities: { type: [String], required: true }, // Array of available facilities (pool, gym, etc.)
    members: { type: Number, default: 0 },        // Total members in the club
    createdAt: { type: Date, default: Date.now }, // Date of creation
    updatedAt: { type: Date, default: Date.now }  // Last update timestamp
});

ClubOrganizationSchema.pre('save', function (next) {
    this.updatedAt = Date.now(); // Update `updatedAt` before every save
    next();
});

const Organisation = mongoose.model('Organisation', ClubOrganizationSchema);

export default Organisation;
