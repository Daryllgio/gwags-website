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
}

export default function MultiSelectDropdown({ options, values, onChange, placeholder = 'Select…', error = false, id, labels, removeLabel = 'Remove' }: MultiSelectDropdownProps) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const listboxId = useId()
  const labelOf = (opt: string) => labels?.[opt] ?? opt

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  const toggle = (opt: string) => {
    onChange(values.includes(opt) ? values.filter(v => v !== opt) : [...values, opt])
  }

  return (
    <div ref={ref} className="msd-wrap">
      <div
        id={id}
        className="form-input sdd-input msd-display"
        style={error ? { borderColor: '#c0392b' } : undefined}
        onClick={() => setOpen(o => !o)}
        tabIndex={0}
        role="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); setOpen(o => !o) } }}
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
      <div id={listboxId} className={`sdd-menu${open ? ' sdd-menu-open' : ''}`} role="listbox" aria-multiselectable="true">
        {options.map(opt => (
          <div
            key={opt}
            role="option"
            aria-selected={values.includes(opt)}
            className={`sdd-option msd-option${values.includes(opt) ? ' sdd-option-selected' : ''}`}
            onMouseDown={e => { e.preventDefault(); toggle(opt) }}
          >
            <span className={`msd-checkbox${values.includes(opt) ? ' msd-checkbox-checked' : ''}`} />
            {labelOf(opt)}
          </div>
        ))}
      </div>
    </div>
  )
}
