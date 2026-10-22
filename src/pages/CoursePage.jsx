import { useState } from 'react'
import { useParams, Navigate } from 'react-router-dom'
import { motion, AnimatePresence, useScroll, useTransform, MotionConfig } from 'motion/react'
import { Nav, Footer, scrollToId } from '../components/Layout'
import { Section, Stagger, Item, TiltCard, CountUp, SplitTitle, Squiggle, Doodles, ph } from '../components/Motion'
import Icon from '../components/Icon'
import ApplyCta from '../components/ApplyCta'
import { courses } from '../data/courses'
import { works } from '../data/works'
import { know } from '../data/know'
import Know from '../components/Know'
import { videos } from '../data/videos'
import { classes } from '../data/classes'
import VideoGrid from '../components/VideoGrid'

const navLinks = (hasWorks, hasVideos, hasClasses, hasKnow) => [
  { id: 'why', name: '為什麼學' }, { id: 'who', name: '適合誰' }, { id: 'what', name: '學什麼' },
  { id: 'how', name: '怎麼學' }, { id: 'format', name: '上課方式' }, { id: 'teacher', name: '師資' },
  ...(hasKnow ? [{ id: 'know', name: '小百科' }] : []),
  ...(hasWorks ? [{ id: 'works', name: '學員作品' }] : []),
  ...(hasVideos ? [{ id: 'videos', name: '就業影片' }] : []),
  ...(hasClasses ? [{ id: 'classes', name: '近期開班' }] : []),
  { id: 'faq', name: 'FAQ' }, { id: 'apply', name: '全台分校' },
]

function Hero({ d, color }) {
  const { scrollY } = useScroll()
  const imgY = useTransform(scrollY, [0, 700], [0, 90])
  return (
    <header className="relative overflow-hidden">
      <Doodles />
      <div className="wrap relative grid gap-10 lg:grid-cols-[1.05fr_.95fr] items-center pt-14 pb-16 md:pt-20 md:pb-24">
        <div>
          <Stagger className="flex flex-wrap gap-2">
            {d.badges.map((b, i) => <Item key={b} as="span" className={`chip ${i === 0 ? 'ink' : ''}`}>{b}</Item>)}
          </Stagger>
          <motion.p className="hand text-link text-[clamp(18px,2.4vw,24px)] mt-5 mb-0" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>
            {d.en}
          </motion.p>
          <div className="relative inline-block">
            <SplitTitle text={d.title} className={`${[...d.title.replace(/\s/g, "")].length > 7 ? "text-[clamp(34px,5.2vw,62px)]" : "text-[clamp(36px,6.4vw,76px)]"} leading-[1.1] mt-1`} delay={0.5} />
            <Squiggle className="absolute left-0 -bottom-3 w-full h-[18px]" color={color} />
          </div>
          <Stagger className="mt-7">
            <Item as="p" className="hand text-[clamp(22px,3vw,30px)] text-link m-0">{d.hand}</Item>
            <Item as="p" className="kp text-[18px] mt-3 mb-0">{d.line}<br /><span className="text-muted">{d.sub}</span></Item>
            <Item className="flex flex-wrap gap-3 mt-8">
              <button type="button" className="btn primary" data-cursor="查詢" onClick={() => scrollToId('apply')}>
                查詢全台分校 <Icon name="arrow" size={18} />
              </button>
              <button type="button" className="btn ghost" data-cursor="往下" onClick={() => scrollToId('what')}>看課程大綱</button>
            </Item>
            <Item className="flex flex-wrap gap-x-4 gap-y-1 mt-6 text-[14px] font-bold text-muted">
              {d.tags.map((t) => <span key={t} className="flex items-center gap-1"><Icon name="check" size={16} className="text-brand" />{t}</span>)}
            </Item>
          </Stagger>
        </div>
        <motion.div initial={{ opacity: 0, rotate: 3, y: 30 }} animate={{ opacity: 1, rotate: 1.2, y: 0 }} transition={{ delay: 0.6, duration: 0.7, ease: [0.2, 0.7, 0.2, 1] }}>
          <TiltCard max={6}>
            <div className="card plain !p-3" style={{ borderColor: color }}>
              <div className="overflow-hidden" style={{ borderRadius: 'var(--wob)' }}>
                <motion.img src={d.img} alt={d.imgAlt} className="w-full h-[280px] md:h-[380px] object-cover block" style={{ y: imgY, scale: 1.15 }} />
              </div>
            </div>
          </TiltCard>
        </motion.div>
      </div>
    </header>
  )
}

