import path from 'path';

export const handleFileUpload = async (file) => {
    if (!file) {
        throw new Error('No file uploaded.');
    }
console.log(`Uploading file ${process.env.BASE_URL}`)
    // Construct the file URL
    const fileUrl = `${process.env.BASE_URL}/uploads/${file.path.replace('uploads/', '')}`;
    
    return { fileUrl };
};
