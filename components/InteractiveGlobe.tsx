'use client'

import { useEffect, useRef, useState, useCallback } from 'react'
import type * as d3Type from 'd3'

/* ── Constants ── */
const PRIMARY_URL  = 'https://raw.githubusercontent.com/datasets/geo-countries/master/data/countries.geojson'
const FALLBACK_URL = 'https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson'
const TYPEWRITER_TEXT = 'Gwags and its growing network of organizations, working across different sectors to address the societal challenges communities face.'

/* ── SDG data ── */
const SDG_DATA = [
  { num: 1,  name: 'No Poverty',             color: '#E5243B' },
  { num: 2,  name: 'Zero Hunger',             color: '#DDA63A' },
  { num: 3,  name: 'Good Health',             color: '#4C9F38' },
  { num: 4,  name: 'Quality Education',       color: '#C5192D' },
  { num: 5,  name: 'Gender Equality',         color: '#FF3A21' },
  { num: 6,  name: 'Clean Water',             color: '#26BDE2' },
  { num: 7,  name: 'Affordable Energy',       color: '#FCC30B' },
  { num: 8,  name: 'Decent Work',             color: '#A21942' },
  { num: 9,  name: 'Industry & Innovation',   color: '#FD6925' },
  { num: 10, name: 'Reduced Inequalities',    color: '#DD1367' },
  { num: 11, name: 'Sustainable Cities',      color: '#FD9D24' },
  { num: 12, name: 'Responsible Consumption', color: '#BF8B2E' },
  { num: 13, name: 'Climate Action',          color: '#3F7E44' },
  { num: 14, name: 'Life Below Water',        color: '#0A97D9' },
  { num: 15, name: 'Life on Land',            color: '#56C02B' },
  { num: 16, name: 'Peace & Justice',         color: '#00689D' },
  { num: 17, name: 'Partnerships',            color: '#19486A' },
]

/* ── Canvas size helper ── */
function getCanvasSize(): number {
  if (typeof window === 'undefined') return 400
  if (window.innerWidth < 768)  return 280
  if (window.innerWidth < 1024) return 300
  return 400
}

/* ── Flat world map for overlay (SVG) ── */
interface GeoData {
  type: string
  features: d3Type.GeoPermissibleObjects[]
}

function FlatWorldMap({ geoData }: { geoData: GeoData }) {
  const [paths,  setPaths]  = useState<string[]>([])
  const [gPath,  setGPath]  = useState('')
  const W = 1000, H = 500

  useEffect(() => {
    import('d3').then(d3 => {
      const projection = d3.geoEquirectangular().fitSize([W, H], { type: 'Sphere' })
      const pathGen    = d3.geoPath().projection(projection)
      const graticule  = d3.geoGraticule()
      setGPath(pathGen(graticule() as d3Type.GeoPermissibleObjects) ?? '')
      setPaths(geoData.features.map(f => pathGen(f) ?? ''))
    })
  }, [geoData])

  return (
    <svg viewBox={`0 0 ${W} ${H}`} style={{ width: '100%', height: 'auto', display: 'block' }}>
      <path d={gPath} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth={0.3} />
      {paths.map((d, i) => (
        <path key={i} d={d} fill="rgba(255,255,255,0.15)" stroke="white" strokeWidth={0.5} />
      ))}
    </svg>
  )
}

/* ── SDG grid ── */
function SDGGrid() {
  return (
    <div className="sdg-grid">
      {SDG_DATA.map(sdg => (
        <div
          key={sdg.num}
          className="sdg-square"
          style={{
            background: sdg.color, borderRadius: '8px',
            display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center',
            padding: '4px 2px',
          }}
        >
          <span style={{ color: 'white', fontWeight: 700, fontSize: '18px', lineHeight: 1.2 }}>{sdg.num}</span>
          <span style={{ color: 'white', fontSize: '10px', textAlign: 'center', lineHeight: 1.2, marginTop: '2px' }}>{sdg.name}</span>
        </div>
      ))}
    </div>
  )
}

/* ── Overlay ── */
interface OverlayProps {
  geoData: GeoData
  onClose: () => void
  closing: boolean
  typewriterText: string
}

