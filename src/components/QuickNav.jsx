import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { motion, AnimatePresence } from 'motion/react'
import { courseIndex } from '../data/courses'

// 業務現場用：任何頁面都能快速跳到段落或其他課程
const SECTIONS = [
  ['about', '認識聯成'], ['disc', '適性測驗'], ['courses', '課程總覽'], ['services', '就業服務'],
  ['why', '為什麼學'], ['who', '適合誰'], ['what', '學什麼'], ['how', '怎麼學'], ['format', '上課方式'],
  ['teacher', '師資'], ['know', '專業小百科'], ['works', '學員作品'], ['videos', '就業影片'], ['classes', '近期開班'],
  ['faq', 'FAQ'], ['apply', '全台分校'],
]

export default function QuickNav() {
  const [open, setOpen] = useState(false)
  const [here, setHere] = useState([])
  const { pathname } = useLocation()
  const nav = useNavigate()
  const toggle = () => {
    if (!open) setHere(SECTIONS.filter(([id]) => document.getElementById(id)))
    setOpen(!open)
  }
  const jump = (id) => { setOpen(false); document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' }) }
  const go = (to) => { setOpen(false); nav(to) }
  const chip = 'rounded-full border-2 border-ink px-3 py-1 text-[14px] font-bold bg-paper hover:bg-gold transition-colors cursor-pointer'

  return (
    <>
      <AnimatePresence>
        {open && (
          <>
            <motion.div className="fixed inset-0 z-[70] bg-ink/30" onClick={() => setOpen(false)}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} />
            <motion.nav aria-label="快速跳轉" className="fixed left-4 bottom-[88px] md:left-8 md:bottom-[104px] z-[71] w-[min(92vw,420px)]"
              initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 16 }}>
              <div className="card !p-0" style={{ '--c': 'var(--color-gold)' }}><div className="max-h-[calc(100vh-150px)] overflow-y-auto p-5">
              {here.length > 0 && (<>
                <p className="hand-label m-0">這一頁</p>
                <div className="flex flex-wrap gap-2 mt-2">
                  {here.map(([id, n]) => <button key={id} type="button" className={chip} onClick={() => jump(id)}>{n}</button>)}
                </div>
              </>)}
              <p className="hand-label m-0 mt-4">課程</p>
              <div className="flex flex-wrap gap-2 mt-2">
                {courseIndex.filter((c) => c.ready).map((c) => (
                  <button key={c.slug} type="button" className={chip}
                    style={pathname === `/course/${c.slug}` ? { background: 'var(--color-gold)' } : undefined}
                    onClick={() => go(`/course/${c.slug}`)}>{c.name}</button>
                ))}
              </div>
              <p className="hand-label m-0 mt-4">其他</p>
              <div className="flex flex-wrap gap-2 mt-2">
                <button type="button" className={chip} onClick={() => go('/')}>首頁</button>
                <button type="button" className={chip} onClick={() => go('/disc')}>DISC 測驗</button>
                <button type="button" className={chip} onClick={() => go('/interest')}>職涯興趣測驗</button>
                <button type="button" className={chip} onClick={() => go('/ideal')}>理想工作條件</button>
                <button type="button" className={chip} onClick={() => go('/compare')}>課程比較</button>
                <button type="button" className={chip} onClick={() => go('/classes')}>近期開班總表</button>
                <button type="button" className={chip} onClick={() => go('/certs')}>證照價值速查</button>
              </div>
              </div></div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>
      <button type="button" onClick={toggle} aria-expanded={open} aria-label="快速跳轉"
        className="fixed left-4 bottom-4 md:left-8 md:bottom-8 z-[72] grid place-items-center w-[58px] h-[58px] rounded-full border-2 border-ink bg-paper text-ink shadow-[3px_4px_0_var(--color-ink)] hover:bg-gold transition-colors">
        <span className="text-[22px] leading-none font-bold">{open ? '×' : '☰'}</span>
        <span className="text-[11px] font-bold -mt-1">{open ? '關閉' : '跳轉'}</span>
      </button>
    </>
  )
}
