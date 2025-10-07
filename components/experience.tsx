"use client"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef } from "react"
import { Briefcase, GraduationCap } from "lucide-react"

// PERSONALIZAR: Reemplazar con tu experiencia real
const experiences = [
  // {
  //   type: "work",
  //   title: "Senior Frontend Developer",
  //   company: "Tech Company Inc.",
  //   period: "2022 - Presente",
  //   description:
  //     "Liderando el desarrollo de aplicaciones web modernas con React y Next.js. Implementación de arquitecturas escalables y mejores prácticas.",
  // },
  // {
  //   type: "work",
  //   title: "Full Stack Developer",
  //   company: "Digital Agency",
  //   period: "2020 - 2022",
  //   description:
  //     "Desarrollo de soluciones web completas para clientes diversos. Trabajo con tecnologías frontend y backend, gestión de bases de datos.",
  // },
  {
    type: "education",
    title: "Ingeniería en Sistemas Computacionales",
    company: "Universidad Nacional Autónoma de Honduras (UNAH)",
    period: "2023 - Presente",
    description: "Grado en Ingeniería de Sistemas con especialización en desarrollo web y arquitectura de software.",
  },
  // {
  //   type: "work",
  //   title: "Junior Developer",
  //   company: "Startup XYZ",
  //   period: "2019 - 2020",
  //   description:
  //     "Primera experiencia profesional desarrollando features para aplicación SaaS. Aprendizaje de metodologías ágiles y trabajo en equipo.",
  // },
]

export function Experience() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  return (
    <section id="experience" ref={ref} className="py-20 sm:py-32 px-4 sm:px-6 lg:px-8 bg-muted/30">
      <div className="container mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-center">
            Experiencia & <span className="text-primary">Educación</span>
          </h2>
          <p className="text-muted-foreground text-center mb-12 sm:mb-16 max-w-2xl mx-auto text-balance">
            Mi trayectoria profesional y formación académica
          </p>

          {/* Timeline */}
          <div className="relative">
            {/* Vertical Line */}
            <div className="absolute left-4 sm:left-1/2 top-0 bottom-0 w-0.5 bg-border sm:-ml-px" />

            {/* Timeline Items */}
            <div className="space-y-12">
              {experiences.map((exp, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className={`relative flex items-center ${
                    index % 2 === 0 ? "sm:flex-row" : "sm:flex-row-reverse"
                  } flex-row`}
                >
                  {/* Icon */}
                  <div className="absolute left-4 sm:left-1/2 sm:-ml-4 w-8 h-8 rounded-full bg-primary flex items-center justify-center z-10">
                    {exp.type === "work" ? (
                      <Briefcase className="w-4 h-4 text-primary-foreground" />
                    ) : (
                      <GraduationCap className="w-4 h-4 text-primary-foreground" />
                    )}
                  </div>

                  {/* Content */}
                  <div className={`ml-16 sm:ml-0 sm:w-1/2 ${index % 2 === 0 ? "sm:pr-12" : "sm:pl-12"}`}>
                    <div className="bg-background border border-border rounded-lg p-6 hover:border-primary/50 transition-colors">
                      <span className="text-xs font-semibold text-primary uppercase tracking-wider">{exp.period}</span>
                      <h3 className="text-xl font-bold mt-2 mb-1">{exp.title}</h3>
                      <p className="text-sm text-muted-foreground font-medium mb-3">{exp.company}</p>
                      <p className="text-sm text-muted-foreground leading-relaxed">{exp.description}</p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