function Why({ d, color }) {
  const maxK = Math.max(...d.salary.map((s) => s.max))
  const bars = d.attack ?? d.compare
  const maxBar = bars && Math.max(...bars.bars.map((b) => b.num))
  return (
    <MotionConfig reducedMotion="never">
    <Section id="why" no="01" label="為什麼要學？" title={d.title} sub={<>{d.lead}。<mark className="hl">{d.hl ?? '企業正在搶有證照的實戰人才。'}</mark></>}>
      <Stagger className="grid gap-[18px] md:grid-cols-3">
        {d.stats.map((s, i) => (
          <Item key={s.tag}>
            <TiltCard className="h-full">
              <div className="card card-hover h-full" style={{ '--c': i === 2 ? 'var(--color-gold)' : color }}>
                <span className="chip ink">{s.tag}</span>
                <p className="mt-4 mb-0 text-[14px] font-bold text-muted">{s.kicker}</p>
                <p className="m-0 flex items-baseline gap-2">
                  <span className="font-mono font-bold text-[52px] leading-[1.1] tabular-nums"><CountUp to={s.num} decimals={s.decimals} /></span>
                  <span className="font-bold">{s.unit}</span>
                </p>
                <p className="mt-2 mb-0 text-[15px] text-muted">{s.desc}</p>
              </div>
            </TiltCard>
          </Item>
        ))}
      </Stagger>

      <div className="grid gap-[18px] lg:grid-cols-[1.1fr_.9fr] mt-10">
        <div className="soft p-5 md:p-7">
          <h3 className="text-[24px]">{ph(bars.title)}</h3>
          <p className="note mt-2 mb-6">{bars.sub}</p>
          <div className="flex items-end gap-6 h-[220px] px-2 border-b-2 border-ink">
            {bars.bars.map((b) => (
              <div key={b.name} className="flex-1 h-full flex flex-col justify-end items-center gap-2">
                <span className="font-mono font-bold text-[18px]"><CountUp to={b.num} /></span>
                <motion.div className="w-full max-w-[90px] border-2 border-ink border-b-0"
                  style={{ background: b.hot ? color : 'var(--color-rule)', borderRadius: '10px 6px 0 0', originY: 1 }}
                  initial={{ height: 0 }} whileInView={{ height: `${(b.num / maxBar) * 150}px` }} viewport={{ once: true }}
                  transition={{ duration: 1, ease: [0.2, 0.7, 0.2, 1] }} data-cursor={b.name} />
              </div>
            ))}
          </div>
          <div className="flex gap-6 px-2 mt-2">
            {bars.bars.map((b) => <span key={b.name} className="flex-1 text-center font-bold text-[14px]">{b.name}</span>)}
          </div>
          <p className="note mt-3 mb-0 text-right">單位：{bars.unit}</p>
        </div>
        <Stagger className="grid gap-3">
          {d.facts.map((f) => (
            <Item key={f.title} className="soft !shadow-none p-4 grid grid-cols-[96px_1fr] gap-3 items-center">
              <span className="font-mono font-bold text-[30px] leading-none text-center">{f.num}</span>
              <span><b className="block">{f.title}</b><span className="text-[14px] text-muted">{f.text}</span></span>
            </Item>
          ))}
        </Stagger>
      </div>

      {d.quote && (
        <motion.blockquote className="m-0 mt-10 text-center" initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
          <p className="hand text-[clamp(26px,4vw,40px)] m-0">「{d.quote.text}」</p>
          <footer className="mt-2 text-[14px] font-bold text-muted">— {d.quote.by}</footer>
        </motion.blockquote>
      )}

      {d.law && (
        <div className="grid gap-[18px] md:grid-cols-[1.4fr_1fr] mt-[18px]">
          <div className="card" style={{ '--c': 'var(--color-violet)' }}>
            <h3 className="text-[22px] mb-3">{ph(d.law.title)}</h3>
            <ul className="m-0 pl-5 grid gap-1 text-[15px]">{d.law.items.map((t) => <li key={t}>{t}</li>)}</ul>
          </div>
          <div className="card" style={{ '--c': 'var(--color-gold)' }}>
            <h3 className="text-[22px] mb-3">哪些產業在找資安人才？</h3>
            <div className="flex flex-wrap gap-2">
              {d.industries.map((t) => <motion.span key={t} className="chip-btn !text-[14px]" whileHover={{ y: -3, rotate: -2 }} data-cursor="徵才中">{t}</motion.span>)}
            </div>
          </div>
        </div>
      )}

      {d.axes && (
        <div className="mt-10">
          <h3 className="text-[26px]">{ph(d.axes.title)}</h3>
          <p className="sub !mb-5">{d.axes.sub}</p>
          <Stagger className={`grid gap-[18px] ${d.axes.list.length === 3 ? 'md:grid-cols-3' : 'md:grid-cols-2'}`}>
            {d.axes.list.map((a, i) => (
              <Item key={a.name}>
                <TiltCard className="h-full" max={6}>
                  <div className="card card-hover h-full" style={{ '--c': i ? 'var(--color-brand)' : color }}>
                    <h4 className="text-[26px]">{ph(a.name)}</h4>
                    <div className="flex flex-wrap gap-2 mt-3">{a.items.map((t) => <span key={t} className="chip">{t}</span>)}</div>
                  </div>
                </TiltCard>
              </Item>
            ))}
          </Stagger>
          <p className="note mt-3 mb-0">{d.axes.note}</p>
        </div>
      )}

      <div className="soft mt-10 p-5 md:p-7">
        <h3 className="text-[24px] mb-5">{ph(d.salaryTitle)}</h3>
        <div className="grid gap-3">
          {d.salary.map((s, i) => (
            <div key={`${s.role}-${i}`} className="grid gap-x-4 gap-y-1 items-center md:grid-cols-[190px_1fr]">
              <div className="font-bold text-[15px]">{s.role}{s.cert && <span className="block text-[12px] text-muted font-mono">{s.cert}</span>}</div>
              <motion.div className="relative h-[30px] bg-rule/60 rounded-full overflow-hidden"
                initial="off" whileInView="on" viewport={{ once: true, amount: 1 }}>
                <motion.div className="absolute inset-y-0 left-0 rounded-full flex items-center justify-end pr-3"
                  style={{ background: s.top ? 'var(--color-gold)' : 'var(--color-brand)' }}
                  variants={{ off: { width: '0%' }, on: { width: `${(s.max / maxK) * 100}%`, transition: { duration: 1.2, delay: 0.1 + i * 0.12, ease: [0.2, 0.7, 0.2, 1] } } }}>
                  <span className="font-mono font-bold text-[13px] whitespace-nowrap" style={{ color: s.top ? '#1a1400' : '#06201C' }}>{s.label ?? `${s.min}–${s.max}K`}</span>
                </motion.div>
              </motion.div>
            </div>
          ))}
        </div>
        <p className="note mt-4 mb-0">{d.salaryNote}</p>
      </div>

      {d.gigs && (
        <div className="soft mt-10 p-5 md:p-7">
          <h3 className="text-[24px] mb-2">{ph(d.gigs.title)}</h3>
          <p className="sub !mb-5">{d.gigs.sub}</p>
          <Stagger className="grid gap-3" amount={0.2}>
            {d.gigs.list.map((s) => {
              const top = Math.max(...d.gigs.list.map((g) => g.max))
              return (
                <Item key={s.role} className="grid gap-x-4 gap-y-1 items-center md:grid-cols-[190px_1fr]">
                  <div className="font-bold text-[15px]">{s.role}</div>
                  <div className="relative h-[30px] bg-rule/60 rounded-full overflow-hidden">
                    <motion.div className="absolute inset-y-0 left-0 rounded-full flex items-center justify-end pr-3"
                      style={{ background: s.max === top ? 'var(--color-gold)' : 'var(--color-brand)' }}
                      initial={{ width: 0 }} whileInView={{ width: `${Math.max(s.max / top * 100, 18)}%` }} viewport={{ once: true }}
                      transition={{ duration: 0.9, ease: [0.2, 0.7, 0.2, 1] }}>
                      <span className="font-mono font-bold text-[13px] whitespace-nowrap" style={{ color: s.max === top ? '#1a1400' : '#06201C' }}>{s.label ?? `${s.min}–${s.max}K`}</span>
                    </motion.div>
                  </div>
                </Item>
              )
            })}
          </Stagger>
          <p className="note mt-4 mb-0">{d.gigs.note}</p>
        </div>
      )}

      {d.timelines && (
        <div className="mt-10">
          <h3 className="text-[26px]">{ph(d.timelines.title)}</h3>
          <p className="sub !mb-5">{d.timelines.sub}</p>
          <div className="grid gap-[18px]">
            {d.timelines.list.map((t) => (
              <div key={t.name} className="soft p-5 md:p-7" style={{ '--c': t.color }}>
                <h4 className="text-[22px] mb-5"><span className="chip ink !text-[13px] mr-2 align-middle font-sans">{t.code}</span>{t.name}</h4>
                <ol className="m-0 p-0 list-none grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-y-6">
                  {t.steps.map((st, i) => (
                    <motion.li key={st.label} className="relative text-center"
                      initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.6 }}
                      transition={{ duration: 0.5, delay: i * 0.1 }}>
                      <span className={`inline-block rounded-full px-3 py-1 font-bold text-[14px] text-white ${st.when ? '' : 'invisible'}`} style={{ background: t.color }}>{st.when || '—'}</span>
                      <div className="relative my-3 h-[6px]" style={{ background: t.color, opacity: 0.35 + i * 0.13 }}>
                        <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[14px] h-[14px] rounded-full border-2 border-ink bg-paper" />
                      </div>
                      <span className="block font-bold text-[15px] whitespace-pre-line">{st.label}</span>
                    </motion.li>
                  ))}
                </ol>
              </div>
            ))}
          </div>
          {d.timelines.note && <p className="note mt-3 mb-0">{d.timelines.note}</p>}
        </div>
      )}

      {d.rates && (
        <div className="mt-10">
          <h3 className="text-[26px]">{ph(d.rates.title)}</h3>
          <p className="sub !mb-5">{d.rates.sub}</p>
          <div className={`grid gap-[18px] ${d.rates.tables.length > 1 ? 'md:grid-cols-2' : ''}`}>
            {d.rates.tables.map((t) => (
              <div key={t.cols.join()} className="soft p-5 overflow-x-auto">
                {t.cols[0] === '' && (
                  <div className="md:hidden grid gap-4">
                    {t.rows.map((r) => (
                      <div key={r[0]} className="border-b border-rule pb-3">
                        <b className="block text-[16px] mb-1">{r[0]}</b>
                        {r.slice(1).map((v, i) => (
                          <p key={i} className="m-0 mt-1 text-[15px]"><span className="text-muted text-[13px] font-bold block">{t.cols[i + 1]}</span>{v}</p>
                        ))}
                      </div>
                    ))}
                  </div>
                )}
                <table className={`w-full text-[15px] border-collapse ${t.cols[0] === '' ? 'hidden md:table' : ''}`}>
                  <thead>
                    <tr className="border-b-2 border-ink">{t.cols.map((c) => <th key={c} className="py-2 px-2 text-left font-bold">{c}</th>)}</tr>
                  </thead>
                  <tbody>
                    {t.rows.map((r) => (
                      <tr key={r[0]} className="border-b border-rule">
                        {r.map((v, i) => <td key={i} className={`py-2 px-2 cell ${i ? (t.cols.length > 2 && t.cols[0] === '' ? '' : 'font-mono') : 'font-bold whitespace-nowrap'}`}>{v}</td>)}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ))}
          </div>
          {d.rates.note && <p className="note mt-3 mb-0">{d.rates.note}</p>}
        </div>
      )}
    </Section>
    </MotionConfig>
  )
}

function Who({ d, color }) {
  return (
    <Section id="who" no="02" label="適合誰學習？" title={d.title} sub={d.sub}>
      <Stagger className={`grid gap-[18px] sm:grid-cols-2 ${d.cards.length === 3 ? 'lg:grid-cols-3' : 'lg:grid-cols-4'}`}>
        {d.cards.map((c, i) => (
          <Item key={c.title}>
            <TiltCard className="h-full" max={10}>
              <div className="card card-hover h-full flex flex-col" style={{ '--c': [color, 'var(--color-brand)', 'var(--color-violet)', 'var(--color-gold)'][i] }} data-cursor="就是我">
                <motion.div className="w-[64px] h-[64px] grid place-items-center bg-paper border-2 border-ink"
                  style={{ borderRadius: '50% 44% 52% 46% / 46% 52% 44% 50%', boxShadow: '3px 3px 0 var(--color-ink)' }}
                  whileHover={{ rotate: [0, -10, 8, 0] }}>
                  <Icon name={c.icon} size={34} className="text-link" />
                </motion.div>
                <h3 className="text-[26px] mt-4">{ph(c.title)}</h3>
                <p className="m-0 mt-1 text-[14px] font-bold text-muted">{c.pain}</p>
                <p className="m-0 mt-3 text-[15px] flex-1">{c.say}</p>
                <p className="m-0 mt-4 text-[12px] font-extrabold text-link">推薦課程</p>
                <div className="flex flex-wrap gap-1.5 mt-1">{c.certs.map((t) => <span key={t} className="chip !text-[12px]">{t}</span>)}</div>
              </div>
            </TiltCard>
          </Item>
        ))}
      </Stagger>
      {d.roles && (
        <div className="soft mt-10 p-5 md:p-7">
          <h3 className="text-[24px] mb-4">{ph(d.rolesTitle)}</h3>
          <div className="flex flex-wrap gap-2">
            {d.roles.map((t) => <motion.span key={t} className="chip-btn !text-[14px]" whileHover={{ y: -3, rotate: -2 }} data-cursor="用得上">{t}</motion.span>)}
          </div>
        </div>
      )}
    </Section>
  )
}

function What({ d }) {
  const [track, setTrack] = useState('all')
  const mods = d.modules.filter((m) => track === 'all' || m.track === track)
  const trackName = (id) => d.tracks.find((t) => t.id === id).name
  const modColor = (m) => m.color ?? (m.track === 'mgmt' ? 'var(--color-violet)' : m.track === 'pre' ? 'var(--color-gold)' : 'var(--color-red)')
  return (
    <Section id="what" no="03" label="學什麼內容？" title={d.title} sub={d.sub}>
      {d.tracks && <div className="tabs mb-7" role="tablist" aria-label="課程路線">
        {[{ id: 'all', name: '全部模組' }, ...d.tracks].map((t) => (
          <button key={t.id} type="button" role="tab" aria-selected={track === t.id} onClick={() => setTrack(t.id)} data-cursor="切換">
            {t.name} <span className="font-mono opacity-70">{t.id === 'all' ? d.modules.length : d.modules.filter((m) => m.track === t.id).length}</span>
          </button>
        ))}
      </div>}
      <motion.div layout className="grid gap-[18px] lg:grid-cols-2">
        <AnimatePresence mode="popLayout">
          {mods.map((m, i) => (
            <motion.article key={m.id} layout className="card !p-0 overflow-hidden"
              style={{ '--c': modColor(m) }}
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0, transition: { delay: i * 0.05 } }} exit={{ opacity: 0, scale: 0.95 }}>
              <div className={`grid gap-4 p-5 pl-7 items-center ${m.img ? 'grid-cols-[110px_1fr] sm:grid-cols-[150px_1fr]' : ''}`}>
                {m.img && <img src={m.img} alt="" className="w-full h-[80px] sm:h-[96px] object-cover" style={{ borderRadius: 'var(--wob)' }} loading="lazy" />}
                <div>
                  {m.track && <span className="flex flex-wrap gap-1.5">
                    <span className="chip ink !text-[12px]">{trackName(m.track)}</span>
                    <span className="chip !text-[12px]">{m.level}</span>
                    <span className="chip gold !text-[12px] font-mono">{m.hours} 小時</span>
                    <span className="chip !text-[12px]" style={m.mode === '實體課程' ? { background: 'var(--color-ink)', color: 'var(--color-paper)' } : undefined}>{m.mode}</span>
                  </span>}
                  <h3 className="text-[22px] sm:text-[24px] mt-2">{ph(m.name)}</h3>
                  <p className="m-0 text-[14px] font-bold">{m.tagline}</p>
                </div>
              </div>
              <div className="px-5 pl-7 pb-5">
                <p className="mt-0 mb-3 text-[15px] text-muted">{m.desc}</p>
                <p className="mt-0 mb-3 px-4 py-2 text-[15px] border-l-[5px] border-gold bg-gold/10" style={{ borderRadius: '0 12px 12px 0' }}>
                  <b>{d.analogyLabel ?? '一句話看懂：'}</b>{m.analogy}
                </p>
                <ul className="list-none p-0 mt-0 mb-4 grid gap-1 text-[14px]">
                  {m.highlights.map((h) => <li key={h} className="flex gap-2 items-start"><Icon name="star" size={16} className="text-gold shrink-0 mt-[5px]" />{h}</li>)}
                </ul>
                <p className="m-0 mb-2 text-[12px] font-extrabold text-link">課程大綱</p>
                {m.units.map((u) => (
                  <details key={u.t} className="mod">
                    <summary data-cursor="展開">{u.t}<span className="pm" aria-hidden="true">+</span></summary>
                    <ul className="m-0 pb-3 pr-4 pl-9 text-[15px] grid gap-1">
                      {u.items.map((it) => <li key={it}>{it}</li>)}
                    </ul>
                  </details>
                ))}
                {m.cert && <p className="mt-4 mb-0 flex items-center gap-2 text-[14px] font-bold">
                  <Icon name="badge" size={22} className="text-gold" />{m.track ? `取得：${m.cert}` : m.cert}
                </p>}
              </div>
            </motion.article>
          ))}
        </AnimatePresence>
      </motion.div>
      {d.certs && <CertWall d={d.certs} />}
      {d.teams && <Teams d={d.teams} />}
      {d.exams && <Exams d={d.exams} />}
    </Section>
  )
}

