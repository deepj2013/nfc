import mongoose from "mongoose";

const { Schema, model, Types } = mongoose;
const TokenSchema = new Schema({
    userId: {
        type: Types.ObjectId,
        required: true
    },
    token: {
        type: String,
        required: true,
        unique: true
    },
    expiresAt: {
        type: Number,
        required: true
    }
}, { timestamps: true });

TokenSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

const Token = model('Token', TokenSchema);

export default Token;
