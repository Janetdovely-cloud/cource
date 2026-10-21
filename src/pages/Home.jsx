import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence, useScroll, useTransform } from 'motion/react'
import { Nav, Footer, scrollToId } from '../components/Layout'
import { Section, Stagger, Item, TiltCard, CountUp, SplitTitle, Squiggle, Doodles } from '../components/Motion'
import Icon from '../components/Icon'
import { courseIndex, categories } from '../data/courses'

const stats = [
  { num: 10000, plus: true, label: '實戰培訓課程' },
  { num: 6000, plus: true, label: '企業聯合徵才' },
  { num: 10000, plus: true, label: '學員成功就業' },
]

const catOf = (id) => categories.find((c) => c.id === id)

function FeaturedCard({ c }) {
  const cat = catOf(c.cat)
  return (
    <TiltCard className="h-full" max={5}>
      <Link to={`/course/${c.slug}`} data-cursor="看課程" className="card card-hover block h-full no-underline text-ink !p-0 overflow-hidden" style={{ '--c': cat.color }}>
        <div className="relative h-[96px] overflow-hidden border-b-2 border-dashed" style={{ borderColor: cat.color }}>
          <motion.img src={c.img} alt="" className="w-full h-full object-cover" whileHover={{ scale: 1.06 }} transition={{ duration: 0.6 }} />
          <span className="chip gold absolute top-2 left-3 !text-[12px]">招生中</span>
        </div>
        <div className="p-5 pl-6">
          <p className="hand text-link text-[16px] m-0">{c.en}</p>
          <h4 className="text-[22px] mt-1">{c.name}</h4>
          <p className="mt-3 mb-0 text-[14px] font-extrabold flex items-center gap-2 text-link">
            看完整課程 <Icon name="arrow" size={20} />
          </p>
        </div>
      </Link>
    </TiltCard>
  )
}

function UpcomingCard({ c }) {
  const cat = catOf(c.cat)
  return (
    <TiltCard className="h-full" max={6}>
      <div aria-disabled="true" data-cursor="籌備中" data-cursor-tone="muted"
        className="soft h-full p-5 flex flex-col justify-between min-h-[150px] relative overflow-hidden"
        style={{ borderTop: `5px solid ${cat.color}` }}>
        <div>
          <p className="hand text-muted text-[16px] m-0">{c.en}</p>
          <h4 className="text-[22px] mt-1">{c.name}</h4>
        </div>
        <div className="flex items-center justify-between mt-3">
          <span className="text-[13px] font-bold text-muted">{cat.name}</span>
          <span className="chip" style={{ borderStyle: 'dashed', color: 'var(--color-muted)', borderColor: 'var(--color-muted)' }}>即將上線</span>
        </div>
      </div>
    </TiltCard>
  )
}

