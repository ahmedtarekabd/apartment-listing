import { Router } from 'express'
import {
  getApartments,
  getApartmentById,
  addApartment,
} from '../controllers/apartmentController.js'
import { validate } from '../middleware/validationMiddleware.js'
import {
  apartmentsIdSchema,
  apartmentsSchema,
} from '../validators/apartmentSchema.js'
// import { authenticate } from '../middleware/auth.js'

const router = Router()
// router.use(authenticate)

router.use('/appartements', router)

// An API endpoint for listing apartments.
router.get('/', getApartments)

// An API endpoint for getting apartment details.
router.get('/:id', validate({ params: apartmentsIdSchema }), getApartmentById)

// An API for adding apartments.
router.post('/', validate({ body: apartmentsSchema }), addApartment)

export default router
