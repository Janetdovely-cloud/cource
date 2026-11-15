import { useEffect, useRef, useState } from 'react'
import QRCode from 'qrcode'
import { toPng } from 'html-to-image'

// 測驗結果截圖：把結果區塊轉成圖片（排除標了 data-noshot 的按鈕）
export async function shoot(el) {
  await document.fonts?.ready
  // 複製一份到畫面外、拿掉按鈕再截圖，高度才不會留白
  const box = document.createElement('div')
  box.style.cssText = `position:fixed;left:-10000px;top:0;width:${el.offsetWidth}px;pointer-events:none`
  const clone = el.cloneNode(true)
  clone.querySelectorAll('[data-noshot]').forEach((n) => n.remove())
  box.appendChild(clone); document.body.appendChild(box)
  try {
    return await toPng(clone, { pixelRatio: 2, backgroundColor: '#faf6ec', cacheBust: true })
  } finally { box.remove() }
}

function ShotModal({ src, name, onClose }) {
  return (
    <div className="fixed inset-0 z-[99999] bg-ink/80 grid place-items-center p-4 overflow-auto" onClick={onClose} role="dialog" aria-label="測驗結果截圖">
      <div className="max-w-[960px] w-full" onClick={(e) => e.stopPropagation()}>
        <img src={src} alt="測驗結果截圖" className="block mx-auto max-w-full max-h-[78vh] w-auto bg-paper" style={{ borderRadius: 12 }} />
        <div className="flex flex-wrap gap-3 justify-center mt-4">
          <a href={src} download={`${name}.png`} className="btn primary">下載圖片</a>
          <button type="button" className="btn ghost !bg-paper" onClick={onClose}>關閉</button>
        </div>
      </div>
    </div>
  )
}

// 測驗結果 QR Code：手機掃描直接開啟結果圖片；電腦點一下 QR Code 看截圖、可下載
export default function ResultQR({ url, target, name = '測驗結果' }) {
  const [src, setSrc] = useState('')
  const [shot, setShot] = useState('')
  const [show, setShow] = useState(false)
  const job = useRef(null)
  useEffect(() => {
    QRCode.toDataURL(url, { margin: 1, width: 360, color: { dark: '#2b2620', light: '#ffffff' } }).then(setSrc)
  }, [url])
  // 結果出現後先在背景產生截圖，點 QR Code 時就能馬上顯示
  const make = () => (job.current ??= shoot(target.current).then((d) => { setShot(d); return d }).catch(() => { job.current = null }))
  useEffect(() => { job.current = null; setShot(''); const t = setTimeout(() => target.current && make(), 1500); return () => clearTimeout(t) }, [url])
  const busy = show && !shot
  const open = () => { if (!target.current) return; setShow(true); make() }
  if (!src) return null
  return (
    <div className="flex items-center gap-4 mt-4" data-noshot>
      <button type="button" onClick={open} aria-label="查看測驗結果截圖" title="點一下看結果截圖"
        className="relative shrink-0 p-0 border-0 bg-transparent cursor-pointer">
        <img src={src} alt="測驗結果 QR Code" className="block w-[120px] h-[120px] rounded-lg border-2 border-ink bg-white p-1" />
        {busy && <span className="absolute inset-0 grid place-items-center rounded-lg bg-ink/80 text-paper font-bold text-[14px]">產生中…</span>}
      </button>
      <p className="m-0 text-[15px] leading-relaxed"><strong>用手機掃描</strong>就能直接看到結果圖片；<strong>點一下 QR Code</strong> 可以看結果截圖並下載。</p>
      {show && shot && <ShotModal src={shot} name={name} onClose={() => setShow(false)} />}
    </div>
  )
}

// 掃描 QR Code 開啟時：把結果畫在畫面外，轉成一張圖片給手機看、長按即可儲存
export function SharedShot({ children, name = '測驗結果', width = 960 }) {
  const ref = useRef(null)
  const [img, setImg] = useState('')
  useEffect(() => {
    const t = setTimeout(() => { if (ref.current) shoot(ref.current).then(setImg) }, 1500)
    return () => clearTimeout(t)
  }, [])
  return (
    <div className="grid gap-4">
      {img ? (
        <>
          <img src={img} alt={`${name}截圖`} className="w-full block border-2 border-ink bg-paper" style={{ borderRadius: 12 }} />
          <p className="m-0 text-center text-muted text-[14px]">手機長按圖片即可儲存</p>
          <a href={img} download={`${name}.png`} className="btn primary justify-center">下載圖片</a>
        </>
      ) : <p className="m-0 text-center text-muted py-10">結果圖片產生中…</p>}
      <div aria-hidden="true" style={{ position: 'fixed', left: -10000, top: 0, width, pointerEvents: 'none' }}>
        <div ref={ref} className="p-6 bg-paper">{children}</div>
      </div>
    </div>
  )
}
