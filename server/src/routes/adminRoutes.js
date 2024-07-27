import express from 'express'
import { adminLoginController, adminSignupController } from '../controllers/adminController.js'
import { createMenuController } from '../controllers/utilityControllers/menuController.js'
import { adminAuth } from '../middlewares/adminAuth.js'

const router = express.Router()

router.post('/signup',adminSignupController )
router.post('/signin', adminLoginController)
router.post('/createmenu',[adminAuth] , createMenuController )

export default router