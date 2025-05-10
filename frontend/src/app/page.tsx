import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'

export default function HomePage() {
  return (
    <main>
      <section className='bg-muted container flex h-screen w-full flex-col items-center justify-center px-4 py-12 text-center md:px-6 md:py-24 lg:py-32 xl:py-48'>
        <div className='space-y-4'>
          <div className='space-y-2'>
            <h1 className='text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none'>
              Find Your Perfect Apartment
            </h1>
            <p className='text-muted-foreground mx-auto max-w-[700px] md:text-xl'>
              Browse our extensive collection of premium apartments in top
              locations.
            </p>
          </div>
          <div className='space-x-4'>
            <Link href='/apartments' className='inline-flex items-center'>
              <Button size='lg'>
                View Apartments
                <ArrowRight className='ml-2 h-4 w-4' />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  )
}
