'use client'
import { useEffect, useRef, useState, useCallback } from 'react'
import type * as THREE from 'three'

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

const TYPEWRITER_TEXT = 'Gwags and its growing network of organizations, working across different sectors to address the societal challenges communities face.'

/* ── Simplified SVG world map (equirectangular 1000×500) ── */
function WorldMapSVG() {
  const sharedProps = { fill: 'white', fillOpacity: 0.15, stroke: 'white', strokeWidth: 0.5 }
  return (
    <svg viewBox="0 0 1000 500" style={{ width: '100%', height: 'auto', display: 'block' }} xmlns="http://www.w3.org/2000/svg">
      {/* North America */}
      <path {...sharedProps} d="M 35,55 L 80,30 L 150,25 L 200,35 L 232,25 L 282,30 L 348,95 L 356,122 L 332,145 L 296,176 L 267,205 L 246,226 L 216,216 L 194,192 L 164,163 L 124,158 L 87,139 L 54,100 Z" />
      {/* Greenland */}
      <path {...sharedProps} d="M 287,20 L 332,14 L 377,21 L 390,41 L 376,61 L 349,73 L 311,69 L 286,50 Z" />
      {/* South America */}
      <path {...sharedProps} d="M 232,213 L 266,207 L 299,218 L 404,260 L 409,291 L 387,346 L 351,391 L 316,416 L 286,401 L 269,376 L 256,344 L 258,294 L 243,256 Z" />
      {/* Europe */}
      <path {...sharedProps} d="M 470,150 L 474,130 L 481,113 L 487,98 L 494,87 L 505,77 L 518,70 L 530,65 L 543,59 L 560,54 L 574,51 L 587,52 L 598,58 L 606,71 L 601,89 L 592,104 L 580,119 L 563,131 L 546,138 L 526,144 L 507,148 L 490,153 Z" />
      {/* Africa */}
      <path {...sharedProps} d="M 475,153 L 502,146 L 542,142 L 598,151 L 630,173 L 640,213 L 628,256 L 616,284 L 592,331 L 556,366 L 521,371 L 488,354 L 462,319 L 447,279 L 443,239 L 452,200 Z" />
      {/* Asia mainland */}
      <path {...sharedProps} d="M 574,51 L 702,42 L 805,47 L 872,60 L 927,78 L 970,98 L 1000,124 L 1000,148 L 984,157 L 956,169 L 911,179 L 870,189 L 827,203 L 791,216 L 747,219 L 711,223 L 672,216 L 639,199 L 614,179 L 602,158 L 597,134 L 598,100 L 600,74 Z" />
      {/* Indian subcontinent */}
      <path {...sharedProps} d="M 672,216 L 711,223 L 724,249 L 712,286 L 693,309 L 672,299 L 657,269 L 650,239 Z" />
      {/* SE Asia peninsula */}
      <path {...sharedProps} d="M 747,219 L 769,234 L 774,268 L 762,293 L 747,296 L 732,269 L 732,239 Z" />
      {/* Australia */}
      <path {...sharedProps} d="M 749,271 L 822,255 L 874,263 L 907,282 L 912,316 L 896,349 L 860,366 L 818,361 L 779,346 L 752,321 L 743,294 Z" />
      {/* New Zealand */}
      <path {...sharedProps} d="M 934,354 L 943,346 L 954,356 L 949,371 L 935,371 Z" />
      {/* Antarctica */}
      <path {...sharedProps} d="M 0,456 L 142,447 L 252,452 L 382,445 L 502,450 L 622,447 L 742,452 L 862,447 L 1000,456 L 1000,500 L 0,500 Z" />
    </svg>
  )
}

/* ── Overlay ── */
interface OverlayProps {
  onClose: () => void
  typewriterText: string
  closing: boolean
}

