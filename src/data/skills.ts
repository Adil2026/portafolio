/**
 * Skill entries — Localized<Skill>[] (constitution §4, §5).
 *
 * CV-backed real skills sourced from CV (Adilson Vargas Añez).
 * Categories: data-engineering | data-analytics | software-engineering
 */
import type { Localized } from '../lib/i18n/types'
import type { Skill, SkillCategory, SkillLevel } from '../types/content'

const cat = {
  de: 'data-engineering' as SkillCategory,
  da: 'data-analytics' as SkillCategory,
  se: 'software-engineering' as SkillCategory,
}

const lvl = {
  exp: 'expert' as SkillLevel,
  adv: 'advanced' as SkillLevel,
  int: 'intermediate' as SkillLevel,
  beg: 'beginner' as SkillLevel,
}

export const skills: Localized<Skill>[] = [
  // DATA ENGINEERING
  { es: { slug: 'sql-avanzado', name: 'SQL avanzado', category: cat.de, level: lvl.adv }, en: { slug: 'sql-avanzado', name: 'Advanced SQL', category: cat.de, level: lvl.adv } },
  { es: { slug: 'modelado-datos-relacional', name: 'Modelado de datos relacional', category: cat.de, level: lvl.adv }, en: { slug: 'modelado-datos-relacional', name: 'Relational Data Modeling', category: cat.de, level: lvl.adv } },
  { es: { slug: 'sql-server', name: 'SQL Server', category: cat.de, level: lvl.adv }, en: { slug: 'sql-server', name: 'SQL Server', category: cat.de, level: lvl.adv } },
  { es: { slug: 'mysql', name: 'MySQL', category: cat.de, level: lvl.adv }, en: { slug: 'mysql', name: 'MySQL', category: cat.de, level: lvl.adv } },
  { es: { slug: 'postgresql', name: 'PostgreSQL', category: cat.de, level: lvl.adv }, en: { slug: 'postgresql', name: 'PostgreSQL', category: cat.de, level: lvl.adv } },
  { es: { slug: 'python-pandas', name: 'Python (pandas)', category: cat.de, level: lvl.int }, en: { slug: 'python-pandas', name: 'Python (pandas)', category: cat.de, level: lvl.int } },
  { es: { slug: 'etl-basicos', name: 'Procesos ETL básicos', category: cat.de, level: lvl.int }, en: { slug: 'etl-basicos', name: 'Basic ETL Processes', category: cat.de, level: lvl.int } },
  { es: { slug: 'preparacion-datos', name: 'Preparación de datos para análisis', category: cat.de, level: lvl.int }, en: { slug: 'preparacion-datos', name: 'Data Preparation for Analysis', category: cat.de, level: lvl.int } },
  { es: { slug: 'normalizacion-datos', name: 'Normalización y estructuración de datos', category: cat.de, level: lvl.adv }, en: { slug: 'normalizacion-datos', name: 'Data Normalization & Structuring', category: cat.de, level: lvl.adv } },

  // DATA ANALYTICS
  { es: { slug: 'power-bi', name: 'Power BI (dashboards)', category: cat.da, level: lvl.adv }, en: { slug: 'power-bi', name: 'Power BI (dashboards)', category: cat.da, level: lvl.adv } },
  { es: { slug: 'dax', name: 'DAX', category: cat.da, level: lvl.adv }, en: { slug: 'dax', name: 'DAX', category: cat.da, level: lvl.adv } },
  { es: { slug: 'excel-avanzado', name: 'Excel avanzado (tablas dinámicas, funciones)', category: cat.da, level: lvl.adv }, en: { slug: 'excel-avanzado', name: 'Advanced Excel (pivot tables, functions)', category: cat.da, level: lvl.adv } },
  { es: { slug: 'visualizacion-datos', name: 'Visualización de datos y storytelling', category: cat.da, level: lvl.int }, en: { slug: 'visualizacion-datos', name: 'Data Visualization & Storytelling', category: cat.da, level: lvl.int } },

  // SOFTWARE ENGINEERING
  { es: { slug: 'php-laravel', name: 'PHP (Laravel)', category: cat.se, level: lvl.adv }, en: { slug: 'php-laravel', name: 'PHP (Laravel)', category: cat.se, level: lvl.adv } },
  { es: { slug: 'java', name: 'Java', category: cat.se, level: lvl.int }, en: { slug: 'java', name: 'Java', category: cat.se, level: lvl.int } },
  { es: { slug: 'dotnet', name: '.NET (C#, VB)', category: cat.se, level: lvl.int }, en: { slug: 'dotnet', name: '.NET (C#, VB)', category: cat.se, level: lvl.int } },
  { es: { slug: 'git-github', name: 'Git / GitHub', category: cat.se, level: lvl.adv }, en: { slug: 'git-github', name: 'Git / GitHub', category: cat.se, level: lvl.adv } },
  { es: { slug: 'moodle', name: 'Moodle (LMS) — administración', category: cat.se, level: lvl.adv }, en: { slug: 'moodle', name: 'Moodle (LMS) — administration', category: cat.se, level: lvl.adv } },
  { es: { slug: 'wordpress', name: 'WordPress', category: cat.se, level: lvl.int }, en: { slug: 'wordpress', name: 'WordPress', category: cat.se, level: lvl.int } },
  { es: { slug: 'microsoft-365', name: 'Microsoft 365', category: cat.se, level: lvl.int }, en: { slug: 'microsoft-365', name: 'Microsoft 365', category: cat.se, level: lvl.int } },
  { es: { slug: 'google-workspace', name: 'Google Workspace', category: cat.se, level: lvl.int }, en: { slug: 'google-workspace', name: 'Google Workspace', category: cat.se, level: lvl.int } },
  { es: { slug: 'linux-windows-macos', name: 'Linux / Windows / macOS', category: cat.se, level: lvl.adv }, en: { slug: 'linux-windows-macos', name: 'Linux / Windows / macOS', category: cat.se, level: lvl.adv } },
  { es: { slug: 'automatizacion-procesos', name: 'Automatización de procesos operativos', category: cat.se, level: lvl.adv }, en: { slug: 'automatizacion-procesos', name: 'Operational Process Automation', category: cat.se, level: lvl.adv } },
  { es: { slug: 'migracion-datos', name: 'Migración de sistemas y datos', category: cat.se, level: lvl.adv }, en: { slug: 'migracion-datos', name: 'System & Data Migration', category: cat.se, level: lvl.adv } },
  { es: { slug: 'documentacion-tecnica', name: 'Documentación técnica de procesos y datos', category: cat.se, level: lvl.adv }, en: { slug: 'documentacion-tecnica', name: 'Technical Documentation (processes & data)', category: cat.se, level: lvl.adv } },
]