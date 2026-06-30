'use client'
import { useLang } from '@/lib/useLang'

import Nav from '@/components/Nav'
import Hero from '@/components/Hero'
import WhatWeAre from '@/components/WhatWeAre'
import Initiatives from '@/components/Initiatives'
import WhyGwags from '@/components/WhyGwags'
import LeadershipQuote from '@/components/LeadershipQuote'
import MoreAbout from '@/components/MoreAbout'
import CTA from '@/components/CTA'
import Footer from '@/components/Footer'

export default function Home() {
  const [lang, toggleLang] = useLang()

  return (
    <main>
      <Nav lang={lang} onToggleLang={toggleLang} />
      <Hero lang={lang} />
      <WhatWeAre lang={lang} />
      <Initiatives lang={lang} />
      <WhyGwags lang={lang} />
      <LeadershipQuote lang={lang} />
      <MoreAbout lang={lang} />
      <CTA lang={lang} />
      <Footer lang={lang} />
    </main>
  )
}
