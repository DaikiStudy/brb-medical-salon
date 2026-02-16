import { useScrollReveal } from '../hooks/useScrollReveal'
import './PlanPage.css'

interface Props { onNavigate: (page: string) => void }

const ROWS = [
  { label: '精密健診', vals: ['年1回', '年2回', '年4回'] },
  { label: '電話健康相談', vals: ['平日のみ', '24時間365日', '24時間365日'] },
  { label: '医療機関紹介', vals: ['○', '○', '○'] },
  { label: '専属看護師', vals: ['○', '○', '○'] },
  { label: '個別カウンセリング', vals: ['-', '年2回', '無制限'] },
  { label: '海外サポート', vals: ['-', '-', '○'] },
  { label: '訪問看護紹介', vals: ['-', '-', '○'] },
]

export default function PlanPage({ onNavigate }: Props) {
  const ref = useScrollReveal<HTMLDivElement>()

  const renderCell = (val: string) => {
    if (val === '○') return <span className="plan-page__check">&#10003;</span>
    if (val === '-') return <span className="plan-page__dash">&#8212;</span>
    return val
  }

  return (
    <div className="plan-page" ref={ref}>
      <div className="plan-page__inner">
        <p className="plan-page__breadcrumb">
          <button className="plan-page__breadcrumb-link" onClick={() => onNavigate('home')}>ホーム</button>
          {' > プラン・料金'}
        </p>
        <div className="reveal">
          <p className="section-label">Plan &amp; Price</p>
          <h1 className="section-title">プラン・料金</h1>
          <p className="section-subtitle">ライフスタイルに合わせた3つのプランをご用意</p>
          <div className="divider" />
        </div>
        <div className="plan-page__table-wrap reveal">
          <table className="plan-page__table">
            <thead>
              <tr>
                <th>機能</th>
                <th>スタンダード</th>
                <th className="plan-page__col-featured">プレミアム</th>
                <th>エグゼクティブ</th>
              </tr>
            </thead>
            <tbody>
              {ROWS.map((row, i) => (
                <tr key={i}>
                  <td>{row.label}</td>
                  {row.vals.map((v, j) => (
                    <td key={j} className={j === 1 ? 'plan-page__col-featured' : ''}>
                      {renderCell(v)}
                    </td>
                  ))}
                </tr>
              ))}
              <tr>
                <td>料金</td>
                <td>お問い合わせください</td>
                <td className="plan-page__col-featured" style={{ color: 'var(--color-accent-gold)', fontWeight: 600 }}>お問い合わせください</td>
                <td>お問い合わせください</td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="plan-page__cta reveal">
          <button className="btn btn-primary" onClick={() => onNavigate('contact')}>お問い合わせはこちら</button>
        </div>
      </div>
    </div>
  )
}