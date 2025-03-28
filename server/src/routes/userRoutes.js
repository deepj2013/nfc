import express from 'express'
import { adminLoginController, adminSignupController } from '../controllers/adminController.js'
import { userLoginController } from '../controllers/userController.js'
import { auth } from '../middlewares/auth.js'
import { createCategoryController } from '../controllers/inventoryController.js'
import {  getMenusByRoleController} from '../controllers/utilityControllers/menuController.js'
import { findAllOrganisationsController } from '../controllers/organisationControllers.js'


const router = express.Router()

router.post('/login', userLoginController)
router.post('/getmenubyrole', [auth], getMenusByRoleController )
router.get('/organisation',[auth],  findAllOrganisationsController);


export default router