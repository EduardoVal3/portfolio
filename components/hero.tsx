"use client"

import { motion } from "framer-motion"
import { ArrowRight, Download } from "lucide-react"
import { Button } from "@/components/ui/button"

export function Hero() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 pt-16">
      <div className="container mx-auto max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center space-y-6 sm:space-y-8"
        >
          {/* Greeting - PERSONALIZAR */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-sm sm:text-base text-muted-foreground font-medium"
          >
            Hola, soy Eduardo
          </motion.p>

          {/* Main Title - PERSONALIZAR */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-balance"
          >
            <span className="text-foreground">Desarrollador</span> <span className="text-primary">Full Stack</span>
          </motion.h1>

          {/* Subtitle - PERSONALIZAR */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-base sm:text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto text-balance leading-relaxed"
          >
            Creo experiencias web modernas y funcionales. Especializado en React, Next.js y diseño de interfaces
            intuitivas.
          </motion.p>

          {/* CTA Buttons - PERSONALIZAR enlaces */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
          >
            <Button size="lg" onClick={() => scrollToSection("projects")} className="w-full sm:w-auto group">
              Ver Proyectos
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button size="lg" variant="outline" onClick={() => scrollToSection("contact")} className="w-full sm:w-auto">
              Contactar
            </Button>
            <Button size="lg" variant="ghost" className="w-full sm:w-auto" asChild>
              <a href="#" download>
                <Download className="mr-2 h-4 w-4" />
                Descargar CV
              </a>
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
