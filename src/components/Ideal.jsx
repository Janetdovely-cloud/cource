import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { ph } from './Motion'

// 理想工作條件：業務面談「承」段落用，選出最在意的 3 項
const ITEMS = [
  { k: '薪資', d: '物價一直漲，薪水要跟得上', tip: '薪資取決於你能創造的價值，專業技術加上證照與作品，最能拉高起薪。' },
  { k: '時間', d: '正常上下班、有休假', tip: '有專業能力就有挑公司的本錢，更容易選到制度健全、上下班正常的職缺。' },
  { k: '地點', d: '通勤不超過一小時', tip: '具備專業技能，可以投遞的職缺更多，也更有機會找到離家近的工作。' },
  { k: '家人意見', d: '家人支持你的選擇', tip: '有明確的學習規劃、證照與作品，最能讓家人看見你的努力並放心支持。' },
  { k: '興趣', d: '做得開心、做得久', tip: '從興趣出發選擇學習方向，再把它練成專業，工作才能做得開心又長久。' },
  { k: '環境', d: '工作環境、同事主管', tip: '專業職務多半在制度完整的企業，工作環境與團隊也相對穩定。' },
  { k: '福利制度', d: '勞健保、年終、年假', tip: '福利完整的企業，通常更重視專業能力與證照，也更願意留住人才。' },
  { k: '教育訓練', d: '公司願意培養你', tip: '多數企業希望找即戰力，先具備專業基礎，進公司後才學得更快、升得更快。' },
  { k: '發展性', d: '向陽產業、能一直成長', tip: '選擇正在成長的產業，培養別人不容易取代的專業，職涯才能一路往上。' },
]

export default function Ideal() {
  const [pick, setPick] = useState([])
  const toggle = (k) => setPick(pick.includes(k) ? pick.filter((x) => x !== k) : pick.length < 3 ? [...pick, k] : pick)
  const sel = pick.map((k) => ITEMS.find((i) => i.k === k))
  return (
    <div className="grid gap-6 lg:grid-cols-[1.3fr_1fr] items-start">
      <div className="grid gap-3 grid-cols-2 sm:grid-cols-3">
        {ITEMS.map((it) => {
          const n = pick.indexOf(it.k)
          const on = n >= 0
          return (
            <button key={it.k} type="button" onClick={() => toggle(it.k)} aria-pressed={on}
              className="soft text-left px-4 py-3 cursor-pointer transition-colors"
              style={on ? { border: '2.5px solid var(--color-ink)', background: 'color-mix(in srgb, var(--color-gold) 25%, var(--color-paper))' } : undefined}>
              <span className="block font-bold text-[17px]">{on && ['①', '②', '③'][n] + ' '}{it.k}</span>
              <span className="block text-muted text-[14px] mt-1">{it.d}</span>
            </button>
          )
        })}
      </div>
      <div className="lg:sticky lg:top-24">
        <AnimatePresence mode="wait">
          {pick.length < 3 ? (
            <motion.div key="wait" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="card" style={{ '--c': 'var(--color-brand)' }}>
              <p className="hand-label m-0">還差 {3 - pick.length} 項</p>
              <p className="m-0 mt-2">依照在意的程度，依序點選 3 項。再點一次可以取消。</p>
            </motion.div>
          ) : (
            <motion.div key="res" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="card" style={{ '--c': 'var(--color-brand)' }}>
              <p className="hand-label m-0">你最在意</p>
              <p className="hand m-0 mt-1 text-[26px]">{ph(pick.join(' → '))}</p>
              <div className="grid gap-3 mt-4">
                {sel.map((it, n) => (
                  <div key={it.k} className="pl-3" style={{ borderLeft: '4px solid var(--color-gold)' }}>
                    <p className="m-0 font-bold">{['①', '②', '③'][n]} {it.k}</p>
                    <p className="m-0 text-muted text-[15px]">{it.tip}</p>
                  </div>
                ))}
              </div>
              <p className="m-0 mt-4 font-bold">共同的關鍵：企業最看重「即戰力」。先培養一項專業技術，再用證照與作品證明自己。</p>
              <button type="button" className="btn ghost w-full mt-4 justify-center" onClick={() => setPick([])}>重新選擇</button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
