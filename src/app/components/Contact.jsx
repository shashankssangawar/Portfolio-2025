import { Button } from "@/components/ui/button"
import { Card, CardHeader, CardContent } from "@/components/ui/card"
import { ArrowRight } from "lucide-react"

const ContactCard = ({ contact, index, isHovered, onHover, onLeave }) => {
  const Icon = contact.icon

  return (
    <Card
      className="group relative overflow-hidden border bg-card backdrop-blur-xl transition-all duration-500 hover:border-primary/50 hover:shadow-2xl hover:shadow-primary/10 hover:-translate-y-2"
      onMouseEnter={() => onHover(index)}
      onMouseLeave={onLeave}
    >
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* Shine effect */}
      <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-primary/10 to-transparent" />

      <CardHeader className="relative">
        <div className="flex items-center gap-4">
          <div className={`p-3 rounded-lg bg-primary/10 text-primary transition-all duration-500 ${isHovered ? 'scale-110 rotate-6' : ''}`}>
            <Icon className="w-6 h-6" strokeWidth={2} />
          </div>
          <div className="flex-1">
            <h3 className="text-xl font-semibold tracking-tight text-foreground">
              {contact.title}
            </h3>
            <div className={`h-0.5 bg-primary mt-1 transition-all duration-500 ${isHovered ? 'w-full' : 'w-0'}`} />
          </div>
        </div>
      </CardHeader>

      <CardContent className="relative space-y-4">
        <p className="text-muted-foreground">
          {contact.description}
        </p>

        <a
          href={contact.link}
          target="_blank"
          rel="noopener noreferrer"
          className="block"
        >
          <Button
            className="w-full group/btn transition-all duration-300 hover:shadow-lg hover:shadow-primary/20"
          >
            <span>Connect Now</span>
            <ArrowRight className="w-4 h-4 ml-2 transition-transform duration-300 group-hover/btn:translate-x-1" />
          </Button>
        </a>
      </CardContent>
    </Card>
  )
}
export default ContactCard;
