import { useState, useEffect, useRef, useCallback } from 'react'
import './Hero.css'

interface HeroProps {
  onNavigate: (page: string) => void
}

const SLIDES = [
  { title: '経営者のための\n会員制医療クラブ', subtitle: 'あなたの健康を、最高峰の医療チームが見守ります' },
  { title: '医学界の権威による\n個別カウンセリング', subtitle: '最適な健診・治療プランをご提案' },
  { title: '24時間365日の\n健康サポート', subtitle: 'いつでも安心のトータルヘルスケア' },
]

export default function Hero({ onNavigate }: HeroProps) {
  const [current, setCurrent] = useState(0)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const animRef = useRef<number>(0)

  // Auto-rotate slides
  useEffect(() => {
    const timer = setInterval(() => setCurrent(c => (c + 1) % SLIDES.length), 5000)
    return () => clearInterval(timer)
  }, [])

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
    const count = Math.min(60, Math.floor((w * h) / 15000))
    for (let i = 0; i < count; i++) {
      particles.push({
        x: Math.random() * w, y: Math.random() * h,
        r: Math.random() * 2 + 0.5,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        o: Math.random() * 0.5 + 0.2,
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
          if (dist < 150) {
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.strokeStyle = `rgba(201, 168, 76, ${0.08 * (1 - dist / 150)})`
            ctx.lineWidth = 0.5
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

  return (
    <section className="hero" aria-label="メインビジュアル">
      <canvas ref={canvasRef} className="hero__canvas" aria-hidden="true" />
      <div className="hero__overlay" />
      <div className="hero__content">
        <div style={{ position: 'relative', minHeight: 200 }}>
          {SLIDES.map((slide, i) => (
            <div key={i} className={`hero__slide ${i === current ? 'hero__slide--active' : ''}`}
              aria-hidden={i !== current}>
              <h1 className="hero__title">{slide.title.split('\n').map((line, j) => (
                <span key={j}>{line}{j === 0 && <br />}</span>
              ))}</h1>
              <p className="hero__subtitle">{slide.subtitle}</p>
            </div>
          ))}
        </div>
        <div className="hero__actions">
          <button className="btn btn-primary" onClick={() => onNavigate('service')}>
            サービスを見る
          </button>
          <button className="btn btn-outline" onClick={() => onNavigate('contact')}>
            資料請求
          </button>
        </div>
        <div className="hero__dots" role="tablist" aria-label="スライド切替">
          {SLIDES.map((_, i) => (
            <button key={i} className={`hero__dot ${i === current ? 'hero__dot--active' : ''}`}
              onClick={() => setCurrent(i)}
              role="tab" aria-selected={i === current} aria-label={`スライド${i + 1}`} />
          ))}
        </div>
      </div>
      <div className="hero__scroll-hint" aria-hidden="true">
        <span>Scroll</span>
        <div className="hero__scroll-chevron" />
      </div>
    </section>
  )
}