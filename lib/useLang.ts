'use client'
import { useState, useEffect } from 'react'
import { Lang } from '@/lib/translations'

const STORAGE_KEY = 'gwags-lang'

export function useLang(): [Lang, () => void] {
  const [lang, setLang] = useState<Lang>('en')

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored === 'fr') setLang('fr')
  }, [])

  function toggleLang() {
    setLang(l => {
      const next: Lang = l === 'en' ? 'fr' : 'en'
      localStorage.setItem(STORAGE_KEY, next)
      return next
    })
  }

  return [lang, toggleLang]
}
