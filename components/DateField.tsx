'use client'
import { useState, useRef, useEffect } from 'react'
import { Lang } from '@/lib/translations'

const MONTH_NAMES: Record<Lang, string[]> = {
  en: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
  fr: ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'],
}

const WEEKDAY_NAMES: Record<Lang, string[]> = {
  en: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
  fr: ['Di', 'Lu', 'Ma', 'Me', 'Je', 'Ve', 'Sa'],
}

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
  const ref = useRef<HTMLDivElement>(null)
  const today = new Date()
  const selected = value ? new Date(value + 'T00:00:00') : null
  const [viewYear, setViewYear] = useState((selected ?? today).getFullYear())
  const [viewMonth, setViewMonth] = useState((selected ?? today).getMonth())

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handleClick)
    return () => document.removeEventListener('mousedown', handleClick)
  }, [])

  function openCalendar() {
    const base = selected ?? today
    setViewYear(base.getFullYear())
    setViewMonth(base.getMonth())
    setOpen(o => !o)
  }

  function selectDay(day: number) {
    onChange(`${viewYear}-${pad(viewMonth + 1)}-${pad(day)}`)
    setOpen(false)
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
        onKeyDown={e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openCalendar() } }}
      >
        {value ? formatDisplay(value) : <span className="sdd-placeholder">{placeholder}</span>}
        <svg className="dtf-cal-icon" width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
          <rect x="1.5" y="2.5" width="13" height="12" rx="1.5" stroke="#0A1128" strokeOpacity="0.4" strokeWidth="1.2" />
          <path d="M1.5 6h13" stroke="#0A1128" strokeOpacity="0.4" strokeWidth="1.2" />
          <path d="M4.5 1v3M11.5 1v3" stroke="#0A1128" strokeOpacity="0.4" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
      </div>
      {open && (
        <div className="dtf-popup" role="dialog">
          <div className="dtf-header">
            <button type="button" className="dtf-nav-btn" onClick={prevMonth} aria-label="Previous month">‹</button>
            <span className="dtf-month-label">{MONTH_NAMES[lang][viewMonth]} {viewYear}</span>
            <button type="button" className="dtf-nav-btn" onClick={nextMonth} aria-label="Next month">›</button>
          </div>
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
        </div>
      )}
    </div>
  )
}
