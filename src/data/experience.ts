/**
 * Experience entries — Localized<Experience>[] (constitution §4, §5).
 *
 * CV-backed real experience sourced from CV (Adilson Vargas Añez).
 * Reverse chronological order.
 */
import type { Localized } from '../lib/i18n/types'
import type { Experience } from '../types/content'

export const experience: Localized<Experience>[] = [
  {
    es: {
      slug: 'encargado-sistemas-gestion-datos-guabira',
      role: 'Encargado de Sistemas y Gestión de Datos',
      company: 'Unión de Cañeros de Guabirá',
      period: 'Enero 2026 – Presente | Santa Cruz, Bolivia',
      highlights: [
        'Desarrollo de sistema de registro único de cañeros para administración centralizada de productores.',
        'Diseño y mantenimiento de bases de datos relacionales para trazabilidad de caña y liquidaciones.',
        'Creación de consultas SQL avanzadas para extracción, validación y análisis de datos históricos.',
        'Automatización de procesos operativos mediante sistemas informáticos, reduciendo errores manuales.',
      ],
    },
    en: {
      slug: 'encargado-sistemas-gestion-datos-guabira',
      role: 'Systems & Data Management Lead',
      company: 'Unión de Cañeros de Guabirá',
      period: 'Jan 2026 – Present | Santa Cruz, Bolivia',
      highlights: [
        'Developed unified cane-grower registry system for centralized producer administration.',
        'Designed and maintained relational databases for cane traceability and settlements.',
        'Created advanced SQL queries for extraction, validation, and analysis of historical data.',
        'Automated operational processes via software systems, reducing manual errors.',
      ],
    },
  },
  {
    es: {
      slug: 'uagrm-business-school',
      role: 'Desarrollador de Sistemas / Gestión de Datos Académicos',
      company: 'UAGRM – Business School (Unidad de Postgrado)',
      period: 'Enero 2020 – 2025 | Santa Cruz, Bolivia',
      highlights: [
        'Desarrollo de sistemas de gestión académica para administración de estudiantes, cursos y docentes (multi-tenant).',
        'Diseño y mantenimiento de bases de datos relacionales para información académica y administrativa.',
        'Creación de consultas SQL avanzadas para extracción, validación y análisis de datos históricos.',
        'Integración de datos entre sistemas académicos y plataformas institucionales.',
        'Administración de plataforma Moodle (LMS), asegurando calidad, integridad y disponibilidad de datos.',
        'Generación de datasets y reportes para uso administrativo y toma de decisiones directivas.',
        'Automatización de procesos operativos mediante sistemas informáticos.',
        'Aportes a Data Engineering: estructuración y normalización de datos, preparación para análisis/visualización, soporte a procesos ETL operativos a reportes.',
      ],
    },
    en: {
      slug: 'uagrm-business-school',
      role: 'Systems Developer / Academic Data Management',
      company: 'UAGRM – Business School (Graduate Unit)',
      period: 'Jan 2020 – 2025 | Santa Cruz, Bolivia',
      highlights: [
        'Developed academic management systems for student, course, and faculty administration (multi-tenant).',
        'Designed and maintained relational databases for academic and administrative information.',
        'Created advanced SQL queries for extraction, validation, and analysis of historical data.',
        'Integrated data between academic systems and institutional platforms.',
        'Administered Moodle (LMS) platform, ensuring data quality, integrity, and availability.',
        'Generated datasets and reports for administrative use and executive decision-making.',
        'Automated operational processes via software systems.',
        'Data Engineering contributions: data structuring & normalization, preparation for analysis/visualization, support for operational-to-reporting ETL processes.',
      ],
    },
  },
  {
    es: {
      slug: 'desarrollador-software-emitec',
      role: 'Desarrollador de Software',
      company: 'EMITEC S.R.L.',
      period: 'Noviembre 2017 – Abril 2018 | Santa Cruz, Bolivia',
      highlights: [
        'Desarrollo de sistemas web con backend conectado a bases de datos relacionales.',
        'Implementación de módulos de gestión de clientes, servicios técnicos y almacenes.',
        'Migración de sistemas y datos entre plataformas.',
        'Documentación técnica de procesos y estructuras de datos.',
      ],
    },
    en: {
      slug: 'desarrollador-software-emitec',
      role: 'Software Developer',
      company: 'EMITEC S.R.L.',
      period: 'Nov 2017 – Apr 2018 | Santa Cruz, Bolivia',
      highlights: [
        'Developed web systems with backend connected to relational databases.',
        'Implemented client management, technical services, and warehouse modules.',
        'Migrated systems and data between platforms.',
        'Authored technical documentation for processes and data structures.',
      ],
    },
  },
  {
    es: {
      slug: 'servicios-ti-facilmart',
      role: 'Servicios de Tecnología de la Información',
      company: 'Facilmart.com',
      period: 'Febrero 2016 – Octubre 2017 | Santa Cruz, Bolivia',
      highlights: [
        'Soporte técnico y administración básica de sistemas informáticos.',
        'Configuración de redes y servicios informáticos.',
        'Apoyo en la gestión de información operativa.',
      ],
    },
    en: {
      slug: 'servicios-ti-facilmart',
      role: 'IT Services & Support',
      company: 'Facilmart.com',
      period: 'Feb 2016 – Oct 2017 | Santa Cruz, Bolivia',
      highlights: [
        'Technical support and basic systems administration.',
        'Network and IT services configuration.',
        'Operational information management support.',
      ],
    },
  },
]