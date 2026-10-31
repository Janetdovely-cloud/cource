import { useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { Nav, Footer } from '../components/Layout'
import { Section } from '../components/Motion'
import Icon from '../components/Icon'
import { courseIndex, courses, categories } from '../data/courses'
import { know } from '../data/know'
import { upcoming, ONLINE_ONLY, SALARY_AS_OF } from '../data/upcoming'

const MAX = 3
const modeText = (slug) => slug === 'infosec' ? '線上直播＋錄播（ISO 27001 為實體課）'
  : ONLINE_ONLY.includes(slug) ? '線上直播＋錄播' : '實體＋線上直播＋錄播'
const certs = (slug) => (know[slug]?.certs ?? []).map((c) => c.name)
const salary = (slug) => courses[slug]?.why?.salary ?? []

// 「想做的工作」→ 課程：取各課程薪資表裡的職務名稱
const jobs = (() => {
  const m = new Map()
  for (const c of courseIndex) for (const s of salary(c.slug)) {
    const k = s.role.trim(); if (!m.has(k)) m.set(k, new Set()); m.get(k).add(c.slug)
  }
  return [...m].map(([role, set]) => ({ role, slugs: [...set], cat: courseIndex.find((c) => c.slug === [...set][0]).cat }))
})()

export default function ComparePage() {
  const [params] = useSearchParams()
  const [picked, setPicked] = useState(() => (params.get('c') ?? '').split(',').filter((x) => courseIndex.some((c) => c.slug === x)).slice(0, MAX))
  const [job, setJob] = useState(null)
  const toggle = (slug) => setPicked((p) => p.includes(slug) ? p.filter((x) => x !== slug) : p.length >= MAX ? [...p.slice(1), slug] : [...p, slug])
  const pickJob = (j) => { setJob(j.role); setPicked(j.slugs.slice(0, MAX)) }
  const sel = picked.map((s) => courseIndex.find((c) => c.slug === s))
  const rows = [
    ['一句話', (c) => c.line],
    ['主要技能', (c) => <span className="flex flex-wrap gap-1">{c.tags.map((t) => <span key={t} className="chip !text-[12px] !py-0.5">{t}</span>)}</span>],
    ['上課方式', (c) => modeText(c.slug)],
    ['可考證照', (c) => certs(c.slug).length ? <ul className="m-0 pl-4 grid gap-0.5">{certs(c.slug).map((x) => <li key={x}>{x}</li>)}</ul> : '課程可銜接國際認證'],
    ['職務與月薪', (c) => <ul className="m-0 pl-4 grid gap-0.5">{salary(c.slug).map((s) => <li key={s.role}>{s.role}　<span className="font-mono">{s.min}K–{s.max}K</span></li>)}</ul>],
    ['近期開班', (c) => { const u = upcoming(c.slug); return u.length ? `近三個月 ${u.length} 班，最快 ${u[0].start.slice(5)} 開課` : '請洽分校' }],
  ]
  return (
    <>
      <Nav back />
      <Section id="finder" label="用想做的工作找課程" title="想做什麼工作？點一下就知道學哪門課"
        sub="點選職務，會自動帶出相關課程並放進下方比較表。">
        <div className="grid gap-5">
          {categories.filter((g) => g.id !== 'cert').map((g) => (
            <div key={g.id} className="grid gap-2 md:grid-cols-[120px_1fr] md:items-start">
              <p className="m-0 font-extrabold pt-1" style={{ color: g.color === 'var(--color-ink)' ? undefined : g.color }}>{g.name}</p>
              <div className="flex flex-wrap gap-2">
                {jobs.filter((j) => (j.cat === 'cert' ? 'eng' : j.cat) === g.id).map((j) => (
                  <button key={j.role} type="button" onClick={() => pickJob(j)}
                    className={`chip !text-[14px] !py-1 cursor-pointer border-0 ${job === j.role ? 'ink' : ''}`}>{j.role}</button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Section>
      <Section id="compare" label="課程比較" title="猶豫哪一門？最多選 3 門並排比較"
        sub="勾選課程後，下方會並排列出技能、上課方式、證照、職務薪資與近期開班。">
        <div className="flex flex-wrap gap-2 mb-7">
          {courseIndex.map((c) => (
            <button key={c.slug} type="button" aria-pressed={picked.includes(c.slug)} onClick={() => { setJob(null); toggle(c.slug) }}
              className={`chip !text-[14px] !py-1.5 cursor-pointer border-0 ${picked.includes(c.slug) ? 'gold' : ''}`}>
              {picked.includes(c.slug) ? '✓ ' : '＋ '}{c.name}
            </button>
          ))}
        </div>
        {sel.length === 0 ? <p className="text-muted">請先選擇要比較的課程。</p> : (
          <div className="card !p-0 overflow-x-auto">
            <table className="w-full text-[14px] border-collapse" style={{ minWidth: 160 + sel.length * 260 }}>
              <thead><tr className="bg-ink text-paper">
                <th className="px-4 py-3 text-left w-[130px]">比較項目</th>
                {sel.map((c) => <th key={c.slug} className="px-4 py-3 text-left">{c.name}</th>)}
              </tr></thead>
              <tbody>
                {rows.map(([name, f]) => (
                  <tr key={name}>
                    <td className="px-4 py-3 border-b border-rule font-extrabold whitespace-nowrap align-top">{name}</td>
                    {sel.map((c) => <td key={c.slug} className="px-4 py-3 border-b border-rule align-top">{f(c)}</td>)}
                  </tr>
                ))}
                <tr>
                  <td className="px-4 py-3" />
                  {sel.map((c) => <td key={c.slug} className="px-4 py-3"><Link to={`/course/${c.slug}`} className="btn ghost !text-[14px]">看完整課程 <Icon name="arrow" size={16} /></Link></td>)}
                </tr>
              </tbody>
            </table>
          </div>
        )}
        {sel.length > 0 && <Link to={`/summary?c=${picked.join(',')}`} className="btn primary mt-5">把這幾門做成諮詢摘要 <Icon name="arrow" size={18} /></Link>}
        <p className="note mt-4 mb-0">薪資參考來源：人力銀行（單位：千元／月），僅供參考，實際依公司與個人條件而異（資料整理時間：{SALARY_AS_OF}）。</p>
      </Section>
      <Footer />
    </>
  )
}
