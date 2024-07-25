import express from 'express'
import Controller from '../controllers/controller.js'
import { Router } from 'express'

import isValidated from '../middlewares/validator.js'

const router = express.Router()


router.get("/login",Controller.login_get)

router.post('/login',Controller.login_post)

router.get("/register",Controller.register_get)

router.post('/register',Controller.register_post)

router.get("/dashboard",isValidated,Controller.dashboard_get)

router.post('/logout',Controller.logout_post)



export default router