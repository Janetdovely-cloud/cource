import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Section, ph } from './Motion'

const TABS = [['path', '學習路徑'], ['certs', '證照小百科'], ['terms', '產業小知識']]

export default function Know({ d, color }) {
  const [tab, setTab] = useState('path')
  return (
    <Section id="know" label="專業小百科" title="帶你快速看懂這個領域" sub="從學習路徑、證照到產業知識，一次了解這個領域。">
      <div role="tablist" className="flex flex-wrap gap-2 mb-6">
        {TABS.filter(([k]) => d[k]?.length !== 0).map(([k, n]) => (
          <button key={k} role="tab" aria-selected={tab === k} type="button" onClick={() => setTab(k)}
            className="rounded-full border-2 border-ink px-4 py-1.5 font-bold transition-colors"
            style={{ background: tab === k ? 'var(--color-gold)' : 'var(--color-paper)' }}>{n}</button>
        ))}
      </div>
      <AnimatePresence mode="wait">
        <motion.div key={tab} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.25 }}>
          {tab === 'path' && (
            <div>
              <p className="hand text-[24px] m-0 mb-4">{ph(d.path.title)}</p>
              <ol className={`m-0 p-0 list-none grid gap-4 relative ${d.path.steps.length === 3 ? 'md:grid-cols-3' : 'md:grid-cols-4'}`}>
                {d.path.steps.map((s, i) => (
                  <li key={s.name} className="card h-full relative" style={{ '--c': color }}>
                    <div className="flex items-center gap-2">
                      <span className="grid place-items-center w-9 h-9 rounded-full border-2 border-ink font-mono font-bold bg-gold">{i + 1}</span>
                      <span className="hand-label">{s.stage}</span>
                    </div>
                    <p className="hand m-0 mt-3 text-[22px]">{ph(s.name)}</p>
                    <p className="m-0 mt-2 text-muted text-[15px]">{s.text}</p>
                    <p className="m-0 mt-3 text-[14px]"><strong>發展方向：</strong>{s.job}</p>
                    {i < d.path.steps.length - 1 && <span aria-hidden="true" className="hidden md:block absolute -right-[14px] top-1/2 -translate-y-1/2 text-[22px] font-bold z-10">→</span>}
                  </li>
                ))}
              </ol>
            </div>
          )}
          {tab === 'certs' && (
            <ul className="m-0 p-0 list-none grid gap-4 md:grid-cols-2 lg:grid-cols-3">{/* 只列可在聯成考的證照 */}
              {d.certs.map((c) => (
                <li key={c.name} className="card h-full" style={{ '--c': color }}>
                  <div className="flex items-start justify-between gap-2">
                    <p className="hand m-0 text-[22px]">{ph(c.name)}</p>
                    {c.level && <span className="shrink-0 rounded-full border-2 border-ink px-2 text-[13px] font-bold">{c.level}</span>}
                  </div>
                  <p className="m-0 text-[13px] text-link">{c.org}</p>
                  <dl className="m-0 mt-3 grid gap-2 text-[15px]">
                    <div><dt className="font-bold">考什麼</dt><dd className="m-0 text-muted">{c.what}</dd></div>
                    <div><dt className="font-bold">適合誰</dt><dd className="m-0 text-muted">{c.who}</dd></div>
                    <div><dt className="font-bold">求職幫助</dt><dd className="m-0 text-muted">{c.help}</dd></div>
                  </dl>
                </li>
              ))}
            </ul>
          )}
          {tab === 'terms' && (
            <ul className="m-0 p-0 list-none grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {d.terms.map((t) => (
                <li key={t.t} className="soft h-full px-5 py-4">
                  <p className="hand m-0 text-[24px] text-link">{ph(t.t)}</p>
                  <p className="m-0 mt-1 text-[15px]">{t.d}</p>
                </li>
              ))}
            </ul>
          )}
        </motion.div>
      </AnimatePresence>
    </Section>
  )
}
