import { useScrollReveal } from '../hooks/useScrollReveal'
import './ServicesSection.css'

interface Props { onNavigate: (page: string) => void }

const SERVICES = [
  { num: '01', title: '個別カウンセリング', desc: '医学界の権威による専門的な医療相談。顧問Dr.が最適な治療方針をご提案します。' },
  { num: '02', title: '専属担当看護師制', desc: 'お一人おひとりに専属の看護師が付き、継続的な健康管理をサポートいたします。' },
  { num: '03', title: '精密健診提案', desc: '提携施設の最新医療機器を活用した精密な健康診断プログラムをご提案します。' },
  { num: '04', title: '個別健診プログラム作成', desc: 'お客様の健康状態やご要望に合わせた、オーダーメイドの健診プログラムを作成します。' },
  { num: '05', title: '医療機関・医師紹介', desc: '症状や疾患に応じて、最適な医療機関と専門医をご紹介いたします。' },
  { num: '06', title: '24時間電話健康相談', desc: '24時間365日体制で、健康に関するご相談を承ります。' },
  { num: '07', title: '訪問看護・介護紹介', desc: '訪問看護やシニアレジデンスなど、介護に関する情報もご提供します。' },
  { num: '08', title: '海外在住者向けサポート', desc: '海外にお住まいの方にも、継続的な健康管理体制をご提供します。' },
]

export default function ServicesSection({ onNavigate }: Props) {
  const ref = useScrollReveal<HTMLElement>()

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
            <div key={i} className={`services__card glass-card reveal reveal-delay-${(i % 4) + 1}`}
              onClick={() => onNavigate('service')} role="button" tabIndex={0}
              onKeyDown={e => e.key === 'Enter' && onNavigate('service')}>
              <span className="services__num">{s.num}</span>
              <div className="services__card-body">
                <h3 className="services__card-title">{s.title}</h3>
                <p className="services__card-desc">{s.desc}</p>
              </div>
              <span className="services__arrow" aria-hidden="true">&#8594;</span>
            </div>
          ))}
        </div>
        <div className="services__cta reveal">
          <button className="btn btn-primary" onClick={() => onNavigate('service')}>
            サービス詳細を見る
          </button>
        </div>
      </div>
    </section>
  )
}