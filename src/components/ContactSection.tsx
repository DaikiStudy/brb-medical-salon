import { useScrollReveal } from '../hooks/useScrollReveal'
import './ContactSection.css'

interface Props { onNavigate: (page: string) => void }

export default function ContactSection({ onNavigate }: Props) {
  const ref = useScrollReveal<HTMLElement>()

  return (
    <section className="contact-section section" ref={ref} id="contact-cta">
      <div className="contact-section__inner">
        <h2 className="contact-section__heading reveal">
          まずはお気軽にご相談ください
        </h2>
        <p className="contact-section__text reveal reveal-delay-1">
          資料請求・お問い合わせは無料です。専門スタッフが丁寧にご案内いたします。
        </p>
        <div className="contact-section__phone reveal reveal-delay-2">
          <a href="tel:0120123011">0120-123-011</a>
        </div>
        <p className="contact-section__hours reveal reveal-delay-2">平日 9:00〜17:30</p>
        <div className="contact-section__actions reveal reveal-delay-3">
          <button className="btn btn-primary" onClick={() => onNavigate('contact')}>
            資料請求・お問い合わせ
          </button>
          <a href="tel:0120123011" className="btn btn-outline">
            お電話はこちら
          </a>
        </div>
      </div>
    </section>
  )
}