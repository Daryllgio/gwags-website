'use client'
import { useEffect, useLayoutEffect, useState, useRef, useCallback } from 'react'
import Image from 'next/image'
import { useArrowPress } from '@/lib/useArrowPress'
import { Lang, t } from '@/lib/translations'

// useLayoutEffect runs synchronously before the browser paints — essential so
// the body scroll-lock is in place before the overlay is ever shown, with no
// flicker. It warns under SSR, so fall back to useEffect on the server (where
// it would be a no-op anyway).
const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect

interface LightboxProps {
  count: number
  images?: string[]
  openIndex: number | null
  onClose: () => void
  lang: Lang
}

export default function Lightbox({ count, images, openIndex, onClose, lang }: LightboxProps) {
  const c = t[lang].common
  const [current, setCurrent] = useState(0)
  const [fading, setFading] = useState(false)
  const touchStartX = useRef(0)

  useIsomorphicLayoutEffect(() => {
    if (openIndex === null) return

    setCurrent(openIndex)
    setFading(false)

    // Lock the page at its exact current scroll position for as long as the
    // viewer is open. `position: fixed` + `top: -scrollY` freezes the page
    // without the browser losing where we were, so the underlying page cannot
    // scroll at all while the lightbox is up (fixes the open-time scroll jump).
    // The inner horizontal carousel keeps its own scrollLeft — it is never
    // unmounted, so it stays on the same image.
    const scrollY = window.scrollY
    const { body } = document
    body.style.position = 'fixed'
    body.style.top = `-${scrollY}px`
    body.style.width = '100%'
    body.style.overflow = 'hidden'

    // Restoration runs in cleanup so it fires whether the viewer closes by the
    // prop going null OR by the component unmounting (callers conditionally
    // render it). As a layout-effect cleanup it runs synchronously before the
    // next paint, and we disable smooth scrolling for the restore so the page
    // snaps back to the saved position with no visible movement.
    return () => {
      const html = document.documentElement
      const prevBehavior = html.style.scrollBehavior
      html.style.scrollBehavior = 'auto'
      body.style.position = ''
      body.style.top = ''
      body.style.width = ''
      body.style.overflow = ''
      window.scrollTo(0, scrollY)
      html.style.scrollBehavior = prevBehavior
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

  const atStart = current === 0
  const atEnd = current === count - 1
  const { pressed, setPressed, leftRef, rightRef } = useArrowPress(atStart, atEnd)

  if (openIndex === null) return null

  function handleTouchStart(e: React.TouchEvent) {
    touchStartX.current = e.touches[0].clientX
  }

  function handleTouchEnd(e: React.TouchEvent) {
    const delta = touchStartX.current - e.changedTouches[0].clientX
    if (Math.abs(delta) > 50) {
      e.preventDefault()
      navigate(delta > 0 ? 1 : -1)
    }
  }

  function handleOverlayTouchMove(e: React.TouchEvent) {
    e.preventDefault()
  }

  const isMobile = () => typeof window !== 'undefined' && window.innerWidth < 1025

  function handleOverlayClick() {
    if (isMobile()) onClose()
  }

  function handleImgWrapClick(e: React.MouseEvent) {
    if (!isMobile()) e.stopPropagation()
  }

  return (
    <div className="lb-overlay" onClick={handleOverlayClick} onTouchMove={handleOverlayTouchMove}>
      <button className="lb-close" onClick={onClose} aria-label={c.close}>
        <svg viewBox="0 0 14 14" fill="none">
          <line x1="1" y1="1" x2="13" y2="13" stroke="#000000" strokeWidth="2.2" strokeLinecap="round"/>
          <line x1="13" y1="1" x2="1" y2="13" stroke="#000000" strokeWidth="2.2" strokeLinecap="round"/>
        </svg>
      </button>
      <button
        ref={leftRef}
        className={`lb-arrow lb-arrow-left${pressed === 'left' ? ' lb-arrow-pressed' : ''}`}
        onClick={e => { e.stopPropagation(); if (!atStart) { navigate(-1); setPressed('left') } }}
        aria-label={c.previous}
        style={{ opacity: atStart ? 0.3 : 1, cursor: atStart ? 'default' : 'pointer' }}
      >
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M12.5 19 L6.5 12 L12.5 5 M6.5 12 L17.5 12" />
        </svg>
      </button>
      <div
        className="lb-img-wrap"
        onClick={handleImgWrapClick}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div className="lb-img" style={{ opacity: fading ? 0 : 1 }}>
          {images?.[current] && (
            <Image src={images[current]} alt="" fill style={{ objectFit: 'contain' }} sizes="90vw" />
          )}
        </div>
      </div>
      <button
        ref={rightRef}
        className={`lb-arrow lb-arrow-right${pressed === 'right' ? ' lb-arrow-pressed' : ''}`}
        onClick={e => { e.stopPropagation(); if (!atEnd) { navigate(1); setPressed('right') } }}
        aria-label={c.next}
        style={{ opacity: atEnd ? 0.3 : 1, cursor: atEnd ? 'default' : 'pointer' }}
      >
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M11.5 5 L17.5 12 L11.5 19 M17.5 12 L6.5 12" />
        </svg>
      </button>
      <span className="lb-counter">{current + 1} / {count}</span>
    </div>
  )
}
