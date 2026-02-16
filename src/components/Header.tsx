import { useState, useEffect } from 'react'
import './Header.css'

type Page = 'home' | 'service' | 'doctors' | 'facilities' | 'plan' | 'about' | 'contact'
type FontSize = 'small' | 'medium' | 'large'

interface HeaderProps {
  currentPage: Page
  onNavigate: (page: string) => void
  fontSize: FontSize
  contrast: string
  onFontSizeChange: (size: FontSize) => void
  onContrastToggle: () => void
}

const NAV_ITEMS: { page: Page; label: string }[] = [
  { page: 'home', label: 'ホーム' },
  { page: 'service', label: 'サービス' },
  { page: 'doctors', label: '顧問Dr.' },
  { page: 'facilities', label: '健診施設' },
  { page: 'plan', label: 'プラン・料金' },
  { page: 'about', label: '会社概要' },
]

export default function Header({
  currentPage, onNavigate, fontSize, contrast,
  onFontSizeChange, onContrastToggle,
}: HeaderProps) {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleNav = (page: string) => {
    onNavigate(page)
    setMenuOpen(false)
  }

  return (
    <header className={`header ${scrolled ? 'header--scrolled' : ''}`} role="banner">
      <div className="header__inner">
        <div className="header__logo" onClick={() => handleNav('home')} role="button" tabIndex={0}
          onKeyDown={e => e.key === 'Enter' && handleNav('home')}>
          BRB
          <span className="header__logo-sub">メディカルサロン</span>
        </div>

        <div className="header__phone">
          <span>&#9742;</span>
          <div>
            <a href="tel:0120123011">0120-123-011</a>
            <div className="header__phone-hours">平日 9:00〜17:30</div>
          </div>
        </div>

        <nav className="header__nav" aria-label="メインナビゲーション">
          {NAV_ITEMS.map(item => (
            <button key={item.page}
              className={`header__nav-link ${currentPage === item.page ? 'header__nav-link--active' : ''}`}
              onClick={() => handleNav(item.page)}>
              {item.label}
            </button>
          ))}
        </nav>

        <div className="header__a11y" role="toolbar" aria-label="表示設定">
          {(['small', 'medium', 'large'] as FontSize[]).map(size => (
            <button key={size}
              className={`header__a11y-btn ${fontSize === size ? 'header__a11y-btn--active' : ''}`}
              onClick={() => onFontSizeChange(size)}
              aria-label={`文字サイズ${size === 'small' ? '小' : size === 'medium' ? '中' : '大'}`}>
              {size === 'small' ? '小' : size === 'medium' ? '中' : '大'}
            </button>
          ))}
          <button
            className={`header__a11y-btn ${contrast === 'high' ? 'header__a11y-btn--active' : ''}`}
            onClick={onContrastToggle}
            aria-label="高コントラスト切替">
            高対比
          </button>
        </div>

        <button className="header__cta" onClick={() => handleNav('contact')}>
          資料請求
        </button>

        <button
          className={`header__hamburger ${menuOpen ? 'header__hamburger--open' : ''}`}
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="メニュー" aria-expanded={menuOpen}>
          <span className="header__hamburger-line" />
          <span className="header__hamburger-line" />
          <span className="header__hamburger-line" />
        </button>
      </div>

      <div className={`header__mobile-menu ${menuOpen ? 'header__mobile-menu--open' : ''}`}>
        {NAV_ITEMS.map(item => (
          <button key={item.page}
            className={`header__mobile-nav-link ${currentPage === item.page ? 'header__mobile-nav-link--active' : ''}`}
            onClick={() => handleNav(item.page)}>
            {item.label}
          </button>
        ))}
        <button className="header__mobile-nav-link" onClick={() => handleNav('contact')}>
          お問い合わせ
        </button>
        <div className="header__mobile-a11y">
          <div className="header__mobile-a11y-label">文字サイズ</div>
          <div className="header__mobile-a11y-row">
            {(['small', 'medium', 'large'] as FontSize[]).map(size => (
              <button key={size}
                className={`header__a11y-btn ${fontSize === size ? 'header__a11y-btn--active' : ''}`}
                onClick={() => onFontSizeChange(size)}>
                {size === 'small' ? '小' : size === 'medium' ? '中' : '大'}
              </button>
            ))}
          </div>
          <button
            className={`header__a11y-btn ${contrast === 'high' ? 'header__a11y-btn--active' : ''}`}
            onClick={onContrastToggle}>
            高コントラストモード {contrast === 'high' ? 'ON' : 'OFF'}
          </button>
        </div>
      </div>
    </header>
  )
}