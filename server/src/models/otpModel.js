import mongoose from 'mongoose';

const otpTokenSchema = new mongoose.Schema({
  memberId: { type: String, required: true },
  phone: { type: String, required: true },
  userType: { type: String, enum: ['member', 'user', 'admin'], required: true },
  purpose: { type: String, enum: ['reset', 'login', 'verification'], required: true },
  otp: { type: String, required: true },
  isUsed: { type: Boolean, default: false },
  verifiedAt: { type: Date }, // optional: timestamp when verified
  expiresAt: { type: Date, required: true },
  created_by: { type: String },
  updated_by: { type: String },
  date_created: { type: Date, default: Date.now },
  date_modified: { type: Date, default: Date.now }
});

otpTokenSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

otpTokenSchema.pre('save', function (next) {
  this.date_modified = Date.now();
  next();
});

const OtpToken = mongoose.model('otp_tokens', otpTokenSchema);

export default OtpToken;