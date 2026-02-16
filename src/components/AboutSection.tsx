import { useScrollReveal } from '../hooks/useScrollReveal'
import './AboutSection.css'

const FEATURES = [
  {
    title: '信頼の医療ネットワーク',
    subtitle: '全国の有名大学病院・専門施設と提携',
    mainStat: '200',
    statUnit: '箇所以上',
    statDescription: '提携医療機関数',
    icon: '🏥',
    description: '大学病院や専門施設など、確かな診断力を誇る国内有数の健診施設と提携。慶應義塾大学、国立がんセンターなど、最新の医療機器による精密な検査を受けられます。',
    features: [
      '大学病院や国立病院と連携',
      '全国主要都市に提携施設',
      '最新鋭の医療機器完備',
      '専門医による精密検査',
    ],
  },
  {
    title: '専属担当看護師制度',
    subtitle: 'お一人に一人の看護師が担当',
    mainStat: '担当制',
    statUnit: '',
    statDescription: '専属看護師がサポート',
    icon: '🩺',
    description: '経験豊富な看護師が会員様お一人おひとりを専属で担当。状況に応じた適切なアドバイスやフォローアップ、再検査の予約手配などをサポートいたします。',
    features: [
      '専属看護師が常に対応',
      '健康状態を継続管理',
      '再検査の予約手配',
      '気軽に相談できる関係',
    ],
  },
  {
    title: '24時間365日対応',
    subtitle: 'いつでもどこでも安心サポート',
    mainStat: '年中',
    statUnit: '無休',
    statDescription: '24時間いつでも対応',
    icon: '📞',
    description: '24時間電話健康相談を365日の相談体制で承っております。夜間・休日・海外滞在中も、いつでも健康相談が可能。緊急時には医療機関の手配も迅速に対応いたします。',
    features: [
      '24時間電話相談受付',
      '夜間・休日も対応',
      '緊急時の病院手配',
      '海外からも相談可能',
    ],
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
          最良の予防医療と健康リスクの解決法をご提案する会員制医療クラブです。<br />
          個別カウンセリングや精密な人間ドックを通じて会員様お一人おひとりの徹底したデータ管理を行い、<br />
          会員様に最適な健診・治療・医療機関をご案内できる幅広いネットワークを構築しています。
        </p>
        <div className="about__grid">
          {FEATURES.map((f, i) => (
            <div key={i} className={`about__feature-card reveal reveal-delay-${i + 2}`}>
              <div className="about__feature-gradient" />

              <div className="about__feature-icon-large">{f.icon}</div>

              <div className="about__feature-stat-box">
                <div className="about__feature-stat-main">
                  <span className="about__feature-stat-number">{f.mainStat}</span>
                  {f.statUnit && <span className="about__feature-stat-unit">{f.statUnit}</span>}
                </div>
                <p className="about__feature-stat-description">{f.statDescription}</p>
              </div>

              <h3 className="about__feature-title">{f.title}</h3>
              <p className="about__feature-subtitle">{f.subtitle}</p>
              <p className="about__feature-description">{f.description}</p>

              <ul className="about__feature-list">
                {f.features.map((feature, j) => (
                  <li key={j} className="about__feature-item">
                    <span className="about__feature-bullet">●</span>
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
