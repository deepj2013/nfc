import express from 'express'
import { adminLoginController, adminSignupController } from '../controllers/adminController.js'
// import { adminAuth } from '../middlewares/adminAuth.js'

const router = express.Router()

router.post('/signup',adminSignupController )
// router.post('/login', adminLoginController)

export default router