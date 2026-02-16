import { useScrollReveal } from '../hooks/useScrollReveal'
import './DoctorsSection.css'

interface Props { onNavigate: (page: string) => void }

const DOCTORS = [
  {
    name: '村井 勝',
    title: '公益財団法人前立腺研究財団名誉顧問',
    affiliation: '慶應義塾大学名誉教授 / サウスタワークリニック院長',
    image: 'https://www.brb.co.jp/Portals/0/images/top/doc_murai.jpg',
  },
  {
    name: '岩田 誠',
    title: '東京女子医科大学名誉教授',
    affiliation: 'サウスタワークリニック勤務',
    image: 'https://www.brb.co.jp/Portals/0/images/top/iwatadr.png',
  },
  {
    name: '河瀬 斌',
    title: '世界脳神経外科連盟名誉会長',
    affiliation: '慶應義塾大学名誉教授 / サウスタワークリニック勤務',
    image: 'https://www.brb.co.jp/Portals/0/images/top/doc_02.png',
  },
  {
    name: '佐野 武',
    title: '公益財団法人がん研究会有明病院病院長',
    affiliation: '代表理事・常務理事 / サウスタワークリニック勤務',
    image: 'https://www.brb.co.jp/Portals/0/images/top/doc_07.png',
  },
  {
    name: '高木 誠',
    title: '東京都済生会中央病院名誉院長',
    affiliation: '社会福祉法人済生会支部東京都済生会会長 / サウスタワークリニック勤務',
    image: 'https://www.brb.co.jp/Portals/0/images/top/takagidr.png',
  },
  {
    name: '野村 和弘',
    title: '国立がん研究センター中央病院名誉院長',
    affiliation: '東京労災病院名誉院長 / サウスタワークリニック勤務',
    image: 'https://www.brb.co.jp/Portals/0/images/top/doc_03.png',
  },
]

export default function DoctorsSection({ onNavigate }: Props) {
  const ref = useScrollReveal<HTMLElement>()

  return (
    <section className="doctors section" ref={ref} id="doctors">
      <div className="doctors__inner">
        <div className="reveal">
          <p className="section-label">Doctors</p>
          <h2 className="section-title">顧問Dr.</h2>
          <p className="section-subtitle">各専門分野の第一人者が、あなたの健康をサポート</p>
          <div className="divider" />
        </div>
        <div className="doctors__scroll reveal">
          {DOCTORS.map((d, i) => (
            <div key={i} className="doctors__card glass-card">
              <div className="doctors__photo-wrap">
                <img
                  src={d.image}
                  alt={`${d.name} 先生`}
                  className="doctors__photo"
                  loading="lazy"
                />
                <div className="doctors__photo-border" />
              </div>
              <h3 className="doctors__name">{d.name}<span className="doctors__honorific">先生</span></h3>
              <span className="doctors__title">{d.title}</span>
              <p className="doctors__affiliation">{d.affiliation}</p>
            </div>
          ))}
        </div>
        <div className="doctors__cta reveal">
          <button className="btn btn-outline" onClick={() => onNavigate('doctors')}>
            顧問Dr.一覧を見る
          </button>
        </div>
      </div>
    </section>
  )
}