import { courseIndex, courses } from './courses'
import { know } from './know'
import acp from '../assets/certs/acp.webp'
import its from '../assets/certs/its.webp'
import tqc from '../assets/certs/tqc.webp'
import tqcplus from '../assets/certs/tqcplus.webp'
import autodesk from '../assets/certs/autodesk.webp'
import iii from '../assets/certs/iii.webp'
import ipas from '../assets/certs/ipas.webp'
import iso from '../assets/certs/iso.webp'
import b12500 from '../assets/certs/b12500.webp'
import b12600 from '../assets/certs/b12600.webp'

// 證照價值速查：彙整各課程「證照小百科」，同名證照合併並列出對應課程
// 證書圖片取自各課程 DM 的證書樣式（同一發證單位共用同一款樣式）
export const CERT_GROUPS = [
  { id: 'adobe', name: 'Adobe', test: (n) => n.startsWith('Adobe'), img: acp, note: 'Adobe 證書樣式，軟體名稱依考科而異' },
  { id: 'its', name: 'ITS', test: (n) => n.startsWith('ITS'), img: its, note: 'ITS 證書樣式，科目依考科而異' },
  { id: 'tqcplus', name: 'TQC+', test: (n) => n.startsWith('TQC+'), img: tqcplus, note: 'TQC+ 證書樣式，科目依考科而異' },
  { id: 'tqc', name: 'TQC', test: (n) => n.startsWith('TQC'), img: tqc, note: 'TQC 證書樣式，科目依考科而異' },
  { id: 'autodesk', name: 'Autodesk', test: (n) => n.startsWith('Autodesk'), img: autodesk, note: 'Autodesk 證書樣式，軟體名稱依考科而異' },
  { id: 'iii', name: '資策會', test: (n) => n.startsWith('生成式 AI'), img: iii, note: '資策會證書樣式，認證名稱依考科而異' },
  { id: 'license', name: '乙級技術士', test: (n) => n.includes('12500'), img: b12500, note: '勞動部技術士證樣式' },
  { id: 'license', name: '乙級技術士', test: (n) => n.includes('12600'), img: b12600, note: '勞動部技術士證樣式' },
  { id: 'ipas', name: 'iPAS', test: (n) => n.startsWith('iPAS'), img: ipas, note: 'iPAS 證書樣式，科目依考科而異' },
  { id: 'iso', name: 'ISO', test: (n) => n.startsWith('ISO'), img: iso, note: 'ISO 27001 證書樣式' },
]

const GROUP_ORDER = [...new Set(CERT_GROUPS.map((g) => g.id))]

export const certIndex = (() => {
  const m = new Map()
  for (const c of courseIndex) for (const k of know[c.slug]?.certs ?? []) {
    if (!m.has(k.name)) {
      const g = CERT_GROUPS.find((x) => x.test(k.name))
      m.set(k.name, { ...k, group: g?.id ?? 'other', img: g?.img ?? null, note: g?.note, slugs: [] })
    }
    m.get(k.name).slugs.push(c.slug)
  }
  return [...m.values()].map((k) => ({
    ...k,
    roles: [...new Set((k.slugs.length > 1 ? k.slugs.filter((s) => s !== 'ai-pro') : k.slugs).flatMap((s) => (courses[s]?.why?.salary ?? []).map((r) => r.role.trim())))].slice(0, 5),
  })).sort((a, b) => GROUP_ORDER.indexOf(a.group) - GROUP_ORDER.indexOf(b.group))
})()
