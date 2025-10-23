'use client';
import { useState } from "react"
import ContactCard from "../components/Contact"
import { MessageCircle, Github, Linkedin, Mail } from "lucide-react"
import { Card, CardHeader, CardContent } from "@/components/ui/card"

export default function Contact() {
  const [hoveredIndex, setHoveredIndex] = useState(null)

  const contacts = [
    {
      id: 1,
      title: "WhatsApp",
      description: "Send me a message on WhatsApp for quick responses",
      link: "https://wa.me/917977528656",
      icon: MessageCircle
    },
    {
      id: 2,
      title: "GitHub",
      description: "Explore my projects and contributions on GitHub",
      link: "https://github.com/shashankssangawar",
      icon: Github
    },
    {
      id: 3,
      title: "LinkedIn",
      description: "Connect with me professionally on LinkedIn",
      link: "https://www.linkedin.com/in/shashank-subhash-sangawar",
      icon: Linkedin
    },
  ]

  return (
    <div className="min-h-screen bg-background relative">
      {/* Animated Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/3 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 right-1/3 w-96 h-96 bg-primary/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1.5s' }} />
      </div>

      {/* Grid Pattern Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(hsl(var(--muted))_1px,transparent_1px),linear-gradient(90deg,hsl(var(--muted))_1px,transparent_1px)] bg-[size:72px_72px] opacity-20" />

      <div className="container mx-auto px-4 py-16 relative z-10">
        <div className="max-w-4xl mx-auto mb-16 text-center space-y-4">
          <div className="inline-flex items-center gap-3 mb-2 mr-4">
            <Mail className="w-12 h-12 text-primary animate-pulse" />
          </div>
          <div className="inline-block">
            <h1 className="text-5xl md:text-6xl font-bold mb-2 text-foreground pb-2">
              Let's Connect
            </h1>
            <div className="h-1 bg-primary rounded-full" />
          </div>
          <p className="text-muted-foreground text-lg md:text-xl max-w-2xl mx-auto">
            Choose your preferred platform to get in touch. I'm always excited to discuss new opportunities and collaborations
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {contacts.map((contact, index) => (
            <ContactCard
              key={contact.id}
              contact={contact}
              index={index}
              isHovered={hoveredIndex === index}
              onHover={setHoveredIndex}
              onLeave={() => setHoveredIndex(null)}
            />
          ))}
        </div>

        {/* Additional Info */}
        <div className="mt-16 max-w-2xl mx-auto">
          <Card className="border bg-card/50 backdrop-blur-xl">
            <CardContent className="p-6 text-center">
              <p className="text-muted-foreground">
                <span className="text-foreground font-semibold">Response Time:</span> I typically respond within 24 hours during business days
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
