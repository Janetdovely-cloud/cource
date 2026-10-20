import { useEffect, useState } from 'react'
import { motion, useMotionValue, useSpring, AnimatePresence } from 'motion/react'

// 空心圓游標：平滑跟隨；碰到 [data-cursor] 元素時放大、變金色並浮現文字。
// 只在「有滑鼠」的裝置啟用，觸控裝置維持原生行為。
export default function Cursor() {
  const [enabled, setEnabled] = useState(false)
  const [hover, setHover] = useState(null) // { label, tone }
  const [down, setDown] = useState(false)
  const [visible, setVisible] = useState(false)
  const x = useMotionValue(-100)
  const y = useMotionValue(-100)
  const sx = useSpring(x, { stiffness: 380, damping: 32, mass: 0.6 })
  const sy = useSpring(y, { stiffness: 380, damping: 32, mass: 0.6 })

  useEffect(() => {
    const mq = window.matchMedia('(hover: hover) and (pointer: fine)')
    const apply = () => {
      setEnabled(mq.matches)
      document.documentElement.classList.toggle('has-cursor', mq.matches)
    }
    apply()
    mq.addEventListener('change', apply)
    return () => mq.removeEventListener('change', apply)
  }, [])

  useEffect(() => {
    if (!enabled) return
    const move = (e) => { x.set(e.clientX); y.set(e.clientY); setVisible(true) }
    const over = (e) => {
      const el = e.target.closest('[data-cursor], a, button, summary, input, select, textarea, label')
      if (!el) return setHover(null)
      const isText = el.matches('input:not([type=checkbox]):not([type=radio]), textarea, select')
      setHover({
        label: el.getAttribute('data-cursor') || '',
        tone: el.getAttribute('data-cursor-tone') || (isText ? 'text' : 'gold'),
      })
    }
    const leave = () => setVisible(false)
    const md = () => setDown(true)
    const mu = () => setDown(false)
    window.addEventListener('pointermove', move)
    document.addEventListener('pointerover', over)
    document.documentElement.addEventListener('pointerleave', leave)
    window.addEventListener('pointerdown', md)
    window.addEventListener('pointerup', mu)
    return () => {
      window.removeEventListener('pointermove', move)
      document.removeEventListener('pointerover', over)
      document.documentElement.removeEventListener('pointerleave', leave)
      window.removeEventListener('pointerdown', md)
      window.removeEventListener('pointerup', mu)
    }
  }, [enabled, x, y])

  if (!enabled) return null

  const hasLabel = hover && hover.label
  const size = hover ? (hover.tone === 'text' ? 26 : 64) : 34
  const border = hover?.tone === 'muted' ? '#6B645A' : hover ? '#F2B134' : '#2B2822'
  const fill = hover?.tone === 'muted' ? 'rgba(107,100,90,.10)' : hover && hover.tone !== 'text' ? 'rgba(242,177,52,.22)' : 'rgba(242,177,52,0)'

  return (
    <div aria-hidden="true" style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 9999, opacity: visible ? 1 : 0, transition: 'opacity .2s' }}>
      <motion.div
        style={{ position: 'absolute', left: 0, top: 0, x: sx, y: sy, translateX: '-50%', translateY: '-50%' }}
      >
        <motion.div
          animate={{ width: size, height: size, borderColor: border, backgroundColor: fill, scale: down ? 0.82 : 1 }}
          transition={{ type: 'spring', stiffness: 320, damping: 24 }}
          style={{ borderWidth: 2, borderStyle: 'solid', borderRadius: '50% 46% 52% 48% / 48% 52% 46% 50%', display: 'grid', placeItems: 'center' }}
        >
        </motion.div>
        {/* 浮現文字：貼在圓圈右下角的小標籤，不蓋住按鈕文字 */}
        <AnimatePresence>
          {hasLabel && (
            <motion.span
              key={hover.label}
              initial={{ opacity: 0, scale: 0.5, x: 10, y: 6 }}
              animate={{ opacity: 1, scale: 1, x: 0, y: 0 }}
              exit={{ opacity: 0, scale: 0.5 }}
              transition={{ type: 'spring', stiffness: 380, damping: 20 }}
              style={{ position: 'absolute', left: '78%', top: '78%', padding: '2px 10px 3px', borderRadius: 999,
                background: hover.tone === 'muted' ? '#6B645A' : '#2B2822', color: '#FBF6EA', boxShadow: '2px 2px 0 #F2B134',
                fontFamily: 'var(--font-hand)', fontWeight: 700, fontSynthesis: 'weight', fontSize: 17, whiteSpace: 'nowrap', lineHeight: 1.3 }}
            >
              {hover.label}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>
      {/* 中心小點：精準指向，不延遲 */}
      <motion.div
        style={{ position: 'absolute', left: 0, top: 0, x, y, translateX: '-50%', translateY: '-50%', width: 5, height: 5, borderRadius: 9, background: '#1DAD97' }}
      />
    </div>
  )
}
