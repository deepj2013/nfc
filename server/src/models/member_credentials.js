import mongoose from "mongoose";

const CredentialsSchema = new mongoose.Schema({
member_id: {  type: mongoose.Schema.Types.ObjectId, required: true},
memberId: { type: String, required: true },
email: { type: String, required: true, unique: true },
mobile: { type: String, required: true, unique: true },
password: { type: String, required: true }, // Hashed Password
invalidLoginAttempts: { type: Number, default: 0 }, // Track failed login attempts
}, { timestamps: true });


const MemberCredentials = mongoose.model("member_credentials", CredentialsSchema);


export default MemberCredentials;  