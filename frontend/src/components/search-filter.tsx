'use client'

import { Search } from 'lucide-react'
import { Input } from './ui/input'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from './ui/button'

const SearchFilter = ({
  search,
  filter,
}: {
  search: string
  filter: string
}) => {
  const router = useRouter()
  const [searchInput, setSearchInput] = useState(search)
  const [filterInput, setFilterInput] = useState(filter)
  const handleSearch = () => {
    const params = new URLSearchParams()
    params.set('page', '1')
    if (searchInput) params.set('search', searchInput)
    if (filterInput && filterInput != 'all') params.set('projects', filterInput)
    router.push(`/apartments?${params.toString()}`)
  }
  return (
    <div className='mb-8 flex flex-col gap-4 md:flex-row'>
      <div className='flex-1'>
        <div className='relative'>
          <Search className='text-muted-foreground absolute top-2.5 left-2.5 h-4 w-4' />
          <Input
            type='text'
            placeholder='Search by unit name, number or project...'
            className='pl-8'
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          />
        </div>
      </div>
      <div className='w-full md:w-48'>
        <Select
          value={filterInput}
          onValueChange={(value) => {
            setFilterInput(value)
          }}
        >
          <SelectTrigger>
            <SelectValue placeholder='Filter by project...' />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value='all'>All Projects</SelectItem>
            <SelectItem value='project A'>Project A</SelectItem>
            <SelectItem value='project B'>Project B</SelectItem>
            <SelectItem value='project C'>Project C</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Button onClick={handleSearch}>Apply Filters</Button>
    </div>
  )
}

export default SearchFilter
