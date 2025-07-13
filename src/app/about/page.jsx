import Image from 'next/image'

export default function About() {
  return (
    <div className="container mx-auto px-4 py-16">
      <div className="max-w-3xl mx-auto mb-12 text-center">
        <h1 className="text-4xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-primary via-primary/80 to-primary/60 animate-gradient">
          About Me
        </h1>
        <p className="text-muted-foreground text-lg">
          A small introduction about me
        </p>
      </div>
      <div className="flex flex-col items-center">
        <div className="md:w-1/2 md:pl-8">
          <p className="text-lg mb-4">
            I'm <span className='font-semibold'> Full Stack Developer </span> from India. With 3+ of experience in software development, I specialize in creating robust, scalable applications that solve real-world problems.
          </p>
          <p className="text-lg">
            My passion for technology and problem-solving drives me to continuously learn and adapt to new technologies and methodologies in the ever-evolving world of software development.
          </p>
        </div>
      </div>
    </div>
  )
}

