import { Router } from 'express'
import { getProjects } from '../controllers/projectsController'

const router = Router()

// An API endpoint for listing projects.
router.get('/', getProjects)

export default router
