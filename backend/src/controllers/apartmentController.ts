import { Request, Response } from 'express'
import { strToList } from '../lib/utils'
import prisma from '../database/prisma'
import { Prisma } from '../generated/prisma'

export const getApartments = async (req: Request, res: Response) => {
  try {
    const { page = 1, limit = 9, search = '', projects = '' } = req.query
    const pageNumber = Number(page)
    const limitNumber = Number(limit)
    const offset = (pageNumber - 1) * limitNumber

    const where: Prisma.ApartmentWhereInput = {
      AND: [
        {
          OR: search
            ? [
                {
                  unit_name: {
                    contains: search.toString(),
                    mode: Prisma.QueryMode.insensitive,
                  },
                },
                {
                  unit_number: {
                    contains: search.toString(),
                    mode: Prisma.QueryMode.insensitive,
                  },
                },
                {
                  project: {
                    contains: search.toString(),
                    mode: Prisma.QueryMode.insensitive,
                  },
                },
                {
                  description: {
                    contains: search.toString(),
                    mode: Prisma.QueryMode.insensitive,
                  },
                },
              ]
            : undefined,
        },
        {
          project: projects
            ? {
                in: strToList(projects.toString()),
              }
            : undefined,
        },
      ].filter(Boolean), // Remove undefined conditions
    }

    const [apartments, totalApartments] = await prisma.$transaction([
      prisma.apartment.findMany({
        skip: offset,
        take: limitNumber,
        where: where,
        orderBy: {
          created_at: 'desc',
        },
      }),
      prisma.apartment.count({ where: where }),
    ])

    const totalPages = Math.ceil(totalApartments / limitNumber)
    if (apartments.length === 0)
      return void res
        .status(404)
        .json({ error: 'No apartments found. Try adjusting your search.' })

    if (offset >= totalApartments)
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
    const apartment = await prisma.apartment.findUnique({
      where: {
        id: id,
      },
    })
    console.log('Apartment:', apartment)
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
    const newApartment = await prisma.apartment.create({
      data: {
        unit_name,
        unit_number,
        description,
        project,
        price,
        images,
        address,
        city,
        country,
      },
    })

    res.status(201).json(newApartment)
  } catch (error) {
    console.error('Error adding apartment:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}
