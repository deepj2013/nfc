import express from 'express'
import { adminLoginController, adminSignupController } from '../controllers/adminController.js'
import { userLoginController } from '../controllers/userController.js'
import { auth } from '../middlewares/auth.js'
import { createCategoryController } from '../controllers/inventoryController.js'

const router = express.Router()

router.post('/login', userLoginController)


export default router