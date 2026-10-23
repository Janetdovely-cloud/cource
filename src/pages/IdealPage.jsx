import { Nav, Footer } from '../components/Layout'
import { Section } from '../components/Motion'
import Ideal from '../components/Ideal'

export default function IdealPage() {
  return (
    <>
      <Nav back />
      <Section id="ideal" label="理想工作條件" title="你心中的好工作，最在意哪幾項？"
        sub="從 9 個條件中，依序點選你最在意的 3 項，看看要具備哪些能力才能達成。">
        <Ideal />
      </Section>
      <Footer />
    </>
  )
}
