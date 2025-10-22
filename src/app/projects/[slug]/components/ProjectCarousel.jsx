"use client";

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import Autoplay from "embla-carousel-autoplay";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

// Optimized Image component with better performance
const OptimizedImage = ({ src, alt, className }) => {
  return (
    <Image
      src={src}
      alt={alt}
      className={className}
      fill
      sizes="100vw"
      priority={true} // Use priority for hero images
      quality={85}
      placeholder="blur"
      blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAABAAEDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAUEAEAAAAAAAAAAAAAAAAAAAAA/8QAFQEBAQAAAAAAAAAAAAAAAAAAAAX/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwCdABmX/9k="
    />
  );
};

const CarouselSlide = ({ slide, isActive }) => {
  return (
    <div className="relative h-full">
      <div className="absolute inset-0">
        <OptimizedImage
          src={slide || "/placeholder.png"}
          alt={'Demo'}
          className="w-full h-full object-contain"
        />
      </div>
      <div className="absolute inset-0 bg-black/20" />

      {/* If want to add content */}
      <div className="relative z-10 flex items-center justify-center h-full px-4">
      </div>
    </div>
  );
};

export default function ProjectCarousel({ images }) {
  // Reduce autoplay delay and add better stopping conditions
  const autoplayPlugin = useRef(
    Autoplay({
      delay: 4000,
      stopOnInteraction: true,
      stopOnMouseEnter: true,
      playOnInit: true
    })
  );

  const [api, setApi] = useState(null);
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  // Optimize API event handling
  useEffect(() => {
    if (!api) return;

    setCount(api.slideCount || 0);
    setCurrent(api.selectedScrollSnap() || 0);

    const onSelect = () => {
      setCurrent(api.selectedScrollSnap() || 0);
    };

    api.on("select", onSelect);

    return () => {
      api.off("select", onSelect);
    };
  }, [api]);

  // Add loading state for better UX
  if (!images.length) {
    return (
      <div className="w-full md:h-[90dvh] h-[40dvh] bg-gray-900 flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="w-full md:h-[90dvh] h-[50dvh] mx-auto">
      <Carousel
        setApi={setApi}
        plugins={[autoplayPlugin.current]}
        className="relative h-full"
        opts={{
          loop: true,
          align: "center",
          skipSnaps: false,
          dragFree: false
        }}
        onMouseEnter={() => autoplayPlugin.current.stop()}
        onMouseLeave={() => autoplayPlugin.current.play()}
      >
        <CarouselContent className="md:h-[90dvh] h-[50dvh] ">
          {images.map((slide, index) => (
            <CarouselItem key={index} className="h-full">
              <CarouselSlide
                slide={slide}
                isActive={current === index}
              />
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious className="md:flex hidden left-4 text-white/70 bg-black/30 hover:bg-black/50 hover:text-white border-white/20" />
        <CarouselNext className="md:flex hidden right-4 text-white/70 bg-black/30 hover:bg-black/50 hover:text-white border-white/20" />

        {/* Optional: Dot indicators */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-2">
          {images.map((_, index) => (
            <button
              key={index}
              className={`w-4 h-4 rounded-full transition-all duration-300 ${current === index ? 'bg-white' : 'bg-white/40'
                }`}
              onClick={() => api?.scrollTo(index)}
            />
          ))}
        </div>
      </Carousel>
    </div>
  )
}
