'use client';

import { Badge } from "@/components/ui/badge"
import { Card } from "@/components/ui/card"
import { TECHSTACKS } from "@/data/technologies"
import { useState } from "react"

export default function TechnologySection() {
  const [hoveredIndex, setHoveredIndex] = useState(null)

  return (
    <div className="min-h-screen bg-background relative">
      {/* Animated Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-primary/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(hsl(var(--muted))_1px,transparent_1px),linear-gradient(90deg,hsl(var(--muted))_1px,transparent_1px)] bg-[size:72px_72px] opacity-20" />

      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="max-w-4xl mx-auto mb-16 text-center space-y-4">
          <div className="inline-block">
            <h1 className="text-5xl md:text-6xl font-bold mb-2 text-foreground pb-2">
              Tech Stack
            </h1>
            <div className="h-1 bg-primary rounded-full" />
          </div>
          <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto">
            A comprehensive collection of cutting-edge technologies and tools I leverage to craft innovative solutions
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto">
          {TECHSTACKS.map((stack, index) => {
            const Icon = stack.icon
            return (
              <Card
                key={index}
                className="group relative overflow-hidden border bg-card backdrop-blur-xl transition-all duration-500 hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-1"
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                {/* Animated gradient effect */}
                <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Shine effect */}
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-primary/5 to-transparent" />

                <div className="relative p-6 space-y-5">
                  <div className="flex items-center gap-4">
                    <div className={`transition-transform duration-500 text-primary ${hoveredIndex === index ? 'scale-110 rotate-12' : ''}`}>
                      <Icon className="w-8 h-8" strokeWidth={1.5} />
                    </div>
                    <div className="flex-1">
                      <h2 className="text-xl md:text-2xl font-bold text-foreground transition-all duration-300">
                        {stack.category}
                      </h2>
                      <div className={`h-0.5 bg-primary mt-2 transition-all duration-500 ${hoveredIndex === index ? 'w-full' : 'w-0'}`} />
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {stack.technologies.map((tech, techIndex) => (
                      <Badge
                        key={techIndex}
                        variant="secondary"
                        className="transition-all duration-300 hover:scale-105 hover:bg-primary hover:text-primary-foreground cursor-default"
                        style={{
                          transitionDelay: hoveredIndex === index ? `${techIndex * 30}ms` : '0ms'
                        }}
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>

                  {/* Tech count indicator */}
                  <div className="text-xs text-muted-foreground pt-2 border-t border-border">
                    {stack.technologies.length} {stack.technologies.length === 1 ? 'technology' : 'technologies'}
                  </div>
                </div>
              </Card>
            )
          })}
        </div>

        {/* Footer stat */}
        <div className="mt-16 text-center">
          <p className="text-muted-foreground text-sm">
            Total Technologies: <span className="text-primary font-semibold">{TECHSTACKS.reduce((acc, stack) => acc + stack.technologies.length, 0)}</span>
          </p>
        </div>
      </div>
    </div>
  )
}
