import { useState } from 'react'

export default function VideoGrid({ list, label = '就職', more: moreText = '支影片', cols = 'sm:grid-cols-2 lg:grid-cols-3' }) {
  const [more, setMore] = useState(false)
  const [play, setPlay] = useState(null)
  // 有分類時，收合狀態每個類別先顯示一支
  const preview = list.some((v) => v.cat)
    ? list.filter((v, i) => list.findIndex((x) => x.cat === v.cat) === i)
    : list.slice(0, 6)
  const shown = more ? list : preview
  return (
    <>
      <ul className={`m-0 p-0 list-none grid gap-[18px] ${cols}`}>
        {shown.map((v) => (
          <li key={v.id} className="soft overflow-hidden">
            <div className="relative aspect-video border-b-2 border-ink bg-ink">
              {play === v.id ? (
                <iframe src={`https://www.youtube-nocookie.com/embed/${v.id}?autoplay=1&rel=0`} title={v.t} allow="autoplay; encrypted-media; picture-in-picture" allowFullScreen className="absolute inset-0 w-full h-full border-0" />
              ) : (
                <button type="button" onClick={() => setPlay(v.id)} className="absolute inset-0 w-full h-full p-0 border-0 bg-transparent group" aria-label={`播放：${v.t}`} data-cursor="播放">
                  <img src={`${import.meta.env.BASE_URL}videos/${v.id}.webp`} alt="" loading="lazy" className="w-full h-full object-cover" />
                  <span className="absolute inset-0 grid place-items-center" aria-hidden="true">
                    <span className="w-14 h-14 rounded-full bg-brand border-2 border-ink grid place-items-center text-white text-xl transition-transform group-hover:scale-110">▶</span>
                  </span>
                </button>
              )}
            </div>
            <div className="px-4 py-3">
              {v.cat && <span className="chip !text-[12px] !py-0.5 mb-2 inline-block">{v.cat}</span>}
              <p className="m-0 font-bold text-[16px] leading-snug">{v.t}</p>
              {v.co && <p className="m-0 mt-1 text-[14px] text-ink/70">{label}：{v.co}</p>}
            </div>
          </li>
        ))}
      </ul>
      {list.length > preview.length && (
        <div className="mt-6 text-center">
          <button type="button" className="btn ghost" onClick={() => setMore(!more)} data-cursor={more ? '收合' : '展開'}>
            {more ? '收合影片' : `看全部 ${list.length} ${moreText}`}
          </button>
        </div>
      )}
    </>
  )
}

