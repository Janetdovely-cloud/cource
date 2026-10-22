import { Nav, Footer } from '../components/Layout'
import { Section } from '../components/Motion'
import Disc from '../components/Disc'

export default function DiscPage() {
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
