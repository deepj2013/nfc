import mongoose from 'mongoose';

const menuItemSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, enum: ['Appetizer', 'Main Course', 'Dessert', 'Beverage'], required: true },
    availability: { type: Boolean, default: true },
    description: { type: String },
    ingredients: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Ingredient' }],
    restaurantId: { type: mongoose.Schema.Types.ObjectId, ref: 'Restaurant', required: true },
    MRP: { type: Number, required: true },
    discount: {
        min: { type: Number, default: 0 },
        max: { type: Number, default: 0 },
    },
    createdBy: { type: Number },
    updatedBy: { type: Number  },
   
}, {
    timestamps: {
      createdAt: 'date_created',
      updatedAt: 'date_modified'
    }
  });

const MenuItem = mongoose.model('restaurant_menu', menuItemSchema);

export default MenuItem;
