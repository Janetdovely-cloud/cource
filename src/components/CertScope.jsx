import { useState } from 'react'

// 國際證照／台灣證照：只說明差異，不比較好壞
const INTL = [/^Adobe/, /^ITS/, /^Autodesk/, /^ISO/]
export const scopeOf = (name) => (INTL.some((r) => r.test(name)) ? 'intl' : 'tw')
export const SCOPES = { intl: '國際證照', tw: '台灣證照' }

export function ScopeTag({ name }) {
  const s = scopeOf(name)
  return (
    <span className="inline-block rounded-full px-2 py-0.5 text-[12px] font-bold border-2 border-ink whitespace-nowrap"
      style={{ background: s === 'intl' ? 'var(--color-brand)' : 'var(--color-gold)', color: s === 'intl' ? '#fff' : 'var(--color-ink)' }}>
      {SCOPES[s]}
    </span>
  )
}

const POINTS = {
  intl: ['由軟體原廠或國際組織發證，全球統一標準', '證書多為英文，外商、跨國公司或海外工作都看得懂', '多半直接對應某套軟體或某個國際標準，證明你會用業界主流工具'],
  tw: ['由國內政府單位或專業機構發證，貼近台灣產業需求', '國內企業、公部門和標案熟悉，履歷上一看就懂', '部分是法定資格，例如室內裝修的乙級技術士，是登記專業技術人員的依據'],
}

export function ScopeExplainer() {
  const [open, setOpen] = useState(false)
  return (
    <div className="soft !shadow-none px-5 py-4 mb-5">
      <button type="button" onClick={() => setOpen(!open)} aria-expanded={open}
        className="w-full flex items-center justify-between gap-3 p-0 border-0 bg-transparent cursor-pointer text-left font-extrabold text-[16px] text-ink">
        國際證照和台灣證照有什麼不同？<span aria-hidden="true" className="text-[20px]">{open ? '−' : '+'}</span>
      </button>
      {open && (
        <div className="mt-3">
          <div className="grid gap-4 md:grid-cols-2">
            {['intl', 'tw'].map((k) => (
              <div key={k}>
                <ScopeTag name={k === 'intl' ? 'Adobe' : 'TQC'} />
                <ul className="m-0 mt-2 pl-5 text-[15px] grid gap-1">{POINTS[k].map((p) => <li key={p}>{p}</li>)}</ul>
              </div>
            ))}
          </div>
          <p className="m-0 mt-3 text-[15px]"><b>一句話總結：</b>國際證照讓能力跨國通用，台灣證照讓國內企業一眼認可。依照想走的方向搭配著考，履歷最完整。</p>
        </div>
      )}
    </div>
  )
}
