import { useScrollReveal } from '../hooks/useScrollReveal'
import './ServicePage.css'

interface Props { onNavigate: (page: string) => void }

const SERVICES = [
  { num: '01', title: '個別カウンセリング', desc: '医学界の権威である顧問Dr.が、会員様一人ひとりの健康状態を把握し、最適な治療方針や予防策をご提案いたします。プライバシーに配慮した完全個室でのカウンセリングを行い、セカンドオピニオンとしてもご活用いただけます。' },
  { num: '02', title: '専属担当看護師制', desc: '経験豊富な看護師がお一人おひとりに専属で担当いたします。日々の健康管理から検査結果の説明、医療機関との連絡調整まで、きめ細やかなサポートを提供します。' },
  { num: '03', title: '精密健診提案', desc: '全国200以上の提携医療機関の中から、最新のMRI・CT・PET-CTなどの医療機器を備えた施設をご紹介。会員様の健康状態に応じた最適な検査プランをご提案します。' },
  { num: '04', title: '個別健診プログラム作成', desc: '年齢・性別・既往歴・生活習慣などを総合的に分析し、会員様だけのオーダーメイド健診プログラムを作成。一般の人間ドックでは網羅できない検査項目もカバーします。' },
  { num: '05', title: '医療機関・医師紹介', desc: '症状や疾患に応じて、各専門分野のトップドクターと医療機関をご紹介。予約手配から紹介状の作成まで、すべてをサポートいたします。' },
  { num: '06', title: '24時間電話健康相談', desc: '24時間365日、経験豊富な医療スタッフが電話でのご相談に対応。急な体調不良や健康に関する不安にも、迅速にお応えいたします。' },
  { num: '07', title: '訪問看護・介護紹介', desc: 'ご自宅での看護が必要になった場合の訪問看護サービスや、シニアレジデンス・介護施設の情報提供など、幅広くサポートいたします。' },
  { num: '08', title: '海外在住者向けサポート', desc: '海外にお住まいの会員様にも、一時帰国時の健診手配や現地での医療相談など、グローバルな健康管理体制をご提供します。' },
]

export default function ServicePage({ onNavigate }: Props) {
  const ref = useScrollReveal<HTMLDivElement>()

  return (
    <div className="service-page" ref={ref}>
      <div className="service-page__inner">
        <p className="service-page__breadcrumb">
          <button className="service-page__breadcrumb-link" onClick={() => onNavigate('home')}>ホーム</button>
          {' > サービス'}
        </p>
        <div className="reveal">
          <p className="section-label">Services</p>
          <h1 className="section-title">サービス内容</h1>
          <p className="section-subtitle">会員様に最適な健診・治療・医療機関をご案内できる幅広いネットワーク</p>
          <div className="divider" />
        </div>
        <div className="service-page__list">
          {SERVICES.map((s, i) => (
            <div key={i} className={`service-page__item glass-card reveal reveal-delay-${(i % 3) + 1}`}>
              <span className="service-page__num">{s.num}</span>
              <div className="service-page__body">
                <h2 className="service-page__title">{s.title}</h2>
                <p className="service-page__desc">{s.desc}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="service-page__cta reveal">
          <button className="btn btn-primary" onClick={() => onNavigate('contact')}>
            お問い合わせはこちら
          </button>
        </div>
      </div>
    </div>
  )
}