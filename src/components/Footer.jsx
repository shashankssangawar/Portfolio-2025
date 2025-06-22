export default function Footer() {
  return (
    <footer className="mt-[10dvw] border-t border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex flex-col items-center justify-between gap-4 py-6 p-4 md:h-24 md:flex-row md:py-0">
        <div className="flex flex-col items-center gap-4 px-4 md:flex-row md:gap-2 md:px-0">
          <p className="text-center text-xs sm:text-sm leading-loose text-muted-foreground md:text-left">
            &copy; {new Date().getFullYear()} Shashank Sangawar. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
