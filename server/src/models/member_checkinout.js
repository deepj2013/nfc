    import mongoose from "mongoose";

    const MemberCheckInOutSchema = new mongoose.Schema(
    {
        member_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "master_members",
        required: true,
        },
        memberId: { type: String, required: true },
        checkInTime: { type: Date, default: Date.now },
        checkOutTime: { type: Date },
        totalTimeStay : { type: Number, default: 0 },
        isCheckedIn: { type: Boolean, default: false },
        isCheckedOut: { type: Boolean, default: false },
        location:{type: String, default :''},
        createdBy: { type: Number },
        updatedBy: { type: Number },    
    },{ timestamps: true }
    );

    const mebmerCheckInOut = mongoose.model("MemberCheckInOut", MemberCheckInOutSchema);


    export default mebmerCheckInOut;    