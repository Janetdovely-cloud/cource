import heroImg from '../assets/infosec/hero.webp'
import modPre from '../assets/infosec/mod-pre.webp'
import modCcna from '../assets/infosec/mod-ccna.webp'
import modSecplus from '../assets/infosec/mod-secplus.webp'
import modCysa from '../assets/infosec/mod-cysa.webp'
import modIso from '../assets/infosec/mod-iso.webp'
import modCissp from '../assets/infosec/mod-cissp.webp'
import workNetwork from '../assets/infosec/work-network.webp'
import workVuln from '../assets/infosec/work-vuln.webp'
import workReport from '../assets/infosec/work-report.webp'

// 課程分類（首頁篩選用）；color 為卡片分類色
export const categories = [
  { id: 'it', name: '資訊與程式', color: 'var(--color-red)' },
  { id: 'ai', name: 'AI 應用', color: 'var(--color-violet)' },
  { id: 'design', name: '設計', color: 'var(--color-gold)' },
  { id: 'eng', name: '工程製造', color: 'var(--color-brand)' },
]

// 首頁卡片：ready 為 false 的課程顯示「籌備中」
export const courseIndex = [
  { slug: 'infosec', ready: true, cat: 'it', name: '資訊安全工程師', en: 'Information Security Engineer',
    line: '資安分析 × 攻防實戰 × 國際證照，一站養成企業最搶手新星', img: heroImg,
    tags: ['CCNA', 'Security+', 'CySA+', 'ISO 27001', 'CISSP'] },
  { slug: 'cloud', ready: false, cat: 'it', name: '雲端系統', en: 'Cloud Systems' },
  { slug: 'java', ready: false, cat: 'it', name: 'Java 軟體工程師', en: 'Java Software Engineer' },
  { slug: 'ai-agent', ready: false, cat: 'ai', name: 'AI Agent 應用開發工程師', en: 'AI Agent Developer' },
  { slug: 'ai-pro', ready: false, cat: 'ai', name: 'AI 熟練師', en: 'AI Practitioner' },
  { slug: 'anime', ready: false, cat: 'design', name: '動漫角色設計', en: 'Character Design' },
  { slug: 'biz-design', ready: false, cat: 'design', name: '商業整合設計', en: 'Integrated Visual Design' },
  { slug: 'interior', ready: false, cat: 'design', name: '室內設計', en: 'Interior Design' },
  { slug: 'ptc', ready: false, cat: 'eng', name: 'PTC 機構工程師', en: 'Mechanical Design Engineer' },
]

