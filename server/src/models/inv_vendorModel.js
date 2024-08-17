import mongoose from 'mongoose';
const Schema = mongoose.Schema;

// Define the Address schema as a subdocument
const AddressSchema = new Schema({
  street: {
    type: String,
    required: true,
    trim: true,
  },
  city: {
    type: String,
    required: true,
    trim: true,
  },
  state: {
    type: String,
    required: true,
    trim: true,
  },
  postalCode: {
    type: String,
    required: true,
    trim: true,
  },
  country: {
    type: String,
    required: true,
    trim: true,
  }
});

// Define the Vendor schema
const VendorSchema = new Schema({
  vendorName: {
    type: String,
    required: true,
    trim: true,
  },
  vendor:{
    type: String,
    require:true,
    unique: true,

  },
  contactPerson: {
    type: String,
    required: true,
    trim: true,
  },
  contactEmail: {
    type: String,
    required: true,
    trim: true,
  },
  contactPhone: {
    type: String,
    required: true,
    trim: true,
  },
  gstNumber: {
    type: String,
    required: true,
    trim: true,
    unique: true,
  },
  address: {
    type: AddressSchema,  // Embedded Address schema
    required: true,
  },
  productsSupplied: [{
    type: Schema.Types.ObjectId,
    ref: 'Product', // Reference to the Product collection
  }],
  paymentTerms: {
    type: String,
    required: true,
    trim: true,
  },
  createdBy: {
    type: Number,
    
  },
  updatedBy: {
    type: Number,
    
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  }
});

// Middleware to update the 'updatedAt' field before saving
VendorSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Create and export the Vendor model
const Vendor = mongoose.model('Vendor', VendorSchema);
export default Vendor;