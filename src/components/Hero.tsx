import { useState, useEffect, useRef, useCallback } from 'react'
import './Hero.css'

interface HeroProps {
  onNavigate: (page: string) => void
}

const NAV_ITEMS = [
  {
    id: 'about',
    title: 'BRBメディカルサロンとは',
    description: '会員制医療クラブの特徴と理念',
    icon: '🏛️',
    color: '#003B7F', // Keio Navy Blue
    angle: 0,
    scrollTo: 'about',
  },
  {
    id: 'service',
    title: 'サービス内容',
    description: '経営者様向けの専門医療サービス',
    icon: '💼',
    color: '#C41E3A', // Keio Red
    angle: 60,
    page: 'service',
  },
  {
    id: 'doctors',
    title: '顧問Dr.',
    description: '各分野の専門医師陣のご紹介',
    icon: '👨‍⚕️',
    color: '#FFC72C', // Keio Yellow/Gold
    angle: 120,
    page: 'doctors',
  },
  {
    id: 'facilities',
    title: '提携健診施設',
    description: '全国200箇所以上の医療ネットワーク',
    icon: '🏥',
    color: '#0055A4', // Lighter Keio Blue
    angle: 180,
    page: 'facilities',
  },
  {
    id: 'plan',
    title: 'プラン・料金',
    description: '会員プランと料金体系のご案内',
    icon: '💳',
    color: '#E63946', // Lighter Keio Red
    angle: 240,
    page: 'plan',
  },
  {
    id: 'contact',
    title: 'お問い合わせ',
    description: '資料請求・ご相談はこちら',
    icon: '📧',
    color: '#FFD700', // Brighter Gold
    angle: 300,
    page: 'contact',
  },
]

