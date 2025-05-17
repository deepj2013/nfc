import multer from 'multer';
import path from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs';


// 👇 Recreate __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let functionUploadCounter = 1;
// Define storage strategy for multer
const storage = multer.diskStorage({
   
    destination: (req, file, cb) => {
        let folder = 'uploads';
        if (file.mimetype.startsWith('image/')) {
            const type = req.body.type || req.query.type;
            if (type) {
                folder = 'uploads/functionpics';
            } else {
                folder = 'uploads/memberpics';
            }
        } else if (file.mimetype === 'application/pdf') {
            folder = 'uploads/pdfs';
        } else if (
            file.mimetype === 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' || 
            file.mimetype === 'application/vnd.ms-excel'
        ) {
            folder = 'uploads/excel';
        } else {
            folder = 'uploads/documents';
        }
        cb(null, folder);
    },


    filename: (req, file, cb) => {
      const ext = path.extname(file.originalname).toLowerCase();
      const rawName = path.basename(file.originalname, ext).replace(/\s+/g, '').toLowerCase();
    
      const type = req.query.type || req.body.type;
    
      if (type ) {
        const functionName = (req.query.functionName || 'function')
          .trim()
          .replace(/\s+/g, '')
          .toLowerCase();
    
        const now = new Date();
        const ddmmyyyy = `${String(now.getDate()).padStart(2, '0')}${String(now.getMonth() + 1).padStart(2, '0')}${now.getFullYear()}`;
    
        const serial = String(functionUploadCounter++).padStart(3, '0');
        const finalName = `${functionName}_${ddmmyyyy}_${serial}${ext}`;
        cb(null, finalName);
      } else {
        cb(null, `${rawName}-${Date.now()}${ext}`);
      }
    }
});

// Configure file filter to allow only certain types
const fileFilter = (req, file, cb) => {
    const allowedTypes = [
        'image/jpeg',
        'image/png',
        'application/pdf',
        'application/msword', // .doc
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document', // .docx
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet', // .xlsx
        'application/vnd.ms-excel' // .xls
    ];
    
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('Invalid file type. Only images, PDFs, documents, and Excel files are allowed.'));
    }
};

export const upload = multer({
    storage,
    fileFilter,
    limits: { fileSize: 100 * 1024 * 1024 } // limit file size to 10MB
});







export const getFile = async (req, res) => {
  const { folder, fileName } = req.params;

  const allowedFolders = ['documents', 'excel', 'images', 'memberpics'];
  if (!allowedFolders.includes(folder)) {
    return res.status(400).json({ error: 'Invalid folder name' });
  }

  // 👇 Use process.cwd() to resolve path from project root
  const filePath = path.join(process.cwd(), 'uploads', folder, fileName);
  console.log("Looking for file at:", filePath); // for debugging

  if (!fs.existsSync(filePath)) {
    return res.status(404).json({ error: 'File not found' });
  }

  res.sendFile(filePath);
};