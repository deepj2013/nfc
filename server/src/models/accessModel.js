import mongoose from 'mongoose';

const accessSchema = new mongoose.Schema({
    role_id: { type: Number, ref: 'Role', required: true },
    menu_ids: { type: [Number], ref: 'Menu', required: true },
    date_created: { type: Date, default: Date.now },
    date_modified: { type: Date, default: Date.now },
    created_by: { type: Number },
    updated_by: { type: Number }
});

// Middleware to update the date_modified field on update
accessSchema.pre('save', function(next) {
    this.date_modified = Date.now();
    next();
});

const AccessControl = mongoose.model('accesscontrol', accessSchema);

export default AccessControl;
