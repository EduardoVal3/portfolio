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
  title: "Tu Nombre - Desarrollador Full Stack",
  description:
    "Portfolio personal de [Tu Nombre]. Desarrollador Full Stack especializado en React, Next.js y diseño web moderno.",
  keywords: ["desarrollador", "full stack", "react", "next.js", "portfolio", "web developer"],
  authors: [{ name: "Tu Nombre" }],
  openGraph: {
    title: "Tu Nombre - Desarrollador Full Stack",
    description: "Portfolio personal y proyectos destacados",
    type: "website",
  },
    generator: 'v0.app'
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
