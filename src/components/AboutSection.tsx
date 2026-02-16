import { useScrollReveal } from '../hooks/useScrollReveal'
import './AboutSection.css'

const FEATURES = [
  {
    number: '01',
    icon: (
      <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="32" cy="32" r="28" stroke="url(#grad1)" strokeWidth="2" />
        <path d="M32 12 L32 52 M12 32 L52 32" stroke="url(#grad1)" strokeWidth="3" strokeLinecap="round" />
        <circle cx="32" cy="32" r="6" fill="url(#grad1)" />
        <defs>
          <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#C9A84C" />
            <stop offset="100%" stopColor="#E8D299" />
          </linearGradient>
        </defs>
      </svg>
    ),
    title: '信頼の医療ネットワーク',
    subtitle: 'Trusted Medical Network',
    description: '国内トップクラスの医療機関と提携',
    features: [
      '慶應義塾大学など国内有数の大学病院',
      '国立がんセンター等の専門施設',
      '全国200ヶ所以上の提携医療機関',
      '最新医療機器による精密検査',
    ],
    stat: '200+',
    statLabel: '提携施設',
  },
  {
    number: '02',
    icon: (
      <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="32" cy="22" r="10" stroke="url(#grad2)" strokeWidth="2" />
        <path d="M16 52 Q16 36 32 36 Q48 36 48 52" stroke="url(#grad2)" strokeWidth="2" strokeLinecap="round" />
        <path d="M26 26 L28 28 L32 24" stroke="url(#grad2)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <defs>
          <linearGradient id="grad2" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#C9A84C" />
            <stop offset="100%" stopColor="#E8D299" />
          </linearGradient>
        </defs>
      </svg>
    ),
    title: '専属担当看護師制',
    subtitle: 'Dedicated Nurse System',
    description: 'お一人おひとりに専任看護師が担当',
    features: [
      '経験豊富な看護師が専属でサポート',
      '健康状態の継続的な管理とフォロー',
      '医師との橋渡し役として安心',
      'きめ細かな健康アドバイス',
    ],
    stat: '1:1',
    statLabel: '専属制',
  },
  {
    number: '03',
    icon: (
      <svg viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="32" cy="32" r="28" stroke="url(#grad3)" strokeWidth="2" />
        <circle cx="32" cy="32" r="4" fill="url(#grad3)" />
        <path d="M32 12 L32 20" stroke="url(#grad3)" strokeWidth="2" strokeLinecap="round" />
        <path d="M32 44 L32 52" stroke="url(#grad3)" strokeWidth="2" strokeLinecap="round" />
        <path d="M52 32 L44 32" stroke="url(#grad3)" strokeWidth="2" strokeLinecap="round" />
        <path d="M20 32 L12 32" stroke="url(#grad3)" strokeWidth="2" strokeLinecap="round" />
        <defs>
          <linearGradient id="grad3" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#C9A84C" />
            <stop offset="100%" stopColor="#E8D299" />
          </linearGradient>
        </defs>
      </svg>
    ),
    title: '24時間365日対応',
    subtitle: '24/7 Support',
    description: 'いつでもどこでも安心のサポート',
    features: [
      '24時間健康相談ホットライン',
      '緊急時の医療機関手配',
      '夜間・休日も専門スタッフ対応',
      '海外滞在中もサポート可能',
    ],
    stat: '24/7',
    statLabel: '年中無休',
  },
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
          BRBメディカルサロンは、経営者・エグゼクティブの皆様のための会員制医療クラブです。<br />
          医学界の権威である顧問Dr.による個別カウンセリング、最新の医療機器による精密健診、
          24時間健康相談など、最高水準の医療サービスをご提供いたします。
        </p>
        <div className="about__grid">
          {FEATURES.map((f, i) => (
            <div key={i} className={`about__feature-card reveal reveal-delay-${i + 2}`}>
              <div className="about__feature-gradient" />
              <div className="about__feature-number">{f.number}</div>
              <div className="about__feature-icon">{f.icon}</div>
              <div className="about__feature-stat">
                <span className="about__feature-stat-number">{f.stat}</span>
                <span className="about__feature-stat-label">{f.statLabel}</span>
              </div>
              <h3 className="about__feature-title">{f.title}</h3>
              <p className="about__feature-subtitle">{f.subtitle}</p>
              <p className="about__feature-description">{f.description}</p>
              <ul className="about__feature-list">
                {f.features.map((feature, j) => (
                  <li key={j} className="about__feature-item">
                    <span className="about__feature-check">✓</span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
