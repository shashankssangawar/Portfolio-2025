import { Search, ArrowLeft, X } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

export default function ProjectsHeader({ searchQuery, handleSearchChange, filters, setFilters }) {
  return (
    <div className="border-b bg-background/95 backdrop-blur-sm mb-8">
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto text-center">
          <div className="container-modern py-4 md:py-6">
            {/* Search Header */}
            <div className="space-y-4">
              <div>
                <h1 className="text-2xl md:text-3xl font-bold mb-2">
                  Projects
                </h1>
                <p className="text-muted-foreground text-sm md:text-base">
                  Projects I have created for the clients.
                  (Most of the websites mentioned are demo websites and not live website as we have signed NDAs for them)
                </p>
              </div>

              <div className='flex md:flex-row flex-col md:items-center gap-4'>
                {/* Search Bar */}
                <div className="relative w-full">
                  <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                  <Input
                    placeholder="Search Projects by name..."
                    value={searchQuery}
                    onChange={(e) => handleSearchChange(e.target.value)}
                    className="pl-12 pr-4 py-3 text-sm md:text-base bg-background border-2 border-border focus:border-primary/50 rounded-xl"
                  />
                  {searchQuery && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1 h-8 w-8"
                      onClick={() => handleSearchChange('')}
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  )}
                </div>

                {/* Filters */}
                <div className='flex'>
                  <Select value={filters.category} onValueChange={(value) => setFilters({ ...filters, category: value })}>
                    <SelectTrigger className="md:w-[180px] w-full">
                      <SelectValue placeholder="Category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Categories</SelectLabel>
                        <SelectItem value="Portfolio">Portfolio</SelectItem>
                        <SelectItem value="Landing Page">Landing Page</SelectItem>
                        <SelectItem value="Software">Software</SelectItem>
                        <SelectItem value="Games">Games</SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
};
