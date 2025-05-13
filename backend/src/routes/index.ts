import { Router } from 'express'
import apartmentRouter from './apartment'
import projectsRouter from './projects'

const router = Router()

router.use('/apartments', apartmentRouter)
router.use('/projects', projectsRouter)

export default router
