import fs from 'fs';
import path from 'path';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import rehypeHighlight from 'rehype-highlight';
import { ArrowLeft, Calendar, Clock, Tag } from 'lucide-react';
import { BLOGS } from '@/constants/blogs';
import '../blog.css';
import { Badge } from '@/components/ui/badge';
import { markdownToHtml } from '@/lib/markdown-to-html';

// Force dynamic rendering if necessary, but since we are reading files, static generation is better if we knew all paths.
// For now, we'll just let Next.js handle it.

export async function generateStaticParams() {
  return BLOGS.map((blog) => ({
    slug: blog.slug,
  }));
}

async function getBlogData(slug) {
  const blog = BLOGS.find((b) => b.slug === slug);

  if (!blog) {
    return null;
  }

  const filePath = path.join(process.cwd(), 'src/content/blogs', blog.content_file);

  try {
    const content = fs.readFileSync(filePath, 'utf8');
    return { ...blog, content };
  } catch (error) {
    console.error(`Error reading markdown file for slug ${slug}:`, error);
    return null;
  }
}

export default async function BlogPost({ params }) {
  const { slug } = await params;
  const blog = await getBlogData(slug);

  if (!blog) {
    notFound();
  }

  // Convert Markdown to HTML with syntax highlighting + copy button
  const htmlContent = await markdownToHtml(blog.content);

  return (
    <article className="min-h-screen pb-20">
      {/* Hero Section */}
      <div className="relative h-[60vh] w-full">
        <Image
          src={blog.image}
          alt={blog.title}
          fill
          className="object-cover brightness-50"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />

        <div className="absolute top-8 left-0 right-0 container mx-auto px-4 pb-12">
          <Link
            href="/blog"
            className="inline-flex items-center text-white/80 hover:text-white mb-6 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Blogs
          </Link>

          <div className="flex flex-wrap gap-3 mb-6">
            {blog.tags.map((tag) => (
              <span key={tag} className="bg-white/10 backdrop-blur-sm text-white px-3 py-1 rounded-full text-sm border border-white/20">
                {tag}
              </span>
            ))}
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 leading-tight">
            {blog.title}
          </h1>

          <div className="flex items-center gap-6 text-white/80">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              <span>{blog.publishedAt}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4" />
              <span>{blog.readTime}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="container mx-auto px-4 mt-12">
        <div className="max-w-3xl mx-auto">
          <div className="prose prose-lg dark:prose-invert max-w-none
            prose-headings:font-bold prose-headings:tracking-tight
            prose-a:text-primary prose-a:no-underline hover:prose-a:underline
            prose-img:rounded-xl prose-img:shadow-lg
            prose-blockquote:border-l-primary prose-blockquote:bg-muted/50 prose-blockquote:py-2 prose-blockquote:px-6 prose-blockquote:rounded-r-lg
          ">
            <div dangerouslySetInnerHTML={{ __html: htmlContent }} />
          </div>
        </div>
      </div>
    </article>
  );
}
