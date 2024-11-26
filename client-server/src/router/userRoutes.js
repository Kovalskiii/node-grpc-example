import { Router } from 'express'
import getUser from '../controllers/user/get.js'
import getUserFile from '../controllers/user/getUserFile.js'
const router = Router()

// Get user
router.get('/getUser/:userId', getUser)

router.post('/getUserFile', getUserFile)
export default router
