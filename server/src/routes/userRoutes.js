import express from 'express'
import { adminLoginController, adminSignupController } from '../controllers/adminController.js'
import { userLoginController } from '../controllers/userController.js'
import { auth } from '../middlewares/auth.js'
import { createCategoryController } from '../controllers/inventoryController.js'
import {  getMenusByRoleController} from '../controllers/utilityControllers/menuController.js'


const router = express.Router()

router.post('/login', userLoginController)
router.post('/getmenubyrole', [auth], getMenusByRoleController )


export default router