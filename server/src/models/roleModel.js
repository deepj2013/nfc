import mongoose from 'mongoose';

const { Schema } = mongoose;

const roleSchema = new Schema({
    roleId: {
        type: Number,
        required: true,
        unique: true,
        default: () => Math.floor(Math.random() * 1000000) // Assuming auto-increment equivalent
    },
    roleName: {
        type: String,
        required: true,
        maxlength: 100,
        unique: true
    },
    roleDescription: {
        type: String,
        maxlength: 100,
        default: null
    },
    isActive: {
        type: Number,
        required: true
    },
    level: {
        type: String,
        required: true,
        maxlength: 100
    },
    supervisor: {
        type: Number,
        default: null
    },
    dateCreated: {
        type: Date,
        default: Date.now
    },
    dateModified: {
        type: Date,
        default: Date.now
    },
    createdBy: {
        type: Number,
        default: null
    },
    updatedBy: {
        type: Number,
        default: null
    }
}, { timestamps: { createdAt: 'dateCreated', updatedAt: 'dateModified' } });

roleSchema.index({ roleName: 1 }, { unique: true });

const Role = mongoose.model('Role', roleSchema);

export default Role;
