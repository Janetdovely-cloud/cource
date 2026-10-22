import { useEffect, useState } from 'react'
import QRCode from 'qrcode'

// 測驗結果 QR Code：內容是純文字結果，不含網站連結，學員掃描後可在手機上看到並保存
export default function ResultQR({ text }) {
  const [src, setSrc] = useState('')
  useEffect(() => {
    QRCode.toDataURL(text, { margin: 1, width: 360, color: { dark: '#2b2620', light: '#ffffff' } }).then(setSrc)
  }, [text])
  if (!src) return null
  return (
    <div className="flex items-center gap-4 mt-4">
      <img src={src} alt="測驗結果 QR Code" className="w-[120px] h-[120px] rounded-lg border-2 border-ink bg-white p-1 shrink-0" />
      <p className="m-0 text-[15px] leading-relaxed"><strong>用手機掃描</strong>，就能在手機上看到這份測驗結果，可以截圖或複製保存。</p>
    </div>
  )
}
