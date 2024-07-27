import mongoose from 'mongoose';

const { Schema } = mongoose;

const menuSchema = new Schema({
    menuId: {
        type: Number,
        required: true,
        unique: true,
        default: () => Math.floor(Math.random() * 1000000)
    },
    menuName: {
        type: String,
        required: true,
        maxlength: 100
    },
    menuDescription: {
        type: String,
        maxlength: 100,
        default: null
    },
    isActive: {
        type: Number,
        required: true
    },
    parentMenuId: {
        type: Number,
        default: 0
    },
    subMenus: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Menu'
    }],
    dateCreated: {
        type: Date,
        default: Date.now
    },
    dateModified: {
        type: Date,
        default: Date.now
    },
    createdBy: {
        type: Number,
        default: null
    },
    updatedBy: {
        type: Number,
        default: null
    },
    routeUrl: {
        type: String,
        maxlength: 100,
        default: null
    },
    menuOrder: {
        type: Number,
        default: 0
    },
    iconClass: {
        type: String,
        maxlength: 100,
        default: null
    }
}, { timestamps: { createdAt: 'dateCreated', updatedAt: 'dateModified' } });

menuSchema.index({ menuName: 1 }, { unique: true });

const Menu = mongoose.model('Menu', menuSchema);

export default Menu;


// {
//     "menuName": "Sub Menu 1",
//     "menuDescription": "First sub menu",
//     "isActive": 1,
//     "parentMenuId": 0,
//     "routeUrl": "/submenu1",
//     "menuOrder": 1,
//     "iconClass": "fa-submenu1"
// }

// {
//     "menuName": "Main Menu",
//     "menuDescription": "Main menu with sub-menus",
//     "isActive": 1,
//     "parentMenuId": 0,
//     "subMenus": ["60f8c2d5f2e4b62d4c8e4d88", "60f8c2d5f2e4b62d4c8e4d89", "60f8c2d5f2e4b62d4c8e4d8a"],
//     "createdBy": 1,
//     "updatedBy": 1,
//     "routeUrl": "/mainmenu",
//     "menuOrder": 1,
//     "iconClass": "fa-mainmenu"
// }
