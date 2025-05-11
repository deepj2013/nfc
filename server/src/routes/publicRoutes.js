import express from 'express'
import {  getPublicFunctionsController } from '../controllers/adminController.js'
const router = express.Router()


router.get('/occasionlist',  getPublicFunctionsController)






export default router