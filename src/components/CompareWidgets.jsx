import { useEffect, useRef, useState } from 'react'

// 同一個圖形：左邊點陣（固定 64px 再放大，會糊）、右邊向量（SVG，放大依然銳利）
const LOGO = (
  <g>
    <circle cx="32" cy="32" r="28" fill="#2a9d8f" />
    <path d="M18 40 L32 16 L46 40 Z" fill="#f6c453" />
    <text x="32" y="54" textAnchor="middle" fontSize="9" fontWeight="900" fill="#fff" fontFamily="sans-serif">LOGO</text>
  </g>
)

export function ZoomDemo() {
  const [z, setZ] = useState(1)
  const ref = useRef(null)
  useEffect(() => {
    const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 64 64"><circle cx="32" cy="32" r="28" fill="#2a9d8f"/><path d="M18 40 L32 16 L46 40 Z" fill="#f6c453"/><text x="32" y="54" text-anchor="middle" font-size="9" font-weight="900" fill="#fff" font-family="sans-serif">LOGO</text></svg>`
    const img = new Image()
    img.onload = () => { const c = ref.current; if (!c) return; const g = c.getContext('2d'); g.clearRect(0, 0, 64, 64); g.drawImage(img, 0, 0) }
    img.src = 'data:image/svg+xml,' + encodeURIComponent(svg)
  }, [])
  const size = 64 * z
  return (
    <div className="card max-w-[960px] mx-auto">
      <div className="grid gap-4 sm:grid-cols-2">
        {[['點陣圖（Photoshop／AI 生成圖）', 'raster'], ['向量圖（Illustrator）', 'vector']].map(([name, k]) => (
          <div key={k}>
            <p className="m-0 mb-2 font-extrabold text-[15px]">{name}</p>
            <div className="h-[300px] overflow-hidden grid place-items-center bg-white border-2 border-ink" style={{ borderRadius: 12 }}>
              {k === 'raster'
                ? <canvas ref={ref} width="64" height="64" style={{ width: size, height: size }} />
                : <svg width={size} height={size} viewBox="0 0 64 64">{LOGO}</svg>}
            </div>
          </div>
        ))}
      </div>
      <label className="flex items-center gap-4 mt-5 font-bold">
        <span className="whitespace-nowrap">放大倍率</span>
        <input type="range" min="1" max="10" step="0.5" value={z} onChange={(e) => setZ(+e.target.value)} className="w-full accent-[var(--color-brand)]" aria-label="放大倍率" />
        <span className="font-mono text-[20px] w-[60px] text-right">{z}×</span>
      </label>
      <p className="m-0 mt-3 text-[14px] text-muted">拉動滑桿放大看看：點陣圖由一格一格像素組成，放大就會糊；向量圖用數學記錄線條，放大到招牌、帆布都一樣清楚。</p>
    </div>
  )
}

const MAILS = [
  { from: '帳戶安全中心 <service@secure-bank-verify.co>', subject: '【緊急】您的帳戶將於 24 小時內停用', body: '偵測到異常登入，請立即點擊下方連結重新驗證身分與信用卡資料，否則帳戶將被凍結。', phish: true,
    why: ['寄件網域不是銀行官方網域', '用「24 小時內停用」製造緊張感', '要求點連結輸入信用卡資料，正規單位不會這樣做'] },
  { from: '人資部 王小姐 <hr@your-company.com.tw>', subject: '11 月份員工教育訓練時間調整', body: '各位同仁好，原訂 11/12 的教育訓練改至 11/19 下午 2 點，地點不變，如有問題請回信或分機 123 洽詢。', phish: false,
    why: ['寄件人是公司內部網域、有具名與分機', '沒有要求點連結或提供密碼', '內容具體、可以打分機查證'] },
  { from: '物流通知 <notice@parcel-delivery-tw.top>', subject: '您的包裹因地址不完整無法配送', body: '請於今日內點擊連結補填地址並支付 NT$ 25 重新配送費，逾期包裹將退回。', phish: true,
    why: ['陌生網域（.top）冒充物流業者', '小額付款是常見騙取卡號手法', '催促「今日內」處理'] },
  { from: 'IT 部門 <it-support@micros0ft-help.com>', subject: '您的信箱容量已滿，請重新登入', body: '您的信箱已達 99% 容量，請點擊連結登入以免郵件遺失。', phish: true,
    why: ['網域把 o 換成 0，假冒知名廠商', '以「信箱已滿」騙取帳號密碼', '正規 IT 不會要你從信件連結登入'] },
]

export function PhishQuiz() {
  const [ans, setAns] = useState({})
  const done = Object.keys(ans).length
  const score = MAILS.filter((m, i) => ans[i] === m.phish).length
  return (
    <div className="card max-w-[960px] mx-auto">
      <div className="flex items-center justify-between gap-4 mb-4">
        <p className="m-0 font-extrabold text-[17px]">資安小測驗：這封信是不是釣魚郵件？</p>
        <span className="chip gold !text-[13px] font-mono">{done === MAILS.length ? `答對 ${score} / ${MAILS.length}` : `${done} / ${MAILS.length}`}</span>
      </div>
      <div className="grid gap-4">
        {MAILS.map((m, i) => {
          const a = ans[i]
          return (
            <div key={i} className="soft !shadow-none p-4">
              <p className="m-0 text-[13px] text-muted font-mono break-all">寄件者：{m.from}</p>
              <p className="m-0 mt-1 font-extrabold">{m.subject}</p>
              <p className="m-0 mt-1 text-[14px]">{m.body}</p>
              {a === undefined ? (
                <div className="flex gap-2 mt-3">
                  <button type="button" className="btn ghost !text-[14px] !py-1.5" onClick={() => setAns({ ...ans, [i]: true })}>🎣 是釣魚</button>
                  <button type="button" className="btn ghost !text-[14px] !py-1.5" onClick={() => setAns({ ...ans, [i]: false })}>✅ 正常信件</button>
                </div>
              ) : (
                <div className="mt-3 px-4 py-3 text-[14px] border-l-[5px]" style={{ borderColor: a === m.phish ? 'var(--color-brand)' : 'var(--color-red)', background: 'rgba(0,0,0,.03)', borderRadius: '0 12px 12px 0' }}>
                  <b>{a === m.phish ? '答對了！' : '再想想！'}這封是{m.phish ? '釣魚郵件' : '正常信件'}。</b>
                  <ul className="m-0 mt-1 pl-5">{m.why.map((w) => <li key={w}>{w}</li>)}</ul>
                </div>
              )}
            </div>
          )
        })}
      </div>
      {done > 0 && <button type="button" className="btn ghost !text-[14px] mt-4" onClick={() => setAns({})}>重新作答</button>}
    </div>
  )
}
