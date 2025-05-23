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
import { PaginatedResponse, SearchParams } from '@/types/params'

export default async function ApartmentsPage({
  searchParams,
}: {
  searchParams: SearchParams
}) {
  const {
    page: pageParam,
    limit: limitParam,
    search: searchParam,
    projects: projectsParam,
    sortBy: sortByParam,
    sortOrder: sortOrderParam,
  } = await searchParams
  const page = Number(pageParam) || 1
  const limit = Number(limitParam) || 9
  const search = (searchParam as string) || ''
  const projects = (projectsParam as string) || ''
  const sortBy = (sortByParam as string) || 'created_at'
  const sortOrder = (sortOrderParam as string) || 'desc'

  let response
  let errorMessage = ''

  try {
    response = await axios.get<PaginatedResponse<Apartment>>('/apartments', {
      params: {
        page,
        limit,
        search,
        projects,
        sortBy,
        sortOrder,
      },
    })
  } catch (error) {
    console.error('Error fetching apartments:', error)
    // 404 is considered as warning - Empty data

    // Handle other errors
    if (axios.isAxiosError(error) && error.status != 404) {
      console.error('Error fetching apartments:', error.status)
      errorMessage = error.message
        ? `${error.message} - ${error.response?.data.error}`
        : 'Failed to fetch apartments.'
    }
  }

  const apartments: Apartment[] = response?.data.data || []
  const nextPage = response?.data.meta.links.next
  const prevPage = response?.data.meta.links.prev
  const firstPage = response?.data.meta.links.first
  const lastPage = response?.data.meta.links.last
  const totalPages = response?.data.meta.totalPages || 1

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
      <SearchFilter
        search={search}
        filter={projects}
        sortBy={sortBy}
        sortOrder={sortOrder}
      />

      {errorMessage ? (
        <div className='py-8 text-center text-red-500'>{errorMessage}</div>
      ) : apartments.length === 0 ? (
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
            {prevPage && (
              <PaginationItem>
                <PaginationPrevious href={prevPage} />
              </PaginationItem>
            )}

            {firstPage && (
              <PaginationItem>
                <Link href={firstPage}>
                  <Button variant='ghost' className='mx-2'>
                    First
                  </Button>
                </Link>
              </PaginationItem>
            )}

            {Array.from({ length: 5 }, (_, i) => page - 2 + i)
              .filter((pageNum) => pageNum > 0 && pageNum <= totalPages)
              .map((pageNum) => (
                <PaginationItem key={pageNum}>
                  <PaginationLink
                    href={`/apartments?page=${pageNum}&search=${search}&projects=${projects}`}
                    isActive={pageNum === page}
                  >
                    {pageNum}
                  </PaginationLink>
                </PaginationItem>
              ))}

            {lastPage && (
              <PaginationItem>
                <Link href={lastPage}>
                  <Button variant='ghost' className='mx-2'>
                    Last
                  </Button>
                </Link>
              </PaginationItem>
            )}

            {nextPage && (
              <PaginationItem>
                <PaginationNext href={nextPage} />
              </PaginationItem>
            )}
          </PaginationContent>
        </Pagination>
      )}
    </div>
  )
}
