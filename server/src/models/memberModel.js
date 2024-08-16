import mongoose from 'mongoose';

const { Schema } = mongoose;

const memberDataSchema = new Schema({
    memberCategory: { type: String, required: true },
    memberType: { type: String, required: true }, 
    memberNumber: { type: String, required: true, unique: true },
    title: { type: String, required: true },
    dateOfMembership: { type: Date, required: true },
    firstName: { type: String, required: true },
    middleName: { type: String },
    surname: { type: String, required: true },
    fatherName: { type: String },
    husbandName: { type: String },
    gender: { type: String, required: true },
    dateOfBirth: { type: Date, required: true },
    maritalStatus: { type: String, required: true },
    nationality: { type: String, required: true },
    bloodGroup: { type: String, required: true },
    mobileNumber: { type: String, required: true },
    emailId: { type: String, required: true },
    phoneNumber: { type: String },
    station: { type: String, required: true },
    membershipStatus: { type: String, required: true },
    validUpTo: { type: Date, required: true },
    panNumber: { type: String, required: true },
    weddingDate: { type: Date },
    serviceBusinessDetail: { type: String },
    occupation: { type: String, required: true },
    organization: { type: String, required: true },
    designation: { type: String, required: true },
    address: { type: String, required: true },
    emergencyContactName: { type: String, required: true },
    emergencyContactNumber: { type: String, required: true },
    emergencyContactRelation: { type: String, required: true },
    createdBy: {
        type: Number,
        
      },
      updatedAt: {
        type: Number,
        
      },
}, {
    timestamps: true,
});

const MemberData = mongoose.model('MemberData', memberDataSchema);

export default MemberData;
