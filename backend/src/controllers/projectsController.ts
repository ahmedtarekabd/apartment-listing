import { Request, Response } from 'express'
import prisma from '../database/prisma'

export const getProjects = async (req: Request, res: Response) => {
  try {
    const projects = await prisma.apartment.findMany({
      select: {
        project: true,
      },
      distinct: ['project'],
    })

    const projectNames = projects.map((project) => project.project)

    res.status(200).json(projectNames)
  } catch (error) {
    console.error('Error fetching projects:', error)
    res.status(500).json({ error: 'Internal server error' })
  }
}
