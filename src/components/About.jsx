import { useState } from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { Stagger, Item, ph } from './Motion'
import ttqs from '../assets/about/ttqs.webp'
import award from '../assets/about/a-award.webp'
import license from '../assets/about/job-license.webp'
import assoc from '../assets/about/edu-assoc.webp'
import moda from '../assets/about/moda.webp'

const honors = [
  { no: 'TTQS', title: '人才發展品質認證', text: '出席率、考照數與作品、培訓後就業人數、課程大綱與授課品質，通過勞動部評核並頒發證書。', img: ttqs, c: 'var(--color-brand)' },
  { no: 'A 級', title: '就業服務評鑑金牌', text: '各項指標評鑑拿下 90 分以上高分，榮獲就業服務評鑑 A 級肯定。', img: award, c: 'var(--color-gold)' },
  { no: 'AI', title: '數位服務機構能量登錄', text: '數發部數位產業署審核，具備長期培育 AI 人才的完整能力體系。', img: moda, c: 'var(--color-violet)' },
  { no: '許可', title: '私立就業服務機構', text: '領有政府核發的就業服務機構許可證，合法提供求職媒合服務。', img: license, c: 'var(--color-red)' },
  { no: '品保', title: '補教品保協會會員', text: '每位學員都享有聯成電腦投保的安心學習服務。', img: assoc, c: 'var(--color-link)' },
]
const perks = [
  '實體、線上直播、線上錄播三種學習方式，皆有錄影可複習',
  '原廠企業補助，免費重修（重修期限依不同專案內容而異）',
  '彈性課綱，保留講師發揮專長強項的空間',
  '專屬課務組為你安排課程與學習大小事',
]
const lines = [
  { name: '註冊組：壢子老師', id: '@bvu5320i', href: 'https://lin.ee/y1D19NG' },
  { name: '課務組：中壢分校', id: '@cbq6416b', href: 'https://lin.ee/N6JMt8J' },
  { name: '聯成教育', id: '@lccedu', href: 'https://line.me/R/ti/p/@361wbyat' },
]
const vid = 'Qsprlu3QxKk'

export default function About() {
  const [play, setPlay] = useState(false)
  const [zoom, setZoom] = useState(null)
  return (
    <>
      <Stagger className="grid gap-[18px] grid-cols-2 lg:grid-cols-5">
        {honors.map((h) => (
          <Item key={h.title}>
            <div className="card h-full !p-4 flex flex-col" style={{ '--c': h.c }}>
              <button type="button" onClick={() => setZoom(h)} className="block p-0 border-0 bg-white rounded-md overflow-hidden cursor-zoom-in" aria-label={`放大看 ${h.title} 證書`}>
                <img src={h.img} alt={`${h.title}證書`} loading="lazy" className="block w-full aspect-[4/5] object-contain" />
              </button>
              <p className="hand m-0 mt-3 text-[28px] leading-none">{h.no}</p>
              <p className="hand text-[20px] m-0 mt-2">{ph(h.title)}</p>
              <p className="m-0 mt-1 text-muted text-[14px]">{h.text}</p>
            </div>
          </Item>
        ))}
      </Stagger>
      <Stagger className="grid gap-8 mt-10 lg:grid-cols-[1.1fr_.9fr] items-center">
        <Item>
          <div className="soft overflow-hidden">
            <div className="relative aspect-video bg-ink">
              {play ? (
                <iframe src={`https://www.youtube-nocookie.com/embed/${vid}?autoplay=1&rel=0`} title="聯成電腦電視專訪" allow="autoplay; encrypted-media; picture-in-picture" allowFullScreen className="absolute inset-0 w-full h-full border-0" />
              ) : (
                <button type="button" onClick={() => setPlay(true)} className="absolute inset-0 w-full h-full p-0 border-0 bg-transparent group" aria-label="播放：聯成電腦電視專訪">
                  <img src={`${import.meta.env.BASE_URL}videos/${vid}.webp`} alt="" loading="lazy" className="w-full h-full object-cover" />
                  <span className="absolute inset-0 grid place-items-center" aria-hidden="true">
                    <span className="w-16 h-16 rounded-full bg-brand border-2 border-ink grid place-items-center text-white text-2xl transition-transform group-hover:scale-110">▶</span>
                  </span>
                </button>
              )}
            </div>
            <p className="m-0 px-4 py-3 font-bold text-[15px]">東森亞洲新聞專訪：數位化接軌企業與人才</p>
          </div>
        </Item>
        <Item>
          <p className="hand text-[26px] m-0">在聯成學習，你會有</p>
          <ul className="m-0 mt-4 p-0 list-none grid gap-3">
            {perks.map((t) => (
              <li key={t} className="flex gap-3 items-start">
                <span className="text-brand font-bold mt-0.5" aria-hidden="true">✓</span>
                <span>{t}</span>
              </li>
            ))}
          </ul>
        </Item>
      </Stagger>

      <Stagger className="mt-10">
        <Item>
          <div className="soft p-5 md:p-6 grid gap-6 lg:grid-cols-[1.2fr_.8fr]">
            <div>
              <p className="hand text-[24px] m-0">加入 LINE，線上為你服務</p>
              <ul className="m-0 mt-3 p-0 list-none grid gap-2 sm:grid-cols-3">
                {lines.map((l) => (
                  <li key={l.id}>
                    <a href={l.href} target="_blank" rel="noopener noreferrer" className="card card-hover block !p-3 no-underline text-ink h-full" style={{ '--c': '#06C755' }}>
                      <span className="block font-bold text-[15px]">{l.name}</span>
                      <span className="block font-mono text-[14px] text-muted mt-1">ID：{l.id}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <p className="hand text-[24px] m-0">聯成電腦中壢分校</p>
              <p className="m-0 mt-3"><a href="tel:034271238" className="font-bold text-link">(03) 427-1238</a></p>
              <p className="m-0 mt-1"><a href="https://www.google.com/maps/search/?api=1&query=桃園市中壢區中正路183號" target="_blank" rel="noopener noreferrer" className="text-link">桃園市中壢區中正路 183 號</a></p>
            </div>
          </div>
        </Item>
      </Stagger>

      <AnimatePresence>
        {zoom && (
          <motion.div className="fixed inset-0 z-[9500] bg-ink/80 grid place-items-center p-4" onClick={() => setZoom(null)}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} role="dialog" aria-label={`${zoom.title}證書`}>
            <img src={zoom.img} alt={`${zoom.title}證書`} className="max-w-full max-h-[88vh] rounded-lg bg-white" />
            <button type="button" className="absolute top-4 right-4 w-11 h-11 rounded-full bg-white border-2 border-ink text-xl" aria-label="關閉">✕</button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
