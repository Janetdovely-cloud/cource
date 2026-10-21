import { useState } from 'react'
import { useParams, Navigate } from 'react-router-dom'
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react'
import { Nav, Footer, scrollToId } from '../components/Layout'
import { Section, Stagger, Item, TiltCard, CountUp, SplitTitle, Squiggle, Doodles } from '../components/Motion'
import Icon from '../components/Icon'
import ApplyCta from '../components/ApplyCta'
import { courses } from '../data/courses'

const navLinks = [
  { id: 'why', name: '為什麼學' }, { id: 'who', name: '適合誰' }, { id: 'what', name: '學什麼' },
  { id: 'how', name: '怎麼學' }, { id: 'format', name: '上課方式' }, { id: 'teacher', name: '師資' },
  { id: 'faq', name: 'FAQ' }, { id: 'apply', name: '報名' },
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
            <SplitTitle text={d.title} className="text-[clamp(44px,7.4vw,84px)] leading-[1.1] mt-1" delay={0.5} />
            <Squiggle className="absolute left-0 -bottom-3 w-full h-[18px]" color={color} />
          </div>
          <Stagger className="mt-7">
            <Item as="p" className="hand text-[clamp(22px,3vw,30px)] text-link m-0">{d.hand}</Item>
            <Item as="p" className="text-[18px] mt-3 mb-0">{d.line}<br /><span className="text-muted">{d.sub}</span></Item>
            <Item className="flex flex-wrap gap-3 mt-8">
              <button type="button" className="btn primary" data-cursor="報名！" onClick={() => scrollToId('apply')}>
                立即報名 <Icon name="arrow" size={18} />
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
                <motion.img src={d.img} alt="資安防護示意圖：盾牌與鎖頭的數位介面" className="w-full h-[280px] md:h-[380px] object-cover block" style={{ y: imgY, scale: 1.15 }} />
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
  return (
    <Section id="why" no="01" label="為什麼要學？" title={d.title} sub={<>{d.lead}。<mark className="hl">企業正在搶有證照的實戰人才。</mark></>}>
      <Stagger className="grid gap-[18px] md:grid-cols-3">
        {d.stats.map((s, i) => (
          <Item key={s.tag}>
            <TiltCard className="h-full">
              <div className="card card-hover h-full" style={{ '--c': i === 2 ? 'var(--color-gold)' : color }}>
                <span className="chip ink">{s.tag}</span>
                <p className="mt-4 mb-0 text-[14px] font-bold text-muted">{s.kicker}</p>
                <p className="m-0 flex items-baseline gap-2">
                  <span className="font-mono font-bold text-[52px] leading-[1.1] tabular-nums"><CountUp to={s.num} /></span>
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
          <h3 className="text-[24px]">{d.attack.title}</h3>
          <p className="note mt-2 mb-6">{d.attack.sub}</p>
          <div className="flex items-end gap-6 h-[220px] px-2 border-b-2 border-ink">
            {d.attack.bars.map((b) => (
              <div key={b.name} className="flex-1 h-full flex flex-col justify-end items-center gap-2">
                <span className="font-mono font-bold text-[18px]"><CountUp to={b.num} /></span>
                <motion.div className="w-full max-w-[90px] border-2 border-ink border-b-0"
                  style={{ background: b.hot ? 'var(--color-red)' : 'var(--color-rule)', borderRadius: '10px 6px 0 0', originY: 1 }}
                  initial={{ height: 0 }} whileInView={{ height: `${(b.num / d.attack.bars[0].num) * 150}px` }} viewport={{ once: true }}
                  transition={{ duration: 1, ease: [0.2, 0.7, 0.2, 1] }} data-cursor={b.name} />
              </div>
            ))}
          </div>
          <div className="flex gap-6 px-2 mt-2">
            {d.attack.bars.map((b) => <span key={b.name} className="flex-1 text-center font-bold text-[14px]">{b.name}</span>)}
          </div>
          <p className="note mt-3 mb-0 text-right">單位：{d.attack.unit}</p>
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

      <div className="grid gap-[18px] md:grid-cols-[1.4fr_1fr] mt-[18px]">
        <div className="card" style={{ '--c': 'var(--color-violet)' }}>
          <h3 className="text-[22px] mb-3">{d.law.title}</h3>
          <ul className="m-0 pl-5 grid gap-1 text-[15px]">{d.law.items.map((t) => <li key={t}>{t}</li>)}</ul>
        </div>
        <div className="card" style={{ '--c': 'var(--color-gold)' }}>
          <h3 className="text-[22px] mb-3">哪些產業在找資安人才？</h3>
          <div className="flex flex-wrap gap-2">
            {d.industries.map((t) => <motion.span key={t} className="chip-btn !text-[14px]" whileHover={{ y: -3, rotate: -2 }} data-cursor="徵才中">{t}</motion.span>)}
          </div>
        </div>
      </div>

      <div className="soft mt-10 p-5 md:p-7">
        <h3 className="text-[24px] mb-5">{d.salaryTitle}</h3>
        <Stagger className="grid gap-3" amount={0.2}>
          {d.salary.map((s) => (
            <Item key={s.role} className="grid gap-x-4 gap-y-1 items-center md:grid-cols-[150px_1fr]">
              <div className="font-bold text-[15px]">{s.role}<span className="block text-[12px] text-muted font-mono">{s.cert}</span></div>
              <div className="relative h-[30px] bg-rule/60 rounded-full overflow-hidden">
                <motion.div className="absolute inset-y-0 left-0 rounded-full flex items-center justify-end pr-3"
                  style={{ background: s.top ? 'var(--color-gold)' : 'var(--color-brand)' }}
                  initial={{ width: 0 }} whileInView={{ width: `${(s.max / maxK) * 100}%` }} viewport={{ once: true }}
                  transition={{ duration: 0.9, ease: [0.2, 0.7, 0.2, 1] }}>
                  <span className="font-mono font-bold text-[13px] whitespace-nowrap" style={{ color: s.top ? '#1a1400' : '#06201C' }}>{s.min}–{s.max}K</span>
                </motion.div>
              </div>
            </Item>
          ))}
        </Stagger>
        <p className="note mt-4 mb-0">{d.salaryNote}</p>
      </div>
    </Section>
  )
}

function Who({ d, color }) {
  return (
    <Section id="who" no="02" label="適合誰學習？" title={d.title} sub={d.sub}>
      <Stagger className="grid gap-[18px] sm:grid-cols-2 lg:grid-cols-4">
        {d.cards.map((c, i) => (
          <Item key={c.title}>
            <TiltCard className="h-full" max={10}>
              <div className="card card-hover h-full flex flex-col" style={{ '--c': [color, 'var(--color-brand)', 'var(--color-violet)', 'var(--color-gold)'][i] }} data-cursor="就是我">
                <motion.div className="w-[64px] h-[64px] grid place-items-center bg-paper border-2 border-ink"
                  style={{ borderRadius: '50% 44% 52% 46% / 46% 52% 44% 50%', boxShadow: '3px 3px 0 var(--color-ink)' }}
                  whileHover={{ rotate: [0, -10, 8, 0] }}>
                  <Icon name={c.icon} size={34} className="text-link" />
                </motion.div>
                <h3 className="text-[26px] mt-4">{c.title}</h3>
                <p className="m-0 mt-1 text-[14px] font-bold text-muted">{c.pain}</p>
                <p className="m-0 mt-3 text-[15px] flex-1">{c.say}</p>
                <p className="m-0 mt-4 text-[12px] font-extrabold text-link">推薦證照</p>
                <div className="flex flex-wrap gap-1.5 mt-1">{c.certs.map((t) => <span key={t} className="chip !text-[12px]">{t}</span>)}</div>
              </div>
            </TiltCard>
          </Item>
        ))}
      </Stagger>
    </Section>
  )
}

function What({ d }) {
  const [track, setTrack] = useState('all')
  const mods = d.modules.filter((m) => track === 'all' || m.track === track)
  const trackName = (id) => d.tracks.find((t) => t.id === id).name
  return (
    <Section id="what" no="03" label="學什麼內容？" title={d.title} sub={d.sub}>
      <div className="tabs mb-7" role="tablist" aria-label="課程路線">
        {[{ id: 'all', name: '全部模組' }, ...d.tracks].map((t) => (
          <button key={t.id} type="button" role="tab" aria-selected={track === t.id} onClick={() => setTrack(t.id)} data-cursor="切換">
            {t.name} <span className="font-mono opacity-70">{t.id === 'all' ? d.modules.length : d.modules.filter((m) => m.track === t.id).length}</span>
          </button>
        ))}
      </div>
      <motion.div layout className="grid gap-[18px] lg:grid-cols-2">
        <AnimatePresence mode="popLayout">
          {mods.map((m, i) => (
            <motion.article key={m.id} layout className="card !p-0 overflow-hidden"
              style={{ '--c': m.track === 'mgmt' ? 'var(--color-violet)' : m.track === 'pre' ? 'var(--color-gold)' : 'var(--color-red)' }}
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0, transition: { delay: i * 0.05 } }} exit={{ opacity: 0, scale: 0.95 }}>
              <div className="grid grid-cols-[110px_1fr] sm:grid-cols-[150px_1fr] gap-4 p-5 pl-7 items-center">
                <img src={m.img} alt="" className="w-full h-[80px] sm:h-[96px] object-cover" style={{ borderRadius: 'var(--wob)' }} loading="lazy" />
                <div>
                  <span className="flex flex-wrap gap-1.5">
                    <span className="chip ink !text-[12px]">{trackName(m.track)}</span>
                    <span className="chip !text-[12px]">{m.level}</span>
                    <span className="chip gold !text-[12px] font-mono">{m.hours} 小時</span>
                  </span>
                  <h3 className="text-[22px] sm:text-[24px] mt-2">{m.name}</h3>
                  <p className="m-0 text-[14px] font-bold">{m.tagline}</p>
                </div>
              </div>
              <div className="px-5 pl-7 pb-5">
                <p className="mt-0 mb-3 text-[15px] text-muted">{m.desc}</p>
                <p className="mt-0 mb-3 px-4 py-2 text-[15px] border-l-[5px] border-gold bg-gold/10" style={{ borderRadius: '0 12px 12px 0' }}>
                  <b>一句話看懂：</b>{m.analogy}
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
                <p className="mt-4 mb-0 flex items-center gap-2 text-[14px] font-bold">
                  <Icon name="badge" size={22} className="text-gold" />取得：{m.cert}
                </p>
              </div>
            </motion.article>
          ))}
        </AnimatePresence>
      </motion.div>
      <Teams d={d.teams} />
      <Exams d={d.exams} />
    </Section>
  )
}

function Teams({ d }) {
  const [team, setTeam] = useState(d.list[0].id)
  const t = d.list.find((x) => x.id === team)
  return (
    <div className="mt-14">
      <h3 className="text-[28px]">{d.title}</h3>
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
                <h4 className="text-[24px] mt-1">{st.t}</h4>
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
      <h3 className="text-[28px] mb-4">{d.title}</h3>
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
        <h3 className="text-[21px]">{title}</h3>
        <p className="m-0 mt-1 text-[14px] text-muted">{text}</p>
      </div>
    </div>
  )
}

function How({ d }) {
  return (
    <Section id="how" no="04" label="怎麼學？" title={d.title} sub={d.sub}>
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
      <p className="mt-8 mb-0 text-[17px]"><mark className="hl">{d.practice}</mark></p>

      <div className="mt-14">
        <h3 className="text-[26px] mb-5">{d.services.title}</h3>
        <Stagger className="grid gap-[18px] md:grid-cols-3">
          {d.services.phases.map((p, i) => (
            <Item key={p.name} className="relative">
              <div className="card h-full" style={{ '--c': ['var(--color-brand)', 'var(--color-gold)', 'var(--color-red)'][i] }}>
                <p className="hand text-[30px] m-0 text-link">{p.name}</p>
                <ul className="list-none p-0 mt-2 mb-0 grid gap-1">
                  {p.items.map((it) => <li key={it} className="flex gap-2 items-start"><Icon name="check" size={18} className="text-brand shrink-0 mt-[5px]" />{it}</li>)}
                </ul>
              </div>
              {i < 2 && <span aria-hidden="true" className="hidden md:grid absolute -right-[16px] top-1/2 -translate-y-1/2 z-[1] w-[30px] h-[30px] place-items-center rounded-full bg-ink text-paper"><Icon name="arrow" size={16} /></span>}
            </Item>
          ))}
        </Stagger>
      </div>
    </Section>
  )
}
function Format({ d }) {
  return (
    <Section id="format" no="05" label="上課方式" title={d.title} sub={d.sub}>
      <Stagger className="grid gap-3 grid-cols-2 md:grid-cols-4">
        {d.systems.map((s, i) => (
          <Item key={s.name}>
            <TiltCard className="h-full" max={10}>
              <div className="soft h-full p-4">
                <span className="font-mono font-bold text-[13px] w-7 h-7 rounded-full bg-ink text-paper inline-grid place-items-center">{i + 1}</span>
                <h4 className="text-[22px] mt-2">{s.name}</h4>
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
                  <Icon name={['user', 'bot', 'star'][i]} size={28} className="text-link" />
                </span>
                <div>
                  <h4 className="text-[24px]">{c.name}</h4>
                  <p className="m-0 text-[14px] font-bold text-muted">{c.sub}</p>
                </div>
              </div>
              <ul className="mt-3 mb-0 pl-5 text-[15px]">{c.points.map((p) => <li key={p}>{p}</li>)}</ul>
            </div>
          </Item>,
          i < 2 && <Item key={c.name + '-op'} as="span" aria-hidden="true" className="hand text-[40px] text-center text-brand leading-none">{i === 0 ? '＋' : '→'}</Item>,
        ])}
      </Stagger>

      <div className="mt-10">
        <h3 className="text-[26px] mb-4">{d.guarantee.title}</h3>
        <Stagger className="grid gap-[18px] sm:grid-cols-2 lg:grid-cols-4">
          {d.guarantee.items.map((g) => (
            <Item key={g.t}>
              <TiltCard className="h-full" max={8}>
                <div className="card card-hover h-full" style={{ '--c': 'var(--color-brand)' }}>
                  <Icon name={g.icon} size={34} className="text-link" />
                  <h4 className="text-[22px] mt-2">{g.t}</h4>
                  <p className="m-0 mt-1 text-[14px] text-muted">{g.d}</p>
                </div>
              </TiltCard>
            </Item>
          ))}
        </Stagger>
      </div>

      <div className="grid gap-[18px] md:grid-cols-[1.4fr_1fr] mt-10 items-stretch">
        <div className="soft p-5 md:p-6">
          <h4 className="text-[22px] mb-3">培訓優勢：線上真人，即時指導</h4>
          <ul className="list-none p-0 m-0 grid gap-2 sm:grid-cols-2">
            {d.perks.map((p) => <li key={p} className="flex gap-2 items-center"><Icon name="check" size={18} className="text-brand shrink-0" />{p}</li>)}
          </ul>
        </div>
        <motion.div className="card plain grid place-items-center text-center bg-gold!" style={{ borderColor: 'var(--color-ink)' }}
          whileHover={{ rotate: -1.5, scale: 1.02 }} data-cursor="24hr">
          <div>
            <p className="font-mono font-bold text-[56px] leading-none m-0">24<span className="text-[24px]">hr</span></p>
            <p className="hand text-[24px] m-0 mt-2">{d.upgrade}</p>
          </div>
        </motion.div>
      </div>
    </Section>
  )
}

function Teacher({ d }) {
  return (
    <Section id="teacher" label="師資介紹" title={d.title} sub={d.sub}>
      <Stagger className="grid gap-[18px] md:grid-cols-3">
        {d.traits.map((t) => (
          <Item key={t.title}>
            <TiltCard className="h-full">
              <div className="card card-hover h-full" style={{ '--c': 'var(--color-violet)' }}>
                <Icon name={t.icon} size={36} className="text-link" />
                <h3 className="text-[24px] mt-2">{t.title}</h3>
                <p className="mt-1 mb-0 text-muted">{t.text}</p>
              </div>
            </TiltCard>
          </Item>
        ))}
      </Stagger>
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
      <Nav back links={navLinks} />
      <Hero d={c.hero} color={c.color} />
      <Why d={c.why} color={c.color} />
      <Who d={c.who} color={c.color} />
      <What d={c.what} />
      <How d={c.how} />
      <Format d={c.format} />
      <Teacher d={c.teacher} />
      <Faq items={c.faq} />
      <ApplyCta courseName={c.hero.title} />
      <Footer />
    </>
  )
}
