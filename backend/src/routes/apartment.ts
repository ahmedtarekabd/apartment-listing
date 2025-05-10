import { Router } from 'express'
import {
  getApartments,
  getApartmentById,
  addApartment,
} from '../controllers/apartmentController'
import { validate } from '../middleware/validationMiddleware'
import {
  apartmentsIdSchema,
  apartmentsSchema,
} from '../validators/apartmentSchema'
// import { authenticate } from '../middleware/auth'

const router = Router()
// router.use(authenticate)

// An API endpoint for listing apartments.
router.get('/', getApartments)

// An API endpoint for getting apartment details.
router.get('/:id', validate({ params: apartmentsIdSchema }), getApartmentById)

// An API for adding apartments.
router.post('/', validate({ body: apartmentsSchema }), addApartment)

export default router
