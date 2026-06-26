export type Lang = 'en' | 'fr'

export const t = {
  en: {
    nav: {
      about: 'About us',
      initiatives: 'Our Work',
      network: 'Network',
      getInvolved: 'Get Involved',
      contact: 'Contact',
      dropdowns: {
        about: {
          heading: 'About us',
          subHeading: 'About the Gwags Global Impact Institution',
          description: 'Learn about our origins, our mission,\nhow we work, and the people behind Gwags.',
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
          initiativesLabel: 'Our Initiatives',
          networkLabel: 'Our Network',
          networkDescription: 'A growing ecosystem of organizations aligned by shared standards and a common ambition to create lasting impact.',
          networkCta: 'Learn more',
          links: [
            { label: 'Gwags Scholars Program', href: '/initiatives/scholars' },
            { label: 'Mbal Lekeaka Fund', href: '/initiatives/mbal-lekeaka-fund' },
            { label: 'Health Outreach Program', href: '/initiatives/health-outreach' },
            { label: 'Ajong Foretia Orphan Support', href: '/initiatives/ajong-foretia' },
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
      btn1: 'Join the network',
      btn2: '',
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
        { title: 'International network', desc: 'Access to a growing ecosystem of organizations across sectors and borders.' },
        { title: 'Capacity to scale', desc: 'Strategic guidance and structural support to help organizations strengthen and scale their operations.' },
        { title: 'Funding pathways', desc: 'Easier access to grants and funding opportunities through our institutional umbrella.' },
        { title: 'Strategic visibility', desc: 'Growing visibility and reach through the Gwags institutional network and international positioning.' },
        { title: 'Governance standards', desc: 'A framework that formalizes how affiliated organizations are structured, managed, and governed.' },
      ],
    },
    quote: {
      text: 'The challenges facing our societies are too interconnected for any single organization to solve alone. Gwags exists to build the infrastructure that makes collective action possible so that the organizations committed to change can do so with the resources, support and network they deserve.',
      name: 'Giovanny Bikak Mbal',
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
      h2: 'Learn what Gwags is about.',
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
        { title: 'Funding', desc: 'Direct your support toward programs with defined frameworks, measurable outcomes, and clear accountability.' },
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
      body: 'Gwags is building an international infrastructure for impact. Reach out to explore how we can work together toward a shared vision of impact.',
      btn1: 'Get in touch',
      btn2: 'Join the network',
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
        body: 'Gwags operates on two parallel tracks. We deliver initiatives across different sectors including education, health, and community development. And we serve as an institutional infrastructure that structures and supports other organizations committed to creating impact.',
      },
      split: {
        left: {
          label: 'DIRECT ACTION',
          heading: 'We build our own initiatives.',
          body: [
            'Gwags designs and delivers programs that address needs on the ground. The current portfolio spans education, health, community development, and youth empowerment. Each initiative was created to fill a gap identified through direct engagement with the communities we serve.',
            'Running these initiatives provides us with direct operational experience. We understand the challenges of implementation because we face them ourselves. That understanding makes the support we offer to affiliated organizations more grounded and credible.',
          ],
        },
        right: {
          label: 'INSTITUTIONAL SUPPORT',
          heading: 'We strengthen the organizations around us.',
          body: [
            'Across the world, organizations doing meaningful work face the same structural barriers that prevent them from growing beyond their immediate reach, leaving significant potential for impact unrealized.',
            'Through affiliation, strategic coordination, shared resources, and institutional standards, Gwags provides organizations with the resources, credibility, and structure they need to scale sustainably. Organizations retain their identity. What changes is the institutional weight behind them, and the network they become part of.',
          ],
        },
      },
      initiatives: {
        eyebrow: 'OUR INITIATIVES',
        h2: 'Our commitment in action.',
        items: [
          { title: 'Gwags Scholars Program', desc: 'Providing financial support and professional development opportunities to outstanding Cameroonian university students.', tag: 'EXCELLENCE', href: '/initiatives/scholars' },
          { title: 'Mbal Lekeaka Fund', desc: 'A grant program channeling resources directly into community-led initiatives that demonstrate real, measurable impact on the ground.', tag: 'COMMUNITY', href: '/initiatives/mbal-lekeaka-fund' },
          { title: 'Health Outreach Program', desc: 'Bringing free healthcare and medical education to underserved communities through structured field campaigns.', tag: 'HEALTH', href: '/initiatives/health-outreach' },
          { title: 'Ajong Foretia Orphan Support', desc: 'Supporting orphaned children through the provision of essential living supplies and educational opportunities.', tag: 'YOUTH', href: '/initiatives/ajong-foretia' },
        ],
      },
      coordination: {
        eyebrow: 'THE COORDINATION MODEL',
        h2: 'How affiliation works.',
        intro: "Through affiliation, organizations join the Gwags network under a long-term institutional relationship.",
        steps: [
          {
            title: 'Shared vision and values',
            body: 'Every affiliation begins with alignment. Organizations must demonstrate a genuine commitment to ethical governance, transparency, accountability, and a measurable approach to impact.',
          },
          {
            title: 'Joining the network',
            body: "Organizations gain access to the Gwags institutional framework, including use of the Gwags brand, integration into the network, and access to resources. Gwags works with affiliated organizations to coordinate programs and identify opportunities for collaboration within the network.",
          },
          {
            title: 'Scaling together',
            body: 'The Gwags model is built to grow the impact, reach, and capacity of every organization within the network. Affiliated organizations gain access to funding pathways, partnership opportunities, governance frameworks, and strategic visibility that would be difficult to build independently.',
          },
        ],
      },
      workingWith: {
        eyebrow: 'PARTNERING WITH GWAGS',
        h2: 'What to expect as a partner.',
        intro: 'Through partnership, Gwags collaborates with organizations outside its network to co-develop initiatives and work toward a shared outcome.',
        cards: [
          {
            title: 'Shared objectives',
            body: 'Gwags partners with organizations to deliver initiatives where goals align. Each partnership is built around clear objectives, defined roles, and measurable outcomes.',
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
        body: 'Explore how your organization can engage with Gwags through affiliation or partnership.',
        btn1: 'Get in touch',
        btn2: 'Join the network',
      },
    },
    ourStoryPage: {
      hero: {
        eyebrow: 'OUR STORY',
        h1: 'How it all started.',
      },
      photoBanner: 'HERO PHOTO',
      narrative: [
        'In December 2021, four high school students in Douala, Cameroon, had to undertake a community service project as part of their academic program. In order to fulfill this requirement, they organized a visit to the Coeur de Jésus orphanage, where they spent time with the children, provided essential supplies, and witnessed firsthand the conditions these children were navigating daily.',
        'The experience left a lasting impression. They encountered children with limited resources and few opportunities, but with undeniable potential. The gaps were obvious, but so was the possibility of what consistent, structured support could unlock over time. The team subsequently organized more orphanage visits.',
        'The founders reflected on the deeper challenges they had been witnessing. The barriers facing children and youth across Cameroon were not isolated. They were systemic. Educational gaps, healthcare shortages, limited access to technology, and weak institutional support all fed into the same cycle. That realization pushed the team to stop thinking in terms of individual projects and start building for the long term.',
        'What followed was a series of decisive steps. The team incorporated the Gwags Foundation as a nonprofit in both the United States and Cameroon, establishing the legal and institutional foundation needed for sustained operations. New initiatives were launched across education, community development, healthcare, and youth empowerment. What had started as orphanage visits was becoming a multi-sector organization with a growing portfolio of programs and partnerships.',
        "But the more the team built, the clearer something became. Running programs was not enough. The real challenge was not just delivering impact, it was structuring it. Across the world, there are countless organizations doing meaningful work but struggling with the same obstacles. Limited funding, weak governance, no access to networks, and no institutional backbone to help them grow.",
        "That realization marked a defining shift in Gwags's journey. The mission was no longer just about what Gwags could do directly. It was about building the infrastructure that would enable organizations to do more. An institution that could coordinate, support, and strengthen organizations striving to create impact. A platform where credibility, structure, and international reach could be shared, not hoarded.",
        'Today, Gwags has formally transitioned from a foundation into a Global Impact Institution. It operates across multiple sectors, building an ecosystem designed to accelerate impact at scale. The programs continue to grow. The network of organizations continues to expand. And the infrastructure that will enable organizations to transform their societies is being built, step by step, from the ground up.',
      ],
      timeline: {
        eyebrow: 'THE TIMELINE',
        h2: 'Milestones that shaped Gwags.',
        entries: [
          {
            year: '2021', month: 'DECEMBER',
            title: 'First orphanage visit',
            body: 'Four high school students in Douala, Cameroon, had to undertake a community service project as part of their academic program. They organized a visit to the Coeur de Jésus orphanage, where they spent time with the children, provided essential supplies, and witnessed firsthand the realities these children faced daily.',
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
            title: 'Creation and Incorporation of the Gwags Foundation',
            body: 'Gwags formalized its structure by creating and incorporating the Gwags Foundation as a nonprofit organization in both the United States and Cameroon, establishing the legal and institutional foundation for sustained international operations.',
            photo: '',
          },
          {
            year: '2026', month: 'JANUARY',
            title: 'Launch of the Gwags Scholars Program',
            body: 'Gwags launched the Gwags Scholars Program, an initiative designed to support outstanding university students across Cameroon. The program offers financial support and professional development opportunities, investing in the next generation of Cameroonian leaders.',
            photo: 'Photo: scholars program',
          },
          {
            year: '2026', month: 'JULY',
            title: 'Launch of the Mbal Lekeaka Fund',
            body: 'Gwags established the Mbal Lekeaka Fund, a grant program designed to support community-led initiatives. The fund addresses a critical gap faced by many locally driven initiatives that struggle to scale or sustain their activities due to limited access to financial resources.',
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
        'Seeing the bigger picture',
        'Building the foundation',
        'The shift',
        null,
        'A new chapter',
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
          main: 'To build the most impactful international infrastructure dedicated to structuring and supporting the organizations transforming societies sustainably.',
          expansion: 'It is a vision for the ecosystem Gwags is building. One where organizations committed to impact do not struggle alone for resources, credibility, or direction, and where the infrastructure to support their growth already exists.',
        },
        mission: {
          label: 'OUR MISSION',
          main: 'To accelerate and amplify global impact by building the institutional infrastructure needed by organizations committed to addressing societal challenges.',
          expansion: 'Gwags pursues this mission on two fronts: through its portfolio of initiatives across different sectors including education and health; and institutionally by structuring and supporting the organizations within its network.',
        },
      },
      convictions: {
        eyebrow: 'WHAT DRIVES US',
        heading: 'The principles that guide everything we do.',
        intro: '',
        items: [
          {
            heading: 'Impact is systemic.',
            body: 'The problems that affect our societies rarely exist in isolation. Progress in one area without attention to the others produces limited and often temporary results. That is why Gwags works across sectors, both through its own initiatives and through the organizations within its network, each addressing different dimensions of the same interconnected challenges.',
          },
          {
            heading: 'Structure is what separates intention from impact.',
            body: 'The limiting factor is rarely ambition. Most organizations working to create impact face the same structural gaps: limited access to funding, weak governance frameworks, and insufficient institutional credibility to grow beyond their immediate environment. Those are the gaps Gwags was built to fill.',
          },
          {
            heading: 'Credibility is earned through action, not positioning.',
            body: 'Gwags holds itself to the same standards it sets for the organizations within its network. Transparent governance, measurable outcomes, and clear communication about operations are expected at every level. Our credibility is built through the quality of our programs and the consistency of our follow-through. That is what makes affiliation with Gwags meaningful.',
          },
        ],
      },
      lookingAhead: {
        eyebrow: 'LOOKING AHEAD',
        heading: 'What the world looks like when we succeed.',
        paragraphs: [
          'Organizations will no longer face the same structural barriers alone. They will have access to governance support, international networks, funding pathways, and the institutional credibility needed to attract investment and partnerships. The infrastructure that most organizations spend years trying to build independently will already exist within the network they are part of.',
          'The measure of our success will be visible in the organizations that scaled because of the support they received; in the communities that benefited because an affiliated organization had the structure and resources needed to operate; and in the initiatives that lasted because an institution was built around them. That is what Gwags is working toward.',
        ],
      },
      cta: {
        h2: 'Ready to be part of this institution?',
        body: 'Gwags is building something that lasts. If your organization shares that ambition, there is a place for you within our network.',
        btn1: 'Get in touch',
        btn2: 'Join the network',
      },
    },
    scholarsPage: {
      hero: {
        name: 'Gwags Scholars Program',
        goal: 'To identify and invest in outstanding Cameroonian university students by providing financial support and professional development opportunities that prepare them for the transition into the workforce.',
      },
      sections: [
        {
          heading: 'Access to higher education in Cameroon',
          body: 'In Cameroon, access to higher education remains heavily shaped by financial circumstances. Students with strong academic records are often unable to continue their studies due to a lack of financial support. And for those who do graduate, the transition into the workforce presents its own challenges. Limited access to work experience and professional exposure leaves many graduates without the tools they need to build careers after graduation.',
        },
        {
          heading: 'About the program',
          body: 'The Gwags Scholars Program is an initiative designed to address both challenges directly. The program provides financial support to outstanding undergraduate students across Cameroon, removing one of the primary barriers to completing their studies. Beyond financial awards, the program prepares scholars for the workforce through internship opportunities and exposure to professional environments.',
        },
        {
          heading: 'What to know before applying',
          richBody: [
            { label: 'Who can apply', text: 'Undergraduate students currently enrolled at a university in Cameroon.' },
            { label: 'What is required', text: 'An academic transcript and a written response to the application prompt.' },
            { label: 'What scholars receive', text: 'A financial award of 150,000 FCFA and access to internship placements. The program selects 10 scholars per batch.' },
            { label: 'Selection criteria', text: 'Selection is based on academic merit and the quality of the written submission.' },
            { label: 'Language', text: 'Applications are accepted in both English and French.' },
          ],
        },
      ],
      keyDates: {
        heading: 'Key dates',
        batch: '2027 Batch',
        items: [
          { label: 'Applications open', date: 'January 2027' },
          { label: 'Applications close', date: 'March 2027' },
          { label: 'Results released', date: 'May 2027' },
        ],
      },
      apply: 'Apply now',
      carousel: {
        heading: 'Our Scholars',
        events: [
          { label: '2026 Batch', href: '/initiatives/scholars/2026', items: ['', '', '', '', '', '', '', '', '', ''] },
        ],
      },
    },
    mbalLekeakaPage: {
      hero: {
        name: 'Mbal Lekeaka Fund',
        goal: 'To provide direct financial support to community-led initiatives that address real needs on the ground but lack the resources to execute, scale, or sustain their work.',
      },
      sections: [
        {
          heading: 'Funding the work that matters',
          body: 'Across communities, organizations and groups are working to address real needs on the ground. Many of these initiatives are driven by people who understand the challenges firsthand. But without access to financial resources, even the most promising community-led projects struggle to launch, sustain, or grow.',
        },
        {
          heading: 'About the fund',
          body: 'The Mbal Lekeaka Fund is a grant program established by Gwags to provide direct financial support to community-led initiatives. The fund targets organizations and groups working on projects that address real needs in their communities but lack the resources to execute or scale. Through the fund, Gwags channels resources toward initiatives that demonstrate clear objectives and measurable potential for impact.',
        },
        {
          heading: 'What to know before applying',
          richBody: [
            { label: 'Who can apply', text: 'Organizations, community groups, and locally driven initiatives with a clearly defined project.' },
            { label: 'What is required', text: 'A written proposal outlining the initiative, its objectives, expected outcomes, and a detailed budget.' },
            { label: 'Selection criteria', text: 'Proposals are evaluated based on demonstrated community need, operational feasibility, and alignment with the fund\'s priorities.' },
            { label: 'Language', text: 'Proposals are accepted in both English and French.' },
          ],
        },
      ],
      apply: 'Submit a proposal',
      carousel: {
        heading: 'Funded Initiatives',
        events: [
          { label: 'CAMESA Nguti Health Campaign', href: '/initiatives/mbal-lekeaka-fund/camesa-nguti-health-campaign', items: ['', '', '', '', '', ''] },
        ],
      },
    },
    ajongForetiasPage: {
      hero: {
        name: 'Ajong Foretia Orphan Support',
        goal: 'To provide sustained support to orphaned children through initiatives that deliver essential living supplies, educational opportunities, and practical skills training.',
      },
      sections: [
        {
          heading: 'Supporting the most vulnerable',
          body: 'Orphaned children are among the most underserved populations in the world. Many grow up in orphanages operating with limited resources and little external support. Access to basic necessities, education, and developmental opportunities remains inconsistent at best. Without structured and sustained intervention, these children face barriers that compound over time, limiting their ability to learn and build futures beyond their immediate circumstances.',
        },
        {
          heading: 'About the program',
          body: 'The Ajong Foretia Orphan Support program is how Gwags addresses the challenges facing orphaned children. The program operates through organized visits to orphanages, delivering essential living supplies and creating educational and developmental opportunities. Through partnerships with local organizations, the program has provided children with hands-on exposure to technology.\n\nAs the program develops, Gwags is working to deepen the support it provides. This includes increasing the frequency of visits, introducing structured mentorship sessions where professionals teach specific skills over sustained periods, and building a sponsorship model that supports orphans through their education from childhood to graduation.',
        },
      ],
      stats: {
        heading: 'Our impact',
        subheading: 'Measurable results from our orphan support initiatives.',
        items: [
          { value: '187', label: 'orphans supported' },
          { value: '$15,000+', label: 'in charitable support' },
        ],
      },
      carousel: {
        heading: 'Past Visits',
        events: [
          { label: 'Tech Workshop with Codam Technologies', href: '/initiatives/ajong-foretia/tech-workshop-codam-technologies', items: ['', '', '', '', '', ''] },
          { label: 'Visit to Coeur de Jésus Orphanage', href: '/initiatives/ajong-foretia/visit-coeur-de-jesus-orphanage', items: ['', '', '', '', '', ''] },
        ],
      },
    },
    healthOutreachPage: {
      hero: {
        name: 'Health Outreach Program',
        goal: 'To bring free healthcare services and medical education to underserved communities through structured field campaigns.',
      },
      sections: [
        {
          heading: 'Healthcare in underserved communities',
          body: 'Access to basic healthcare remains one of the most persistent challenges facing underserved communities around the world. In many regions, populations lack access to qualified medical professionals, diagnostic infrastructure, and preventive health education. Treatable conditions go undiagnosed. Preventable diseases continue to spread. And the communities that need healthcare the most are often the furthest from it.',
        },
        {
          heading: 'About the program',
          body: 'The Health Outreach Program is how Gwags addresses the healthcare gap directly. The program organizes and co-delivers health campaigns in underserved communities, bringing together medical professionals and partner organizations to provide free consultations, screenings, surgical procedures, and health education. Each campaign is built around the specific needs of the community it serves and delivered through a structured operational framework designed to maximize reach and impact.\n\nEvery campaign is documented from start to finish. Patient numbers, diagnoses, procedures performed, and education sessions are all recorded. This data is analyzed to measure the reach and effectiveness of each campaign and to inform the planning of future campaigns.',
        },
      ],
      stats: {
        heading: 'Our impact',
        subheading: 'Measurable results from our health outreach campaigns.',
        items: [
          { value: '1,500+', label: 'beneficiaries reached' },
          { value: '120+', label: 'medical professionals deployed' },
          { value: '1', label: 'campaign conducted' },
        ],
      },
      carousel: {
        heading: 'Past Campaigns',
        events: [
          { label: 'Nguti Health Campaign', href: '/initiatives/health-outreach/nguti-health-campaign', items: ['', '', '', '', '', ''] },
        ],
      },
    },
  },
  fr: {
    nav: {
      about: 'À propos de nous',
      initiatives: 'Nos Actions',
      network: 'Réseau',
      getInvolved: 'S\'impliquer',
      contact: 'Contact',
      dropdowns: {
        about: {
          heading: 'À propos de nous',
          subHeading: 'À propos de l\'institution Gwags Global Impact',
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
          initiativesLabel: 'Nos Initiatives',
          networkLabel: 'Notre Réseau',
          networkDescription: 'Un écosystème croissant d\'organisations alignées par des standards partagés et une ambition commune de créer un impact durable.',
          networkCta: 'En savoir plus',
          links: [
            { label: 'Programme Gwags Scholars', href: '/initiatives/scholars' },
            { label: 'Fonds Mbal Lekeaka', href: '/initiatives/mbal-lekeaka-fund' },
            { label: 'Programme de Santé', href: '/initiatives/health-outreach' },
            { label: 'Ajong Foretia Orphan Support', href: '/initiatives/ajong-foretia' },
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
      btn1: 'Rejoindre le réseau',
      btn2: '',
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
        { title: 'Réseau international', desc: 'Accès à un écosystème croissant d\'organisations à travers les secteurs et les frontières.' },
        { title: 'Capacité à grandir', desc: 'Des conseils stratégiques et un soutien structurel pour aider les organisations à renforcer et développer leurs opérations.' },
        { title: 'Voies de financement', desc: 'Un accès plus facile aux subventions et opportunités de financement à travers notre cadre institutionnel.' },
        { title: 'Visibilité stratégique', desc: 'Une visibilité et une portée croissantes à travers le réseau institutionnel Gwags et un positionnement international.' },
        { title: 'Standards de gouvernance', desc: 'Un cadre qui formalise la manière dont les organisations affiliées sont structurées, gérées et gouvernées.' },
      ],
    },
    quote: {
      text: 'Les défis auxquels nos sociétés font face sont trop interconnectés pour qu\'une seule organisation puisse les résoudre seule. Gwags existe pour construire l\'infrastructure qui rend l\'action collective possible afin que les organisations engagées dans le changement peuvent le faire avec les ressources, le soutien et le réseau qu\'elles méritent.',
      name: 'Giovanny Bikak Mbal',
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
      h2: 'Découvrez ce qu\'est Gwags.',
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
        { title: 'Financement', desc: 'Dirigez votre soutien vers des programmes avec des cadres définis, des résultats mesurables et une responsabilité claire.' },
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
      body: 'Gwags construit une infrastructure internationale pour l\'impact. Contactez-nous pour explorer comment nous pouvons travailler ensemble vers une vision partagée de l\'impact.',
      btn1: 'Nous contacter',
      btn2: 'Rejoindre le réseau',
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
        body: "Gwags opère sur deux voies parallèles. Nous livrons des initiatives dans différents secteurs, notamment l'éducation, la santé et le développement communautaire. Et nous servons d'infrastructure institutionnelle qui structure et soutient d'autres organisations engagées à créer de l'impact.",
      },
      split: {
        left: {
          label: 'ACTION DIRECTE',
          heading: 'Nous construisons nos propres initiatives.',
          body: [
            "Gwags conçoit et met en oeuvre des programmes qui répondent aux besoins sur le terrain. Le portefeuille actuel couvre l'éducation, la santé, le développement communautaire et l'autonomisation des jeunes. Chaque initiative a été créée pour combler un manque identifié à travers un engagement direct avec les communautés que nous servons.",
            "Gérer ces initiatives nous fournit une expérience opérationnelle directe. Nous comprenons les défis de la mise en oeuvre parce que nous les affrontons nous-mêmes. Cette compréhension rend le soutien que nous offrons aux organisations affiliées plus ancré et plus crédible.",
          ],
        },
        right: {
          label: 'SOUTIEN INSTITUTIONNEL',
          heading: 'Nous renforçons les organisations qui nous entourent.',
          body: [
            "À travers le monde, des organisations faisant un travail significatif font face aux mêmes barrières structurelles qui les empêchent de croître au-delà de leur portée immédiate, laissant un potentiel d'impact significatif inexploité.",
            "À travers l'affiliation, la coordination stratégique, le partage de ressources et les standards institutionnels, Gwags fournit aux organisations les ressources, la crédibilité et la structure dont elles ont besoin pour se développer durablement. Les organisations conservent leur identité. Ce qui change, c'est le poids institutionnel derrière elles, et le réseau dont elles font partie.",
          ],
        },
      },
      initiatives: {
        eyebrow: 'NOS INITIATIVES',
        h2: 'Notre engagement en action.',
        items: [
          { title: 'Programme Gwags Scholars', desc: 'Offrir un soutien financier et des opportunités de développement professionnel aux étudiants universitaires camerounais exceptionnels.', tag: 'EXCELLENCE', href: '/initiatives/scholars' },
          { title: 'Fonds Mbal Lekeaka', desc: 'Un programme de bourses canalisant des ressources directement vers des initiatives communautaires à impact mesurable.', tag: 'COMMUNAUTÉ', href: '/initiatives/mbal-lekeaka-fund' },
          { title: 'Programme de Santé Communautaire', desc: "Apporter des soins de santé gratuits et l'éducation médicale aux communautés mal desservies.", tag: 'SANTÉ', href: '/initiatives/health-outreach' },
          { title: 'Ajong Foretia Orphan Support', desc: 'Soutenir les enfants orphelins à travers la fourniture de fournitures de vie essentielles et des opportunités éducatives.', tag: 'JEUNESSE', href: '/initiatives/ajong-foretia' },
        ],
      },
      coordination: {
        eyebrow: 'LE MODÈLE DE COORDINATION',
        h2: "Comment fonctionne l'affiliation.",
        intro: "Par le biais de l'affiliation, les organisations rejoignent le réseau Gwags dans le cadre d'une relation institutionnelle à long terme.",
        steps: [
          {
            title: 'Vision et valeurs partagées',
            body: "Toute affiliation commence par un alignement. Les organisations doivent démontrer un engagement sincère envers la gouvernance éthique, la transparence, la responsabilité et une approche mesurable de l'impact.",
          },
          {
            title: 'Rejoindre le réseau',
            body: "Les organisations accèdent au cadre institutionnel de Gwags, y compris l'utilisation de la marque Gwags, l'intégration au réseau et l'accès aux ressources. Gwags travaille avec les organisations affiliées pour coordonner les programmes et identifier les opportunités de collaboration au sein du réseau.",
          },
          {
            title: 'Croître ensemble',
            body: "Le modèle Gwags est conçu pour accroître l'impact, la portée et la capacité de chaque organisation au sein du réseau. Les organisations affiliées accèdent à des voies de financement, des opportunités de partenariat, des cadres de gouvernance et une visibilité stratégique qu'il serait difficile de construire de manière indépendante.",
          },
        ],
      },
      workingWith: {
        eyebrow: 'PARTENARIAT AVEC GWAGS',
        h2: 'Ce à quoi s\'attendre en tant que partenaire.',
        intro: "Par le biais du partenariat, Gwags collabore avec des organisations en dehors de son réseau pour co-développer des initiatives et travailler vers un résultat commun.",
        cards: [
          {
            title: 'Objectifs partagés',
            body: "Gwags s'associe avec des organisations pour réaliser des initiatives dont les objectifs convergent. Chaque partenariat est construit autour d'objectifs clairs, de rôles définis et de résultats mesurables.",
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
        body: "Découvrez comment votre organisation peut s'engager avec Gwags à travers l'affiliation ou le partenariat.",
        btn1: 'Nous contacter',
        btn2: 'Rejoindre le réseau',
      },
    },
    ourStoryPage: {
      hero: {
        eyebrow: 'NOTRE HISTOIRE',
        h1: 'Comment tout a commencé.',
      },
      photoBanner: 'PHOTO PRINCIPALE',
      narrative: [
        "En décembre 2021, quatre lycéens à Douala, au Cameroun, devaient réaliser un projet de service communautaire dans le cadre de leur programme scolaire. Pour répondre à cette exigence, ils ont organisé une visite à l'orphelinat Coeur de Jésus, où ils ont passé du temps avec les enfants, fourni des fournitures essentielles et constaté de première main les conditions que ces enfants affrontaient au quotidien.",
        "L'expérience a laissé une impression durable. Ils ont rencontré des enfants disposant de ressources limitées et de peu d'opportunités, mais dotés d'un potentiel indéniable. Les lacunes étaient évidentes, mais la possibilité de ce qu'un soutien constant et structuré pourrait débloquer au fil du temps l'était tout autant. L'équipe a par la suite organisé davantage de visites dans des orphelinats.",
        "Les fondateurs ont réfléchi aux défis plus profonds dont ils avaient été témoins. Les obstacles auxquels faisaient face les enfants et les jeunes à travers le Cameroun n'étaient pas isolés. Ils étaient systémiques. Les lacunes éducatives, les pénuries de soins de santé, l'accès limité à la technologie et la faiblesse du soutien institutionnel alimentaient tous le même cycle. Cette prise de conscience a poussé l'équipe à cesser de raisonner en termes de projets individuels et à commencer à construire sur le long terme.",
        "Ce qui a suivi fut une série d'étapes décisives. L'équipe a incorporé la Fondation Gwags en tant qu'organisation à but non lucratif aux États-Unis et au Cameroun, établissant les bases juridiques et institutionnelles nécessaires à des opérations durables. De nouvelles initiatives ont été lancées dans les domaines de l'éducation, du développement communautaire, de la santé et de l'autonomisation des jeunes. Ce qui avait commencé comme des visites dans un orphelinat devenait une organisation multisectorielle avec un portefeuille croissant de programmes et de partenariats.",
        "Mais plus l'équipe construisait, plus une évidence s'imposait. Gérer des programmes ne suffisait pas. Le véritable défi n'était pas seulement de produire de l'impact, mais de le structurer. À travers le monde, d'innombrables organisations font un travail significatif tout en luttant contre les mêmes obstacles. Un financement limité, une gouvernance faible, aucun accès aux réseaux et aucune structure institutionnelle pour les aider à grandir.",
        "Cette prise de conscience a marqué un tournant décisif dans le parcours de Gwags. La mission ne concernait plus uniquement ce que Gwags pouvait faire directement. Il s'agissait de construire l'infrastructure qui permettrait aux organisations de faire davantage. Une institution capable de coordonner, soutenir et renforcer les organisations qui s'efforcent de créer de l'impact. Une plateforme où la crédibilité, la structure et la portée internationale pourraient être partagées, et non monopolisées.",
        "Aujourd'hui, Gwags a formellement opéré sa transition d'une fondation vers une Institution d'Impact Mondial. Elle opère à travers de multiples secteurs, construisant un écosystème conçu pour accélérer l'impact à grande échelle. Les programmes continuent de croître. Le réseau d'organisations continue de s'étendre. Et l'infrastructure qui permettra aux organisations de transformer leurs sociétés se construit, étape par étape, depuis la base.",
      ],
      timeline: {
        eyebrow: 'LA CHRONOLOGIE',
        h2: 'Les étapes qui ont façonné Gwags.',
        entries: [
          {
            year: '2021', month: 'DÉCEMBRE',
            title: "Première visite à l'orphelinat",
            body: "Quatre lycéens à Douala, au Cameroun, devaient réaliser un projet de service communautaire dans le cadre de leur programme scolaire. Ils ont organisé une visite à l'orphelinat Coeur de Jésus, où ils ont passé du temps avec les enfants, fourni des fournitures essentielles et constaté de première main les réalités auxquelles ces enfants faisaient face au quotidien.",
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
            title: 'Création et Incorporation de la Gwags Foundation',
            body: "Gwags a formalisé sa structure en créant et en incorporant la Gwags Foundation en tant qu'organisation à but non lucratif aux États-Unis et au Cameroun, établissant les bases juridiques et institutionnelles pour des opérations internationales durables.",
            photo: '',
          },
          {
            year: '2026', month: 'JANVIER',
            title: 'Lancement du Programme Gwags Scholars',
            body: "Gwags a lancé le Programme Gwags Scholars, une initiative conçue pour soutenir les étudiants universitaires exceptionnels à travers le Cameroun. Le programme offre un soutien financier et des opportunités de développement professionnel, investissant dans la prochaine génération de leaders camerounais.",
            photo: 'Photo: programme Scholars',
          },
          {
            year: '2026', month: 'JUILLET',
            title: 'Lancement du Fonds Mbal Lekeaka',
            body: "Gwags a établi le Fonds Mbal Lekeaka, un programme de subventions conçu pour soutenir les initiatives communautaires. Le fonds répond à un manque critique auquel font face de nombreuses initiatives locales qui peinent à se développer ou à maintenir leurs activités en raison d'un accès limité aux ressources financières.",
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
        "Voir le tableau d'ensemble",
        'Construire les fondations',
        'Le tournant',
        null,
        'Un nouveau chapitre',
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
          main: "Construire l'infrastructure internationale la plus impactante dédiée à structurer et soutenir les organisations qui transforment les sociétés de manière durable.",
          expansion: "C'est une vision pour l'écosystème que Gwags construit. Un monde où les organisations engagées dans l'impact ne luttent pas seules pour les ressources, la crédibilité ou la direction, et où l'infrastructure pour soutenir leur croissance existe déjà.",
        },
        mission: {
          label: 'NOTRE MISSION',
          main: "Accélérer et amplifier l'impact mondial en construisant l'infrastructure institutionnelle dont ont besoin les organisations engagées à relever les défis sociétaux.",
          expansion: "Gwags poursuit cette mission sur deux fronts: à travers son portefeuille d'initiatives dans différents secteurs incluant l'éducation et la santé; et institutionnellement en structurant et soutenant les organisations au sein de son réseau.",
        },
      },
      convictions: {
        eyebrow: 'CE QUI NOUS ANIME',
        heading: 'Les principes qui guident tout ce que nous faisons.',
        intro: '',
        items: [
          {
            heading: "L'impact est systémique.",
            body: "Les problèmes qui affectent nos sociétés existent rarement de manière isolée. Les progrès dans un domaine sans attention aux autres produisent des résultats limités et souvent temporaires. C'est pourquoi Gwags travaille dans plusieurs secteurs, à la fois à travers ses propres initiatives et à travers les organisations au sein de son réseau, chacune abordant différentes dimensions des mêmes défis interconnectés.",
          },
          {
            heading: "La structure est ce qui sépare l'intention de l'impact.",
            body: "Le facteur limitant est rarement l'ambition. La plupart des organisations qui travaillent à créer de l'impact font face aux mêmes lacunes structurelles: un accès limité au financement, des cadres de gouvernance faibles et une crédibilité institutionnelle insuffisante pour croître au-delà de leur environnement immédiat. Ce sont ces lacunes que Gwags a été construit pour combler.",
          },
          {
            heading: "La crédibilité se gagne par l'action, pas par le positionnement.",
            body: "Gwags s'impose les mêmes standards qu'il exige des organisations au sein de son réseau. Une gouvernance transparente, des résultats mesurables et une communication claire sur les opérations sont attendus à tous les niveaux. Notre crédibilité se construit à travers la qualité de nos programmes et la constance de notre suivi. C'est ce qui rend l'affiliation avec Gwags significative.",
          },
        ],
      },
      lookingAhead: {
        eyebrow: "REGARDER VERS L'AVENIR",
        heading: 'À quoi ressemble le monde quand nous réussissons.',
        paragraphs: [
          "Les organisations ne feront plus face seules aux mêmes barrières structurelles. Elles auront accès au soutien en gouvernance, aux réseaux internationaux, aux voies de financement et à la crédibilité institutionnelle nécessaire pour attirer des investissements et des partenariats. L'infrastructure que la plupart des organisations passent des années à construire de manière indépendante existera déjà au sein du réseau dont elles font partie.",
          "La mesure de notre succès sera visible dans les organisations qui ont grandi grâce au soutien reçu; dans les communautés qui ont bénéficié parce qu'une organisation affiliée avait la structure et les ressources nécessaires pour opérer; et dans les initiatives qui ont duré parce qu'une institution a été construite autour d'elles. C'est vers cela que Gwags travaille.",
        ],
      },
      cta: {
        h2: 'Prêt à faire partie de cette institution?',
        body: "Gwags construit quelque chose qui dure. Si votre organisation partage cette ambition, il y a une place pour vous au sein de notre réseau.",
        btn1: 'Nous contacter',
        btn2: 'Rejoindre le réseau',
      },
    },
    scholarsPage: {
      hero: {
        name: 'Programme Gwags Scholars',
        goal: 'Identifier et investir dans les étudiants universitaires camerounais exceptionnels en fournissant un soutien financier et des opportunités de développement professionnel qui les préparent à la transition vers le monde du travail.',
      },
      sections: [
        {
          heading: 'L\'accès à l\'enseignement supérieur au Cameroun',
          body: 'Au Cameroun, l\'accès à l\'enseignement supérieur reste fortement influencé par les circonstances financières. Des étudiants avec de solides résultats académiques sont souvent incapables de poursuivre leurs études en raison d\'un manque de soutien financier. Et pour ceux qui obtiennent leur diplôme, la transition vers le monde du travail présente ses propres défis. Un accès limité à l\'expérience professionnelle et à l\'exposition professionnelle laisse de nombreux diplômés sans les outils nécessaires pour construire des carrières après l\'obtention de leur diplôme.',
        },
        {
          heading: 'À propos du programme',
          body: 'Le Programme Gwags Scholars est une initiative conçue pour répondre directement aux deux défis. Le programme fournit un soutien financier aux étudiants universitaires exceptionnels à travers le Cameroun, supprimant l\'un des principaux obstacles à la poursuite de leurs études. Au-delà des bourses, le programme prépare les lauréats au monde du travail à travers des opportunités de stage et une exposition à des environnements professionnels.',
        },
        {
          heading: 'Ce qu\'il faut savoir avant de postuler',
          richBody: [
            { label: 'Qui peut postuler', text: 'Les étudiants de licence actuellement inscrits dans une université au Cameroun.' },
            { label: 'Ce qui est requis', text: 'Un relevé de notes académique et une réponse écrite à l\'invite de candidature.' },
            { label: 'Ce que les lauréats reçoivent', text: 'Une bourse de 150 000 FCFA et un accès à des placements en stage. Le programme sélectionne 10 lauréats par promotion.' },
            { label: 'Critères de sélection', text: 'La sélection est basée sur le mérite académique et la qualité de la soumission écrite.' },
            { label: 'Langue', text: 'Les candidatures sont acceptées en anglais et en français.' },
          ],
        },
      ],
      keyDates: {
        heading: 'Dates clés',
        batch: 'Promotion 2027',
        items: [
          { label: 'Ouverture des candidatures', date: 'Janvier 2027' },
          { label: 'Clôture des candidatures', date: 'Mars 2027' },
          { label: 'Publication des résultats', date: 'Mai 2027' },
        ],
      },
      apply: 'Postuler maintenant',
      carousel: {
        heading: 'Nos Boursiers',
        events: [
          { label: 'Promotion 2026', href: '/initiatives/scholars/2026', items: ['', '', '', '', '', '', '', '', '', ''] },
        ],
      },
    },
    mbalLekeakaPage: {
      hero: {
        name: 'Fonds Mbal Lekeaka',
        goal: 'Fournir un soutien financier direct aux initiatives communautaires qui répondent à des besoins réels sur le terrain mais qui manquent de ressources pour exécuter, développer ou pérenniser leur travail.',
      },
      sections: [
        {
          heading: 'Financer ce qui compte',
          body: 'Dans les communautés, des organisations et des groupes travaillent à répondre à de réels besoins sur le terrain. Beaucoup de ces initiatives sont portées par des personnes qui comprennent les défis de première main. Mais sans accès à des ressources financières, même les projets communautaires les plus prometteurs peinent à se lancer, à se maintenir ou à se développer.',
        },
        {
          heading: 'À propos du fonds',
          body: 'Le Fonds Mbal Lekeaka est un programme de subventions établi par Gwags pour fournir un soutien financier direct aux initiatives communautaires. Le fonds cible les organisations et groupes qui travaillent sur des projets répondant à de véritables besoins dans leurs communautés mais qui manquent des ressources pour exécuter ou développer leur travail. À travers le fonds, Gwags canalise des ressources vers des initiatives qui démontrent des objectifs clairs et un potentiel d\'impact mesurable.',
        },
        {
          heading: 'Ce qu\'il faut savoir avant de postuler',
          richBody: [
            { label: 'Qui peut postuler', text: 'Les organisations, groupes communautaires et initiatives locales disposant d\'un projet clairement défini.' },
            { label: 'Ce qui est requis', text: 'Une proposition écrite décrivant l\'initiative, ses objectifs, les résultats attendus et un budget détaillé.' },
            { label: 'Critères de sélection', text: 'Les propositions sont évaluées sur la base du besoin communautaire démontré, de la faisabilité opérationnelle et de l\'alignement avec les priorités du fonds.' },
            { label: 'Langue', text: 'Les propositions sont acceptées en anglais et en français.' },
          ],
        },
      ],
      apply: 'Soumettre une proposition',
      carousel: {
        heading: 'Initiatives Financées',
        events: [
          { label: 'Campagne de Santé CAMESA Nguti', href: '/initiatives/mbal-lekeaka-fund/camesa-nguti-health-campaign', items: ['', '', '', '', '', ''] },
        ],
      },
    },
    ajongForetiasPage: {
      hero: {
        name: 'Ajong Foretia Orphan Support',
        goal: 'Fournir un soutien durable aux enfants orphelins à travers des initiatives qui offrent des fournitures de vie essentielles, des opportunités éducatives et une formation pratique en compétences.',
      },
      sections: [
        {
          heading: 'Soutenir les plus vulnérables',
          body: 'Les enfants orphelins font partie des populations les plus mal desservies au monde. Beaucoup grandissent dans des orphelinats fonctionnant avec des ressources limitées et peu de soutien externe. L\'accès aux nécessités de base, à l\'éducation et aux opportunités de développement reste au mieux irrégulier. Sans une intervention structurée et soutenue, ces enfants font face à des obstacles qui s\'accumulent au fil du temps, limitant leur capacité à apprendre et à construire un avenir au-delà de leurs circonstances immédiates.',
        },
        {
          heading: 'À propos du programme',
          body: 'Le programme de soutien aux orphelins Ajong Foretia est la manière dont Gwags répond aux défis auxquels font face les enfants orphelins. Le programme opère à travers des visites organisées dans des orphelinats, fournissant des fournitures de vie essentielles et créant des opportunités éducatives et de développement. Grâce à des partenariats avec des organisations locales, le programme a offert aux enfants une exposition pratique à la technologie.\n\nÀ mesure que le programme se développe, Gwags travaille à approfondir le soutien qu\'il fournit. Cela inclut l\'augmentation de la fréquence des visites, l\'introduction de sessions de mentorat structurées où des professionnels enseignent des compétences spécifiques sur des périodes prolongées, et la construction d\'un modèle de parrainage qui soutient les orphelins dans leur éducation de l\'enfance jusqu\'à l\'obtention de leur diplôme.',
        },
      ],
      stats: {
        heading: 'Notre impact',
        subheading: 'Résultats mesurables de nos initiatives de soutien aux orphelins.',
        items: [
          { value: '187', label: 'orphelins soutenus' },
          { value: '15 000 $+', label: 'en soutien caritatif' },
        ],
      },
      carousel: {
        heading: 'Visites Passées',
        events: [
          { label: 'Atelier Tech avec Codam Technologies', href: '/initiatives/ajong-foretia/tech-workshop-codam-technologies', items: ['', '', '', '', '', ''] },
          { label: "Visite à l'Orphelinat Coeur de Jésus", href: '/initiatives/ajong-foretia/visit-coeur-de-jesus-orphanage', items: ['', '', '', '', '', ''] },
        ],
      },
    },
    healthOutreachPage: {
      hero: {
        name: 'Programme de Santé Communautaire',
        goal: 'Apporter des services de santé gratuits et une éducation médicale aux communautés mal desservies à travers des campagnes de terrain structurées.',
      },
      sections: [
        {
          heading: 'Les soins de santé dans les communautés mal desservies',
          body: 'L\'accès aux soins de santé de base reste l\'un des défis les plus persistants auxquels font face les communautés mal desservies à travers le monde. Dans de nombreuses régions, les populations n\'ont pas accès à des professionnels de santé qualifiés, à des infrastructures de diagnostic et à une éducation sanitaire préventive. Des maladies traitables ne sont pas diagnostiquées. Des maladies évitables continuent de se propager. Et les communautés qui ont le plus besoin de soins de santé sont souvent les plus éloignées de ceux-ci.',
        },
        {
          heading: 'À propos du programme',
          body: 'Le Programme de Sensibilisation Sanitaire est la manière dont Gwags répond directement au déficit de soins de santé. Le programme organise et co-livre des campagnes de santé dans des communautés mal desservies, rassemblant des professionnels de santé et des organisations partenaires pour fournir des consultations gratuites, des dépistages, des interventions chirurgicales et de l\'éducation sanitaire. Chaque campagne est construite autour des besoins spécifiques de la communauté qu\'elle dessert et livrée à travers un cadre opérationnel structuré conçu pour maximiser la portée et l\'impact.\n\nChaque campagne est documentée du début à la fin. Le nombre de patients, les diagnostics, les procédures effectuées et les sessions d\'éducation sont tous enregistrés. Ces données sont analysées pour mesurer la portée et l\'efficacité de chaque campagne et pour orienter la planification des futures campagnes.',
        },
      ],
      stats: {
        heading: 'Notre impact',
        subheading: 'Des résultats mesurables issus de nos campagnes de sensibilisation sanitaire.',
        items: [
          { value: '1 500+', label: 'bénéficiaires atteints' },
          { value: '120+', label: 'professionnels de santé déployés' },
          { value: '1', label: 'campagne menée' },
        ],
      },
      carousel: {
        heading: 'Campagnes Passées',
        events: [
          { label: 'Campagne de Santé de Nguti', href: '/initiatives/health-outreach/nguti-health-campaign', items: ['', '', '', '', '', ''] },
        ],
      },
    },
  },
}