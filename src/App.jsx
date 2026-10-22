import { useLayoutEffect } from 'react'
import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence, motion, MotionConfig } from 'motion/react'
import { BackToTop } from './components/Layout'
import Home from './pages/Home'
import CoursePage from './pages/CoursePage'

// 換頁過場：金色與青綠色兩層紙片由下往上掃過，內容淡入
function Page({ children }) {
  // 換頁前就回到頂端（instant），避免新頁在舊捲動位置先觸發進場動畫
  useLayoutEffect(() => { window.scrollTo({ top: 0, behavior: 'instant' }) }, [])
  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0, transition: { duration: 0.5, delay: 0.35, ease: [0.2, 0.7, 0.2, 1] } }}
        exit={{ opacity: 0, y: -16, transition: { duration: 0.25 } }}
      >
        {children}
      </motion.div>
      <motion.div aria-hidden="true" className="fixed inset-0 z-[9000] bg-gold pointer-events-none origin-top"
        initial={{ scaleY: 1 }} animate={{ scaleY: 0, transition: { duration: 0.55, ease: [0.7, 0, 0.2, 1] } }}
        exit={{ scaleY: 0 }} />
      <motion.div aria-hidden="true" className="fixed inset-0 z-[9001] bg-brand pointer-events-none origin-bottom"
        initial={{ scaleY: 0 }} animate={{ scaleY: 0 }}
        exit={{ scaleY: 1, transition: { duration: 0.35, ease: [0.7, 0, 0.2, 1] } }} />
    </>
  )
}

export default function App() {
  const location = useLocation()
  return (
    <MotionConfig reducedMotion="user">
      <BackToTop />
      <AnimatePresence mode="wait" onExitComplete={() => window.scrollTo({ top: 0, behavior: 'instant' })}>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Page><Home /></Page>} />
          <Route path="/course/:slug" element={<Page><CoursePage /></Page>} />
          <Route path="*" element={<Page><Home /></Page>} />
        </Routes>
      </AnimatePresence>
    </MotionConfig>
  )
}
