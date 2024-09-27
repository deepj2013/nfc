import mongoose from 'mongoose';

const ingredientSchema = new mongoose.Schema({
    name: { type: String, required: true },
    stockQuantity: { type: Number, required: true },
    restaurantId: { type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant', required: true }
}, { timestamps: true });

const Ingredient = mongoose.model('Ingredient', ingredientSchema);

export default Ingredient;
