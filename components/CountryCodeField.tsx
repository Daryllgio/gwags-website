'use client'
import { useState, useRef, useEffect, useId } from 'react'
import { COUNTRIES, COUNTRY_LABELS_FR } from '@/lib/countries'
import { getDialCode } from '@/lib/locations'
import { Lang } from '@/lib/translations'

interface CountryCodeFieldProps {
  /** Country name (canonical English value from COUNTRIES), or '' if unset. */
  value: string
  onChange: (countryName: string) => void
  lang: Lang
  error?: boolean
  id?: string
  placeholder?: string
  noMatchesText?: string
}

/** Searchable by country name; the closed field and the submitted value are
 * just the dial code (e.g. '+237') — the open list shows "Country (+code)"
 * so searching by name is still possible. */
export default function CountryCodeField({ value, onChange, lang, error, id, placeholder = '+', noMatchesText = 'No matches' }: CountryCodeFieldProps) {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [highlight, setHighlight] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const listboxId = useId()

  const nameOf = (countryName: string) => (lang === 'fr' ? COUNTRY_LABELS_FR[countryName] ?? countryName : countryName)

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
        setQuery('')
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  const openDropdown = () => {
    setQuery('')
    setOpen(true)
    requestAnimationFrame(() => inputRef.current?.focus())
  }

  const closeDropdown = () => {
    setOpen(false)
    setQuery('')
  }

  const toggleDropdown = () => {
    if (open) closeDropdown()
    else openDropdown()
  }

  const filtered = query.trim() !== ''
    ? COUNTRIES.filter(c =>
        nameOf(c).toLowerCase().includes(query.toLowerCase()) ||
        getDialCode(c).includes(query.trim().replace(/^\+/, '')))
    : COUNTRIES

  useEffect(() => { setHighlight(0) }, [query, open])

  const handleSelect = (countryName: string) => {
    onChange(countryName)
    closeDropdown()
  }

  const handleTriggerKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggleDropdown() }
    else if (e.key === 'Escape') closeDropdown()
    else if (e.key === 'ArrowDown') { e.preventDefault(); if (!open) { openDropdown(); return }; setHighlight(h => Math.min(h + 1, filtered.length - 1)) }
  }

  const handleInputKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') { e.preventDefault(); setHighlight(h => Math.min(h + 1, filtered.length - 1)) }
    else if (e.key === 'ArrowUp') { e.preventDefault(); setHighlight(h => Math.max(h - 1, 0)) }
    else if (e.key === 'Enter') { e.preventDefault(); if (filtered[highlight]) handleSelect(filtered[highlight]) }
    else if (e.key === 'Escape') closeDropdown()
  }

  return (
    <div ref={ref} className="sdd-wrap ccf-wrap">
      {open ? (
        <input
          id={id}
          ref={inputRef}
          type="text"
          className="form-input sdd-input ccf-input"
          style={error ? { borderColor: '#c0392b' } : undefined}
          value={query}
          onChange={e => setQuery(e.target.value)}
          onKeyDown={handleInputKeyDown}
          onClick={closeDropdown}
          placeholder={value ? getDialCode(value) : placeholder}
          autoComplete="off"
          role="combobox"
          aria-expanded={open}
          aria-controls={listboxId}
          aria-autocomplete="list"
        />
      ) : (
        <div
          id={id}
          className="form-input sdd-input sdd-display ccf-display"
          style={error ? { borderColor: '#c0392b' } : undefined}
          onClick={toggleDropdown}
          tabIndex={0}
          role="button"
          aria-haspopup="listbox"
          aria-expanded={open}
          onKeyDown={handleTriggerKeyDown}
        >
          {value ? getDialCode(value) : <span className="sdd-placeholder">{placeholder}</span>}
        </div>
      )}
      <div id={listboxId} className={`sdd-menu ccf-menu${open ? ' sdd-menu-open' : ''}`} role="listbox">
        {filtered.length === 0 ? (
          <div className="sdd-empty">{noMatchesText}</div>
        ) : (
          filtered.map((c, i) => (
            <div
              key={c}
              role="option"
              aria-selected={c === value}
              className={`sdd-option${c === value ? ' sdd-option-selected' : ''}${i === highlight ? ' sdd-option-highlight' : ''}`}
              onMouseDown={e => { e.preventDefault(); handleSelect(c) }}
              onMouseEnter={() => setHighlight(i)}
            >
              {nameOf(c)} ({getDialCode(c)})
            </div>
          ))
        )}
      </div>
    </div>
  )
}
