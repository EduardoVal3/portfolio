"use client"

import { Github, Linkedin, Twitter, Heart } from "lucide-react"

// PERSONALIZAR: Reemplazar con tus enlaces
export function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-border bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          {/* Copyright */}
          <p className="text-sm text-muted-foreground text-center sm:text-left">
            © {currentYear} Tu Nombre. Hecho con <Heart className="inline w-4 h-4 text-primary fill-primary" /> usando
            Next.js
          </p>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/tu-usuario"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label="GitHub"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href="https://linkedin.com/in/tu-perfil"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label="LinkedIn"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a
              href="https://twitter.com/tu-usuario"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
              aria-label="Twitter"
            >
              <Twitter className="w-5 h-5" />
            </a>
          </div>
        </div>

        {/* Optional: Download CV Link */}
        <div className="mt-6 text-center">
          <a href="#" download className="text-sm text-primary hover:underline font-medium">
            Descargar CV (PDF)
          </a>
        </div>
      </div>
    </footer>
  )
}