export default function Hero({ onNavigate }: HeroProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animRef = useRef<number>(0)
  const timeRef = useRef<number>(0)

  // Enhanced particle and wave animation
  const initAnimation = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reducedMotion) return

    let w = canvas.width = canvas.offsetWidth
    let h = canvas.height = canvas.offsetHeight

    // Particles with blue-red color scheme
    const particles: { x: number; y: number; r: number; vx: number; vy: number; o: number; hue: number }[] = []
    const count = Math.min(100, Math.floor((w * h) / 10000))
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * w,
        y: Math.random() * h,
        r: Math.random() * 3 + 1,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        o: Math.random() * 0.5 + 0.3,
        hue: Math.random() > 0.66 ? 215 : (Math.random() > 0.5 ? 350 : 45), // Keio Blue, Red, or Gold hues
      })
    }

    const draw = () => {
      timeRef.current += 0.01

      // Keio tri-color gradient background waves
      const gradient = ctx.createLinearGradient(0, 0, w, h)
      // Navy Blue -> Red -> Gold gradient
      gradient.addColorStop(0, `rgba(0, 59, 127, ${0.3 + Math.sin(timeRef.current) * 0.1})`)
      gradient.addColorStop(0.5, `rgba(196, 30, 58, ${0.35 + Math.cos(timeRef.current * 0.7) * 0.1})`)
      gradient.addColorStop(1, `rgba(255, 199, 44, ${0.2 + Math.sin(timeRef.current * 0.5) * 0.08})`)

      ctx.fillStyle = gradient
      ctx.fillRect(0, 0, w, h)

      // Draw wave patterns
      ctx.save()
      for (let wave = 0; wave < 3; wave++) {
        ctx.beginPath()
        const offset = timeRef.current + wave * Math.PI / 3
        for (let x = 0; x <= w; x += 10) {
          const y = h / 2 + Math.sin(x * 0.01 + offset) * (30 + wave * 20) + Math.cos(x * 0.005 + offset * 0.5) * 20
          if (x === 0) ctx.moveTo(x, y)
          else ctx.lineTo(x, y)
        }
        const waveHue = wave === 0 ? 215 : (wave === 1 ? 350 : 45) // Blue, Red, Gold
        ctx.strokeStyle = `hsla(${waveHue}, 70%, 60%, ${0.12 - wave * 0.02})`
        ctx.lineWidth = 2
        ctx.stroke()
      }
      ctx.restore()

      // Draw particles
      particles.forEach(p => {
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `hsla(${p.hue}, 80%, 70%, ${p.o})`
        ctx.shadowBlur = 10
        ctx.shadowColor = `hsla(${p.hue}, 80%, 70%, 0.5)`
        ctx.fill()
        ctx.shadowBlur = 0

        p.x += p.vx
        p.y += p.vy
        if (p.x < 0 || p.x > w) p.vx *= -1
        if (p.y < 0 || p.y > h) p.vy *= -1
      })

      // Draw connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 200) {
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            const avgHue = (particles[i].hue + particles[j].hue) / 2
            ctx.strokeStyle = `hsla(${avgHue}, 80%, 70%, ${0.15 * (1 - dist / 200)})`
            ctx.lineWidth = 1.5
            ctx.stroke()
          }
        }
      }

      animRef.current = requestAnimationFrame(draw)
    }

    const handleResize = () => { w = canvas.width = canvas.offsetWidth; h = canvas.height = canvas.offsetHeight }
    window.addEventListener('resize', handleResize)
    draw()

    return () => {
      cancelAnimationFrame(animRef.current)
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  useEffect(() => {
    const cleanup = initAnimation()
    return () => cleanup?.()
  }, [initAnimation])

  const handleNavClick = (item: typeof NAV_ITEMS[0]) => {
    if (item.page) {
      onNavigate(item.page)
    } else if (item.scrollTo) {
      const element = document.getElementById(item.scrollTo)
      element?.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section className="hero" aria-label="メインビジュアル">
      <canvas ref={canvasRef} className="hero__canvas" aria-hidden="true" />
      <div className="hero__content">
        <div className="hero__header">
          <h1 className="hero__title">BRBメディカルサロン</h1>
          <p className="hero__subtitle">経営者のための会員制医療クラブ</p>
          <p className="hero__tagline">あなたの健康を、最高峰の医療チームが見守ります</p>
        </div>

        <nav className="hero__nav-network" aria-label="サイトナビゲーション">
          {/* Central Hub */}
          <div className="hero__hub">
            <div className="hero__hub-pulse" />
            <div className="hero__hub-ring" />
            <div className="hero__hub-icon">
              <div className="brb-logo">
                <span className="brb-logo-text">BRB</span>
                <div className="brb-logo-underline"></div>
              </div>
            </div>
          </div>

          {/* Connection Lines */}
          <svg className="hero__connections" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet" aria-hidden="true">
            {NAV_ITEMS.map((item) => {
              const angleRad = (item.angle * Math.PI) / 180
              const radius = 45 // percentage
              const x2 = 50 + Math.cos(angleRad) * radius
              const y2 = 50 + Math.sin(angleRad) * radius
              return (
                <line
                  key={`line-${item.id}`}
                  className={`hero__connection-line ${hoveredId === item.id ? 'active' : ''}`}
                  x1="50"
                  y1="50"
                  x2={x2}
                  y2={y2}
                  style={{ '--item-color': item.color } as React.CSSProperties}
                />
              )
            })}
          </svg>

          {/* Navigation Nodes */}
          <div className="hero__nodes">
            {NAV_ITEMS.map((item, i) => (
              <button
                key={item.id}
                className="hero__node"
                onClick={() => handleNavClick(item)}
                onMouseEnter={() => setHoveredId(item.id)}
                onMouseLeave={() => setHoveredId(null)}
                data-angle={item.angle}
                style={{
                  '--item-color': item.color,
                  '--angle': `${item.angle}deg`,
                  animationDelay: `${i * 0.15}s`,
                } as React.CSSProperties}
              >
                <div className="hero__node-pulse" />
                <div className="hero__node-glow" />
                <div className="hero__node-icon">{item.icon}</div>
                <div className="hero__node-content">
                  <h3 className="hero__node-title">{item.title}</h3>
                  <p className="hero__node-desc">{item.description}</p>
                </div>
              </button>
            ))}
          </div>
        </nav>
      </div>
      <div className="hero__scroll-hint" aria-hidden="true">
        <span>Scroll</span>
        <div className="hero__scroll-chevron" />
      </div>
    </section>
  )
}