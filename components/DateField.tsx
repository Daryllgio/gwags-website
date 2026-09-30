'use client'
import { useState, useRef, useEffect } from 'react'
import { Lang } from '@/lib/translations'

const MONTH_NAMES: Record<Lang, string[]> = {
  en: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
  fr: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'],
}

const MONTH_ABBR: Record<Lang, string[]> = {
  en: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
  fr: ['Janv', 'Févr', 'Mars', 'Avr', 'Mai', 'Juin', 'Juil', 'Août', 'Sept', 'Oct', 'Nov', 'Déc'],
}

const WEEKDAY_NAMES: Record<Lang, string[]> = {
  en: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
  fr: ['Di', 'Lu', 'Ma', 'Me', 'Je', 'Ve', 'Sa'],
}

const YEAR_GRID_SIZE = 12

type ViewMode = 'days' | 'months' | 'years'

interface DateFieldProps {
  /** ISO 'YYYY-MM-DD' or '' — display is always rendered as DD/MM/YYYY
   * regardless of this internal storage format. */
  value: string
  onChange: (v: string) => void
  lang: Lang
  error?: boolean
  id?: string
  placeholder?: string
}

function pad(n: number) {
  return String(n).padStart(2, '0')
}

function formatDisplay(value: string) {
  if (!value) return ''
  const [y, m, d] = value.split('-')
  return `${d}/${m}/${y}`
}

