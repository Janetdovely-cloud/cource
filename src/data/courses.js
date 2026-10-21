import heroImg from '../assets/infosec/hero.webp'
import modPre from '../assets/infosec/mod-pre.webp'
import modCcna from '../assets/infosec/mod-ccna.webp'
import modSecplus from '../assets/infosec/mod-secplus.webp'
import modCysa from '../assets/infosec/mod-cysa.webp'
import modIso from '../assets/infosec/mod-iso.webp'
import modCissp from '../assets/infosec/mod-cissp.webp'

// 課程分類（首頁篩選用）；color 為卡片分類色
export const categories = [
  { id: 'it', name: '資訊與程式', color: 'var(--color-red)' },
  { id: 'ai', name: 'AI 應用', color: 'var(--color-violet)' },
  { id: 'design', name: '設計', color: 'var(--color-gold)' },
  { id: 'eng', name: '室內與工業', color: 'var(--color-brand)' },
]

// 首頁卡片（依此順序顯示）：ready 為 false 的課程尚未有內頁
export const courseIndex = [
  { slug: 'ai-pro', ready: false, cat: 'ai', name: 'AI 熟練師', en: 'AI Practitioner' },
  { slug: 'biz-design', ready: false, cat: 'design', name: '商業整合設計', en: 'Integrated Visual Design' },
  { slug: 'interior', ready: false, cat: 'eng', name: '室內設計', en: 'Interior Design' },
  { slug: 'ai-engineer', ready: false, cat: 'ai', name: 'AI 人工智慧工程師', en: 'Artificial Intelligence Engineer' },
  { slug: 'ai-agent', ready: false, cat: 'ai', name: 'AI Agent 應用開發工程師', en: 'AI Agent Developer' },
  { slug: 'ptc', ready: false, cat: 'eng', name: 'PTC 機構工程師', en: 'Mechanical Design Engineer' },
  { slug: 'infosec', ready: true, cat: 'it', name: '資訊安全工程師', en: 'Information Security Engineer',
    line: '資安分析 × 攻防實戰 × 國際證照，一站養成企業最搶手新星', img: heroImg,
    tags: ['CCNA', 'Security+', 'CySA+', 'ISO 27001', 'CISSP'] },
  { slug: 'java', ready: false, cat: 'it', name: 'Java 軟體工程師', en: 'Java Software Engineer' },
  { slug: 'cloud', ready: false, cat: 'it', name: '雲端系統', en: 'Cloud Systems' },
  { slug: 'anime', ready: false, cat: 'design', name: '動漫角色設計', en: 'Character Design' },
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
      attack: {
        title: '台灣每週平均遭受 4,055 次資安攻擊，亞太之冠',
        sub: '攻擊次數年增 44%，遠高於全球平均的 15%。受害最嚴重的產業是硬體供應商、政府／軍事單位與製造業。',
        bars: [
          { name: '台灣', num: 4055, hot: true },
          { name: '亞太', num: 2550 },
          { name: '全球', num: 1876 },
        ],
        unit: '次／週',
      },
      facts: [
        { num: '1/3', title: 'IT 職缺是資安', text: '台灣 2000 大企業約 16,000 個 IT 職缺中，約 5,400 個是資安職缺。' },
        { num: '58%', title: '企業喊人才不足', text: '超過 58% 企業表示市場資安人才不足，只有約 3.8% 認為人才充裕。' },
        { num: '63 萬', title: '新鮮人平均年薪', text: '比 IT 新鮮人高 20% 以上；資深資安工程師平均年薪 90 萬，高分位可突破 108 萬。' },
      ],
      law: {
        title: '法規推動，企業不能沒有資安',
        items: [
          '民國 107 年《資通安全管理法》正式實施，以法律約束資訊安全。',
          '民國 113 年上市櫃公司資通安全管理指引，將 ISO 27001／CNS 27001 納入治理評鑑指標。',
          '特定非公務機關未通報資安事件，可處新台幣 30 萬元以上、500 萬元以下罰鍰。',
        ],
      },
      industries: ['製造業', '金融相關產業', '學術單位', '生醫科技', '運輸服務業'],
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
      title: '不是資工背景，也能切入資安',
      sub: '企業急缺資安人才，不只限於程式背景。透過系統化課程與證照，轉職者也能快速補齊基礎。',
      cards: [
        { icon: 'rocket', title: '學生／新鮮人', pain: '沒有專長，怕履歷輸人', say: '資安證照是進入 IT 高薪產業的入門票。', certs: ['資安攻防策略', 'CCNA', 'Security+'] },
        { icon: 'flag', title: 'IT 轉職者', pain: '有 IT 基礎，但缺資安能力', say: '加一張資安證照，履歷就能投資安職缺。', certs: ['CCNA', 'CySA+'] },
        { icon: 'target', title: '在職工程師', pain: '薪水停滯，想要升遷', say: '企業最缺治理與策略人才，ISO 與 CISSP 是升遷加薪的門票。', certs: ['ISO 27001', 'CISSP'] },
        { icon: 'briefcase', title: '職涯卡關的上班族', pain: '想突破現況、培養第二專長', say: '資安是少數兼具技術與治理的藍海產業。', certs: ['資安攻防策略', 'CCNA', 'Security+', 'ISO 27001'] },
      ],
    },

    what: {
      title: '6 大模組，從攻防基礎到資安治理',
      sub: '先修打底，再分「技術」與「管理」兩條路線，技術與管理課程都對應國際證照。',
      tracks: [
        { id: 'pre', name: '先修養成' },
        { id: 'tech', name: '技術' },
        { id: 'mgmt', name: '管理' },
      ],
      modules: [
        { id: 'pre', track: 'pre', name: '資安攻防策略', img: modPre,
          mode: '線上＋錄播', level: '初級', hours: 36, exam: '完課證明',
          analogy: '專為零基礎設計，非 IT 背景也能先打好資安觀念，再挑戰國際證照。',
          highlights: ['從駭客思維出發：了解攻擊，才知道怎麼防禦', '實際操作 AI 聲音偽造與深度偽造，認識新型態攻擊', '提供 VM 環境安裝教學，在安全的環境動手實作'],
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
          mode: '線上＋錄播', level: '初級', hours: 57, exam: 'CCNA',
          analogy: '就像網路駕照，讓你能「合法上路」操作路由器、交換器與防火牆。',
          highlights: ['思科原廠電子教材，永久有效', '原廠 Lab 實作練習 90 天（60 小時）', '獨家 CCNA 中文筆記（原廠教材完整譯本）', 'LINE 班級群組課後服務，持續更新考古題'],
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
          mode: '線上＋錄播', level: '中級', hours: 42, exam: 'CompTIA Security+',
          analogy: '資安新手的「會考」，最通用、企業招募最常要求的資安基礎證照。',
          highlights: ['SY0-701 最新版課程', 'CompTIA 原廠線上 Lab，開課起一年', '獨家加值教材：中文筆記、效能型實作、Lab 實作解答', 'LINE 班級群組課後服務，持續更新考古題'],
          tagline: '資安基礎實戰｜從防護原理到威脅應對', desc: '入門課程，對應企業初階資安職缺，強化職場即戰力',
          cert: 'CompTIA Security+ 證照＋完課證明',
          units: [
            { t: '網路與設備防護', items: ['安全網路設計與安全協定', '防火牆、IDS／IPS 設備建置', '主機安全解決方案', '行動裝置安全管理與防護'] },
            { t: '資安概論與威脅分析', items: ['資安控制架構與分類', '惡意程式與攻擊類型', '威脅情報來源與應用'] },
            { t: '加密技術與存取控管', items: ['加密演算法原理與應用', '加密使用情境與弱點', '公鑰基礎結構', '身分共治措施建置', '帳戶與存取權限控管'] },
            { t: '安全營運與事件應變', items: ['資安事件應變流程', '數位採證基本概念', '資安風險評估與管理', '網路安全韌性策略實務'] },
          ] },
        { id: 'cysa', track: 'tech', name: 'CompTIA CySA+ 網路資安分析認證', img: modCysa,
          mode: '線上＋錄播', level: '中級', hours: 42, exam: 'CompTIA CySA+',
          analogy: '像資安「急診室醫師」，負責發現駭客行為並快速應變，適合想進 SOC 的人。',
          highlights: ['實際操作 SIEM、威脅偵測與數位鑑識', 'CompTIA 原廠線上 Lab，開課起一年', '資安分析師的標準認證科目', 'LINE 班級群組課後服務，持續更新考古題'],
          tagline: '資安監控實務｜精通威脅分析與事件應變', desc: '對應企業 SOC 需求，掌握分析、通報與應變全流程',
          cert: 'CompTIA CySA+ 證照＋完課證明',
          units: [
            { t: '安全營運與威脅分析', items: ['系統與網路安全架構', '惡意活動指標', '資安工具與技術應用', '威脅情報與維協追蹤'] },
            { t: '弱點管理', items: ['弱點掃描與評估', '弱點風險排序', '弱點修補與應變'] },
            { t: '事件應變管理', items: ['資安攻擊框架解析', '事件應變策略', '事件生命週期管理'] },
            { t: '報告與溝通', items: ['弱點管理報告', '事件應變報告'] },
          ] },
        { id: 'iso', track: 'mgmt', name: 'ISO 27001 資訊安全管理主導稽核師', img: modIso,
          mode: '實體課程', level: '初級', hours: 40, exam: 'ISO 27001 Lead Auditor',
          analogy: '企業資安健檢的合格證書，多數政府標案都要求 ISO 27001 認證或稽核員。',
          highlights: ['由驗證公司講師親自授課', '上完課直接考試，學費內含一次考試與一次補考', '全世界最廣泛使用的資訊安全管理制度', '通過後由驗證機構頒發 Lead Auditor 專業證書'],
          tagline: '資安治理管理｜導入制度與主導稽核實務', desc: '聚焦標準建置與稽核規劃，準備國際證照考試',
          cert: 'ISO 27001 證照＋完課證明',
          units: [
            { t: '資安標準與制度基礎', items: ['資通安全概論與發展', 'ISO 27001 標準介紹', 'ISO 27001 控制措施介紹'] },
            { t: '管理系統與稽核實務', items: ['資訊安全管理系統導入', '稽核流程規劃與執行'] },
            { t: 'ISO 27001 認證考試', items: ['ISO 27001 認證考試', '附補考機會一次，強化考照實力'] },
          ] },
        { id: 'cissp', track: 'mgmt', name: 'CISSP 資安系統專家認證', img: modCissp,
          mode: '線上＋錄播', level: '高級', hours: 42, exam: 'ISC2 CISSP',
          analogy: '資安界的「碩博士文憑」，代表你不只懂技術，還能管人、管制度。',
          highlights: ['涵蓋資安八大領域，深度與廣度兼具', 'ISC2 原廠電子教材，內容最新最完整', '外商、顧問公司、資安主管最看重的國際證照', 'LINE 班級群組課後服務，持續更新考古題'],
          tagline: '高階資安領導｜整合策略、治理與控管', desc: '對標國際標準，涵蓋 8 大核心領域，提升國際資安決策力',
          cert: 'ISC2 CISSP 證照＋完課證明',
          units: [
            { t: '安全架構與防護實務', items: ['安全架構與工程', '通訊與網路安全', '軟體開發安全'] },
            { t: '資安策略與治理', items: ['安全與風險管理', '資產安全管理'] },
            { t: '存取控制與營運管理', items: ['身份與存取管理', '安全評估與測試', '安全營運與事件應變'] },
          ] },
      ],
      teams: {
        title: '資安攻防，一次看懂',
        sub: '課程從駭客思維出發：先了解攻擊，才知道怎麼防禦。',
        list: [
          { id: 'blue', name: '藍隊（防守）', color: 'var(--color-brand)', analogy: '蓋城牆＋裝警報器＋派巡邏隊',
            steps: [
              { t: '預防', d: '設防火牆與 IDS／IPS、補安全更新、最小權限原則、員工防釣魚教育訓練' },
              { t: '偵測', d: '用 SIEM 分析日誌，監控異常流量與登入，偵測惡意程式' },
              { t: '回應', d: '快速隔離主機，啟動事件回應計畫，通報、調查、復原' },
              { t: '持續改進', d: '事後檢討補洞，定期演練，就像消防演習' },
            ] },
          { id: 'red', name: '紅隊（攻擊）', color: 'var(--color-red)', analogy: '先探路、找漏洞、潛入、留後門再回來',
            steps: [
              { t: '情報收集', d: '查網域、IP 與開放的服務，或用社交工程套資料' },
              { t: '滲透測試', d: '利用 SQL Injection、XSS 等漏洞，弱密碼暴力破解' },
              { t: '橫向移動', d: '進入一台電腦後，再竄到其他伺服器、竊取管理員帳號' },
              { t: '持續控制', d: '建立後門，偽裝成正常流量避免被發現' },
            ] },
          { id: 'purple', name: '紫隊（合作）', color: 'var(--color-violet)', analogy: '紅藍隊合作，邊攻邊教',
            steps: [
              { t: '模擬攻擊', d: '紅隊模擬駭客，專挑弱點進攻' },
              { t: '即時防守', d: '藍隊守系統、即時偵測、修漏洞' },
              { t: '一起補強', d: '雙方分享發現，幫企業快速補強防線' },
            ] },
        ],
      },
      exams: {
        title: '認證考試一覽',
        rows: [
          { name: 'ISO 27001 主導稽核師', time: 180, fee: '學費內含', place: '上課教室', valid: '三年' },
          { name: 'CCNA', time: 120, fee: 'USD 300', place: 'VUE 考場／線上', valid: '三年' },
          { name: 'CompTIA Security+', time: 90, fee: 'USD 425', place: 'VUE 考場／線上', valid: '三年' },
          { name: 'CompTIA CySA+', time: 165, fee: 'USD 425', place: 'VUE 考場／線上', valid: '三年' },
          { name: 'ISC2 CISSP', time: 180, fee: 'USD 749', place: '專屬考場', valid: '三年' },
        ],
        note: '考試費用依原廠公告為準；ISO 27001 以外的考試由學員自行至考場報名，時間較彈性。',
      },
    },

    how: {
      title: '一步一步，從零走到國際證照',
      sub: '先修打底後，依你的方向選擇路線：走管理線準備資安治理與稽核，或走技術線一路從網路實作到資安專家。',
      start: { no: '00', title: '資安攻防策略', track: '先修養成・36 小時', text: '建立 CIA 三要素、OSI 七層與攻擊手法等核心觀念。' },
      lines: [
        { name: '管理線', color: 'var(--color-violet)', steps: [
          { title: 'ISO 27001 主導稽核', hours: 40, text: '學會導入資安制度與規劃稽核流程。' },
        ] },
        { name: '技術線', color: 'var(--color-red)', steps: [
          { title: 'CCNA 網路管理', hours: 57, text: '動手設定 VLAN、ACL、路由與防火牆。' },
          { title: 'Security+', hours: 42, text: '從防護原理到威脅應對，對應初階資安職缺。' },
          { title: 'CySA+', hours: 42, text: '練習弱點管理與事件應變，對應 SOC 需求。' },
          { title: 'CISSP', hours: 42, text: '整合策略、治理與控管，提升資安決策力。' },
        ] },
      ],
      practice: '課中會帶領同學完成相關作品，並輔導考取相關證照。',
      services: {
        title: '訓前・訓中・訓後：8 項求職服務一路陪跑',
        phases: [
          { name: '訓前', items: ['專業顧問輔導', '短工轉介媒合'] },
          { name: '訓中', items: ['帶領完成相關作品', '輔導考取相關證照', '專題成果發表會'] },
          { name: '訓後', items: ['個人履歷健檢優化', '聯合徵才博覽會', '百大企業職缺引薦', '產學專班保送面試'] },
        ],
      },
    },

    format: {
      title: '線上真人＋AI 教練，24 小時都能學',
      sub: 'ISO 27001 為實體課程，其他資安課程皆為線上直播與錄播課，北中南名師獨家 Live，地點不設限。',
      systems: [
        { name: '直播教學系統', text: '個人化排課即時互動' },
        { name: '錄播教學系統', text: '24 小時隨時學' },
        { name: '學習監控系統', text: '課後簽退、自我學習評價' },
        { name: '真人教練系統', text: '線上即時解惑' },
      ],
      coach: [
        { name: '真人教練', sub: '量身即時指導', points: ['預約 1 對 1 教學效果倍增', '雙向互動解決學習盲點'] },
        { name: 'AI 教練', sub: '加速學習進程', points: ['免下載一鍵開啟即上課', '24hr 因材施教在線複習'] },
        { name: '課後收穫', sub: '精準訓練計劃', points: ['客製化增進軟硬實力', '短期衝刺找到命定職業'] },
      ],
      perks: ['線上學資安，互動即時問', '地點不設限，輕鬆學攻防', '實戰資安課，帶你打攻防', '即時能提問，學習不卡關'],
      upgrade: '升級 24hr，課程全面不加價',
      guarantee: {
        title: '不只是開課，而是陪你考照',
        items: [
          { icon: 'live', t: '一年內回看錄影', d: '線上課程開課起一年內可觀看錄影補課，學習更有彈性。' },
          { icon: 'target', t: '原廠教材與 Lab', d: 'Cisco、CompTIA、ISC2 原廠教材，搭配原廠 Lab 實作環境。' },
          { icon: 'user', t: 'LINE 班級群組', d: '課後服務不間斷，師生交流討論，持續更新考古題。' },
          { icon: 'badge', t: '上課證明', d: '依課程由原廠或聯成核發上課證明電子檔。' },
        ],
      },
    },

    teacher: {
      title: '認證講師＋產業實務',
      sub: '北中南名師獨家 Live，解決產業落差，接軌職場。',
      traits: [
        { icon: 'badge', title: '國際認證講師', text: '具備對應國際證照，帶你掌握考照重點與實作細節。' },
        { icon: 'briefcase', title: '產業實務經驗', text: '用企業真實的資安流程授課，學到的就是職場用得到的。' },
        { icon: 'live', title: '北中南名師 Live', text: '線上真人即時指導，跨區也能上到名師的課。' },
      ],
    },

    faq: [
      { q: '一定要先從「資安攻防策略」開始嗎？',
        a: '「資安攻防策略」是專為零基礎設計的入門課，建議先打好基礎，再挑戰 CCNA、Security+ 等更高階的認證。已有網路或資安基礎的同學，可以請分校顧問協助規劃。' },
      { q: '完全沒有資安或程式背景，學得來嗎？',
        a: '可以。課程從 CIA 三要素、網路架構與 OSI 七層等觀念開始，Security+ 也不需要資安技術背景就能上手。大學新鮮人、轉職者、想培養第二專長的人都很適合。' },
      { q: '上班時間不固定，跟得上進度嗎？',
        a: '除了 ISO 27001 是實體課程，其他資安課程都是線上直播與錄播課，開課起一年內都能回看錄影補課；課後也可以在 LINE 班級群組提問，或用 AI 教練隨時複習。' },
      { q: '課程有教材嗎？',
        a: '除了資安攻防策略之外都有原廠教材。ISO 27001 為紙本教材，其餘為電子教材；CCNA、Security+ 另有獨家中文筆記等紙本補充教材。' },
      { q: '要怎麼報名考試？',
        a: 'ISO 27001 在最後一天上課的下午直接考試，學費內含一次考試與一次補考。其他證照由學員自行到考場報名，考試時間較彈性；班級群組也會提供考古題參考。' },
      { q: '為什麼 ISO 27001 不能補課？',
        a: '依原廠規定，ISO 27001 課程不得錄影錄音，且最後一堂課就是認證考試，所以無法補課，請盡量全程出席。' },
      { q: '有上課證明嗎？',
        a: '有。依課程由原廠或聯成核發上課證明電子檔。' },
      { q: '結訓後有就業協助嗎？',
        a: '有。訓前有專業顧問輔導與短工轉介媒合；訓中有專題成果發表會；訓後提供履歷健檢優化、聯合徵才博覽會、百大企業職缺引薦與產學專班保送面試。' },
      { q: '可以申請職訓補助嗎？',
        a: '報名流程第一步就是「資格審核、職訓補助」評估，是否符合補助資格請洽各分校確認。' },
    ],
  },
}
