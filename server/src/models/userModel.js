import mongoose from "mongoose";

const masterUsersSchema = new mongoose.Schema({
    user_id: { type: Number, required: true, unique: true },
    user_name: { type: String, required: true },
    mobile_number: { type: String, required: true },
    email_id: { type: String, required: true, unique: true },
    gender: { type: Number },
    date_of_birth: { type: Date },
    password: { type: String, required: true },
    password_last_updated: { type: Date },
    invalid_attempts: { type: Number, default: 0 },
    identity_id: { type: Number },
    address: { type: String },
    role_id: { type: Number },
    country_id: { type: Number },
    state_id: { type: Number },
    district_id: { type: Number },
    city_id: { type: Number },
    account_locked: { type: Boolean, default: false },
    is_active: { type: Boolean, default: true },
    profile_picture_url: { type: String },
    is_logged_in: { type: Boolean, default: false },
    last_logged_in_out: { type: Date },
    is_deleted: { type: Boolean, default: false },
    user_id_parent: { type: Number },
    date_created: { type: Date, default: Date.now },
    date_modified: { type: Date, default: Date.now },
    created_by: { type: Number },
    updated_by: { type: Number },
}, {
    timestamps: { createdAt: 'date_created', updatedAt: 'date_modified' }
});

const User = mongoose.model('masterUsers', masterUsersSchema);
export default User