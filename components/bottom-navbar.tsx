"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { 
  Home, 
  User, 
  FolderOpen, 
  Briefcase, 
  MessageCircle
} from "lucide-react"

interface NavItem {
  id: string
  label: string
  icon: React.ComponentType<{ className?: string }>
}

const navItems: NavItem[] = [
  { id: "hero", label: "Inicio", icon: Home },
  { id: "about", label: "Sobre Mí", icon: User },
  { id: "projects", label: "Proyectos", icon: FolderOpen },
  { id: "experience", label: "Experiencia", icon: Briefcase },
  { id: "contact", label: "Contacto", icon: MessageCircle },
]

export function BottomNavbar() {
  const [activeSection, setActiveSection] = useState("hero")
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      const sections = navItems.map(item => item.id)
      const scrollPosition = window.scrollY + 100

      for (const sectionId of sections) {
        const element = document.getElementById(sectionId)
        if (element) {
          const offsetTop = element.offsetTop
          const offsetBottom = offsetTop + element.offsetHeight

          if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
            setActiveSection(sectionId)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    handleScroll() // Check initial position

    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
      setActiveSection(id)
    }
  }

  if (!mounted) return null

  return (
    <motion.div
      initial={{ y: 50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className="fixed bottom-0 left-0 right-0 z-40 md:hidden"
    >
      <div className="bg-transparent backdrop-blur-sm border-t border-border/20 px-4 py-2">
        <div className="flex items-center justify-around max-w-sm mx-auto">
          {/* Navigation Items */}
          {navItems.map((item) => {
            const Icon = item.icon
            const isActive = activeSection === item.id
            
            return (
              <motion.button
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                className="relative p-2 rounded-lg transition-colors duration-200 flex flex-col items-center gap-1"
                whileTap={{ scale: 0.95 }}
              >
                <motion.div
                  animate={{ 
                    color: isActive ? "hsl(var(--primary))" : "hsl(var(--muted-foreground))",
                    y: isActive ? -2 : 0
                  }}
                  transition={{ duration: 0.2, ease: "easeInOut" }}
                  className="relative z-10"
                >
                  <Icon className="w-5 h-5" />
                </motion.div>

                {/* Label */}
                <motion.span
                  animate={{ 
                    color: isActive ? "hsl(var(--primary))" : "hsl(var(--muted-foreground))"
                  }}
                  className="text-[10px] font-medium"
                >
                  {item.label}
                </motion.span>

                {/* Active indicator line */}
                <AnimatePresence>
                  {isActive && (
                    <motion.div
                      initial={{ opacity: 0, scaleX: 0 }}
                      animate={{ opacity: 1, scaleX: 1 }}
                      exit={{ opacity: 0, scaleX: 0 }}
                      className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-4 h-0.5 bg-primary rounded-full"
                    />
                  )}
                </AnimatePresence>
              </motion.button>
            )
          })}
        </div>
      </div>
    </motion.div>
  )
}