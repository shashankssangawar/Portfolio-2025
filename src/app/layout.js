import "./globals.css";
import { Inter } from 'next/font/google';
import { ThemeProvider } from 'next-themes'
import Footer from "@/components/Footer";
import Header from "@/components/Header";

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Shashank Sangawar',
  description: 'A showcase of innovative work and cutting-edge skills',
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
