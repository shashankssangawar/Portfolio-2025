'use client'

import ContactCard from "../components/Contact"
import { FaWhatsapp } from "react-icons/fa";
import { TbBrandTelegram } from "react-icons/tb";
import { FaGithub } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";

export default function Contact() {

  const contacts = [
    {
      id: 1,
      title: "Whatsapp",
      description: "Contact me on Whatsapp",
      link: "https://wa.me/917977528656",
      icon: <FaWhatsapp size={23} />
    },
    {
      id: 2,
      title: "Github",
      description: "Contact me on Github",
      link: "https://github.com/shashankssangawar",
      icon: <FaGithub size={23} />
    },
    {
      id: 3,
      title: "LinkedIn",
      description: "Contact me on LinkedIn",
      link: "https://in.linkedin.com/in/shashank-sangawar-25a50423b",
      icon: <FaLinkedin size={23} />
    },
  ]

  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-3xl mx-auto mb-12 text-center">
        <h1 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary via-primary/80 to-primary/60 animate-gradient">
          Contact Me
        </h1>
        <p className="text-muted-foreground text-md">
          Various Ways to connect me
        </p>
      </div>
      <div className='flex flex-wrap gap-4'>
        {
          contacts.map((contact) => (
            <ContactCard contact={contact} key={contact.id} />
          ))
        }
      </div>
    </div>
  )
}

