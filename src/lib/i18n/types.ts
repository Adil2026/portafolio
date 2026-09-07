/**
 * i18n core types — structural bilingual enforcement (constitution §5).
 *
 * `Localized<T>` makes a missing `es` or `en` field a compile error under
 * `tsc -b`, so every published section is guaranteed to exist in both
 * languages before it can be rendered.
 */

/** Supported interface languages. */
export type Language = 'es' | 'en';

/**
 * Wraps a value of type `T` in both languages.
 *
 * A `Localized<T>` value MUST provide both `es` and `en`; omitting either is
 * a type error under strict mode. This is the structural guarantee that a
 * section is never published partially translated.
 */
export type Localized<T> = {
  [K in Language]: T;
};

/** Message keys shared between the `es` and `en` dictionaries. */
export type Dictionary = {
  nav: {
    home: string
  }
  hero: {
    title: string
    subtitle: string
  }
  projects: {
    title: string
  }
  skills: {
    title: string
  }
  experience: {
    title: string
  }
  footer: {
    rights: string
  }
}

/** A full language dictionary keyed by the shared `Dictionary` shape. */
export type Messages = Dictionary
