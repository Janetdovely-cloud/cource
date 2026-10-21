import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Section } from './Motion'
import Icon from './Icon'
import { centers } from '../data/centers'

// 底部報名 CTA：前往官網，或直接撥打就近分校電話
export default function ApplyCta({ courseName }) {
  const [region, setRegion] = useState(centers[0].region)
  const list = centers.find((r) => r.region === region).items
  return (
    <Section id="apply" label="立即報名" title={`預約「${courseName}」免費諮詢`}
      sub={<>選一間離你最近的分校，<mark className="hl">分校顧問會幫你規劃學習路線與補助資格</mark>。</>}>
      <div className="card" style={{ '--c': 'var(--color-gold)' }}>
        <div className="flex flex-wrap items-center justify-between gap-4 mb-5">
          <div className="tabs" role="tablist" aria-label="分校地區">
            {centers.map((r) => (
              <button key={r.region} type="button" role="tab" aria-selected={region === r.region} onClick={() => setRegion(r.region)} data-cursor="切換">
                {r.region} <span className="font-mono opacity-70">{r.items.length}</span>
              </button>
            ))}
          </div>
          <a href="https://www.lccnet.com.tw" target="_blank" rel="noopener noreferrer" className="btn primary" data-cursor="前往">
            前往官網報名 <Icon name="ext" size={18} />
          </a>
        </div>
        <AnimatePresence mode="wait">
          <motion.ul key={region} className="list-none p-0 m-0 grid gap-3 sm:grid-cols-2 lg:grid-cols-3"
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.25 }}>
            {list.map((c) => (
              <li key={c.name}>
                <a href={`tel:${c.tel.replace(/-/g, '')}`} className="soft !shadow-none block px-4 py-3 no-underline text-ink card-hover" data-cursor="撥打">
                  <span className="flex items-center justify-between gap-2">
                    <b>{c.name}</b>
                    <span className="font-mono text-[14px] text-link-aa">{c.tel}</span>
                  </span>
                  <span className="block text-[13px] text-muted">{c.addr}</span>
                </a>
              </li>
            ))}
          </motion.ul>
        </AnimatePresence>
      </div>
    </Section>
  )
}
