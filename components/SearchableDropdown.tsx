'use client'
import { useState, useRef, useEffect, useId } from 'react'

interface SearchableDropdownProps {
  options: string[]
  value: string
  onChange: (value: string) => void
  placeholder?: string
  error?: boolean
  id?: string
}

export default function SearchableDropdown({ options, value, onChange, placeholder = 'Type to search…', error = false, id }: SearchableDropdownProps) {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [highlight, setHighlight] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)
  const listboxId = useId()

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

  const filtered = query.trim() === ''
    ? options
    : options.filter(o => o.toLowerCase().includes(query.toLowerCase()))

  useEffect(() => { setHighlight(0) }, [query, open])

  const handleSelect = (opt: string) => {
    onChange(opt)
    setQuery('')
    setOpen(false)
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
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
      setOpen(false)
      setQuery('')
    }
  }

  return (
    <div ref={ref} className="sdd-wrap">
      {open ? (
        <input
          id={id}
          ref={inputRef}
          type="text"
          className="form-input sdd-input"
          style={error ? { borderColor: '#c0392b' } : undefined}
          value={query}
          onChange={e => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={value || placeholder}
          autoComplete="off"
          role="combobox"
          aria-expanded={open}
          aria-controls={listboxId}
          aria-autocomplete="list"
        />
      ) : (
        <div
          id={id}
          className="form-input sdd-input sdd-display"
          style={error ? { borderColor: '#c0392b' } : undefined}
          onClick={openDropdown}
          tabIndex={0}
          role="button"
          aria-haspopup="listbox"
          onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openDropdown() } }}
        >
          {value ? value : <span className="sdd-placeholder">{placeholder}</span>}
        </div>
      )}
      <div id={listboxId} className={`sdd-menu${open ? ' sdd-menu-open' : ''}`} role="listbox">
        {filtered.length === 0 ? (
          <div className="sdd-empty">No matches</div>
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
              {opt}
            </div>
          ))
        )}
      </div>
    </div>
  )
}
