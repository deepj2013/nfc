import mongoose from 'mongoose';

const tableSchema = new mongoose.Schema({
    restaurant_id: { type: Number, required: true },  // Linked to restaurant_id
    tableNumber: { type: Number, required: true },
    capacity: { type: Number, required: true },
    currentStatus: { type: String, enum: ['Available', 'Occupied', "NotAvailable"], default: 'Available' },
    createBy: { type: Number, required:true},
    updateBy: { type: Number, required:true},
}, { timestamps: true });

const RestaurantTable = mongoose.model('RestaurantTable', tableSchema);

export default RestaurantTable;
