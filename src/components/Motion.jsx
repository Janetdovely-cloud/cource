import { useEffect, useRef, useState } from 'react'
import { motion, useInView, useMotionValue, useSpring, useTransform, useReducedMotion, animate } from 'motion/react'

// 階梯式淡入：父層 Stagger 包住，子層用 Item
export const staggerParent = {
  hidden: {},
  show: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
}
export const staggerItem = {
  hidden: { opacity: 0, y: 18 },
  show: { opacity: 1, y: 0, transition: { duration: 0.55, ease: [0.2, 0.7, 0.2, 1] } },
}

export function Stagger({ as = 'div', className, children, amount = 0.15, ...rest }) {
  const M = motion[as]
  return (
    <M className={className} variants={staggerParent} initial="hidden" whileInView="show" viewport={{ once: true, amount }} {...rest}>
      {children}
    </M>
  )
}

export function Item({ as = 'div', className, children, ...rest }) {
  const M = motion[as]
  return <M className={className} variants={staggerItem} {...rest}>{children}</M>
}

// 章節區塊：進入畫面時加上 .in（觸發手寫標籤底線與螢光筆）
export function Section({ id, no, label, title, sub, children, className = '' }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, amount: 0.12 })
  return (
    <section id={id} ref={ref} className={`sec ${inView ? 'in' : ''} ${className}`}>
      <div className="wrap">
        <Stagger>
          <Item className="sec-head">
            {no && <motion.span className="step-chip" animate={inView ? { rotate: [0, -8, 6, -3, 0] } : {}} transition={{ duration: 0.8, delay: 0.2 }}>{no}</motion.span>}
            <span className="hand-label">{label}</span>
          </Item>
          {title && <Item as="h2">{title}</Item>}
          {sub && <Item as="p" className="sub">{sub}</Item>}
        </Stagger>
        {children}
      </div>
    </section>
  )
}

// 3D 視差翻轉卡片
export function TiltCard({ children, className = '', max = 8, style, ...rest }) {
  const reduce = useReducedMotion()
  const mx = useMotionValue(0.5)
  const my = useMotionValue(0.5)
  const rx = useSpring(useTransform(my, [0, 1], [max, -max]), { stiffness: 220, damping: 18 })
  const ry = useSpring(useTransform(mx, [0, 1], [-max, max]), { stiffness: 220, damping: 18 })
  const onMove = (e) => {
    if (reduce) return
    const r = e.currentTarget.getBoundingClientRect()
    mx.set((e.clientX - r.left) / r.width)
    my.set((e.clientY - r.top) / r.height)
  }
  const reset = () => { mx.set(0.5); my.set(0.5) }
  return (
    <motion.div
      className={className}
      onPointerMove={onMove}
      onPointerLeave={reset}
      whileHover={reduce ? undefined : { scale: 1.025 }}
      style={{ rotateX: rx, rotateY: ry, transformPerspective: 900, ...style }}
      {...rest}
    >
      {children}
    </motion.div>
  )
}

// 數字跳動
export function CountUp({ to, duration = 1.1, className }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  const [val, setVal] = useState(0)
  useEffect(() => {
    if (!inView) return
    const c = animate(0, to, { duration, ease: [0.2, 0.7, 0.2, 1], onUpdate: (v) => setVal(Math.round(v)) })
    return () => c.stop()
  }, [inView, to, duration])
  return <span ref={ref} className={className}>{val.toLocaleString('en-US')}</span>
}

// 大標逐字登場
export function SplitTitle({ text, className, delay = 0.12 }) {
  return (
    <motion.h1 className={className} initial="hidden" animate="show" aria-label={text}
      variants={{ show: { transition: { staggerChildren: 0.07, delayChildren: delay } } }}>
      {[...text].map((ch, i) => (
        <motion.span key={i} aria-hidden="true" style={{ display: 'inline-block', whiteSpace: 'pre' }}
          variants={{ hidden: { opacity: 0, y: 28, rotate: -8 }, show: { opacity: 1, y: 0, rotate: 0, transition: { type: 'spring', stiffness: 260, damping: 16 } } }}
          whileHover={{ rotate: [0, -6, 5, 0], transition: { duration: 0.4 } }}>
          {ch}
        </motion.span>
      ))}
    </motion.h1>
  )
}

// 手繪筆觸底線
export function Squiggle({ className = '', color = 'var(--color-gold)' }) {
  return (
    <svg className={`squig ${className}`} viewBox="0 0 300 18" preserveAspectRatio="none" aria-hidden="true">
      <path pathLength="1" d="M4 12 C 60 2, 110 18, 160 9 S 250 4, 296 10" fill="none" stroke={color} strokeWidth="5" strokeLinecap="round" />
    </svg>
  )
}

// 漂浮塗鴉
export function Doodles() {
  const s = { fill: 'none', strokeWidth: 2.4, strokeLinecap: 'round', strokeLinejoin: 'round' }
  return (
    <div aria-hidden="true">
      <svg className="doodle" style={{ top: '10%', left: '2%' }} width="46" height="46" viewBox="0 0 48 48"><path {...s} stroke="var(--color-gold)" d="M24 6l5 11 12 1-9 8 3 12-11-7-11 7 3-12-9-8 12-1z" /></svg>
      <svg className="doodle" style={{ top: '70%', left: '1.5%', animationDelay: '-2s' }} width="70" height="26" viewBox="0 0 70 26"><path {...s} stroke="var(--color-brand)" d="M3 13c8-10 14 10 22 0s14 10 22 0 14 10 20 0" /></svg>
      <svg className="doodle" style={{ top: '20%', right: '5%', animationDelay: '-4s' }} width="44" height="44" viewBox="0 0 48 48"><circle {...s} stroke="var(--color-red)" cx="24" cy="24" r="17" /></svg>
      <svg className="doodle" style={{ bottom: '12%', right: '9%', animationDelay: '-1s' }} width="34" height="34" viewBox="0 0 48 48"><path {...s} stroke="var(--color-violet)" d="M24 8v32M8 24h32" /></svg>
    </div>
  )
}
