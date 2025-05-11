import { Router } from 'express'
import apartmentRouter from './apartment'

const router = Router()

router.use('/apartments', apartmentRouter)

export default router
