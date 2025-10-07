"use client"

import type React from "react"

import { motion } from "framer-motion"
import { useInView } from "framer-motion"
import { useRef, useState } from "react"
import { Mail, Linkedin, Github, Twitter, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card } from "@/components/ui/card"

// PERSONALIZAR: Reemplazar con tus redes sociales
const socials = [
  { name: "Email", icon: Mail, url: "mailto:tu@email.com" },
  { name: "LinkedIn", icon: Linkedin, url: "https://linkedin.com/in/perfil" },
  { name: "GitHub", icon: Github, url: "https://github.com/EduardoVal3" },
  { name: "Twitter", icon: Twitter, url: "https://twitter.com/usuario" },
]

export function Contact() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // PERSONALIZAR: Implementar lógica de envío de formulario
    console.log("Form submitted:", formData)
    alert("¡Mensaje enviado! (Implementar lógica de envío real)")
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <section id="contact" ref={ref} className="py-20 sm:py-32 px-4 sm:px-6 lg:px-8">
      <div className="container mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 text-center">
            Hablemos de tu <span className="text-primary">Proyecto</span>
          </h2>
          <p className="text-muted-foreground text-center mb-12 sm:mb-16 max-w-2xl mx-auto text-balance">
            ¿Tienes una idea en mente? Me encantaría escucharla y ayudarte a hacerla realidad
          </p>

          <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card className="p-6 sm:p-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-2">
                      Nombre
                    </label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Tu nombre"
                    />
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-2">
                      Email
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="tu@email.com"
                    />
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium mb-2">
                      Mensaje
                    </label>
                    <Textarea
                      id="message"
                      name="message"
                      required
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Cuéntame sobre tu proyecto..."
                      rows={5}
                    />
                  </div>

                  <Button type="submit" className="w-full" size="lg">
                    Enviar Mensaje
                    <Send className="ml-2 h-4 w-4" />
                  </Button>
                </form>
              </Card>
            </motion.div>

            {/* Social Links & Info */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="space-y-8"
            >
              <div>
                <h3 className="text-2xl font-bold mb-4">
                  Conecta <span className="text-primary">Conmigo</span>
                </h3>
                <p className="text-muted-foreground leading-relaxed mb-6">
                  Estoy siempre abierto a nuevas oportunidades y colaboraciones. No dudes en contactarme a través de
                  cualquiera de estos canales.
                </p>

                {/* Social Buttons */}
                <div className="grid grid-cols-2 gap-4">
                  {socials.map((social, index) => (
                    <motion.div
                      key={social.name}
                      initial={{ opacity: 0, y: 20 }}
                      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                      transition={{ duration: 0.4, delay: 0.4 + index * 0.1 }}
                    >
                      <Button
                        variant="outline"
                        className="w-full justify-start group hover:border-primary/50 bg-transparent"
                        asChild
                      >
                        <a href={social.url} target="_blank" rel="noopener noreferrer">
                          <social.icon className="w-5 h-5 mr-3 group-hover:text-primary transition-colors" />
                          {social.name}
                        </a>
                      </Button>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Additional Info */}
              <Card className="p-6 bg-primary/5 border-primary/20">
                <h4 className="font-semibold mb-2">Disponibilidad</h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  Actualmente disponible para proyectos freelance y oportunidades de colaboración. Tiempo de respuesta:
                  24-48 horas.
                </p>
              </Card>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
