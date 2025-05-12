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
  paginationSchema,
} from '../validators/apartmentSchema'

const router = Router()

// An API endpoint for listing apartments.
router.get('/', validate({ query: paginationSchema }), getApartments)

// An API endpoint for getting apartment details.
router.get('/:id', validate({ params: apartmentsIdSchema }), getApartmentById)

// An API for adding apartments.
router.post('/', validate({ body: apartmentsSchema }), addApartment)

export default router
