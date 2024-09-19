import mongoose from "mongoose";

const masterUsersSchema = new mongoose.Schema({
    user_id: { type: Number, required: true, unique: true },
    user_name: { type: String, required: true },
    mobile_number: { type: String, required: true },
    email_id: { type: String, required: true, unique: true },
    gender: { type: Number, default: null }, // Optional, defaults to null
    date_of_birth: { type: Date, default: null }, // Optional, defaults to null
    password: { type: String, required: true },
    password_last_updated: { type: Date, default: null }, // Optional, defaults to null
    invalid_attempts: { type: Number, default: 0 },
    identity_id: { type: Number, default: null }, // Optional, defaults to null
    address: { type: String, default: null }, // Optional, defaults to null
    role_id: { type: Number, default: null }, // Optional, defaults to null
    country_id: { type: Number, default: null }, // Optional, defaults to null
    state_id: { type: Number, default: null }, // Optional, defaults to null
    district_id: { type: Number, default: null }, // Optional, defaults to null
    city_id: { type: Number, default: null }, // Optional, defaults to null
    account_locked: { type: Boolean, default: false },
    is_active: { type: Boolean, default: true },
    profile_picture_url: { type: String, default: null }, // Optional, defaults to null
    is_logged_in: { type: Boolean, default: false },
    last_logged_in_out: { type: Date, default: null }, // Optional, defaults to null
    is_deleted: { type: Boolean, default: false },
    user_id_parent: { type: Number, default: null }, // Optional, defaults to null
    created_by: { type: Number, default: null }, // Optional, defaults to null
    updated_by: { type: Number, default: null }, // Optional, defaults to null
}, {
    timestamps: { createdAt: 'date_created', updatedAt: 'date_modified' }
});

const User = mongoose.model('masterUsers', masterUsersSchema);
export default User;
