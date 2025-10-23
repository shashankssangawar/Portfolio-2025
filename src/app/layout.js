import "./globals.css";
import { Inter } from 'next/font/google';
import { ThemeProvider } from 'next-themes'
import Footer from "@/components/Footer";
import Header from "@/components/Header";
import { Toaster } from "sonner";

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: {
    default: `Portfolio | Shashank Sangawar`,
    template: `%s | Shashank Sangawar`
  },
  description: "Explore my portfolio of web applications, tools, and software projects. Discover the technologies I work with and the solutions I've built.",
  keywords: 'portfolio, web development, projects, react, next.js, full stack developer, software projects, web applications',
  authors: [{ name: "TechCulture Team" }],
  creator: 'Shashank Sangawar',
  publisher: 'Shashank Sangawar',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <Toaster />
          <div className="min-h-screen bg-gradient-to-b from-background to-background/80 dark:from-background dark:to-background/80">
            <Header />
            <main>{children}</main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
