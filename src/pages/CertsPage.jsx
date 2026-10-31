import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Nav, Footer } from '../components/Layout'
import { Section } from '../components/Motion'
import Icon from '../components/Icon'
import { courseIndex } from '../data/courses'
import { certIndex, CERT_GROUPS } from '../data/certIndex'

const nameOf = (slug) => courseIndex.find((c) => c.slug === slug)?.name ?? slug

export default function CertsPage() {
  const [g, setG] = useState('all')
  const [zoom, setZoom] = useState(null)
  const groups = CERT_GROUPS.filter((x, i, a) => a.findIndex((y) => y.id === x.id) === i && certIndex.some((k) => k.group === x.id))
  const list = certIndex.filter((k) => g === 'all' || k.group === g)
  return (
    <>
      <Nav back />
      <Section id="certs" label="證照價值速查" title="這張證照有什麼用？一頁看懂"
        sub="彙整各課程可考的證照：長什麼樣子、考什麼、適合誰、對求職的幫助，以及對應的課程與職務。">
        <div className="tabs mb-7 flex-wrap" role="tablist" aria-label="發證單位">
          {[{ id: 'all', name: '全部' }, ...groups].map((x) => (
            <button key={x.id} type="button" role="tab" aria-selected={g === x.id} onClick={() => setG(x.id)}>{x.name}</button>
          ))}
        </div>
        <div className="grid gap-5 md:grid-cols-2">
          {list.map((k) => (
            <article key={k.name} className="card grid gap-4 sm:grid-cols-[180px_1fr] items-start">
              {k.img ? (
                <button type="button" onClick={() => setZoom(k)} className="p-0 border-0 bg-transparent cursor-zoom-in" aria-label={`放大 ${k.name} 證書樣式`}>
                  <img src={k.img} alt={`${k.name} 證書樣式`} className="w-full block bg-white border-2 border-ink" style={{ borderRadius: 10 }} loading="lazy" />
                  <span className="block text-[12px] text-muted mt-1">{k.note ?? '證書樣式示意'}・點圖放大</span>
                </button>
              ) : (
                <div className="soft !shadow-none h-[120px] grid place-items-center text-center text-muted text-[13px] p-3">
                  <span><Icon name="star" size={28} className="text-brand mx-auto block mb-1" />由驗證機構核發<br />證書樣式依機構而異</span>
                </div>
              )}
              <div>
                <h3 className="text-[19px] m-0 leading-snug">{k.name}</h3>
                <p className="m-0 mt-1 text-[13px] text-muted">{k.org}{k.level && `・${k.level}`}</p>
                <dl className="m-0 mt-3 grid gap-1.5 text-[14px]">
                  <div><dt className="inline font-extrabold">考什麼：</dt><dd className="inline m-0">{k.what}</dd></div>
                  <div><dt className="inline font-extrabold">適合誰：</dt><dd className="inline m-0">{k.who}</dd></div>
                  <div><dt className="inline font-extrabold">求職幫助：</dt><dd className="inline m-0">{k.help}</dd></div>
                  {k.roles.length > 0 && <div><dt className="inline font-extrabold">相關職務：</dt><dd className="inline m-0">{k.roles.join('、')}</dd></div>}
                </dl>
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {k.slugs.map((s) => <Link key={s} to={`/course/${s}`} className="chip !text-[12px] no-underline text-ink">{nameOf(s)}</Link>)}
                </div>
              </div>
            </article>
          ))}
        </div>
        <p className="note mt-6 mb-0">證書圖片為樣式示意，實際內容以發證單位核發為準。</p>
      </Section>
      {zoom && (
        <div className="fixed inset-0 z-[9500] bg-ink/80 grid place-items-center p-4" onClick={() => setZoom(null)} role="dialog" aria-label={`${zoom.name} 證書樣式`}>
          <figure className="m-0 max-w-[720px] w-full">
            <img src={zoom.img} alt="" className="w-full block bg-white" style={{ borderRadius: 12 }} />
            <figcaption className="text-paper text-center mt-3 font-bold">{zoom.name}（{zoom.note ?? '證書樣式示意'}）・點任意處關閉</figcaption>
          </figure>
        </div>
      )}
      <Footer />
    </>
  )
}
