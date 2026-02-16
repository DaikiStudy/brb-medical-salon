import { useState } from 'react'
import { useScrollReveal } from '../hooks/useScrollReveal'
import './ServicesSection.css'

interface Props { onNavigate: (page: string) => void }

const SERVICES = [
  {
    num: '01',
    title: '個別カウンセリング',
    desc: '医学界の権威による専門的な医療相談。顧問Dr.が最適な治療方針をご提案します。',
    detailedDesc: '医学界の権威である顧問Dr.が、会員様一人ひとりの健康状態を把握し、最適な治療方針や予防策をご提案いたします。プライバシーに配慮した完全個室でのカウンセリングを行い、セカンドオピニオンとしてもご活用いただけます。',
  },
  {
    num: '02',
    title: '専属担当看護師制',
    desc: 'お一人おひとりに専属の看護師が付き、継続的な健康管理をサポートいたします。',
    detailedDesc: '経験豊富な看護師がお一人おひとりに専属で担当いたします。日々の健康管理から検査結果の説明、医療機関との連絡調整まで、きめ細やかなサポートを提供します。',
  },
  {
    num: '03',
    title: '精密健診提案',
    desc: '提携施設の最新医療機器を活用した精密な健康診断プログラムをご提案します。',
    detailedDesc: '全国200以上の提携医療機関の中から、最新のMRI・CT・PET-CTなどの医療機器を備えた施設をご紹介。会員様の健康状態に応じた最適な検査プランをご提案します。',
  },
  {
    num: '04',
    title: '個別健診プログラム作成',
    desc: 'お客様の健康状態やご要望に合わせた、オーダーメイドの健診プログラムを作成します。',
    detailedDesc: '年齢・性別・既往歴・生活習慣などを総合的に分析し、会員様だけのオーダーメイド健診プログラムを作成。一般の人間ドックでは網羅できない検査項目もカバーします。',
  },
  {
    num: '05',
    title: '医療機関・医師紹介',
    desc: '症状や疾患に応じて、最適な医療機関と専門医をご紹介いたします。',
    detailedDesc: '症状や疾患に応じて、各専門分野のトップドクターと医療機関をご紹介。予約手配から紹介状の作成まで、すべてをサポートいたします。',
  },
  {
    num: '06',
    title: '24時間電話健康相談',
    desc: '24時間365日体制で、健康に関するご相談を承ります。',
    detailedDesc: '24時間365日、経験豊富な医療スタッフが電話でのご相談に対応。急な体調不良や健康に関する不安にも、迅速にお応えいたします。',
  },
  {
    num: '07',
    title: '訪問看護・介護紹介',
    desc: '訪問看護やシニアレジデンスなど、介護に関する情報もご提供します。',
    detailedDesc: 'ご自宅での看護が必要になった場合の訪問看護サービスや、シニアレジデンス・介護施設の情報提供など、幅広くサポートいたします。',
  },
  {
    num: '08',
    title: '海外在住者向けサポート',
    desc: '海外にお住まいの方にも、継続的な健康管理体制をご提供します。',
    detailedDesc: '海外にお住まいの会員様にも、一時帰国時の健診手配や現地での医療相談など、グローバルな健康管理体制をご提供します。',
  },
]

export default function ServicesSection({ onNavigate }: Props) {
  const ref = useScrollReveal<HTMLElement>()
  const [selectedService, setSelectedService] = useState<typeof SERVICES[0] | null>(null)

  const handleCardClick = (service: typeof SERVICES[0], e: React.MouseEvent) => {
    e.stopPropagation()
    setSelectedService(service)
  }

  const closeModal = () => {
    setSelectedService(null)
  }

  return (
    <section className="services section" ref={ref} id="services">
      <div className="services__inner">
        <div className="reveal">
          <p className="section-label">Services</p>
          <h2 className="section-title">サービス内容</h2>
          <p className="section-subtitle">
            会員様に最適な健診・治療・医療機関をご案内できる幅広いネットワーク
          </p>
          <div className="divider" />
        </div>
        <div className="services__grid">
          {SERVICES.map((s, i) => (
            <div
              key={i}
              className={`services__card glass-card reveal reveal-delay-${(i % 4) + 1}`}
              onClick={(e) => handleCardClick(s, e)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && handleCardClick(s, e as any)}
            >
              <span className="services__num">{s.num}</span>
              <div className="services__card-body">
                <h3 className="services__card-title">{s.title}</h3>
                <p className="services__card-desc">{s.desc}</p>
              </div>
              <span className="services__arrow" aria-hidden="true">
                &#8594;
              </span>
            </div>
          ))}
        </div>
        <div className="services__cta reveal">
          <button className="btn btn-primary" onClick={() => onNavigate('service')}>
            サービス詳細を見る（全て）
          </button>
        </div>
      </div>

      {/* Modal */}
      {selectedService && (
        <div className="services-modal" onClick={closeModal}>
          <div className="services-modal__overlay" />
          <div className="services-modal__content" onClick={(e) => e.stopPropagation()}>
            <button className="services-modal__close" onClick={closeModal} aria-label="閉じる">
              ✕
            </button>
            <div className="services-modal__header">
              <span className="services-modal__num">{selectedService.num}</span>
              <h2 className="services-modal__title">{selectedService.title}</h2>
            </div>
            <div className="services-modal__body">
              <p className="services-modal__description">{selectedService.detailedDesc}</p>
            </div>
            <div className="services-modal__footer">
              <button className="btn btn-outline" onClick={closeModal}>
                閉じる
              </button>
              <button className="btn btn-primary" onClick={() => { closeModal(); onNavigate('service'); }}>
                全サービスを見る
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
