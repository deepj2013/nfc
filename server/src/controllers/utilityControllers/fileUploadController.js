import { handleFileUpload } from '../../services/utitlityServices/fileUploadService.js';

export const uploadFileController = async (req, res) => {
    try {
       
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

export const bulkFileUploadController = async (req, res) => {
    try {
      const files = req.files;
      const uploaded = [];
      const failed = [];
  
      if (!files || files.length === 0) {
        return res.status(400).json({ message: 'No files uploaded' });
      }
  
      for (const file of files) {
        try {
          const result = await handleFileUpload(file);
          uploaded.push(result.fileUrl);
        } catch (err) {
          console.error('❌ Upload failed for:', file.originalname, err);
          failed.push(file.originalname || 'unknown');
        }
      }
  
      return res.status(200).json({
        message: 'Upload completed',
        uploaded,
        failed,
        total: files.length
      });
  
    } catch (error) {
      console.error('❌ Bulk Upload Error:', error);
      res.status(500).json({ message: 'Bulk upload failed', error: error.message });
    }
  };