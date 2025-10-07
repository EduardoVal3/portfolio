"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { Code2, Palette, Database, Smartphone, Globe, Zap } from "lucide-react"

// PERSONALIZAR: Cambiar habilidades según tu stack
const skills = [
  { name: "React & Next.js", icon: Code2 },
  { name: "TypeScript", icon: Code2 },
  { name: "UI/UX Design", icon: Palette },
  { name: "Node.js", icon: Database },
  { name: "Responsive Design", icon: Smartphone },
  { name: "Web Performance", icon: Zap },
]

export function About() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="about" ref={ref} className="py-20 sm:py-32 px-4 sm:px-6 lg:px-8 bg-muted/30">
      <div className="container mx-auto max-w-6xl">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-12 sm:mb-16 text-center">
            Sobre <span className="text-primary">Mí</span>
          </h2>

          <div className="grid md:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Image/Avatar - PERSONALIZAR: Reemplazar con tu imagen */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex justify-center"
            >
              <div className="relative w-64 h-64 sm:w-80 sm:h-80 rounded-2xl overflow-hidden bg-gradient-to-br from-primary/20 to-primary/5 flex items-center justify-center">
                <Globe className="w-32 h-32 text-primary/40" />
                {/* Reemplazar con: <img src="/tu-foto.jpg" alt="Tu nombre" className="w-full h-full object-cover" /> */}
              </div>
            </motion.div>

            {/* About Text - PERSONALIZAR */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="space-y-6"
            >
              <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                Soy un desarrollador apasionado por crear soluciones web elegantes y funcionales. Con experiencia en
                desarrollo frontend y backend, me especializo en construir aplicaciones modernas que combinan diseño
                atractivo con rendimiento óptimo.
              </p>
              <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                Mi enfoque se centra en escribir código limpio, mantenible y escalable, siempre buscando las mejores
                prácticas y tecnologías más recientes del ecosistema web.
              </p>

              {/* Skills Grid */}
              <div className="pt-6">
                <h3 className="text-xl font-semibold mb-6">Habilidades Técnicas</h3>
                <div className="grid grid-cols-2 gap-4">
                  {skills.map((skill, index) => (
                    <motion.div
                      key={skill.name}
                      initial={{ opacity: 0, y: 20 }}
                      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                      transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                      className="flex items-center gap-3 p-3 rounded-lg bg-background border border-border hover:border-primary/50 transition-colors"
                    >
                      <skill.icon className="w-5 h-5 text-primary" />
                      <span className="text-sm font-medium">{skill.name}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
