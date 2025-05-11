import axios from '@/lib/axios'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/ui/pagination'
import { Plus } from 'lucide-react'
import { Apartment } from '@/types/apartments'
import SearchFilter from '@/components/search-filter'
import ApartmentCard from '@/components/apartment-card'
import { SearchParams } from '@/types/params'

export default async function ApartmentsPage({
  searchParams,
}: {
  searchParams: SearchParams
}) {
  const {
    page: pageParam,
    search: searchParam,
    filter: filterParam,
  } = await searchParams
  const page = Number(pageParam) || 1
  const search = (searchParam as string) || ''
  const filter = (filterParam as string) || ''

  const response = await axios.get('/apartments', {
    params: {
      page,
      limit: 9,
      search,
      filter,
    },
  })

  const apartments: Apartment[] = response.data
  const totalPages = response.data.totalPages || 1

  return (
    <div className='container mx-auto px-4 py-8'>
      <div className='mb-8 flex items-center justify-between'>
        <h1 className='text-3xl font-bold'>Apartments</h1>
        <Link href='/apartments/add'>
          <Button>
            <Plus className='mr-2 h-4 w-4' />
            Add Apartment
          </Button>
        </Link>
      </div>

      {/* Search & Filter */}
      <SearchFilter search={search as string} filter={filter as string} />

      {apartments.length === 0 ? (
        <div className='py-8 text-center'>
          <p className='text-muted-foreground'>
            No apartments found. Try adjusting your search.
          </p>
        </div>
      ) : (
        <div className='grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3'>
          {apartments.map((apartment) => (
            <ApartmentCard apartment={apartment} key={apartment.id} />
          ))}
        </div>
      )}

      {totalPages > 1 && (
        <Pagination className='mt-8'>
          <PaginationContent>
            {page > 1 && (
              <PaginationItem>
                <PaginationPrevious
                  href={`/apartments?page=${page - 1}&search=${search}&filter=${filter}`}
                />
              </PaginationItem>
            )}

            {Array.from({ length: totalPages }, (_, i) => i + 1).map(
              (pageNum) => (
                <PaginationItem key={pageNum}>
                  <PaginationLink
                    href={`/apartments?page=${pageNum}&search=${search}&filter=${filter}`}
                    isActive={pageNum === page}
                  >
                    {pageNum}
                  </PaginationLink>
                </PaginationItem>
              ),
            )}

            {page < totalPages && (
              <PaginationItem>
                <PaginationNext
                  href={`/apartments?page=${page + 1}&search=${search}&filter=${filter}`}
                />
              </PaginationItem>
            )}
          </PaginationContent>
        </Pagination>
      )}
    </div>
  )
}