function GlobeOverlay({ onClose, typewriterText, closing }: OverlayProps) {
  return (
    <div
      style={{
        position: 'fixed', top: 0, left: 0,
        width: '100vw', height: '100vh',
        background: 'rgba(0,0,0,0.93)',
        zIndex: 9999, overflowY: 'auto',
        opacity: closing ? 0 : 1,
        transition: 'opacity 0.3s ease',
        animation: closing ? 'none' : 'globeFadeIn 0.3s ease forwards',
      }}
      onClick={(e) => { if (e.target === e.currentTarget) onClose() }}
    >
      <style>{`
        @keyframes globeFadeIn { from { opacity: 0 } to { opacity: 1 } }
        @keyframes caretBlink { 0%,100% { opacity: 1 } 50% { opacity: 0 } }
      `}</style>

      <button
        onClick={onClose}
        style={{
          position: 'fixed', top: '24px', right: '24px',
          color: 'white', fontSize: '28px', cursor: 'pointer',
          background: 'none', border: 'none', lineHeight: 1, zIndex: 1,
        }}
        aria-label="Close"
      >
        ×
      </button>

      <div
        style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '60px 20px' }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* World map */}
        <div className="overlay-map">
          <WorldMapSVG />
        </div>

        {/* SDG grid */}
        <div className="sdg-grid" style={{ marginTop: '32px' }}>
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
              <span style={{ color: 'white', fontSize: '11px', textAlign: 'center', lineHeight: 1.2, marginTop: '2px' }}>{sdg.name}</span>
            </div>
          ))}
        </div>

        {/* Typewriter text */}
        <p
          className="typewriter-text"
          style={{
            color: 'white', textAlign: 'center',
            maxWidth: '700px', margin: '40px auto 0', lineHeight: 1.75,
          }}
        >
          {typewriterText}
          {typewriterText.length < TYPEWRITER_TEXT.length && (
            <span style={{ borderRight: '2px solid white', animation: 'caretBlink 0.7s infinite', marginLeft: '1px' }} />
          )}
        </p>
      </div>
    </div>
  )
}

