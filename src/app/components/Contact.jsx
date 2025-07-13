import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import Link from "next/link";

const ContactCard = ({ contact }) => {
  return (
    <Card className="group w-[350px] relative border border-border/50 bg-background/50 backdrop-blur-sm transition-all hover:border-primary/50">
      <CardHeader>
        {contact.icon && (
          <div className="mb-2 flex gap-4">
            <h3> {contact.icon} </h3>
            <h3 className="text-xl font-semibold tracking-tight">
              {contact.title}
            </h3>
          </div>
        )}
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground pb-4">{contact.description}</p>
        <Link href={contact.link}>
          <Button>Contact me</Button>
        </Link>
      </CardContent>
    </Card>
  );
};

export default ContactCard;
