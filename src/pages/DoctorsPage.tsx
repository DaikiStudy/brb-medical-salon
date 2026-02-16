import { useScrollReveal } from '../hooks/useScrollReveal'
import './DoctorsPage.css'

interface Props { onNavigate: (page: string) => void }

const DOCTORS = [
  {
    name: '村井 勝',
    title: '公益財団法人前立腺研究財団名誉顧問',
    affiliation: '慶應義塾大学名誉教授',
    workplace: 'サウスタワークリニック院長',
    image: 'https://www.brb.co.jp/Portals/0/images/top/doc_murai.jpg',
    desc: '泌尿器科の権威として日本の医療を牽引。慶應義塾大学名誉教授を務め、公益財団法人前立腺研究財団にて名誉顧問として活躍。現在はサウスタワークリニック院長として、会員様の健康を直接サポートしています。',
  },
  {
    name: '岩田 誠',
    title: '東京女子医科大学名誉教授',
    affiliation: '東京女子医科大学名誉教授',
    workplace: 'サウスタワークリニック勤務',
    image: 'https://www.brb.co.jp/Portals/0/images/top/iwatadr.png',
    desc: '神経内科の第一人者。東京女子医科大学にて長年にわたり教鞭を執り、神経疾患の研究・治療において多大な功績を残す。現在はサウスタワークリニックにて診療を行っています。',
  },
  {
    name: '河瀬 斌',
    title: '世界脳神経外科連盟名誉会長',
    affiliation: '慶應義塾大学名誉教授',
    workplace: 'サウスタワークリニック勤務',
    image: 'https://www.brb.co.jp/Portals/0/images/top/doc_02.png',
    desc: '脳神経外科の世界的権威。世界脳神経外科連盟にて名誉会長を務め、国際的な医療の発展に貢献。慶應義塾大学名誉教授としても後進の育成に尽力しています。',
  },
  {
    name: '佐野 武',
    title: '公益財団法人がん研究会有明病院病院長',
    affiliation: '代表理事・常務理事',
    workplace: 'サウスタワークリニック勤務',
    image: 'https://www.brb.co.jp/Portals/0/images/top/doc_07.png',
    desc: '消化器外科の権威。がん研究会有明病院の病院長として、がん治療の最前線をリード。代表理事・常務理事として医療機関の運営にも手腕を発揮しています。',
  },
  {
    name: '高木 誠',
    title: '東京都済生会中央病院名誉院長',
    affiliation: '社会福祉法人済生会支部東京都済生会会長',
    workplace: 'サウスタワークリニック勤務',
    image: 'https://www.brb.co.jp/Portals/0/images/top/takagidr.png',
    desc: '脳神経内科の専門家。東京都済生会中央病院の名誉院長として長年にわたり地域医療に貢献。現在も済生会会長として医療の質の向上に取り組んでいます。',
  },
  {
    name: '野村 和弘',
    title: '国立がん研究センター中央病院名誉院長',
    affiliation: '東京労災病院名誉院長',
    workplace: 'サウスタワークリニック勤務',
    image: 'https://www.brb.co.jp/Portals/0/images/top/doc_03.png',
    desc: 'がん治療の分野で日本を代表する医師。国立がん研究センター中央病院の名誉院長を務め、がんの早期発見・治療において数多くの実績を持ちます。',
  },
]

export default function DoctorsPage({ onNavigate }: Props) {
  const ref = useScrollReveal<HTMLDivElement>()

  return (
    <div className="doctors-page" ref={ref}>
      <div className="doctors-page__inner">
        <p className="doctors-page__breadcrumb">
          <button className="doctors-page__breadcrumb-link" onClick={() => onNavigate('home')}>ホーム</button>
          {' > 顧問Dr.'}
        </p>
        <div className="reveal">
          <p className="section-label">Doctors</p>
          <h1 className="section-title">顧問Dr. 名鑑</h1>
          <p className="section-subtitle">各専門分野の第一人者が、あなたの健康をサポートいたします</p>
          <div className="divider" />
        </div>
        <div className="doctors-page__grid">
          {DOCTORS.map((d, i) => (
            <div key={i} className={`doctors-page__card glass-card reveal reveal-delay-${(i % 3) + 1}`}>
              <div className="doctors-page__photo-wrap">
                <img
                  src={d.image}
                  alt={`${d.name} 先生`}
                  className="doctors-page__photo"
                  loading="lazy"
                />
              </div>
              <div className="doctors-page__info">
                <h2 className="doctors-page__name">{d.name}<span className="doctors-page__honorific">先生</span></h2>
                <span className="doctors-page__title-tag">{d.title}</span>
                <p className="doctors-page__affiliation">{d.affiliation}</p>
                <p className="doctors-page__workplace">{d.workplace}</p>
                <p className="doctors-page__desc">{d.desc}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="doctors-page__cta reveal">
          <button className="btn btn-primary" onClick={() => onNavigate('contact')}>お問い合わせはこちら</button>
        </div>
      </div>
    </div>
  )
}