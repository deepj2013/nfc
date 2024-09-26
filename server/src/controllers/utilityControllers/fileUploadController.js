import { handleFileUpload } from '../../services/utitlityServices/fileUploadService.js';

export const uploadFileController = async (req, res) => {
    try {
        const file = req.file;
        console.log('i am in upload')
        if (!file) {
            return res.status(400).json({ error: 'Please upload a file' });
        }
        
        const result = await handleFileUpload(file);
        res.status(200).json({ msg: 'File uploaded successfully', 
            fileUrl: result.fileUrl 
            });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};