export default function DateField({ value, onChange, lang, error, id, placeholder = 'DD/MM/YYYY' }: DateFieldProps) {
  const [open, setOpen] = useState(false)
  const [viewMode, setViewMode] = useState<ViewMode>('days')
  const ref = useRef<HTMLDivElement>(null)
  const today = new Date()
  const selected = value ? new Date(value + 'T00:00:00') : null
  const [viewYear, setViewYear] = useState((selected ?? today).getFullYear())
  const [viewMonth, setViewMonth] = useState((selected ?? today).getMonth())

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false)
        setViewMode('days')
      }
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  function openCalendar() {
    const base = selected ?? today
    setViewYear(base.getFullYear())
    setViewMonth(base.getMonth())
    setViewMode('days')
    setOpen(o => !o)
  }

  function closeCalendar() {
    setOpen(false)
    setViewMode('days')
  }

  function selectDay(day: number) {
    onChange(`${viewYear}-${pad(viewMonth + 1)}-${pad(day)}`)
    closeCalendar()
  }

  // Clicking the month picked from its own grid never changes the year that
  // was already showing — only clicking a year (below) advances the view.
  function selectMonth(month: number) {
    setViewMonth(month)
    setViewMode('days')
  }

  function selectYear(year: number) {
    setViewYear(year)
    setViewMode('months')
  }

  // Both controls toggle: clicking the one whose grid is already open closes
  // it back to the day grid, matching normal dropdown/picker behavior.
  function toggleMonths() {
    setViewMode(m => m === 'months' ? 'days' : 'months')
  }

  function toggleYears() {
    setViewMode(m => m === 'years' ? 'days' : 'years')
  }

  function prevMonth() {
    if (viewMonth === 0) {
      setViewMonth(11)
      setViewYear(y => y - 1)
    } else {
      setViewMonth(m => m - 1)
    }
  }

  function nextMonth() {
    if (viewMonth === 11) {
      setViewMonth(0)
      setViewYear(y => y + 1)
    } else {
      setViewMonth(m => m + 1)
    }
  }

  const yearGridStart = viewYear - Math.floor(YEAR_GRID_SIZE / 2) + 1
  const yearGridYears = Array.from({ length: YEAR_GRID_SIZE }, (_, i) => yearGridStart + i)

  function prevYearPage() {
    setViewYear(y => y - YEAR_GRID_SIZE)
  }

  function nextYearPage() {
    setViewYear(y => y + YEAR_GRID_SIZE)
  }

  // Header navigation arrows mean "step by whatever unit the current grid is
  // showing" — month in the day grid, year while picking a month, a page of
  // years while picking a year.
  function prevNav() {
    if (viewMode === 'days') prevMonth()
    else if (viewMode === 'months') setViewYear(y => y - 1)
    else prevYearPage()
  }

  function nextNav() {
    if (viewMode === 'days') nextMonth()
    else if (viewMode === 'months') setViewYear(y => y + 1)
    else nextYearPage()
  }

  const firstDayOfMonth = new Date(viewYear, viewMonth, 1).getDay()
  const daysInMonth = new Date(viewYear, viewMonth + 1, 0).getDate()
  const cells: (number | null)[] = [
    ...Array(firstDayOfMonth).fill(null),
    ...Array.from({ length: daysInMonth }, (_, i) => i + 1),
  ]

  const isSelected = (day: number) =>
    !!selected && selected.getFullYear() === viewYear && selected.getMonth() === viewMonth && selected.getDate() === day
  const isToday = (day: number) =>
    today.getFullYear() === viewYear && today.getMonth() === viewMonth && today.getDate() === day

  return (
    <div ref={ref} className="dtf-wrap">
      <div
        id={id}
        className="form-input sdd-input sdd-display dtf-display"
        style={error ? { borderColor: '#c0392b' } : undefined}
        onClick={openCalendar}
        tabIndex={0}
        role="button"
        aria-haspopup="dialog"
        aria-expanded={open}
        onKeyDown={e => {
          if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openCalendar() }
          else if (e.key === 'Escape') closeCalendar()
        }}
      >
        {value ? formatDisplay(value) : <span className="sdd-placeholder">{placeholder}</span>}
        <svg className="dtf-cal-icon" width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <rect x="1.5" y="2.5" width="13" height="12" rx="1.5" stroke="#0A1128" strokeOpacity="0.4" strokeWidth="1.2" />
          <path d="M1.5 6h13" stroke="#0A1128" strokeOpacity="0.4" strokeWidth="1.2" />
          <path d="M4.5 1v3M11.5 1v3" stroke="#0A1128" strokeOpacity="0.4" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
      </div>
      {open && (
        <div className="dtf-popup" role="dialog" onKeyDown={e => { if (e.key === 'Escape') closeCalendar() }}>
          <div className="dtf-header">
            <button
              type="button"
              className="dtf-nav-btn"
              onClick={prevNav}
              aria-label={viewMode === 'days' ? 'Previous month' : viewMode === 'months' ? 'Previous year' : 'Previous years'}
            >
              ‹
            </button>
            <div className="dtf-header-center">
              <button
                type="button"
                className={`dtf-header-btn${viewMode === 'months' ? ' dtf-header-btn-active' : ''}`}
                onClick={toggleMonths}
                aria-haspopup="true"
                aria-expanded={viewMode === 'months'}
              >
                {MONTH_NAMES[lang][viewMonth]}
              </button>
              <button
                type="button"
                className={`dtf-header-btn${viewMode === 'years' ? ' dtf-header-btn-active' : ''}`}
                onClick={toggleYears}
                aria-haspopup="true"
                aria-expanded={viewMode === 'years'}
              >
                {viewYear}
              </button>
            </div>
            <button
              type="button"
              className="dtf-nav-btn"
              onClick={nextNav}
              aria-label={viewMode === 'days' ? 'Next month' : viewMode === 'months' ? 'Next year' : 'Next years'}
            >
              ›
            </button>
          </div>

          {viewMode === 'days' && (
            <>
              <div className="dtf-weekdays">
                {WEEKDAY_NAMES[lang].map((w, i) => <span key={i} className="dtf-weekday">{w}</span>)}
              </div>
              <div className="dtf-grid">
                {cells.map((day, i) => day === null ? (
                  <span key={i} className="dtf-cell dtf-cell-empty" />
                ) : (
                  <button
                    type="button"
                    key={i}
                    className={`dtf-cell dtf-day${isSelected(day) ? ' dtf-day-selected' : ''}${isToday(day) && !isSelected(day) ? ' dtf-day-today' : ''}`}
                    onClick={() => selectDay(day)}
                  >
                    {day}
                  </button>
                ))}
              </div>
            </>
          )}

          {viewMode === 'months' && (
            <div className="dtf-month-grid">
              {MONTH_ABBR[lang].map((m, i) => (
                <button
                  type="button"
                  key={i}
                  className={`dtf-month-cell${i === viewMonth ? ' dtf-month-cell-selected' : ''}`}
                  onClick={() => selectMonth(i)}
                >
                  {m}
                </button>
              ))}
            </div>
          )}

          {viewMode === 'years' && (
            <div className="dtf-month-grid">
              {yearGridYears.map(y => (
                <button
                  type="button"
                  key={y}
                  className={`dtf-month-cell${y === viewYear ? ' dtf-month-cell-selected' : ''}`}
                  onClick={() => selectYear(y)}
                >
                  {y}
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
