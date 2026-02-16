import { useScrollReveal } from '../hooks/useScrollReveal'
import './FacilitiesSection.css'

interface Props { onNavigate: (page: string) => void }

const FACILITIES = [
  {
    name: '慶應義塾大学予防医療センター',
    location: '東京都港区麻布台',
    desc: '麻布台ヒルズ内に位置する最先端の予防医療施設。慶應義塾大学医学部と連携した質の高い健診を提供。',
    url: 'https://www.cpms.keio.ac.jp/',
  },
  {
    name: '国立がん研究センター中央病院',
    location: '東京都中央区築地',
    desc: '日本のがん研究・治療の中核施設。がん検診・早期発見に特化した高精度な検査体制。',
    url: 'https://www.ncc.go.jp/jp/ncch/',
  },
  {
    name: 'がん研究会有明病院',
    location: '東京都江東区有明',
    desc: 'がん専門の総合病院。最新の画像診断技術と専門医による精密な健康診断を実施。',
    url: 'https://www.jfcr.or.jp/hospital/',
  },
]

export default function FacilitiesSection({ onNavigate }: Props) {
  const ref = useScrollReveal<HTMLElement>()

  return (
    <section className="facilities section" ref={ref} id="facilities">
      <div className="facilities__inner">
        <div className="reveal">
          <p className="section-label">Facilities</p>
          <h2 className="section-title">提携健診施設</h2>
          <p className="section-subtitle">国内有数の医療機関と提携し、最先端の精密健診をご提供</p>
          <div className="divider" />
        </div>
        <div className="facilities__grid">
          {FACILITIES.map((f, i) => (
            <div key={i} className={`facilities__card glass-card reveal reveal-delay-${i + 1}`}>
              <h3 className="facilities__card-name">{f.name}</h3>
              <span className="facilities__card-location">{f.location}</span>
              <p className="facilities__card-desc">{f.desc}</p>
              <div className="facilities__card-actions">
                <button className="facilities__card-link" onClick={() => onNavigate('facilities')}>
                  詳しく見る &#8594;
                </button>
                <a
                  href={f.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="facilities__card-external"
                >
                  公式サイト &#8599;
                </a>
              </div>
            </div>
          ))}
        </div>
        <div className="facilities__cta reveal">
          <button className="btn btn-outline" onClick={() => onNavigate('facilities')}>
            施設一覧を見る
          </button>
        </div>
      </div>
    </section>
  )
}