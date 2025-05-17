import express from 'express';
import { bulkFileUploadController, uploadFileController } from '../controllers/utilityControllers/fileUploadController.js';
import { upload , getFile } from '../middlewares/uploadMiddlewares.js';
import { eitherAuthOrAdmin} from '../middlewares/eitherAdminoruser.js';

const router = express.Router();

router.post('/upload/file', upload.single('file'), [eitherAuthOrAdmin], uploadFileController,  )
router.post('/upload/files', upload.array('files', 50), eitherAuthOrAdmin, bulkFileUploadController);
router.get('/file/:folder/:fileName', getFile);

// Single file upload route
// router.post('/upload/file', upload.single('file'),eitherAuthorAdmin, uploadFileController);

export default router;
