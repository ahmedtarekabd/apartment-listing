'use client'

import { useState, useEffect } from 'react'
import axios from '@/lib/axios'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import { ArrowLeft, Calendar, Home, MapPin } from 'lucide-react'
import { Apartment } from '@/types/apartments'
import Image from 'next/image'

export default function ApartmentDetailsPage() {
  const { id } = useParams<{ id: string }>()
  const [apartment, setApartment] = useState<Apartment | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [activeImage, setActiveImage] = useState(0)

  useEffect(() => {
    const fetchApartment = async () => {
      try {
        setLoading(true)
        const response = await axios.get(`/apartments/${id}`)
        console.log('Apartment:', response.data)
        setApartment(response.data)
        setLoading(false)
      } catch {
        setError('Failed to fetch apartment details')
        setLoading(false)
      }
    }

    fetchApartment()
  }, [id])

  if (loading) {
    return (
      <div className='container mx-auto flex min-h-[400px] items-center justify-center px-4 py-8'>
        <div className='border-primary h-12 w-12 animate-spin rounded-full border-t-2 border-b-2'></div>
      </div>
    )
  }

  if (error || !apartment) {
    return (
      <div className='container mx-auto px-4 py-8'>
        <div className='py-8 text-center'>
          <p className='text-red-500'>{error || 'Apartment not found'}</p>
          <Button asChild variant='outline' className='mt-4'>
            <Link href='/apartments'>Back to Apartments</Link>
          </Button>
        </div>
      </div>
    )
  }

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    })
  }

  return (
    <div className='container mx-auto px-4 py-8'>
      <Button asChild variant='outline' className='mb-6'>
        <Link href='/apartments'>
          <ArrowLeft className='mr-2 h-4 w-4' />
          Back to Apartments
        </Link>
      </Button>

      <div className='grid grid-cols-1 gap-8 lg:grid-cols-3'>
        <div className='lg:col-span-2'>
          <div className='mb-4'>
            <div className='bg-muted aspect-video overflow-hidden rounded-lg'>
              {apartment.images && apartment.images.length > 0 ? (
                <Image
                  src={apartment.images[activeImage] || '/placeholder.svg'}
                  alt={apartment.unit_name}
                  layout='fill'
                  className='h-full w-full object-cover'
                />
              ) : (
                <div className='flex h-full items-center justify-center'>
                  <Home className='text-muted-foreground h-16 w-16' />
                </div>
              )}
            </div>

            {apartment.images && apartment.images.length > 1 && (
              <div className='mt-4 flex gap-2 overflow-x-auto pb-2'>
                {apartment.images.map((image, index) => (
                  <div
                    key={index}
                    className={`h-20 w-20 flex-shrink-0 cursor-pointer overflow-hidden rounded-md border-2 ${
                      activeImage === index
                        ? 'border-primary'
                        : 'border-transparent'
                    }`}
                    onClick={() => setActiveImage(index)}
                  >
                    <Image
                      src={image || '/placeholder.svg'}
                      alt={`${apartment.unit_name} ${index + 1}`}
                      layout='fill'
                      className='h-full w-full object-cover'
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          <h1 className='mb-2 text-3xl font-bold'>
            {apartment.unit_name} - {apartment.unit_number}
          </h1>
          <div className='text-muted-foreground mb-4 flex items-center'>
            <MapPin className='mr-1 h-4 w-4' />
            <span>
              {apartment.address}, {apartment.city}, {apartment.country}
            </span>
          </div>

          <Separator className='my-6' />

          <div className='mb-6'>
            <h2 className='mb-4 text-xl font-semibold'>Description</h2>
            <p className='whitespace-pre-line'>{apartment.description}</p>
          </div>
        </div>

        <div>
          <Card>
            <CardContent className='pt-6'>
              <div className='mb-4'>
                <p className='text-muted-foreground text-sm'>Price</p>
                <p className='text-3xl font-bold'>${apartment.price}</p>
              </div>

              <Separator className='my-4' />

              <div className='space-y-4'>
                <div>
                  <p className='text-muted-foreground text-sm'>Project</p>
                  <p className='font-medium'>{apartment.project}</p>
                </div>

                <div>
                  <p className='text-muted-foreground text-sm'>Unit Details</p>
                  <p className='font-medium'>Name: {apartment.unit_name}</p>
                  <p className='font-medium'>Number: {apartment.unit_number}</p>
                </div>

                <div className='flex items-center'>
                  <Calendar className='text-muted-foreground mr-2 h-4 w-4' />
                  <div>
                    <p className='text-sm'>
                      Listed on {formatDate(apartment.created_at)}
                    </p>
                    <p className='text-muted-foreground text-sm'>
                      Last updated: {formatDate(apartment.updated_at)}
                    </p>
                  </div>
                </div>
              </div>

              <Separator className='my-4' />

              <Button className='w-full'>Contact Agent</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
