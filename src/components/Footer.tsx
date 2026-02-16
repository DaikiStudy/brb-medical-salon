import './Footer.css'

interface FooterProps {
  onNavigate: (page: string) => void
}

const NAV_ITEMS = [
  { page: 'home', label: 'ホーム' },
  { page: 'service', label: 'サービス' },
  { page: 'doctors', label: '顧問Dr.' },
  { page: 'facilities', label: '健診施設' },
  { page: 'plan', label: 'プラン・料金' },
  { page: 'about', label: '会社概要' },
  { page: 'contact', label: 'お問い合わせ' },
]

export default function Footer({ onNavigate }: FooterProps) {
  return (
    <footer className="footer" role="contentinfo">
      <div className="footer__inner">
        <div className="footer__brand">
          <div className="footer__brand-logo">BRB</div>
          <div className="footer__brand-name">メディカルサロン</div>
          <div className="footer__info-item">
            <span className="footer__info-label">本社</span><br />
            東京都新宿区西新宿2-2-1
          </div>
          <div className="footer__info-item">
            <span className="footer__info-label">クラブハウス</span><br />
            東京都中央区銀座7-13-8
          </div>
          <div className="footer__info-item">
            <span className="footer__info-label">TEL</span>{' '}
            <a href="tel:0120123011" style={{ color: 'var(--color-accent-gold)' }}>0120-123-011</a>
          </div>
        </div>

        <div>
          <h3 className="footer__heading">メニュー</h3>
          {NAV_ITEMS.map(item => (
            <button key={item.page} className="footer__link" onClick={() => onNavigate(item.page)}>
              {item.label}
            </button>
          ))}
        </div>

        <div>
          <h3 className="footer__heading">インフォメーション</h3>
          <span className="footer__link">プライバシーポリシー</span>
          <span className="footer__link">サイト利用について</span>
          <span className="footer__link">サイトマップ</span>
        </div>

        <div>
          <h3 className="footer__heading">SNS</h3>
          <div className="footer__social">
            <a href="#" className="footer__social-link" aria-label="Facebook">Fb</a>
            <a href="#" className="footer__social-link" aria-label="LINE">Li</a>
          </div>
        </div>
      </div>

      <div className="footer__bottom">
        <p className="footer__copyright">&copy; 2025 BRB CORPORATION. All Rights Reserved.</p>
        <button className="footer__top-btn"
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          aria-label="ページトップへ戻る">
          &#9650;
        </button>
      </div>
    </footer>
  )
}