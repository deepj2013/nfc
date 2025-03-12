import { MemberData } from '../../models/member_Model.js';

let mobileCounter = 5555000001;
let emailCounter = 1;

export const generateUniqueMobile = async () => {
    while (true) {
        const mobileNumber = `5555${mobileCounter++}`;
        const existingMember = await MemberData.findOne({ mobileNumber });
        if (!existingMember) return mobileNumber;
    }
};

export const generateUniqueEmail = async () => {
    while (true) {
        const email = `nfcdummy${String(emailCounter++).padStart(5, '0')}@nfc.in`;
        const existingMember = await MemberData.findOne({ emailId: email });
        if (!existingMember) return email;
    }
};

export const validateMemberData = async (member) => {
    if (!member.firstName || !member.surname || !member.memberCategory) {
        throw new Error('Required fields missing: firstName, surname, or memberCategory.');
    }
};

export const logBulkUploadResults = (totalUploaded, failedEntries) => {
    console.log('Bulk Upload Report');
    console.log('Total Uploaded:', totalUploaded);
    console.log('Failed Entries:', failedEntries);
};