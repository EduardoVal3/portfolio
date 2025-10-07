import type React from "react"
import type { Metadata } from "next"
import { Mulish } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import Particles from "@/components/Particles"

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
      <body className="antialiased overflow-x-hidden">
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem disableTransitionOnChange>
          {/* Background de partículas fijo */}
          <div className="fixed inset-0 -z-10">
            <Particles
              particleColors={['#07c6ff', '#c137ff']}
              particleCount={700}
              particleSpread={10}
              speed={0.1}
              particleBaseSize={100}
              moveParticlesOnHover={false}
              alphaParticles={true}
              disableRotation={false}
            />
          </div>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