// ── 課程內頁資料（每門課一份，頁面由 CoursePage 依資料產生）──
export const courses = {
  infosec: {
    slug: 'infosec',
    color: 'var(--color-red)',
    hero: {
      badges: ['獨家・產學培訓', 'AI 職缺媒合', '結訓保證面試'],
      title: '資訊安全工程師',
      en: 'Information Security Engineer',
      hand: '從防禦到主導：資安實力，由你掌握',
      line: '資安分析 × 攻防實戰 × 國際證照，一站養成企業最搶手新星。',
      sub: '實戰、證照、效率，成就企業資安核心。',
      tags: ['24HR 自由彈性', '隨時隨地', '高效學習'],
      img: heroImg,
    },

    why: {
      lead: '數位世界危機四伏？掌握資安，就是掌握未來',
      title: '企業搶才 3 大趨勢',
      stats: [
        { tag: '高需求', kicker: '2030 規模上看', num: 20, unit: '億美元',
          desc: '台灣資安市場年增 11–12%，9 成企業積極導入資安防護，企業搶有證照的實戰人才。' },
        { tag: '高缺口', kicker: '人才嚴重短缺', num: 80000, unit: '缺口',
          desc: '高需求、高職缺的黃金契機，高薪職缺爆增，逾 8 萬中高階缺口。' },
        { tag: '高薪資', kicker: '年薪平均破', num: 100, unit: '萬',
          desc: '資安薪資高出 IT 類 25–30%，中高階工程師年薪上看百萬，轉職搶進正是時機。' },
      ],
      salaryTitle: '起薪領先 IT 類：證照對應職位與月薪範圍',
      salary: [
        { role: 'ISO 27001 稽核員', cert: 'CCNA｜ISO 27001', min: 40, max: 50 },
        { role: '資安維運工程師', cert: 'CCNA｜ISO 27001', min: 40, max: 50 },
        { role: '網路工程師', cert: 'CCNA｜ISO 27001', min: 42, max: 60 },
        { role: 'MIS 系統工程師', cert: 'CCNA｜ISO 27001', min: 45, max: 65 },
        { role: '資安工程師', cert: 'CCNA｜ISO 27001', min: 50, max: 70 },
        { role: '滲透工程師', cert: 'CySA+｜Security+', min: 50, max: 80 },
        { role: '資安顧問、主管', cert: 'CISSP', min: 80, max: 150, top: true },
      ],
      salaryNote: '薪資為人力銀行調查的參考範圍（單位：千元），實際依公司與個人條件而異。',
    },

    who: {
      title: '零基礎也能上手，這樣的你最適合',
      sub: '適合族群：初學者、轉職者。課程從入門一路銜接到進階。',
      cards: [
        { icon: 'rocket', title: '想踏入資安高薪職場', points: ['零基礎也能上手', '強化攻防實戰力', '培養資安硬實力'] },
        { icon: 'target', title: '想掌握職場競爭優勢', points: ['熟悉資安工作流程', '建立防護專業思維', '成為企業搶手人才'] },
        { icon: 'flag', title: '想搶先卡位熱門職缺', points: ['輔考資安專業證照', '打造資安作品實力', '對應熱門轉職缺'] },
      ],
    },

    what: {
      title: '6 大模組，從攻防基礎到資安治理',
      sub: '先修打底，再分「技術」與「管理」兩條路線，對應國際證照。',
      tracks: [
        { id: 'pre', name: '先修養成' },
        { id: 'tech', name: '技術' },
        { id: 'mgmt', name: '管理' },
      ],
      modules: [
        { id: 'pre', track: 'pre', name: '資安攻防策略', img: modPre,
          tagline: '資安新手入門首選，打好基礎最關鍵', desc: '從網路攻防到法規認知，建立完整資安視野',
          cert: '完課證明',
          units: [
            { t: '資安原則', items: ['資安三要素：CIA', '常見資安風險與類型', '資安法規與職場倫理'] },
            { t: '業務持續與事故應變', items: ['營運持續計劃與控制措施', '高可用性、容錯與備份機制', '資安事件應變與通報流程'] },
            { t: '存取控制概念', items: ['身分認證與權限管理', '密碼政策與管理原則', '多因子認證與安全應用'] },
            { t: '安全營運與政策實務', items: ['資料生命週期管理', '日誌紀錄與安全監控', '變更管理流程', '資安政策實務'] },
            { t: '網路安全與威脅防護', items: ['網路架構與型態介紹', 'OSI 七層模型概念', '資安威脅與攻擊手法', '基礎網路安全防護'] },
          ] },
        { id: 'ccna', track: 'tech', name: 'CCNA 網路管理', img: modCcna,
          tagline: 'CCNA 入門｜打造網路與資安實戰力', desc: '全球認可證照，掌握路由、交換器與資安技能',
          cert: 'CCNA 證照＋完課證明',
          units: [
            { t: '網路基礎與交換技術', items: ['VLAN 與 Trunk 設定', 'VLAN 間路由操作', '冗餘交換拓撲建構', 'EtherChannel 強化穩定性'] },
            { t: '網路安全與防護實務', items: ['ACL 基礎設定與應用', '連線加密管理：SSH、Console', '設備加固與威脅檢查', '防禦工具操作：NAT、IPS、VPN、防火牆'] },
            { t: '系統監控與智慧管理', items: ['SNMP、NetFlow、Syslog 網路監控', '思科設備備份與韌體管理', 'AI 與自動化驅動的智慧網路趨勢'] },
            { t: '無線網路與服務品質', items: ['Wi-Fi 架構、SSID 加密與干擾處理', 'QoS 設定，保障語音／視訊品質', 'SDN 與網路虛擬化技術概論'] },
            { t: '進階路由與 WAN 技術', items: ['OSPF 路由協定入門', '備援機制：HSRP、VRRP、GLBP', 'WAN 傳輸技術：PPP、MPLS、VPN', '對外連線與 IP 配置設定'] },
          ] },
        { id: 'secplus', track: 'tech', name: 'CompTIA Security+ 國際網路資安認證', img: modSecplus,
          tagline: '資安基礎實戰｜從防護原理到威脅應對', desc: '入門課程，對應企業初階資安職缺，強化職場即戰力',
          cert: 'CompTIA Security+ 證照＋完課證明',
          units: [
            { t: '網路與設備防護', items: ['安全網路設計與安全協定', '防火牆、IDS／IPS 設備建置', '主機安全解決方案', '行動裝置安全管理與防護'] },
            { t: '資安概論與威脅分析', items: ['資安控制架構與分類', '惡意程式與攻擊類型', '威脅情報來源與應用'] },
            { t: '加密技術與存取控管', items: ['加密演算法原理與應用', '加密使用情境與弱點', '公鑰基礎結構', '身分共治措施建置', '帳戶與存取權限控管'] },
            { t: '安全營運與事件應變', items: ['資安事件應變流程', '數位採證基本概念', '資安風險評估與管理', '網路安全韌性策略實務'] },
          ] },
        { id: 'cysa', track: 'tech', name: 'CompTIA CySA+ 網路資安分析認證', img: modCysa,
          tagline: '資安監控實務｜精通威脅分析與事件應變', desc: '對應企業 SOC 需求，掌握分析、通報與應變全流程',
          cert: 'CompTIA CySA+ 證照＋完課證明',
          units: [
            { t: '安全營運與威脅分析', items: ['系統與網路安全架構', '惡意活動指標', '資安工具與技術應用', '威脅情報與維協追蹤'] },
            { t: '弱點管理', items: ['弱點掃描與評估', '弱點風險排序', '弱點修補與應變'] },
            { t: '事件應變管理', items: ['資安攻擊框架解析', '事件應變策略', '事件生命週期管理'] },
            { t: '報告與溝通', items: ['弱點管理報告', '事件應變報告'] },
          ] },
        { id: 'iso', track: 'mgmt', name: 'ISO 27001 資訊安全管理主導稽核師', img: modIso,
          tagline: '資安治理管理｜導入制度與主導稽核實務', desc: '聚焦標準建置與稽核規劃，準備國際證照考試',
          cert: 'ISO 27001 證照＋完課證明',
          units: [
            { t: '資安標準與制度基礎', items: ['資通安全概論與發展', 'ISO 27001 標準介紹', 'ISO 27001 控制措施介紹'] },
            { t: '管理系統與稽核實務', items: ['資訊安全管理系統導入', '稽核流程規劃與執行'] },
            { t: 'ISO 27001 認證考試', items: ['ISO 27001 認證考試', '附補考機會一次，強化考照實力'] },
          ] },
        { id: 'cissp', track: 'mgmt', name: 'CISSP 資安系統專家認證', img: modCissp,
          tagline: '高階資安領導｜整合策略、治理與控管', desc: '對標國際標準，涵蓋 8 大核心領域，提升國際資安決策力',
          cert: 'ISC2 CISSP 證照＋完課證明',
          units: [
            { t: '安全架構與防護實務', items: ['安全架構與工程', '通訊與網路安全', '軟體開發安全'] },
            { t: '資安策略與治理', items: ['安全與風險管理', '資產安全管理'] },
            { t: '存取控制與營運管理', items: ['身份與存取管理', '安全評估與測試', '安全營運與事件應變'] },
          ] },
      ],
    },

    how: {
      title: '一步一步，從零走到國際證照',
      sub: '建議學習路徑：先修打底，再進技術實作，最後走向資安治理與管理。',
      steps: [
        { no: '01', track: '先修養成', title: '資安攻防策略', text: '建立 CIA 三要素、OSI 七層與攻擊手法等核心觀念。' },
        { no: '02', track: '技術', title: 'CCNA 網路管理', text: '動手設定 VLAN、ACL、路由與防火牆，打好網路底子。' },
        { no: '03', track: '技術', title: 'Security+', text: '從防護原理到威脅應對，對應企業初階資安職缺。' },
        { no: '04', track: '技術', title: 'CySA+', text: '練習弱點管理與事件應變，對應企業 SOC 需求。' },
        { no: '05', track: '管理', title: 'ISO 27001 主導稽核', text: '學會導入資安制度與規劃稽核流程。' },
        { no: '06', track: '管理', title: 'CISSP', text: '整合策略、治理與控管，提升資安決策力。' },
      ],
      services: {
        title: '訓前・訓中・訓後：8 項求職服務一路陪跑',
        phases: [
          { name: '訓前', items: ['專業顧問輔導', '短工轉介媒合'] },
          { name: '訓中', items: ['至少 3 張證照、3 件作品', '專題成果發表會'] },
          { name: '訓後', items: ['個人履歷健檢優化', '聯合徵才博覽會', '百大企業職缺引薦', '產學專班保送面試'] },
        ],
      },
    },

    portfolio: {
      title: '結訓帶走：至少 3 張證照、3 件作品',
      sub: '每個技術模組都有實作，作品可以直接放進求職作品集，並在專題成果發表會上展示。',
      works: [
        { title: '企業網路安全設定實作', module: 'CCNA 網路管理', img: workNetwork,
          text: '規劃 VLAN 與路由，加上 ACL、SSH 連線加密與防火牆設定，完成一套可說明的網路防護架構。', link: null },
        { title: '弱點管理報告', module: 'CySA+ 網路資安分析', img: workVuln,
          text: '從弱點掃描、風險排序到修補建議，寫成主管看得懂的弱點管理報告。', link: null },
        { title: '事件應變報告', module: 'CySA+ 網路資安分析', img: workReport,
          text: '依事件生命週期整理偵測、通報與應變過程，產出完整的事件應變報告。', link: null },
      ],
      worksNote: '作品為課程實作方向，實際題目依開課內容為準。',
      certs: ['完課證明', 'CCNA', 'CompTIA Security+', 'CompTIA CySA+', 'ISO 27001 主導稽核員', 'ISC2 CISSP'],
    },

    format: {
      title: '線上真人＋AI 教練，24 小時都能學',
      sub: '授課模式：實體＋線上＋雲端。北中南名師獨家 Live，地點不設限。',
      systems: [
        { name: '實體教學系統', text: '課程程度分班' },
        { name: '直播教學系統', text: '個人化排課即時互動' },
        { name: '錄播教學系統', text: '24 小時隨時學' },
        { name: '學習監控系統', text: '課後問卷優化上課體驗' },
        { name: '真人教練系統', text: '線上線下搭配，即時解惑' },
      ],
      coach: [
        { name: '真人教練', sub: '量身即時指導', points: ['預約 1 對 1 教學效果倍增', '雙向互動解決學習盲點'] },
        { name: 'AI 教練', sub: '加速學習進程', points: ['免下載一鍵開啟即上課', '24hr 因材施教在線複習'] },
        { name: '課後收穫', sub: '精準訓練計劃', points: ['客製化增進軟硬實力', '短期衝刺找到命定職業'] },
      ],
      perks: ['線上學資安，互動即時問', '地點不設限，輕鬆學攻防', '實戰資安課，帶你打攻防', '即時能提問，學習不卡關'],
      upgrade: '升級 24hr，課程全面不加價',
    },

    teacher: {
      title: '認證講師＋產業實務',
      sub: '北中南名師獨家 Live，解決產業落差，接軌職場。',
      traits: [
        { icon: 'badge', title: '國際認證講師', text: '具備對應國際證照，帶你掌握考照重點與實作細節。' },
        { icon: 'briefcase', title: '產業實務經驗', text: '用企業真實的資安流程授課，學到的就是職場用得到的。' },
        { icon: 'live', title: '北中南名師 Live', text: '線上真人即時指導，跨區也能上到名師的課。' },
      ],
      pending: '講師個人介紹將於近期公布。',
    },

    faq: [
      { q: '完全沒有資安或網路基礎，可以學嗎？',
        a: '可以。課程從「資安攻防策略」先修開始，先建立 CIA 三要素、網路架構與 OSI 七層等觀念，再進入 CCNA、Security+ 等技術課程，適合初學者與轉職者。' },
      { q: '課程會準備哪些證照？',
        a: '課程對應 CCNA、CompTIA Security+、CompTIA CySA+、ISO 27001 主導稽核員與 ISC2 CISSP 等國際證照，結訓目標為至少 3 張證照、3 件作品。實際考照安排請洽各分校確認。' },
      { q: '上班時間不固定，跟得上進度嗎？',
        a: '有實體、直播、錄播三種上課方式，錄播 24 小時隨時學；遇到問題可以預約真人教練 1 對 1，或用 AI 教練隨時複習。' },
      { q: '證照考試沒通過怎麼辦？',
        a: 'ISO 27001 課程附補考機會一次，另有補課保障與一年內免費重修。詳細條件請洽各分校確認。' },
      { q: '結訓後有就業協助嗎？',
        a: '有。訓前有專業顧問輔導與短工轉介媒合；訓中有專題成果發表會；訓後提供履歷健檢優化、聯合徵才博覽會、百大企業職缺引薦與產學專班保送面試。' },
      { q: '可以申請職訓補助嗎？',
        a: '報名流程第一步就是「資格審核、職訓補助」評估，是否符合補助資格請洽各分校確認。' },
    ],
  },
}