/* ── Main component ── */
export default function InteractiveGlobe() {
  const containerRef = useRef<HTMLDivElement>(null)
  const [overlayOpen, setOverlayOpen] = useState(false)
  const [closing,     setClosing]     = useState(false)
  const [typewriterText, setTypewriterText] = useState('')

  const openOverlay = useCallback(() => { setOverlayOpen(true) }, [])

  const closeOverlay = useCallback(() => {
    setClosing(true)
    setTimeout(() => {
      setOverlayOpen(false)
      setClosing(false)
      setTypewriterText('')
    }, 300)
  }, [])

  /* Three.js setup */
  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    let animId: number
    let disposed = false
    const geos: { dispose(): void }[] = []
    const mats: { dispose(): void }[] = []
    let renderer: { domElement: HTMLCanvasElement; dispose(): void; setSize(w:number,h:number):void } | null = null
    let innerCleanup: (() => void) | undefined

    async function init() {
      const THREE = await import('three')
      if (disposed) return
      const { OrbitControls } = await import('three/examples/jsm/controls/OrbitControls.js')
      if (disposed || !container) return

      const w = container.clientWidth
      const h = container.clientHeight

      /* Scene */
      const scene    = new THREE.Scene()
      const camera   = new THREE.PerspectiveCamera(45, w / h, 0.1, 1000)
      camera.position.z = 5.5

      /* Renderer */
      const rend = new THREE.WebGLRenderer({ antialias: true, alpha: true })
      rend.setClearColor(0x000000, 0)
      rend.setSize(w, h)
      rend.setPixelRatio(Math.min(window.devicePixelRatio, 2))
      container.appendChild(rend.domElement)
      rend.domElement.style.cursor = 'grab'
      renderer = rend

      /* Globe group */
      const globe = new THREE.Group()
      globe.rotation.y = Math.PI / 2   // start with Europe/Africa facing camera
      scene.add(globe)

      /* Wireframe sphere */
      const sGeo = new THREE.SphereGeometry(2, 64, 64)
      const sMat = new THREE.MeshBasicMaterial({ color: 0x1a1a2e, wireframe: true, transparent: true, opacity: 0.3 })
      globe.add(new THREE.Mesh(sGeo, sMat))
      geos.push(sGeo); mats.push(sMat)

      /* Lights */
      scene.add(new THREE.AmbientLight(0xffffff, 0.6))
      const dLight = new THREE.DirectionalLight(0xffffff, 0.6)
      dLight.position.set(5, 5, 5)
      scene.add(dLight)

      /* Continent lines – fetched async */
      const lineMat = new THREE.LineBasicMaterial({ color: 0x0A1128 })
      mats.push(lineMat)

      fetch('https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/geojson/ne_110m_land.json')
        .then(r => r.json())
        .then((data: { features: { geometry: { type: string; coordinates: unknown } }[] }) => {
          if (disposed) return
          const R = 2.02

          const addRing = (coords: number[][]) => {
            const pts: THREE.Vector3[] = []
            for (let i = 0; i < coords.length; i++) {
              if (i > 0 && Math.abs(coords[i][0] - coords[i - 1][0]) > 180) {
                if (pts.length > 1) {
                  const g = new THREE.BufferGeometry().setFromPoints(pts)
                  geos.push(g); globe.add(new THREE.Line(g, lineMat))
                }
                pts.length = 0
              }
              const lat = coords[i][1] * (Math.PI / 180)
              const lon = coords[i][0] * (Math.PI / 180)
              pts.push(new THREE.Vector3(
                R * Math.cos(lat) * Math.cos(lon),
                R * Math.sin(lat),
                R * Math.cos(lat) * Math.sin(lon),
              ))
            }
            if (pts.length > 1) {
              const g = new THREE.BufferGeometry().setFromPoints(pts)
              geos.push(g); globe.add(new THREE.Line(g, lineMat))
            }
          }

          data.features.forEach(f => {
            const { type, coordinates } = f.geometry as { type: string; coordinates: number[][][] | number[][][][] }
            if (type === 'Polygon') {
              (coordinates as number[][][]).forEach(addRing)
            } else if (type === 'MultiPolygon') {
              (coordinates as number[][][][]).forEach(p => p.forEach(addRing))
            }
          })
        })
        .catch(() => {})

      /* OrbitControls */
      const controls = new OrbitControls(camera, rend.domElement)
      controls.enableZoom = false
      controls.enablePan  = false
      controls.autoRotate = false

      let interacting = false
      let resumeTimer: ReturnType<typeof setTimeout>

      controls.addEventListener('start', () => {
        interacting = true
        clearTimeout(resumeTimer)
        rend.domElement.style.cursor = 'grabbing'
      })
      controls.addEventListener('end', () => {
        rend.domElement.style.cursor = 'grab'
        resumeTimer = setTimeout(() => { interacting = false }, 2000)
      })

      /* Click vs drag detection */
      let pdX = 0, pdY = 0
      rend.domElement.addEventListener('pointerdown', (e: PointerEvent) => { pdX = e.clientX; pdY = e.clientY })
      rend.domElement.addEventListener('pointerup', (e: PointerEvent) => {
        const d = Math.sqrt((e.clientX - pdX) ** 2 + (e.clientY - pdY) ** 2)
        if (d < 5) openOverlay()
      })

      /* Resize */
      const onResize = () => {
        if (disposed || !container) return
        const nw = container.clientWidth, nh = container.clientHeight
        camera.aspect = nw / nh
        camera.updateProjectionMatrix()
        rend.setSize(nw, nh)
      }
      window.addEventListener('resize', onResize)

      /* Animate */
      const tick = () => {
        if (disposed) return
        animId = requestAnimationFrame(tick)
        if (!interacting) globe.rotation.y += 0.003
        controls.update()
        rend.render(scene, camera)
      }
      tick()

      innerCleanup = () => {
        clearTimeout(resumeTimer)
        window.removeEventListener('resize', onResize)
      }
    }

    init().catch(() => {})

    return () => {
      disposed = true
      cancelAnimationFrame(animId)
      innerCleanup?.()
      geos.forEach(g => g.dispose())
      mats.forEach(m => m.dispose())
      if (renderer) {
        renderer.dispose()
        if (renderer.domElement.parentNode === container) {
          container.removeChild(renderer.domElement)
        }
      }
    }
  }, [openOverlay])

  /* Typewriter */
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
    }, 500)
    return () => { clearTimeout(t); clearInterval(iv) }
  }, [overlayOpen])

  /* Escape key */
  useEffect(() => {
    if (!overlayOpen) return
    const fn = (e: KeyboardEvent) => { if (e.key === 'Escape') closeOverlay() }
    window.addEventListener('keydown', fn)
    return () => window.removeEventListener('keydown', fn)
  }, [overlayOpen, closeOverlay])

  return (
    <>
      <div ref={containerRef} className="globe-container" style={{ width: '100%' }} />
      {overlayOpen && (
        <GlobeOverlay onClose={closeOverlay} typewriterText={typewriterText} closing={closing} />
      )}
    </>
  )
}
