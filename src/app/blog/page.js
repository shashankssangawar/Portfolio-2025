'use client';

import Link from 'next/link';
import Image from 'next/image';
import { useState, useMemo } from 'react';
import { BLOGS } from '@/constants/blogs';
import { Separator } from '@/components/ui/separator';
import { Input } from '@/components/ui/input';
import { Select, SelectTrigger, SelectContent, SelectItem, SelectValue } from '@/components/ui/select';
import { Search } from 'lucide-react';

export default function BlogPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [category, setCategory] = useState('all');

  // Extract all categories dynamically from BLOGS
  const categories = useMemo(() => {
    const set = new Set();
    BLOGS.forEach((blog) => blog.tags.forEach((tag) => set.add(tag)));
    return Array.from(set);
  }, []);

  // Filter Blogs
  const filteredBlogs = BLOGS.filter((blog) => {
    const matchesSearch =
      blog.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      blog.description.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      category === 'all' ? true : blog.tags.includes(category);

    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-foreground mb-4">Hey, You Made It!</h1>
          <p className="text-muted-foreground">
            This is my corner of the internet where I document what I break, what I fix, and everything I discover while building and securing systems.
          </p>
        </div>

        {/* 🔍 Search + Category Filter Block */}
        <div className="flex flex-col md:flex-row items-center gap-4 mt-10">
          <div className="relative w-full md:w-3/4">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground"
            />
            <Input
              placeholder="Search Blogs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          <Select onValueChange={setCategory} defaultValue="all">
            <SelectTrigger className="w-full md:w-1/4">
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All</SelectItem>
              {categories.map((cat) => (
                <SelectItem key={cat} value={cat}>
                  {cat}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <Separator className="my-10" />

        {/* Blogs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredBlogs.length === 0 && (
            <p className="text-muted-foreground col-span-full text-center">
              No blogs found.
            </p>
          )}

          {[...filteredBlogs].reverse().map((blog) => (
            <Link href={`/blog/${blog.slug}`} key={blog.id} className="group">
              <article className="bg-card rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border border-border h-full flex flex-col">
                <div className="relative h-48 w-full overflow-hidden">
                  <Image
                    src={blog.image}
                    alt={blog.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500 object-top"
                  />
                </div>

                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
                    <span>{blog.publishedAt}</span>
                    <span>•</span>
                    <span>{blog.readTime}</span>
                  </div>

                  <h2 className="text-xl font-bold text-card-foreground mb-3 line-clamp-2 group-hover:text-primary transition-colors">
                    {blog.title}
                  </h2>

                  <p className="text-muted-foreground text-sm mb-4 line-clamp-3 flex-grow">
                    {blog.description}
                  </p>

                  <div className="flex flex-wrap gap-2 mt-auto">
                    {blog.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-xs bg-secondary text-secondary-foreground px-2 py-1 rounded-md"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
