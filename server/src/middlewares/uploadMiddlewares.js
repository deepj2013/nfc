import multer from 'multer';
import path from 'path';

// Define storage strategy for multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        let folder = 'uploads';
        if (file.mimetype.startsWith('image/')) {
            folder = 'uploads/images';
        } else if (file.mimetype === 'application/pdf') {
            folder = 'uploads/pdfs';
        } else {
            folder = 'uploads/documents';
        }
        cb(null, folder);
    },
    filename: (req, file, cb) => {
        const ext = path.extname(file.originalname);
        const name = path.basename(file.originalname, ext);
        cb(null, `${name}-${Date.now()}${ext}`);
    }
});

// Configure file filter to allow only certain types
const fileFilter = (req, file, cb) => {
    const allowedTypes = ['image/jpeg', 'image/png', 'application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (allowedTypes.includes(file.mimetype)) {
        cb(null, true);
    } else {
        cb(new Error('Invalid file type. Only images, PDFs, and documents are allowed.'));
    }
};

export const upload = multer({
    storage,
    fileFilter,
    limits: { fileSize: 1024 * 1024 * 10 } // limit file size to 10MB
});


export const getFile = async (req, res) => {
    const fileName = req.params.fileName;
    const directoryPath = path.join(__dirname, '../uploads/'); // Adjust the directory as per your setup

    res.sendFile(directoryPath + fileName, (err) => {
        if (err) {
            res.status(404).json({ error: 'File not found' });
        }
    });
};