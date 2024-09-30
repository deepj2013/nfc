import mongoose from 'mongoose';

const menuItemSchema = new mongoose.Schema({
    category: { type: String, required: true },
    name: { type: String, required: true },
    description: { type: String },
    images: [{type: String}],
    food_type: { type: String, enum: ['Veg', 'Non-Veg', 'Vegan', 'Gluten-Free', 'Dairy-Free', 'Kosher', 'Halal', 'Other'], required: true },
    cuisines:{ type: String },
    is_available: { type: Boolean, default: true },
    is_bestseller: { type: Boolean, default: false},
    price_info: [{ 
      price : { type: Number},
      offer_price: { type: Number},
      is_offer: { type: Boolean},
      tax_percentage: { type: Number},
      discount_percentage: { type: Number}
    }],
    restaurantId: { type: Number, ref: 'Restaurant', required: true },
    createdBy: { type: Number },
    updatedBy: { type: Number  },
}, {
    timestamps: {
      createdAt: 'date_created',
      updatedAt: 'date_modified'
    }
  });

const MenuItem = mongoose.model('restaurant_menus', menuItemSchema);

export default MenuItem;
