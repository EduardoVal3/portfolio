import type React from "react"
import type { Metadata } from "next"
import { Mulish } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"

const mulish = Mulish({
  subsets: ["latin"],
  variable: "--font-mulish",
  display: "swap",
})

// PERSONALIZAR: Actualizar metadata con tu información
export const metadata: Metadata = {
  title: "Eduardo Valenzuela - Desarrollador Full Stack",
  description:
    "Portfolio personal de Eduardo Valenzuela. Desarrollador Full Stack especializado en React, Next.js y diseño web moderno.",
  keywords: ["desarrollador", "full stack", "react", "next.js", "portfolio", "web developer"],
  authors: [{ name: "Eduardo Valenzuela" }],
  openGraph: {
    title: "Eduardo Valenzuela - Desarrollador Full Stack",
    description: "Portfolio personal y proyectos destacados",
    type: "website",
  }
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es" suppressHydrationWarning className={mulish.variable}>
      <body className="antialiased">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
