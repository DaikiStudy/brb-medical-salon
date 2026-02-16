import { useScrollReveal } from '../hooks/useScrollReveal'
import './FacilitiesPage.css'

interface Props { onNavigate: (page: string) => void }

const FACILITIES = [
  {
    name: '慶應義塾大学予防医療センター',
    location: '東京都港区麻布台1-3-1 麻布台ヒルズ森JPタワー5F',
    access: '六本木一丁目駅 徒歩7分 / 神谷町駅 徒歩7分',
    tags: ['予防医療', '慶應医学部連携', '最先端設備', '完全予約制'],
    desc: '慶應義塾大学医学部と連携した予防医療の最前線。麻布台ヒルズ内のラグジュアリーな空間で、最新の医療機器を用いた精密な健康診断を実施しています。会員様専用の時間枠をご用意し、プライバシーに配慮した健診体験をお約束します。',
    url: 'https://www.cpms.keio.ac.jp/',
  },
  {
    name: '国立がん研究センター中央病院 健診センター',
    location: '東京都中央区築地5-1-1',
    access: '築地市場駅 徒歩3分 / 東銀座駅 徒歩5分',
    tags: ['がん検診', '国立研究機関', '高精度画像診断', '専門医常駐'],
    desc: '日本のがん研究・治療の中核を担う国立機関。がんの早期発見に特化した高精度な検査体制を整え、最新のPET-CT・MRIなどの画像診断技術を駆使。がん専門医による的確な診断で、早期発見・早期治療を実現します。',
    url: 'https://www.ncc.go.jp/jp/ncch/',
  },
  {
    name: 'がん研究会有明病院 健診センター',
    location: '東京都江東区有明3-8-31',
    access: '有明駅 徒歩2分 / 国際展示場駅 徒歩4分',
    tags: ['がん専門病院', 'PET-CT', '総合健診', 'セカンドオピニオン'],
    desc: 'がん治療実績で日本トップクラスの専門病院。豊富な症例データに基づく精密な健康診断を提供。がん研究の最新知見を活かした検査プログラムで、リスクの早期把握と予防をサポートします。',
    url: 'https://www.jfcr.or.jp/hospital/',
  },
  {
    name: '東京済生会中央病院 総合健診センター',
    location: '東京都港区三田1-4-17',
    access: '赤羽橋駅 徒歩3分 / 芝公園駅 徒歩10分',
    tags: ['総合健診', '人間ドック', '生活習慣病', 'レディースドック'],
    desc: '地域医療の中核として長い歴史を持つ総合病院の健診センター。人間ドックから専門的な精密検査まで幅広く対応。生活習慣病の予防と管理に力を入れ、一人ひとりの健康状態に合わせたきめ細かな健診を実施しています。',
    url: 'https://www.saichu.jp/',
  },
  {
    name: '虎の門病院 健康管理センター',
    location: '東京都港区赤坂1-8-1 赤坂インターシティAIR 5F',
    access: '国会議事堂前駅 直結 / 溜池山王駅 徒歩3分',
    tags: ['健康管理', '経営者向け', '駅直結', 'VIP対応'],
    desc: '政財界の要人も利用する歴史ある総合病院の健康管理センター。赤坂インターシティAIR内の上質な空間で、経営者・エグゼクティブに適した包括的な健康管理プログラムを提供しています。',
    url: 'https://toranomon.kkr.or.jp/',
  },
]

export default function FacilitiesPage({ onNavigate }: Props) {
  const ref = useScrollReveal<HTMLDivElement>()

  return (
    <div className="facilities-page" ref={ref}>
      <div className="facilities-page__inner">
        <p className="facilities-page__breadcrumb">
          <button className="facilities-page__breadcrumb-link" onClick={() => onNavigate('home')}>ホーム</button>
          {' > 提携健診施設'}
        </p>
        <div className="reveal">
          <p className="section-label">Facilities</p>
          <h1 className="section-title">提携健診施設</h1>
          <p className="section-subtitle">国内有数の医療機関と提携し、最先端の精密健診をお受けいただけます</p>
          <div className="divider" />
        </div>
        <div className="facilities-page__list">
          {FACILITIES.map((f, i) => (
            <div key={i} className={`facilities-page__card glass-card reveal reveal-delay-${(i % 3) + 1}`}>
              <h2 className="facilities-page__name">{f.name}</h2>
              <span className="facilities-page__location">{f.location}</span>
              <p className="facilities-page__access">{f.access}</p>
              <div className="facilities-page__tags">
                {f.tags.map((t, j) => <span key={j} className="facilities-page__tag">{t}</span>)}
              </div>
              <p className="facilities-page__desc">{f.desc}</p>
              <a
                href={f.url}
                target="_blank"
                rel="noopener noreferrer"
                className="facilities-page__external btn btn-outline"
              >
                公式サイトを見る &#8599;
              </a>
            </div>
          ))}
        </div>
        <div className="facilities-page__cta reveal">
          <button className="btn btn-primary" onClick={() => onNavigate('contact')}>お問い合わせはこちら</button>
        </div>
      </div>
    </div>
  )
}