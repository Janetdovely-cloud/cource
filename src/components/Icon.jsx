// 手繪感線條圖示（stroke 為主，跟隨文字顏色）
const paths = {
  rocket: <><path d="M14 34c-2-8 4-20 18-26 2 14-6 24-14 28z" /><circle cx="25" cy="17" r="3" /><path d="M14 34l-5 1 3-7M18 36l-1 5 7-3M10 38c-2 2-3 4-3 4s2-1 4-3" /></>,
  target: <><circle cx="22" cy="24" r="14" /><circle cx="22" cy="24" r="8" /><circle cx="22" cy="24" r="2.5" /><path d="M22 24L38 8M33 8h5v5" /></>,
  flag: <><path d="M12 42V8" /><path d="M12 9c6-4 12 4 18 0s8-2 8-2v16s-3-2-8 1-12-4-18 0" /></>,
  badge: <><circle cx="24" cy="19" r="11" /><path d="M19 19l3.5 3.5L30 15" /><path d="M17 28l-4 13 7-3 4 5 3-11M31 28l4 13-7-3" /></>,
  briefcase: <><rect x="7" y="15" width="34" height="23" rx="4" /><path d="M18 15v-4h12v4M7 25c10 4 24 4 34 0" /></>,
  live: <><rect x="7" y="11" width="34" height="23" rx="3" /><path d="M17 41h14M24 34v7" /><path d="M21 18l8 4.5-8 4.5z" /></>,
  shield: <><path d="M24 6l15 6v10c0 10-7 17-15 20C16 39 9 32 9 22V12z" /><path d="M18 23l4.5 4.5L31 19" /></>,
  arrow: <><path d="M8 24h30M28 14l10 10-10 10" /></>,
  back: <><path d="M40 24H10M20 14L10 24l10 10" /></>,
  check: <><path d="M10 25l9 9 19-20" /></>,
  ext: <><path d="M20 12H10v26h26V28" /><path d="M26 10h12v12M38 10L22 26" /></>,
  user: <><circle cx="24" cy="17" r="8" /><path d="M9 41c2-9 8-13 15-13s13 4 15 13" /></>,
  bot: <><rect x="10" y="15" width="28" height="21" rx="7" /><circle cx="19" cy="25" r="2.5" /><circle cx="29" cy="25" r="2.5" /><path d="M24 15V9M21 8h6" /></>,
  star: <><path d="M24 7l5 11 12 1-9 8 3 12-11-7-11 7 3-12-9-8 12-1z" /></>,
}

export default function Icon({ name, size = 28, className = '', stroke = 2.4 }) {
  return (
    <svg viewBox="0 0 48 48" width={size} height={size} className={className} aria-hidden="true"
      fill="none" stroke="currentColor" strokeWidth={stroke} strokeLinecap="round" strokeLinejoin="round">
      {paths[name]}
    </svg>
  )
}
