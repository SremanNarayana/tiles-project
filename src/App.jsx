import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { Routes, Route, useNavigate } from 'react-router-dom'
import TopNav from './components/TopNav'
import Web3Hero from './components/Web3Hero'
import FeatureStrip from './components/FeatureStrip'
import Ticker from './components/Ticker'
import WhoWeAre from './components/WhoWeAre'
import WhyChooseUs from './components/WhyChooseUs'
import OurBranches from './components/OurBranches'
import Products from './components/Products'
import Gallery from './components/Collection'
import Brands from './components/Brands'
import Reviews from './components/Reviews'
import Feedback from './components/Feedback'
import Contact from './components/Contact'
import Footer from './components/Footer'
import FloatingElements from './components/FloatingElements'
import WhatsAppFloat from './components/WhatsAppFloat'
import About from './components/About'
import OceanBackground from './components/OceanBackground'
import CategoryPage from './pages/CategoryPage'
import { useLenis } from './hooks/useLenis'

const pageVariants = {
  initial: { opacity: 0, y: 30, scale: 0.98 },
  animate: {
    opacity: 1, y: 0, scale: 1,
    transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
  },
  exit: {
    opacity: 0, y: -20, scale: 0.98,
    transition: { duration: 0.3 },
  },
}

/* ─── Main site (all non-category pages) ─────────────────────────── */
function MainSite({ activePage, setActivePage }) {
  return (
    <>
      <AnimatePresence mode="wait">
        {activePage === 'home' && (
          <motion.main key="home" {...pageVariants} className="pt-[72px]">
            <Web3Hero setActivePage={setActivePage} />
            <FeatureStrip />
            <Ticker />
            <WhoWeAre />
            <WhyChooseUs />
            <OurBranches />
            <Products />
            <Brands />
            <Contact />
          </motion.main>
        )}

        {activePage === 'gallery' && (
          <motion.main key="gallery" {...pageVariants} className="pt-[72px]">
            <Gallery />
          </motion.main>
        )}

        {activePage === 'about' && (
          <motion.main key="about" {...pageVariants} className="pt-[72px]">
            <About />
          </motion.main>
        )}

        {activePage === 'testimonials' && (
          <motion.main key="testimonials" {...pageVariants} className="pt-[72px] min-h-screen">
            <Reviews />
            <Feedback />
          </motion.main>
        )}
      </AnimatePresence>

      <Footer setActivePage={setActivePage} />
    </>
  )
}

/* ─── App root ───────────────────────────────────────────────────── */
function App() {
  const [activePage, setActivePage] = useState('home')

  useLenis()

  return (
    <div className="min-h-screen font-sans" style={{ background: '#010810', color: '#E8F4FB' }}>
      <OceanBackground />
      <TopNav activePage={activePage} setActivePage={setActivePage} />

      <Routes>
        <Route
          path="/categories/:slug"
          element={
            <motion.div
              key="category"
              {...pageVariants}
              className="pt-[72px]"
            >
              <CategoryPage />
            </motion.div>
          }
        />
        <Route
          path="/*"
          element={<MainSite activePage={activePage} setActivePage={setActivePage} />}
        />
      </Routes>

      <FloatingElements />
      <WhatsAppFloat />
    </div>
  )
}

export default App
