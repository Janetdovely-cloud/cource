import { classes } from './classes'

// 只開線上直播的課程（實體班不顯示；資安的 ISO 27001 例外）
export const ONLINE_ONLY = ['ai-game', 'anime', 'ipas', 'infosec', 'java']

// 近三個月內開課的班級
export function upcoming(slug) {
  const now = new Date(); now.setHours(0, 0, 0, 0)
  const until = new Date(now); until.setMonth(until.getMonth() + 3)
  return (classes[slug] || []).filter((c) => { const d = new Date(c.start); return d >= now && d <= until && !(ONLINE_ONLY.includes(slug) && c.branch.includes('實體') && !c.name.includes('27001')) })
}

// 薪資資料整理時間（各課程薪資圖共用）
export const SALARY_AS_OF = '2026 年 10 月'
