import mongoose from 'mongoose';

const { Schema } = mongoose;

// Define Dependent Schema
const dependentSchema = new Schema({
    dependentId: { type: String, required: true, unique: true },
    member_id: {  type: mongoose.Schema.Types.ObjectId,  required: true},
    memberId: { type: String, required: true },
    firstName: { type: String, required: true },
    middleName: { type: String },
    profilePicture: { type: String},
    surname: { type: String, required: true },
    relationship: { type: String, required: true }, // Wife, Husband, Son, Daughter
    dateOfBirth: { type: Date, required: true },
    gender: { type: String, required: true },
    maritalStatus: { type: String },
    nationality: { type: String },
    bloodGroup: { type: String },
    mobileNumber: { type: String },
    password: {type:String},
    emailId: { type: String },
    phoneNumber: { type: String },
    address: { type: String },
    createdBy: { type: Number },
    updatedBy: { type: Number },
}, {
    timestamps: true,
});

// Define Member Schema
const memberDataSchema = new Schema({
    memberId: { type: String, required: true, unique: true },
    typeofmember: {type: String},
    memberCategory: { type: String, required: true },
    memberType: { type: String}, 
    profilePicture: { type: String},
    title: { type: String},
    dateOfMembership: { type: Number },
    firstName: { type: String, required: true },
    middleName: { type: String },
    surname: { type: String  },
    fatherName: { type: String },
    husbandName: { type: String },
    spouseName: { type: String },
    gender: { type: String },
    dateOfBirth: { type: Date },
    maritalStatus: { type: String,  },
    nationality: { type: String  },
    bloodGroup: { type: String },
    mobileNumber: { type: String, required: true },
    emailId: { type: String, required: true },
    phoneNumber: { type: String },
    membershipStatus: { type: String, },
    validUpTo: { type: Number,  },
    panNumber: { type: String, },
    weddingDate: { type: Date },
    serviceBusinessDetail: { type: String },
    occupation: { type: String,  },
    organization: { type: String,  },
    designation: { type: String,  },
    address: { type: String, },
    emergencyContactName: { type: String, },
    emergencyContactNumber: { type: String, },
    emergencyContactRelation: { type: String, },
    password: {type:String},
    createdBy: { type: Number },
    updatedBy: { type: Number },
    dependents: [{ type: String, ref: 'master_members_dependents' }], // Store only dependent IDs
}, {
    timestamps: true,
});

const MemberData = mongoose.model('master_members', memberDataSchema);
const Dependent = mongoose.model('master_members_dependents', dependentSchema);

export { MemberData, Dependent };

// Wallet Schema
const walletSchema = new Schema({
    member_id: {  type: mongoose.Schema.Types.ObjectId, ref: 'master_members', required: true},
    memberId: { type: String, ref: 'master_members', required: true },
    balance: { type: Number, required: true, default: 0 },
    createdBy: { type: Number },
    updatedBy: { type: Number },
}, {
    timestamps: true,
});

const Wallet = mongoose.model('members_wallets', walletSchema);

// Member Transaction History Schema
const memberTransactionHistorySchema = new Schema({
    member_id: { type: mongoose.Schema.Types.ObjectId, ref: 'master_member', required: true },
    memberId: { type: String, ref: 'master_member', required: true },
    transactionDate: { type: Date, required: true, default: Date.now },
    amount: { type: Number, required: true, default: 0 },
    transactionType: { type: String, required: true }, // Credit, Debit
    modeOfTransaction: { type: String }, // UPI | Cheque | Cash | NEFT | OnlineBanking
    transactionRef: { type: String }, // For UPI/NEFT
    chequeNumber: { type: String }, // For Cheque
    chequeStatus: { type: String,}, // Pending | Cleared | Bounced
    bankName: { type: String }, // For Cheque
    branchName: { type: String }, // For Cheque
    supportDocuments: { type: String }, // in case UPI / NEFT / CHEQUE image URL
    remarks: { type: String, required: true },
    description: { type: String, required: true },
    narration: { type: String, required: true },
    createdBy: { type: Number },
    updatedBy: { type: Number },
}, { timestamps: true });

const MemberTransactionHistory = mongoose.model('members_transaction_history', memberTransactionHistorySchema);

export { Wallet, MemberTransactionHistory };