function CertWall({ d }) {
  return (
    <div className="mt-14">
      <h3 className="text-[28px]">{ph(d.title)}</h3>
      <p className="sub !mb-5">{d.sub}</p>
      <Stagger as="ol" className={`list-none p-0 m-0 grid gap-3 grid-cols-2 ${d.list.length === 6 ? 'lg:grid-cols-3' : d.list.length === 4 ? 'lg:grid-cols-4' : 'lg:grid-cols-5'}`} amount={0.1}>
        {d.list.map((c, i) => (
          <Item as="li" key={c.name}>
            <TiltCard className="h-full" max={10}>
              <div className="card card-hover h-full !pl-[24px]" style={{ '--c': ['var(--color-violet)', 'var(--color-gold)', 'var(--color-brand)', 'var(--color-red)'][i % 4] }} data-cursor="證照">
                <span className="font-mono font-bold text-[13px] text-muted">{String(i + 1).padStart(2, '0')}{c.org && `・${c.org}`}</span>
                <p className="m-0 mt-1 font-extrabold text-[15px] leading-snug">{ph(c.name)}</p>
              </div>
            </TiltCard>
          </Item>
        ))}
      </Stagger>
    </div>
  )
}

function Teams({ d }) {
  const [team, setTeam] = useState(d.list[0].id)
  const t = d.list.find((x) => x.id === team)
  return (
    <div className="mt-14">
      <h3 className="text-[28px]">{ph(d.title)}</h3>
      <p className="sub !mb-5">{d.sub}</p>
      <div className="tabs mb-5" role="tablist" aria-label="攻防角色">
        {d.list.map((x) => (
          <button key={x.id} type="button" role="tab" aria-selected={team === x.id} onClick={() => setTeam(x.id)} data-cursor="切換">{x.name}</button>
        ))}
      </div>
      <AnimatePresence mode="wait">
        <motion.div key={team} role="tabpanel" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.3 }}>
          <p className="hand text-[24px] m-0 mb-4" style={{ color: 'var(--color-link)' }}>比喻：{t.analogy}</p>
          <ol className={`list-none p-0 m-0 grid gap-3 sm:grid-cols-2 ${t.steps.length === 4 ? 'lg:grid-cols-4' : 'lg:grid-cols-3'}`}>
            {t.steps.map((st, i) => (
              <motion.li key={st.t} className="card !pl-[24px] relative" style={{ '--c': t.color }}
                initial={{ opacity: 0, y: 16, rotate: -2 }} animate={{ opacity: 1, y: 0, rotate: 0 }} transition={{ delay: i * 0.08 }}
                whileHover={{ y: -4, rotate: -1 }}>
                <span className="font-mono font-bold text-[13px] text-muted">STEP {i + 1}</span>
                <h4 className="text-[24px] mt-1">{ph(st.t)}</h4>
                <p className="m-0 mt-1 text-[14px] text-muted">{st.d}</p>
              </motion.li>
            ))}
          </ol>
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

