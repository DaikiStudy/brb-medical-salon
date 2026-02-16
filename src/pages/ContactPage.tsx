import { useState } from 'react'
import { useScrollReveal } from '../hooks/useScrollReveal'
import './ContactPage.css'

interface Props { onNavigate: (page: string) => void }

export default function ContactPage({ onNavigate }: Props) {
  const ref = useScrollReveal<HTMLDivElement>()
  const [form, setForm] = useState({ name: '', furigana: '', email: '', phone: '', type: '資料請求', message: '' })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    alert('お問い合わせありがとうございます。担当者より折り返しご連絡いたします。')
    setForm({ name: '', furigana: '', email: '', phone: '', type: '資料請求', message: '' })
  }

  return (
    <div className="contact-page" ref={ref}>
      <div className="contact-page__inner">
        <p className="contact-page__breadcrumb">
          <button className="contact-page__breadcrumb-link" onClick={() => onNavigate('home')}>ホーム</button>
          {' > お問い合わせ'}
        </p>
        <div className="reveal">
          <p className="section-label">Contact</p>
          <h1 className="section-title">資料請求・お問い合わせ</h1>
          <p className="section-subtitle">お気軽にお問い合わせください。専門スタッフが丁寧にご案内いたします。</p>
          <div className="divider" />
        </div>

        <div className="contact-page__grid">
          <form className="contact-page__form glass-card reveal" onSubmit={handleSubmit}>
            <div className="contact-page__field">
              <label className="contact-page__label">お名前<span className="contact-page__required">必須</span></label>
              <input className="contact-page__input" type="text" name="name" value={form.name} onChange={handleChange} required placeholder="山田 太郎" />
            </div>
            <div className="contact-page__field">
              <label className="contact-page__label">フリガナ</label>
              <input className="contact-page__input" type="text" name="furigana" value={form.furigana} onChange={handleChange} placeholder="ヤマダ タロウ" />
            </div>
            <div className="contact-page__field">
              <label className="contact-page__label">メールアドレス<span className="contact-page__required">必須</span></label>
              <input className="contact-page__input" type="email" name="email" value={form.email} onChange={handleChange} required placeholder="info@example.com" />
            </div>
            <div className="contact-page__field">
              <label className="contact-page__label">電話番号</label>
              <input className="contact-page__input" type="tel" name="phone" value={form.phone} onChange={handleChange} placeholder="090-1234-5678" />
            </div>
            <div className="contact-page__field">
              <label className="contact-page__label">お問い合わせ種別</label>
              <select className="contact-page__select" name="type" value={form.type} onChange={handleChange}>
                <option>資料請求</option>
                <option>サービスについて</option>
                <option>プランについて</option>
                <option>その他</option>
              </select>
            </div>
            <div className="contact-page__field">
              <label className="contact-page__label">お問い合わせ内容</label>
              <textarea className="contact-page__textarea" name="message" value={form.message} onChange={handleChange} placeholder="お問い合わせ内容をご記入ください" />
            </div>
            <button type="submit" className="btn btn-primary contact-page__submit">送信する</button>
          </form>

          <div className="contact-page__sidebar glass-card reveal reveal-delay-1">
            <h2 className="contact-page__sidebar-title">お電話でのお問い合わせ</h2>
            <div className="contact-page__sidebar-phone">
              <a href="tel:0120123011">0120-123-011</a>
            </div>
            <p style={{ fontSize: 'var(--fs-sm)', color: 'var(--color-text-muted)' }}>平日 9:00〜17:30</p>
            <div className="contact-page__sidebar-info">
              <span className="contact-page__sidebar-label">メール</span>
              info@brb.co.jp
              <span className="contact-page__sidebar-label">所在地</span>
              東京都中央区銀座7-13-8<br />BRBクラブハウス
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}