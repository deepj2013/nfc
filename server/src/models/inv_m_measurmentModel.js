import mongoose from 'mongoose';
const Schema = mongoose.Schema;

// Define the Measurement Unit schema
const MeasurementUnitSchema = new Schema({
  unitName: {
    type: String,
    required: true,
    trim: true,
  },
  measuremntunitId:{type: Number, required:true},
  abbreviation: {
    type: String,
    required: true,
    trim: true,
  },
  conversionFactor: {
    type: Number,
    required: true,
    default: 1,
  },
  productId: {
    type: Schema.Types.ObjectId,
    ref: 'Product', // Reference to the Product collection
    required: false,
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
MeasurementUnitSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

// Create and export the Measurement Unit model
const MeasurementUnit = mongoose.model('MeasurementUnit', MeasurementUnitSchema);
export default MeasurementUnit;
