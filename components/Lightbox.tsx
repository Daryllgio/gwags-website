'use client'
import { useEffect, useState, useRef, useCallback } from 'react'

interface LightboxProps {
  count: number
  openIndex: number | null
  onClose: () => void
}

export default function Lightbox({ count, openIndex, onClose }: LightboxProps) {
  const [current, setCurrent] = useState(0)
  const [fading, setFading] = useState(false)
  const touchStartX = useRef(0)
  const scrollYRef = useRef(0)

  useEffect(() => {
    if (openIndex !== null) {
      setCurrent(openIndex)
      setFading(false)
      scrollYRef.current = window.scrollY
      document.body.style.position = 'fixed'
      document.body.style.top = `-${scrollYRef.current}px`
      document.body.style.width = '100%'
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.position = ''
      document.body.style.top = ''
      document.body.style.width = ''
      document.body.style.overflow = ''
      window.scrollTo(0, scrollYRef.current)
    }
    return () => {
      document.body.style.position = ''
      document.body.style.top = ''
      document.body.style.width = ''
      document.body.style.overflow = ''
    }
  }, [openIndex])

  const navigate = useCallback((dir: 1 | -1) => {
    const next = current + dir
    if (next < 0 || next >= count) return
    setFading(true)
    setTimeout(() => {
      setCurrent(next)
      setFading(false)
    }, 150)
  }, [current, count])

  useEffect(() => {
    if (openIndex === null) return
    function onKey(e: KeyboardEvent) {
      if (e.key === 'Escape') onClose()
      if (e.key === 'ArrowLeft') navigate(-1)
      if (e.key === 'ArrowRight') navigate(1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [openIndex, navigate, onClose])

  if (openIndex === null) return null

  const atStart = current === 0
  const atEnd = current === count - 1

  function handleTouchStart(e: React.TouchEvent) {
    touchStartX.current = e.touches[0].clientX
  }

  function handleTouchEnd(e: React.TouchEvent) {
    const delta = touchStartX.current - e.changedTouches[0].clientX
    if (Math.abs(delta) > 50) navigate(delta > 0 ? 1 : -1)
  }

  function handleOverlayTouchMove(e: React.TouchEvent) {
    e.preventDefault()
  }

  return (
    <div className="lb-overlay" onClick={onClose} onTouchMove={handleOverlayTouchMove}>
      <button className="lb-close" onClick={onClose} aria-label="Close">
        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M18 6 L6 18 M6 6 L18 18" />
        </svg>
      </button>
      <button
        className="lb-arrow lb-arrow-left"
        onClick={e => { e.stopPropagation(); navigate(-1) }}
        aria-label="Previous"
        style={{ opacity: atStart ? 0.3 : 1, cursor: atStart ? 'default' : 'pointer' }}
      >
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M15 19 L9 12 L15 5" />
        </svg>
      </button>
      <div
        className="lb-img-wrap"
        onClick={e => e.stopPropagation()}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div className="lb-img" style={{ opacity: fading ? 0 : 1 }} />
      </div>
      <button
        className="lb-arrow lb-arrow-right"
        onClick={e => { e.stopPropagation(); navigate(1) }}
        aria-label="Next"
        style={{ opacity: atEnd ? 0.3 : 1, cursor: atEnd ? 'default' : 'pointer' }}
      >
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M9 5 L15 12 L9 19" />
        </svg>
      </button>
      <span className="lb-counter">{current + 1} / {count}</span>
    </div>
  )
}
