import Navbar from "@/components/Layout/Navbar";
import "@/styles/globals.css";
import "@/styles/Custom.css";
import { ThemeProvider } from "next-themes";
import Herobtn from "@/components/Layout/Header";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      style={{ fontFamily: '"Space Grotesk", sans-serif' }}
    >
      <body
        className="antialiased font-sans"
        style={{ fontFamily: '"Space Grotesk", sans-serif' }}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
        >
          <div className="min-h-screen flex flex-col">
            <Herobtn/>
            <Navbar/>
            <main className="flex-1">{children}</main>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}