# Constitution del Portafolio

## 1. Propósito

Crear un portafolio profesional para Adilson Vargas Añez.

**Narrativa primaria: Data Engineering.** Las secciones, los proyectos
destacados y la comunicación del sitio refuerzan este perfil.
Data Analytics se presenta como línea secundaria complementaria.
Software Engineering es la base técnica transversal: el sitio se
construye y mantiene con rigor de ingeniería.

## 2. Audiencia objetivo

- Reclutadores y empresas que buscan perfiles Data Engineering / Data Analytics
- Empresas de tecnología
- Profesionales de IT

## 3. Tecnología

- Sitio: React, TypeScript, Vite, Tailwind CSS, Vercel, GitHub.
- La tecnología del sitio no limita los perfiles mostrados: los proyectos
  representan el stack real de cada trabajo (Python, SQL, pipelines,
  visualización, etc.).

## 4. Arquitectura

Component-based architecture. El contenido está separado de la
presentación: proyectos, skills y experiencias viven en estructuras
tipadas (data-driven), no hardcodeados en componentes.

## 5. Idioma y contenido

- El sitio es bilingüe (español e inglés). Cada sección publicada debe
  existir en ambos idiomas; no se publica una sección a medio traducir.
- Toda la información profesional debe estar respaldada por el CV
  vigente y proyectos reales.
- El CV oficial vive fuera de git; el sitio puede vincularlo o servirlo
  según la estrategia de assets, pero el repositorio no es su fuente
  de verdad.

## 6. Representación de proyectos

Cada proyecto publicado debe incluir como mínimo:

- Problema u objetivo
- Datos y contexto (fuente, volumen, restricciones si aplican)
- Stack y herramientas (las reales del proyecto)
- Rol del autor
- Resultado medible (métrica, impacto)
- Enlaces: repo y/o demo cuando existan

## 7. Diseño

El diseño debe comunicar: tecnología, datos, profesionalismo,
ingeniería y simplicidad.

- Responsive (mobile-first)
- Accesible: WCAG 2.1 AA
- SEO friendly
- Performance: fast loading con métricas auditables (LCP < 2.5s en producción)

## 8. Calidad

- Type-safe
- Maintainable: código revisable por un tercero
- Testeado: Vitest con tests unitarios y de componentes; la lógica de
  negocio, helpers y la capa de datos requieren cobertura
- CI básico: typecheck + tests + build en cada PR

## 9. Límites de alcance (no-goals v1)

Fuera de alcance para la v1: blog, CMS, autenticación/login, e-commerce,
multi-tema, SSR/ISR complejo. No implementar funcionalidades fuera de
este documento o de una especificación aprobada.

## 10. Desarrollo y verificación

- No implementar funcionalidades que no estén definidas en una especificación.
- Cada funcionalidad debe verificarse contra su especificación antes de
  considerarse completa.
- El flujo de cambios usa SDD: proposal → spec → design → tasks → apply
  → verify → archive.

## 11. Despliegue

Deploy automático desde GitHub hacia Vercel: preview por PR y producción
desde la rama principal.