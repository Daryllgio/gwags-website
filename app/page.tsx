'use client'
import { useState } from 'react'
import { Lang } from '@/lib/translations'
import Nav from '@/components/Nav'
import Hero from '@/components/Hero'
import StatsTicker from '@/components/StatsTicker'
import WhatWeAre from '@/components/WhatWeAre'
import Initiatives from '@/components/Initiatives'
import WhyGwags from '@/components/WhyGwags'
import LeadershipQuote from '@/components/LeadershipQuote'
import MoreAbout from '@/components/MoreAbout'
import GetInvolved from '@/components/GetInvolved'
import CTA from '@/components/CTA'
import Footer from '@/components/Footer'

export default function Home() {
  const [lang, setLang] = useState<Lang>('en')

  const toggleLang = () => {
    setLang((prev) => (prev === 'en' ? 'fr' : 'en'))
  }

  return (
    <main>
      <Nav lang={lang} onToggleLang={toggleLang} />
      <Hero lang={lang} />
      <StatsTicker lang={lang} />
      <WhatWeAre lang={lang} />
      <Initiatives lang={lang} />
      <WhyGwags lang={lang} />
      <LeadershipQuote lang={lang} />
      <MoreAbout lang={lang} />
      <GetInvolved lang={lang} />
      <CTA lang={lang} />
      <Footer lang={lang} />
    </main>
  )
}
