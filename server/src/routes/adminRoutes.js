import express from 'express'
import {createOrganisationController,updateOrganisationController, findAllOrganisationsController, searchOrganisationsController} from '../controllers/organisationControllers.js'
import { adminLoginController, adminSignupController, createDepartmentController, getAllDepartmentController, updateDepartmentController, getAllUserController, assignUserToEntityController, createFunctionController, getAllFunctionsController, updateFunctionController } from '../controllers/adminController.js'
import { createMenuController, getMenusByRoleController,getAllMenusController } from '../controllers/utilityControllers/menuController.js'
import { createRoleController, getRoleController } from '../controllers/utilityControllers/roleController.js'
import { createAccessController, updateAccessController } from '../controllers/utilityControllers/accessController.js'
import { createUserController } from '../controllers/userController.js'
import { adminAuth } from '../middlewares/adminAuth.js'
import { auth } from '../middlewares/auth.js'
import { createKitchen, getKitchens, updateKitchen } from '../controllers/kitchenController.js'

const router = express.Router()

router.post('/signup',adminSignupController )
router.post('/signin', adminLoginController)

// Create Organisation
router.post('/organisations',[adminAuth], createOrganisationController);
// Update Organisation by ID
router.put('/organisations/:id',[adminAuth], updateOrganisationController);
// Get all Organisations
router.get('/organisations',[adminAuth],  findAllOrganisationsController);
// Search Organisations by word or regex
router.get('/organisations/search',[adminAuth], searchOrganisationsController);


router.post('/createmenu',[adminAuth] , createMenuController )
router.get('/getallmenu',[adminAuth] , getAllMenusController )

router.post('/createrole',[adminAuth] , createRoleController )
router.get('/getrole',[adminAuth] , getRoleController )
router.post('/accesscontrol',[adminAuth], createAccessController);
router.post('/accesscontrol/update',[adminAuth], updateAccessController);
router.post('/getmenubyrole', [adminAuth], getMenusByRoleController)

router.post('/createusers', [adminAuth], createUserController)
router.get('/getusers', [adminAuth], getAllUserController)
router.post('/departments',[adminAuth] ,createDepartmentController )
router.get('/departments',[adminAuth] ,getAllDepartmentController )
router.put('/departments/:department_id',[adminAuth] ,updateDepartmentController )

router.post("/createkitchen", [adminAuth], createKitchen);
router.get("/getallkitchens", [adminAuth], getKitchens);
router.put("/updatekitchen/:id", [adminAuth], updateKitchen);

router.post('/assign-user', [adminAuth], assignUserToEntityController);

router.post('/createfunction', [adminAuth], createFunctionController);
router.get('/getFunctions',[adminAuth], getAllFunctionsController)
router.put('/updatefunction/:id', [adminAuth], updateFunctionController);





export default router