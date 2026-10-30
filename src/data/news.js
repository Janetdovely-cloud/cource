// 各課程近期產業新聞（2026-10-30 整理）。只放對招生有幫助、可查證的新聞；point 為給學員看的重點
const n = (t, src, date, url, point) => ({ t, src, date, url, point })

const aiDemand = n('AI 人才需求 5 年翻倍，今年月均職缺逼近 10 萬', '聯合報', '2026-06-24', 'https://udn.com/news/story/7240/9585448',
  '104 統計企業每月平均徵求近 10 萬名 AI 人才，5 年成長 97.6%，生成式 AI 相關人才需求更暴增 155 倍。')
const aiNonTech = n('文科生靠 AI 也能年薪百萬？企業看重這幾張證照', '工商時報', '2026-07-04', 'https://www.ctee.com.tw/news/20260704700006-431003',
  '品保、業務、行銷、專案管理等非工程職也大量要求 AI 能力，iPAS AI 應用規劃師被企業用來辨識數位轉型人才。')

export const news = {
  infosec: [
    n('台灣資安人才缺口估逾 2 萬人，資服業者積極招募', '工商時報', '2025-11-02', 'https://www.ctee.com.tw/news/20251102700034-430502',
      '全球資安人才缺口超過 470 萬人，台灣保守估計也缺 2 萬人以上。'),
    n('Fortinet 2026 資安技能落差報告：AI 時代人才荒', '電子工程專輯', '2026-06-23', 'https://www.eettaiwan.com/20260623nt21-fortinet-cybersecurity-skills-gap-report-2026-ai-powered-attacks-talent-shortage/',
      '86% 的組織去年遭遇資料外洩，超過九成 IT 決策者願意資助員工考取資安證照。'),
  ],
  'ai-pro': [aiDemand, aiNonTech],
  'biz-design': [
    aiNonTech,
    n('設計服務業 2025–2027 專業人才需求推估調查', '台灣設計研究院・經濟部產業發展署', '2024-12', 'https://ws.ndc.gov.tw/001/administrator/18/relfile/6037/9877/4cdf7dfc-4543-4237-94b1-2a32dbd72480.pdf',
      '政府調查設計服務業未來三年的人才需求，可以看到企業最需要的設計職能與技能。'),
  ],
  'av-design': [
    n('YouTube：台灣人每天平均看 115 分鐘', '中時新聞網', '2026-10-07', 'https://www.chinatimes.com/realtimenews/20261007002769-260410',
      'YouTube 在台觸及逾 1,800 萬名成年人，影音已是品牌行銷的主戰場，企業持續需要能做影片的人。'),
    n('AI 影片浪潮會取代創作者嗎？YouTube：關鍵在好故事', '聯合新聞網', '2026-10-07', 'https://tech.udn.com/tech/story/123154/9800608',
      'AI 能大量產出內容，但真正留住觀眾的是好故事與剪輯功力，這正是專業影音人才的價值。'),
  ],
  'ai-engineer': [
    n('104 AI 人才趨勢報告：企業每月招募 10 萬名 AI 人才', '104 職場力', '2026-06-24', 'https://blog.104.com.tw/104data-ai-trend-report-2026/',
      '企業最常要求的硬技能是流程自動化、機器學習演算法與自然語言處理，正是 Python 的主場。'),
    n('2026 年十大高成長科技職缺：AI 工程師需求最旺', 'PChome 新聞', '2026-03-06', 'https://news.pchome.com.tw/science/sunmedia/20260306/index-77275718035499329005.html',
      'LinkedIn 報告指出，AI 工程師是 2026 年成長最快的科技職位第一名。'),
  ],
  'ai-agent': [
    n('AI 代理人實用現場：讓 AI 當同事，服務客戶翻 3 倍', '今周刊', '2026-10-21', 'https://www.businesstoday.com.tw/article/category/183015/post/202610210035/',
      '91APP 導入 AI Agent 後，廣告優化可服務的客戶從 5 個增加到 15 個。'),
    n('「人人有代理」時代來臨，人類仍是最終當責者', 'TechNews 科技新報', '2026-10-19', 'https://technews.tw/2026/10/19/ai-agents-cut-costs-and-drive-revenue-growth/',
      'AI Agent 已能自行規劃並使用工具完成任務，企業與政府都開始導入，需要懂得設計與管理 AI 的人。'),
    n('台灣大推出企業 AI 代理平台 MyAgent', '聯合新聞網', '2026-09-08', 'https://udn.com/news/story/7240/9741737',
      '電信與系統整合大廠聯手協助企業導入 AI Agent，企業應用正快速落地。'),
  ],
  ptc: [
    n('104 半導體業人才報告：每月徵才 4.7 萬人、年增逾兩成', '聯合新聞網', '2026-09-08', 'https://udn.com/news/story/7240/9740971',
      'AI 帶動半導體與硬體產業擴張，約四分之一職缺與 AI 相關，設備與機構設計人才需求跟著成長。'),
  ],
  java: [
    n('104《2026 年科技業人才報告書》', '104 職場力', '2026-04-28', 'https://blog.104.com.tw/104data-tech-industry-recruit-2026/',
      '軟體／工程類每月徵才約 2.5 萬人，仍是科技業最多；軟體網路業每月人才缺口達 6.3 萬人。'),
    aiDemand,
  ],
  cloud: [
    n('AWS 台灣資料中心啟用，亞馬遜將投資近 1,500 億元', '數位時代', '2025-06-06', 'https://www.bnext.com.tw/article/79396/amazon-aws-cloud-region-taiwan-local-ai-compute',
      '台積電、宏碁、國泰金控等企業都已選用 AWS，雲端在台落地，在地雲端人才需求隨之增加。'),
    n('2026 年十大高成長科技職缺', 'PChome 新聞', '2026-03-06', 'https://news.pchome.com.tw/science/sunmedia/20260306/index-77275718035499329005.html',
      '企業加碼投資 AI 與雲端基礎設施，數據中心與基礎設施相關職位名列成長最快的科技職缺。'),
  ],
  ipas: [
    n('碳費首年進帳 49.7 億元，中小企業面臨碳管理人才荒', 'ETtoday 新聞雲', '2026-10-28', 'https://esg.ettoday.net/news/3261856',
      '碳管理專業人才多被大型電子業吸納，許多中小企業有心減碳卻找不到人清查排放、規劃減量。'),
    n('科技、金融業瘋搶「綠領人才」', '遠見 ESG', '2026-02-23', 'https://esg.gvm.com.tw/article/110190',
      '綠領人才每月缺口近 3 萬人；持有淨零綠領相關證明的求職者，面試邀約次數成長 544%。'),
    aiNonTech,
  ],
  'interior-b': [
    n('裝修市場熱！年產值上看 5,500 億元', '聯合新聞網', '2026-01-05', 'https://house.udn.com/house/story/123589/9245511',
      '房市降溫但裝修需求仍熱，預售屋交屋潮與老屋翻新帶動，合法執業的室內裝修人才更吃香。'),
  ],
  interior: [
    n('裝修市場熱！年產值上看 5,500 億元', '聯合新聞網', '2026-01-05', 'https://house.udn.com/house/story/123589/9245511',
      '房市降溫但裝修需求仍熱，預售屋交屋潮與老屋翻新帶動裝修案量，室內設計人才需求持續。'),
  ],
  'ai-game': [
    n('數發部推獨立遊戲開發獎勵，最高 400 萬元', '中央社', '2025-01-10', 'https://www.cna.com.tw/news/afe/202501100348.aspx',
      '政府以獎勵金支持台灣遊戲團隊從開發到產品化，獨立開發也有機會。'),
    aiDemand,
  ],
  anime: [
    n('文策院布局泰越市場，帶台灣原創 IP 拓展東南亞', '中央社', '2026-10-23', 'https://www.cna.com.tw/news/acul/202610230101.aspx',
      '台灣原創圖像與角色 IP 業者組團赴東南亞洽談商機，角色品牌有機會走向海外。'),
    n('文博會「IP 轉生漫畫屋」媒合破 400 場', '新頭殼', '2026-08-12', 'https://newtalk.tw/news/view/2026-08-12/1053042',
      '日本、法國、韓國等多國買家與台灣漫畫創作者洽談授權，原創角色 IP 的商業價值正被看見。'),
  ],
}
