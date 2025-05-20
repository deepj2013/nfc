import path from 'path';
import { BASE } from '../../../../client/src/utils/Urls';

export const handleFileUpload = async (file) => {
    if (!file) {
        throw new Error('No file uploaded.');
    }
console.log(`Uploading file ${BASE}`)
    // Construct the file URL
    const fileUrl = `${BASE}/uploads/${file.path.replace('uploads/', '')}`;
    
    return { fileUrl };
};
