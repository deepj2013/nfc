import mongoose from 'mongoose';

const recipeSchema = new mongoose.Schema({
    menuItemId: { type: mongoose.Schema.Types.ObjectId, ref: 'MenuItem', required: true },  // Linked to the menu item
    ingredients: [{
        name: { type: String, required: true },
        quantity: { type: String, required: true }
    }],
    steps: [{ type: String, required: true }],
    createdBy: { type: Number },
    updatedBy: { type: Number }
}, { timestamps: true });

const Recipe = mongoose.model('restaurantMenuReceipe', recipeSchema);

export default Recipe;
