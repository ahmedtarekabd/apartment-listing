import { Request, Response } from 'express'
import { strToList } from '../lib/utils'

const apartmentsList = [
  {
    id: 1,
    unit_name: 'Apartment A',
    unit_number: '101',
    project: 'Project A',
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
    project: 'Project B',
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
  {
    id: 3,
    unit_name: 'Apartment A',
    unit_number: '101',
    project: 'Project A',
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
    id: 4,
    unit_name: 'Apartment B',
    unit_number: '102',
    project: 'Project B',
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
  {
    id: 5,
    unit_name: 'Apartment A',
    unit_number: '101',
    project: 'Project A',
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
    id: 6,
    unit_name: 'Apartment B',
    unit_number: '102',
    project: 'Project B',
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
  {
    id: 7,
    unit_name: 'Apartment A',
    unit_number: '101',
    project: 'Project A',
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
    id: 8,
    unit_name: 'Apartment B',
    unit_number: '102',
    project: 'Project B',
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
  {
    id: 9,
    unit_name: 'Apartment A',
    unit_number: '101',
    project: 'Project A',
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
    id: 10,
    unit_name: 'Apartment B',
    unit_number: '102',
    project: 'Project B',
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
    const { page = 1, limit = 9, search = '', projects = '' } = req.query
    const pageNumber = Number(page)
    const limitNumber = Number(limit)
    const offset = (pageNumber - 1) * limitNumber

    const filteredApartments = apartmentsList.filter((apartment) => {
      const searchLower = search.toString().toLowerCase()
      const searchMatch =
        apartment.unit_name.toLowerCase().includes(searchLower) ||
        apartment.unit_number.toLowerCase().includes(searchLower) ||
        apartment.project.toLowerCase().includes(searchLower) ||
        apartment.description.toLowerCase().includes(searchLower)

      const projectMatch = strToList(projects.toString()).some((project) => {
        return apartment.project.toLowerCase().includes(project.toLowerCase())
      })

      return (
        (searchMatch || searchLower === '') && (projectMatch || projects === '')
      )
    })

    const apartments = filteredApartments.slice(offset, offset + limitNumber)
    const totalPages = Math.ceil(filteredApartments.length / limitNumber)
    if (apartments.length === 0)
      return void res
        .status(404)
        .json({ error: 'No apartments found. Try adjusting your search.' })

    if (offset >= apartmentsList.length)
      return void res.status(400).json({
        error: 'Page number exceeds total pages',
      })

    res.status(200).json({
      data: apartments,
      meta: {
        page: pageNumber,
        pageSize: limitNumber,
        totalPages: totalPages,
        links: {
          self: `/apartments?page=${pageNumber}&limit=${limitNumber}`,
          next:
            pageNumber < totalPages
              ? `/apartments?page=${pageNumber + 1}&limit=${limitNumber}`
              : null,
          prev:
            pageNumber > 1
              ? `/apartments?page=${pageNumber - 1}&limit=${limitNumber}`
              : null,
          first: `/apartments?page=1&limit=${limitNumber}`,
          last: `/apartments?page=${totalPages}&limit=${limitNumber}`,
        },
      },
    })
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
      project,
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
      project,
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
