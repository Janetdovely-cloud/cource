import { useSearchParams } from 'react-router-dom'
import { Nav, Footer } from '../components/Layout'
import { Section } from '../components/Motion'
import Disc from '../components/Disc'

export default function DiscPage() {
  const [params] = useSearchParams()
  // 學員掃 QR Code 開啟：只顯示結果圖片，不顯示選單、頁尾與其他網站內容
  if (params.get('r')) return (
    <main className="wrap py-8 max-w-[960px]">
      <p className="hand text-[26px] m-0 mb-4 text-center">聯成電腦・測驗結果</p>
      <Disc />
    </main>
  )
  return (
    <>
      <Nav back />
      <Section id="disc" label="職涯適性測驗" title="先認識自己，再挑路線"
        sub="18 題 DISC 職涯適性問卷，約 3 分鐘，看看你是哪一種工作風格。">
        <Disc />
      </Section>
      <Footer />
    </>
  )
}
