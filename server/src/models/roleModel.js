
import mongoose from 'mongoose';
const roleSchema = new mongoose.Schema({
  role_id: {
    type: Number,
    required: true,
    unique: true
  },
  role_name: {
    type: String,
    required: true
  },
  role_description: {
    type: String,
    required: true
  },
  is_active: {
    type: Boolean,
    required: true
  },
  level: {
    type: String,
    required: true
  },
  supervisor: {
    type: String,
    default: null
  },
  date_created: {
    type: Date,
    required: true,
    default: Date.now
  },
  date_modified: {
    type: Date,
    required: true,
    default: Date.now
  },
  created_by: {
    type: String,
    default: null
  },
  updated_by: {
    type: String,
    default: null
  }
}, {
  timestamps: {
    createdAt: 'date_created',
    updatedAt: 'date_modified'
  }
});


const Role = mongoose.model('Role', roleSchema);

export default Role;
