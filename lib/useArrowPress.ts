'use client'
import { useEffect, useRef, useState } from 'react'

/** Tracks which carousel/lightbox arrow shows the pressed (dashed-outline)
 *  state. The outline persists after click and only clears when the other
 *  arrow is pressed, the user clicks elsewhere, or the pressed arrow becomes
 *  disabled at a carousel boundary. */
export function useArrowPress(atStart: boolean, atEnd: boolean) {
  const [pressed, setPressed] = useState<'left' | 'right' | null>(null)
  const leftRef = useRef<HTMLButtonElement>(null)
  const rightRef = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      const target = e.target as Node
      if (leftRef.current?.contains(target) || rightRef.current?.contains(target)) return
      setPressed(null)
    }
    // Capture phase so this can't be blocked by stopPropagation() on
    // intervening elements (e.g. the lightbox image/overlay handlers).
    document.addEventListener('click', handleClick, true)
    return () => document.removeEventListener('click', handleClick, true)
  }, [])

  useEffect(() => {
    if (atStart) setPressed(p => (p === 'left' ? null : p))
  }, [atStart])

  useEffect(() => {
    if (atEnd) setPressed(p => (p === 'right' ? null : p))
  }, [atEnd])

  return { pressed, setPressed, leftRef, rightRef }
}
