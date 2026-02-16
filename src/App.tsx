import { useState, useCallback, useEffect, lazy, Suspense } from 'react'
import Header from './components/Header'
import Footer from './components/Footer'
import Hero from './components/Hero'
import AboutSection from './components/AboutSection'
import ServicesSection from './components/ServicesSection'
import DoctorsSection from './components/DoctorsSection'
import FacilitiesSection from './components/FacilitiesSection'
import PlanSection from './components/PlanSection'
import NewsSection from './components/NewsSection'
import ContactSection from './components/ContactSection'
import { useAccessibility } from './hooks/useAccessibility'
import { useScrollProgress } from './hooks/useScrollProgress'

const ServicePage = lazy(() => import('./pages/ServicePage'))
const DoctorsPage = lazy(() => import('./pages/DoctorsPage'))
const FacilitiesPage = lazy(() => import('./pages/FacilitiesPage'))
const PlanPage = lazy(() => import('./pages/PlanPage'))
const AboutPage = lazy(() => import('./pages/AboutPage'))
const ContactPage = lazy(() => import('./pages/ContactPage'))

type Page = 'home' | 'service' | 'doctors' | 'facilities' | 'plan' | 'about' | 'contact'

function Loading() {
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '60vh',
      color: 'var(--color-accent-gold)',
      fontSize: 'var(--fs-xl)',
      fontWeight: 'var(--fw-semibold)',
    }}>
      <div className="loading-spinner">
        <span style={{ opacity: 0.7 }}>読み込み中...</span>
      </div>
    </div>
  )
}

function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home')
  const { fontSize, contrast, setFontSize, toggleContrast } = useAccessibility()
  const scrollProgress = useScrollProgress()

  const handleNavigate = useCallback((page: string) => {
    setCurrentPage(page as Page)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [])

  // Browser back/forward support
  useEffect(() => {
    const handlePopState = (e: PopStateEvent) => {
      if (e.state?.page) {
        setCurrentPage(e.state.page)
      } else {
        setCurrentPage('home')
      }
    }
    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])

  useEffect(() => {
    window.history.pushState({ page: currentPage }, '', `#${currentPage === 'home' ? '' : currentPage}`)
  }, [currentPage])

  // Update page title
  useEffect(() => {
    const titles: Record<Page, string> = {
      home: 'BRBメディカルサロン | 経営者のための会員制医療クラブ',
      service: 'サービス内容 | BRBメディカルサロン',
      doctors: '顧問Dr. | BRBメディカルサロン',
      facilities: '提携健診施設 | BRBメディカルサロン',
      plan: 'プラン・料金 | BRBメディカルサロン',
      about: '会社概要 | BRBメディカルサロン',
      contact: 'お問い合わせ | BRBメディカルサロン',
    }
    document.title = titles[currentPage]
  }, [currentPage])

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return (
          <>
            <Hero onNavigate={handleNavigate} />
            <AboutSection />
            <ServicesSection onNavigate={handleNavigate} />
            <DoctorsSection onNavigate={handleNavigate} />
            <FacilitiesSection onNavigate={handleNavigate} />
            <PlanSection onNavigate={handleNavigate} />
            <NewsSection />
            <ContactSection onNavigate={handleNavigate} />
          </>
        )
      case 'service':
        return <Suspense fallback={<Loading />}><ServicePage onNavigate={handleNavigate} /></Suspense>
      case 'doctors':
        return <Suspense fallback={<Loading />}><DoctorsPage onNavigate={handleNavigate} /></Suspense>
      case 'facilities':
        return <Suspense fallback={<Loading />}><FacilitiesPage onNavigate={handleNavigate} /></Suspense>
      case 'plan':
        return <Suspense fallback={<Loading />}><PlanPage onNavigate={handleNavigate} /></Suspense>
      case 'about':
        return <Suspense fallback={<Loading />}><AboutPage onNavigate={handleNavigate} /></Suspense>
      case 'contact':
        return <Suspense fallback={<Loading />}><ContactPage onNavigate={handleNavigate} /></Suspense>
      default:
        return null
    }
  }

  return (
    <>
      <a href="#main-content" className="skip-link">メインコンテンツへ</a>
      <div className="scroll-progress" style={{ width: `${scrollProgress}%` }} />
      <Header
        currentPage={currentPage}
        onNavigate={handleNavigate}
        fontSize={fontSize}
        contrast={contrast}
        onFontSizeChange={setFontSize}
        onContrastToggle={toggleContrast}
      />
      <main id="main-content">
        {renderPage()}
      </main>
      <Footer onNavigate={handleNavigate} />
    </>
  )
}

export default App