function GlobeOverlay({ geoData, onClose, closing, typewriterText }: OverlayProps) {
  const [mapVisible, setMapVisible] = useState(false)
  const [sdgVisible, setSdgVisible] = useState(false)

  useEffect(() => {
    const t1 = setTimeout(() => setMapVisible(true), 30)
    const t2 = setTimeout(() => setSdgVisible(true), 300)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [])

  return (
    <div
      style={{
        position: 'fixed', top: 0, left: 0,
        width: '100vw', height: '100vh',
        background: 'rgba(0,0,0,0.93)',
        zIndex: 9999, overflowY: 'auto',
        display: 'flex', flexDirection: 'column', alignItems: 'center',
        padding: '40px 20px',
        opacity: closing ? 0 : 1,
        transition: closing ? 'opacity 0.3s ease' : 'none',
        animation: closing ? 'none' : 'globeFadeIn 0.3s ease forwards',
      }}
      onClick={onClose}
    >
      <style>{`
        @keyframes globeFadeIn { from { opacity: 0 } to { opacity: 1 } }
        @keyframes caretBlink  { 0%,100% { opacity: 1 } 50% { opacity: 0 } }
      `}</style>

      <button
        onClick={(e) => { e.stopPropagation(); onClose() }}
        style={{
          position: 'fixed', top: '24px', right: '32px',
          color: 'white', fontSize: '32px', lineHeight: 1,
          cursor: 'pointer', background: 'none', border: 'none',
          zIndex: 1,
        }}
        aria-label="Close"
      >×</button>

      {/* Stop click from bubbling for inner content */}
      <div
        onClick={(e) => e.stopPropagation()}
        style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%' }}
      >
        {/* Flat map */}
        <div
          className="overlay-map"
          style={{ opacity: mapVisible ? 1 : 0, transition: 'opacity 0.4s ease' }}
        >
          <FlatWorldMap geoData={geoData} />
        </div>

        {/* SDG grid */}
        <div style={{ opacity: sdgVisible ? 1 : 0, transition: 'opacity 0.3s ease' }}>
          <SDGGrid />
        </div>

        {/* Typewriter */}
        <p
          className="typewriter-text"
          style={{
            color: 'white', textAlign: 'center',
            maxWidth: '700px', margin: '40px auto 0',
            lineHeight: 1.75,
          }}
        >
          {typewriterText}
          {typewriterText.length < TYPEWRITER_TEXT.length && (
            <span style={{ animation: 'caretBlink 0.7s infinite', marginLeft: '1px' }}>|</span>
          )}
        </p>
      </div>
    </div>
  )
}

/* ── Main component ── */
export default function InteractiveGlobe() {
  const canvasRef      = useRef<HTMLCanvasElement>(null)
  const geoDataRef     = useRef<GeoData | null>(null)
  const rotationRef    = useRef<number>(0)
  const animFrameRef   = useRef<number>(0)
  const autoRotateRef  = useRef<boolean>(true)
  const resumeTimerRef = useRef<ReturnType<typeof setTimeout>>()

  const [loading,    setLoading]    = useState(true)
  const [loadError,  setLoadError]  = useState(false)
  const [overlayOpen, setOverlayOpen] = useState(false)
  const [closing,     setClosing]     = useState(false)
  const [typewriterText, setTypewriterText] = useState('')

  const openOverlay = useCallback(() => {
    autoRotateRef.current = false
    setOverlayOpen(true)
  }, [])

  const closeOverlay = useCallback(() => {
    setClosing(true)
    setTimeout(() => {
      setOverlayOpen(false)
      setClosing(false)
      setTypewriterText('')
      autoRotateRef.current = true
    }, 300)
  }, [])

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
      const graticuleData = d3.geoGraticule()() as d3Type.GeoPermissibleObjects  // computed once

      let currentDrawSize = size

      function draw(s: number) {
        ctx.clearRect(0, 0, s, s)
        projection.rotate([rotationRef.current, -20])

        /* Ocean fill */
        ctx.beginPath()
        pathGen({ type: 'Sphere' })
        ctx.fillStyle = 'rgba(248,247,243,0.04)'
        ctx.fill()

        /* Graticule – single cached object */
        ctx.beginPath()
        pathGen(graticuleData)
        ctx.strokeStyle = 'rgba(10,17,40,0.15)'
        ctx.lineWidth = 0.5
        ctx.stroke()

        /* All countries batched into ONE path then fill+stroke once */
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
        pathGen({ type: 'Sphere' })
        ctx.strokeStyle = 'rgba(10,17,40,0.2)'
        ctx.lineWidth = 1
        ctx.stroke()
      }

      /* Throttle to ~30 fps; use elapsed time for consistent rotation speed */
      const DEG_PER_MS = 9 / 1000   // 9°/sec = same visual speed as before
      let lastFrameTime = 0

      function animate(time: number) {
        if (disposed) return
        animFrameRef.current = requestAnimationFrame(animate)

        const elapsed = time - lastFrameTime
        if (elapsed < 32) return          // skip: not yet 30fps threshold

        lastFrameTime = time
        if (autoRotateRef.current) rotationRef.current += elapsed * DEG_PER_MS
        draw(currentDrawSize)
      }
      animFrameRef.current = requestAnimationFrame(animate)

      /* ── Drag / click handling ── */
      let isDragging  = false
      let startX = 0, startY = 0
      let startRot = 0
      let movedDist = 0

      const onPointerDown = (e: PointerEvent) => {
        isDragging  = true
        startX      = e.clientX
        startY      = e.clientY
        startRot    = rotationRef.current
        movedDist   = 0
        clearTimeout(resumeTimerRef.current)
        autoRotateRef.current = false
        canvas.style.cursor = 'grabbing'
        canvas.setPointerCapture(e.pointerId)
      }

      const onPointerMove = (e: PointerEvent) => {
        if (!isDragging) return
        const dx = e.clientX - startX
        const dy = e.clientY - startY
        movedDist = Math.sqrt(dx * dx + dy * dy)
        rotationRef.current = startRot + dx * 0.5
      }

      const onPointerUp = () => {
        if (!isDragging) return
        isDragging = false
        canvas.style.cursor = 'grab'
        if (movedDist < 5) {
          openOverlay()
          return
        }
        resumeTimerRef.current = setTimeout(() => {
          autoRotateRef.current = true
        }, 1500)
      }

      /* Touch events */
      const onTouchStart = (e: TouchEvent) => {
        isDragging = true
        startX   = e.touches[0].clientX
        startY   = e.touches[0].clientY
        startRot = rotationRef.current
        movedDist = 0
        clearTimeout(resumeTimerRef.current)
        autoRotateRef.current = false
      }

      const onTouchMove = (e: TouchEvent) => {
        if (!isDragging) return
        const dx = e.touches[0].clientX - startX
        const dy = e.touches[0].clientY - startY
        movedDist = Math.sqrt(dx * dx + dy * dy)
        rotationRef.current = startRot + dx * 0.5
      }

      const onTouchEnd = () => {
        if (!isDragging) return
        isDragging = false
        if (movedDist < 5) { openOverlay(); return }
        resumeTimerRef.current = setTimeout(() => { autoRotateRef.current = true }, 1500)
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
  }, [loading, openOverlay])

  /* ── Typewriter ── */
  useEffect(() => {
    if (!overlayOpen) return
    let i = 0
    let iv: ReturnType<typeof setInterval>
    const t = setTimeout(() => {
      iv = setInterval(() => {
        i++
        if (i <= TYPEWRITER_TEXT.length) {
          setTypewriterText(TYPEWRITER_TEXT.slice(0, i))
        } else {
          clearInterval(iv)
        }
      }, 40)
    }, 800)
    return () => { clearTimeout(t); clearInterval(iv) }
  }, [overlayOpen])

  /* ── Escape key ── */
  useEffect(() => {
    if (!overlayOpen) return
    const fn = (e: KeyboardEvent) => { if (e.key === 'Escape') closeOverlay() }
    window.addEventListener('keydown', fn)
    return () => window.removeEventListener('keydown', fn)
  }, [overlayOpen, closeOverlay])

  /* ── Render ── */
  if (loadError) {
    return (
      <div className="globe-container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <span style={{ color: '#0A1128', fontSize: '14px', opacity: 0.4 }}>Map unavailable</span>
      </div>
    )
  }

  return (
    <>
      <div className="globe-container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {loading ? (
          <span style={{ color: '#0A1128', fontSize: '14px', opacity: 0.4 }}>Loading...</span>
        ) : (
          <canvas ref={canvasRef} />
        )}
      </div>

      {overlayOpen && geoDataRef.current && (
        <GlobeOverlay
          geoData={geoDataRef.current}
          onClose={closeOverlay}
          closing={closing}
          typewriterText={typewriterText}
        />
      )}
    </>
  )
}
