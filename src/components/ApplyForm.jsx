import { useRef, useState } from 'react'
import { motion } from 'motion/react'
import { Section } from './Motion'
import Icon from './Icon'
import { centers } from '../data/centers'

const topics = ['課程內容', '證照考試', '職訓補助', '就業服務', '上課時段']

// 報名表單：純 UI 展示，送出後跳出「報名成功」
export default function ApplyForm({ courseName }) {
  const dlg = useRef(null)
  const [picked, setPicked] = useState(['課程內容'])
  const [name, setName] = useState('')
  const toggle = (t) => setPicked((p) => (p.includes(t) ? p.filter((x) => x !== t) : [...p, t]))

  const submit = (e) => {
    e.preventDefault()
    setName(new FormData(e.currentTarget).get('name'))
    dlg.current?.showModal()
    e.currentTarget.reset()
    setPicked(['課程內容'])
  }

  return (
    <Section id="apply" label="立即報名" title={`預約「${courseName}」免費諮詢`}
      sub={<>留下聯絡方式，<mark className="hl">分校顧問會與你聯繫</mark>，幫你規劃學習路線與補助資格。</>}>
      <motion.form onSubmit={submit} className="card grid gap-5 md:grid-cols-2 max-w-[920px]" style={{ '--c': 'var(--color-gold)' }}
        initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.2 }}>
        <div className="field">
          <label htmlFor="f-name">姓名 *</label>
          <input id="f-name" name="name" className="input" required autoComplete="name" placeholder="王小明" />
        </div>
        <div className="field">
          <label htmlFor="f-tel">手機 *</label>
          <input id="f-tel" name="tel" className="input" required type="tel" inputMode="tel" pattern="09\d{2}-?\d{3}-?\d{3}" autoComplete="tel" placeholder="0912-345-678" />
        </div>
        <div className="field">
          <label htmlFor="f-mail">Email</label>
          <input id="f-mail" name="email" className="input" type="email" autoComplete="email" placeholder="you@example.com" />
        </div>
        <div className="field">
          <label htmlFor="f-center">想諮詢的分校 *</label>
          <select id="f-center" name="center" className="input" required defaultValue="">
            <option value="" disabled>請選擇分校</option>
            {centers.map((r) => (
              <optgroup key={r.region} label={r.region}>
                {r.items.map((c) => <option key={c.name}>{c.name}</option>)}
              </optgroup>
            ))}
          </select>
        </div>
        <fieldset className="md:col-span-2 border-0 p-0 m-0">
          <legend className="text-[14px] font-bold mb-2">想了解的內容（可複選）</legend>
          <div className="flex flex-wrap gap-2">
            {topics.map((t) => (
              <motion.button key={t} type="button" className="chip-btn" aria-pressed={picked.includes(t)} onClick={() => toggle(t)}
                whileTap={{ scale: 0.92 }} data-cursor={picked.includes(t) ? '取消' : '選'}>
                {t}
              </motion.button>
            ))}
          </div>
        </fieldset>
        <label className="md:col-span-2 flex gap-3 items-start text-[14px]">
          <input type="checkbox" required className="w-5 h-5 mt-1 accent-brand shrink-0" />
          <span>我同意聯成電腦以上述資料與我聯繫課程相關資訊。</span>
        </label>
        <div className="md:col-span-2 flex flex-wrap items-center gap-4">
          <button type="submit" className="btn primary" data-cursor="送出！">送出報名 <Icon name="arrow" size={18} /></button>
          <span className="note">打樣展示：資料不會真的送出。</span>
        </div>
      </motion.form>

      <dialog ref={dlg} className="dlg" aria-labelledby="ok-title" onClick={(e) => e.target === dlg.current && dlg.current.close()}>
        <div className="p-8 text-center">
          <motion.div className="mx-auto w-[84px] h-[84px] grid place-items-center bg-brand border-2 border-ink text-ink"
            style={{ borderRadius: '50% 44% 52% 46% / 46% 52% 44% 50%', boxShadow: '3px 3px 0 var(--color-ink)' }}
            initial={{ scale: 0, rotate: -30 }} animate={{ scale: 1, rotate: 0 }} transition={{ type: 'spring', stiffness: 260, damping: 12, delay: 0.1 }}>
            <Icon name="check" size={48} stroke={3.2} />
          </motion.div>
          <h3 id="ok-title" className="text-[34px] mt-5">報名成功！</h3>
          <p className="mt-2 mb-6 text-muted" role="status">{name ? `${name}，` : ''}謝謝你的報名，分校顧問會盡快與你聯繫。</p>
          <form method="dialog"><button className="btn primary" data-cursor="好的">我知道了</button></form>
        </div>
      </dialog>
    </Section>
  )
}
