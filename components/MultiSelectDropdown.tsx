'use client'
import { useState, useRef, useEffect, useId } from 'react'

interface MultiSelectDropdownProps {
  options: string[]
  values: string[]
  onChange: (values: string[]) => void
  placeholder?: string
  error?: boolean
  id?: string
  labels?: Record<string, string>
  removeLabel?: string
  /** When true, the closed field opens into a type-to-filter input — the same
   * interaction and styling as SearchableDropdown (the field itself becomes
   * the search box; there is no separate search bar). Defaults to false,
   * preserving the plain click-to-select list used by the sector selects. */
  searchable?: boolean
  searchPlaceholder?: string
  noMatchesText?: string
}

export default function MultiSelectDropdown({
  options, values, onChange, placeholder = 'Select…', error = false, id, labels, removeLabel = 'Remove',
  searchable = false, searchPlaceholder, noMatchesText = 'No matches',
}: MultiSelectDropdownProps) {
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
    setQuery('')
    setOpen(true)
    if (searchable) requestAnimationFrame(() => inputRef.current?.focus())
  }

  const closeDropdown = () => {
    setOpen(false)
    setQuery('')
  }

  const toggleDropdown = () => {
    if (open) closeDropdown()
    else openDropdown()
  }

  const toggle = (opt: string) => {
    onChange(values.includes(opt) ? values.filter(v => v !== opt) : [...values, opt])
  }

  const filtered = searchable && query.trim() !== ''
    ? options.filter(o => labelOf(o).toLowerCase().includes(query.toLowerCase()))
    : options

  useEffect(() => { setHighlight(0) }, [query, open])

  // Used by the closed trigger (<div>) in both modes.
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

  // Used only by the open, searchable <input>. Enter toggles the highlighted
  // option but keeps the menu open, since this is a multi-select.
  const handleInputKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault()
      setHighlight(h => Math.min(h + 1, filtered.length - 1))
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      setHighlight(h => Math.max(h - 1, 0))
    } else if (e.key === 'Enter') {
      e.preventDefault()
      if (filtered[highlight]) toggle(filtered[highlight])
    } else if (e.key === 'Escape') {
      closeDropdown()
    }
  }

  const showInput = searchable && open

  return (
    <div ref={ref} className="msd-wrap">
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
          placeholder={searchPlaceholder ?? placeholder}
          autoComplete="off"
          role="combobox"
          aria-expanded={open}
          aria-controls={listboxId}
          aria-autocomplete="list"
        />
      ) : (
        <div
          id={id}
          className="form-input sdd-input msd-display"
          style={error ? { borderColor: '#c0392b' } : undefined}
          onClick={toggleDropdown}
          tabIndex={0}
          role="button"
          aria-haspopup="listbox"
          aria-expanded={open}
          onKeyDown={handleTriggerKeyDown}
        >
          {values.length === 0 ? (
            <span className="sdd-placeholder">{placeholder}</span>
          ) : (
            <div className="msd-chips">
              {values.map(v => (
                <span key={v} className="msd-chip">
                  {labelOf(v)}
                  <button
                    type="button"
                    className="msd-chip-remove"
                    onClick={e => { e.stopPropagation(); toggle(v) }}
                    aria-label={`${removeLabel} ${labelOf(v)}`}
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          )}
        </div>
      )}
      <div id={listboxId} className={`sdd-menu${open ? ' sdd-menu-open' : ''}`} role="listbox" aria-multiselectable="true">
        {filtered.length === 0 ? (
          <div className="sdd-empty">{noMatchesText}</div>
        ) : (
          filtered.map((opt, i) => (
            <div
              key={opt}
              role="option"
              aria-selected={values.includes(opt)}
              className={`sdd-option msd-option${values.includes(opt) ? ' sdd-option-selected' : ''}${i === highlight ? ' sdd-option-highlight' : ''}`}
              onMouseDown={e => { e.preventDefault(); toggle(opt) }}
              onMouseEnter={() => setHighlight(i)}
            >
              <span className={`msd-checkbox${values.includes(opt) ? ' msd-checkbox-checked' : ''}`} />
              {labelOf(opt)}
            </div>
          ))
        )}
      </div>
    </div>
  )
}
