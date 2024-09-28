import mongoose from 'mongoose';

const restaurantSchema = new mongoose.Schema({
    name: { type: String, required: true },
    type: { type: String, enum: ['Own', 'Partnership', 'Third-Party'], required: true },
    commissionRate: { type: Number, default: 0 },  // Used for third-party or partnership restaurants
    tables: [{
        tableNumber: { type: Number, required: true },
        capacity: { type: Number, required: true },
        currentStatus: { type: String, enum: ['Available', 'Occupied'], default: 'Available' }
    }]
}, { timestamps: true });

const Restaurant = mongoose.model('Restaurants', restaurantSchema);

export default Restaurant;
