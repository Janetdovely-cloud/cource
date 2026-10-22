import { Nav, Footer } from '../components/Layout'
import { Section } from '../components/Motion'
import Interest from '../components/Interest'

export default function InterestPage() {
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
