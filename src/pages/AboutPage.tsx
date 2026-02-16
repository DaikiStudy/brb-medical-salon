import { useScrollReveal } from '../hooks/useScrollReveal'
import './AboutPage.css'

interface Props { onNavigate: (page: string) => void }

const COMPANY_INFO = [
  { label: '会社名', value: '株式会社BRB' },
  { label: '設立', value: '2005年' },
  { label: '本社所在地', value: '東京都新宿区西新宿2-2-1' },
  { label: 'クラブハウス', value: '東京都中央区銀座7-13-8' },
  { label: '事業内容', value: '会員制医療クラブの運営、健康管理コンサルティング' },
  { label: 'TEL', value: '0120-123-011' },
]

export default function AboutPage({ onNavigate }: Props) {
  const ref = useScrollReveal<HTMLDivElement>()

  return (
    <div className="about-page" ref={ref}>
      <div className="about-page__inner">
        <p className="about-page__breadcrumb">
          <button className="about-page__breadcrumb-link" onClick={() => onNavigate('home')}>ホーム</button>
          {' > 会社概要'}
        </p>
        <div className="reveal">
          <p className="section-label">About</p>
          <h1 className="section-title">会社概要</h1>
          <div className="divider" />
        </div>

        <div className="about-page__card glass-card reveal">
          <table className="about-page__table">
            <tbody>
              {COMPANY_INFO.map((row, i) => (
                <tr key={i}>
                  <th>{row.label}</th>
                  <td>{row.label === 'TEL' ? <a href="tel:0120123011" style={{ color: 'var(--color-accent-gold)' }}>{row.value}</a> : row.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="about-page__mission glass-card reveal">
          <h2 className="about-page__mission-title">私たちの使命</h2>
          <p className="about-page__mission-text">
            私たちは、日本の医療をもっと身近に、もっと安心できるものにするために、
            最高水準の医療サービスを提供し続けます。経営者の皆様が健康で充実した日々を送れるよう、
            全力でサポートいたします。
          </p>
        </div>
      </div>
    </div>
  )
}