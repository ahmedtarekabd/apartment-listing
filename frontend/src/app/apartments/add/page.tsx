'use client'

import type React from 'react'

import { useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { ArrowLeft, Loader2, Plus, X } from 'lucide-react'
import { toast } from 'sonner'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import {
  apartmentSchema,
  ApartmentSchema,
} from '@/zod-schemas/apartments-schema'
import Image from 'next/image'

export default function AddApartmentPage() {
  const router = useRouter()

  const form = useForm<ApartmentSchema>({
    resolver: zodResolver(apartmentSchema),
    defaultValues: {
      unit_name: '',
      unit_number: '',
      description: '',
      project: '',
      price: 0,
      images: [] as string[],
      address: '',
      city: '',
      country: '',
    },
  })
  const { isSubmitting } = form.formState

  async function onSubmit(values: ApartmentSchema) {
    try {
      const apartmentData = apartmentSchema.parse(values)

      await axios.post('/apartments', apartmentData)

      toast.success('Success', {
        description: 'Apartment has been added successfully',
      })

      router.push('/apartments')
    } catch (error) {
      console.error('Error adding apartment:', error)
      toast.error('Error', {
        description: 'Failed to add apartment. Please try again.',
      })
    }
  }

  // State to manage the image URL input
  const [imageUrl, setImageUrl] = useState('')
  const addImage = () => {
    if (imageUrl && !form.getValues('images').includes(imageUrl)) {
      form.setValue('images', [...form.getValues('images'), imageUrl])
      setImageUrl('')
    }
  }
  const removeImage = (index: number) => {
    form.setValue(
      'images',
      form.getValues('images').filter((_, i) => i !== index),
    )
  }

  return (
    <div className='container mx-auto px-4 py-8'>
      <Button asChild variant='outline' className='mb-6'>
        <Link href='/apartments'>
          <ArrowLeft className='mr-2 h-4 w-4' />
          Back to Apartments
        </Link>
      </Button>

      <Card className='mx-auto max-w-3xl'>
        <CardHeader>
          <CardTitle>Add New Apartment</CardTitle>
          <CardDescription>
            Fill in the details to add a new apartment listing
          </CardDescription>
        </CardHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardContent className='space-y-6'>
              <div className='grid grid-cols-1 gap-6 md:grid-cols-2'>
                <FormField
                  control={form.control}
                  name='unit_name'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Unit Name</FormLabel>
                      <FormControl>
                        <Input placeholder='Enter unit name' {...field} />
                      </FormControl>
                      <FormDescription>
                        This is your apartment&apos;s name.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name='unit_number'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Unit Number</FormLabel>
                      <FormControl>
                        <Input placeholder='Enter unit number' {...field} />
                      </FormControl>
                      <FormDescription>
                        This is the unit number.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name='project'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Project</FormLabel>
                      <FormControl>
                        <Input placeholder='Enter project name' {...field} />
                      </FormControl>
                      <FormDescription>
                        This is your project&apos;s name.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name='price'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Price</FormLabel>
                      <FormControl>
                        <Input
                          type='number'
                          min={0}
                          placeholder='Enter price'
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        This is your apartment&apos;s price.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name='description'
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea rows={4} {...field} />
                    </FormControl>
                    <FormDescription>
                      Write your apartment&apos;s description.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <div className='space-y-2'>
                <FormField
                  control={form.control}
                  name='images'
                  render={() => (
                    <FormItem>
                      <FormLabel>Images</FormLabel>
                      <FormControl>
                        <div className='flex gap-2'>
                          <Input
                            value={imageUrl}
                            onChange={(e) => setImageUrl(e.target.value)}
                            placeholder='Enter image URL'
                            className='flex-1'
                          />
                          <Button
                            type='button'
                            onClick={addImage}
                            variant='outline'
                          >
                            <Plus className='h-4 w-4' />
                          </Button>
                        </div>
                      </FormControl>
                      <FormDescription>
                        Add images of your apartment. You can add multiple
                        images.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {form.getValues('images').length > 0 && (
                  <div className='mt-4 grid grid-cols-2 gap-4 sm:grid-cols-3'>
                    {form.getValues('images').map((image, index) => (
                      <div key={index} className='group relative'>
                        <div className='bg-muted aspect-video overflow-hidden rounded-md'>
                          <Image
                            src={image || '/placeholder.svg'}
                            alt={`Apartment image ${index + 1}`}
                            layout='fill'
                            className='h-full w-full object-cover'
                          />
                        </div>
                        <Button
                          type='button'
                          variant='destructive'
                          size='icon'
                          className='absolute top-1 right-1 h-6 w-6 opacity-0 transition-opacity group-hover:opacity-100'
                          onClick={() => removeImage(index)}
                        >
                          <X className='h-3 w-3' />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className='grid grid-cols-1 gap-6 md:grid-cols-3'>
                <FormField
                  control={form.control}
                  name='address'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Address</FormLabel>
                      <FormControl>
                        <Input placeholder='Enter address' {...field} />
                      </FormControl>
                      <FormDescription>
                        This is your apartment&apos;s address.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name='city'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>City</FormLabel>
                      <FormControl>
                        <Input placeholder='Enter city' {...field} />
                      </FormControl>
                      <FormDescription>
                        This is your apartment&apos;s city.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name='country'
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Country</FormLabel>
                      <FormControl>
                        <Input placeholder='Enter country' {...field} />
                      </FormControl>
                      <FormDescription>
                        This is your apartment&apos;s country.
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </CardContent>

            <CardFooter className='mt-8 flex justify-between'>
              <Link href='/apartments'>
                <Button type='button' variant='outline'>
                  Cancel
                </Button>
              </Link>
              <Button type='submit' disabled={isSubmitting}>
                {isSubmitting && (
                  <Loader2 className='mr-2 h-4 w-4 animate-spin' />
                )}
                Add Apartment
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>
    </div>
  )
}
