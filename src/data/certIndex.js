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
import license from '../assets/about/job-license.webp'

// 證照價值速查：彙整各課程「證照小百科」，同名證照合併並列出對應課程
// 證書圖片取自各課程 DM 的證書樣式（同一發證單位共用同一款樣式）
export const CERT_GROUPS = [
  { id: 'adobe', name: 'Adobe', test: (n) => n.startsWith('Adobe'), img: acp },
  { id: 'its', name: 'ITS', test: (n) => n.startsWith('ITS'), img: its },
  { id: 'tqcplus', name: 'TQC+', test: (n) => n.startsWith('TQC+'), img: tqcplus },
  { id: 'tqc', name: 'TQC', test: (n) => n.startsWith('TQC'), img: tqc },
  { id: 'autodesk', name: 'Autodesk', test: (n) => n.startsWith('Autodesk'), img: autodesk },
  { id: 'iii', name: '資策會', test: (n) => n.startsWith('生成式 AI'), img: iii },
  { id: 'license', name: '乙級技術士', test: (n) => n.includes('技術士'), img: license },
  { id: 'ipas', name: 'iPAS', test: (n) => n.startsWith('iPAS'), img: ipas },
  { id: 'iso', name: 'ISO', test: (n) => n.startsWith('ISO'), img: iso },
]

export const certIndex = (() => {
  const m = new Map()
  for (const c of courseIndex) for (const k of know[c.slug]?.certs ?? []) {
    if (!m.has(k.name)) {
      const g = CERT_GROUPS.find((x) => x.test(k.name))
      m.set(k.name, { ...k, group: g?.id ?? 'other', img: g?.img ?? null, slugs: [] })
    }
    m.get(k.name).slugs.push(c.slug)
  }
  return [...m.values()].map((k) => ({
    ...k,
    roles: [...new Set((k.slugs.length > 1 ? k.slugs.filter((s) => s !== 'ai-pro') : k.slugs).flatMap((s) => (courses[s]?.why?.salary ?? []).map((r) => r.role.trim())))].slice(0, 5),
  })).sort((a, b) => CERT_GROUPS.findIndex((g) => g.id === a.group) - CERT_GROUPS.findIndex((g) => g.id === b.group))
})()
