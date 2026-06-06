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
      body: '',
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
      p1: 'Gwags operates as a global institutional platform, bringing together organizations aligned by shared standards and a common commitment to impact across the sectors that shape how societies develop.',
      p2: 'The institution was built on the recognition that the challenges facing communities are too interconnected to be addressed in isolation. Lasting change requires coordinated action, shared infrastructure, and organizations that are equipped to grow beyond their immediate reach.',
      p3: '',
      link: 'Our vision and mission',
      pillars: [
        { title: 'Institutional development', desc: 'We build governance structures and credibility frameworks that help organizations grow with integrity.' },
        { title: 'Strategic coordination', desc: 'We connect organizations across sectors and territories through a shared institutional architecture.' },
        { title: 'International collaboration', desc: 'We bring together organizations shaping resilient, inclusive societies around the world.' },
        { title: 'Acceleration at scale', desc: 'We are building an infrastructure designed to amplify impact across generations, communities and territories.' },
      ],
    },
    initiatives: {
      eyebrow: 'OUR INITIATIVES',
      h2: 'Programs built to create lasting change.',
      body: 'Gwags carries its own portfolio of initiatives, each designed around a specific dimension of societal transformation. These are the building blocks of our broader institutional mission.',
      items: [
        { title: 'Gwags Scholars Program', desc: 'Providing financial support and professional development opportunities to outstanding Cameroonian university students.', tag: 'EXCELLENCE' },
        { title: 'Mbal Lekeaka Fund', desc: 'A grant program channeling resources directly into community-led initiatives that demonstrate real, measurable impact on the ground.', tag: 'COMMUNITY' },
        { title: 'Health Outreach Program', desc: 'Bringing free healthcare and medical education to underserved communities through structured field campaigns.', tag: 'HEALTH' },
        { title: 'Ajong Foretia Orphan Support', desc: 'Supporting orphaned children through the provision of essential living supplies and educational opportunities.', tag: 'YOUTH' },
      ],
    },
    whyGwags: {
      eyebrow: 'WHY GWAGS',
      h2: 'What it means to be part of this institution.',
      body: 'Organizations affiliated with Gwags gain visibility, institutional weight, access to a global network, and the structural support needed to grow with credibility and purpose.',
      items: [
        { title: 'Credibility', desc: 'Association with Gwags signals alignment with a recognized standard of ethics, excellence and impact.' },
        { title: 'International network', desc: 'Access to a growing ecosystem of organizations across sectors and borders.' },
        { title: 'Capacity to scale', desc: 'Strategic guidance and structural support to help ambitious initiatives reach their full potential.' },
        { title: 'Funding pathways', desc: 'Easier access to grants, partnerships and financing opportunities through a credible institutional umbrella.' },
        { title: 'Strategic visibility', desc: 'Gwags amplifies the reach of affiliated organizations through institutional platforms and international positioning.' },
        { title: 'Governance standards', desc: 'A framework of institutional best practices that strengthens accountability, transparency and long-term resilience.' },
      ],
    },
    quote: {
      text: 'The challenges facing our societies are too interconnected for any single organization to solve alone. Gwags exists to build the infrastructure that makes collective action possible so that the initiatives and institutions committed to change can do so with the structure, credibility and network they deserve.',
      name: 'Daryll Giovanny Bikak Mbal',
      role: 'Chair, Board Member',
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
          desc: 'A growing ecosystem of organizations connected by shared standards and a common ambition.',
          link: 'Learn more',
          // TODO: Update to /network when network page is created
          href: '/get-involved',
        },
      ],
    },
    getInvolved: {
      eyebrow: 'GET INVOLVED',
      h2: 'Three ways to engage with Gwags.',
      body: '',
      items: [
        { title: 'Affiliation', desc: 'Join the Gwags institutional network and access the infrastructure, resources, and collaborative ecosystem needed to amplify your impact.' },
        { title: 'Funding', desc: 'Direct your support toward programs with defined frameworks and measurable outcomes.' },
        { title: 'Partnership', desc: 'Work with Gwags to co-develop programs, share resources and expertise, and build toward a common vision.' },
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
        body: 'Gwags operates on two parallel tracks that reinforce each other. We build and run initiatives across different sectors including education, health, and community development. And we serve as an institutional infrastructure that coordinates, supports, and strengthens other organizations committed to creating impact.',
      },
      split: {
        left: {
          label: 'DIRECT ACTION',
          heading: 'We build our own initiatives.',
          body: [
            'Gwags designs and delivers programs that address needs on the ground. The current portfolio spans education, health, community development, and youth empowerment. Each initiative was created to fill a gap identified firsthand through years of direct engagement with the communities we serve. They are core to who we are as an institution and they shape every aspect of how we operate.',
            'Running these initiatives provides something that many institutional platforms lack: direct operational experience. We understand the challenges of implementation because we face them ourselves. That understanding makes the support we offer to affiliated organizations more grounded and credible.',
          ],
        },
        right: {
          label: 'INSTITUTIONAL SUPPORT',
          heading: 'We strengthen the organizations around us.',
          body: [
            'Across the world, organizations doing meaningful work face the same structural barriers. Limited funding. Weak governance. No access to international networks. No institutional credibility to attract serious investment. And no strategic support to grow beyond their immediate reach. These are gaps in infrastructure, and they are exactly what Gwags is designed to address.',
            'Through affiliation, strategic coordination, shared resources, and institutional standards, Gwags provides organizations with the credibility, structure, and reach they need to scale sustainably. Organizations retain their identity and autonomy. What changes is the institutional weight behind them, and the network they become part of.',
          ],
        },
      },
      initiatives: {
        eyebrow: 'OUR INITIATIVES',
        items: [
          { title: 'Gwags Scholars Program', desc: 'A flagship program investing in the next generation of Cameroonian leaders through financial support and professional development opportunities.', tag: 'EXCELLENCE', href: '/initiatives/scholars' },
          { title: 'Mbal Lekeaka Fund', desc: 'A grant program channeling resources directly into community-led initiatives that demonstrate real, measurable impact on the ground.', tag: 'COMMUNITY', href: '/initiatives/mbal-lekeaka-fund' },
          { title: 'Health Outreach Program', desc: 'Bringing free healthcare and medical education to underserved communities through structured field campaigns.', tag: 'HEALTH', href: '/initiatives/health-outreach' },
          { title: 'Ajong Foretia Orphan Support', desc: 'A program dedicated to supporting orphaned children in Cameroon, providing essential resources, educational opportunities, and long-term care to ensure their wellbeing and development.', tag: 'YOUTH', href: '/initiatives/youth-development' },
        ],
      },
      coordination: {
        eyebrow: 'THE COORDINATION MODEL',
        h2: 'How affiliation works.',
        intro: "Through affiliation, organizations join the Gwags network under a long-term institutional relationship. Gwags provides governance support, strategic coordination, and access to a broader ecosystem. Affiliated organizations align with the standards that define the network and accept Gwags's governance representation within their structures.",
        steps: [
          {
            title: 'Shared vision and values',
            body: 'Every affiliation begins with alignment. Organizations must demonstrate a genuine commitment to ethical governance, transparency, accountability, and a measurable approach to impact. These standards define what the Gwags network represents, and every affiliated organization is expected to uphold them consistently.',
          },
          {
            title: 'Joining the network',
            body: "Once alignment is established, organizations gain access to the Gwags institutional framework. This includes use of the Gwags brand under defined guidelines, integration into the broader network, and access to resources and support structures. Gwags maintains governance representation, including designated seats on the organization's board, to ensure strategic alignment and accountability across the network.",
          },
          {
            title: 'Strategic integration',
            body: 'Gwags works with affiliated organizations to coordinate programs, align strategic objectives, and identify opportunities for collaboration within the network. As opportunities arise, resources are shared, programs are co-developed, and collective strategies are built. The goal is coordinated impact, ensuring the work of individual organizations contributes to something larger than any one of them could achieve alone.',
          },
          {
            title: 'Scaling together',
            body: 'The Gwags model is built for growth in impact, in reach, and in the capacity of every organization within the network to deliver on its mission. Through the network, affiliated organizations gain access to funding pathways, international partnerships, governance frameworks, and strategic visibility that would be difficult to build independently. As each organization grows, the network grows.',
          },
        ],
      },
      workingWith: {
        eyebrow: 'PARTNERING WITH GWAGS',
        h2: 'What to expect as a partner.',
        intro: 'Through partnership, Gwags collaborates with organizations outside its network on shared goals. Partnerships do not involve governance integration or structural obligations. They are built around specific projects and initiatives where both organizations contribute toward a shared outcome.',
        cards: [
          {
            title: 'Shared objectives',
            body: 'Gwags partners with organizations to deliver projects and initiatives where goals align. Each partnership is built around clear objectives, defined roles, and measurable outcomes.',
          },
          {
            title: 'Collaboration, not dependency',
            body: 'Partnerships with Gwags are built on mutual contribution and full independence. There is no governance overlap or structural obligation beyond the agreed scope of work.',
          },
          {
            title: 'Long-term perspective',
            body: 'Gwags approaches every partnership with a long-term view. Collaborations are designed not just for immediate results, but to build a foundation for ongoing cooperation as both organizations grow.',
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
        'The following year, the team organized a second visit to the Ami de Jésus orphanage. They partnered with a Cameroonian organization called Codam Technologies to provide hands-on technology exposure to the children at the orphanage. The scope of the work had already expanded well beyond basic support, and what had started as an orphanage visit was evolving into something more structured.',
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
            body: 'Four high school students in Douala, Cameroon, had to undertake a community service project as part of their academic program. They organized a visit to the Ami de Jésuite orphanage, where they spent time with the children, provided essential supplies, and witnessed firsthand the realities these children faced daily.',
            photo: 'Photo: orphanage visit',
          },
          {
            year: '2022', month: 'DECEMBER',
            title: 'Partnership with Codam Technologies',
            body: 'The team organized a second visit to the Ami de Jésus orphanage, this time partnering with a Cameroonian organization called Codam Technologies to provide hands-on technology exposure to the children. The children were introduced to 3D printing, introductory coding, and digital tools for the first time.',
            photo: 'Photo: tech workshop with children',
          },
          {
            year: '2025', month: 'MAY',
            title: 'Incorporation in the United States and Cameroon',
            body: 'Gwags formalized its structure by incorporating as a nonprofit organization in both the United States and Cameroon. The 501(c)(3) application process began, establishing the legal and institutional foundation for sustained international operations. What had been an informal student initiative became a legally recognized institution with the capacity to operate, partner, and grow on an international level.',
            photo: '',
          },
          {
            year: '2026', month: 'JANUARY',
            title: 'Launch of the Gwags Scholars Program',
            body: 'Gwags launched the Gwags Scholars Program, a flagship initiative designed to support outstanding university students across Cameroon. The program offers financial support and professional development opportunities, investing in the next generation of Cameroonian leaders.',
            photo: 'Photo: scholars program',
          },
          {
            year: '2026', month: 'JULY',
            title: 'Launch of the Mbal Lekeaka Fund',
            body: 'Gwags established the Mbal Lekeaka Fund, a grant program designed to support community-led initiatives in Cameroon. The fund addresses a critical gap faced by many locally driven initiatives that struggle to scale or sustain their activities due to limited access to financial resources.',
            photo: 'Photo: community initiative',
          },
          {
            year: '2026', month: 'AUGUST',
            title: 'First Health Outreach Campaign',
            body: "In partnership with the Cameroon English Speaking Medical Students' Association (CAMESA), Gwags supported a week-long health outreach campaign in the Nguti Health District, located in Cameroon's South West Region. The campaign deployed 120 medical personnel to provide free consultations, surgeries, screenings, and health education to over 1,500 people across the district.",
            photo: 'Photo: health campaign team',
          },
          {
            year: '2026', month: 'SEPTEMBER',
            title: 'Transition to Global Impact Institution',
            body: 'Gwags formally evolved beyond a foundation model, repositioning itself as a Global Impact Institution dedicated to structuring, coordinating, and accelerating initiatives committed to the sustainable transformation of societies at scale.',
            photo: 'Photo: Global Impact Institution transition',
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
        body: 'Across the world, organizations are working to tackle the challenges their communities face. But commitment alone rarely provides the structure, resources, and networks needed to create impact beyond their current capacity. That is where Gwags comes in.',
      },
      visionMission: {
        vision: {
          label: 'OUR VISION',
          main: 'To build the most impactful international infrastructure dedicated to accelerating, structuring, and coordinating the initiatives and organizations transforming societies sustainably.',
          expansion: 'It is a vision for the ecosystem Gwags is building. One where organizations committed to impact do not struggle alone for resources, credibility, or direction, and where the infrastructure to support their growth already exists.',
        },
        mission: {
          label: 'OUR MISSION',
          main: 'To accelerate and amplify global impact by building the institutional infrastructure needed by organizations committed to human development, social innovation, and the sustainable transformation of communities.',
          expansion: 'Gwags pursues this mission on two fronts: directly, through its own portfolio of initiatives across education, health, and community development; and institutionally, by coordinating, supporting, and strengthening the organizations within its network.',
        },
      },
      convictions: {
        eyebrow: 'WHAT DRIVES US',
        heading: 'The principles that guide everything we do.',
        intro: '',
        items: [
          {
            heading: 'Impact is systemic.',
            body: 'The problems that affect communities rarely exist in isolation. Health, education, economic opportunity, and reduced inequalities are deeply interconnected. Progress in one area without attention to the others produces limited and often temporary results. That is why Gwags works across sectors, both through its own initiatives and through the organizations within its network, each addressing different dimensions of the same interconnected challenges.',
          },
          {
            heading: 'Structure is what separates intention from impact.',
            body: 'The limiting factor is rarely ambition. Most organizations working to create impact face the same structural gaps: limited access to funding, weak governance frameworks, and insufficient institutional credibility to grow beyond their immediate environment. Those are the gaps Gwags was built to fill.',
          },
          {
            heading: 'Credibility is earned through action, not positioning.',
            body: 'Gwags holds itself to the same standards it sets for the organizations within its network. Transparent governance, measurable outcomes, and clear communication about operations are non-negotiable. Our credibility is built through the quality of our programs, the integrity of our partnerships, and the consistency of our follow-through. That is what makes affiliation with Gwags meaningful.',
          },
        ],
      },
      lookingAhead: {
        eyebrow: 'LOOKING AHEAD',
        heading: 'What the world looks like when we succeed.',
        paragraphs: [
          'If Gwags achieves what it is setting out to build, the impact space will look fundamentally different. Organizations will no longer face the same structural barriers alone. They will have access to governance support, international networks, funding pathways, and the institutional credibility needed to attract investment and partnerships. The infrastructure that most organizations spend years trying to build independently will already exist within the network they are part of.',
          'The measure of our success will be visible in the organizations that scaled because of the support they received; in the communities that benefited because an affiliated organization had the structure and resources needed to operate; and in the initiatives that lasted because an institution was built around them. That is what Gwags is working toward.',
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
      body: '',
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
      p1: 'Gwags opère comme une plateforme institutionnelle mondiale, rassemblant des organisations alignées sur des standards communs et un engagement partagé envers un impact dans les secteurs qui façonnent le développement des sociétés.',
      p2: 'L\'institution a été construite sur la reconnaissance que les défis auxquels font face les communautés sont trop interconnectés pour être abordés de manière isolée. Un changement durable nécessite une action coordonnée, une infrastructure partagée et des organisations équipées pour croître au-delà de leur portée immédiate.',
      p3: '',
      link: 'Notre vision et mission',
      pillars: [
        { title: 'Développement institutionnel', desc: 'Nous construisons des structures de gouvernance et des cadres de crédibilité qui aident les organisations à croître avec intégrité.' },
        { title: 'Coordination stratégique', desc: 'Nous connectons les organisations à travers les secteurs et les territoires via une architecture institutionnelle commune.' },
        { title: 'Collaboration internationale', desc: 'Nous réunissons des organisations qui façonnent des sociétés résilientes et inclusives dans le monde entier.' },
        { title: 'Accélération à grande échelle', desc: 'Nous construisons une infrastructure conçue pour amplifier l\'impact à travers les générations, les communautés et les territoires.' },
      ],
    },
    initiatives: {
      eyebrow: 'NOS INITIATIVES',
      h2: 'Des programmes construits pour créer un changement durable.',
      body: 'Gwags porte son propre portefeuille d\'initiatives, chacune conçue autour d\'une dimension spécifique de la transformation sociale.',
      items: [
        { title: 'Programme Gwags Scholars', desc: 'Offrir un soutien financier et des opportunités de développement professionnel aux étudiants universitaires camerounais exceptionnels.', tag: 'EXCELLENCE' },
        { title: 'Fonds Mbal Lekeaka', desc: 'Un programme de bourses canalisant des ressources directement vers des initiatives communautaires à impact mesurable.', tag: 'COMMUNAUTÉ' },
        { title: 'Programme de Santé Communautaire', desc: 'Apporter des soins de santé gratuits et l\'éducation médicale aux communautés mal desservies.', tag: 'SANTÉ' },
        { title: 'Ajong Foretia Orphan Support', desc: 'Soutenir les enfants orphelins à travers la fourniture de fournitures de vie essentielles et des opportunités éducatives.', tag: 'JEUNESSE' },
      ],
    },
    whyGwags: {
      eyebrow: 'POURQUOI GWAGS',
      h2: 'Ce que signifie faire partie de cette institution.',
      body: 'Les organisations affiliées à Gwags gagnent en visibilité, en poids institutionnel, en accès à un réseau mondial et en soutien structurel nécessaire pour croître avec crédibilité et purpose.',
      items: [
        { title: 'Crédibilité', desc: 'L\'association avec Gwags signale un alignement sur un standard reconnu d\'éthique, d\'excellence et d\'impact.' },
        { title: 'Réseau international', desc: 'Accès à un écosystème croissant d\'organisations à travers les secteurs et les frontières.' },
        { title: 'Capacité à grandir', desc: 'Des conseils stratégiques et un soutien structurel pour aider les initiatives ambitieuses à atteindre leur plein potentiel.' },
        { title: 'Voies de financement', desc: 'Accès facilité aux subventions, partenariats et opportunités de financement via un umbrella institutionnel crédible.' },
        { title: 'Visibilité stratégique', desc: 'Gwags amplifie la portée des organisations affiliées via ses plateformes institutionnelles et son positionnement international.' },
        { title: 'Standards de gouvernance', desc: 'Un cadre de meilleures pratiques institutionnelles qui renforce la responsabilité, la transparence et la résilience.' },
      ],
    },
    quote: {
      text: 'Les défis auxquels nos sociétés font face sont trop interconnectés pour qu\'une seule organisation puisse les résoudre seule. Gwags existe pour construire l\'infrastructure qui rend l\'action collective possible afin que les initiatives et les institutions engagées dans le changement puissent le faire avec la structure, la crédibilité et le réseau qu\'elles méritent.',
      name: 'Daryll Giovanny Bikak Mbal',
      role: 'Chair, Board Member',
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
          desc: 'Un écosystème croissant d\'organisations connectées par des standards communs et une ambition partagée.',
          link: 'En savoir plus',
          href: '/network',
        },
      ],
    },
    getInvolved: {
      eyebrow: 'S\'IMPLIQUER',
      h2: 'Trois façons de s\'engager avec Gwags.',
      body: '',
      items: [
        { title: 'Affiliation', desc: 'Rejoignez le réseau institutionnel de Gwags et accédez à l\'infrastructure, aux ressources et à l\'écosystème collaboratif nécessaires pour amplifier votre impact.' },
        { title: 'Financement', desc: 'Dirigez votre soutien vers des programmes avec des cadres définis et des résultats mesurables.' },
        { title: 'Partenariat', desc: 'Travaillez avec Gwags pour co-développer des programmes, partager des ressources et une expertise, et construire vers une vision commune.' },
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
        body: "Gwags opère sur deux voies parallèles qui se renforcent mutuellement. Nous construisons et gérons des initiatives dans différents secteurs, notamment l'éducation, la santé et le développement communautaire. Et nous servons d'infrastructure institutionnelle qui coordonne, soutient et renforce d'autres organisations engagées à créer de l'impact.",
      },
      split: {
        left: {
          label: 'ACTION DIRECTE',
          heading: 'Nous construisons nos propres initiatives.',
          body: [
            "Gwags conçoit et met en oeuvre des programmes qui répondent aux besoins sur le terrain. Le portefeuille actuel couvre l'éducation, la santé, le développement communautaire et l'autonomisation des jeunes. Chaque initiative a été créée pour combler un manque identifié de première main à travers des années d'engagement direct avec les communautés que nous servons. Elles sont au coeur de ce que nous sommes en tant qu'institution et façonnent chaque aspect de notre fonctionnement.",
            "Gérer ces initiatives apporte quelque chose que de nombreuses plateformes institutionnelles n'ont pas: une expérience opérationnelle directe. Nous comprenons les défis de la mise en oeuvre parce que nous les affrontons nous-mêmes. Cette compréhension rend le soutien que nous offrons aux organisations affiliées plus ancré et plus crédible.",
          ],
        },
        right: {
          label: 'SOUTIEN INSTITUTIONNEL',
          heading: 'Nous renforçons les organisations qui nous entourent.',
          body: [
            "À travers le monde, des organisations faisant un travail significatif font face aux mêmes barrières structurelles. Un financement limité. Une gouvernance faible. Aucun accès aux réseaux internationaux. Aucune crédibilité institutionnelle pour attirer des investissements sérieux. Et aucun soutien stratégique pour croître au-delà de leur portée immédiate. Ce sont des lacunes d'infrastructure, et c'est exactement ce que Gwags est conçu pour combler.",
            "À travers l'affiliation, la coordination stratégique, le partage de ressources et les standards institutionnels, Gwags fournit aux organisations la crédibilité, la structure et la portée dont elles ont besoin pour se développer durablement. Les organisations conservent leur identité et leur autonomie. Ce qui change, c'est le poids institutionnel derrière elles, et le réseau dont elles font partie.",
          ],
        },
      },
      initiatives: {
        eyebrow: 'NOS INITIATIVES',
        items: [
          { title: 'Programme Gwags Scholars', desc: 'Un programme phare investissant dans la prochaine génération de leaders camerounais à travers un soutien financier et des opportunités de développement professionnel.', tag: 'EXCELLENCE', href: '/initiatives/scholars' },
          { title: 'Fonds Mbal Lekeaka', desc: 'Un programme de bourses canalisant des ressources directement vers des initiatives communautaires à impact mesurable.', tag: 'COMMUNAUTÉ', href: '/initiatives/mbal-lekeaka-fund' },
          { title: 'Programme de Santé', desc: "Apporter des soins de santé gratuits et l'éducation médicale aux communautés mal desservies.", tag: 'SANTÉ', href: '/initiatives/health-outreach' },
          { title: 'Ajong Foretia Orphan Support', desc: 'Un programme dédié au soutien des enfants orphelins au Cameroun, fournissant des ressources essentielles, des opportunités éducatives et des soins à long terme pour assurer leur bien-être et leur développement.', tag: 'JEUNESSE', href: '/initiatives/youth-development' },
        ],
      },
      coordination: {
        eyebrow: 'LE MODÈLE DE COORDINATION',
        h2: "Comment fonctionne l'affiliation.",
        intro: "Par le biais de l'affiliation, les organisations rejoignent le réseau Gwags dans le cadre d'une relation institutionnelle à long terme. Gwags fournit un soutien en gouvernance, une coordination stratégique et un accès à un écosystème plus large. Les organisations affiliées s'alignent sur les standards qui définissent le réseau et acceptent la représentation de Gwags au sein de leurs structures de gouvernance.",
        steps: [
          {
            title: 'Vision et valeurs partagées',
            body: "Toute affiliation commence par un alignement. Les organisations doivent démontrer un engagement sincère envers la gouvernance éthique, la transparence, la responsabilité et une approche mesurable de l'impact. Ces standards définissent ce que le réseau Gwags représente, et chaque organisation affiliée est tenue de les respecter de manière constante.",
          },
          {
            title: 'Rejoindre le réseau',
            body: "Une fois l'alignement établi, les organisations accèdent au cadre institutionnel de Gwags. Cela inclut l'utilisation de la marque Gwags selon des directives définies, l'intégration au réseau élargi et l'accès aux ressources et aux structures de soutien. Gwags maintient une représentation au sein de la gouvernance, y compris des sièges désignés au conseil d'administration de l'organisation, pour assurer l'alignement stratégique et la responsabilité à travers le réseau.",
          },
          {
            title: 'Intégration stratégique',
            body: "Gwags travaille avec les organisations affiliées pour coordonner les programmes, aligner les objectifs stratégiques et identifier les opportunités de collaboration au sein du réseau. Lorsque les opportunités se présentent, les ressources sont partagées, les programmes sont co-développés et des stratégies collectives sont élaborées. L'objectif est un impact coordonné, garantissant que le travail de chaque organisation contribue à quelque chose de plus grand que ce qu'une seule pourrait accomplir.",
          },
          {
            title: 'Croître ensemble',
            body: "Le modèle Gwags est conçu pour la croissance en impact, en portée et en capacité de chaque organisation au sein du réseau à remplir sa mission. À travers le réseau, les organisations affiliées accèdent à des voies de financement, des partenariats internationaux, des cadres de gouvernance et une visibilité stratégique qu'il serait difficile de construire de manière indépendante. À mesure que chaque organisation grandit, le réseau grandit.",
          },
        ],
      },
      workingWith: {
        eyebrow: 'PARTENARIAT AVEC GWAGS',
        h2: 'Ce à quoi s\'attendre en tant que partenaire.',
        intro: "Par le biais du partenariat, Gwags collabore avec des organisations en dehors de son réseau sur des objectifs communs. Les partenariats n'impliquent pas d'intégration de gouvernance ni d'obligations structurelles. Ils sont construits autour de projets et d'initiatives spécifiques où les deux organisations contribuent à un résultat commun.",
        cards: [
          {
            title: 'Objectifs partagés',
            body: "Gwags s'associe avec des organisations pour réaliser des projets et des initiatives dont les objectifs convergent. Chaque partenariat est construit autour d'objectifs clairs, de rôles définis et de résultats mesurables.",
          },
          {
            title: 'Collaboration, pas dépendance',
            body: "Les partenariats avec Gwags reposent sur une contribution mutuelle et une indépendance totale. Il n'y a aucun chevauchement de gouvernance ni d'obligation structurelle au-delà du cadre de travail convenu.",
          },
          {
            title: 'Perspective à long terme',
            body: "Gwags aborde chaque partenariat avec une vision à long terme. Les collaborations sont conçues non seulement pour des résultats immédiats, mais pour construire une base de coopération continue à mesure que les deux organisations grandissent.",
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
        "L'année suivante, l'équipe a organisé une deuxième visite à l'orphelinat Ami de Jésus. Ils se sont associés à une organisation camerounaise appelée Codam Technologies pour offrir aux enfants de l'orphelinat une exposition pratique à la technologie. La portée du travail avait déjà largement dépassé le soutien de base, et ce qui avait commencé comme une visite dans un orphelinat évoluait vers quelque chose de plus structuré.",
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
            body: "Quatre lycéens à Douala, au Cameroun, devaient réaliser un projet de service communautaire dans le cadre de leur programme scolaire. Ils ont organisé une visite à l'orphelinat Ami de Jésuite, où ils ont passé du temps avec les enfants, fourni des fournitures essentielles et constaté de première main les réalités auxquelles ces enfants faisaient face au quotidien.",
            photo: "Photo: orphelinat",
          },
          {
            year: '2022', month: 'DÉCEMBRE',
            title: 'Partenariat avec Codam Technologies',
            body: "L'équipe a organisé une deuxième visite à l'orphelinat Ami de Jésus, cette fois en partenariat avec une organisation camerounaise appelée Codam Technologies pour offrir aux enfants une exposition pratique à la technologie. Les enfants ont été initiés à l'impression 3D, à l'initiation au codage et aux outils numériques pour la première fois.",
            photo: 'Photo: atelier technologique',
          },
          {
            year: '2025', month: 'MAI',
            title: 'Incorporation aux États-Unis et au Cameroun',
            body: "Gwags a formalisé sa structure en s'incorporant en tant qu'organisation à but non lucratif aux États-Unis et au Cameroun. Le processus de demande 501(c)(3) a commencé, établissant les bases juridiques et institutionnelles pour des opérations internationales durables. Ce qui avait été une initiative étudiante informelle est devenu une institution légalement reconnue avec la capacité d'opérer, de s'associer et de croître à l'échelle internationale.",
            photo: '',
          },
          {
            year: '2026', month: 'JANVIER',
            title: 'Lancement du Programme Gwags Scholars',
            body: "Gwags a lancé le Programme Gwags Scholars, une initiative phare conçue pour soutenir les étudiants universitaires exceptionnels à travers le Cameroun. Le programme offre un soutien financier et des opportunités de développement professionnel, investissant dans la prochaine génération de leaders camerounais.",
            photo: 'Photo: programme Scholars',
          },
          {
            year: '2026', month: 'JUILLET',
            title: 'Lancement du Fonds Mbal Lekeaka',
            body: "Gwags a établi le Fonds Mbal Lekeaka, un programme de subventions conçu pour soutenir les initiatives communautaires au Cameroun. Le fonds répond à un manque critique auquel font face de nombreuses initiatives locales qui peinent à se développer ou à maintenir leurs activités en raison d'un accès limité aux ressources financières.",
            photo: 'Photo: initiative communautaire',
          },
          {
            year: '2026', month: 'AOÛT',
            title: 'Première Campagne de Santé Communautaire',
            body: "En partenariat avec la Cameroon English Speaking Medical Students' Association (CAMESA), Gwags a soutenu une campagne de sensibilisation sanitaire d'une semaine dans le district de santé de Nguti, situé dans la région du Sud-Ouest du Cameroun. La campagne a déployé 120 personnels médicaux pour fournir des consultations gratuites, des chirurgies, des dépistages et une éducation sanitaire à plus de 1 500 personnes à travers le district.",
            photo: 'Photo: campagne de santé',
          },
          {
            year: '2026', month: 'SEPTEMBRE',
            title: "Transition vers Institution d'Impact Mondial",
            body: "Gwags a formellement évolué au-delà du modèle de fondation, se repositionnant en tant qu'Institution d'Impact Mondial dédiée à la structuration, la coordination et l'accélération des initiatives engagées dans la transformation durable des sociétés à grande échelle.",
            photo: "Photo: transition vers Institution d'Impact Mondial",
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
        body: "À travers le monde, des organisations travaillent à relever les défis auxquels font face leurs communautés. Mais l'engagement seul suffit rarement à fournir la structure, les ressources et les réseaux nécessaires pour créer un impact au-delà de leur capacité actuelle. C'est là qu'intervient Gwags.",
      },
      visionMission: {
        vision: {
          label: 'NOTRE VISION',
          main: "Construire l'infrastructure internationale la plus impactante dédiée à accélérer, structurer et coordonner les initiatives et organisations qui transforment les sociétés de manière durable.",
          expansion: "C'est une vision pour l'écosystème que Gwags construit. Un monde où les organisations engagées dans l'impact ne luttent pas seules pour les ressources, la crédibilité ou la direction, et où l'infrastructure pour soutenir leur croissance existe déjà.",
        },
        mission: {
          label: 'NOTRE MISSION',
          main: "Accélérer et amplifier l'impact mondial en construisant l'infrastructure institutionnelle dont ont besoin les organisations engagées dans le développement humain, l'innovation sociale et la transformation durable des communautés.",
          expansion: "Gwags poursuit cette mission sur deux fronts: directement, à travers son propre portefeuille d'initiatives dans l'éducation, la santé et le développement communautaire; et institutionnellement, en coordonnant, soutenant et renforçant les organisations au sein de son réseau.",
        },
      },
      convictions: {
        eyebrow: 'CE QUI NOUS ANIME',
        heading: 'Les principes qui guident tout ce que nous faisons.',
        intro: '',
        items: [
          {
            heading: "L'impact est systémique.",
            body: "Les problèmes qui affectent les communautés existent rarement de manière isolée. La santé, l'éducation, les opportunités économiques et la réduction des inégalités sont profondément interconnectées. Les progrès dans un domaine sans attention aux autres produisent des résultats limités et souvent temporaires. C'est pourquoi Gwags travaille dans plusieurs secteurs, à la fois à travers ses propres initiatives et à travers les organisations au sein de son réseau, chacune abordant différentes dimensions des mêmes défis interconnectés.",
          },
          {
            heading: "La structure est ce qui sépare l'intention de l'impact.",
            body: "Le facteur limitant est rarement l'ambition. La plupart des organisations qui travaillent à créer de l'impact font face aux mêmes lacunes structurelles: un accès limité au financement, des cadres de gouvernance faibles et une crédibilité institutionnelle insuffisante pour croître au-delà de leur environnement immédiat. Ce sont ces lacunes que Gwags a été construit pour combler.",
          },
          {
            heading: "La crédibilité se gagne par l'action, pas par le positionnement.",
            body: "Gwags s'impose les mêmes standards qu'il exige des organisations au sein de son réseau. Une gouvernance transparente, des résultats mesurables et une communication claire sur les opérations sont non négociables. Notre crédibilité se construit à travers la qualité de nos programmes, l'intégrité de nos partenariats et la constance de notre suivi. C'est ce qui rend l'affiliation avec Gwags significative.",
          },
        ],
      },
      lookingAhead: {
        eyebrow: "REGARDER VERS L'AVENIR",
        heading: 'À quoi ressemble le monde quand nous réussissons.',
        paragraphs: [
          "Si Gwags parvient à construire ce qu'il s'est fixé comme objectif, l'espace de l'impact aura un visage fondamentalement différent. Les organisations ne feront plus face seules aux mêmes barrières structurelles. Elles auront accès au soutien en gouvernance, aux réseaux internationaux, aux voies de financement et à la crédibilité institutionnelle nécessaire pour attirer des investissements et des partenariats. L'infrastructure que la plupart des organisations passent des années à construire de manière indépendante existera déjà au sein du réseau dont elles font partie.",
          "La mesure de notre succès sera visible dans les organisations qui ont grandi grâce au soutien reçu; dans les communautés qui ont bénéficié parce qu'une organisation affiliée avait la structure et les ressources nécessaires pour opérer; et dans les initiatives qui ont duré parce qu'une institution a été construite autour d'elles. C'est vers cela que Gwags travaille.",
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