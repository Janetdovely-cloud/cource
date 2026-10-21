import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, useScroll, useSpring } from 'motion/react'
import { centers, centerCount } from '../data/centers'
import Icon from './Icon'

// HashRouter 下不能用 #id 錨點，改用捲動
export const scrollToId = (id) => {
  const el = document.getElementById(id)
  if (!el) return
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  window.scrollTo({ top: el.getBoundingClientRect().top + window.scrollY - 76, behavior: reduce ? 'auto' : 'smooth' })
}

export function Nav({ links = [], back = false }) {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 30 })
  return (
    <nav className="sticky top-0 z-50 bg-paper/95 backdrop-blur-[2px] border-b-2 border-dashed border-rule">
      <div className="wrap flex items-center gap-4 h-[64px]">
        {back ? (
          <Link to="/" className="btn-sm ghost shrink-0" data-cursor="回首頁">
            <Icon name="back" size={18} /> 返回首頁
          </Link>
        ) : (
          <Link to="/" className="flex items-center gap-2 no-underline text-ink shrink-0" data-cursor="首頁">
            <span className="w-3 h-3 rounded-full bg-brand inline-block" />
            <span className="hand text-[22px]">聯成電腦</span>
            <span className="text-sm font-bold text-muted hidden sm:inline">職涯課程</span>
          </Link>
        )}
        <div className="flex gap-1 overflow-x-auto no-scrollbar ml-auto">
          {links.map((l) => (
            <button key={l.id} type="button" onClick={() => scrollToId(l.id)}
              className="group relative shrink-0 bg-transparent border-0 font-bold text-[14px] text-ink px-3 py-2 whitespace-nowrap">
              {l.name}
              <span className="absolute left-3 right-3 bottom-1 h-[2px] bg-brand scale-x-0 origin-left transition-transform group-hover:scale-x-100" />
            </button>
          ))}
        </div>
      </div>
      <motion.div className="absolute left-0 right-0 bottom-[-2px] h-[3px] bg-brand origin-left" style={{ scaleX }} />
    </nav>
  )
}

export function Footer() {
  const [open, setOpen] = useState(false)
  return (
    <footer className="bg-ink text-paper mt-0">
      <div className="wrap py-14">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p className="hand text-[34px] m-0 text-gold">聯成電腦</p>
            <p className="m-0 text-[15px] opacity-85">全台 {centerCount} 個認證中心，就近諮詢、彈性上課。</p>
          </div>
          <button type="button" className="btn-sm" style={{ background: 'var(--color-gold)', color: '#1a1400', borderColor: 'var(--color-gold)' }}
            onClick={() => setOpen((v) => !v)} aria-expanded={open} data-cursor={open ? '收合' : '展開'}>
            {open ? '收合分校資訊' : '查看全台分校'}
          </button>
        </div>
        {open && (
          <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="grid gap-6 mt-8 md:grid-cols-2 lg:grid-cols-4">
            {centers.map((r) => (
              <div key={r.region}>
                <p className="hand text-[22px] text-brand m-0 mb-2">{r.region}</p>
                <ul className="list-none p-0 m-0 grid gap-2 text-[14px]">
                  {r.items.map((c) => (
                    <li key={c.name}>
                      <b>{c.name}</b> <span className="font-mono opacity-90">{c.tel}</span>
                      <br /><span className="opacity-75">{c.addr}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </motion.div>
        )}
        <p className="text-[13px] opacity-70 mt-10 mb-0">完整立案資訊詳見官網 www.lccnet.com.tw｜實際課程內容與優惠以官方公告為準。</p>
      </div>
    </footer>
  )
}
