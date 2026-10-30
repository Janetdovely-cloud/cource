import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Nav, Footer } from '../components/Layout'
import { Section } from '../components/Motion'
import { courseIndex } from '../data/courses'
import { upcoming } from '../data/upcoming'

// 全部課程近三個月開班，依開課日排序
// 同一班同時列在多門課時合併成一列，標示所有相關課程
const merged = new Map()
for (const c of courseIndex) for (const k of upcoming(c.slug)) {
  const id = [k.name, k.start, k.slot, k.branch].join('|')
  if (!merged.has(id)) merged.set(id, { ...k, courses: [] })
  merged.get(id).courses.push({ slug: c.slug, name: c.name })
}
const all = [...merged.values()].sort((a, b) => a.start.localeCompare(b.start) || a.name.localeCompare(b.name))
const modeOf = (k) => (k.branch.includes('實體') ? 'onsite' : 'online')

export default function ClassesPage() {
  const [course, setCourse] = useState('all')
  const [mode, setMode] = useState('all')
  const list = all.filter((k) => (course === 'all' || k.courses.some((x) => x.slug === course)) && (mode === 'all' || modeOf(k) === mode))
  const md = (s) => s.slice(5)
  // 依月份分組
  const months = [...new Set(list.map((k) => k.start.slice(0, 7)))]
  return (
    <>
      <Nav back />
      <Section id="all-classes" label="近期開班總表" title="最快哪一班開？"
        sub="所有課程近三個月內開課的班級，依開課日期排列。包含中壢、桃園分校實體課與線上直播班，實際開課資訊以分校公告為準。">
        <div className="grid gap-3 mb-7">
          <div className="tabs" role="tablist" aria-label="上課方式">
            {[{ id: 'all', name: '全部' }, { id: 'onsite', name: '實體課' }, { id: 'online', name: '線上直播' }].map((m) => (
              <button key={m.id} type="button" role="tab" aria-selected={mode === m.id} onClick={() => setMode(m.id)}>{m.name}</button>
            ))}
          </div>
          <label className="flex items-center gap-3 font-bold text-[15px]">課程
            <select value={course} onChange={(e) => setCourse(e.target.value)} className="soft !shadow-none px-3 py-2 font-[inherit] text-[15px] bg-paper">
              <option value="all">全部課程</option>
              {courseIndex.filter((c) => upcoming(c.slug).length).map((c) => <option key={c.slug} value={c.slug}>{c.name}</option>)}
            </select>
          </label>
        </div>
        {list.length === 0 && <p className="text-muted">目前沒有符合條件的班級。</p>}
        {months.map((m) => (
          <div key={m} className="mb-8">
            <h3 className="text-[22px] mb-3">{+m.slice(5)} 月開課</h3>
            <ul className="m-0 p-0 list-none grid gap-3">
              {list.filter((k) => k.start.startsWith(m)).map((k, i) => (
                <li key={i} className="soft !shadow-none px-4 py-3 md:px-5 grid gap-x-6 gap-y-1 md:grid-cols-[150px_1fr_auto] md:items-center">
                  <span className="font-mono font-bold text-link text-[18px]">{md(k.start)}<span className="text-muted text-[14px] font-normal"> ~ {md(k.end)}</span></span>
                  <span>
                    <span className="font-bold">{k.name}</span>
                    {k.courses.map((x) => <Link key={x.slug} to={`/course/${x.slug}`} className="chip !text-[12px] ml-2 no-underline text-ink">{x.name}</Link>)}
                  </span>
                  <span className="text-[14px] text-muted">{k.slot}・{k.time}・{k.hours} 小時{k.branch && `・${k.branch}`}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </Section>
      <Footer />
    </>
  )
}