function Exams({ d }) {
  return (
    <div className="mt-14">
      <h3 className="text-[28px] mb-4">{ph(d.title)}</h3>
      <div className="soft overflow-x-auto">
        <table className="w-full border-collapse text-[15px] min-w-[560px]">
          <thead>
            <tr className="text-left text-[13px] text-muted">
              {['證照', '考試時間', '考試費用', '考場', '有效期'].map((h) => <th key={h} className="px-4 py-3 border-b border-rule font-bold">{h}</th>)}
            </tr>
          </thead>
          <tbody>
            {d.rows.map((r) => (
              <tr key={r.name} className="hover:bg-gold/10 transition-colors">
                <td className="px-4 py-3 border-b border-rule font-extrabold whitespace-nowrap">{r.name}</td>
                <td className="px-4 py-3 border-b border-rule font-mono">{r.time} 分鐘</td>
                <td className="px-4 py-3 border-b border-rule font-mono">{r.fee}</td>
                <td className="px-4 py-3 border-b border-rule">{r.place}</td>
                <td className="px-4 py-3 border-b border-rule">{r.valid}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p className="note mt-3 mb-0">{d.note}</p>
    </div>
  )
}

function Node({ no, track, title, text, color, stacked = false }) {
  return (
    <div className={stacked ? 'grid gap-2 justify-items-start' : 'flex gap-3 items-start'}>
      <motion.span className="relative z-[1] shrink-0 w-[48px] h-[48px] grid place-items-center font-mono font-bold text-[16px] border-2 border-ink"
        style={{ background: color, borderRadius: '50% 44% 52% 46% / 46% 52% 44% 50%', boxShadow: '3px 3px 0 var(--color-ink)' }}
        whileHover={{ scale: 1.15, rotate: -8 }} data-cursor={track || no}>
        {no}
      </motion.span>
      <div className={`soft !shadow-none px-4 py-3 ${stacked ? 'w-full' : 'flex-1'}`}>
        {track && <span className="text-[12px] font-extrabold text-link">{track}</span>}
        <h3 className="text-[21px]">{ph(title)}</h3>
        <p className="m-0 mt-1 text-[14px] text-muted">{text}</p>
      </div>
    </div>
  )
}

function How({ d }) {
  return (
    <Section id="how" no="04" label="怎麼學？" title={d.title} sub={d.sub}>
      {d.chain ? (
        <Stagger className="grid gap-[18px] md:grid-cols-3">
          {d.chain.map((c, i) => (
            <Item key={c.title} className="relative">
              <TiltCard className="h-full" max={8}>
                <div className="card card-hover h-full" style={{ '--c': c.color }}>
                  <span className="font-mono font-bold text-[13px] text-muted">STEP {c.no}</span>
                  <p className="hand text-[40px] m-0 leading-tight">{ph(c.title)}</p>
                  <span className="chip ink !text-[12px] mt-1">{c.badge}</span>
                  <p className="m-0 mt-3 text-[15px] text-muted">{c.text}</p>
                </div>
              </TiltCard>
              {i < d.chain.length - 1 && <span aria-hidden="true" className="hidden md:grid absolute -right-[16px] top-1/2 -translate-y-1/2 z-[1] w-[30px] h-[30px] place-items-center rounded-full bg-ink text-paper"><Icon name="arrow" size={16} /></span>}
            </Item>
          ))}
        </Stagger>
      ) : (
      <div className="grid gap-6 lg:grid-cols-[280px_1fr] items-center">
        <Stagger>
          <Item><Node no="先修" track={d.start.track} title={d.start.title} text={d.start.text} color="var(--color-gold)" /></Item>
        </Stagger>
        <div className="grid gap-6 relative">
          <span aria-hidden="true" className="hidden lg:block absolute -left-[18px] top-[34px] bottom-[34px] border-l-[3px] border-dashed border-brand" />
          {d.lines.map((line) => (
            <div key={line.name} className="relative">
              <span aria-hidden="true" className="hidden lg:block absolute -left-[18px] top-[34px] w-[18px] border-t-[3px] border-dashed border-brand" />
              <p className="hand m-0 mb-2 text-[26px]" >
                <span className="inline-block w-3 h-3 rounded-full mr-2 align-middle" style={{ background: line.color }} />{line.name}
              </p>
              <Stagger as="ol" className={`list-none p-0 m-0 grid gap-3 md:grid-cols-2 xl:grid-cols-4`}>
                {line.steps.map((s, i) => (
                  <Item as="li" key={s.title} className="relative">
                    <Node stacked no={String(i + 1).padStart(2, '0')} track={`${s.hours} 小時`} title={s.title} text={s.text} color="var(--color-sheet)" />
                    {i < line.steps.length - 1 && <span aria-hidden="true" className="hidden xl:block absolute -right-[11px] top-[10px] text-brand font-bold">→</span>}
                  </Item>
                ))}
              </Stagger>
            </div>
          ))}
        </div>
      </div>
      )}
      <p className="mt-8 mb-0 text-[17px]"><mark className="hl">{d.practice}</mark></p>

      <div className="mt-14">
        <h3 className="text-[26px] mb-5">{ph(d.services.title)}</h3>
        <Stagger className="grid gap-[18px] md:grid-cols-3">
          {d.services.phases.map((p, i) => (
            <Item key={p.name} className="relative">
              <div className="card h-full" style={{ '--c': ['var(--color-brand)', 'var(--color-gold)', 'var(--color-red)'][i] }}>
                <p className="hand text-[30px] m-0 text-link">{ph(p.name)}</p>
                <ul className="list-none p-0 mt-2 mb-0 grid gap-1">
                  {p.items.map((it) => <li key={it} className="flex gap-2 items-start"><Icon name="check" size={18} className="text-brand shrink-0 mt-[5px]" />{it}</li>)}
                </ul>
              </div>
              {i < 2 && <span aria-hidden="true" className="hidden md:grid absolute -right-[16px] top-1/2 -translate-y-1/2 z-[1] w-[30px] h-[30px] place-items-center rounded-full bg-ink text-paper"><Icon name="arrow" size={16} /></span>}
            </Item>
          ))}
        </Stagger>
      </div>

      {d.partner && (
        <div className="mt-14">
          <h3 className="text-[26px]">{ph(d.partner.title)}</h3>
          <p className="sub !mb-5">{d.partner.sub}</p>
          <div className="card grid gap-5 md:grid-cols-[1.2fr_1fr]" style={{ '--c': 'var(--color-gold)' }}>
            <div>
              <span className="chip ink !text-[12px]">合作企業</span>
              <h4 className="text-[26px] mt-2">{ph(d.partner.name)}</h4>
              <p className="m-0 mt-2 text-[15px] text-muted">{d.partner.intro}</p>
            </div>
            <div className="grid gap-3 content-start">
              <div><p className="m-0 mb-1 text-[12px] font-extrabold text-link">徵才職缺</p>
                <div className="flex flex-wrap gap-1.5">{d.partner.jobs.map((t) => <span key={t} className="chip">{t}</span>)}</div></div>
              <div><p className="m-0 mb-1 text-[12px] font-extrabold text-link">員工福利</p>
                <div className="flex flex-wrap gap-1.5">{d.partner.perks.map((t) => <span key={t} className="chip !text-[12px]">{t}</span>)}</div></div>
            </div>
          </div>
          <p className="note mt-3 mb-0">{d.partner.note}</p>
        </div>
      )}

      {d.aiTools && (
        <div className="soft mt-[18px] p-5 md:p-6 grid gap-4 md:grid-cols-[auto_1fr] items-center">
          <p className="m-0 flex items-baseline gap-3">
            <span className="font-mono font-bold text-[56px] leading-none">0</span>
            <span className="hand text-[26px]">{ph(d.aiTools.title)}</span>
          </p>
          <div className="flex flex-wrap gap-2 md:justify-end">
            {d.aiTools.items.map((t) => <span key={t} className="chip"><Icon name="bot" size={16} className="text-link" />{t}</span>)}
          </div>
        </div>
      )}

      {d.jobs && (
        <div className="mt-14">
          <h3 className="text-[26px] mb-5">{ph(d.jobs.title)}</h3>
          <Stagger className="grid gap-3 grid-cols-2 md:grid-cols-5">
            {d.jobs.stats.map((j) => (
              <Item key={j.label} className="soft !shadow-none p-4 text-center">
                <p className="m-0 text-[13px] font-bold text-muted">{j.label}</p>
                <p className="m-0 mt-1"><span className="font-mono font-bold text-[34px] tabular-nums"><CountUp to={j.num} /></span> <span className="font-bold">{j.unit}</span></p>
              </Item>
            ))}
          </Stagger>
          <p className="note mt-3 mb-0">{d.jobs.note}</p>
        </div>
      )}
    </Section>
  )
}
function Format({ d }) {
  return (
    <Section id="format" no="05" label="上課方式" title={d.title} sub={d.sub}>
      <Stagger className={`grid gap-3 grid-cols-2 ${d.systems.length === 5 ? 'md:grid-cols-5' : 'md:grid-cols-4'}`}>
        {d.systems.map((s, i) => (
          <Item key={s.name}>
            <TiltCard className="h-full" max={10}>
              <div className="soft h-full p-4">
                <span className="font-mono font-bold text-[13px] w-7 h-7 rounded-full bg-ink text-paper inline-grid place-items-center">{i + 1}</span>
                <h4 className="text-[22px] mt-2">{ph(s.name)}</h4>
                <p className="m-0 text-[14px] text-muted">{s.text}</p>
              </div>
            </TiltCard>
          </Item>
        ))}
      </Stagger>

      <Stagger className="grid gap-4 md:grid-cols-[1fr_auto_1fr_auto_1fr] items-center mt-10">
        {d.coach.map((c, i) => [
          <Item key={c.name}>
            <div className="card h-full" style={{ '--c': i === 2 ? 'var(--color-red)' : 'var(--color-brand)' }}>
              <div className="flex items-center gap-3">
                <span className="w-12 h-12 grid place-items-center rounded-full border-2 border-ink bg-paper">
                  <Icon name={c.icon ?? ['user', 'bot', 'star'][i]} size={28} className="text-link" />
                </span>
                <div>
                  <h4 className="text-[24px]">{ph(c.name)}</h4>
                  <p className="m-0 text-[14px] font-bold text-muted">{c.sub}</p>
                </div>
              </div>
              <ul className="mt-3 mb-0 pl-5 text-[15px]">{c.points.map((p) => <li key={p}>{p}</li>)}</ul>
            </div>
          </Item>,
          i < 2 && <Item key={c.name + '-op'} as="span" aria-hidden="true" className="hand text-[40px] text-center text-brand leading-none">{i === 0 ? '＋' : '→'}</Item>,
        ])}
      </Stagger>

      {d.guarantee && <div className="mt-10">
        <h3 className="text-[26px] mb-4">{ph(d.guarantee.title)}</h3>
        <Stagger className="grid gap-[18px] sm:grid-cols-2 lg:grid-cols-4">
          {d.guarantee.items.map((g) => (
            <Item key={g.t}>
              <TiltCard className="h-full" max={8}>
                <div className="card card-hover h-full" style={{ '--c': 'var(--color-brand)' }}>
                  <Icon name={g.icon} size={34} className="text-link" />
                  <h4 className="text-[22px] mt-2">{ph(g.t)}</h4>
                  <p className="m-0 mt-1 text-[14px] text-muted">{g.d}</p>
                </div>
              </TiltCard>
            </Item>
          ))}
        </Stagger>
      </div>}

      <div className={`grid gap-[18px] mt-10 items-stretch ${d.perks ? 'md:grid-cols-[1.4fr_1fr]' : ''}`}>
        {d.perks && <div className="soft p-5 md:p-6">
          <h4 className="text-[22px] mb-3">培訓優勢：線上真人，即時指導</h4>
          <ul className="list-none p-0 m-0 grid gap-2 sm:grid-cols-2">
            {d.perks.map((p) => <li key={p} className="flex gap-2 items-center"><Icon name="check" size={18} className="text-brand shrink-0" />{p}</li>)}
          </ul>
        </div>}
        <motion.div className="card plain grid place-items-center text-center bg-gold!" style={{ borderColor: 'var(--color-ink)' }}
          whileHover={{ rotate: -1.5, scale: 1.02 }} data-cursor="24hr">
          <div>
            <p className="font-mono font-bold text-[56px] leading-none m-0">24<span className="text-[24px]">hr</span></p>
            <p className="hand text-[24px] m-0 mt-2">{ph(d.upgrade)}</p>
          </div>
        </motion.div>
      </div>
    </Section>
  )
}

function Teacher({ d }) {
  return (
    <Section id="teacher" label={d.label ?? '師資介紹'} title={d.title} sub={d.sub}>
      <Stagger className="grid gap-[18px] md:grid-cols-3">
        {d.traits.map((t) => (
          <Item key={t.title}>
            <TiltCard className="h-full">
              <div className="card card-hover h-full" style={{ '--c': 'var(--color-violet)' }}>
                <Icon name={t.icon} size={36} className="text-link" />
                <h3 className="text-[24px] mt-2">{ph(t.title)}</h3>
                <p className="mt-1 mb-0 text-muted">{t.text}</p>
              </div>
            </TiltCard>
          </Item>
        ))}
      </Stagger>
    </Section>
  )
}

function Works({ list }) {
  const [more, setMore] = useState(false)
  const shown = more ? list : list.slice(0, 8)
  return (
    <Section id="works" label="學員作品" title="看看學長姐做出了什麼" sub="課程中完成的實戰作品，點擊可看完整作品介紹。">
      <ul className="m-0 p-0 list-none grid gap-[18px] grid-cols-2 lg:grid-cols-4">
        {shown.map((w) => (
          <li key={w.img}>
            <a href={w.href} target="_blank" rel="noopener noreferrer" className="soft card-hover block h-full overflow-hidden no-underline text-ink" data-cursor="看作品">
              <img src={import.meta.env.BASE_URL + w.img} alt={w.t} loading="lazy" className="block w-full aspect-[4/3] object-cover border-b-2 border-ink" />
              <p className="m-0 px-3 py-2.5 font-bold text-[15px] leading-snug">{w.t}</p>
            </a>
          </li>
        ))}
      </ul>
      {list.length > 8 && (
        <div className="mt-6 text-center">
          <button type="button" className="btn ghost" onClick={() => setMore(!more)} data-cursor={more ? '收合' : '展開'}>
            {more ? '收合作品' : `看全部 ${list.length} 件作品`}
          </button>
        </div>
      )}
    </Section>
  )
}

function Videos({ list }) {
  return (
    <Section id="videos" label="就業影片" title="聽學長姐說轉職故事" sub="成功就業的學員現身分享，點擊即可播放。">
      <VideoGrid list={list} />
    </Section>
  )
}

// 近三個月內開課的班級（以瀏覽當天計算）
function upcoming(slug) {
  const now = new Date(); now.setHours(0, 0, 0, 0)
  const until = new Date(now); until.setMonth(until.getMonth() + 3)
  return (classes[slug] || []).filter((c) => { const d = new Date(c.start); return d >= now && d <= until })
}

function Classes({ list }) {
  const md = (s) => s.slice(5).replace('/', '/')
  return (
    <Section id="classes" label="近期開班" title="最近一期什麼時候開？" sub={<>以下為近三個月內開課的<strong style={{ color: 'var(--color-gold)' }}>線上直播班級</strong>，皆有錄影可複習，實際開課資訊以分校公告為準。</>}>
      <ul className="m-0 p-0 list-none grid gap-3">
        {list.map((c, i) => (
          <li key={i} className="soft !shadow-none px-4 py-3 md:px-5 grid gap-x-6 gap-y-1 md:grid-cols-[170px_1fr_auto] md:items-center">
            <span className="font-mono font-bold text-link text-[18px]">{md(c.start)}<span className="text-muted text-[14px] font-normal"> ~ {md(c.end)}</span></span>
            <span className="font-bold">{c.name}</span>
            <span className="text-[14px] text-muted">{c.slot}・{c.time}・{c.hours} 小時{c.branch && `・${c.branch}開班`}</span>
          </li>
        ))}
      </ul>
    </Section>
  )
}

function Faq({ items }) {
  const [open, setOpen] = useState(0)
  return (
    <Section id="faq" label="常見問題" title="報名前，你可能想問">
      <div className="grid gap-3 max-w-[860px]">
        {items.map((f, i) => {
          const isOpen = open === i
          return (
            <div key={f.q} className="soft !shadow-none overflow-hidden" style={isOpen ? { borderColor: 'var(--color-brand)', boxShadow: 'var(--shadow-sk)' } : undefined}>
              <h3 className="m-0 text-[23px]">
                <button type="button" aria-expanded={isOpen} aria-controls={`faq-${i}`} id={`faq-q-${i}`} onClick={() => setOpen(isOpen ? -1 : i)}
                  className="w-full flex items-center justify-between gap-4 text-left bg-transparent border-0 px-5 py-4 font-[inherit] text-ink" data-cursor={isOpen ? '收合' : '展開'}>
                  <span className="flex gap-3"><span className="font-mono text-link">Q{i + 1}</span>{f.q}</span>
                  <motion.span animate={{ rotate: isOpen ? 45 : 0 }} className="text-link text-[24px] leading-none shrink-0" aria-hidden="true">+</motion.span>
                </button>
              </h3>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div id={`faq-${i}`} role="region" aria-labelledby={`faq-q-${i}`}
                    initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.2, 0.7, 0.2, 1] }}>
                    <p className="m-0 px-5 pb-5 pl-[52px] text-[15px] border-l-[5px] border-brand ml-5">{f.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          )
        })}
      </div>
    </Section>
  )
}

export default function CoursePage() {
  const { slug } = useParams()
  const c = courses[slug]
  if (!c) return <Navigate to="/" replace />
  return (
    <>
      <Nav back links={navLinks(!!works[slug], !!videos[slug], upcoming(slug).length > 0, !!know[slug])} />
      <Hero d={c.hero} color={c.color} />
      <Why d={c.why} color={c.color} />
      <Who d={c.who} color={c.color} />
      <What d={c.what} />
      <How d={c.how} />
      <Format d={c.format} />
      <Teacher d={c.teacher} />
      {know[slug] && <Know d={know[slug]} color={c.color} />}
      {works[slug] && <Works list={works[slug]} />}
      {videos[slug] && <Videos list={videos[slug]} />}
      {upcoming(slug).length > 0 && <Classes list={upcoming(slug)} />}
      <Faq items={c.faq} />
      <ApplyCta courseName={c.hero.title} />
      <Footer />
    </>
  )
}
