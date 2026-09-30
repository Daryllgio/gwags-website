'use client'
import { useState, useRef, useEffect, useId } from 'react'

interface SearchableDropdownProps {
  options: string[]
  value: string
  onChange: (value: string) => void
  placeholder?: string
  error?: boolean
  id?: string
  /** Optional map of option value -> localized display label. The value passed to onChange is always the raw option string. */
  labels?: Record<string, string>
  noMatchesText?: string
  /** false renders a plain click-to-select list with no typing/filtering —
   * for short, fixed option sets (year of study, yes/no, referral,
   * platform...). Defaults to true, preserving the original type-to-filter
   * behavior used by long lists like Country/Region. */
  searchable?: boolean
  /** When true, the field cannot be opened, focused, or typed into — shows
   * `placeholder` and nothing else. Used for Region/State before a Country
   * is chosen. */
  disabled?: boolean
}

export default function SearchableDropdown({
  options, value, onChange, placeholder = 'Type to search…', error = false, id, labels,
  noMatchesText = 'No matches', searchable = true, disabled = false,
}: SearchableDropdownProps) {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [highlight, setHighlight] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const listboxId = useId()
  const labelOf = (opt: string) => labels?.[opt] ?? opt

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
    if (disabled) return
    setQuery('')
    setOpen(true)
    if (searchable) {
      requestAnimationFrame(() => inputRef.current?.focus())
    }
  }

  const closeDropdown = () => {
    setOpen(false)
    setQuery('')
  }

  const toggleDropdown = () => {
    if (disabled) return
    if (open) closeDropdown()
    else openDropdown()
  }

  const filtered = searchable && query.trim() !== ''
    ? options.filter(o => labelOf(o).toLowerCase().includes(query.toLowerCase()))
    : options

  useEffect(() => { setHighlight(0) }, [query, open])

  const handleSelect = (opt: string) => {
    onChange(opt)
    closeDropdown()
  }

  // Used by the trigger element — a <div> when closed, or always (never
  // becomes an <input>) in non-searchable mode.
  const handleTriggerKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      toggleDropdown()
    } else if (e.key === 'Escape') {
      closeDropdown()
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      if (!open) { openDropdown(); return }
      setHighlight(h => Math.min(h + 1, filtered.length - 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      if (open) setHighlight(h => Math.max(h - 1, 0))
    }
  }

  // Used only by the open, searchable <input>.
  const handleInputKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setHighlight(h => Math.min(h + 1, filtered.length - 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setHighlight(h => Math.max(h - 1, 0))
    } else if (e.key === 'Enter') {
      e.preventDefault()
      if (filtered[highlight]) handleSelect(filtered[highlight])
    } else if (e.key === 'Escape') {
      closeDropdown()
    }
  }

  const showInput = searchable && open

  return (
    <div ref={ref} className="sdd-wrap">
      {showInput ? (
        <input
          id={id}
          ref={inputRef}
          type="text"
          className="form-input sdd-input"
          style={error ? { borderColor: '#c0392b' } : undefined}
          value={query}
          onChange={e => setQuery(e.target.value)}
          onKeyDown={handleInputKeyDown}
          onClick={closeDropdown}
          placeholder={value ? labelOf(value) : placeholder}
          autoComplete="off"
          role="combobox"
          aria-expanded={open}
          aria-controls={listboxId}
          aria-autocomplete="list"
        />
      ) : (
        <div
          id={id}
          className={`form-input sdd-input sdd-display${disabled ? ' sdd-input-disabled' : ''}`}
          style={error ? { borderColor: '#c0392b' } : undefined}
          onClick={disabled ? undefined : toggleDropdown}
          tabIndex={disabled ? -1 : 0}
          role="button"
          aria-haspopup="listbox"
          aria-expanded={open}
          aria-disabled={disabled || undefined}
          onKeyDown={disabled ? undefined : handleTriggerKeyDown}
        >
          {value ? labelOf(value) : <span className="sdd-placeholder">{placeholder}</span>}
        </div>
      )}
      <div id={listboxId} className={`sdd-menu${open ? ' sdd-menu-open' : ''}`} role="listbox">
        {filtered.length === 0 ? (
          <div className="sdd-empty">{noMatchesText}</div>
        ) : (
          filtered.map((opt, i) => (
            <div
              key={opt}
              role="option"
              aria-selected={opt === value}
              className={`sdd-option${opt === value ? ' sdd-option-selected' : ''}${i === highlight ? ' sdd-option-highlight' : ''}`}
              onMouseDown={e => { e.preventDefault(); handleSelect(opt) }}
              onMouseEnter={() => setHighlight(i)}
            >
              {labelOf(opt)}
            </div>
          ))
        )}
      </div>
    </div>
  )
}
