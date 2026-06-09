'use client'

import { useEffect, useRef, useState } from 'react'
import type * as d3Type from 'd3'

/* ── Constants ── */
const PRIMARY_URL  = 'https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/geojson/ne_110m_land.json'
const FALLBACK_URL = 'https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson'

/* ── Canvas size helper ── */
function getCanvasSize(): number {
  if (typeof window === 'undefined') return 400
  if (window.innerWidth < 768)  return 280
  if (window.innerWidth < 1024) return 300
  return 400
}

interface GeoData {
  type: string
  features: d3Type.GeoPermissibleObjects[]
}

/* ── Main component ── */
export default function InteractiveGlobe() {
  const canvasRef      = useRef<HTMLCanvasElement>(null)
  const geoDataRef     = useRef<GeoData | null>(null)
  const rotationRef    = useRef<number>(0)
  const animFrameRef   = useRef<number>(0)
  const autoRotateRef  = useRef<boolean>(true)
  const resumeTimerRef = useRef<ReturnType<typeof setTimeout>>()

  const [loading,   setLoading]   = useState(true)
  const [loadError, setLoadError] = useState(false)

  /* ── GeoJSON fetch with fallback ── */
  useEffect(() => {
    let mounted = true

    async function fetchWith(url: string): Promise<GeoData> {
      const r = await fetch(url)
      if (!r.ok) throw new Error(`HTTP ${r.status}`)
      return r.json()
    }

    async function load(retries = 0): Promise<void> {
      try {
        const data = await fetchWith(PRIMARY_URL)
        if (mounted) { geoDataRef.current = data; setLoading(false) }
      } catch {
        try {
          const data = await fetchWith(FALLBACK_URL)
          if (mounted) { geoDataRef.current = data; setLoading(false) }
        } catch {
          if (retries < 2) {
            await new Promise(r => setTimeout(r, 1000))
            return load(retries + 1)
          }
          if (mounted) { setLoadError(true); setLoading(false) }
        }
      }
    }

    load()
    return () => { mounted = false }
  }, [])

  /* ── Canvas / D3 globe setup ── */
  useEffect(() => {
    if (loading) return
    const canvas = canvasRef.current
    if (!canvas) return

    let disposed = false
    let innerCleanup: (() => void) | undefined

    async function setup() {
      const d3 = await import('d3')
      if (disposed || !canvas) return

      const size = getCanvasSize()
      canvas.width  = size
      canvas.height = size
      canvas.style.width  = size + 'px'
      canvas.style.height = size + 'px'
      canvas.style.cursor = 'grab'

      const ctx = canvas.getContext('2d')!
      if (!ctx) return

      const projection = d3.geoOrthographic()
        .scale(size / 2 - 10)
        .translate([size / 2, size / 2])
        .clipAngle(90)

      const pathGen       = d3.geoPath().projection(projection).context(ctx)
      const graticuleData = d3.geoGraticule()() as d3Type.GeoPermissibleObjects
      const sphere        = { type: 'Sphere' as const }
      const rotateArr: [number, number] = [0, -20]

      let currentDrawSize = size

      function draw(s: number) {
        ctx.clearRect(0, 0, s, s)
        rotateArr[0] = rotationRef.current
        projection.rotate(rotateArr)

        /* Ocean fill */
        ctx.beginPath()
        pathGen(sphere)
        ctx.fillStyle = 'rgba(248,247,243,0.04)'
        ctx.fill()

        /* Graticule */
        ctx.beginPath()
        pathGen(graticuleData)
        ctx.strokeStyle = 'rgba(10,17,40,0.15)'
        ctx.lineWidth = 0.5
        ctx.stroke()

        /* All land batched into ONE path → fill + stroke once */
        if (geoDataRef.current) {
          ctx.beginPath()
          for (const feature of geoDataRef.current.features) {
            pathGen(feature)
          }
          ctx.fillStyle   = 'rgba(10,17,40,0.05)'
          ctx.strokeStyle = '#0A1128'
          ctx.lineWidth   = 0.8
          ctx.fill()
          ctx.stroke()
        }

        /* Outer border */
        ctx.beginPath()
        pathGen(sphere)
        ctx.strokeStyle = 'rgba(10,17,40,0.2)'
        ctx.lineWidth = 1
        ctx.stroke()
      }

      /* Time-based rotation at native fps — no throttle, no frame skipping.
         Cap delta at 100ms so tab-refocus doesn't cause a giant jump. */
      const DEG_PER_MS = 13.5 / 1000
      let lastTime = 0

      function animate(time: number) {
        if (disposed) return
        animFrameRef.current = requestAnimationFrame(animate)
        const delta = lastTime ? Math.min(time - lastTime, 100) : 16
        lastTime = time
        if (autoRotateRef.current) rotationRef.current += delta * DEG_PER_MS
        draw(currentDrawSize)
      }
      animFrameRef.current = requestAnimationFrame(animate)

      /* ── Drag handling ── */
      let isDragging = false
      let startX = 0
      let startRot = 0

      const onPointerDown = (e: PointerEvent) => {
        isDragging  = true
        startX      = e.clientX
        startRot    = rotationRef.current
        clearTimeout(resumeTimerRef.current)
        autoRotateRef.current = false
        canvas.style.cursor = 'grabbing'
        canvas.setPointerCapture(e.pointerId)
      }

      const onPointerMove = (e: PointerEvent) => {
        if (!isDragging) return
        const dx = e.clientX - startX
        rotationRef.current = startRot + dx * 0.5
      }

      const onPointerUp = () => {
        if (!isDragging) return
        isDragging = false
        canvas.style.cursor = 'grab'
        resumeTimerRef.current = setTimeout(() => {
          autoRotateRef.current = true
        }, 500)
      }

      /* Touch events */
      const onTouchStart = (e: TouchEvent) => {
        isDragging = true
        startX   = e.touches[0].clientX
        startRot = rotationRef.current
        clearTimeout(resumeTimerRef.current)
        autoRotateRef.current = false
      }

      const onTouchMove = (e: TouchEvent) => {
        if (!isDragging) return
        const dx = e.touches[0].clientX - startX
        rotationRef.current = startRot + dx * 0.5
      }

      const onTouchEnd = () => {
        if (!isDragging) return
        isDragging = false
        resumeTimerRef.current = setTimeout(() => { autoRotateRef.current = true }, 500)
      }

      /* Resize */
      const onResize = () => {
        if (disposed || !canvas) return
        const s = getCanvasSize()
        if (s === currentDrawSize) return
        currentDrawSize = s
        canvas.width  = s
        canvas.height = s
        canvas.style.width  = s + 'px'
        canvas.style.height = s + 'px'
        projection.scale(s / 2 - 10).translate([s / 2, s / 2])
      }

      canvas.addEventListener('pointerdown', onPointerDown)
      canvas.addEventListener('pointermove', onPointerMove)
      canvas.addEventListener('pointerup',   onPointerUp)
      canvas.addEventListener('touchstart',  onTouchStart, { passive: true })
      canvas.addEventListener('touchmove',   onTouchMove,  { passive: true })
      canvas.addEventListener('touchend',    onTouchEnd)
      window.addEventListener('resize', onResize)

      innerCleanup = () => {
        canvas.removeEventListener('pointerdown', onPointerDown)
        canvas.removeEventListener('pointermove', onPointerMove)
        canvas.removeEventListener('pointerup',   onPointerUp)
        canvas.removeEventListener('touchstart',  onTouchStart)
        canvas.removeEventListener('touchmove',   onTouchMove)
        canvas.removeEventListener('touchend',    onTouchEnd)
        window.removeEventListener('resize', onResize)
      }
    }

    setup().catch(() => {})

    return () => {
      disposed = true
      cancelAnimationFrame(animFrameRef.current)
      clearTimeout(resumeTimerRef.current)
      innerCleanup?.()
    }
  }, [loading])

  /* ── Render ── */
  if (loadError) {
    return (
      <div className="globe-container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <span style={{ color: '#0A1128', fontSize: '14px', opacity: 0.4 }}>Map unavailable</span>
      </div>
    )
  }

  return (
    <div className="globe-container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      {loading ? (
        <span style={{ color: '#0A1128', fontSize: '14px', opacity: 0.4 }}>Loading...</span>
      ) : (
        <canvas ref={canvasRef} />
      )}
    </div>
  )
}
