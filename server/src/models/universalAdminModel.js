import mongoose from "mongoose";

// Admin Schema Starts From Here
const UniversalAdminSchema = new mongoose.Schema({
    name: String,
    email: {
        type: String,
        unique: true,
        dropDups: true
    },
    userId: Number,
    password: String,
}, { timestamps: true });

const UniversalAdmin = mongoose.model('universaladmin', UniversalAdminSchema)

export default UniversalAdmin