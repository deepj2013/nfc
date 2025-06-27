import mongoose from 'mongoose';

const otpTokenSchema = new mongoose.Schema({
    memberId: { type: String, required: true },
    otp: { type: String, required: true },
    isUsed: { type: Boolean, default: false },
    expiresAt: { type: Date, required: true },
    created_by: { type: Number },
    updated_by: { type: Number },
    date_created: { type: Date, default: Date.now },
    date_modified: { type: Date, default: Date.now }
});

// Automatically delete expired records
otpTokenSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

// Middleware to update the date_modified field on each save
otpTokenSchema.pre('save', function(next) {
    this.date_modified = Date.now();
    next();
});

const OtpToken = mongoose.model('otp_tokens', otpTokenSchema);

export default OtpToken;