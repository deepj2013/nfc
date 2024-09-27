import mongoose from 'mongoose';

const restaurantSchema = new mongoose.Schema({
    restaurant_id: { type: Number, unique: true },  // Incremented restaurant_id
    name: { type: String, required: true },
    type: { type: String, enum: ['Own', 'Partnership', 'Third-Party'], required: true },
    commissionRate: { type: Number, default: 0 },
    description: { type: String },
    cuisines: [{ type: String }],
    images: [{ type: String }],
    timings: [{ 
        days: [{ type: Number }], // 0,1,2,3,4,5,6,
        openingTime: { type: String },
        closingTime: { type: String }
    }],
    isOpen: { type: Boolean, required: true },
    createdBy: { type: Number, required: true},
    updatedBy: { type: Number, required: true} 
}, { timestamps: true });

const Restaurant = mongoose.model('Restaurants', restaurantSchema);

export default Restaurant;
