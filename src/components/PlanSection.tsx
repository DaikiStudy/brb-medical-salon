import { useScrollReveal } from '../hooks/useScrollReveal'
import './PlanSection.css'

interface Props { onNavigate: (page: string) => void }

const PLANS = [
  {
    name: 'スタンダード', desc: '年1回の精密健診と基本的な健康相談', featured: false,
    features: ['年1回精密健診', '電話健康相談', '医療機関紹介', '専属看護師'],
  },
  {
    name: 'プレミアム', desc: '充実した健康管理と優先サポート', featured: true,
    features: ['年2回精密健診', '24時間電話相談', '医療機関・医師紹介', '専属看護師', '個別カウンセリング年2回'],
  },
  {
    name: 'エグゼクティブ', desc: '最高水準のトータルヘルスケア', featured: false,
    features: ['年4回精密健診', '24時間電話相談', '医療機関・医師紹介', '専属看護師', '個別カウンセリング無制限', '海外サポート', '訪問看護紹介'],
  },
]

export default function PlanSection({ onNavigate }: Props) {
  const ref = useScrollReveal<HTMLElement>()

  return (
    <section className="plan section" ref={ref} id="plan">
      <div className="plan__inner">
        <div className="reveal">
          <p className="section-label">Plan &amp; Price</p>
          <h2 className="section-title">プラン・料金</h2>
          <p className="section-subtitle">あなたのニーズに合わせた最適なプランをお選びください</p>
          <div className="divider" />
        </div>
        <div className="plan__grid">
          {PLANS.map((p, i) => (
            <div key={i} className={`plan__card glass-card reveal reveal-delay-${i + 1} ${p.featured ? 'plan__card--featured' : ''}`}>
              {p.featured && <span className="plan__badge">おすすめ</span>}
              <h3 className="plan__name">{p.name}</h3>
              <p className="plan__desc">{p.desc}</p>
              <div className="plan__features">
                {p.features.map((f, j) => (
                  <div key={j} className="plan__feature">
                    <span className="plan__check">&#10003;</span> {f}
                  </div>
                ))}
              </div>
              <p className="plan__price">お問い合わせください</p>
              <button className={`btn ${p.featured ? 'btn-primary' : 'btn-outline'}`}
                onClick={() => onNavigate('contact')}>
                詳しく見る
              </button>
            </div>
          ))}
        </div>
        <div className="plan__cta reveal">
          <button className="btn btn-outline" onClick={() => onNavigate('plan')}>
            詳しいプランを見る
          </button>
        </div>
      </div>
    </section>
  )
}