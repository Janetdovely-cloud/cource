import { useSearchParams } from 'react-router-dom'
import { Nav, Footer } from '../components/Layout'
import { Section } from '../components/Motion'
import Interest from '../components/Interest'

export default function InterestPage() {
  const [params] = useSearchParams()
  // 學員掃 QR Code 開啟：只顯示結果圖片，不顯示選單、頁尾與其他網站內容
  if (params.get('r')) return (
    <main className="wrap py-8 max-w-[960px]">
      <p className="hand text-[26px] m-0 mb-4 text-center">聯成電腦・測驗結果</p>
      <Interest />
    </main>
  )
  return (
    <>
      <Nav back />
      <Section id="interest" label="職涯興趣測驗" title="找出最適合你的學習方向"
        sub="24 個描述、約 3 分鐘，依照真實的自己選擇符合程度，沒有對錯，憑直覺作答即可。完成後會看到你的興趣雷達圖與推薦課程。">
        <Interest />
      </Section>
      <Footer />
    </>
  )
}
