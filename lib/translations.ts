export type Lang = 'en' | 'fr'

export const t = {
  en: {
    nav: {
      about: 'About',
      initiatives: 'Our Work',
      network: 'Network',
      getInvolved: 'Get Involved',
      contact: 'Contact',
      dropdowns: {
        about: {
          heading: 'About',
          description: 'Learn about our origins, our mission, how we work, and the people behind Gwags.',
          cta: 'Learn more about us',
          links: [
            { label: 'Our Story', href: '/about/our-story' },
            { label: 'How We Work', href: '/about/how-we-work' },
            { label: 'Our Role', href: '/about/our-role' },
            { label: 'Leadership', href: '/about/leadership' },
          ],
        },
        work: {
          heading: 'Our Work',
          description: 'Gwags builds its own initiatives and strengthens the organizations around us.',
          cta: 'Explore our work',
          initiativesLabel: 'Our Initiatives',
          networkLabel: 'Our Network',
          networkDescription: 'A growing ecosystem of organizations aligned by shared standards and a common ambition to create lasting impact.',
          networkCta: 'Learn more',
          links: [
            { label: 'Gwags Scholars Program', href: '/initiatives/scholars' },
            { label: 'Mbal Lekeaka Fund', href: '/initiatives/mbal-lekeaka-fund' },
            { label: 'Health Outreach Program', href: '/initiatives/health-outreach' },
            { label: 'Youth Development', href: '/initiatives/youth-development' },
          ],
        },
      },
    },
    hero: {
      eyebrow: 'GLOBAL IMPACT INSTITUTION',
      h1Line1: 'Building the infrastructure',
      h1Line2: 'that',
      h1Highlight: 'transforms societies',
      h1Line3: 'at scale.',
      body: 'Gwags is an international institution dedicated to structuring, advancing and coordinating initiatives committed to the sustainable transformation of societies. We do not just lead programs. We build the global ecosystem that enables organizations, leaders and communities to grow.',
      btn1: 'Explore our work',
      btn2: 'Join the network',
    },
    stats: {
      s1n: '4+', s1l: 'ACTIVE INITIATIVES',
      s2n: '3',  s2l: 'COUNTRIES ACTIVE',
      s3n: '1',  s3l: 'GLOBAL NETWORK',
    },
    whatWeAre: {
      eyebrow: 'WHAT WE ARE',
      h2: 'A global institution built to structure and accelerate impact.',
      p1: 'Gwags operates as a global platform for impact, bringing together actors and structures aligned by shared standards of excellence, ethics, ambition and transformation.',
      p2: 'We develop and strengthen ecosystems across education, governance, entrepreneurship, health, culture, sports, innovation, public policy, leadership and community development.',
      p3: 'Our conviction is that lasting progress can only emerge through interconnected and systemic approaches to impact.',
      link: 'Our vision and mission',
      pillars: [
        { title: 'Institutional development', desc: 'We build governance structures and credibility frameworks that help organizations grow with integrity.' },
        { title: 'Strategic coordination', desc: 'We connect actors across sectors and territories through a shared institutional architecture.' },
        { title: 'International collaboration', desc: 'We bring together organizations shaping resilient, inclusive societies around the world.' },
        { title: 'Acceleration at scale', desc: 'We are building an infrastructure designed to amplify impact across generations, communities and territories.' },
      ],
    },
    initiatives: {
      eyebrow: 'OUR INITIATIVES',
      h2: 'Programs built to create lasting change.',
      body: 'Gwags carries its own portfolio of initiatives, each designed around a specific dimension of societal transformation. These are the building blocks of our broader institutional mission.',
      items: [
        { title: 'Gwags Scholars Program', desc: 'A flagship program investing in the next generation of African leaders through financial support and professional development opportunities.', tag: 'EXCELLENCE' },
        { title: 'Mbal Lekeaka Fund', desc: 'A grant program channeling resources directly into community-led initiatives that demonstrate real, measurable impact on the ground.', tag: 'COMMUNITY' },
        { title: 'Health Outreach Program', desc: 'Bringing free healthcare and medical education to underserved communities through structured field campaigns.', tag: 'HEALTH' },
        { title: 'Youth Development', desc: 'Where it all began. Gwags continues to invest in the protection, education and empowerment of vulnerable youth.', tag: 'YOUTH' },
      ],
    },
    whyGwags: {
      eyebrow: 'WHY GWAGS',
      h2: 'What it means to be part of this institution.',
      body: 'Organizations that align with Gwags gain more than visibility. They gain institutional weight, access to a global network, and the structural support needed to grow with credibility and purpose.',
      items: [
        { title: 'Credibility', desc: 'Association with Gwags signals alignment with a recognized standard of ethics, excellence and impact.' },
        { title: 'International network', desc: 'Access to a growing ecosystem of organizations, institutions and leaders across sectors and borders.' },
        { title: 'Capacity to scale', desc: 'Strategic guidance and structural support to help ambitious initiatives reach their full potential.' },
        { title: 'Funding pathways', desc: 'Easier access to grants, partnerships and financing opportunities through a credible institutional umbrella.' },
        { title: 'Strategic visibility', desc: 'Gwags amplifies the reach of affiliated organizations through institutional platforms and international positioning.' },
        { title: 'Governance standards', desc: 'A framework of institutional best practices that strengthens accountability, transparency and long-term resilience.' },
      ],
    },
    quote: {
      text: 'The challenges facing our societies are too interconnected for any single organization to solve alone. Gwags exists to build the infrastructure that makes collective action possible so that the people, initiatives and institutions committed to change can do so with the structure, credibility and network they deserve.',
      name: 'Daryll Giovanny Bikak Mbal',
      role: 'Founder and Board Chair',
      roleOrg: 'Gwags Global Impact Institution',
    },
    ourStory: {
      eyebrow: 'OUR STORY',
      h2: 'From student initiative to global institution.',
      items: [
        { era: 'THE BEGINNING', title: 'Born from conviction', desc: 'Gwags started as a student-led initiative to support orphaned and underprivileged youth in Cameroon. The premise was simple: invest in people.' },
        { era: 'THE EVOLUTION', title: 'Growing the mission', desc: 'As the challenges became clearer, so did the response. Gwags expanded its scope, built new programs and formalized its structure internationally.' },
        { era: 'NOW AND BEYOND', title: 'A global institution', desc: 'Gwags is now a globally oriented institution, active across multiple countries and sectors, building the infrastructure for systemic, lasting impact.' },
      ],
    },
    moreAbout: {
      heading: 'MORE ABOUT THE INSTITUTION',
      cards: [
        {
          title: 'Our story',
          desc: 'Learn about the origins of Gwags and the journey from a student initiative to a global impact institution.',
          link: 'Learn more',
          href: '/about/our-story',
        },
        {
          title: 'How we work',
          desc: 'Gwags operates on two tracks: building its own initiatives and strengthening the organizations around us.',
          link: 'Learn more',
          href: '/about/how-we-work',
        },
        {
          title: 'Our network',
          desc: 'A growing ecosystem of organizations, institutions, and leaders connected by shared standards and a common ambition.',
          link: 'Learn more',
          // TODO: Update to /network when network page is created
          href: '/get-involved',
        },
      ],
    },
    getInvolved: {
      eyebrow: 'GET INVOLVED',
      h2: 'There is a place for you within the Gwags network.',
      body: 'Whether you represent a government body, an NGO, a foundation or an initiative seeking to grow, Gwags is designed to be your institutional partner.',
      items: [
        { title: 'Organizations', desc: 'Join a network of institutions aligned by shared standards and a common ambition to transform societies.' },
        { title: 'Donors and funders', desc: 'Direct your support toward credible, structured programs with clear governance and measurable outcomes.' },
        { title: 'Institutional partners', desc: 'Align with Gwags at the strategic level to co-develop programs, share resources and amplify collective impact.' },
      ],
    },
    getInvolvedPage: {
      hero: {
        eyebrow: 'GET INVOLVED',
        h1: 'There is a place for you.',
        body: 'Whether you represent a government body, an NGO, a foundation, or an initiative seeking to grow, Gwags is designed to be your institutional partner. Here is how you can be part of what we are building.',
      },
      partner: {
        eyebrow: 'PARTNER WITH US',
        heading: 'Align with Gwags at the institutional level.',
        body: 'Gwags partners with organizations, governments, and institutions that share our commitment to structured, sustainable impact. Partnership means strategic alignment, shared resources, and coordinated action toward goals that are bigger than any one organization. If you lead an organization or represent an institution that is committed to lasting change, we want to hear from you.',
        cta: 'Express interest',
      },
      support: {
        eyebrow: 'SUPPORT OUR WORK',
        heading: 'Invest in infrastructure that lasts.',
        body: 'Gwags is funded through a combination of grants, partnerships, and individual contributions. Every contribution supports the programs we run and the institutional infrastructure we are building for organizations across the world. Your support does not just fund a project. It strengthens an entire ecosystem designed to make impact more structured, more credible, and more sustainable.',
        cta: 'Support Gwags',
      },
      contact: {
        eyebrow: 'CONTACT',
        heading: 'Get in touch with us.',
        body: 'For general inquiries, partnership discussions, media requests, or any other questions, reach out to us directly.',
        // Update this email address when ready
        email: 'contact@gwags.org',
        responseTime: 'We aim to respond within 48 hours.',
      },
      cta: {
        h2: 'Ready to build something that lasts?',
        body: 'Gwags is building an international infrastructure for impact. Reach out to explore how we can work together.',
        btn: 'Back to homepage',
      },
    },
    cta: {
      h2: 'Ready to build something that lasts?',
      body: 'Gwags is building an international infrastructure for impact. Reach out to explore how we can work together toward a shared vision of transformation.',
      btn1: 'Get in touch',
      btn2: 'How we work',
    },
    footer: {
      tagline: 'A global network. A shared vision. A lasting impact.',
      col1: { heading: 'INSTITUTION', links: [
        { label: 'Our Story', href: '/about/our-story' },
        { label: 'How We Work', href: '/about/how-we-work' },
        { label: 'Our Role', href: '/about/our-role' },
      ]},
      col2: { heading: 'GET INVOLVED', links: [
        { label: 'Partner with us', href: '/get-involved' },
        { label: 'Support our work', href: '/get-involved' },
        { label: 'Contact', href: '/get-involved' },
      ]},
      copy: '2026 Gwags Global Impact Institution',
      privacy: 'Privacy',
      terms: 'Terms',
    },
    howWeWork: {
      hero: {
        eyebrow: 'HOW WE WORK',
        h1: 'Two roles. One mission.',
        body: 'Gwags operates on two parallel tracks that reinforce each other. We build and run our own initiatives across education, health, and community development, staying close to the realities on the ground. And we serve as an institutional infrastructure that coordinates, supports, and strengthens other organizations committed to creating lasting impact. Neither role works as well without the other.',
      },
      split: {
        left: {
          label: 'DIRECT ACTION',
          heading: 'We build our own initiatives.',
          body: [
            'Gwags does not only coordinate. We design and deliver programs that address real needs on the ground. From scholarships that invest in academic talent to health campaigns that bring free medical care to underserved districts, our initiatives are built with clear structure, measurable outcomes, and a commitment to consistency over time.',
            'Our current portfolio spans four active programs across education, health, community development, and youth empowerment. Each one was created to fill a gap that we identified firsthand through years of direct engagement with the communities we serve. These programs are not side projects. They are core to who we are as an institution and they inform every aspect of how we support the organizations around us.',
            'Running our own initiatives gives us something that many institutional platforms lack: direct operational experience. We understand the challenges of implementation because we face them ourselves. That understanding makes our guidance, our standards, and our support to affiliated organizations more practical and more credible.',
          ],
        },
        right: {
          label: 'INSTITUTIONAL SUPPORT',
          heading: 'We strengthen the organizations around us.',
          body: [
            'Many initiatives across the world are doing meaningful work but struggling with the same barriers. Limited funding. Weak governance. No access to international networks. No institutional credibility to unlock partnerships or attract serious investment. And no strategic support to help them grow beyond their immediate reach.',
            'These are not failures of ambition. They are gaps in infrastructure. And they are exactly what Gwags is designed to fill.',
            'Through affiliation, strategic coordination, and shared institutional standards, we provide organizations with the credibility, structure, and reach they need to scale their impact sustainably. We do not absorb organizations or strip them of their identity. We create the conditions for them to grow stronger, more visible, and more effective within a network built on shared values and mutual benefit.',
            'Our role is not to compete with the organizations we support. It is to make them better positioned, better governed, and better connected than they would be on their own.',
          ],
        },
      },
      initiatives: {
        eyebrow: 'OUR ACTIVE INITIATIVES',
        items: [
          { title: 'Gwags Scholars Program', desc: 'A flagship program investing in the next generation of African leaders through financial support and professional development opportunities.', href: '/initiatives/scholars' },
          { title: 'Mbal Lekeaka Fund', desc: 'Channeling resources into community-led initiatives with measurable impact.', href: '/initiatives/mbal-lekeaka-fund' },
          { title: 'Health Outreach Program', desc: 'Bringing free healthcare to underserved communities through field campaigns.', href: '/initiatives/health-outreach' },
          { title: 'Youth Development', desc: 'Protecting, educating, and empowering vulnerable youth since day one.', href: '/initiatives/youth-development' },
        ],
      },
      coordination: {
        eyebrow: 'THE COORDINATION MODEL',
        h2: 'How affiliation works.',
        intro: 'Organizations that align with Gwags enter a structured partnership built on shared values, clear expectations, and mutual benefit. The model is intentionally designed to strengthen without constraining. Affiliation is not a transaction. It is a long-term institutional relationship.',
        steps: [
          {
            title: 'Shared vision and values',
            body: 'Every affiliation begins with alignment. Organizations must demonstrate a genuine commitment to the standards that define Gwags as an institution: ethical governance, transparency, accountability, and a measurable approach to impact. This is not a formality. It is the foundation of everything that follows. Gwags does not grow by lowering the bar. We grow by finding organizations that already meet it or are committed to reaching it.',
          },
          {
            title: 'Joining the network',
            body: 'Once alignment is established, organizations gain access to the Gwags institutional framework. This includes use of the Gwags brand under defined guidelines, integration into the broader network, and access to resources, knowledge, and support structures designed to accelerate their growth. Affiliated organizations retain their legal identity, their leadership, and their operational independence. What changes is the institutional weight behind them.',
          },
          {
            title: 'Strategic integration',
            body: 'Affiliation is not passive. Gwags works actively with affiliated organizations to coordinate programs, align strategic objectives, and identify opportunities for collaboration within the network. Where it makes sense, resources are shared, programs are co-developed, and collective strategies are built. The goal is not centralized control but coordinated impact, making sure the work of individual organizations contributes to something larger than any one of them could achieve alone.',
          },
          {
            title: 'Scaling together',
            body: 'The ultimate purpose of the Gwags model is growth. Not growth for its own sake, but growth in impact, in reach, and in the capacity of every organization within the network to deliver on its mission. Through the network, affiliated organizations gain access to funding pathways, international partnerships, governance frameworks, and strategic visibility that would be extremely difficult to build independently. As each organization grows, the network grows. And as the network grows, so does the possibility of systemic, lasting transformation.',
          },
        ],
      },
      workingWith: {
        eyebrow: 'WORKING WITH GWAGS',
        h2: 'What to expect.',
        cards: [
          {
            title: 'Autonomy with structure',
            body: 'Affiliated organizations keep their identity, their leadership, and their decision-making independence. Gwags does not dictate how you run your programs. What we provide is a governance framework, institutional standards, and a support system that makes your organization stronger without making it dependent. You remain in control. We make sure you have the tools to lead effectively.',
          },
          {
            title: 'Accountability both ways',
            body: 'We hold our partners to high standards because credibility is the currency of this work. Transparent reporting, ethical governance, and measurable outcomes are not optional. But accountability at Gwags is not a one-way street. We hold ourselves to the same standards we expect from others, and we are transparent about our own progress, our challenges, and our decisions.',
          },
          {
            title: 'Long-term commitment',
            body: 'Gwags is not interested in short-term partnerships that look good on paper and dissolve after a funding cycle ends. We invest in relationships that are built to last, designed to deepen over time, and structured to compound impact year after year. If you are looking for a quick collaboration, we are probably not the right partner. If you are building something that you want to last, we are exactly the right partner.',
          },
        ],
      },
      cta: {
        h2: 'Interested in working with us?',
        body: 'Whether you lead an organization, manage a fund, or represent an institution, Gwags is built to be your partner in impact.',
        btn1: 'Get in touch',
        btn2: 'Learn about our role',
      },
    },
    ourStoryPage: {
      hero: {
        eyebrow: 'OUR STORY',
        h1: 'How it all started.',
      },
      photoBanner: 'HERO PHOTO',
      narrative: [
        'In December 2021, four high school students in Douala, Cameroon, had to undertake a community service project as part of their academic program. In order to fulfill this requirement, they organized a visit to the Ami de Jésuite orphanage, where they spent time with the children, provided essential supplies, and witnessed firsthand the conditions these children were navigating daily.',
        'The experience left a lasting impression. They encountered children with limited resources and few opportunities, but with undeniable potential. The gaps were obvious, but so was the possibility of what consistent, structured support could unlock over time.',
        'That visit was meant to fulfill an assignment. But what they experienced made it impossible to treat as a one-time effort. It became the starting point of a much larger commitment.',
        'The following year, the team organized a second initiative. They partnered with a Cameroonian organization called Codam Technologies to provide hands-on technology exposure to the children. The scope of the work had already expanded well beyond basic support, and what had started as an orphanage visit was evolving into something more structured.',
        'Over the months that followed, the founders reflected on the deeper challenges they had been witnessing. The barriers facing children and youth across Cameroon were not isolated. They were systemic. Educational gaps, healthcare shortages, limited access to technology, and weak institutional support all fed into the same cycle.',
        'No single project could address all of it. But a properly structured organization, one with the capacity to design and run programs across different sectors such as education and healthcare, could begin to make a real difference. That realization pushed the team to stop thinking in terms of individual projects and start building for the long term.',
        'What followed was a series of decisive steps. The team incorporated the Gwags Foundation as a nonprofit in both the United States and Cameroon, establishing the legal and institutional foundation needed for sustained operations. New initiatives were launched across education, community development, healthcare, and youth empowerment. What had started as orphanage visits was becoming a multi-sector organization with a growing portfolio of programs and partnerships.',
        "But the more the team built, the clearer something became. Running programs was not enough. The real challenge was not just delivering impact, it was structuring it. Across the world, there are countless organizations doing meaningful work but struggling with the same obstacles. Limited funding, weak governance, no access to networks, and no institutional backbone to help them grow.",
        "That realization marked a defining shift in Gwags's journey. The mission was no longer just about what Gwags could do directly. It was about building the infrastructure that would enable organizations to do more. An institution that could coordinate, support, and strengthen organizations striving to create impact. A platform where credibility, structure, and international reach could be shared, not hoarded.",
        'Today, Gwags has formally transitioned from a foundation into a Global Impact Institution. The name changed. The positioning changed. But the conviction that started it all remained exactly the same: invest in people, build with intention, and never treat support as something temporary.',
        'Today, Gwags operates across multiple countries and sectors, building an ecosystem designed to accelerate impact at scale. The programs continue to grow. The network continues to expand. And the infrastructure that will enable generations of organizations and communities to transform their societies is being built, step by step, from the ground up.',
      ],
      timeline: {
        eyebrow: 'THE TIMELINE',
        h2: 'Milestones that shaped Gwags.',
        entries: [
          {
            year: '2021', month: 'DECEMBER',
            title: 'First orphanage visit',
            body: 'Four high school students in Douala, Cameroon, have to undertake a community service project as part of their academic program. They organize a visit to the Ami de Jésuite orphanage, where they spend time with the children, provide essential supplies, and witness firsthand the realities these children face daily. What is meant to fulfill an assignment becomes the starting point of a much larger commitment.',
            photo: 'Photo: orphanage visit',
          },
          {
            year: '2022', month: 'DECEMBER',
            title: 'Partnership with Codam Technologies',
            body: 'Gwags partners with Codam Technologies, a Cameroon-based tech education startup, to introduce hands-on technology workshops during the second orphanage initiative. Children gain exposure to 3D printing, introductory coding, and practical digital tools for the first time.',
            photo: 'Photo: tech workshop with children',
          },
          {
            year: '2025', month: 'MAY',
            title: 'Incorporation in the United States',
            body: 'Gwags formalizes its structure by incorporating as a nonprofit organization in Maryland, United States. The 501(c)(3) application process begins, establishing the legal and institutional foundation for international operations.',
            photo: '',
          },
          {
            year: '2026', month: 'JANUARY',
            title: 'Launch of the Gwags Scholars Program',
            body: 'Gwags launches its first flagship initiative, a scholarship program awarding grants to university students across Cameroon. The program recognizes academic excellence and invests in the next generation of African leaders.',
            photo: 'Photo: scholars program',
          },
          {
            year: '2026', month: 'JULY',
            title: 'Launch of the Mbal Lekeaka Fund',
            body: "Gwags establishes a dedicated grant program to fund community-led initiatives in Cameroon. The fund's first supported project is the Nguti 2026 Health Campaign, co-funded with support from strategic partners.",
            photo: 'Photo: community initiative',
          },
          {
            year: '2026', month: 'AUGUST',
            title: 'First Health Outreach Campaign',
            body: 'In partnership with CAMESA, Gwags supports a week-long medical mission in the Nguti Health District, deploying 120 medical personnel to provide free consultations, surgeries, screenings, and health education to over 1,500 people in underserved communities.',
            photo: 'Photo: health campaign team',
          },
          {
            year: '2026', month: 'SEPTEMBER',
            title: 'Transition to Global Impact Institution',
            body: 'Gwags formally evolves beyond a foundation model, repositioning itself as a Global Impact Institution dedicated to structuring, coordinating, and accelerating initiatives committed to the sustainable transformation of societies at scale.',
            photo: '',
          },
        ],
      },
      narrativeHeadings: [
        null,
        null,
        null,
        'A second step, a broader vision',
        'Seeing the bigger picture',
        null,
        'Building the foundation',
        'The shift',
        null,
        'A new chapter',
        null,
      ],
      closing: {
        h2: 'The story is still being written.',
        body: 'Gwags is an institution in motion. If you want to be part of what comes next, there is a place for you in this network.',
        btn: 'Get involved',
      },
    },
    ourRole: {
      hero: {
        eyebrow: 'OUR ROLE',
        h1: 'We exist to structure what others start.',
        body: 'Across the world, organizations and individuals are working to solve some of the most pressing challenges facing communities. Many of them are driven by deep commitment and firsthand understanding of the problems. But commitment alone is not enough to create change that lasts. That is where Gwags comes in.',
      },
      narrative: {
        section1: {
          heading: 'Why Gwags exists.',
          paragraphs: [
            'Gwags was not created to add another organization to an already crowded landscape. It was created because the landscape itself is missing something fundamental.',
            'There is no shortage of initiatives. There is no shortage of talented, motivated people working to make a difference. What there is, consistently and across nearly every sector, is a shortage of infrastructure. The governance frameworks that keep organizations accountable. The funding pathways that allow them to plan beyond the next grant cycle. The networks that connect them to partners, knowledge, and opportunities they cannot access on their own. The institutional credibility that opens doors that talent alone cannot.',
            'Without that infrastructure, even the most promising initiatives are left to figure things out on their own. Some succeed despite the odds. Many do not. And the ones that fail rarely fail because the people behind them were not good enough. They fail because the system around them was not built to support what they were trying to do.',
            'Gwags exists to change that. We are building the institutional layer that sits beneath the work, the infrastructure that makes it possible for organizations, leaders, and communities to create impact that does not depend on luck, personal connections, or a single funding source.',
          ],
        },
        section2: {
          heading: 'What we mean by an impact institution.',
          paragraphs: [
            'The term institution is deliberate. Gwags is not a project. It is not a campaign. It is not built around a single cause or a single funding cycle. It is designed to be permanent, to grow over time, and to outlast any individual leader or program.',
            'An institution sets standards. It builds systems. It creates frameworks that other people and organizations can rely on. That is what Gwags is doing. We are not just running programs, although we do run our own initiatives across education, health, community development, and youth empowerment. We are building the systems that allow programs to work better, last longer, and reach further.',
            'A foundation writes checks. A network makes introductions. An institution builds the underlying architecture that makes both of those things more effective, more sustainable, and more scalable. That is the distinction, and that is the role Gwags plays.',
          ],
        },
      },
      visionMission: {
        vision: {
          label: 'OUR VISION',
          main: 'To build the most impactful international infrastructure dedicated to accelerating, structuring, and coordinating the initiatives, organizations, and leaders transforming societies sustainably.',
          expansion: 'This is not a vision for Gwags alone. It is a vision for the ecosystem we are building. A world where organizations committed to impact do not struggle alone for resources, credibility, or direction. Where the infrastructure to support their growth already exists, and where collective progress is not an aspiration but an operational reality.',
        },
        mission: {
          label: 'OUR MISSION',
          main: 'To accelerate and amplify global impact by connecting organizations, initiatives, and actors committed to human development, social innovation, and the sustainable transformation of communities.',
          expansion: 'We carry out this mission on two fronts. Directly, through our own portfolio of initiatives that address real needs on the ground. And institutionally, by serving as a coordination platform that strengthens, connects, and elevates the organizations around us. These two roles are not separate. They reinforce each other. The experience we gain from running programs makes our institutional support more credible. And the institutional framework we build makes our programs more sustainable.',
        },
      },
      convictions: {
        eyebrow: 'WHAT DRIVES US',
        heading: 'The convictions behind everything we build.',
        intro: 'We do not operate from a strategic plan alone. We operate from a set of convictions that have shaped every decision Gwags has made since its founding. They are not slogans. They are the principles we test ourselves against.',
        items: [
          {
            heading: 'Impact is systemic.',
            body: 'The challenges facing communities are not isolated problems with isolated solutions. Education, health, governance, entrepreneurship, culture, technology, all of these are connected. A child who is healthy but cannot access education is still held back. A community with schools but no healthcare infrastructure is still vulnerable. A young entrepreneur with a strong idea but no institutional support is still likely to fail. Gwags works across sectors because we believe transformation only happens when you address the full picture. That is why our initiatives span education, health, community development, and youth empowerment. And it is why our institutional model is designed to connect rather than specialize.',
          },
          {
            heading: 'Collective action is the only path to lasting change.',
            body: 'No single organization, no matter how well funded or well intentioned, can solve the challenges facing communities on its own. The problems are too interconnected, too deeply rooted, and too wide in scope. Gwags was built on the conviction that the most effective way to create lasting transformation is not to do more alone, but to build the systems that enable more people and organizations to act together with structure, purpose, and accountability. That is why our model is designed around coordination and network building rather than centralized delivery. The goal is not to concentrate impact in one institution. It is to distribute it across an entire ecosystem of organizations that are stronger together than they could ever be apart.',
          },
          {
            heading: 'Structure is what separates intention from impact.',
            body: 'The world is not short on good intentions. It is not short on talented people or promising ideas. What is consistently missing is structure. The governance frameworks that keep organizations accountable over time. The funding mechanisms that allow them to plan beyond the next donation. The institutional credibility that turns a local initiative into something that international partners take seriously. We have seen too many promising efforts collapse not because the people behind them lacked commitment, but because they lacked the scaffolding to sustain what they started. That gap between intention and impact is exactly what Gwags was built to close.',
          },
          {
            heading: 'Credibility is earned through action, not positioning.',
            body: 'Gwags holds itself to the same standards it sets for the organizations within its network. Transparent governance. Measurable outcomes. Honest communication about what is working and what is not. We do not claim credibility through branding or institutional language. We earn it through the quality of our programs, the integrity of our partnerships, and the consistency of our follow-through. That standard is what makes the Gwags network meaningful. When an organization affiliates with Gwags, it signals something real, not because we say so, but because the work behind the name proves it.',
          },
        ],
      },
      lookingAhead: {
        eyebrow: 'LOOKING AHEAD',
        heading: 'What the world looks like if we succeed.',
        paragraphs: [
          'If Gwags achieves what it is setting out to build, the impact space will look fundamentally different.',
          'Organizations working on education will not struggle alone for funding or visibility. They will have an institutional partner that connects them to international networks, provides governance support, and amplifies what they are building. Health initiatives in underserved communities will not collapse after a single campaign because they will be part of a system that provides continuity, shared resources, and strategic direction. Young leaders with real ideas will not be turned away because they lack connections or credentials. They will have access to a platform that invests in their growth and gives them the institutional backing to build something that lasts.',
          'None of this is theoretical. It is the infrastructure Gwags is actively constructing, initiative by initiative, partnership by partnership, decision by decision.',
          'The measure of our success will never be the size of the institution itself. It will be measured by the organizations that grew stronger because of what we built. By the communities that experienced lasting change because someone in the Gwags network showed up with structure, resources, and commitment. By the young people who became leaders not by accident, but because an institution believed in them at the right moment and gave them what they needed to grow.',
          'That is the future we are working toward. And every decision we make today is a step in that direction.',
        ],
      },
      cta: {
        h2: 'Ready to be part of this institution?',
        body: 'Gwags is building something that lasts. If your organization shares that ambition, there is a place for you within our network.',
        btn1: 'Get in touch',
        btn2: 'How we work',
      },
    },
  },
  fr: {
    nav: {
      about: 'À propos',
      initiatives: 'Nos Actions',
      network: 'Réseau',
      getInvolved: 'S\'impliquer',
      contact: 'Contact',
      dropdowns: {
        about: {
          heading: 'À propos',
          description: 'En savoir plus sur nos origines, notre mission, notre fonctionnement et les personnes qui font Gwags.',
          cta: 'En savoir plus sur nous',
          links: [
            { label: 'Notre histoire', href: '/about/our-story' },
            { label: 'Comment nous travaillons', href: '/about/how-we-work' },
            { label: 'Notre rôle', href: '/about/our-role' },
            { label: 'Leadership', href: '/about/leadership' },
          ],
        },
        work: {
          heading: 'Nos Actions',
          description: 'Gwags construit ses propres initiatives et renforce les organisations qui nous entourent.',
          cta: 'Découvrir nos actions',
          initiativesLabel: 'Nos Initiatives',
          networkLabel: 'Notre Réseau',
          networkDescription: 'Un écosystème croissant d\'organisations alignées par des standards partagés et une ambition commune de créer un impact durable.',
          networkCta: 'En savoir plus',
          links: [
            { label: 'Programme Gwags Scholars', href: '/initiatives/scholars' },
            { label: 'Fonds Mbal Lekeaka', href: '/initiatives/mbal-lekeaka-fund' },
            { label: 'Programme de Santé', href: '/initiatives/health-outreach' },
            { label: 'Développement des Jeunes', href: '/initiatives/youth-development' },
          ],
        },
      },
    },
    hero: {
      eyebrow: 'INSTITUTION D\'IMPACT MONDIAL',
      h1Line1: 'Construire l\'infrastructure',
      h1Line2: 'qui',
      h1Highlight: 'transforme les sociétés',
      h1Line3: 'à grande échelle.',
      body: 'Gwags est une institution internationale dédiée à la structuration, à l\'avancement et à la coordination d\'initiatives engagées dans la transformation durable des sociétés. Nous construisons l\'écosystème mondial qui permet aux organisations, aux leaders et aux communautés de grandir.',
      btn1: 'Découvrir nos actions',
      btn2: 'Rejoindre le réseau',
    },
    stats: {
      s1n: '4+', s1l: 'INITIATIVES ACTIVES',
      s2n: '3',  s2l: 'PAYS ACTIFS',
      s3n: '1',  s3l: 'RÉSEAU MONDIAL',
    },
    whatWeAre: {
      eyebrow: 'QUI NOUS SOMMES',
      h2: 'Une institution mondiale construite pour structurer et accélérer l\'impact.',
      p1: 'Gwags opère comme une plateforme mondiale d\'impact, réunissant des acteurs et des structures alignés sur des standards communs d\'excellence, d\'éthique, d\'ambition et de transformation.',
      p2: 'Nous développons et renforçons des écosystèmes dans les domaines de l\'éducation, la gouvernance, l\'entrepreneuriat, la santé, la culture, le sport, l\'innovation, les politiques publiques, le leadership et le développement communautaire.',
      p3: 'Notre conviction est que le progrès durable ne peut émerger qu\'à travers des approches interconnectées et systémiques de l\'impact.',
      link: 'Notre vision et mission',
      pillars: [
        { title: 'Développement institutionnel', desc: 'Nous construisons des structures de gouvernance et des cadres de crédibilité qui aident les organisations à croître avec intégrité.' },
        { title: 'Coordination stratégique', desc: 'Nous connectons les acteurs à travers les secteurs et les territoires via une architecture institutionnelle commune.' },
        { title: 'Collaboration internationale', desc: 'Nous réunissons des organisations qui façonnent des sociétés résilientes et inclusives dans le monde entier.' },
        { title: 'Accélération à grande échelle', desc: 'Nous construisons une infrastructure conçue pour amplifier l\'impact à travers les générations, les communautés et les territoires.' },
      ],
    },
    initiatives: {
      eyebrow: 'NOS INITIATIVES',
      h2: 'Des programmes construits pour créer un changement durable.',
      body: 'Gwags porte son propre portefeuille d\'initiatives, chacune conçue autour d\'une dimension spécifique de la transformation sociale.',
      items: [
        { title: 'Programme Gwags Scholars', desc: 'Un programme phare investissant dans la prochaine génération de leaders africains à travers un soutien financier et des opportunités de développement professionnel.', tag: 'EXCELLENCE' },
        { title: 'Fonds Mbal Lekeaka', desc: 'Un programme de bourses canalisant des ressources directement vers des initiatives communautaires à impact mesurable.', tag: 'COMMUNAUTÉ' },
        { title: 'Programme de Santé Communautaire', desc: 'Apporter des soins de santé gratuits et l\'éducation médicale aux communautés mal desservies.', tag: 'SANTÉ' },
        { title: 'Développement des Jeunes', desc: 'Là où tout a commencé. Gwags continue d\'investir dans la protection, l\'éducation et l\'autonomisation des jeunes vulnérables.', tag: 'JEUNESSE' },
      ],
    },
    whyGwags: {
      eyebrow: 'POURQUOI GWAGS',
      h2: 'Ce que signifie faire partie de cette institution.',
      body: 'Les organisations qui s\'alignent sur Gwags gagnent plus que de la visibilité. Elles gagnent du poids institutionnel, l\'accès à un réseau mondial et le soutien structurel nécessaire pour croître.',
      items: [
        { title: 'Crédibilité', desc: 'L\'association avec Gwags signale un alignement sur un standard reconnu d\'éthique, d\'excellence et d\'impact.' },
        { title: 'Réseau international', desc: 'Accès à un écosystème croissant d\'organisations, d\'institutions et de leaders à travers les secteurs et les frontières.' },
        { title: 'Capacité à grandir', desc: 'Des conseils stratégiques et un soutien structurel pour aider les initiatives ambitieuses à atteindre leur plein potentiel.' },
        { title: 'Voies de financement', desc: 'Accès facilité aux subventions, partenariats et opportunités de financement via un umbrella institutionnel crédible.' },
        { title: 'Visibilité stratégique', desc: 'Gwags amplifie la portée des organisations affiliées via ses plateformes institutionnelles et son positionnement international.' },
        { title: 'Standards de gouvernance', desc: 'Un cadre de meilleures pratiques institutionnelles qui renforce la responsabilité, la transparence et la résilience.' },
      ],
    },
    quote: {
      text: 'Les défis auxquels nos sociétés font face sont trop interconnectés pour qu\'une seule organisation puisse les résoudre seule. Gwags existe pour construire l\'infrastructure qui rend l\'action collective possible afin que les personnes, les initiatives et les institutions engagées dans le changement puissent le faire avec la structure, la crédibilité et le réseau qu\'elles méritent.',
      name: 'Daryll Giovanny Bikak Mbal',
      role: 'Fondateur et Président du Conseil',
      roleOrg: 'Gwags Global Impact Institution',
    },
    ourStory: {
      eyebrow: 'NOTRE HISTOIRE',
      h2: 'D\'une initiative étudiante à une institution mondiale.',
      items: [
        { era: 'LE DÉBUT', title: 'Né d\'une conviction', desc: 'Gwags a débuté comme une initiative étudiante pour soutenir les jeunes orphelins et défavorisés au Cameroun.' },
        { era: 'L\'ÉVOLUTION', title: 'Faire grandir la mission', desc: 'À mesure que les défis devenaient plus clairs, la réponse aussi. Gwags a élargi sa portée et formalisé sa structure à l\'international.' },
        { era: 'MAINTENANT ET AU-DELÀ', title: 'Une institution mondiale', desc: 'Gwags est aujourd\'hui une institution à vocation mondiale, active dans plusieurs pays et secteurs.' },
      ],
    },
    moreAbout: {
      heading: 'PLUS SUR L\'INSTITUTION',
      cards: [
        {
          title: 'Notre histoire',
          desc: 'Découvrez les origines de Gwags et le parcours d\'une initiative étudiante à une institution d\'impact mondiale.',
          link: 'En savoir plus',
          href: '/about/our-story',
        },
        {
          title: 'Comment nous travaillons',
          desc: 'Gwags opère sur deux axes: construire ses propres initiatives et renforcer les organisations qui nous entourent.',
          link: 'En savoir plus',
          href: '/about/how-we-work',
        },
        {
          title: 'Notre réseau',
          desc: 'Un écosystème croissant d\'organisations, d\'institutions et de leaders connectés par des standards partagés et une ambition commune.',
          link: 'En savoir plus',
          href: '/network',
        },
      ],
    },
    getInvolved: {
      eyebrow: 'S\'IMPLIQUER',
      h2: 'Il y a une place pour vous au sein du réseau Gwags.',
      body: 'Que vous représentiez un gouvernement, une ONG, une fondation ou une initiative cherchant à grandir, Gwags est conçu pour être votre partenaire institutionnel.',
      items: [
        { title: 'Organisations', desc: 'Rejoignez un réseau d\'institutions alignées par des standards communs et une ambition commune de transformer les sociétés.' },
        { title: 'Donateurs et financeurs', desc: 'Dirigez votre soutien vers des programmes crédibles et structurés avec une gouvernance claire et des résultats mesurables.' },
        { title: 'Partenaires institutionnels', desc: 'Alignez-vous avec Gwags au niveau stratégique pour co-développer des programmes et amplifier l\'impact collectif.' },
      ],
    },
    getInvolvedPage: {
      hero: {
        eyebrow: 'S\'IMPLIQUER',
        h1: 'Il y a une place pour vous.',
        body: 'Que vous représentiez un organisme gouvernemental, une ONG, une fondation ou une initiative cherchant à se développer, Gwags est conçu pour être votre partenaire institutionnel. Voici comment vous pouvez faire partie de ce que nous construisons.',
      },
      partner: {
        eyebrow: 'DEVENIR PARTENAIRE',
        heading: 'Alignez-vous avec Gwags au niveau institutionnel.',
        body: 'Gwags s\'associe à des organisations, des gouvernements et des institutions qui partagent notre engagement pour un impact structuré et durable. Le partenariat signifie un alignement stratégique, des ressources partagées et une action coordonnée vers des objectifs plus grands qu\'une seule organisation. Si vous dirigez une organisation ou représentez une institution engagée dans un changement durable, nous voulons vous entendre.',
        cta: 'Exprimer son intérêt',
      },
      support: {
        eyebrow: 'SOUTENIR NOTRE TRAVAIL',
        heading: 'Investir dans une infrastructure qui dure.',
        body: 'Gwags est financé par une combinaison de subventions, de partenariats et de contributions individuelles. Chaque contribution soutient les programmes que nous gérons et l\'infrastructure institutionnelle que nous construisons pour des organisations à travers le monde. Votre soutien ne finance pas seulement un projet. Il renforce tout un écosystème conçu pour rendre l\'impact plus structuré, plus crédible et plus durable.',
        cta: 'Soutenir Gwags',
      },
      contact: {
        eyebrow: 'CONTACT',
        heading: 'Prenez contact avec nous.',
        body: 'Pour des demandes générales, des discussions de partenariat, des demandes médias ou toute autre question, contactez-nous directement.',
        // Update this email address when ready
        email: 'contact@gwags.org',
        responseTime: 'Nous visons à répondre dans les 48 heures.',
      },
      cta: {
        h2: 'Prêt à construire quelque chose qui dure?',
        body: 'Gwags construit une infrastructure internationale pour l\'impact. Contactez-nous pour explorer comment nous pouvons travailler ensemble.',
        btn: 'Retour à l\'accueil',
      },
    },
    cta: {
      h2: 'Prêt à construire quelque chose qui dure?',
      body: 'Gwags construit une infrastructure internationale pour l\'impact. Contactez-nous pour explorer comment nous pouvons travailler ensemble.',
      btn1: 'Nous contacter',
      btn2: 'Comment nous travaillons',
    },
    footer: {
      tagline: 'Un réseau mondial. Une vision commune. Un impact durable.',
      col1: { heading: 'INSTITUTION', links: [
        { label: 'Notre histoire', href: '/about/our-story' },
        { label: 'Comment nous travaillons', href: '/about/how-we-work' },
        { label: 'Notre rôle', href: '/about/our-role' },
      ]},
      col2: { heading: 'S\'IMPLIQUER', links: [
        { label: 'Devenir partenaire', href: '/get-involved' },
        { label: 'Soutenir notre travail', href: '/get-involved' },
        { label: 'Contact', href: '/get-involved' },
      ]},
      copy: '2026 Gwags Global Impact Institution',
      privacy: 'Confidentialité',
      terms: 'Conditions',
    },
    howWeWork: {
      hero: {
        eyebrow: 'COMMENT NOUS TRAVAILLONS',
        h1: 'Deux rôles. Une mission.',
        body: "Gwags opère sur deux axes parallèles qui se renforcent mutuellement. Nous concevons et gérons nos propres initiatives dans les domaines de l'éducation, de la santé et du développement communautaire, en restant proches des réalités du terrain. Et nous servons d'infrastructure institutionnelle pour coordonner, soutenir et renforcer d'autres organisations engagées dans la création d'un impact durable. Aucun de ces rôles ne fonctionne aussi bien sans l'autre.",
      },
      split: {
        left: {
          label: 'ACTION DIRECTE',
          heading: 'Nous construisons nos propres initiatives.',
          body: [
            "Gwags ne se contente pas de coordonner. Nous concevons et mettons en oeuvre des programmes qui répondent à de véritables besoins sur le terrain. Des bourses qui investissent dans les talents académiques aux campagnes de santé qui apportent des soins médicaux gratuits aux districts mal desservis, nos initiatives sont construites avec une structure claire, des résultats mesurables et un engagement envers la cohérence dans le temps.",
            "Notre portefeuille actuel couvre quatre programmes actifs dans les domaines de l'éducation, de la santé, du développement communautaire et de l'autonomisation des jeunes. Chacun a été créé pour combler un écart que nous avons identifié directement au fil de nos années d'engagement direct avec les communautés que nous servons. Ces programmes ne sont pas des projets secondaires. Ils sont au coeur de ce que nous sommes en tant qu'institution et ils éclairent chaque aspect de notre soutien aux organisations qui nous entourent.",
            "Gérer nos propres initiatives nous donne quelque chose que de nombreuses plateformes institutionnelles n'ont pas: une expérience opérationnelle directe. Nous comprenons les défis de la mise en oeuvre parce que nous les affrontons nous-mêmes. Cette compréhension rend nos conseils, nos normes et notre soutien aux organisations affiliées plus pratiques et plus crédibles.",
          ],
        },
        right: {
          label: 'SOUTIEN INSTITUTIONNEL',
          heading: 'Nous renforçons les organisations qui nous entourent.',
          body: [
            "De nombreuses initiatives à travers le monde accomplissent un travail significatif mais se heurtent aux mêmes obstacles. Financement limité. Gouvernance fragile. Pas d'accès aux réseaux internationaux. Pas de crédibilité institutionnelle pour débloquer des partenariats ou attirer des investissements sérieux. Et pas de soutien stratégique pour les aider à croître au-delà de leur portée immédiate.",
            "Ce ne sont pas des échecs d'ambition. Ce sont des lacunes dans l'infrastructure. Et c'est précisément ce que Gwags est conçu pour combler.",
            "Grâce à l'affiliation, à la coordination stratégique et aux normes institutionnelles partagées, nous fournissons aux organisations la crédibilité, la structure et la portée dont elles ont besoin pour développer leur impact de manière durable. Nous n'absorbons pas les organisations et ne les privons pas de leur identité. Nous créons les conditions pour qu'elles deviennent plus fortes, plus visibles et plus efficaces au sein d'un réseau fondé sur des valeurs partagées et un bénéfice mutuel.",
            "Notre rôle n'est pas de concurrencer les organisations que nous soutenons. C'est de les rendre mieux positionnées, mieux gouvernées et mieux connectées qu'elles ne le seraient seules.",
          ],
        },
      },
      initiatives: {
        eyebrow: 'NOS INITIATIVES ACTIVES',
        items: [
          { title: 'Programme Gwags Scholars', desc: 'Un programme phare investissant dans la prochaine génération de leaders africains à travers un soutien financier et des opportunités de développement professionnel.', href: '/initiatives/scholars' },
          { title: 'Fonds Mbal Lekeaka', desc: 'Canaliser les ressources vers des initiatives communautaires à impact mesurable.', href: '/initiatives/mbal-lekeaka-fund' },
          { title: 'Programme de Santé', desc: 'Apporter des soins gratuits aux communautés mal desservies via des campagnes de terrain.', href: '/initiatives/health-outreach' },
          { title: 'Développement des Jeunes', desc: "Protéger, éduquer et autonomiser les jeunes vulnérables depuis le premier jour.", href: '/initiatives/youth-development' },
        ],
      },
      coordination: {
        eyebrow: 'LE MODÈLE DE COORDINATION',
        h2: "Comment fonctionne l'affiliation.",
        intro: "Les organisations qui s'alignent sur Gwags entrent dans un partenariat structuré fondé sur des valeurs partagées, des attentes claires et un bénéfice mutuel. Le modèle est intentionnellement conçu pour renforcer sans contraindre. L'affiliation n'est pas une transaction. C'est une relation institutionnelle à long terme.",
        steps: [
          {
            title: 'Vision et valeurs partagées',
            body: "Chaque affiliation commence par un alignement. Les organisations doivent démontrer un engagement sincère envers les normes qui définissent Gwags en tant qu'institution: gouvernance éthique, transparence, responsabilité et une approche mesurable de l'impact. Ce n'est pas une formalité. C'est le fondement de tout ce qui suit. Gwags ne grandit pas en abaissant la barre. Nous grandissons en trouvant des organisations qui la satisfont déjà ou qui s'engagent à l'atteindre.",
          },
          {
            title: 'Rejoindre le réseau',
            body: "Une fois l'alignement établi, les organisations accèdent au cadre institutionnel de Gwags. Cela comprend l'utilisation de la marque Gwags selon des directives définies, l'intégration dans le réseau élargi et l'accès aux ressources, aux connaissances et aux structures de soutien conçues pour accélérer leur croissance. Les organisations affiliées conservent leur identité juridique, leur leadership et leur indépendance opérationnelle. Ce qui change, c'est le poids institutionnel derrière elles.",
          },
          {
            title: 'Intégration stratégique',
            body: "L'affiliation n'est pas passive. Gwags travaille activement avec les organisations affiliées pour coordonner les programmes, aligner les objectifs stratégiques et identifier les opportunités de collaboration au sein du réseau. Lorsque cela est pertinent, les ressources sont partagées, les programmes sont co-développés et des stratégies collectives sont élaborées. L'objectif n'est pas un contrôle centralisé mais un impact coordonné, s'assurant que le travail des organisations individuelles contribue à quelque chose de plus grand que ce qu'elles pourraient accomplir seules.",
          },
          {
            title: 'Croître ensemble',
            body: "Le but ultime du modèle Gwags est la croissance. Non pas la croissance pour elle-même, mais la croissance en impact, en portée et en capacité de chaque organisation du réseau à accomplir sa mission. Grâce au réseau, les organisations affiliées accèdent à des voies de financement, des partenariats internationaux, des cadres de gouvernance et une visibilité stratégique qu'il serait extrêmement difficile de construire de manière indépendante. À mesure que chaque organisation grandit, le réseau grandit. Et à mesure que le réseau grandit, la possibilité d'une transformation systémique et durable s'accroît.",
          },
        ],
      },
      workingWith: {
        eyebrow: 'TRAVAILLER AVEC GWAGS',
        h2: 'À quoi s\'attendre.',
        cards: [
          {
            title: 'Autonomie et structure',
            body: "Les organisations affiliées conservent leur identité, leur leadership et leur indépendance décisionnelle. Gwags ne dicte pas la façon dont vous gérez vos programmes. Ce que nous fournissons, c'est un cadre de gouvernance, des normes institutionnelles et un système de soutien qui renforce votre organisation sans la rendre dépendante. Vous restez aux commandes. Nous veillons à ce que vous ayez les outils pour diriger efficacement.",
          },
          {
            title: 'Responsabilité dans les deux sens',
            body: "Nous tenons nos partenaires à des normes élevées parce que la crédibilité est la monnaie de ce travail. Des rapports transparents, une gouvernance éthique et des résultats mesurables ne sont pas facultatifs. Mais la responsabilité chez Gwags n'est pas à sens unique. Nous nous tenons aux mêmes normes que nous attendons des autres, et nous sommes transparents sur nos propres progrès, nos défis et nos décisions.",
          },
          {
            title: 'Engagement à long terme',
            body: "Gwags ne s'intéresse pas aux partenariats à court terme qui semblent bons sur le papier et se dissolvent après un cycle de financement. Nous investissons dans des relations construites pour durer, conçues pour s'approfondir avec le temps et structurées pour multiplier l'impact année après année. Si vous cherchez une collaboration rapide, nous ne sommes probablement pas le bon partenaire. Si vous construisez quelque chose qui doit durer, nous sommes exactement le bon partenaire.",
          },
        ],
      },
      cta: {
        h2: 'Intéressé par un partenariat?',
        body: "Que vous dirigiez une organisation, gériez un fonds ou représentiez une institution, Gwags est conçu pour être votre partenaire dans l'impact.",
        btn1: 'Nous contacter',
        btn2: 'En savoir plus sur notre rôle',
      },
    },
    ourStoryPage: {
      hero: {
        eyebrow: 'NOTRE HISTOIRE',
        h1: 'Comment tout a commencé.',
      },
      photoBanner: 'PHOTO PRINCIPALE',
      narrative: [
        "En décembre 2021, quatre lycéens à Douala, au Cameroun, devaient réaliser un projet de service communautaire dans le cadre de leur programme scolaire. Pour répondre à cette exigence, ils ont organisé une visite à l'orphelinat Ami de Jésuite, où ils ont passé du temps avec les enfants, fourni des fournitures essentielles et constaté de première main les conditions que ces enfants affrontaient au quotidien.",
        "L'expérience a laissé une impression durable. Ils ont rencontré des enfants disposant de ressources limitées et de peu d'opportunités, mais dotés d'un potentiel indéniable. Les lacunes étaient évidentes, mais la possibilité de ce qu'un soutien constant et structuré pourrait débloquer au fil du temps l'était tout autant.",
        "Cette visite devait remplir un devoir scolaire. Mais ce qu'ils ont vécu a rendu impossible de la traiter comme un effort ponctuel. Elle est devenue le point de départ d'un engagement bien plus grand.",
        "L'année suivante, l'équipe a organisé une deuxième initiative. Cette fois, ils se sont associés à une organisation camerounaise appelée Codam Technologies pour offrir aux enfants une exposition pratique à la technologie. La portée du travail avait déjà largement dépassé le soutien de base, et ce qui avait commencé comme une visite dans un orphelinat évoluait vers quelque chose de plus structuré.",
        "Au fil des mois qui ont suivi, les fondateurs ont réfléchi aux défis plus profonds dont ils avaient été témoins. Les obstacles auxquels faisaient face les enfants et les jeunes à travers le Cameroun n'étaient pas isolés. Ils étaient systémiques. Les lacunes éducatives, les pénuries de soins de santé, l'accès limité à la technologie et la faiblesse du soutien institutionnel alimentaient tous le même cycle.",
        "Aucun projet isolé ne pouvait répondre à tout cela. Mais une organisation correctement structurée, dotée de la capacité de concevoir et de gérer des programmes dans différents secteurs tels que l'éducation et la santé, pourrait commencer à faire une vraie différence. Cette prise de conscience a poussé l'équipe à cesser de raisonner en termes de projets individuels et à commencer à construire sur le long terme.",
        "Ce qui a suivi fut une série d'étapes décisives. L'équipe a incorporé la Fondation Gwags en tant qu'organisation à but non lucratif aux États-Unis et au Cameroun, établissant les bases juridiques et institutionnelles nécessaires à des opérations durables. De nouvelles initiatives ont été lancées dans les domaines de l'éducation, du développement communautaire, de la santé et de l'autonomisation des jeunes. Ce qui avait commencé comme des visites dans un orphelinat devenait une organisation multisectorielle avec un portefeuille croissant de programmes et de partenariats.",
        "Mais plus l'équipe construisait, plus une évidence s'imposait. Gérer des programmes ne suffisait pas. Le véritable défi n'était pas seulement de produire de l'impact, mais de le structurer. À travers le monde, d'innombrables organisations font un travail significatif tout en luttant contre les mêmes obstacles. Un financement limité, une gouvernance faible, aucun accès aux réseaux et aucune structure institutionnelle pour les aider à grandir.",
        "Cette prise de conscience a marqué un tournant décisif dans le parcours de Gwags. La mission ne concernait plus uniquement ce que Gwags pouvait faire directement. Il s'agissait de construire l'infrastructure qui permettrait aux organisations de faire davantage. Une institution capable de coordonner, soutenir et renforcer les organisations qui s'efforcent de créer de l'impact. Une plateforme où la crédibilité, la structure et la portée internationale pourraient être partagées, et non monopolisées.",
        "Aujourd'hui, Gwags a formellement opéré sa transition d'une fondation vers une Institution d'Impact Mondial. Le nom a changé. Le positionnement a changé. Mais la conviction qui a tout lancé est restée exactement la même: investir dans les personnes, construire avec intention, et ne jamais traiter le soutien comme quelque chose de temporaire.",
        "Aujourd'hui, Gwags opère dans plusieurs pays et secteurs, construisant un écosystème conçu pour accélérer l'impact à grande échelle. Les programmes continuent de croître. Le réseau continue de s'étendre. Et l'infrastructure qui permettra à des générations d'organisations et de communautés de transformer leurs sociétés se construit, étape par étape, depuis la base.",
      ],
      timeline: {
        eyebrow: 'LA CHRONOLOGIE',
        h2: 'Les étapes qui ont façonné Gwags.',
        entries: [
          {
            year: '2021', month: 'DÉCEMBRE',
            title: "Première visite à l'orphelinat",
            body: "Quatre lycéens à Douala, au Cameroun, doivent réaliser un projet de service communautaire dans le cadre de leur programme scolaire. Ils organisent une visite à l'orphelinat Ami de Jésuite, où ils passent du temps avec les enfants, fournissent des fournitures essentielles et constatent de première main les réalités auxquelles ces enfants font face au quotidien. Ce qui devait remplir un devoir scolaire devient le point de départ d'un engagement bien plus grand.",
            photo: "Photo: orphelinat",
          },
          {
            year: '2022', month: 'DÉCEMBRE',
            title: 'Partenariat avec Codam Technologies',
            body: "Gwags s'associe à Codam Technologies, une startup camerounaise d'éducation technologique, pour organiser des ateliers pratiques lors de la deuxième initiative à l'orphelinat. Les enfants découvrent pour la première fois l'impression 3D, les bases du codage et des outils numériques concrets.",
            photo: 'Photo: atelier technologique',
          },
          {
            year: '2025', month: 'MAI',
            title: 'Incorporation aux États-Unis',
            body: "Gwags formalise sa structure en s'incorporant comme organisation à but non lucratif dans le Maryland, aux États-Unis. La procédure de demande du statut 501(c)(3) est lancée, établissant les bases juridiques et institutionnelles pour des opérations internationales.",
            photo: '',
          },
          {
            year: '2026', month: 'JANVIER',
            title: 'Lancement du Programme Gwags Scholars',
            body: "Gwags lance sa première initiative phare, un programme de bourses attribuant des subventions à des étudiants universitaires à travers le Cameroun. Le programme reconnaît l'excellence académique et investit dans la prochaine génération de leaders africains.",
            photo: 'Photo: programme Scholars',
          },
          {
            year: '2026', month: 'JUILLET',
            title: 'Lancement du Fonds Mbal Lekeaka',
            body: "Gwags crée un programme de subventions dédié au financement d'initiatives communautaires au Cameroun. Le premier projet soutenu est la Campagne de Santé Nguti 2026, cofinancée avec le soutien de partenaires stratégiques.",
            photo: 'Photo: initiative communautaire',
          },
          {
            year: '2026', month: 'AOÛT',
            title: 'Première Campagne de Santé Communautaire',
            body: "En partenariat avec la CAMESA, Gwags soutient une mission médicale d'une semaine dans le District de Santé de Nguti, déployant 120 professionnels de santé pour offrir des consultations gratuites, des opérations, des dépistages et une éducation sanitaire à plus de 1 500 personnes dans des communautés mal desservies.",
            photo: 'Photo: campagne de santé',
          },
          {
            year: '2026', month: 'SEPTEMBRE',
            title: "Transition vers Institution d'Impact Mondial",
            body: "Gwags évolue officiellement au-delà du modèle fondation, se repositionnant comme Institution d'Impact Mondial dédiée à la structuration, la coordination et l'accélération d'initiatives engagées dans la transformation durable des sociétés à grande échelle.",
            photo: '',
          },
        ],
      },
      narrativeHeadings: [
        null,
        null,
        null,
        'Une deuxième étape, une vision plus large',
        "Voir l'ensemble du tableau",
        null,
        'Construire les fondations',
        'Le tournant',
        null,
        'Un nouveau chapitre',
        null,
      ],
      closing: {
        h2: "L'histoire s'écrit encore.",
        body: "Gwags est une institution en mouvement. Si vous souhaitez faire partie de ce qui vient ensuite, il y a une place pour vous dans ce réseau.",
        btn: "S'impliquer",
      },
    },
    ourRole: {
      hero: {
        eyebrow: 'NOTRE RÔLE',
        h1: "Nous existons pour structurer ce que d'autres commencent.",
        body: "Partout dans le monde, des organisations et des individus travaillent à résoudre certains des défis les plus pressants auxquels font face les communautés. Beaucoup sont animés par un engagement profond et une compréhension directe des problèmes. Mais l'engagement seul ne suffit pas pour créer un changement durable. C'est là qu'intervient Gwags.",
      },
      narrative: {
        section1: {
          heading: 'Pourquoi Gwags existe.',
          paragraphs: [
            "Gwags n'a pas été créé pour ajouter une organisation de plus à un paysage déjà encombré. Il a été créé parce que le paysage lui-même manque de quelque chose de fondamental.",
            "Les initiatives ne manquent pas. Les personnes talentueuses et motivées qui cherchent à faire une différence ne manquent pas non plus. Ce qui manque, de manière constante et dans presque tous les secteurs, c'est l'infrastructure. Les cadres de gouvernance qui maintiennent les organisations responsables. Les voies de financement qui leur permettent de planifier au-delà du prochain cycle de subventions. Les réseaux qui les connectent aux partenaires, aux connaissances et aux opportunités auxquels elles ne peuvent pas accéder par elles-mêmes. La crédibilité institutionnelle qui ouvre des portes que le talent seul ne peut pas.",
            "Sans cette infrastructure, même les initiatives les plus prometteuses sont livrées à elles-mêmes. Certaines réussissent malgré les obstacles. Beaucoup n'y parviennent pas. Et celles qui échouent échouent rarement parce que les personnes qui les portent n'étaient pas assez compétentes. Elles échouent parce que le système autour d'elles n'était pas conçu pour soutenir ce qu'elles essayaient de faire.",
            "Gwags existe pour changer cela. Nous construisons la couche institutionnelle qui s'étend sous le travail, l'infrastructure qui permet aux organisations, aux leaders et aux communautés de créer un impact qui ne dépend pas de la chance, des relations personnelles ou d'une seule source de financement.",
          ],
        },
        section2: {
          heading: "Ce que nous entendons par institution d'impact.",
          paragraphs: [
            "Le terme institution est délibéré. Gwags n'est pas un projet. Ce n'est pas une campagne. Il n'est pas construit autour d'une seule cause ou d'un seul cycle de financement. Il est conçu pour être permanent, pour grandir avec le temps et pour durer au-delà de tout leader ou programme individuel.",
            "Une institution établit des normes. Elle construit des systèmes. Elle crée des cadres sur lesquels d'autres personnes et organisations peuvent s'appuyer. C'est ce que fait Gwags. Nous ne gérons pas seulement des programmes, bien que nous gérions nos propres initiatives dans les domaines de l'éducation, de la santé, du développement communautaire et de l'autonomisation des jeunes. Nous construisons les systèmes qui permettent aux programmes de mieux fonctionner, de durer plus longtemps et d'atteindre plus loin.",
            "Une fondation écrit des chèques. Un réseau fait des introductions. Une institution construit l'architecture sous-jacente qui rend ces deux choses plus efficaces, plus durables et plus évolutives. C'est la distinction, et c'est le rôle que joue Gwags.",
          ],
        },
      },
      visionMission: {
        vision: {
          label: 'NOTRE VISION',
          main: "Construire l'infrastructure internationale la plus impactante dédiée à l'accélération, la structuration et la coordination des initiatives, organisations et leaders qui transforment durablement les sociétés.",
          expansion: "Ce n'est pas une vision pour Gwags seul. C'est une vision pour l'écosystème que nous construisons. Un monde où les organisations engagées dans l'impact ne luttent pas seules pour les ressources, la crédibilité ou la direction. Où l'infrastructure pour soutenir leur croissance existe déjà, et où le progrès collectif n'est pas une aspiration mais une réalité opérationnelle.",
        },
        mission: {
          label: 'NOTRE MISSION',
          main: "Accélérer et amplifier l'impact mondial en connectant les organisations, initiatives et acteurs engagés dans le développement humain, l'innovation sociale et la transformation durable des communautés.",
          expansion: "Nous accomplissons cette mission sur deux fronts. Directement, à travers notre propre portefeuille d'initiatives qui répondent à de véritables besoins sur le terrain. Et institutionnellement, en servant de plateforme de coordination qui renforce, connecte et élève les organisations qui nous entourent. Ces deux rôles ne sont pas séparés. Ils se renforcent mutuellement. L'expérience que nous acquérons en gérant des programmes rend notre soutien institutionnel plus crédible. Et le cadre institutionnel que nous construisons rend nos programmes plus durables.",
        },
      },
      convictions: {
        eyebrow: 'CE QUI NOUS ANIME',
        heading: 'Les convictions derrière tout ce que nous construisons.',
        intro: "Nous n'opérons pas seulement à partir d'un plan stratégique. Nous opérons à partir d'un ensemble de convictions qui ont façonné chaque décision prise par Gwags depuis sa fondation. Ce ne sont pas des slogans. Ce sont les principes à l'aune desquels nous nous évaluons.",
        items: [
          {
            heading: "L'impact est systémique.",
            body: "Les défis auxquels font face les communautés ne sont pas des problèmes isolés avec des solutions isolées. L'éducation, la santé, la gouvernance, l'entrepreneuriat, la culture, la technologie, tout cela est interconnecté. Un enfant en bonne santé mais qui n'a pas accès à l'éducation est toujours freiné. Une communauté avec des écoles mais sans infrastructure de soins de santé est toujours vulnérable. Un jeune entrepreneur avec une idée solide mais sans soutien institutionnel a toujours peu de chances de réussir. Gwags travaille dans tous les secteurs parce que nous croyons que la transformation n'advient que lorsqu'on s'attaque à l'ensemble du tableau. C'est pourquoi nos initiatives couvrent l'éducation, la santé, le développement communautaire et l'autonomisation des jeunes. Et c'est pourquoi notre modèle institutionnel est conçu pour connecter plutôt que spécialiser.",
          },
          {
            heading: "L'action collective est la seule voie vers un changement durable.",
            body: "Aucune organisation, aussi bien financée ou bien intentionnée soit-elle, ne peut seule résoudre les défis auxquels font face les communautés. Les problèmes sont trop interconnectés, trop profondément enracinés et trop vastes. Gwags a été construit sur la conviction que la manière la plus efficace de créer une transformation durable n'est pas d'agir plus seul, mais de construire les systèmes qui permettent à davantage de personnes et d'organisations d'agir ensemble avec structure, objectif et responsabilité. C'est pourquoi notre modèle est conçu autour de la coordination et de la construction de réseaux plutôt que de la prestation centralisée. L'objectif n'est pas de concentrer l'impact dans une seule institution. C'est de le distribuer à travers tout un écosystème d'organisations plus fortes ensemble qu'elles ne pourraient l'être séparément.",
          },
          {
            heading: "La structure est ce qui sépare l'intention de l'impact.",
            body: "Le monde ne manque pas de bonnes intentions. Il ne manque pas de personnes talentueuses ni d'idées prometteuses. Ce qui manque de manière constante, c'est la structure. Les cadres de gouvernance qui maintiennent les organisations responsables dans le temps. Les mécanismes de financement qui leur permettent de planifier au-delà du prochain don. La crédibilité institutionnelle qui transforme une initiative locale en quelque chose que les partenaires internationaux prennent au sérieux. Nous avons vu trop d'efforts prometteurs s'effondrer non pas parce que les personnes qui les portaient manquaient d'engagement, mais parce qu'elles manquaient d'échafaudage pour soutenir ce qu'elles avaient commencé. C'est précisément cet écart entre intention et impact que Gwags a été construit pour combler.",
          },
          {
            heading: "La crédibilité se gagne par l'action, pas par le positionnement.",
            body: "Gwags se tient aux mêmes exigences qu'il fixe pour les organisations de son réseau. Gouvernance transparente. Résultats mesurables. Communication honnête sur ce qui fonctionne et ce qui ne fonctionne pas. Nous ne revendiquons pas la crédibilité par l'image de marque ou le langage institutionnel. Nous la gagnons par la qualité de nos programmes, l'intégrité de nos partenariats et la constance de nos engagements. C'est cette exigence qui donne du sens au réseau Gwags. Quand une organisation s'affilie à Gwags, cela signale quelque chose de réel, non pas parce que nous le disons, mais parce que le travail derrière le nom le prouve.",
          },
        ],
      },
      lookingAhead: {
        eyebrow: "REGARDER VERS L'AVENIR",
        heading: 'À quoi ressemble le monde si nous réussissons.',
        paragraphs: [
          "Si Gwags atteint ce qu'il cherche à construire, l'espace de l'impact aura une apparence fondamentalement différente.",
          "Les organisations qui travaillent sur l'éducation ne lutteront pas seules pour le financement ou la visibilité. Elles auront un partenaire institutionnel qui les connecte à des réseaux internationaux, fournit un soutien en matière de gouvernance et amplifie ce qu'elles construisent. Les initiatives de santé dans les communautés mal desservies ne s'effondreront pas après une seule campagne parce qu'elles feront partie d'un système qui assure la continuité, les ressources partagées et l'orientation stratégique. Les jeunes leaders avec de vraies idées ne seront pas rejetés parce qu'ils manquent de connexions ou de références. Ils auront accès à une plateforme qui investit dans leur croissance et leur donne le soutien institutionnel pour construire quelque chose qui dure.",
          "Rien de tout cela n'est théorique. C'est l'infrastructure que Gwags construit activement, initiative par initiative, partenariat par partenariat, décision par décision.",
          "La mesure de notre succès ne sera jamais la taille de l'institution elle-même. Elle sera mesurée par les organisations qui sont devenues plus fortes grâce à ce que nous avons construit. Par les communautés qui ont connu un changement durable parce que quelqu'un dans le réseau Gwags s'est présenté avec structure, ressources et engagement. Par les jeunes qui sont devenus des leaders non par accident, mais parce qu'une institution a cru en eux au bon moment et leur a donné ce dont ils avaient besoin pour grandir.",
          "C'est l'avenir vers lequel nous travaillons. Et chaque décision que nous prenons aujourd'hui est un pas dans cette direction.",
        ],
      },
      cta: {
        h2: 'Prêt à faire partie de cette institution?',
        body: "Gwags construit quelque chose qui dure. Si votre organisation partage cette ambition, il y a une place pour vous au sein de notre réseau.",
        btn1: 'Nous contacter',
        btn2: 'Comment nous travaillons',
      },
    },
  },
}