export default function Home() {
  const [cat, setCat] = useState('all')
  const { scrollY } = useScroll()
  const parallax = useTransform(scrollY, [0, 600], [0, -80])
  const list = courseIndex.filter((c) => cat === 'all' || c.cat === cat)
  const featured = list.find((c) => c.ready)
  const rest = list.filter((c) => !c.ready)

  return (
    <>
      <Nav links={[{ id: 'courses', name: '課程總覽' }, { id: 'services', name: '就業服務' }]} />

      {/* ── Hero ── */}
      <header className="relative overflow-hidden">
        <motion.div style={{ y: parallax }} className="absolute inset-0"><Doodles /></motion.div>
        <div className="wrap relative pt-20 pb-16 md:pt-28 md:pb-24">
          <div>
          <motion.p className="hand text-link text-[clamp(22px,3vw,30px)] m-0" initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 }}>
            New world. New skills.
          </motion.p>
          <SplitTitle text="學一門真本事，" className="text-[clamp(40px,7vw,80px)] leading-[1.15] mt-2" delay={0.55} />
          <div className="relative inline-block">
            <SplitTitle text="走進下一份工作。" className="text-[clamp(40px,7vw,80px)] leading-[1.15]" delay={1.0} />
            <Squiggle className="absolute left-0 -bottom-2 w-full h-[18px]" />
          </div>
          <Stagger className="mt-8 max-w-[640px]">
            <Item as="p" className="text-[18px] m-0">
              從入門到國際證照，實戰課程搭配<mark className="hl" style={{ '--hl': '100%' }}>真人教練與 AI 教練</mark>，結訓後還有 JOB580 就業服務陪你找工作。
            </Item>
            <Item className="flex flex-wrap gap-3 mt-7">
              <button type="button" className="btn primary" data-cursor="出發" onClick={() => scrollToId('courses')}>
                探索課程 <Icon name="arrow" size={18} />
              </button>
              <Link to="/course/infosec" className="btn ghost" data-cursor="看看">熱門：資訊安全工程師</Link>
            </Item>
          </Stagger>

          <Stagger className="grid grid-cols-3 gap-3 md:gap-5 mt-14 max-w-[760px]">
            {stats.map((s) => (
              <Item key={s.label} className="soft px-3 py-4 md:px-5 text-center">
                <p className="m-0 font-mono font-bold text-[clamp(22px,4vw,36px)] leading-none tabular-nums">
                  <CountUp to={s.num} />{s.plus && '+'}
                </p>
                <p className="m-0 mt-2 text-[13px] md:text-[14px] font-bold text-muted">{s.label}</p>
              </Item>
            ))}
          </Stagger>
          </div>
        </div>
      </header>

      {/* ── 課程 Bento ── */}
      <Section id="courses" no="01" label="課程總覽" title="挑一條你想走的職涯路線"
        sub="每門課都從入門開始，對應業界證照與實作作品。更多課程陸續上線中。">
        <div className="tabs mb-7" role="tablist" aria-label="課程分類">
          {[{ id: 'all', name: '全部' }, ...categories].map((c) => {
            const n = c.id === 'all' ? courseIndex.length : courseIndex.filter((x) => x.cat === c.id).length
            return (
              <button key={c.id} type="button" role="tab" aria-selected={cat === c.id} onClick={() => setCat(c.id)} data-cursor="篩選">
                {c.name} <span className="font-mono opacity-70">{n}</span>
              </button>
            )
          })}
        </div>

        <motion.div layout className="grid gap-[18px] grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 auto-rows-[minmax(150px,auto)]">
          <AnimatePresence mode="popLayout">
            {featured && (
              <motion.div key={featured.slug} layout
                initial={{ opacity: 0, scale: 0.94 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.94 }}>
                <FeaturedCard c={featured} />
              </motion.div>
            )}
            {rest.map((c, i) => (
              <motion.div key={c.slug} layout
                initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0, transition: { delay: i * 0.06 } }} exit={{ opacity: 0, scale: 0.9 }}>
                <UpcomingCard c={c} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </Section>

      {/* ── 就業服務 ── */}
      <Section id="services" no="02" label="JOB580 就業服務" title="找工作，我幫你"
        sub="不只教你技能，從報名、上課到求職，每一步都有人陪。">
        <Stagger className="grid gap-[18px] md:grid-cols-3">
          {[
            { no: '5', title: '大教學系統', text: '實體、直播、錄播、學習監控、真人教練，依你的時間自由搭配。', c: 'var(--color-brand)' },
            { no: '8', title: '項求職服務', text: '訓前顧問輔導、訓中作品與證照、訓後履歷健檢與職缺引薦。', c: 'var(--color-gold)' },
            { no: '0', title: '距離就業', text: 'AI 自傳生成、AI 媒合職缺、AI 求職追蹤，全方位 AI 資源助攻。', c: 'var(--color-violet)' },
          ].map((s) => (
            <Item key={s.title}>
              <TiltCard className="h-full" max={6}>
                <div className="card card-hover h-full" style={{ '--c': s.c }}>
                  <p className="m-0 flex items-baseline gap-2">
                    <span className="font-mono font-bold text-[56px] leading-none">{s.no}</span>
                    <span className="hand text-[26px]">{s.title}</span>
                  </p>
                  <p className="mt-3 mb-0 text-muted">{s.text}</p>
                </div>
              </TiltCard>
            </Item>
          ))}
        </Stagger>

        <Stagger className="mt-10 flex flex-wrap gap-x-2 gap-y-3 items-center">
          {['資格審核・職訓補助', '職能培訓・實務應用', '履歷健診・面試模擬', '課中就業・機會通知', 'AI 就業媒合・徵才見面會', '高薪獵頭・職缺引薦', '成功搶進知名企業'].map((t, i, a) => (
            <Item key={t} className="flex items-center gap-2">
              <span className={`chip ${i === a.length - 1 ? 'gold' : ''} !text-[14px] !py-1`}>{t}</span>
              {i < a.length - 1 && <span className="text-brand font-bold" aria-hidden="true">→</span>}
            </Item>
          ))}
        </Stagger>
      </Section>

      <Footer />
    </>
  )
}
