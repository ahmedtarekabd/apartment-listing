import { Request, Response } from 'express'

const apartmentsList = [
  {
    id: 1,
    unit_name: 'Apartment A',
    unit_number: '101',
    description: 'A cozy apartment with a beautiful view.',
    price: 1200,
    images: [],
    address: '',
    city: '',
    country: '',
    created_at: '',
    updated_at: '',
    deleted_at: '',
  },
  {
    id: 2,
    unit_name: 'Apartment B',
    unit_number: '102',
    description: 'A spacious apartment with modern amenities.',
    price: 1500,
    images: [],
    address: '',
    city: '',
    country: '',
    created_at: '',
    updated_at: '',
    deleted_at: '',
  },
]

export const getApartments = async (req: Request, res: Response) => {
  try {
    const apartments = apartmentsList
    res.status(200).json(apartments)
  } catch (error) {
    console.error('Error fetching apartments:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}

export const getApartmentById = async (req: Request, res: Response) => {
  try {
    const { id } = req.params
    const apartment = apartmentsList.find(
      (apartment) => apartment.id === Number(id)
    )
    if (!apartment)
      return void res.status(404).json({ error: 'Apartment not found' })

    res.status(200).json(apartment)
  } catch (error) {
    console.error('Error fetching apartment:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}

export const addApartment = async (req: Request, res: Response) => {
  try {
    const {
      unit_name,
      unit_number,
      description,
      price,
      images,
      address,
      city,
      country,
    } = req.body
    const newApartment = {
      id: apartmentsList.length + 1,
      unit_name,
      unit_number,
      description,
      price,
      images,
      address,
      city,
      country,
      created_at: '',
      updated_at: '',
      deleted_at: '',
    }
    apartmentsList.push(newApartment)

    res.status(201).json(newApartment)
  } catch (error) {
    console.error('Error adding apartment:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}
