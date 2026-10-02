'use client'
import { useState, useRef, useEffect } from 'react'

const YEAR_GRID_SIZE = 12

interface YearFieldProps {
  /** 4-digit year as a string, or '' when unset. */
  value: string
  onChange: (v: string) => void
  error?: boolean
  id?: string
  placeholder?: string
}

export default function YearField({ value, onChange, error, id, placeholder = 'Select a year' }: YearFieldProps) {
  const [open, setOpen] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  const today = new Date()
  const selectedYear = value ? parseInt(value, 10) : null
  const [viewYear, setViewYear] = useState(selectedYear ?? today.getFullYear())

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  function openPicker() {
    setViewYear(selectedYear ?? today.getFullYear())
    setOpen(o => !o)
  }

  function closePicker() {
    setOpen(false)
  }

  function selectYear(year: number) {
    onChange(String(year))
    closePicker()
  }

  function prevYearPage() {
    setViewYear(y => y - YEAR_GRID_SIZE)
  }

  function nextYearPage() {
    setViewYear(y => y + YEAR_GRID_SIZE)
  }

  const yearGridStart = viewYear - Math.floor(YEAR_GRID_SIZE / 2) + 1
  const yearGridYears = Array.from({ length: YEAR_GRID_SIZE }, (_, i) => yearGridStart + i)

  return (
    <div ref={ref} className="dtf-wrap">
      <div
        id={id}
        className="form-input sdd-input sdd-display dtf-display"
        style={error ? { borderColor: '#c0392b' } : undefined}
        onClick={openPicker}
        tabIndex={0}
        role="button"
        aria-haspopup="dialog"
        aria-expanded={open}
        onKeyDown={e => {
          if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openPicker() }
          else if (e.key === 'Escape') closePicker()
        }}
      >
        {value ? value : <span className="sdd-placeholder">{placeholder}</span>}
        <svg className="dtf-cal-icon" width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <rect x="1.5" y="2.5" width="13" height="12" rx="1.5" stroke="#0A1128" strokeOpacity="0.4" strokeWidth="1.2" />
          <path d="M1.5 6h13" stroke="#0A1128" strokeOpacity="0.4" strokeWidth="1.2" />
          <path d="M4.5 1v3M11.5 1v3" stroke="#0A1128" strokeOpacity="0.4" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
      </div>
      {open && (
        <div className="dtf-popup" role="dialog" onKeyDown={e => { if (e.key === 'Escape') closePicker() }}>
          <div className="dtf-header">
            <button type="button" className="dtf-nav-btn" onClick={prevYearPage} aria-label="Previous years">‹</button>
            <div className="dtf-header-center">
              <span className="dtf-header-label">{yearGridYears[0]}–{yearGridYears[yearGridYears.length - 1]}</span>
            </div>
            <button type="button" className="dtf-nav-btn" onClick={nextYearPage} aria-label="Next years">›</button>
          </div>
          <div className="dtf-month-grid">
            {yearGridYears.map(y => (
              <button
                type="button"
                key={y}
                className={`dtf-month-cell${y === selectedYear ? ' dtf-month-cell-selected' : ''}`}
                onClick={() => selectYear(y)}
              >
                {y}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
