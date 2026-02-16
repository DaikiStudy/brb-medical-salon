import { useScrollReveal } from '../hooks/useScrollReveal'
import './AboutSection.css'

const FEATURES = [
  { icon: '🛡️', title: '信頼の医療ネットワーク', text: '全国200以上の提携医療機関' },
  { icon: '👤', title: '専属担当看護師制', text: '一人ひとりに寄り添うケア' },
  { icon: '🕐', title: '24時間365日対応', text: 'いつでも安心のサポート体制' },
]

export default function AboutSection() {
  const ref = useScrollReveal<HTMLElement>()

  return (
    <section className="about section" ref={ref} id="about">
      <div className="about__inner">
        <div className="reveal">
          <p className="section-label">About Us</p>
          <h2 className="section-title">BRBメディカルサロンとは</h2>
          <div className="divider" />
        </div>
        <p className="about__desc reveal reveal-delay-1">
          BRBメディカルサロンは、経営者・エグゼクティブの皆様のための会員制医療クラブです。
          医学界の権威である顧問Dr.による個別カウンセリング、最新の医療機器による精密健診、
          24時間健康相談など、最高水準の医療サービスをご提供いたします。
        </p>
        <div className="about__grid">
          {FEATURES.map((f, i) => (
            <div key={i} className={`about__card glass-card reveal reveal-delay-${i + 1}`}>
              <div className="about__icon" aria-hidden="true">{f.icon}</div>
              <h3 className="about__card-title">{f.title}</h3>
              <p className="about__card-text">{f.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}