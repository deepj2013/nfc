import express from 'express'
import { adminLoginController, adminSignupController, createDepartmentController, getAllUserController } from '../controllers/adminController.js'
import { createMenuController, getMenusByRoleController,getAllMenusController } from '../controllers/utilityControllers/menuController.js'
import { createRoleController, getRoleController } from '../controllers/utilityControllers/roleController.js'
import { createAccessController } from '../controllers/utilityControllers/accessController.js'
import { createUserController } from '../controllers/userController.js'
import { adminAuth } from '../middlewares/adminAuth.js'

const router = express.Router()

router.post('/signup',adminSignupController )
router.post('/signin', adminLoginController)
router.post('/createmenu',[adminAuth] , createMenuController )
router.get('/getallmenu',[adminAuth] , getAllMenusController )
router.post('/createrole',[adminAuth] , createRoleController )
router.get('/getrole',[adminAuth] , getRoleController )
router.post('/accesscontrol',[adminAuth], createAccessController);
router.post('/getmenubyrole', [adminAuth], getMenusByRoleController)
router.post('/createusers', [adminAuth], createUserController)
router.get('/getusers', [adminAuth], getAllUserController)
router.post('/departments',[adminAuth] ,createDepartmentController )


export default router