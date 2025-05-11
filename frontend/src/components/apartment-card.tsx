import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Apartment } from '@/types/apartments'
import { Home } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from './ui/button'

const ApartmentCard = ({ apartment }: { apartment: Apartment }) => {
  console.log('ApartmentCard:', apartment)
  return (
    <Card key={apartment.id} className='overflow-hidden pt-0'>
      <div className='bg-muted relative aspect-video'>
        {apartment.images && apartment.images.length > 0 ? (
          <Image
            src={apartment.images[0] || '/placeholder.svg'}
            alt={apartment.unit_name}
            layout='fill'
            className='h-full w-full object-cover'
          />
        ) : (
          <div className='flex h-full items-center justify-center'>
            <Home className='text-muted-foreground h-12 w-12' />
          </div>
        )}
      </div>
      <CardHeader>
        <CardTitle>
          {apartment.unit_name} - {apartment.unit_number}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <p className='text-muted-foreground mb-2 text-sm'>
          {apartment.project}
        </p>
        <p className='text-lg font-bold'>${apartment.price.toLocaleString()}</p>
        <p className='mt-2 truncate text-sm'>
          {apartment.address}, {apartment.city}
        </p>
      </CardContent>
      <CardFooter>
        <Link href={`/apartments/${apartment.id}`}>
          <Button variant='outline' className='w-full'>
            View Details
          </Button>
        </Link>
      </CardFooter>
    </Card>
  )
}

export default ApartmentCard
