'use client';

import { Button } from "@/components/ui/button";
import { DownloadCloud, Mail } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";

export default function AboutSection() {
  return (
    <div className={'md:p-10 p-4'}>
      <div className="max-w-3xl mx-auto mt-4 mb-8 text-center">
        <p className="text-muted-foreground italic text-lg font-light">
          “To create is to overcome.”
        </p>
      </div>
      <div className="flex flex-col items-center">
        <div className="md:w-1/2 md:pl-8">
          <p className="text-lg mb-4">
            I'm <span className='font-semibold'> Full Stack Developer </span> from India with over 4 years of experience in building robust, scalable applications that bridge ideas and reality.
          </p>
          <p className="text-lg mb-4">
            To me, software development is more than a profession—it is an act of creation, a pursuit of mastery in an ever-evolving digital world. Guided by a will to grow and transcend limitations, I continuously embrace new technologies, adapt to change, and refine my craft.
          </p>
          <p className="text-lg">
            Each line of code is an affirmation of progress—a step toward becoming something greater than before.
          </p>
        </div>
      </div>
      <div className="flex items-center justify-center gap-4 pt-6">
        <Button onClick={() => toast.info('Extremely Sorry, currently creation is in progress will update asap...')}>
          <DownloadCloud className="w-4 h-4" /> Get Resume
        </Button>
        <Link href={'mailto:shashanksangawar.model@gmail.com'}>
          <Button variant={'outline'}>
            <Mail className="w-4 h-4" /> Send Mail
          </Button>
        </Link>
      </div>
    </div>
  );
};
