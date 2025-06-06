import fs from 'fs'
import prisma from './prisma'
import { Apartment } from '../generated/prisma'

const forceUpdate = process.env.FORCE_UPDATE === 'true' || false

async function main() {
  // Check if apartments data already exist to avoid duplication
  const count = await prisma.apartment.count()
  if (count > 0) {
    if (forceUpdate) {
      console.log('Apartments already exist. Force updating...')
      await prisma.apartment.deleteMany()
    } else {
      console.log('Apartments already exist. Skipping seeding.')
      return
    }
  }

  console.log('Seeding apartments...')

  const rawData = fs.readFileSync('./src/database/seed.json', 'utf-8')
  const apartments = JSON.parse(rawData).map((apartment: Apartment) => {
    if (!Array.isArray(apartment.images)) {
      apartment.images = [apartment.images]
    }
    const { id, ...rest } = apartment
    return rest
  })
  // console.log(apartments[0])
  await prisma.apartment.createMany({ data: apartments })

  console.log('✔ Apartments seeded successfully')
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(() => prisma.$disconnect())
