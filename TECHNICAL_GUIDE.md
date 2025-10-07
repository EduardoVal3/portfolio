# Guía Técnica del Portafolio One-Page

## Índice
1. [Arquitectura del Proyecto](#arquitectura-del-proyecto)
2. [Stack Tecnológico](#stack-tecnológico)
3. [Sistema de Diseño](#sistema-de-diseño)
4. [Componentes Detallados](#componentes-detallados)
5. [Sistema de Animaciones](#sistema-de-animaciones)
6. [Sistema de Temas](#sistema-de-temas)
7. [Optimización y Performance](#optimización-y-performance)
8. [Mejoras Futuras](#mejoras-futuras)

---

## Arquitectura del Proyecto

### Estructura de Archivos
\`\`\`
portfolio-template/
├── app/
│   ├── layout.tsx          # Layout raíz con configuración de fuentes
│   ├── page.tsx            # Página principal que orquesta todos los componentes
│   └── globals.css         # Estilos globales y tokens de diseño
├── components/
│   ├── header.tsx          # Navegación fija con scroll spy
│   ├── hero.tsx            # Sección de bienvenida
│   ├── about.tsx           # Biografía y habilidades
│   ├── projects.tsx        # Grid de proyectos
│   ├── experience.tsx      # Timeline de experiencia
│   ├── contact.tsx         # Formulario y redes sociales
│   ├── footer.tsx          # Pie de página
│   └── theme-provider.tsx  # Proveedor de contexto para temas
└── lib/
    └── utils.ts            # Utilidades (función cn para clases)
\`\`\`

### Patrón de Arquitectura
- **Next.js App Router**: Utiliza el nuevo sistema de enrutamiento de Next.js 13+
- **Server Components por defecto**: Todos los componentes son Server Components excepto los que requieren interactividad
- **Client Components selectivos**: Solo `header.tsx`, `contact.tsx` y `theme-provider.tsx` usan `"use client"`
- **Composición modular**: Cada sección es un componente independiente y reutilizable

---

## Stack Tecnológico

### Framework y Librerías Core

#### Next.js 15
- **Versión**: 15.x (última estable)
- **Características utilizadas**:
  - App Router para enrutamiento basado en archivos
  - Server Components para mejor performance
  - Optimización automática de fuentes con `next/font`
  - Optimización de imágenes con `next/image`

#### React 19
- **Hooks utilizados**:
  - `useState`: Manejo de estado local (formulario, menú móvil)
  - `useEffect`: Efectos secundarios (scroll spy, detección de scroll)
  - `useTheme`: Hook personalizado de next-themes

#### TypeScript
- **Configuración**: Strict mode habilitado
- **Beneficios**:
  - Type safety en props de componentes
  - Autocompletado mejorado
  - Detección temprana de errores

### Librerías de UI y Animación

#### Tailwind CSS v4
- **Configuración**: Inline en `globals.css` usando `@theme`
- **Características**:
  - Utility-first CSS
  - Responsive design con breakpoints
  - Dark mode con class strategy
  - Custom design tokens

#### Framer Motion
- **Versión**: 11.x
- **Uso**:
  - Animaciones de entrada (fade-in, slide-up)
  - Transiciones suaves entre estados
  - Animaciones de hover y tap
  - Scroll-triggered animations

#### next-themes
- **Funcionalidad**: Gestión de tema claro/oscuro
- **Características**:
  - Persistencia en localStorage
  - Sin flash de contenido incorrecto (FOUC)
  - Sincronización con preferencias del sistema
  - API simple con `useTheme` hook

### Iconos

#### Lucide React
- **Ventajas**:
  - Tree-shakeable (solo importa los iconos usados)
  - Consistencia visual
  - Tamaños personalizables
  - Accesibles por defecto

---

## Sistema de Diseño

### Paleta de Colores

#### Tokens de Color Definidos
\`\`\`css
/* globals.css */
--color-primary: 180 100% 44%;        /* #00D8FF - Cyan vibrante */
--color-primary-foreground: 0 0% 100%; /* Texto sobre primary */

--color-background: 0 0% 98%;          /* #FAFAFA - Fondo claro */
--color-foreground: 0 0% 4%;           /* #0A0A0A - Texto oscuro */

--color-muted: 0 0% 96%;               /* Fondos secundarios */
--color-muted-foreground: 0 0% 45%;    /* Texto secundario */

--color-card: 0 0% 100%;               /* Fondo de tarjetas */
--color-border: 0 0% 90%;              /* Bordes */
\`\`\`

#### Sistema de Color HSL
- **Formato**: `H S% L%` (Hue, Saturation, Lightness)
- **Ventaja**: Fácil manipulación de variantes (más claro/oscuro)
- **Uso en Tailwind**: `bg-primary`, `text-foreground`, etc.

### Tipografía

#### Fuente Principal: Mulish
\`\`\`tsx
// layout.tsx
const mulish = Mulish({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-mulish',
  display: 'swap', // Mejora performance
})
\`\`\`

#### Jerarquía Tipográfica
- **Headings**: 
  - H1: `text-5xl md:text-7xl` (48px → 72px)
  - H2: `text-4xl md:text-5xl` (36px → 48px)
  - H3: `text-2xl md:text-3xl` (24px → 30px)
- **Body**: `text-base md:text-lg` (16px → 18px)
- **Small**: `text-sm` (14px)

#### Line Height
- **Headings**: `leading-tight` (1.25)
- **Body**: `leading-relaxed` (1.625)
- **Beneficio**: Mejor legibilidad y espaciado visual

### Espaciado

#### Sistema de Spacing
- **Base**: Escala de Tailwind (4px base unit)
- **Secciones**: `py-20 md:py-32` (80px → 128px)
- **Contenedores**: `max-w-6xl mx-auto px-4`
- **Gaps**: `gap-4`, `gap-6`, `gap-8` para flexbox/grid

#### Breakpoints Responsive
\`\`\`css
sm: 640px   /* Móvil grande */
md: 768px   /* Tablet */
lg: 1024px  /* Desktop */
xl: 1280px  /* Desktop grande */
\`\`\`

---

## Componentes Detallados

### 1. Header (Navegación)

#### Funcionalidades Técnicas

**Scroll Spy**
\`\`\`tsx
useEffect(() => {
  const handleScroll = () => {
    const sections = ['hero', 'about', 'projects', 'experience', 'contact']
    const scrollPosition = window.scrollY + 100

    for (const section of sections) {
      const element = document.getElementById(section)
      if (element) {
        const { offsetTop, offsetHeight } = element
        if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
          setActiveSection(section)
          break
        }
      }
    }
  }
  // ...
}, [])
\`\`\`
- **Lógica**: Detecta qué sección está visible en viewport
- **Offset**: +100px para activar antes de llegar exactamente
- **Performance**: Throttling implícito por React

**Cambio de Estilo al Scroll**
\`\`\`tsx
const [isScrolled, setIsScrolled] = useState(false)

useEffect(() => {
  const handleScroll = () => {
    setIsScrolled(window.scrollY > 50)
  }
  // ...
}, [])
\`\`\`
- **Trigger**: 50px de scroll
- **Efecto**: Cambia backdrop-blur y border

**Smooth Scroll**
\`\`\`tsx
const scrollToSection = (sectionId: string) => {
  const element = document.getElementById(sectionId)
  if (element) {
    const offset = 80 // Altura del header
    const elementPosition = element.offsetTop - offset
    window.scrollTo({
      top: elementPosition,
      behavior: 'smooth'
    })
  }
}
\`\`\`
- **Offset**: Compensa altura del header fijo
- **Behavior**: Animación nativa del navegador

**Menú Móvil**
\`\`\`tsx
const [isMenuOpen, setIsMenuOpen] = useState(false)

// Prevenir scroll cuando el menú está abierto
useEffect(() => {
  if (isMenuOpen) {
    document.body.style.overflow = 'hidden'
  } else {
    document.body.style.overflow = 'unset'
  }
}, [isMenuOpen])
\`\`\`
- **UX**: Bloquea scroll del body cuando menú abierto
- **Animación**: Framer Motion con slide desde arriba

#### Mejoras Posibles
- Agregar debounce al scroll listener para mejor performance
- Implementar IntersectionObserver API en lugar de scroll events
- Agregar indicador de progreso de lectura

---

### 2. Hero (Sección Principal)

#### Estructura Visual
\`\`\`tsx
<section className="min-h-screen flex items-center justify-center">
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.8 }}
  >
    {/* Contenido */}
  </motion.div>
</section>
\`\`\`

#### Animaciones de Entrada
- **Fade + Slide**: `opacity: 0, y: 20` → `opacity: 1, y: 0`
- **Duración**: 0.8s para suavidad
- **Stagger**: Elementos hijos con delays incrementales

#### Botones CTA
\`\`\`tsx
<motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
  <Button>Ver Proyectos</Button>
</motion.div>
\`\`\`
- **Hover**: Escala 1.05 (5% más grande)
- **Tap**: Escala 0.95 (feedback táctil)
- **Transición**: Suave por defecto de Framer Motion

#### Mejoras Posibles
- Agregar efecto de typing animation para el título
- Implementar partículas de fondo con canvas
- Agregar scroll indicator animado

---

### 3. About (Sobre Mí)

#### Layout Responsive
\`\`\`tsx
<div className="grid md:grid-cols-2 gap-12 items-center">
  {/* Avatar */}
  {/* Contenido */}
</div>
\`\`\`
- **Móvil**: 1 columna (stack vertical)
- **Desktop**: 2 columnas (lado a lado)
- **Gap**: 48px entre elementos

#### Avatar con Efecto
\`\`\`tsx
<motion.div
  whileHover={{ scale: 1.05, rotate: 5 }}
  className="relative w-64 h-64 mx-auto"
>
  <div className="absolute inset-0 bg-primary/20 rounded-full blur-2xl" />
  <Image className="rounded-full" />
</motion.div>
\`\`\`
- **Glow Effect**: Blur con color primary
- **Hover**: Escala + rotación sutil
- **Responsive**: Tamaño fijo pero centrado

#### Grid de Habilidades
\`\`\`tsx
<div className="grid grid-cols-2 md:grid-cols-4 gap-4">
  {skills.map((skill) => (
    <motion.div
      whileHover={{ y: -5 }}
      className="flex flex-col items-center gap-2 p-4 rounded-lg bg-muted"
    >
      <skill.icon className="w-8 h-8 text-primary" />
      <span>{skill.name}</span>
    </motion.div>
  ))}
</div>
\`\`\`
- **Layout**: 2 columnas móvil, 4 desktop
- **Hover**: Lift effect (-5px en Y)
- **Iconos**: Lucide React con color primary

#### Mejoras Posibles
- Agregar progress bars para nivel de habilidad
- Implementar filtros por categoría de skills
- Agregar certificaciones o badges

---

### 4. Projects (Proyectos)

#### Grid Responsive
\`\`\`tsx
<div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
  {projects.map((project, index) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.1 }}
    >
      {/* Card */}
    </motion.div>
  ))}
</div>
\`\`\`
- **Breakpoints**: 1 col → 2 cols → 3 cols
- **Animación**: Stagger con delay incremental
- **whileInView**: Anima cuando entra en viewport
- **viewport.once**: Solo anima la primera vez

#### Card de Proyecto
\`\`\`tsx
<div className="group relative overflow-hidden rounded-lg border bg-card">
  {/* Imagen con overlay en hover */}
  <div className="relative h-48 overflow-hidden">
    <Image className="transition-transform group-hover:scale-110" />
    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100" />
  </div>
  
  {/* Contenido */}
  <div className="p-6">
    <h3>{project.title}</h3>
    <p>{project.description}</p>
    
    {/* Tags */}
    <div className="flex flex-wrap gap-2">
      {project.tags.map((tag) => (
        <span className="px-3 py-1 text-xs rounded-full bg-primary/10">
          {tag}
        </span>
      ))}
    </div>
    
    {/* Links */}
    <div className="flex gap-4">
      <Button variant="outline" size="sm">
        <ExternalLink className="w-4 h-4" />
        Demo
      </Button>
      <Button variant="outline" size="sm">
        <Github className="w-4 h-4" />
        Código
      </Button>
    </div>
  </div>
</div>
\`\`\`

#### Efectos de Hover
- **Imagen**: Scale 1.1 con transition
- **Overlay**: Fade in de capa oscura
- **Group**: Tailwind group para hover coordinado

#### Mejoras Posibles
- Agregar filtros por tecnología
- Implementar modal con detalles completos
- Agregar lightbox para galería de imágenes
- Sistema de búsqueda de proyectos

---

### 5. Experience (Experiencia)

#### Timeline Vertical
\`\`\`tsx
<div className="space-y-8">
  {experiences.map((exp, index) => (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      className="relative pl-8 border-l-2 border-primary"
    >
      {/* Dot indicator */}
      <div className="absolute -left-2 top-0 w-4 h-4 rounded-full bg-primary" />
      
      {/* Contenido */}
      <div className="bg-card rounded-lg p-6 border">
        <div className="flex justify-between items-start">
          <div>
            <h3>{exp.role}</h3>
            <p className="text-primary">{exp.company}</p>
          </div>
          <span className="text-sm text-muted-foreground">{exp.period}</span>
        </div>
        <p className="mt-4">{exp.description}</p>
        
        {/* Achievements */}
        <ul className="mt-4 space-y-2">
          {exp.achievements.map((achievement) => (
            <li className="flex items-start gap-2">
              <ChevronRight className="w-4 h-4 text-primary mt-1" />
              <span>{achievement}</span>
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  ))}
</div>
\`\`\`

#### Elementos Visuales
- **Línea vertical**: `border-l-2 border-primary`
- **Dots**: Círculos posicionados absolutamente
- **Cards**: Elevación con border y bg-card
- **Animación**: Slide desde izquierda

#### Mejoras Posibles
- Agregar tabs para separar Experiencia/Educación
- Implementar timeline horizontal en desktop
- Agregar logos de empresas
- Sistema de fechas más visual

---

### 6. Contact (Contacto)

#### Formulario Funcional
\`\`\`tsx
const [formData, setFormData] = useState({
  name: '',
  email: '',
  message: ''
})
const [isSubmitting, setIsSubmitting] = useState(false)

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault()
  setIsSubmitting(true)
  
  // Aquí integrarías con tu backend o servicio de email
  // Ejemplo: EmailJS, Formspree, API Route de Next.js
  
  await new Promise(resolve => setTimeout(resolve, 1000))
  
  alert('Mensaje enviado correctamente')
  setFormData({ name: '', email: '', message: '' })
  setIsSubmitting(false)
}
\`\`\`

#### Estado del Formulario
- **Controlled inputs**: `value` y `onChange` sincronizados
- **Loading state**: Deshabilita botón durante envío
- **Reset**: Limpia campos después de envío exitoso

#### Validación (Mejora Futura)
\`\`\`tsx
// Ejemplo de validación básica
const [errors, setErrors] = useState({})

const validate = () => {
  const newErrors = {}
  
  if (!formData.name.trim()) {
    newErrors.name = 'El nombre es requerido'
  }
  
  if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
    newErrors.email = 'Email inválido'
  }
  
  if (formData.message.length < 10) {
    newErrors.message = 'El mensaje debe tener al menos 10 caracteres'
  }
  
  setErrors(newErrors)
  return Object.keys(newErrors).length === 0
}
\`\`\`

#### Redes Sociales
\`\`\`tsx
const socials = [
  { icon: Github, href: 'https://github.com/tuusuario', label: 'GitHub' },
  { icon: Linkedin, href: 'https://linkedin.com/in/tuusuario', label: 'LinkedIn' },
  { icon: Mail, href: 'mailto:tu@email.com', label: 'Email' },
]

<div className="flex gap-4">
  {socials.map((social) => (
    <motion.a
      whileHover={{ scale: 1.1, y: -2 }}
      href={social.href}
      className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center"
    >
      <social.icon className="w-5 h-5 text-primary" />
    </motion.a>
  ))}
</div>
\`\`\`

#### Mejoras Posibles
- Integrar con EmailJS o Formspree
- Agregar validación en tiempo real
- Implementar ReCAPTCHA
- Agregar toast notifications
- Guardar mensajes en base de datos

---

### 7. Footer

#### Estructura Simple
\`\`\`tsx
<footer className="border-t bg-muted/50">
  <div className="container max-w-6xl mx-auto px-4 py-8">
    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
      {/* Copyright */}
      <p className="text-sm text-muted-foreground">
        © {new Date().getFullYear()} Tu Nombre. Todos los derechos reservados.
      </p>
      
      {/* Links */}
      <div className="flex gap-6">
        <a href="#" className="text-sm hover:text-primary">Privacidad</a>
        <a href="#" className="text-sm hover:text-primary">Términos</a>
      </div>
    </div>
  </div>
</footer>
\`\`\`

#### Mejoras Posibles
- Agregar sitemap links
- Incluir newsletter signup
- Agregar back to top button

---

## Sistema de Animaciones

### Framer Motion: Patrones Utilizados

#### 1. Fade In + Slide Up
\`\`\`tsx
<motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.8 }}
>
\`\`\`
- **Uso**: Entrada de secciones principales
- **Efecto**: Aparece y sube suavemente
- **Duración**: 0.8s para suavidad

#### 2. Stagger Children
\`\`\`tsx
<motion.div
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true }}
  variants={{
    visible: {
      transition: {
        staggerChildren: 0.1
      }
    }
  }}
>
  {items.map((item) => (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
      }}
    >
\`\`\`
- **Uso**: Listas de proyectos, skills
- **Efecto**: Elementos aparecen secuencialmente
- **Delay**: 0.1s entre cada elemento

#### 3. Hover Effects
\`\`\`tsx
<motion.div
  whileHover={{ scale: 1.05, y: -5 }}
  whileTap={{ scale: 0.95 }}
  transition={{ type: "spring", stiffness: 300 }}
>
\`\`\`
- **Scale**: Agranda elemento
- **Y**: Efecto de "lift"
- **Spring**: Animación con rebote natural

#### 4. Scroll-Triggered
\`\`\`tsx
<motion.div
  initial={{ opacity: 0, x: -20 }}
  whileInView={{ opacity: 1, x: 0 }}
  viewport={{ once: true, amount: 0.3 }}
>
\`\`\`
- **whileInView**: Anima cuando entra en viewport
- **once**: Solo primera vez
- **amount**: 30% visible para trigger

### Performance de Animaciones

#### Optimizaciones Aplicadas
1. **Transform y Opacity**: Solo propiedades GPU-accelerated
2. **will-change**: Implícito en Framer Motion
3. **viewport.once**: Evita re-animaciones innecesarias
4. **Reduced Motion**: Respeta preferencias del usuario

#### Mejoras Posibles
\`\`\`tsx
// Detectar preferencia de reduced motion
const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

const variants = {
  hidden: { opacity: prefersReducedMotion ? 1 : 0, y: prefersReducedMotion ? 0 : 20 },
  visible: { opacity: 1, y: 0 }
}
\`\`\`

---

## Sistema de Temas

### next-themes: Implementación

#### Provider Setup
\`\`\`tsx
// theme-provider.tsx
'use client'

import { ThemeProvider as NextThemesProvider } from 'next-themes'

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      {children}
    </NextThemesProvider>
  )
}
\`\`\`

#### Configuración
- **attribute="class"**: Usa clase `.dark` en `<html>`
- **defaultTheme="system"**: Respeta preferencia del OS
- **enableSystem**: Permite opción "System"
- **disableTransitionOnChange**: Evita flash de transición

#### Toggle Component
\`\`\`tsx
'use client'

import { useTheme } from 'next-themes'
import { Moon, Sun } from 'lucide-react'

export function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  
  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="w-10 h-10 rounded-full bg-muted flex items-center justify-center"
    >
      <Sun className="w-5 h-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
      <Moon className="absolute w-5 h-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
    </button>
  )
}
\`\`\`

#### Transiciones de Iconos
- **Light mode**: Sun visible, Moon oculto
- **Dark mode**: Moon visible, Sun oculto
- **Animación**: Rotación + escala simultáneas

### Tokens de Color por Tema

#### Light Mode
\`\`\`css
@theme inline {
  --color-background: 0 0% 98%;
  --color-foreground: 0 0% 4%;
  --color-card: 0 0% 100%;
  --color-muted: 0 0% 96%;
}
\`\`\`

#### Dark Mode
\`\`\`css
.dark {
  --color-background: 0 0% 4%;
  --color-foreground: 0 0% 98%;
  --color-card: 0 0% 6%;
  --color-muted: 0 0% 10%;
}
\`\`\`

#### Ventajas del Sistema
1. **Consistencia**: Todos los componentes usan los mismos tokens
2. **Mantenibilidad**: Cambiar colores en un solo lugar
3. **Accesibilidad**: Contraste adecuado en ambos modos
4. **Performance**: CSS variables son rápidas

### Mejoras Posibles
- Agregar más opciones de tema (ej: high contrast)
- Implementar theme customizer
- Guardar preferencias de color personalizadas

---

## Optimización y Performance

### Next.js Optimizations

#### 1. Font Optimization
\`\`\`tsx
const mulish = Mulish({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-mulish',
})
\`\`\`
- **display: 'swap'**: Muestra fallback mientras carga
- **subsets**: Solo carga caracteres latinos
- **Self-hosting**: Next.js descarga y sirve localmente

#### 2. Image Optimization
\`\`\`tsx
<Image
  src="/placeholder.svg"
  alt="Project"
  width={400}
  height={300}
  className="object-cover"
/>
\`\`\`
- **Lazy loading**: Por defecto
- **Responsive**: Genera múltiples tamaños
- **WebP**: Convierte automáticamente
- **Blur placeholder**: Mejora perceived performance

#### 3. Code Splitting
- **Automático**: Next.js divide por rutas
- **Dynamic imports**: Para componentes pesados
\`\`\`tsx
const HeavyComponent = dynamic(() => import('./heavy-component'), {
  loading: () => <Spinner />,
  ssr: false // Si no necesita SSR
})
\`\`\`

### Performance Metrics

#### Core Web Vitals Targets
- **LCP** (Largest Contentful Paint): < 2.5s
- **FID** (First Input Delay): < 100ms
- **CLS** (Cumulative Layout Shift): < 0.1

#### Optimizaciones Aplicadas
1. **Fonts**: Preload y display swap
2. **Images**: Lazy load y responsive
3. **CSS**: Tailwind purge automático
4. **JS**: Tree shaking de Lucide icons

### Mejoras Posibles

#### 1. Lazy Loading de Secciones
\`\`\`tsx
const Projects = dynamic(() => import('@/components/projects'), {
  loading: () => <Skeleton />,
})
\`\`\`

#### 2. Intersection Observer para Animaciones
\`\`\`tsx
const { ref, inView } = useInView({
  threshold: 0.3,
  triggerOnce: true
})

return (
  <div ref={ref}>
    {inView && <AnimatedContent />}
  </div>
)
\`\`\`

#### 3. Prefetch de Recursos
\`\`\`tsx
<link rel="preload" href="/hero-image.jpg" as="image" />
\`\`\`

#### 4. Service Worker para PWA
\`\`\`tsx
// next.config.js
const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
})

module.exports = withPWA({
  // config
})
\`\`\`

---

## Mejoras Futuras

### Funcionalidades

#### 1. Blog Integrado
\`\`\`tsx
// app/blog/page.tsx
export default async function BlogPage() {
  const posts = await getPosts() // MDX o CMS
  
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {posts.map((post) => (
        <BlogCard post={post} />
      ))}
    </div>
  )
}
\`\`\`
- **MDX**: Markdown con componentes React
- **CMS**: Contentful, Sanity, o Strapi
- **Tags**: Sistema de categorización
- **Search**: Búsqueda de artículos

#### 2. Analytics
\`\`\`tsx
// app/layout.tsx
import { Analytics } from '@vercel/analytics/react'

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
\`\`\`
- **Vercel Analytics**: Métricas de performance
- **Google Analytics**: Comportamiento de usuarios
- **Hotjar**: Heatmaps y recordings

#### 3. CMS para Contenido
\`\`\`tsx
// lib/contentful.ts
import { createClient } from 'contentful'

const client = createClient({
  space: process.env.CONTENTFUL_SPACE_ID,
  accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
})

export async function getProjects() {
  const entries = await client.getEntries({ content_type: 'project' })
  return entries.items
}
\`\`\`
- **Ventaja**: Editar contenido sin tocar código
- **Opciones**: Contentful, Sanity, Strapi, Payload

#### 4. Internacionalización (i18n)
\`\`\`tsx
// next.config.js
module.exports = {
  i18n: {
    locales: ['es', 'en'],
    defaultLocale: 'es',
  },
}

// components/language-switcher.tsx
import { useRouter } from 'next/router'

export function LanguageSwitcher() {
  const router = useRouter()
  
  return (
    <select
      value={router.locale}
      onChange={(e) => router.push(router.pathname, router.asPath, { locale: e.target.value })}
    >
      <option value="es">Español</option>
      <option value="en">English</option>
    </select>
  )
}
\`\`\`

#### 5. Testimonios
\`\`\`tsx
<section id="testimonials">
  <Swiper
    modules={[Autoplay, Pagination]}
    autoplay={{ delay: 5000 }}
    pagination={{ clickable: true }}
  >
    {testimonials.map((testimonial) => (
      <SwiperSlide>
        <TestimonialCard testimonial={testimonial} />
      </SwiperSlide>
    ))}
  </Swiper>
</section>
\`\`\`

#### 6. Modo de Presentación
\`\`\`tsx
// Ocultar navegación, mostrar solo contenido
const [isPresentationMode, setIsPresentationMode] = useState(false)

// Atajos de teclado
useEffect(() => {
  const handleKeyPress = (e: KeyboardEvent) => {
    if (e.key === 'p' && e.ctrlKey) {
      setIsPresentationMode(!isPresentationMode)
    }
  }
  window.addEventListener('keydown', handleKeyPress)
  return () => window.removeEventListener('keydown', handleKeyPress)
}, [isPresentationMode])
\`\`\`

### Integraciones

#### 1. Email Service
\`\`\`tsx
// app/api/contact/route.ts
import { Resend } from 'resend'

const resend = new Resend(process.env.RESEND_API_KEY)

export async function POST(request: Request) {
  const { name, email, message } = await request.json()
  
  await resend.emails.send({
    from: 'portfolio@tudominio.com',
    to: 'tu@email.com',
    subject: `Nuevo mensaje de ${name}`,
    html: `<p><strong>De:</strong> ${name} (${email})</p><p>${message}</p>`
  })
  
  return Response.json({ success: true })
}
\`\`\`

#### 2. GitHub API
\`\`\`tsx
// Mostrar repos reales
export async function getGitHubRepos() {
  const response = await fetch('https://api.github.com/users/tuusuario/repos?sort=updated&per_page=6')
  const repos = await response.json()
  
  return repos.map((repo) => ({
    title: repo.name,
    description: repo.description,
    tags: repo.topics,
    stars: repo.stargazers_count,
    url: repo.html_url,
  }))
}
\`\`\`

#### 3. Google Calendar
\`\`\`tsx
// Mostrar disponibilidad para reuniones
import { google } from 'googleapis'

export async function getAvailability() {
  const calendar = google.calendar({ version: 'v3', auth })
  const events = await calendar.events.list({
    calendarId: 'primary',
    timeMin: new Date().toISOString(),
    maxResults: 10,
    singleEvents: true,
    orderBy: 'startTime',
  })
  
  return events.data.items
}
\`\`\`

### SEO Avanzado

#### 1. Metadata Dinámica
\`\`\`tsx
// app/layout.tsx
export const metadata = {
  title: 'Tu Nombre - Desarrollador Full Stack',
  description: 'Portfolio de desarrollador especializado en React, Next.js y Node.js',
  keywords: ['desarrollador', 'react', 'nextjs', 'portfolio'],
  authors: [{ name: 'Tu Nombre' }],
  openGraph: {
    title: 'Tu Nombre - Portfolio',
    description: 'Portfolio profesional de desarrollo web',
    url: 'https://tudominio.com',
    siteName: 'Tu Nombre Portfolio',
    images: [
      {
        url: 'https://tudominio.com/og-image.jpg',
        width: 1200,
        height: 630,
      },
    ],
    locale: 'es_ES',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Tu Nombre - Portfolio',
    description: 'Portfolio profesional de desarrollo web',
    images: ['https://tudominio.com/twitter-image.jpg'],
  },
}
\`\`\`

#### 2. Structured Data (JSON-LD)
\`\`\`tsx
// components/structured-data.tsx
export function StructuredData() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Tu Nombre',
    url: 'https://tudominio.com',
    image: 'https://tudominio.com/avatar.jpg',
    jobTitle: 'Desarrollador Full Stack',
    worksFor: {
      '@type': 'Organization',
      name: 'Tu Empresa'
    },
    sameAs: [
      'https://github.com/tuusuario',
      'https://linkedin.com/in/tuusuario',
      'https://twitter.com/tuusuario'
    ]
  }
  
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
    />
  )
}
\`\`\`

#### 3. Sitemap Automático
\`\`\`tsx
// app/sitemap.ts
export default function sitemap() {
  return [
    {
      url: 'https://tudominio.com',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: 'https://tudominio.com/#about',
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    // ... más URLs
  ]
}
\`\`\`

### Testing

#### 1. Unit Tests (Jest + React Testing Library)
\`\`\`tsx
// __tests__/components/header.test.tsx
import { render, screen, fireEvent } from '@testing-library/react'
import { Header } from '@/components/header'

describe('Header', () => {
  it('renders navigation links', () => {
    render(<Header />)
    expect(screen.getByText('Sobre Mí')).toBeInTheDocument()
    expect(screen.getByText('Proyectos')).toBeInTheDocument()
  })
  
  it('toggles mobile menu', () => {
    render(<Header />)
    const menuButton = screen.getByLabelText('Toggle menu')
    fireEvent.click(menuButton)
    expect(screen.getByRole('navigation')).toHaveClass('open')
  })
})
\`\`\`

#### 2. E2E Tests (Playwright)
\`\`\`tsx
// e2e/portfolio.spec.ts
import { test, expect } from '@playwright/test'

test('navigation works correctly', async ({ page }) => {
  await page.goto('http://localhost:3000')
  
  await page.click('text=Proyectos')
  await expect(page).toHaveURL('http://localhost:3000/#projects')
  
  await expect(page.locator('#projects')).toBeVisible()
})

test('contact form submission', async ({ page }) => {
  await page.goto('http://localhost:3000')
  
  await page.fill('input[name="name"]', 'Test User')
  await page.fill('input[name="email"]', 'test@example.com')
  await page.fill('textarea[name="message"]', 'Test message')
  
  await page.click('button[type="submit"]')
  
  await expect(page.locator('text=Mensaje enviado')).toBeVisible()
})
\`\`\`

### Accesibilidad

#### 1. Auditoría con Lighthouse
- Ejecutar en Chrome DevTools
- Target: Score > 90 en Accessibility

#### 2. Mejoras de Accesibilidad
\`\`\`tsx
// Agregar skip to content
<a href="#main-content" className="sr-only focus:not-sr-only">
  Saltar al contenido principal
</a>

// ARIA labels
<button aria-label="Abrir menú de navegación">
  <Menu />
</button>

// Focus visible
<a className="focus:outline-none focus:ring-2 focus:ring-primary">
  Link
</a>

// Reduced motion
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
\`\`\`

---

## Checklist de Personalización

### Contenido
- [ ] Cambiar nombre y título en Hero
- [ ] Actualizar biografía en About
- [ ] Agregar tus habilidades reales
- [ ] Reemplazar proyectos de ejemplo
- [ ] Actualizar experiencia laboral
- [ ] Cambiar enlaces de redes sociales
- [ ] Agregar tu email real

### Imágenes
- [ ] Reemplazar avatar placeholder
- [ ] Agregar imágenes de proyectos reales
- [ ] Crear favicon personalizado
- [ ] Generar Open Graph image

### Configuración
- [ ] Actualizar metadata en layout.tsx
- [ ] Configurar dominio personalizado
- [ ] Agregar Google Analytics
- [ ] Configurar servicio de email
- [ ] Agregar variables de entorno

### Deploy
- [ ] Conectar repositorio a Vercel
- [ ] Configurar dominio
- [ ] Verificar performance en Lighthouse
- [ ] Probar en múltiples dispositivos
- [ ] Verificar SEO con herramientas

---

## Recursos Adicionales

### Documentación
- [Next.js Docs](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Framer Motion](https://www.framer.com/motion/)
- [Lucide Icons](https://lucide.dev/)

### Herramientas
- [Vercel](https://vercel.com) - Hosting
- [Lighthouse](https://developers.google.com/web/tools/lighthouse) - Auditoría
- [PageSpeed Insights](https://pagespeed.web.dev/) - Performance
- [WebAIM Contrast Checker](https://webaim.org/resources/contrastchecker/) - Accesibilidad

### Inspiración
- [Awwwards](https://www.awwwards.com/websites/portfolio/)
- [Dribbble](https://dribbble.com/tags/portfolio)
- [Behance](https://www.behance.net/search/projects?search=portfolio)

---

**Última actualización**: 2025
**Versión**: 1.0.0
