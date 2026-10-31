import { useEffect, useState } from 'react'
import QRCode from 'qrcode'

// 測驗結果 QR Code：內容是純文字結果，不含網站連結；點一下可複製文字，方便業務傳給學員
function copyText(text) {
  const fallback = () => {
    const t = document.createElement('textarea')
    t.value = text; t.style.position = 'fixed'; t.style.opacity = '0'
    document.body.appendChild(t); t.select()
    try { document.execCommand('copy') } finally { t.remove() }
  }
  return navigator.clipboard?.writeText(text).catch(fallback) ?? Promise.resolve(fallback())
}

export default function ResultQR({ text: raw, label = '測驗結果' }) {
  // 去掉建置時加入的斷詞零寬空格，複製出來才是乾淨文字
  const text = raw.replace(/\u200b/g, '')
  const [src, setSrc] = useState('')
  const [copied, setCopied] = useState(false)
  useEffect(() => {
    QRCode.toDataURL(text, { margin: 1, width: 360, color: { dark: '#2b2620', light: '#ffffff' } }).then(setSrc)
  }, [text])
  const copy = () => copyText(text).then(() => { setCopied(true); setTimeout(() => setCopied(false), 2000) })
  if (!src) return null
  return (
    <div className="flex items-center gap-4 mt-4">
      <button type="button" onClick={copy} aria-label={`複製${label}文字`} title="點一下複製結果文字"
        className="relative shrink-0 p-0 border-0 bg-transparent cursor-pointer">
        <img src={src} alt={`${label} QR Code`} className="block w-[120px] h-[120px] rounded-lg border-2 border-ink bg-white p-1" />
        {copied && <span className="absolute inset-0 grid place-items-center rounded-lg bg-ink/80 text-paper font-bold text-[15px]">已複製 ✓</span>}
      </button>
      <p className="m-0 text-[15px] leading-relaxed"><strong>用手機掃描</strong>就能看到這份{label}；<strong>點一下 QR Code</strong> 可直接複製文字，方便傳給學員。</p>
    </div>
  )
}
