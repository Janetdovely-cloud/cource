import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Nav, Footer } from '../components/Layout'
import { Section } from '../components/Motion'
import ResultQR from '../components/ResultQR'
import { courseIndex, courses } from '../data/courses'
import { know } from '../data/know'
import { upcoming, ONLINE_ONLY } from '../data/upcoming'

// 諮詢摘要：業務勾選這次介紹的課程，整理成一頁給學員帶回家（QR 為純文字、不含網址；不含學費、不是報名表）
const MAX = 3
const modeText = (slug) => slug === 'infosec' ? '線上直播＋錄播（ISO 27001 為實體課）'
  : ONLINE_ONLY.includes(slug) ? '線上直播＋錄播' : '實體＋線上直播＋錄播'
const md = (s) => s.slice(5).replace('-', '/')

function info(slug) {
  const c = courseIndex.find((x) => x.slug === slug)
  return {
    c, mode: modeText(slug),
    certs: (know[slug]?.certs ?? []).map((k) => k.name),
    roles: (courses[slug]?.why?.salary ?? []).slice(0, 3),
    next: upcoming(slug).slice(0, 3),
  }
}

export default function SummaryPage() {
  const [params] = useSearchParams()
  const [picked, setPicked] = useState(() => (params.get('c') ?? '').split(',').filter((x) => courseIndex.some((c) => c.slug === x)).slice(0, MAX))
  const toggle = (s) => setPicked((p) => p.includes(s) ? p.filter((x) => x !== s) : p.length >= MAX ? [...p.slice(1), s] : [...p, s])
  const sel = picked.map(info)
  const text = ['【聯成電腦 諮詢摘要】', ...sel.map((x) => [
    `■ ${x.c.name}`, x.c.line, `上課方式：${x.mode}`,
    x.certs.length ? `可考證照：${x.certs.join('、')}` : '',
    `相關職務：${x.roles.map((r) => `${r.role} ${r.min}K–${r.max}K`).join('、')}`,
    x.next.length ? `近期開班：${x.next.map((k) => `${md(k.start)} ${k.name}（${k.branch}）`).join('；')}` : '',
  ].filter(Boolean).join('\n')), '聯成電腦中壢分校 (03) 427-1238', '桃園市中壢區中正路 183 號'].join('\n\n')
  return (
    <>
      <Nav back />
      <Section id="summary" label="諮詢摘要帶回家" title="這次聊過的課程，整理成一頁帶回家"
        sub="勾選這次介紹的課程（最多 3 門），學員用手機掃 QR Code 就能把重點存下來，也可以直接列印。">
        <div className="flex flex-wrap gap-2 mb-7 print:hidden">
          {courseIndex.map((c) => (
            <button key={c.slug} type="button" aria-pressed={picked.includes(c.slug)} onClick={() => toggle(c.slug)}
              className={`chip !text-[14px] !py-1.5 cursor-pointer border-0 ${picked.includes(c.slug) ? 'gold' : ''}`}>
              {picked.includes(c.slug) ? '✓ ' : '＋ '}{c.name}
            </button>
          ))}
        </div>
        {sel.length === 0 ? <p className="text-muted">請先選擇這次介紹的課程。</p> : (
          <div className="card">
            <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
              <p className="hand text-[26px] m-0">聯成電腦・諮詢摘要</p>
              <button type="button" className="btn ghost !text-[14px] print:hidden" onClick={() => window.print()}>列印這一頁</button>
            </div>
            <div className={`grid gap-5 ${['', '', 'lg:grid-cols-2', 'lg:grid-cols-3'][sel.length]}`}>
              {sel.map((x) => (
                <section key={x.c.slug} className="soft !shadow-none p-4 text-[14px]">
                  <h3 className="text-[20px] m-0">{x.c.name}</h3>
                  <p className="m-0 mt-1 text-muted">{x.c.line}</p>
                  <p className="m-0 mt-3"><b>上課方式：</b>{x.mode}</p>
                  {x.certs.length > 0 && <><p className="m-0 mt-3 font-extrabold">可考證照</p><ul className="m-0 pl-5">{x.certs.map((k) => <li key={k}>{k}</li>)}</ul></>}
                  <p className="m-0 mt-3 font-extrabold">相關職務與月薪</p>
                  <ul className="m-0 pl-5">{x.roles.map((r) => <li key={r.role}>{r.role}　<span className="font-mono">{r.min}K–{r.max}K</span></li>)}</ul>
                  <p className="m-0 mt-3 font-extrabold">近期開班</p>
                  {x.next.length ? <ul className="m-0 pl-5">{x.next.map((k, i) => <li key={i}><span className="font-mono">{md(k.start)}</span> {k.name}（{k.branch}）</li>)}</ul> : <p className="m-0">請洽分校</p>}
                </section>
              ))}
            </div>
            <div className="mt-6 grid gap-4 md:grid-cols-[1fr_auto] items-center border-t-2 border-dashed border-rule pt-5">
              <ResultQR text={text} label="諮詢摘要" />
              <p className="m-0 text-[14px]"><b>聯成電腦中壢分校</b><br />(03) 427-1238<br />桃園市中壢區中正路 183 號</p>
            </div>
          </div>
        )}
        <p className="note mt-4 mb-0">薪資為人力銀行參考範圍（單位：千元／月）；開班資訊以分校公告為準。</p>
      </Section>
      <Footer />
    </>
  )
}
