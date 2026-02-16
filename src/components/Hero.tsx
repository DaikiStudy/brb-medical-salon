import { useEffect, useRef, useCallback } from 'react'
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
    color: 'rgba(201, 168, 76, 0.15)',
    scrollTo: 'about',
  },
  {
    id: 'service',
    title: 'サービス内容',
    description: '経営者様向けの専門医療サービス',
    icon: '💼',
    color: 'rgba(100, 150, 220, 0.15)',
    page: 'service',
  },
  {
    id: 'doctors',
    title: '顧問Dr.',
    description: '各分野の専門医師陣のご紹介',
    icon: '👨‍⚕️',
    color: 'rgba(76, 175, 80, 0.15)',
    page: 'doctors',
  },
  {
    id: 'facilities',
    title: '提携健診施設',
    description: '全国200箇所以上の医療ネットワーク',
    icon: '🏥',
    color: 'rgba(255, 152, 0, 0.15)',
    page: 'facilities',
  },
  {
    id: 'plan',
    title: 'プラン・料金',
    description: '会員プランと料金体系のご案内',
    icon: '💳',
    color: 'rgba(156, 39, 176, 0.15)',
    page: 'plan',
  },
  {
    id: 'contact',
    title: 'お問い合わせ',
    description: '資料請求・ご相談はこちら',
    icon: '📧',
    color: 'rgba(244, 67, 54, 0.15)',
    page: 'contact',
  },
]

export default function Hero({ onNavigate }: HeroProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animRef = useRef<number>(0)

  // Particle animation
  const initParticles = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reducedMotion) return

    let w = canvas.width = canvas.offsetWidth
    let h = canvas.height = canvas.offsetHeight

    const particles: { x: number; y: number; r: number; vx: number; vy: number; o: number }[] = []
    const count = Math.min(80, Math.floor((w * h) / 12000))
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * w, y: Math.random() * h,
        r: Math.random() * 2.5 + 0.5,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        o: Math.random() * 0.6 + 0.2,
      })
    }

    const draw = () => {
      ctx.clearRect(0, 0, w, h)
      particles.forEach(p => {
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(201, 168, 76, ${p.o})`
        ctx.fill()
        p.x += p.vx; p.y += p.vy
        if (p.x < 0 || p.x > w) p.vx *= -1
        if (p.y < 0 || p.y > h) p.vy *= -1
      })
      // Draw connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 180) {
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.strokeStyle = `rgba(201, 168, 76, ${0.1 * (1 - dist / 180)})`
            ctx.lineWidth = 1
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
    const cleanup = initParticles()
    return () => cleanup?.()
  }, [initParticles])

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
      <div className="hero__overlay" />
      <div className="hero__content">
        <div className="hero__header">
          <h1 className="hero__title">BRBメディカルサロン</h1>
          <p className="hero__subtitle">経営者のための会員制医療クラブ</p>
          <p className="hero__tagline">あなたの健康を、最高峰の医療チームが見守ります</p>
        </div>

        <nav className="hero__nav" aria-label="サイトナビゲーション">
          <div className="hero__nav-grid">
            {NAV_ITEMS.map((item, i) => (
              <button
                key={item.id}
                className="hero__nav-card"
                onClick={() => handleNavClick(item)}
                style={{
                  animationDelay: `${i * 0.1}s`,
                  '--card-color': item.color,
                } as React.CSSProperties}
              >
                <div className="hero__nav-card-glow" />
                <div className="hero__nav-card-icon">{item.icon}</div>
                <h3 className="hero__nav-card-title">{item.title}</h3>
                <p className="hero__nav-card-desc">{item.description}</p>
                <div className="hero__nav-card-arrow">→</div>
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