/**
 * Project entries — Localized<Project>[] (constitution §4, §5, §6).
 *
 * CV-backed real projects sourced from CV (Adilson Vargas Añez).
 */
import type { Localized } from '../lib/i18n/types'
import type { Project } from '../types/content'

export const projects: Localized<Project>[] = [
  {
    es: {
      slug: 'sistema-registro-caneros',
      problem: 'Necesidad de un registro único de cañeros para la administración centralizada de productores en el sector azucarero.',
      dataAndContext: 'Datos de productores cañeros: información de parcelas, historial de entregas, liquidaciones y trazabilidad de caña. Volumen: miles de registros históricos.',
      stack: ['PHP', 'PostgreSQL', 'JavaScript', 'HTML/CSS'],
      role: 'Desarrollador Full Stack / Data Engineer — diseño de BD, consultas optimizadas, automatización de procesos.',
      outcome: 'Sistema en producción usado por administradores de la Unión de Cañeros de Guabirá. Reducción de errores manuales y tiempos de consulta.',
      demoUrl: 'https://oscarc144.sg-host.com',
    },
    en: {
      slug: 'sistema-registro-caneros',
      problem: 'Need for a unified cane-grower registry to centralize producer administration in the sugar sector.',
      dataAndContext: 'Cane grower data: plot information, delivery history, settlements, and cane traceability. Volume: thousands of historical records.',
      stack: ['PHP', 'PostgreSQL', 'JavaScript', 'HTML/CSS'],
      role: 'Full Stack Developer / Data Engineer — database design, optimized queries, process automation.',
      outcome: 'Production system used by Union de Cañeros de Guabirá administrators. Reduced manual errors and query times.',
      demoUrl: 'https://oscarc144.sg-host.com',
    },
  },
  {
    es: {
      slug: 'sistema-gestion-academica',
      problem: 'Plataforma integral para gestión de estudiantes, cursos, docentes y procesos académicos en unidad de postgrado.',
      dataAndContext: 'Datos académicos y administrativos: estudiantes, inscripciones, calificaciones, docentes, mallas curriculares. Multi-tenant por programa.',
      stack: ['PHP', 'PostgreSQL', 'JavaScript', 'Laravel'],
      role: 'Desarrollador Full Stack / Data Engineer — arquitectura de BD, migraciones, consultas complejas, reporting.',
      outcome: 'Sistema oficial en producción en UAGRM Business School. Automatizó procesos académicos y administrativos.',
      repoUrl: 'https://virtual.uagrmbs.edu.bo/',
    },
    en: {
      slug: 'sistema-gestion-academica',
      problem: 'Comprehensive platform for managing students, courses, faculty, and academic processes in a graduate school unit.',
      dataAndContext: 'Academic and administrative data: students, enrollments, grades, faculty, curricula. Multi-tenant per program.',
      stack: ['PHP', 'PostgreSQL', 'JavaScript', 'Laravel'],
      role: 'Full Stack Developer / Data Engineer — database architecture, migrations, complex queries, reporting.',
      outcome: 'Official production system at UAGRM Business School. Automated academic and administrative processes.',
      repoUrl: 'https://virtual.uagrmbs.edu.bo/',
    },
  },
  {
    es: {
      slug: 'modelo-datos-academico',
      problem: 'Necesidad de un modelo de datos normalizado y consultas optimizadas para reporting académico y toma de decisiones.',
      dataAndContext: 'Datos normalizados de estudiantes, cursos, docentes, notas, asistencias, programas. Consultas para dashboards y reportes gerenciales.',
      stack: ['PostgreSQL', 'SQL avanzado', 'Vistas materializadas', 'Funciones almacenadas'],
      role: 'Data Engineer — modelado relacional, índices, vistas, funciones, optimización de consultas para reporting.',
      outcome: 'Modelo robusto que soporta dashboards y reportes con tiempos de respuesta < 2s en consultas complejas.',
    },
    en: {
      slug: 'modelo-datos-academico',
      problem: 'Need for a normalized data model and optimized queries for academic reporting and decision-making.',
      dataAndContext: 'Normalized data of students, courses, faculty, grades, attendance, programs. Queries for dashboards and executive reports.',
      stack: ['PostgreSQL', 'Advanced SQL', 'Materialized views', 'Stored functions'],
      role: 'Data Engineer — relational modeling, indexes, views, functions, query optimization for reporting.',
      outcome: 'Robust model supporting dashboards and reports with < 2s response times on complex queries.',
    },
  },
  {
    es: {
      slug: 'dashboard-academico-powerbi',
      problem: 'Visualización ejecutiva de indicadores académicos (matrícula, deserción, rendimiento) para directivos de postgrado.',
      dataAndContext: 'Datos reales del sistema de gestión académica: métricas de estudiantes, cohortes, tasas de aprobación, tendencias temporales.',
      stack: ['Power BI', 'DAX', 'PostgreSQL', 'Power Query'],
      role: 'Data Analyst / Data Engineer — modelado en Power BI, medidas DAX, ETL con Power Query, publicación de dashboards.',
      outcome: 'Dashboard ejecutivo en uso por directivos. Permite seguimiento de KPIs académicos en tiempo real.',
      demoUrl: 'https://drive.google.com/file/d/1yQJaj2CgXBAN7GI1g7HFpahaaHer6oP-/view?usp=sharing',
    },
    en: {
      slug: 'dashboard-academico-powerbi',
      problem: 'Executive visualization of academic indicators (enrollment, dropout, performance) for graduate school directors.',
      dataAndContext: 'Real data from academic management system: student metrics, cohorts, pass rates, temporal trends.',
      stack: ['Power BI', 'DAX', 'PostgreSQL', 'Power Query'],
      role: 'Data Analyst / Data Engineer — Power BI modeling, DAX measures, Power Query ETL, dashboard publishing.',
      outcome: 'Executive dashboard in use by directors. Enables real-time tracking of academic KPIs.',
      demoUrl: 'https://drive.google.com/file/d/1yQJaj2CgXBAN7GI1g7HFpahaaHer6oP-/view?usp=sharing',
    },
  },
]