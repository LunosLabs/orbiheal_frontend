import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";
import Header from "@/components/publicComponents/Header";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: "Lunocare",
  description:
    "Consult verified or student doctors, scan prescriptions, find medicine alternatives, and access health insights easily.",
};


export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} antialiased overflow-x-hidden`}>
        <ThemeProvider attribute="class" defaultTheme="system" disableTransitionOnChange>
          <div className="flex flex-col min-h-screen bg-neutral-950   text-white">
            <Header />
            <div className="flex flex-1 overflow-hidden">
              <main className="flex-1 h-full overflow-y-auto pt-18 px-2 sm:px-6 md:px-8 pb-8">
                {children}
              </main>
            </div>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}

