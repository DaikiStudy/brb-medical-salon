import { useScrollReveal } from '../hooks/useScrollReveal'
import './NewsSection.css'

const NEWS = [
  { date: '2025.02.01', category: 'お知らせ', title: '春の健康診断キャンペーンのご案内' },
  { date: '2025.01.15', category: 'セミナー', title: '第12回 健康経営セミナー開催のお知らせ' },
  { date: '2025.01.05', category: 'メディア', title: '日経新聞にBRBメディカルサロンが紹介されました' },
]

export default function NewsSection() {
  const ref = useScrollReveal<HTMLElement>()

  return (
    <section className="news section" ref={ref} id="news">
      <div className="news__inner">
        <div className="reveal">
          <p className="section-label">News</p>
          <h2 className="section-title">お知らせ</h2>
          <div className="divider" />
        </div>
        <div className="news__list">
          {NEWS.map((n, i) => (
            <div key={i} className={`news__item glass-card reveal reveal-delay-${i + 1}`}>
              <span className="news__date">{n.date}</span>
              <span className="news__category">{n.category}</span>
              <span className="news__title">{n.title}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}