import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react'
import type { ReactNode } from 'react'
import type { Dictionary, Language, Messages } from './types'
import { messages as esMessages } from './es'
import { messages as enMessages } from './en'

const STORAGE_KEY = 'lang'

/** Default to English (English-neutral container, constitution §5). */
export const DEFAULT_LANGUAGE: Language = 'en'

const dictionaries: Record<Language, Messages> = {
  es: esMessages,
  en: enMessages,
}

/** Type of a valid dotted key path into `Dictionary`, e.g. `'hero.summary'`. */
type DictionaryKey<T extends Record<string, unknown>> = {
  [K in keyof T & string]: T[K] extends Record<string, unknown>
    ? `${K}.${DictionaryKey<T[K]>}` | `${K}`
    : `${K}`
}[keyof T & string]

type MessageKey = DictionaryKey<Dictionary>

type LanguageContextValue = {
  language: Language
  setLanguage: (language: Language) => void
  t: (key: MessageKey) => string
}

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined)

/**
 * Reads the persisted language from localStorage, falling back to the default.
 * A malformed or absent value resolves to `DEFAULT_LANGUAGE`.
 */
function readStoredLanguage(): Language {
  const stored = window.localStorage.getItem(STORAGE_KEY)
  return stored === 'es' || stored === 'en' ? stored : DEFAULT_LANGUAGE
}

/**
 * Resolves a dotted key against a dictionary.
 *
 * `getValue(dict, 'hero.summary')` returns the string at `dict.hero.summary`.
 * The generic keeps the resolved value typed as `string`.
 */
function getValue<T extends Record<string, unknown>>(dict: T, path: string): string {
  return path.split('.').reduce<unknown>((acc, segment) => {
    if (acc && typeof acc === 'object' && segment in (acc as Record<string, unknown>)) {
      return (acc as Record<string, unknown>)[segment]
    }
    return undefined
  }, dict) as string
}

/**
 * Provides the active language, a setter, and a typed `t` lookup over the
 * shared es/en dictionaries. Language choice is persisted to localStorage
 * and reflected on `document.documentElement.lang`.
 */
export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>(readStoredLanguage)

  // Keep the document `lang` attribute in sync with the active language.
  useEffect(() => {
    document.documentElement.lang = language
  }, [language])

  const setLanguage = useCallback((next: Language) => {
    setLanguageState(next)
    window.localStorage.setItem(STORAGE_KEY, next)
  }, [])

  const t = useCallback(
    (key: MessageKey) => getValue(dictionaries[language], key),
    [language],
  )

  const value = useMemo<LanguageContextValue>(
    () => ({ language, setLanguage, t }),
    [language, setLanguage, t],
  )

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

/** Returns the active language and helpers. Must be used within a `LanguageProvider`. */
export function useI18n(): LanguageContextValue {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error('useI18n must be used within a LanguageProvider')
  }
  return context
}
