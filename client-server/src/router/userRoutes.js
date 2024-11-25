import { Router } from 'express'
import getUser from '../controllers/user/get.js'
const router = Router()

// Get user
router.get('/getUser/:userId', getUser)

export default router
