export type Lang = 'en' | 'fr'

export const t = {
  en: {
    nav: {
      subtitle: 'GLOBAL IMPACT INSTITUTION',
      about: 'About us',
      initiatives: 'Our Work',
      network: 'Network',
      getInvolved: 'Get Involved',
      contact: 'Contact',
      dropdowns: {
        about: {
          heading: 'About us',
          subHeading: 'About the Gwags Global Impact Institution',
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
        { title: 'Gwags Scholars Program', desc: 'Providing educational funding and professional development opportunities to outstanding Cameroonian students.', tag: 'EXCELLENCE' },
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
        heading: 'GET INVOLVED',
        desc: 'There is a place for you. Gwags works with organizations and funders committed to building something that lasts. Whether through affiliation, partnership, or funding, there is a path for you.',
      },
      partner: {
        eyebrow: 'Partner with us',
        text: 'We partner with organizations committed to structured, sustainable impact. Partnership means shared resources and alignment toward common goals.',
        cta: 'Express interest',
      },
      support: {
        eyebrow: 'Support our work',
        text: 'Invest in what lasts. Every contribution supports the programs we run and the institutional infrastructure we are building.',
        donate: 'Donate',
      },
      contact: {
        eyebrow: 'Contact us',
        text: 'For general inquiries, media requests, or any other questions, reach out to us directly.',
        cta: 'Write to us',
      },
      follow: {
        eyebrow: 'Follow us',
        text: 'Stay updated with our work and institutional developments across our digital channels.',
      },
    },
    contactPage: {
      heading: 'Write to Us',
      subheading: 'We welcome your questions, feedback, and inquiries.',
      notice: 'Please note: we are only able to review inquiries submitted in English and French.',
      labels: {
        firstName: 'First Name',
        lastName: 'Last Name',
        email: 'Email',
        phone: 'Phone',
        country: 'Country',
        city: 'City',
        message: 'Message',
      },
      phonePlaceholder: 'Optional',
      messagePlaceholder: 'Your message...',
      charLimit: '500 character limit',
      submit: 'Submit',
      success: 'Thank you. Your message has been sent.',
      error: 'Something went wrong. Please try again.',
    },
    partnerPage: {
      heading: 'Partner With Gwags',
      subheading: 'Tell us about your organization and how you see us working together.',
      labels: {
        contactName: 'Contact Person Name',
        orgName: 'Organization Name',
        orgEmail: 'Organization Email',
        orgPhone: 'Organization Phone',
        website: 'Website',
        country: 'Country',
        city: 'City',
        sector: 'Sector',
        orgDesc: 'Brief description of your organization',
        message: 'Describe what you would like to achieve together',
      },
      phonePlaceholder: 'Optional',
      orgDescPlaceholder: 'Brief description...',
      messagePlaceholder: 'What would you like to achieve together?',
      submit: 'Submit',
      success: 'Thank you. Your submission has been received.',
      error: 'Something went wrong. Please try again.',
    },
    donationOverlay: {
      giveOnce: 'Give once',
      monthly: 'Monthly',
      otherAmount: 'Other amount',
      donate: 'Donate',
      donateMonthly: 'Donate monthly',
      manageText: 'Manage your donation',
      sideText: 'Every contribution matters. When you give, you are contributing directly to programs that deliver results and to a network built to make impact sustainable. For customized donations, reach out to us at ',
      manageDescription: "Enter the email address you used to donate, and we'll take you to your secure Stripe portal to manage or cancel your recurring gift.",
      manageEmailLabel: 'Email',
      manageSubmit: 'Get my portal link',
      manageEmailInvalid: 'Please enter a valid email address.',
      manageNotFound: "We couldn't find an active donation associated with this email.",
      genericError: 'Something went wrong. Please try again.',
      amountTooLowError: 'Donation amount must be at least $0.50.',
      paymentStartError: 'Failed to start payment. Please try again.',
      cardNotReadyError: 'Payment form is not ready. Please refresh and try again.',
      cardChargeError: 'Your card could not be charged. Please check your details and try again.',
      walletPaymentError: 'Your payment could not be completed. Please try again.',
      thankYouOnce: 'Thank you for your donation.',
      thankYouMonthly: "Thank you for your monthly donation. Your first payment has been processed, and you'll be charged automatically each month. You can manage or cancel your recurring gift anytime.",
    },
    donationFaq: {
      secure: {
        q: 'Is my donation secure?',
        a: "Yes, we use industry-standard SSL technology to keep your information secure. We partner with Stripe, the industry's established payment processor trusted by some of the world's largest companies. Your sensitive financial information never touches our servers. We send all data directly to Stripe's PCI-compliant servers through SSL.",
      },
      receipt: {
        q: 'Will I receive a receipt?',
        a: 'We will email you a donation receipt. Please retain it for your records.',
      },
      cancel: {
        q: 'Can I cancel my recurring donation?',
        a: "You can manage or cancel your recurring donation at any time using the link in your donation confirmation email. If you can't locate it, contact us at ",
      },
      report: {
        q: 'Report a problem',
        placeholder: 'Describe the problem you encountered...',
        confirm: 'I confirm no personal or payment details are included',
        submit: 'Report',
        cancel: 'Cancel',
        sent: 'Thank you. Your report has been submitted.',
        textRequired: 'Please describe the problem.',
        confirmRequired: 'Please confirm no personal or payment details are included.',
      },
    },
    cta: {
      h2: 'Ready to build something that lasts?',
      body: 'Gwags is building an international infrastructure for impact. Reach out to explore how we can work together toward a shared vision of impact.',
      btn1: 'Partner with us',
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
        { label: 'Support our work', href: '/get-involved?action=donate' },
        { label: 'Contact us', href: '/contact' },
        { label: 'Partner with us', href: '/partner' },
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
          { title: 'Gwags Scholars Program', desc: 'Providing educational funding and professional development opportunities to outstanding Cameroonian students.', tag: 'EXCELLENCE', href: '/initiatives/scholars' },
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
        btn1: 'Partner with us',
        btn2: 'Join the network',
      },
    },
    ourStoryPage: {
      hero: {
        eyebrow: 'OUR STORY',
        h1: 'How it all started.',
      },
      photoBanner: '/images/ajong-foretia/coeur-de-jesus/DSC_1208.JPG',
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
            photo: '/images/ajong-foretia/coeur-de-jesus/DSC_1171.JPG',
          },
          {
            year: '2022', month: 'DECEMBER',
            title: 'Partnership with Codam Technologies',
            body: 'The team organized a second visit to the Ami de Jésus orphanage, this time partnering with a Cameroonian organization called Codam Technologies to provide hands-on technology exposure to the children. The children were introduced to 3D printing, introductory coding, and digital tools for the first time.',
            photo: '/images/ajong-foretia/codam-tech/654202991_18087992795267535_1459227050299309829_n.jpg',
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
            photo: '/images/scholars/program-cover.jpg',
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
            body: "In partnership with several organizations including the Ministry of Public Health of Cameroon and the Cameroon English Speaking Medical Students' Association (CAMESA), Gwags supported a week-long health outreach campaign in the Nguti Health District, located in Cameroon's South West Region. The campaign deployed 120 medical personnel to provide free consultations, surgeries, screenings, and health education to over 1,500 people across the district.",
            photo: '/images/health-outreach/nguti-health-campaign/2T8A1064.jpg',
          },
          {
            year: '2026', month: 'SEPTEMBER',
            title: 'Transition to Global Impact Institution',
            body: 'Gwags formally evolved beyond a foundation model, repositioning itself as a Global Impact Institution dedicated to structuring, coordinating, and accelerating initiatives committed to the sustainable transformation of societies at scale.',
            photo: '/images/general/WhatsApp_Image_2026-06-23_at_10_07_06.jpeg',
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
        btn1: 'Partner with us',
        btn2: 'Join the network',
      },
    },
    scholarsPage: {
      hero: {
        name: 'Gwags Scholars Program',
        goal: 'To identify and invest in outstanding Cameroonian students by funding their education and providing professional development opportunities that prepare them for the transition into the workforce.',
        image: '/images/scholars/program-cover.jpg',
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
          { label: '2026 Cohort', href: '/initiatives/scholars/2026', imagePosition: 'top', cardVariant: 'scholars', items: [
            '/images/scholars/scholar-01.jpg',
            '/images/scholars/scholar-02.jpg',
            '/images/scholars/scholar-03.jpg',
            '/images/scholars/scholar-04.jpg',
            '/images/scholars/scholar-05.jpg',
            '/images/scholars/scholar-06.jpg',
            '/images/scholars/scholar-07.jpg',
            '/images/scholars/scholar-08.jpg',
            '/images/scholars/scholar-09.jpg',
            '/images/scholars/scholar-10.jpg',
          ] },
        ],
      },
    },
    scholarsBatches: {
      '2026': {
        title: 'The Gwags Scholars',
        batchLabel: '2026 Cohort',
        universityLabel: 'University',
        programLabel: 'Program',
        scholars: [
          { name: 'Chia Rozel', program: 'Pharmacy', university: 'University of Bamenda', image: '/images/scholars/scholar-01.jpg' },
          { name: 'Jores Junior Tapa', program: 'Civil Engineering', university: 'University of Yaoundé 1', image: '/images/scholars/scholar-02.jpg' },
          { name: 'Asonganyi Yufanyi', program: 'Nursing Science', university: 'University of Buea', image: '/images/scholars/scholar-03.jpg' },
          { name: 'Glorya Odrey Nguessop', program: 'Management & Finance', university: 'Prepa Saint Jean', image: '/images/scholars/scholar-04.jpg' },
          { name: 'Nchia Dze Desmond', program: 'Medicine', university: 'University of Buea', image: '/images/scholars/scholar-05.jpg' },
          { name: 'Ines Patricia Kouna', program: 'Mathematics, Statistics and Computer Science', university: 'University of Bertoua', image: '/images/scholars/scholar-06.jpg' },
          { name: 'Fon Precious Fri', program: 'Economic Science', university: 'University of Yaoundé 2', image: '/images/scholars/scholar-07.jpg' },
          { name: 'Madeleine Tchanchou Wandji', program: 'Geography', university: 'University of Douala', image: '/images/scholars/scholar-08.jpg' },
          { name: 'Emily Success Azem', program: 'Pharmacy', university: 'University of Buea', image: '/images/scholars/scholar-09.jpg' },
          { name: 'Ngwa Harriette Bih', program: 'Nursing', university: 'University of Bamenda', image: '/images/scholars/scholar-10.jpg' },
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
          { label: 'CAMESA Nguti Health Campaign', href: '/initiatives/mbal-lekeaka-fund/camesa-nguti-health-campaign', items: [
            '/images/health-outreach/nguti-health-campaign/2T8A0635.jpg',
            '/images/health-outreach/nguti-health-campaign/2T8A1023.jpg',
            '/images/health-outreach/nguti-health-campaign/2T8A0447.jpg',
            '/images/health-outreach/nguti-health-campaign/2T8A1061.jpg',
            '/images/health-outreach/nguti-health-campaign/2T8A0574.jpg',
          ] },
        ],
      },
    },
    ajongForetiasPage: {
      hero: {
        name: 'Ajong Foretia Orphan Support',
        goal: 'To provide sustained support to orphaned children through initiatives that deliver essential living supplies, educational opportunities, and practical skills training.',
        image: '/images/ajong-foretia/coeur-de-jesus/DSC_1171.JPG',
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
          { value: '$5,000+', label: 'in charitable support' },
        ],
      },
      carousel: {
        heading: 'Past Visits',
        events: [
          { label: 'Tech Workshop with Codam Technologies', href: '/initiatives/ajong-foretia/tech-workshop-codam-technologies', items: [
            '/images/ajong-foretia/codam-tech/270a2a81-3939-4aa8-920a-6cac15dc79cc-2.jpg',
            '/images/ajong-foretia/codam-tech/654179078_18124924684505595_2190489630294524424_n.jpg',
            '/images/ajong-foretia/codam-tech/dab967bf-fac1-4c5a-8ee1-49590e269e10.jpg',
            '/images/ajong-foretia/codam-tech/IMG_4410.jpg',
            '/images/ajong-foretia/codam-tech/651489550_18037183757564745_7380016685533927990_n.jpg',
          ] },
          { label: 'Visit to Coeur de Jésus Orphanage', href: '/initiatives/ajong-foretia/visit-coeur-de-jesus-orphanage', items: [
            '/images/ajong-foretia/coeur-de-jesus/DSC_1164.JPG',
            '/images/ajong-foretia/coeur-de-jesus/DSC_1211.JPG',
            '/images/ajong-foretia/coeur-de-jesus/DSC_1215.JPG',
            '/images/ajong-foretia/coeur-de-jesus/DSC_1217.JPG',
            '/images/ajong-foretia/coeur-de-jesus/DSC_1161.JPG',
          ] },
        ],
      },
    },
    healthOutreachPage: {
      hero: {
        name: 'Health Outreach Program',
        goal: 'To bring free healthcare services and medical education to underserved communities through structured field campaigns.',
        image: '/images/health-outreach/nguti-health-campaign/2T8A0659.jpg',
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
          { value: '1,700+', label: 'beneficiaries reached' },
          { value: '120+', label: 'medical professionals deployed' },
          { value: '1', label: 'campaign conducted' },
        ],
      },
      carousel: {
        heading: 'Past Campaigns',
        events: [
          { label: 'Nguti Health Campaign', href: '/initiatives/health-outreach/nguti-health-campaign', items: [
            '/images/health-outreach/nguti-health-campaign/2T8A1061.jpg',
            '/images/health-outreach/nguti-health-campaign/2T8A0574.jpg',
            '/images/health-outreach/nguti-health-campaign/2T8A1023.jpg',
            '/images/health-outreach/nguti-health-campaign/2T8A0635.jpg',
            '/images/health-outreach/nguti-health-campaign/2T8A0447.jpg',
          ] },
        ],
      },
    },
    network: {
      heading: 'Our Network',
      description: 'A growing ecosystem of organizations aligned by shared standards and a common ambition to create lasting impact. The organizations within the Gwags network operate across different sectors, each contributing to a broader mission of structured, sustainable impact.',
      searchPlaceholder: 'Search organizations',
      searchButton: 'Search',
      noResults: 'No results found.',
      cta: {
        text: 'Interested in joining the network?',
        subtext: "If your organization shares our commitment to structured, sustainable impact, we'd like to hear from you. Tell us about your work and how it aligns with the Gwags network.",
        link: 'Express interest',
      },
      detail: {
        aboutHeading: 'About',
        aboutText: '[Organization description placeholder. This section will contain a detailed overview of the organization, its mission, and the work it does within the Gwags network.]',
        detailsHeading: 'Details',
        sectorLabel: 'Sector',
        countryLabel: 'Country',
        yearLabel: 'Year affiliated',
        initiativesLabel: 'Active initiatives',
        connectHeading: 'Connect',
        websiteLabel: 'Visit website',
        placeholder: '[Placeholder]',
        notFound: 'Organization not found.',
        back: 'Back to Network',
      },
    },
    terms: {
      title: 'Terms of Use',
      updated: 'Last updated: September 2026',
      intro: [
        "These Terms of Use (\"Terms\") constitute a legally binding agreement between you (\"user,\" \"you,\" or \"your\") and Gwags Global Impact Institution, a nonprofit institution incorporated in the United States and the Republic of Cameroon, together with its affiliates, programs, and operational entities (collectively, \"Gwags,\" \"the Institution,\" \"we,\" \"us,\" or \"our\"). These Terms govern your access to and use of this website, including all associated pages, features, applications, forms, portals, and digital services operated or maintained by Gwags (collectively, the \"Site\").",
        "By accessing or using the Site, you acknowledge that you have read, understood, and agree to be bound by these Terms as they may be amended from time to time. If you do not agree to these Terms, or if the laws of your jurisdiction do not honor them, you must discontinue use of the Site immediately.",
      ],
      sections: [
        { heading: '1. Eligibility', body: [
          "The Site is available only to individuals who are at least 18 years of age or who have reached the age of majority in their jurisdiction of residence. By accessing or using the Site, you represent and warrant that (a) you meet this age requirement, and (b) if you are accessing or using the Site on behalf of an organization, entity, or other legal person, you are duly authorized to accept these Terms and bind that organization to them.",
        ] },
        { heading: '2. Minors', body: [
          "The Site is not directed at individuals under the age of 18. Gwags does not knowingly collect personal information from minors. If you are under 18 years of age, you may only access or use the Site with the consent and active supervision of a parent or legal guardian who agrees to be bound by these Terms on your behalf. If we become aware that personal information has been collected from a minor without verifiable parental or guardian consent, we will take reasonable steps to delete such information promptly.",
          "Notwithstanding the foregoing, certain Gwags programs, including the Gwags Scholars Program, may accept applications or materials from individuals under 18. In such cases, the applicant's parent or legal guardian must review and consent to these Terms and any applicable Additional Terms prior to submission. Gwags may request verification of parental or guardian consent at any time.",
        ] },
        { heading: '3. Additional Terms', body: [
          "Certain features of the Site, including but not limited to donation processing, partnership submission portals, network directory profiles, scholarship applications, and event registration, may be subject to supplementary terms, guidelines, or policies (\"Additional Terms\"). Where Additional Terms apply, they will be presented to you in connection with the relevant feature. Unless expressly stated otherwise, Additional Terms supplement and are incorporated into these Terms. In the event of a conflict between these Terms and any Additional Terms, the Additional Terms shall govern solely with respect to the feature to which they apply.",
        ] },
        { heading: '4. Multilingual Content', body: [
          "The Site is available in English and French. Translations are provided for the convenience of users. In the event of any inconsistency, discrepancy, or ambiguity between the English-language version and any translated version of these Terms, the Privacy Policy, or any other content on the Site, the English-language version shall prevail and be treated as authoritative.",
          "Gwags endeavors to maintain accurate translations but does not warrant the accuracy, completeness, or currency of translated content. Gwags shall not be liable for any loss, damage, or misunderstanding arising from reliance on translated content where it differs from the English-language original.",
        ] },
        { heading: '5. Accessibility', body: [
          "Gwags is committed to making the Site accessible to all users, including individuals with disabilities. We strive to conform to applicable accessibility standards and to continuously improve the user experience for everyone. If you encounter any accessibility barriers or have difficulty accessing any part of the Site, please contact us at contact@gwags.org with a description of the issue. We will make reasonable efforts to address your concern and to provide the information or service you need through an accessible alternative.",
        ] },
        { heading: '6. Use of the Site', body: [
          { term: '(a) License', desc: "Subject to your compliance with these Terms, Gwags grants you a limited, non-exclusive, non-transferable, non-sublicensable, and revocable license to access and use the Site and its content solely for lawful, noncommercial, and personal or internal organizational purposes." },
          { term: '(b) Restrictions', desc: "In connection with your use of the Site, you shall not:" },
          { list: [
            "use the Site for any purpose that is unlawful or prohibited by these Terms, or that violates any applicable local, national, or international law or regulation;",
            "reproduce, duplicate, copy, sell, distribute, license, or exploit any content, material, or feature of the Site for commercial purposes without the prior written consent of Gwags;",
            "interfere with, disrupt, or attempt to compromise the proper functioning, security, or integrity of the Site or any associated systems, servers, or networks;",
            "upload, transmit, or otherwise make available any content that is harmful, threatening, abusive, defamatory, obscene, invasive of privacy, or otherwise objectionable;",
            "upload or transmit any material containing viruses, malicious code, or any other harmful component;",
            "attempt to gain unauthorized access to any portion of the Site, any accounts, systems, or networks connected to the Site, or any data not intended for you;",
            "use any automated means, including bots, scrapers, crawlers, or similar technologies, to access, monitor, copy, or collect content or data from the Site without our express written permission;",
            "impersonate any person or entity, or misrepresent your affiliation with any person or entity, including Gwags;",
            "use the Site, its content, or the Gwags name in any manner that suggests endorsement, affiliation, or partnership with the Institution unless expressly authorized in writing; or",
            "intentionally or recklessly cause damage to the Institution's reputation, operations, personnel, or stakeholders.",
          ] },
          "Any unauthorized use of the Site may result in the immediate suspension or termination of your access, without notice, and may expose you to civil or criminal liability.",
          { term: '(c) Monitoring', desc: "Gwags reserves the right, but does not assume the obligation, to monitor use of the Site and to remove or restrict access to any content or feature at any time, in its sole discretion, without prior notice." },
        ] },
        { heading: '7. Intellectual Property', body: [
          { term: '(a) Ownership', desc: "All content available on or through the Site, including but not limited to text, graphics, logos, images, photographs, illustrations, data, software, page layout, design, and compilation thereof (collectively, \"Content\"), is the exclusive property of Gwags or its licensors and is protected under applicable copyright, trademark, patent, and other intellectual property laws." },
          { term: '(b) Trademarks', desc: "The Gwags name, logo, and all related trademarks, service marks, and trade dress are the property of Gwags. You may not use any Gwags trademark, logo, or trade dress without our express prior written consent. If such consent is granted, use must conform to any brand guidelines provided by the Institution." },
          { term: '(c) No Transfer of Rights', desc: "No right, title, or interest in or to any Content is transferred to you by virtue of your access to or use of the Site. All rights not expressly granted herein are reserved by Gwags." },
          { term: '(d) Obligation to Report Infringement', desc: "If you become aware of any unauthorized use, reproduction, or distribution of Gwags's intellectual property, including its name, logo, Content, or other proprietary materials, whether on or off the Site, you agree to notify Gwags promptly at contact@gwags.org. This obligation applies to any use that you reasonably believe may constitute infringement or misappropriation of the Institution's intellectual property rights." },
        ] },
        { heading: '8. Account Registration', body: [
          "Access to certain features of the Site may require you to create a user account (\"Account\") and establish login credentials (\"Credentials\"). If you register for an Account, you agree to:",
          { list: [
            "provide accurate, complete, and current information during registration and maintain the accuracy of such information;",
            "keep your Credentials confidential and not share them with any third party;",
            "accept sole responsibility for all activity that occurs under your Account, whether or not authorized by you; and",
            "notify Gwags immediately at contact@gwags.org if you suspect any unauthorized use of your Account or Credentials.",
          ] },
          "Gwags reserves the right to suspend, deactivate, or terminate any Account at any time, for any reason or no reason, in its sole discretion. You may not sell, transfer, or assign your Account to any third party.",
        ] },
        { heading: '9. User Submissions', body: [
          { term: '(a) General', desc: "The Site may allow you to submit information, materials, proposals, messages, documents, or other content through forms, portals, or other features (collectively, \"Submissions\"). Submissions include, without limitation, information submitted through partnership inquiry forms, contact forms, network affiliation requests, grant-related materials, scholarship applications, and any other content you provide to Gwags through the Site." },
          { term: '(b) Representations', desc: "By providing a Submission, you represent and warrant that: (i) you have the right and authority to provide the Submission; (ii) the Submission does not infringe, misappropriate, or violate the intellectual property, proprietary, or privacy rights of any third party; (iii) the Submission does not contain confidential information of any third party that you are not authorized to disclose; and (iv) the Submission complies with all applicable laws and regulations." },
          { term: '(c) License', desc: "By submitting any Submission to Gwags, you grant to Gwags a worldwide, royalty-free, non-exclusive, perpetual, irrevocable, transferable, and sublicensable license to use, reproduce, modify, adapt, publish, translate, distribute, display, and create derivative works from your Submission, in whole or in part, in any form or medium now known or hereafter developed, for any purpose related to the furtherance of Gwags's mission and operations, without credit or compensation to you unless otherwise agreed in writing." },
          { term: '(d) Use in Reporting and Communications', desc: "Without limiting the generality of the foregoing license, you acknowledge and agree that Gwags may use your Submission, in whole or in part, for institutional reporting, impact measurement, annual reports, press releases, social media communications, fundraising materials, and other public communications, without the need for further consent beyond what is granted in these Terms. If your Submission contains personally identifiable information, Gwags will handle such information in accordance with its Privacy Policy." },
          { term: '(e) No Obligation', desc: "Gwags is under no obligation to review, use, return, or respond to any Submission. Gwags may, in its sole discretion, edit, refuse, or remove any Submission at any time without notice." },
          { term: '(f) No Confidentiality', desc: "Unless governed by a separate written confidentiality agreement between you and Gwags, all Submissions are deemed non-confidential and non-proprietary." },
          { term: '(g) Data Retention', desc: "Gwags retains Submissions and associated data for as long as reasonably necessary to fulfill the purposes described in these Terms, to comply with legal obligations, to resolve disputes, and to enforce agreements, or as otherwise required by applicable law." },
        ] },
        { heading: '10. Electronic Communications', body: [
          "By using the Site, providing your email address through any form or Account registration, or making a donation, you consent to receiving electronic communications from Gwags, including but not limited to donation receipts, transaction confirmations, account notifications, partnership correspondence, program updates, and other institutional communications. You agree that all agreements, notices, disclosures, receipts, and other communications that Gwags provides to you electronically satisfy any legal requirement that such communications be in writing.",
          "You may opt out of non-transactional communications (such as newsletters or general updates) at any time by following the unsubscribe instructions included in such communications or by contacting contact@gwags.org. Transactional communications related to donations, account activity, or legal notices cannot be opted out of while you maintain an Account or have an active recurring donation.",
        ] },
        { heading: '11. Donations', body: [
          { term: '(a) Processing', desc: "Donations made through the Site are processed securely by Stripe, Inc. (\"Stripe\"), a third-party payment processor. By making a donation, you agree to be bound by Stripe's applicable terms of service and privacy policy, which are available on Stripe's website." },
          { term: '(b) Currency', desc: "Donation amounts displayed on the Site are denominated in the currency indicated at the time of the transaction. If your payment method is denominated in a different currency, the final charged amount may vary due to exchange rate fluctuations applied by your bank, card issuer, or payment network. Gwags is not responsible for any differences between the displayed donation amount and the amount ultimately charged to your account as a result of currency conversion." },
          { term: '(c) Use of Funds', desc: "All donations received by Gwags are used in furtherance of the Institution's charitable mission. Unless a donation is designated for a specific initiative, program, or fund and accepted as such by Gwags, donations are treated as unrestricted contributions." },
          { term: '(d) Designated Donations', desc: "If you designate a donation for a specific initiative or fund and that initiative is no longer active, has reached its funding capacity, or has been discontinued, Gwags reserves the right to redirect the donation to a similar initiative aligned with the original designation, or to its general fund, at its sole discretion. Gwags will make reasonable efforts to notify you of any such reallocation." },
          { term: '(e) Refund Policy', desc: "Donations are generally non-refundable. If you believe a donation was made in error or without your authorization, you may contact Gwags at donate@gwags.org within thirty (30) days of the transaction. Gwags will review your request and, at its sole discretion, determine whether a refund is warranted." },
          { term: '(f) Recurring Donations', desc: "If you elect to make a recurring donation, you authorize Gwags and Stripe to charge the designated amount to your selected payment method at the frequency you specify until you cancel. You may cancel a recurring donation at any time through your donor account or by contacting donate@gwags.org. Cancellation will take effect for the next scheduled payment cycle." },
          { term: '(g) Tax Receipts', desc: "Gwags will issue tax-deductible receipts in accordance with the tax laws of the jurisdictions in which it is incorporated. It is your sole responsibility to determine the tax implications of your donation under the laws applicable to you." },
          { term: '(h) No Commissions', desc: "Gwags does not pay commissions, finder's fees, or similar compensation to any individual or entity in connection with the solicitation or processing of donations, unless expressly agreed to in a written contract executed prior to such arrangement." },
          { term: '(i) Severability of this Section', desc: "Each subsection of this Section is independent and severable; the invalidity or unenforceability of any subsection shall not affect the validity or enforceability of any other subsection." },
        ] },
        { heading: '12. Network Directory', body: [
          { term: '(a) General', desc: "The Site features a directory of organizations affiliated with the Gwags network (\"Network Organizations\"). Information displayed about Network Organizations is provided for informational purposes only. Inclusion in the directory does not constitute endorsement, partnership, or agency between Gwags and any listed organization, nor does it represent any guarantee regarding the quality, reliability, or conduct of any Network Organization." },
          { term: '(b) Accuracy', desc: "Network Organizations are solely responsible for the accuracy of their profile information. Gwags does not independently verify the information provided by Network Organizations and disclaims any liability for inaccuracies, omissions, or misrepresentations in such information." },
          { term: '(c) Addition and Removal', desc: "Gwags reserves the right to add, modify, or remove any listing from the directory at any time, in its sole discretion. A Network Organization may request the modification or removal of its profile by contacting Gwags at contact@gwags.org. Gwags will process such requests within a reasonable timeframe." },
        ] },
        { heading: '13. Third-Party Links and Services', body: [
          "The Site may contain links to websites, platforms, or services operated by third parties (\"Linked Sites\"). Linked Sites are not under the control of Gwags, and Gwags is not responsible for the content, policies, practices, or availability of any Linked Site. The inclusion of a link does not imply endorsement or affiliation. You access Linked Sites at your own risk and subject to the terms and conditions of those sites.",
        ] },
        { heading: '14. Privacy and Cookies', body: [
          { term: '(a) Privacy Policy', desc: "Your use of the Site is also governed by our Privacy Policy, available at gwags.org/privacy. By using the Site, you consent to the collection, use, and processing of your information as described in the Privacy Policy. You are solely responsible for the accuracy of the personal information you provide." },
          { term: '(b) Cookies', desc: "The Site may use cookies and similar tracking technologies for analytics, session management, and functionality purposes. Your preferences regarding cookies are managed as described in the Privacy Policy. By continuing to use the Site without adjusting your cookie settings, you consent to the use of cookies as described therein." },
          { term: '(c) International Data', desc: "If you access the Site from outside the United States or Cameroon, your information may be transferred to, stored, and processed in the United States, Cameroon, or another jurisdiction where Gwags or its service providers operate. By using the Site, you consent to such transfer, storage, and processing." },
        ] },
        { heading: '15. Copyright Complaints', body: [
          "If you believe that content on the Site infringes your copyright, you may notify Gwags in writing at contact@gwags.org with the following information: (a) a description of the copyrighted work you claim has been infringed; (b) a description of the allegedly infringing material and its location on the Site; (c) your contact information; (d) a statement that you have a good faith belief that the use is not authorized by the copyright owner, its agent, or the law; and (e) a statement, made under penalty of perjury, that the information in your notice is accurate and that you are the copyright owner or authorized to act on the copyright owner's behalf.",
          "Gwags will review all properly submitted notices and take appropriate action in accordance with applicable law.",
        ] },
        { heading: '16. Disclaimer of Warranties', body: [
          "TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, THE SITE AND ALL CONTENT, MATERIALS, INFORMATION, AND SERVICES MADE AVAILABLE THROUGH THE SITE ARE PROVIDED ON AN \"AS IS\" AND \"AS AVAILABLE\" BASIS, WITHOUT WARRANTIES OF ANY KIND, WHETHER EXPRESS, IMPLIED, OR STATUTORY. GWAGS EXPRESSLY DISCLAIMS ALL IMPLIED WARRANTIES, INCLUDING BUT NOT LIMITED TO WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE, TITLE, AND NON-INFRINGEMENT.",
          "GWAGS DOES NOT WARRANT THAT THE SITE WILL BE UNINTERRUPTED, ERROR-FREE, SECURE, OR FREE OF VIRUSES OR OTHER HARMFUL COMPONENTS, OR THAT ANY DEFECTS WILL BE CORRECTED. GWAGS MAKES NO REPRESENTATIONS REGARDING THE ACCURACY, COMPLETENESS, RELIABILITY, OR TIMELINESS OF ANY CONTENT OR INFORMATION PROVIDED THROUGH THE SITE.",
          "YOU ACKNOWLEDGE THAT YOUR USE OF THE SITE IS AT YOUR SOLE RISK.",
        ] },
        { heading: '17. Limitation of Liability', body: [
          "TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, GWAGS, ITS OFFICERS, DIRECTORS, EMPLOYEES, AGENTS, AFFILIATES, PARTNERS, AND SERVICE PROVIDERS SHALL NOT BE LIABLE FOR ANY INDIRECT, INCIDENTAL, SPECIAL, CONSEQUENTIAL, OR PUNITIVE DAMAGES, INCLUDING BUT NOT LIMITED TO LOSS OF PROFITS, REVENUE, DATA, GOODWILL, OR BUSINESS OPPORTUNITY, ARISING OUT OF OR IN CONNECTION WITH YOUR USE OF OR INABILITY TO USE THE SITE, ANY CONTENT, ANY SUBMISSIONS, OR ANY SERVICES OBTAINED THROUGH THE SITE, WHETHER BASED ON WARRANTY, CONTRACT, TORT (INCLUDING NEGLIGENCE), STATUTE, OR ANY OTHER LEGAL THEORY, EVEN IF GWAGS HAS BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES.",
          "IN NO EVENT SHALL GWAGS'S TOTAL AGGREGATE LIABILITY TO YOU FOR ALL CLAIMS ARISING OUT OF OR RELATING TO THE SITE OR THESE TERMS EXCEED THE LESSER OF (A) THE AMOUNT YOU PAID TO GWAGS, IF ANY, IN THE TWELVE (12) MONTHS PRECEDING THE EVENT GIVING RISE TO THE CLAIM, OR (B) ONE HUNDRED UNITED STATES DOLLARS (USD $100).",
          "SOME JURISDICTIONS DO NOT ALLOW THE EXCLUSION OR LIMITATION OF CERTAIN DAMAGES. IF THESE LAWS APPLY TO YOU, SOME OR ALL OF THE ABOVE EXCLUSIONS OR LIMITATIONS MAY NOT APPLY, AND YOU MAY HAVE ADDITIONAL RIGHTS.",
        ] },
        { heading: '18. Indemnification', body: [
          "To the maximum extent permitted by applicable law, you agree to defend, indemnify, and hold harmless Gwags and its officers, directors, employees, agents, affiliates, partners, and service providers from and against any and all claims, damages, losses, liabilities, costs, and expenses (including reasonable attorneys' fees) arising out of or relating to: (a) your use of the Site; (b) your Submissions; (c) your violation of these Terms; (d) your violation of any applicable law or regulation; or (e) your violation of any third-party right, including intellectual property, privacy, or proprietary rights.",
          "Gwags reserves the right, at its own expense, to assume the exclusive defense and control of any matter subject to indemnification by you, and you agree to cooperate with our defense of such claims.",
        ] },
        { heading: '19. Termination', body: [
          "Gwags may, in its sole and absolute discretion, suspend, restrict, or terminate your access to the Site at any time, with or without cause and with or without notice. Upon termination, all rights and licenses granted to you under these Terms will immediately cease.",
          "The following sections shall survive termination of these Terms: Sections 7 (Intellectual Property), 9 (User Submissions), 10 (Electronic Communications), 11 (Donations), 16 (Disclaimer of Warranties), 17 (Limitation of Liability), 18 (Indemnification), 19 (Termination), 20 (Dispute Resolution), 21 (Governing Law and Jurisdiction), and 24 (General Provisions).",
        ] },
        { heading: '20. Dispute Resolution', body: [
          "Before initiating any formal legal proceeding arising out of or relating to these Terms or the Site, you and Gwags each agree to first attempt to resolve the dispute through good faith negotiation. The party raising the dispute shall send a written description of the claim, including relevant supporting information and a proposed resolution, to the other party. Notice to Gwags shall be sent to contact@gwags.org. Gwags will notify you at the email address associated with your Account or as otherwise provided by you.",
          "If either party fails to respond to the initial notice within thirty (30) days, or if the dispute remains unresolved after sixty (60) days from receipt of the initial notice, either party may pursue the claim through the applicable legal channels described in Section 21.",
        ] },
        { heading: '21. Governing Law and Jurisdiction', body: [
          { term: '(a) Applicable Law', desc: "These Terms and your use of the Site are governed by and construed in accordance with the laws of the jurisdictions in which Gwags Global Impact Institution is incorporated, specifically: (i) the laws of the State of Washington, United States of America; and (ii) the laws of the Republic of Cameroon, in each case without regard to conflict of law principles." },
          { term: '(b) Exclusive Jurisdiction', desc: "For disputes arising in connection with Gwags's operations or incorporation in the United States, you consent to the exclusive jurisdiction of the state and federal courts located in the State of Washington. For disputes arising in connection with Gwags's operations or incorporation in Cameroon, jurisdiction shall be determined in accordance with applicable Cameroonian law." },
          { term: '(c) Jurisdictional Severability', desc: "If a court in one jurisdiction finds any provision of these Terms to be invalid, illegal, or unenforceable under its laws, such finding shall have no effect on the validity, legality, or enforceability of that provision under the laws of the other jurisdiction in which Gwags is incorporated. Each jurisdiction's interpretation of these Terms operates independently." },
        ] },
        { heading: '22. International Use', body: [
          "Gwags is headquartered with operations in both the United States and Cameroon. The Site and its Content are governed by the laws referenced in Section 21. Gwags makes no representation that the Site or its Content are appropriate or available for use in all locations. If you access the Site from outside the United States or Cameroon, you do so at your own initiative and are solely responsible for compliance with all applicable local laws.",
        ] },
        { heading: '23. Force Majeure', body: [
          "Gwags shall not be liable or responsible for any failure or delay in the performance of its obligations under these Terms where such failure or delay results from circumstances beyond Gwags's reasonable control, including but not limited to: acts of God; natural disasters; flood; fire; earthquake; epidemic or pandemic; war; invasion; hostilities (whether war is declared or not); terrorist threats or acts; riot or other civil unrest; government orders, laws, or actions; embargoes or blockades; national or regional emergencies; strikes or labor disputes; telecommunication or power outages or failures; cyberattacks or data breaches; internet or network infrastructure disruptions; failure of third-party service providers; or any other event that is beyond the reasonable control of the Institution.",
          "During the period of any such event, Gwags's obligations under these Terms shall be suspended to the extent affected, and Gwags shall not be deemed in default or breach of these Terms as a result.",
        ] },
        { heading: '24. General Provisions', body: [
          { term: '(a) Entire Agreement', desc: "These Terms, together with our Privacy Policy and any applicable Additional Terms, constitute the entire agreement between you and Gwags with respect to the Site and supersede all prior or contemporaneous agreements, representations, warranties, and understandings regarding the same." },
          { term: '(b) Severability', desc: "If any provision of these Terms is held by a court of competent jurisdiction to be invalid, illegal, or unenforceable, the remaining provisions shall continue in full force and effect. The invalid, illegal, or unenforceable provision shall be modified to the minimum extent necessary to make it valid, legal, and enforceable while preserving its original intent." },
          { term: '(c) No Waiver', desc: "The failure of Gwags to enforce any right or provision of these Terms shall not constitute a waiver of such right or provision. Any waiver of any provision of these Terms shall be effective only if made in writing and signed by Gwags." },
          { term: '(d) Assignment', desc: "You may not assign, transfer, or delegate these Terms or any rights or obligations hereunder without the prior written consent of Gwags. Gwags may assign these Terms, in whole or in part, at any time without notice to you." },
          { term: '(e) Headings', desc: "Section headings are for convenience only and shall not affect the interpretation of these Terms." },
          { term: '(f) Changes to These Terms', desc: "Gwags reserves the right to modify, amend, or replace these Terms at any time. Changes will be effective upon posting to the Site with an updated \"Last updated\" date. Your continued use of the Site after any such changes constitutes your acceptance of the revised Terms. We encourage you to review these Terms periodically." },
        ] },
        { heading: '25. Contact', body: [
          "For questions regarding these Terms, please contact:",
          "Gwags Global Impact Institution",
          { term: 'Email', desc: 'contact@gwags.org' },
          { term: 'For donation-related inquiries', desc: 'donate@gwags.org' },
          { term: 'For accessibility concerns', desc: 'contact@gwags.org' },
        ] },
      ],
    },
    privacy: {
      title: 'Privacy Policy',
      updated: 'Last updated: September 2026',
      intro: [
        "Gwags Global Impact Institution, a nonprofit institution incorporated in the United States and the Republic of Cameroon, together with its affiliates, programs, and operational entities (\"Gwags,\" \"the Institution,\" \"we,\" \"us,\" or \"our\"), is committed to the lawful, fair, and transparent processing of personal data.",
        "This Privacy Policy (\"Policy\") is intended to help you understand what personal data we collect, why we collect it, when we share it, how we store and protect it, and how to manage communications from us and exercise rights you may have regarding your personal data. This Policy applies to personal data collected through this website and any other websites, portals, forms, surveys, and digital services operated or maintained by Gwags (collectively, \"the Site\").",
        "By accessing or using the Site, you acknowledge that you have read and understood this Policy. If you do not agree with our data practices as described herein, please discontinue use of the Site.",
        "Translations of this Policy are available in French. In the event of any inconsistency between the English and French versions, the English version shall prevail.",
        "We may update this Policy from time to time to reflect changes in our practices and applicable law. If we make a material update, we will post a notice on the Site. We encourage you to review this Policy periodically.",
      ],
      sections: [
        { heading: '1. When This Policy Applies', body: [
          "This Policy applies to personal data we collect through the Site, including through contact forms, partnership inquiry forms, donation processing, network directory features, scholarship-related interactions, event registrations, and any other digital interaction managed by Gwags.",
          "This Policy does not apply to any third-party applications, integrations, or websites that may link to, or be accessible from, the Site. We are not responsible for the content, features, functionality, or privacy practices of any linked third-party site. The data collection and use practices of any linked third-party site will be governed by that third party's own privacy notice and terms of use. We encourage you to read them.",
        ] },
        { heading: '2. Data We Collect About You', body: [
          { term: '(a) Data You Provide Directly', desc: "We collect personal data when you voluntarily provide it to us. This may include:" },
          { list: [
            "your name, email address, phone number, country of residence, and organizational affiliation when you submit a contact form, partnership inquiry, or other communication through the Site;",
            "your name, email address, payment method details, and donation amount when you make a donation through the Site;",
            "any personal data contained in proposals, messages, feedback, documents, or other materials you submit through our forms or portals;",
            "your name, academic information, and any other data you provide when applying to Gwags programs, including the Gwags Scholars Program; and",
            "any other personal data you choose to provide in the course of interacting with the Site.",
          ] },
          "It is always your choice whether to provide personal data. However, some personal data is required to enable certain features of the Site or to participate in certain programs. The decision not to provide such data may limit your ability to use those features or participate in those programs.",
          { term: '(b) Data You Provide About Others', desc: "Do not provide personal data about others unless you are authorized or required to do so by applicable law or contract. If you provide personal data about another person, you represent that you have provided them with a copy of this Policy and obtained their consent where required." },
          { term: '(c) Data We Collect Automatically', desc: "When you visit the Site, we may automatically collect certain technical data, including:" },
          { list: [
            "your Internet Protocol (\"IP\") address, internet service provider (\"ISP\") information, browser type and language, and device type;",
            "data about your interaction with the Site, including referring webpage, pages visited, time spent on pages, and navigation paths; and",
            "data collected through cookies, pixels, and similar technologies as described in Section 5.",
          ] },
          "We may link automatically collected data with data you provide in other contexts on the Site to personalize and improve your experience.",
          { term: '(d) Data We Obtain From Third Parties', desc: "We may obtain personal data about you from other sources, including publicly available sources, service providers, and third parties acting on your behalf or on apparent authority. For example, we may receive your personal data if another person designates you as a contact person for their organization, or if a service provider shares data with us in the course of providing services related to the Site." },
        ] },
        { heading: '3. How We Use Your Data', body: [
          "We may use your personal data to:",
          { list: [
            "respond to your inquiries, messages, and communications submitted through the Site;",
            "process, acknowledge, and issue receipts for donations;",
            "review and respond to partnership inquiries, proposals, and other submissions;",
            "administer Gwags programs, including the Gwags Scholars Program, and evaluate applications;",
            "manage the Network Directory and process network affiliation requests;",
            "send you transactional communications, including donation confirmations, account notifications, and correspondence related to your submissions;",
            "send you institutional communications, including newsletters, program updates, and other information you have consented to receive;",
            "administer, maintain, and improve the Site, including analyzing usage patterns and troubleshooting issues;",
            "protect the rights, safety, and security of Gwags, its users, and the public;",
            "maintain institutional records and archives; and",
            "comply with applicable laws, regulations, court orders, or legal processes.",
          ] },
        ] },
        { heading: '4. Legal Bases for Processing', body: [
          "We collect and use your personal data only where we have a lawful basis for doing so under applicable law. The legal basis depends on the nature of your interaction with us and may include:",
          { list: [
            "your consent (for example, when you subscribe to communications or submit a form);",
            "the performance of a contract or steps taken at your request prior to entering a contract;",
            "compliance with a legal obligation to which Gwags is subject;",
            "our legitimate interests or those of a third party, provided your fundamental rights and freedoms do not override those interests (for example, administering our programs, improving the Site, or protecting our operations); and",
            "the protection of your vital interests or those of another person.",
          ] },
          "Where the legal basis is consent, we will notify you clearly. You may withdraw your consent at any time, without affecting the lawfulness of processing carried out prior to withdrawal.",
        ] },
        { heading: '5. Cookies and Similar Technologies', body: [
          { term: '(a) What Are Cookies', desc: "Cookies are small text files stored on your device when you access a website. We use cookies and similar technologies (including pixels and web beacons) to collect data about your interaction with the Site." },
          { term: '(b) How We Use Cookies', desc: "We may use cookies to:" },
          { list: [
            "enable essential Site functionality, such as session management and security;",
            "remember your preferences and settings;",
            "understand how visitors use the Site, including which pages are visited most frequently;",
            "analyze Site performance and identify areas for improvement; and",
            "support analytics services as described in Section 5(d).",
          ] },
          { term: '(c) Managing Cookies', desc: "You do not need to have cookies enabled to browse the Site, but certain features may not function properly without them. Most browsers allow you to manage or block cookies through browser settings. Please note that disabling cookies may affect your experience on the Site. More information about managing cookies is available at www.aboutcookies.org." },
          { term: '(d) Third-Party Analytics', desc: "We may use third-party analytics services, including Google Analytics, to collect and analyze information about use of the Site. These services use cookies and similar technologies to collect data about Site usage and report trends without identifying individuals to us. You can learn about Google's practices at https://policies.google.com/technologies/partner-sites and opt out of Google Analytics data collection at https://tools.google.com/dlpage/gaoptout." },
        ] },
        { heading: '6. Payment Processing', body: [
          "Donations made through the Site are processed by Stripe, Inc. (\"Stripe\"), a third-party payment processor. When you make a donation, Stripe collects and processes your payment information (including card details) directly. Gwags does not receive, access, or store your full payment card information.",
          "If you establish a recurring donation, Stripe retains your payment information as necessary to process future charges until you cancel. Cancellation of a recurring donation through Gwags does not automatically result in the deletion of your payment data by Stripe. Please refer to Stripe's privacy policy for information about how to request deletion of your payment data directly from Stripe.",
          "Stripe's collection and use of your payment data is governed by Stripe's own privacy policy and terms of service. We encourage you to review them. Gwags receives only the information necessary to confirm and acknowledge your donation, such as your name, email address, donation amount, and transaction confirmation.",
        ] },
        { heading: '7. When We Share Your Data', body: [
          { term: '(a) Service Providers', desc: "We may share your personal data with service providers who assist us in operating the Site and fulfilling our institutional functions, including payment processing (Stripe), email services, hosting providers, and analytics providers. Our service providers are authorized to use your personal data only as necessary to provide services to Gwags, solely for the purposes for which it was shared with them, and are contractually required to protect your data in accordance with applicable law." },
          { term: '(b) Institutional Personnel', desc: "We may share your personal data with Gwags officers, directors, employees, and authorized volunteers who have a legitimate need to access the data in connection with their institutional responsibilities." },
          { term: '(c) Network Organizations and Partners', desc: "If you submit information in connection with a network affiliation request or partnership inquiry, we may share relevant data with Gwags leadership and, where applicable, with the organizations involved in the proposed affiliation or partnership, solely for the purpose of evaluating and administering the request." },
          { term: '(d) Legal Requirements', desc: "We may disclose your personal data where required to do so by applicable law, court order, subpoena, or legal process, or where we believe in good faith that disclosure is necessary to protect our rights, your safety, or the safety of others, investigate fraud, or respond to a government request." },
          { term: '(e) No Sale of Data', desc: "Gwags does not sell, rent, lease, or trade your personal data to any third party for marketing or commercial purposes." },
        ] },
        { heading: '8. International Data Transfers', body: [
          "Gwags operates in both the United States and the Republic of Cameroon. Your personal data may be transferred to, stored, and processed in the United States, Cameroon, or any other country where Gwags or its service providers maintain facilities.",
          "Data protection in the United States is governed by applicable federal and state laws. Data protection in Cameroon is governed by Law No. 2010/012 of 21 December 2010 on cybersecurity and electronic commerce, and related regulations. Gwags complies with applicable data protection requirements in both jurisdictions.",
          "If you access the Site from outside these jurisdictions, you consent to the transfer, storage, and processing of your data in jurisdictions that may have different data protection standards than your jurisdiction of residence. Where required by applicable law, we will ensure that appropriate safeguards are in place to protect your personal data in connection with any such transfer, including the use of standard contractual clauses or other legally recognized mechanisms.",
        ] },
        { heading: '9. Data Storage and Retention', body: [
          { term: '(a) Retention Period', desc: "We retain your personal data only for as long as reasonably necessary to fulfill the purposes for which it was collected, as described in this Policy, or as otherwise required or permitted by applicable law. Specific retention periods vary by data category and are determined based on the nature of the data, the sensitivity of the information, the purposes of processing, and applicable legal requirements." },
          { term: '(b) Donation Records', desc: "Records relating to donations, including donor identity, donation amount, date, and designation, are retained for as long as required by applicable tax, financial reporting, and nonprofit governance laws in the jurisdictions in which Gwags is incorporated." },
          { term: '(c) Submissions', desc: "Data provided through contact forms, partnership inquiries, and other submissions is retained for as long as necessary to respond to and administer your inquiry, and thereafter as needed for institutional record-keeping or as required by law." },
          { term: '(d) Deletion', desc: "After the applicable retention period, we will delete or anonymize your personal data. If deletion is not immediately possible (for example, because data is stored in backup archives), we will securely isolate it from further processing until deletion is feasible." },
        ] },
        { heading: '10. Data Security', body: [
          "We maintain appropriate technical and organizational measures to protect your personal data against unauthorized access, disclosure, alteration, destruction, or loss. These measures include access controls, encryption where appropriate, and regular security assessments.",
          "We limit access to personal data to authorized personnel who require it in connection with their institutional responsibilities and who are bound by confidentiality obligations.",
          "We require our service providers to maintain data privacy and security standards at least equivalent to our own.",
          "However, no method of transmission over the internet or method of electronic storage is completely secure. While we strive to protect your personal data, we cannot guarantee its absolute security. Any transmission of data to the Site is at your own risk.",
        ] },
        { heading: '11. Data Breach Notification', body: [
          "In the event of a personal data breach that is likely to result in a risk to your rights and freedoms, Gwags will notify affected individuals and relevant data protection authorities in accordance with applicable law and within the timeframes required by such law. Notification will include, to the extent known at the time, the nature of the breach, the categories of data affected, the likely consequences, and the measures taken or proposed to address the breach and mitigate its effects.",
        ] },
        { heading: '12. Minors', body: [
          "The Site is not directed at individuals under the age of 13 (or the equivalent minimum age in your jurisdiction). In compliance with the Children's Online Privacy Protection Act (COPPA) and equivalent protections under applicable law, Gwags does not knowingly collect personal data from minors through the Site.",
          "Certain Gwags programs, including the Gwags Scholars Program, may involve individuals under 18. In such cases, the collection and processing of personal data from individuals under 18 will be conducted with the consent of a parent or legal guardian, as described in our Terms of Use.",
          "If you become aware that personal data has been collected from a minor without appropriate consent, please contact us at contact@gwags.org. We will take reasonable steps to delete such data promptly.",
        ] },
        { heading: '13. Your Rights', body: [
          "Depending on your jurisdiction and applicable law, you may have the right to:",
          { list: [
            "obtain confirmation of whether we hold personal data about you;",
            "access your personal data and receive a copy of it;",
            "correct or update inaccurate or incomplete personal data;",
            "request deletion of your personal data, subject to legal retention requirements;",
            "withdraw any consent you have previously provided;",
            "object to or restrict certain processing of your personal data;",
            "request portability of your personal data (i.e., receive it in a structured, commonly used, machine-readable format); and",
            "lodge a complaint with the applicable data protection authority in your jurisdiction.",
          ] },
          "To exercise any of these rights, please contact our designated Data Privacy Contact at contact@gwags.org. We will acknowledge your request within five (5) business days and provide a substantive response within thirty (30) days, or inform you if an extension is necessary. We may ask you to verify your identity before processing your request.",
          "Please note that certain rights may be limited where we have an overriding legitimate interest, a legal obligation to retain data, or where exemptions apply under applicable law.",
        ] },
        { heading: '14. Sensitive Personal Data', body: [
          "We will not intentionally collect sensitive personal data (such as data revealing racial or ethnic origin, political opinions, religious or philosophical beliefs, trade union membership, genetic data, biometric data, health data, or data concerning sex life or sexual orientation) without your explicit consent for one or more specified purposes, unless otherwise permitted or required by applicable law.",
        ] },
        { heading: '15. Email Communications and Opt-Out', body: [
          { term: '(a) Transactional Communications', desc: "When you make a donation, submit a form, or interact with certain features of the Site, we may send you transactional communications, including donation receipts, confirmations, and correspondence directly related to your interaction. These communications are necessary for the administration of your request and cannot be opted out of." },
          { term: '(b) Institutional Communications', desc: "With your consent, we may send you newsletters, program updates, and other institutional communications. You may opt out of these communications at any time by following the unsubscribe instructions included in such communications or by contacting us at contact@gwags.org." },
          { term: '(c) Administrative Communications', desc: "We reserve the right to send you administrative communications relating to the Site, your Account, or changes to our policies, as permitted by applicable law. These communications are not promotional in nature and cannot be opted out of." },
        ] },
        { heading: '16. Do-Not-Track Signals', body: [
          "The Site does not currently respond to Do Not Track signals, as there is no universally accepted standard for such responses. However, you may manage your cookie preferences as described in Section 5(c) and opt out of third-party analytics as described in Section 5(d). As industry standards develop, we will revisit this practice and update this Policy if our approach changes.",
        ] },
        { heading: '17. Multilingual Content', body: [
          "This Policy is available in English and French. Translations are provided for the convenience of users. In the event of any inconsistency between the English and French versions of this Policy, the English version shall prevail and be treated as authoritative.",
        ] },
        { heading: '18. Changes to This Policy', body: [
          "Gwags reserves the right to modify, amend, or replace this Policy at any time. Changes will be effective upon posting to the Site with an updated \"Last updated\" date. If we make a material change, we will post a prominent notice on the Site. Your continued use of the Site after any such changes constitutes your acceptance of the revised Policy.",
        ] },
        { heading: '19. Contact', body: [
          "For questions, concerns, or requests relating to this Policy or your personal data, please contact our designated Data Privacy Contact:",
          "Gwags Global Impact Institution",
          { term: 'Email', desc: 'contact@gwags.org' },
          { term: 'For donation-related privacy inquiries', desc: 'donate@gwags.org' },
        ] },
      ],
    },
  },
  fr: {
    nav: {
      subtitle: 'INSTITUTION D\'IMPACT GLOBAL',
      about: 'À propos de nous',
      initiatives: 'Nos Actions',
      network: 'Réseau',
      getInvolved: 'S\'engager',
      contact: 'Contact',
      dropdowns: {
        about: {
          heading: 'À propos de nous',
          subHeading: "À propos de Gwags Institution d'Impact Global",
          description: 'En savoir plus sur nos origines, notre mission, notre fonctionnement et les personnes qui font Gwags.',
          links: [
            { label: 'Notre histoire', href: '/about/our-story' },
            { label: 'Comment nous travaillons', href: '/about/how-we-work' },
            { label: 'Notre rôle', href: '/about/our-role' },
            { label: 'Gouvernance', href: '/about/leadership' },
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
            { label: 'Soutien aux Orphelins Ajong Foretia', href: '/initiatives/ajong-foretia' },
          ],
        },
      },
    },
    hero: {
      eyebrow: 'INSTITUTION D\'IMPACT GLOBAL',
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
      s3n: '1',  s3l: 'RÉSEAU GLOBAL',
    },
    whatWeAre: {
      eyebrow: 'QUI NOUS SOMMES',
      h2: 'Une institution globale construite pour structurer et accélérer l\'impact.',
      p1: 'Gwags opère comme une plateforme institutionnelle globale, rassemblant des organisations alignées sur des standards communs et un engagement partagé envers un impact dans les secteurs qui façonnent le développement des sociétés.',
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
        { title: 'Programme Gwags Scholars', desc: 'Offrir un financement éducatif et des opportunités de développement professionnel aux étudiants camerounais exceptionnels.', tag: 'EXCELLENCE' },
        { title: 'Fonds Mbal Lekeaka', desc: 'Un programme de bourses canalisant des ressources directement vers des initiatives communautaires à impact mesurable.', tag: 'COMMUNAUTÉ' },
        { title: 'Programme de Santé Communautaire', desc: 'Apporter des soins de santé gratuits et l\'éducation médicale aux communautés mal desservies.', tag: 'SANTÉ' },
        { title: 'Soutien aux Orphelins Ajong Foretia', desc: 'Soutenir les enfants orphelins à travers la fourniture de fournitures de vie essentielles et des opportunités éducatives.', tag: 'JEUNESSE' },
      ],
    },
    whyGwags: {
      eyebrow: 'POURQUOI GWAGS',
      h2: 'Ce que signifie faire partie de cette institution.',
      body: 'Les organisations affiliées à Gwags gagnent en visibilité, en poids institutionnel, en accès à un réseau global et en soutien structurel nécessaire pour croître avec crédibilité et purpose.',
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
      role: 'Président du Conseil d\'administration',
      roleOrg: "Gwags Institution d'Impact Global",
    },
    ourStory: {
      eyebrow: 'NOTRE HISTOIRE',
      h2: 'D\'une initiative étudiante à une institution globale.',
      items: [
        { era: 'LE DÉBUT', title: 'Né d\'une conviction', desc: 'Gwags a débuté comme une initiative étudiante pour soutenir les jeunes orphelins et défavorisés au Cameroun.' },
        { era: 'L\'ÉVOLUTION', title: 'Faire grandir la mission', desc: 'À mesure que les défis devenaient plus clairs, la réponse aussi. Gwags a élargi sa portée et formalisé sa structure à l\'international.' },
        { era: 'MAINTENANT ET AU-DELÀ', title: 'Une institution globale', desc: 'Gwags est aujourd\'hui une institution à vocation globale, active dans plusieurs pays et secteurs.' },
      ],
    },
    moreAbout: {
      heading: 'PLUS SUR L\'INSTITUTION',
      h2: 'Découvrez ce qu\'est Gwags.',
      cards: [
        {
          title: 'Notre histoire',
          desc: 'Découvrez les origines de Gwags et le parcours d\'une initiative étudiante à une institution d\'impact globale.',
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
      eyebrow: 'S\'ENGAGER',
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
        heading: 'S\'ENGAGER',
        desc: 'Il y a une place pour vous. Gwags travaille avec des organisations et des bailleurs de fonds engagés à construire quelque chose qui dure. Que ce soit par l\'affiliation, le partenariat ou le financement, il y a un chemin pour vous.',
      },
      partner: {
        eyebrow: 'Devenir partenaire',
        text: 'Nous nous associons avec des organisations engagées envers un impact structuré et durable. Le partenariat signifie des ressources partagées et un alignement vers des objectifs communs.',
        cta: 'Exprimer son intérêt',
      },
      support: {
        eyebrow: 'Soutenir notre travail',
        text: 'Investir dans ce qui dure. Chaque contribution soutient les programmes que nous gérons et l\'infrastructure institutionnelle que nous construisons.',
        donate: 'Faire un don',
      },
      contact: {
        eyebrow: 'Nous contacter',
        text: 'Pour les demandes générales, les demandes médias ou toute autre question, contactez-nous directement.',
        cta: 'Nous écrire',
      },
      follow: {
        eyebrow: 'Nous suivre',
        text: 'Restez informés de notre travail et de nos développements institutionnels à travers nos canaux numériques.',
      },
    },
    contactPage: {
      heading: 'Nous Écrire',
      subheading: 'Nous accueillons vos questions, commentaires et demandes.',
      notice: 'Veuillez noter : nous ne sommes en mesure d\'examiner que les demandes soumises en anglais et en français.',
      labels: {
        firstName: 'Prénom',
        lastName: 'Nom de famille',
        email: 'Email',
        phone: 'Téléphone',
        country: 'Pays',
        city: 'Ville',
        message: 'Message',
      },
      phonePlaceholder: 'Optionnel',
      messagePlaceholder: 'Votre message...',
      charLimit: 'Limite de 500 caractères',
      submit: 'Soumettre',
      success: 'Merci. Votre message a été envoyé.',
      error: 'Une erreur s\'est produite. Veuillez réessayer.',
    },
    partnerPage: {
      heading: 'Devenir Partenaire de Gwags',
      subheading: 'Parlez-nous de votre organisation et de la façon dont vous nous voyez travailler ensemble.',
      labels: {
        contactName: 'Nom du contact',
        orgName: 'Nom de l\'organisation',
        orgEmail: 'Email de l\'organisation',
        orgPhone: 'Téléphone de l\'organisation',
        website: 'Site web',
        country: 'Pays',
        city: 'Ville',
        sector: 'Secteur',
        orgDesc: 'Brève description de votre organisation',
        message: 'Décrivez ce que vous souhaitez accomplir ensemble',
      },
      phonePlaceholder: 'Optionnel',
      orgDescPlaceholder: 'Brève description...',
      messagePlaceholder: 'Que souhaitez-vous accomplir ensemble?',
      submit: 'Soumettre',
      success: 'Merci. Votre soumission a été reçue.',
      error: 'Une erreur s\'est produite. Veuillez réessayer.',
    },
    donationOverlay: {
      giveOnce: 'Don unique',
      monthly: 'Mensuel',
      otherAmount: 'Autre montant',
      donate: 'Faire un don',
      donateMonthly: 'Don mensuel',
      manageText: 'Gérer votre don',
      sideText: 'Chaque contribution compte. Lorsque vous donnez, vous contribuez directement à des programmes qui produisent des résultats et à un réseau conçu pour rendre l\'impact durable. Pour des dons personnalisés, contactez-nous à ',
      manageDescription: 'Saisissez l\'adresse email que vous avez utilisée pour donner, et nous vous redirigerons vers votre espace Stripe sécurisé pour gérer ou annuler votre don récurrent.',
      manageEmailLabel: 'Email',
      manageSubmit: 'Accéder à mon espace de gestion',
      manageEmailInvalid: 'Veuillez saisir une adresse email valide.',
      manageNotFound: 'Nous n\'avons trouvé aucun don actif associé à cette adresse email.',
      genericError: 'Une erreur s\'est produite. Veuillez réessayer.',
      amountTooLowError: 'Le montant du don doit être d\'au moins 0,50 $.',
      paymentStartError: 'Impossible de démarrer le paiement. Veuillez réessayer.',
      cardNotReadyError: 'Le formulaire de paiement n\'est pas prêt. Veuillez actualiser la page et réessayer.',
      cardChargeError: 'Votre carte n\'a pas pu être débitée. Veuillez vérifier vos informations et réessayer.',
      walletPaymentError: 'Votre paiement n\'a pas pu être finalisé. Veuillez réessayer.',
      thankYouOnce: 'Merci pour votre don.',
      thankYouMonthly: 'Merci pour votre don mensuel. Votre premier paiement a été traité, et vous serez débité automatiquement chaque mois. Vous pouvez gérer ou annuler votre don récurrent à tout moment.',
    },
    donationFaq: {
      secure: {
        q: 'Mon don est-il sécurisé ?',
        a: "Oui, nous utilisons la technologie SSL, une norme du secteur, pour protéger vos informations. Nous travaillons avec Stripe, le processeur de paiement de référence auquel font confiance certaines des plus grandes entreprises du monde. Vos informations financières sensibles ne transitent jamais par nos serveurs. Nous envoyons toutes les données directement aux serveurs conformes PCI de Stripe via SSL.",
      },
      receipt: {
        q: 'Vais-je recevoir un reçu ?',
        a: 'Nous vous enverrons un reçu de don par e-mail. Veuillez le conserver pour vos archives.',
      },
      cancel: {
        q: 'Puis-je annuler mon don récurrent ?',
        a: "Vous pouvez gérer ou annuler votre don récurrent à tout moment à l'aide du lien dans votre email de confirmation de don. Si vous ne le trouvez pas, contactez-nous à ",
      },
      report: {
        q: 'Signaler un problème',
        placeholder: 'Décrivez le problème rencontré...',
        confirm: 'Je confirme qu\'aucune donnée personnelle ou de paiement n\'est incluse',
        submit: 'Signaler',
        cancel: 'Annuler',
        sent: 'Merci. Votre signalement a été envoyé.',
        textRequired: 'Veuillez décrire le problème.',
        confirmRequired: 'Veuillez confirmer qu\'aucune donnée personnelle ou de paiement n\'est incluse.',
      },
    },
    cta: {
      h2: 'Prêt à construire quelque chose qui dure?',
      body: 'Gwags construit une infrastructure internationale pour l\'impact. Contactez-nous pour explorer comment nous pouvons travailler ensemble vers une vision partagée de l\'impact.',
      btn1: 'Devenir partenaire',
      btn2: 'Rejoindre le réseau',
    },
    footer: {
      tagline: 'Un réseau global. Une vision commune. Un impact durable.',
      col1: { heading: 'INSTITUTION', links: [
        { label: 'Notre histoire', href: '/about/our-story' },
        { label: 'Comment nous travaillons', href: '/about/how-we-work' },
        { label: 'Notre rôle', href: '/about/our-role' },
      ]},
      col2: { heading: 'S\'ENGAGER', links: [
        { label: 'Soutenir notre travail', href: '/get-involved?action=donate' },
        { label: 'Nous contacter', href: '/contact' },
        { label: 'Devenir partenaire', href: '/partner' },
      ]},
      copy: "2026 Gwags Institution d'Impact Global",
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
          { title: 'Programme Gwags Scholars', desc: 'Offrir un financement éducatif et des opportunités de développement professionnel aux étudiants camerounais exceptionnels.', tag: 'EXCELLENCE', href: '/initiatives/scholars' },
          { title: 'Fonds Mbal Lekeaka', desc: 'Un programme de bourses canalisant des ressources directement vers des initiatives communautaires à impact mesurable.', tag: 'COMMUNAUTÉ', href: '/initiatives/mbal-lekeaka-fund' },
          { title: 'Programme de Santé Communautaire', desc: "Apporter des soins de santé gratuits et l'éducation médicale aux communautés mal desservies.", tag: 'SANTÉ', href: '/initiatives/health-outreach' },
          { title: 'Soutien aux Orphelins Ajong Foretia', desc: 'Soutenir les enfants orphelins à travers la fourniture de fournitures de vie essentielles et des opportunités éducatives.', tag: 'JEUNESSE', href: '/initiatives/ajong-foretia' },
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
        h2: 'Souhaitez-vous travailler avec nous ?',
        body: "Découvrez comment votre organisation peut s'engager avec Gwags à travers l'affiliation ou le partenariat.",
        btn1: 'Devenir partenaire',
        btn2: 'Rejoindre le réseau',
      },
    },
    ourStoryPage: {
      hero: {
        eyebrow: 'NOTRE HISTOIRE',
        h1: 'Comment tout a commencé.',
      },
      photoBanner: '/images/ajong-foretia/coeur-de-jesus/DSC_1208.JPG',
      narrative: [
        "En décembre 2021, quatre lycéens à Douala, au Cameroun, devaient réaliser un projet de service communautaire dans le cadre de leur programme scolaire. Pour répondre à cette exigence, ils ont organisé une visite à l'orphelinat Coeur de Jésus, où ils ont passé du temps avec les enfants, fourni des fournitures essentielles et constaté de première main les conditions que ces enfants affrontaient au quotidien.",
        "L'expérience a laissé une impression durable. Ils ont rencontré des enfants disposant de ressources limitées et de peu d'opportunités, mais dotés d'un potentiel indéniable. Les lacunes étaient évidentes, mais la possibilité de ce qu'un soutien constant et structuré pourrait débloquer au fil du temps l'était tout autant. L'équipe a par la suite organisé davantage de visites dans des orphelinats.",
        "Les fondateurs ont réfléchi aux défis plus profonds dont ils avaient été témoins. Les obstacles auxquels faisaient face les enfants et les jeunes à travers le Cameroun n'étaient pas isolés. Ils étaient systémiques. Les lacunes éducatives, les pénuries de soins de santé, l'accès limité à la technologie et la faiblesse du soutien institutionnel alimentaient tous le même cycle. Cette prise de conscience a poussé l'équipe à cesser de raisonner en termes de projets individuels et à commencer à construire sur le long terme.",
        "Ce qui a suivi fut une série d'étapes décisives. L'équipe a incorporé la Fondation Gwags en tant qu'organisation à but non lucratif aux États-Unis et au Cameroun, établissant les bases juridiques et institutionnelles nécessaires à des opérations durables. De nouvelles initiatives ont été lancées dans les domaines de l'éducation, du développement communautaire, de la santé et de l'autonomisation des jeunes. Ce qui avait commencé comme des visites dans un orphelinat devenait une organisation multisectorielle avec un portefeuille croissant de programmes et de partenariats.",
        "Mais plus l'équipe construisait, plus une évidence s'imposait. Gérer des programmes ne suffisait pas. Le véritable défi n'était pas seulement de produire de l'impact, mais de le structurer. À travers le monde, d'innombrables organisations font un travail significatif tout en luttant contre les mêmes obstacles. Un financement limité, une gouvernance faible, aucun accès aux réseaux et aucune structure institutionnelle pour les aider à grandir.",
        "Cette prise de conscience a marqué un tournant décisif dans le parcours de Gwags. La mission ne concernait plus uniquement ce que Gwags pouvait faire directement. Il s'agissait de construire l'infrastructure qui permettrait aux organisations de faire davantage. Une institution capable de coordonner, soutenir et renforcer les organisations qui s'efforcent de créer de l'impact. Une plateforme où la crédibilité, la structure et la portée internationale pourraient être partagées, et non monopolisées.",
        "Aujourd'hui, Gwags a formellement opéré sa transition d'une fondation vers une Institution d'Impact Global. Elle opère à travers de multiples secteurs, construisant un écosystème conçu pour accélérer l'impact à grande échelle. Les programmes continuent de croître. Le réseau d'organisations continue de s'étendre. Et l'infrastructure qui permettra aux organisations de transformer leurs sociétés se construit, étape par étape, depuis la base.",
      ],
      timeline: {
        eyebrow: 'LA CHRONOLOGIE',
        h2: 'Les étapes qui ont façonné Gwags.',
        entries: [
          {
            year: '2021', month: 'DÉCEMBRE',
            title: "Première visite à l'orphelinat",
            body: "Quatre lycéens à Douala, au Cameroun, devaient réaliser un projet de service communautaire dans le cadre de leur programme scolaire. Ils ont organisé une visite à l'orphelinat Coeur de Jésus, où ils ont passé du temps avec les enfants, fourni des fournitures essentielles et constaté de première main les réalités auxquelles ces enfants faisaient face au quotidien.",
            photo: '/images/ajong-foretia/coeur-de-jesus/DSC_1171.JPG',
          },
          {
            year: '2022', month: 'DÉCEMBRE',
            title: 'Partenariat avec Codam Technologies',
            body: "L'équipe a organisé une deuxième visite à l'orphelinat Ami de Jésus, cette fois en partenariat avec une organisation camerounaise appelée Codam Technologies pour offrir aux enfants une exposition pratique à la technologie. Les enfants ont été initiés à l'impression 3D, à l'initiation au codage et aux outils numériques pour la première fois.",
            photo: '/images/ajong-foretia/codam-tech/654202991_18087992795267535_1459227050299309829_n.jpg',
          },
          {
            year: '2025', month: 'MAI',
            title: 'Création et Incorporation de la Fondation Gwags',
            body: "Gwags a formalisé sa structure en créant et en incorporant la Fondation Gwags en tant qu'organisation à but non lucratif aux États-Unis et au Cameroun, établissant les bases juridiques et institutionnelles pour des opérations internationales durables.",
            photo: '',
          },
          {
            year: '2026', month: 'JANVIER',
            title: 'Lancement du Programme Gwags Scholars',
            body: "Gwags a lancé le Programme Gwags Scholars, une initiative conçue pour soutenir les étudiants universitaires exceptionnels à travers le Cameroun. Le programme offre un soutien financier et des opportunités de développement professionnel, investissant dans la prochaine génération de leaders camerounais.",
            photo: '/images/scholars/program-cover.jpg',
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
            body: "En partenariat avec plusieurs organisations, dont le Ministère de la Santé Publique du Cameroun et la Cameroon English Speaking Medical Students' Association (CAMESA), Gwags a soutenu une campagne de sensibilisation sanitaire d'une semaine dans le district de santé de Nguti, situé dans la région du Sud-Ouest du Cameroun. La campagne a déployé 120 personnels médicaux pour fournir des consultations gratuites, des chirurgies, des dépistages et une éducation sanitaire à plus de 1 500 personnes à travers le district.",
            photo: '/images/health-outreach/nguti-health-campaign/2T8A1064.jpg',
          },
          {
            year: '2026', month: 'SEPTEMBRE',
            title: "Transition vers Institution d'Impact Global",
            body: "Gwags a formellement évolué au-delà du modèle de fondation, se repositionnant en tant qu'Institution d'Impact Global dédiée à la structuration, la coordination et l'accélération des initiatives engagées dans la transformation durable des sociétés à grande échelle.",
            photo: '/images/general/WhatsApp_Image_2026-06-23_at_10_07_06.jpeg',
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
        btn: "S'engager",
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
          main: "Accélérer et amplifier l'impact global en construisant l'infrastructure institutionnelle dont ont besoin les organisations engagées à relever les défis sociétaux.",
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
        btn1: 'Devenir partenaire',
        btn2: 'Rejoindre le réseau',
      },
    },
    scholarsPage: {
      hero: {
        name: 'Programme Gwags Scholars',
        goal: 'Identifier et investir dans les étudiants camerounais exceptionnels en finançant leurs études et en offrant des opportunités de développement professionnel qui les préparent à la transition vers le monde du travail.',
        image: '/images/scholars/program-cover.jpg',
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
          { label: 'Promotion 2026', href: '/initiatives/scholars/2026', imagePosition: 'top', cardVariant: 'scholars', items: [
            '/images/scholars/scholar-01.jpg',
            '/images/scholars/scholar-02.jpg',
            '/images/scholars/scholar-03.jpg',
            '/images/scholars/scholar-04.jpg',
            '/images/scholars/scholar-05.jpg',
            '/images/scholars/scholar-06.jpg',
            '/images/scholars/scholar-07.jpg',
            '/images/scholars/scholar-08.jpg',
            '/images/scholars/scholar-09.jpg',
            '/images/scholars/scholar-10.jpg',
          ] },
        ],
      },
    },
    scholarsBatches: {
      '2026': {
        title: 'Les Boursiers Gwags',
        batchLabel: 'Promotion 2026',
        universityLabel: 'Université',
        programLabel: 'Programme',
        scholars: [
          { name: 'Chia Rozel', program: 'Pharmacie', university: 'Université de Bamenda', image: '/images/scholars/scholar-01.jpg' },
          { name: 'Jores Junior Tapa', program: 'Génie civil', university: 'Université de Yaoundé', image: '/images/scholars/scholar-02.jpg' },
          { name: 'Asonganyi Yufanyi', program: 'Sciences infirmières', university: 'Université de Buea', image: '/images/scholars/scholar-03.jpg' },
          { name: 'Glorya Odrey Nguessop', program: 'Gestion et Finance', university: 'Prepa Saint Jean', image: '/images/scholars/scholar-04.jpg' },
          { name: 'Nchia Dze Desmond', program: 'Médecine', university: 'Université de Buea', image: '/images/scholars/scholar-05.jpg' },
          { name: 'Ines Patricia Kouna', program: 'Mathématiques, Statistiques et Informatique', university: 'Université de Bertoua', image: '/images/scholars/scholar-06.jpg' },
          { name: 'Fon Precious Fri', program: 'Sciences économiques', university: 'Université de Yaoundé 2', image: '/images/scholars/scholar-07.jpg' },
          { name: 'Madeleine Tchanchou Wandji', program: 'Géographie', university: 'Université de Douala', image: '/images/scholars/scholar-08.jpg' },
          { name: 'Emily Success Azem', program: 'Pharmacie', university: 'Université de Buea', image: '/images/scholars/scholar-09.jpg' },
          { name: 'Ngwa Harriette Bih', program: 'Soins infirmiers', university: 'Université de Bamenda', image: '/images/scholars/scholar-10.jpg' },
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
          { label: 'Campagne de Santé CAMESA Nguti', href: '/initiatives/mbal-lekeaka-fund/camesa-nguti-health-campaign', items: [
            '/images/health-outreach/nguti-health-campaign/2T8A0635.jpg',
            '/images/health-outreach/nguti-health-campaign/2T8A1023.jpg',
            '/images/health-outreach/nguti-health-campaign/2T8A0447.jpg',
            '/images/health-outreach/nguti-health-campaign/2T8A1061.jpg',
            '/images/health-outreach/nguti-health-campaign/2T8A0574.jpg',
          ] },
        ],
      },
    },
    ajongForetiasPage: {
      hero: {
        name: 'Soutien aux Orphelins Ajong Foretia',
        goal: 'Fournir un soutien durable aux enfants orphelins à travers des initiatives qui offrent des fournitures de vie essentielles, des opportunités éducatives et une formation pratique en compétences.',
        image: '/images/ajong-foretia/coeur-de-jesus/DSC_1171.JPG',
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
          { value: '5 000 $+', label: 'en soutien caritatif' },
        ],
      },
      carousel: {
        heading: 'Visites Passées',
        events: [
          { label: 'Atelier Tech avec Codam Technologies', href: '/initiatives/ajong-foretia/tech-workshop-codam-technologies', items: [
            '/images/ajong-foretia/codam-tech/270a2a81-3939-4aa8-920a-6cac15dc79cc-2.jpg',
            '/images/ajong-foretia/codam-tech/654179078_18124924684505595_2190489630294524424_n.jpg',
            '/images/ajong-foretia/codam-tech/dab967bf-fac1-4c5a-8ee1-49590e269e10.jpg',
            '/images/ajong-foretia/codam-tech/IMG_4410.jpg',
            '/images/ajong-foretia/codam-tech/651489550_18037183757564745_7380016685533927990_n.jpg',
          ] },
          { label: "Visite à l'Orphelinat Coeur de Jésus", href: '/initiatives/ajong-foretia/visit-coeur-de-jesus-orphanage', items: [
            '/images/ajong-foretia/coeur-de-jesus/DSC_1164.JPG',
            '/images/ajong-foretia/coeur-de-jesus/DSC_1211.JPG',
            '/images/ajong-foretia/coeur-de-jesus/DSC_1215.JPG',
            '/images/ajong-foretia/coeur-de-jesus/DSC_1217.JPG',
            '/images/ajong-foretia/coeur-de-jesus/DSC_1161.JPG',
          ] },
        ],
      },
    },
    healthOutreachPage: {
      hero: {
        name: 'Programme de Santé Communautaire',
        goal: 'Apporter des services de santé gratuits et une éducation médicale aux communautés mal desservies à travers des campagnes de terrain structurées.',
        image: '/images/health-outreach/nguti-health-campaign/2T8A0659.jpg',
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
          { value: '1 700+', label: 'bénéficiaires atteints' },
          { value: '120+', label: 'professionnels de santé déployés' },
          { value: '1', label: 'campagne menée' },
        ],
      },
      carousel: {
        heading: 'Campagnes Passées',
        events: [
          { label: 'Campagne de Santé de Nguti', href: '/initiatives/health-outreach/nguti-health-campaign', items: [
            '/images/health-outreach/nguti-health-campaign/2T8A1061.jpg',
            '/images/health-outreach/nguti-health-campaign/2T8A0574.jpg',
            '/images/health-outreach/nguti-health-campaign/2T8A1023.jpg',
            '/images/health-outreach/nguti-health-campaign/2T8A0635.jpg',
            '/images/health-outreach/nguti-health-campaign/2T8A0447.jpg',
          ] },
        ],
      },
    },
    network: {
      heading: 'Notre Réseau',
      description: "Un écosystème croissant d'organisations alignées par des standards partagés et une ambition commune de créer un impact durable. Les organisations au sein du réseau Gwags opèrent dans différents secteurs, chacune contribuant à une mission plus large d'impact structuré et durable.",
      searchPlaceholder: 'Rechercher des organisations',
      searchButton: 'Rechercher',
      noResults: 'Aucun résultat trouvé.',
      cta: {
        text: 'Envie de rejoindre le réseau ?',
        subtext: "Si votre organisation partage notre engagement envers un impact structuré et durable, nous aimerions échanger avec vous. Parlez-nous de votre travail et de son lien avec le réseau Gwags.",
        link: "Manifester son intérêt",
      },
      detail: {
        aboutHeading: 'À propos',
        aboutText: "[Espace réservé à la description de l'organisation. Cette section contiendra un aperçu détaillé de l'organisation, de sa mission et du travail qu'elle accomplit au sein du réseau Gwags.]",
        detailsHeading: 'Détails',
        sectorLabel: 'Secteur',
        countryLabel: 'Pays',
        yearLabel: "Année d'affiliation",
        initiativesLabel: 'Initiatives actives',
        connectHeading: 'Se connecter',
        websiteLabel: 'Visiter le site',
        placeholder: '[Espace réservé]',
        notFound: 'Organisation introuvable.',
        back: 'Retour au Réseau',
      },
    },
    terms: {
      title: "Conditions d'utilisation",
      updated: 'Dernière mise à jour : septembre 2026',
      intro: [
        "Les présentes conditions d'utilisation (les « Conditions ») constituent un accord juridiquement contraignant entre vous (l'« utilisateur », « vous ») et Gwags Institution d'Impact Global, institution à but non lucratif constituée aux États-Unis et en République du Cameroun, ainsi que ses filiales, programmes et entités opérationnelles (collectivement, « Gwags », « l'Institution », « nous », « notre », « nos »). Les présentes Conditions régissent votre accès à ce site web et son utilisation, y compris l'ensemble des pages, fonctionnalités, applications, formulaires, portails et services numériques associés, exploités ou maintenus par Gwags (collectivement, le « Site »).",
        "En accédant au Site ou en l'utilisant, vous reconnaissez avoir lu et compris les présentes Conditions et acceptez d'y être lié, telles qu'elles pourront être modifiées de temps à autre. Si vous n'acceptez pas les présentes Conditions, ou si le droit de votre juridiction ne les reconnaît pas, vous devez cesser immédiatement toute utilisation du Site.",
      ],
      sections: [
        { heading: '1. Éligibilité', body: [
          "Le Site est réservé aux personnes âgées d'au moins 18 ans ou ayant atteint l'âge de la majorité dans leur juridiction de résidence. En accédant au Site ou en l'utilisant, vous déclarez et garantissez que (a) vous remplissez cette condition d'âge et que (b) si vous accédez au Site ou l'utilisez au nom d'une organisation, d'une entité ou de toute autre personne morale, vous êtes dûment habilité à accepter les présentes Conditions et à engager cette organisation à leur égard.",
        ] },
        { heading: '2. Mineurs', body: [
          "Le Site ne s'adresse pas aux personnes âgées de moins de 18 ans. Gwags ne collecte pas sciemment de données à caractère personnel auprès de mineurs. Si vous avez moins de 18 ans, vous ne pouvez accéder au Site ou l'utiliser qu'avec le consentement et sous la surveillance active d'un parent ou d'un tuteur légal qui accepte d'être lié par les présentes Conditions en votre nom. Si nous venons à apprendre que des données à caractère personnel ont été collectées auprès d'un mineur sans le consentement vérifiable d'un parent ou tuteur, nous prendrons des mesures raisonnables pour supprimer promptement ces données.",
          "Nonobstant ce qui précède, certains programmes de Gwags, dont le Programme Gwags Scholars, peuvent accepter des candidatures ou des documents émanant de personnes de moins de 18 ans. Dans un tel cas, le parent ou tuteur légal du candidat doit examiner les présentes Conditions ainsi que toute Condition Particulière applicable et y consentir avant toute soumission. Gwags peut demander à tout moment la vérification du consentement parental ou du tuteur.",
        ] },
        { heading: '3. Conditions Particulières', body: [
          "Certaines fonctionnalités du Site, notamment le traitement des dons, les portails de soumission de partenariats, les profils de l'annuaire du réseau, les candidatures aux bourses et l'inscription aux événements, peuvent être soumises à des conditions, lignes directrices ou politiques supplémentaires (les « Conditions Particulières »). Lorsque des Conditions Particulières s'appliquent, elles vous sont présentées dans le cadre de la fonctionnalité concernée. Sauf indication contraire expresse, les Conditions Particulières complètent les présentes Conditions et y sont intégrées. En cas de conflit entre les présentes Conditions et une Condition Particulière, cette dernière prévaut exclusivement à l'égard de la fonctionnalité à laquelle elle s'applique.",
        ] },
        { heading: '4. Contenu Multilingue', body: [
          "Le Site est disponible en anglais et en français. Les traductions sont fournies pour la commodité des utilisateurs. En cas d'incohérence, de divergence ou d'ambiguïté entre la version en langue anglaise et toute version traduite des présentes Conditions, de la Politique de Confidentialité ou de tout autre contenu du Site, la version en langue anglaise prévaut et fait foi.",
          "Gwags s'efforce de maintenir des traductions fidèles, mais ne garantit ni l'exactitude, ni l'exhaustivité, ni l'actualité du contenu traduit. Gwags ne saurait être tenu responsable de toute perte, de tout dommage ou de tout malentendu résultant de la confiance accordée au contenu traduit lorsque celui-ci diffère de la version originale en langue anglaise.",
        ] },
        { heading: '5. Accessibilité', body: [
          "Gwags s'engage à rendre le Site accessible à tous les utilisateurs, y compris aux personnes en situation de handicap. Nous nous efforçons de respecter les normes d'accessibilité applicables et d'améliorer continuellement l'expérience de chaque utilisateur. Si vous rencontrez un obstacle à l'accessibilité ou éprouvez des difficultés à accéder à une partie du Site, veuillez nous contacter à contact@gwags.org en décrivant le problème rencontré. Nous mettrons en œuvre des efforts raisonnables pour répondre à votre préoccupation et vous fournir l'information ou le service dont vous avez besoin par un moyen accessible.",
        ] },
        { heading: '6. Utilisation du Site', body: [
          { term: '(a) Licence', desc: "Sous réserve du respect des présentes Conditions, Gwags vous accorde une licence limitée, non exclusive, non transférable, non susceptible de sous-licence et révocable, pour accéder au Site et à son contenu et les utiliser exclusivement à des fins licites, non commerciales, personnelles ou internes à votre organisation." },
          { term: '(b) Restrictions', desc: "Dans le cadre de votre utilisation du Site, vous vous engagez à ne pas :" },
          { list: [
            "utiliser le Site à une fin illicite ou interdite par les présentes Conditions, ou qui contreviendrait à toute loi ou réglementation locale, nationale ou internationale applicable ;",
            "reproduire, dupliquer, copier, vendre, distribuer, concéder sous licence ou exploiter tout contenu, élément ou fonctionnalité du Site à des fins commerciales sans le consentement écrit préalable de Gwags ;",
            "entraver, perturber ou tenter de compromettre le bon fonctionnement, la sécurité ou l'intégrité du Site ou de tout système, serveur ou réseau qui lui est associé ;",
            "téléverser, transmettre ou mettre à disposition de toute autre manière un contenu préjudiciable, menaçant, injurieux, diffamatoire, obscène, attentatoire à la vie privée ou autrement répréhensible ;",
            "téléverser ou transmettre tout élément contenant des virus, un code malveillant ou tout autre composant nuisible ;",
            "tenter d'accéder sans autorisation à toute partie du Site, à tout compte, système ou réseau connecté au Site, ou à toute donnée qui ne vous est pas destinée ;",
            "recourir à des moyens automatisés, y compris des robots, des logiciels d'extraction, des robots d'indexation ou des technologies similaires, pour accéder au contenu ou aux données du Site, les surveiller, les copier ou les collecter, sans notre autorisation écrite expresse ;",
            "usurper l'identité d'une personne ou d'une entité, ou dénaturer votre affiliation avec toute personne ou entité, y compris Gwags ;",
            "utiliser le Site, son contenu ou le nom Gwags d'une manière laissant entendre un soutien, une affiliation ou un partenariat avec l'Institution, sauf autorisation écrite expresse ; ou",
            "porter intentionnellement ou par négligence atteinte à la réputation, aux activités, au personnel ou aux parties prenantes de l'Institution.",
          ] },
          "Toute utilisation non autorisée du Site peut entraîner la suspension ou la résiliation immédiate de votre accès, sans préavis, et peut engager votre responsabilité civile ou pénale.",
          { term: '(c) Surveillance', desc: "Gwags se réserve le droit, sans y être tenu, de surveiller l'utilisation du Site et de retirer ou de restreindre l'accès à tout contenu ou fonctionnalité, à tout moment, à sa seule discrétion et sans préavis." },
        ] },
        { heading: '7. Propriété Intellectuelle', body: [
          { term: '(a) Propriété', desc: "L'ensemble du contenu disponible sur le Site ou par son intermédiaire, y compris, sans s'y limiter, les textes, graphismes, logos, images, photographies, illustrations, données, logiciels, mises en page, éléments de conception et leur compilation (collectivement, le « Contenu »), est la propriété exclusive de Gwags ou de ses concédants de licence et est protégé au titre du droit d'auteur, du droit des marques, du droit des brevets et des autres dispositions applicables en matière de propriété intellectuelle." },
          { term: '(b) Marques', desc: "Le nom Gwags, son logo, ainsi que l'ensemble des marques de commerce, marques de service et habillages commerciaux qui s'y rapportent, sont la propriété de Gwags. Vous ne pouvez utiliser aucune marque, aucun logo ni aucun habillage commercial de Gwags sans notre consentement écrit préalable et exprès. Si un tel consentement est accordé, l'utilisation doit être conforme aux lignes directrices de marque fournies par l'Institution." },
          { term: '(c) Absence de Transfert de Droits', desc: "Aucun droit, titre ou intérêt sur le Contenu ne vous est transféré du fait de votre accès au Site ou de son utilisation. Tous les droits non expressément accordés aux présentes sont réservés par Gwags." },
          { term: '(d) Obligation de Signalement des Atteintes', desc: "Si vous avez connaissance d'une utilisation, d'une reproduction ou d'une distribution non autorisée de la propriété intellectuelle de Gwags, y compris son nom, son logo, son Contenu ou tout autre élément protégé, que ce soit sur le Site ou en dehors de celui-ci, vous vous engagez à en informer promptement Gwags à contact@gwags.org. Cette obligation s'applique à toute utilisation dont vous pouvez raisonnablement penser qu'elle constitue une atteinte ou une appropriation illicite des droits de propriété intellectuelle de l'Institution." },
        ] },
        { heading: '8. Création de Compte', body: [
          "L'accès à certaines fonctionnalités du Site peut nécessiter la création d'un compte utilisateur (le « Compte ») et l'établissement d'identifiants de connexion (les « Identifiants »). Si vous créez un Compte, vous vous engagez à :",
          { list: [
            "fournir des informations exactes, complètes et à jour lors de l'inscription et à maintenir l'exactitude de ces informations ;",
            "conserver vos Identifiants de manière confidentielle et ne les communiquer à aucun tiers ;",
            "assumer l'entière responsabilité de toute activité effectuée sous votre Compte, que celle-ci soit autorisée par vous ou non ; et",
            "informer immédiatement Gwags à contact@gwags.org si vous suspectez une utilisation non autorisée de votre Compte ou de vos Identifiants.",
          ] },
          "Gwags se réserve le droit de suspendre, de désactiver ou de résilier tout Compte à tout moment, pour quelque motif que ce soit ou sans motif, à sa seule discrétion. Vous ne pouvez ni vendre, ni transférer, ni céder votre Compte à un tiers.",
        ] },
        { heading: '9. Contributions des Utilisateurs', body: [
          { term: '(a) Généralités', desc: "Le Site peut vous permettre de soumettre des informations, documents, propositions, messages ou tout autre contenu au moyen de formulaires, de portails ou d'autres fonctionnalités (collectivement, les « Contributions »). Les Contributions comprennent, sans s'y limiter, les informations transmises par l'intermédiaire des formulaires de demande de partenariat, des formulaires de contact, des demandes d'affiliation au réseau, des documents relatifs aux subventions, des candidatures aux bourses, ainsi que tout autre contenu que vous fournissez à Gwags par l'intermédiaire du Site." },
          { term: '(b) Déclarations', desc: "En fournissant une Contribution, vous déclarez et garantissez que : (i) vous disposez du droit et de l'autorité nécessaires pour la fournir ; (ii) la Contribution ne porte pas atteinte aux droits de propriété intellectuelle, aux droits patrimoniaux ou aux droits à la vie privée d'un tiers, et ne constitue pas une appropriation illicite de ceux-ci ; (iii) la Contribution ne contient aucune information confidentielle d'un tiers que vous n'êtes pas autorisé à divulguer ; et (iv) la Contribution est conforme à l'ensemble des lois et réglementations applicables." },
          { term: '(c) Licence', desc: "En soumettant une Contribution à Gwags, vous accordez à Gwags une licence mondiale, gratuite, non exclusive, perpétuelle, irrévocable, transférable et susceptible de sous-licence, pour utiliser, reproduire, modifier, adapter, publier, traduire, distribuer, afficher et créer des œuvres dérivées de votre Contribution, en tout ou en partie, sous quelque forme ou sur quelque support que ce soit, connu ou à venir, à toute fin liée à la poursuite de la mission et des activités de Gwags, sans que cela n'ouvre droit à une quelconque mention ou compensation en votre faveur, sauf convention écrite contraire." },
          { term: '(d) Utilisation à des Fins de Reporting et de Communication', desc: "Sans limiter la portée générale de la licence qui précède, vous reconnaissez et acceptez que Gwags puisse utiliser votre Contribution, en tout ou en partie, à des fins de reporting institutionnel, de mesure d'impact, de rapports annuels, de communiqués de presse, de communications sur les réseaux sociaux, de supports de collecte de fonds et d'autres communications publiques, sans qu'un consentement supplémentaire à celui accordé aux termes des présentes Conditions ne soit requis. Si votre Contribution contient des informations permettant de vous identifier, Gwags traitera ces informations conformément à sa Politique de Confidentialité." },
          { term: '(e) Absence d’Obligation', desc: "Gwags n'est tenu à aucune obligation d'examiner, d'utiliser, de restituer ou de répondre à une Contribution. Gwags peut, à sa seule discrétion, modifier, refuser ou retirer toute Contribution à tout moment et sans préavis." },
          { term: '(f) Absence de Confidentialité', desc: "Sauf convention de confidentialité distincte conclue par écrit entre vous et Gwags, toute Contribution est réputée non confidentielle et non exclusive." },
          { term: '(g) Conservation des Données', desc: "Gwags conserve les Contributions et les données qui leur sont associées aussi longtemps que raisonnablement nécessaire pour atteindre les objectifs décrits dans les présentes Conditions, se conformer à ses obligations légales, résoudre des différends et faire valoir ses droits, ou conformément à toute autre exigence légale applicable." },
        ] },
        { heading: '10. Communications Électroniques', body: [
          "En utilisant le Site, en communiquant votre adresse électronique dans le cadre d'un formulaire ou de la création d'un Compte, ou en effectuant un don, vous consentez à recevoir des communications électroniques de la part de Gwags, y compris, sans s'y limiter, des reçus de dons, des confirmations de transaction, des notifications relatives à votre Compte, des correspondances de partenariat, des mises à jour de programmes et d'autres communications institutionnelles. Vous acceptez que l'ensemble des accords, avis, informations, reçus et autres communications que Gwags vous transmet par voie électronique satisfassent à toute exigence légale de forme écrite.",
          "Vous pouvez vous désabonner des communications non transactionnelles (telles que les infolettres ou les mises à jour générales) à tout moment, en suivant les instructions de désabonnement figurant dans ces communications ou en nous contactant à contact@gwags.org. Il n'est pas possible de se désabonner des communications transactionnelles relatives aux dons, à l'activité de votre Compte ou aux avis juridiques tant que vous conservez un Compte ou un don récurrent actif.",
        ] },
        { heading: '11. Dons', body: [
          { term: '(a) Traitement', desc: "Les dons effectués par l'intermédiaire du Site sont traités de manière sécurisée par Stripe, Inc. (« Stripe »), processeur de paiement tiers. En effectuant un don, vous acceptez d'être lié par les conditions de service et la politique de confidentialité applicables de Stripe, disponibles sur le site de Stripe." },
          { term: '(b) Devise', desc: "Les montants de don affichés sur le Site sont libellés dans la devise indiquée au moment de la transaction. Si votre moyen de paiement est libellé dans une devise différente, le montant final débité peut varier en raison des fluctuations de taux de change appliquées par votre banque, l'émetteur de votre carte ou le réseau de paiement. Gwags ne saurait être tenu responsable de tout écart entre le montant du don affiché et le montant effectivement débité de votre compte du fait d'une conversion de devise." },
          { term: '(c) Utilisation des Fonds', desc: "L'ensemble des dons reçus par Gwags est utilisé aux fins de la mission caritative de l'Institution. Sauf lorsqu'un don est affecté à une initiative, un programme ou un fonds spécifique et accepté comme tel par Gwags, les dons sont considérés comme des contributions non affectées." },
          { term: '(d) Dons Affectés', desc: "Si vous affectez un don à une initiative ou à un fonds spécifique et que cette initiative n'est plus active, a atteint sa capacité de financement ou a été interrompue, Gwags se réserve le droit de réorienter le don vers une initiative similaire correspondant à l'affectation d'origine, ou vers son fonds général, à sa seule discrétion. Gwags mettra en œuvre des efforts raisonnables pour vous informer de toute réaffectation de cette nature." },
          { term: '(e) Politique de Remboursement', desc: "Les dons ne sont, en règle générale, pas remboursables. Si vous estimez qu'un don a été effectué par erreur ou sans votre autorisation, vous pouvez contacter Gwags à donate@gwags.org dans un délai de trente (30) jours suivant la transaction. Gwags examinera votre demande et déterminera, à sa seule discrétion, si un remboursement est justifié." },
          { term: '(f) Dons Récurrents', desc: "Si vous optez pour un don récurrent, vous autorisez Gwags et Stripe à débiter le montant convenu de votre moyen de paiement sélectionné, selon la fréquence que vous précisez, jusqu'à annulation. Vous pouvez annuler un don récurrent à tout moment depuis votre compte donateur ou en contactant donate@gwags.org. L'annulation prend effet à compter du prochain cycle de paiement prévu." },
          { term: '(g) Reçus Fiscaux', desc: "Gwags délivre des reçus ouvrant droit à une déduction fiscale conformément aux lois fiscales des juridictions dans lesquelles elle est constituée. Il vous incombe seul de déterminer les conséquences fiscales de votre don au regard des lois qui vous sont applicables." },
          { term: '(h) Absence de Commissions', desc: "Gwags ne verse aucune commission, aucun honoraire d'intermédiaire ni aucune rémunération similaire à quelque personne ou entité que ce soit en lien avec la sollicitation ou le traitement des dons, sauf convention écrite contraire expressément conclue préalablement à un tel arrangement." },
          { term: '(i) Divisibilité de la Présente Section', desc: "Chaque sous-section de la présente Section est indépendante et divisible ; la nullité ou l'inopposabilité de l'une quelconque de ses sous-sections n'affecte pas la validité ou le caractère exécutoire des autres sous-sections." },
        ] },
        { heading: '12. Annuaire du Réseau', body: [
          { term: '(a) Généralités', desc: "Le Site présente un annuaire des organisations affiliées au réseau Gwags (les « Organisations du Réseau »). Les informations relatives aux Organisations du Réseau sont fournies à titre purement informatif. L'inscription à l'annuaire ne constitue ni un soutien, ni un partenariat, ni une relation de mandat entre Gwags et l'organisation inscrite, et ne représente aucune garantie quant à la qualité, à la fiabilité ou à la conduite de toute Organisation du Réseau." },
          { term: '(b) Exactitude', desc: "Les Organisations du Réseau sont seules responsables de l'exactitude des informations figurant dans leur profil. Gwags ne vérifie pas de manière indépendante les informations fournies par les Organisations du Réseau et décline toute responsabilité en cas d'inexactitude, d'omission ou de déclaration erronée dans ces informations." },
          { term: '(c) Ajout et Retrait', desc: "Gwags se réserve le droit d'ajouter, de modifier ou de retirer toute inscription de l'annuaire à tout moment, à sa seule discrétion. Une Organisation du Réseau peut demander la modification ou le retrait de son profil en contactant Gwags à contact@gwags.org. Gwags traitera ces demandes dans un délai raisonnable." },
        ] },
        { heading: '13. Liens et Services de Tiers', body: [
          "Le Site peut contenir des liens vers des sites web, des plateformes ou des services exploités par des tiers (les « Sites Liés »). Les Sites Liés ne sont pas sous le contrôle de Gwags, et Gwags n'est pas responsable du contenu, des politiques, des pratiques ou de la disponibilité de tout Site Lié. La présence d'un lien n'implique aucun soutien ni aucune affiliation. Vous accédez aux Sites Liés à vos propres risques et sous réserve des conditions applicables à ces sites.",
        ] },
        { heading: '14. Confidentialité et Cookies', body: [
          { term: '(a) Politique de Confidentialité', desc: "Votre utilisation du Site est également régie par notre Politique de Confidentialité, disponible à gwags.org/privacy. En utilisant le Site, vous consentez à la collecte, à l'utilisation et au traitement de vos informations tels que décrits dans la Politique de Confidentialité. Vous êtes seul responsable de l'exactitude des données à caractère personnel que vous fournissez." },
          { term: '(b) Cookies', desc: "Le Site peut recourir à des cookies et à des technologies de suivi similaires à des fins d'analyse, de gestion de session et de fonctionnalité. Vos préférences en matière de cookies sont gérées conformément à la Politique de Confidentialité. En continuant à utiliser le Site sans modifier vos paramètres de cookies, vous consentez à l'utilisation des cookies telle que décrite dans cette politique." },
          { term: '(c) Transferts Internationaux de Données', desc: "Si vous accédez au Site depuis un pays autre que les États-Unis ou le Cameroun, vos informations pourront être transférées, stockées et traitées aux États-Unis, au Cameroun ou dans toute autre juridiction où Gwags ou ses prestataires de services exercent leurs activités. En utilisant le Site, vous consentez à un tel transfert, stockage et traitement." },
        ] },
        { heading: '15. Plaintes pour Atteinte au Droit d’Auteur', body: [
          "Si vous estimez qu'un contenu du Site porte atteinte à votre droit d'auteur, vous pouvez en informer Gwags par écrit à contact@gwags.org en fournissant les éléments suivants : (a) une description de l'œuvre protégée à laquelle vous estimez qu'il a été porté atteinte ; (b) une description du contenu prétendument contrefaisant et de son emplacement sur le Site ; (c) vos coordonnées ; (d) une déclaration attestant votre conviction de bonne foi que l'utilisation en cause n'est autorisée ni par le titulaire du droit d'auteur, ni par son mandataire, ni par la loi ; et (e) une déclaration, faite sous peine de parjure, attestant l'exactitude des informations contenues dans votre avis et le fait que vous êtes le titulaire du droit d'auteur ou habilité à agir en son nom.",
          "Gwags examinera tout avis valablement soumis et prendra les mesures appropriées conformément au droit applicable.",
        ] },
        { heading: '16. Exclusion de Garanties', body: [
          "DANS TOUTE LA MESURE PERMISE PAR LE DROIT APPLICABLE, LE SITE AINSI QUE L'ENSEMBLE DU CONTENU, DES ÉLÉMENTS, DES INFORMATIONS ET DES SERVICES MIS À DISPOSITION PAR L'INTERMÉDIAIRE DU SITE SONT FOURNIS « EN L'ÉTAT » ET « SELON LEUR DISPONIBILITÉ », SANS GARANTIE D'AUCUNE SORTE, EXPRESSE, IMPLICITE OU LÉGALE. GWAGS EXCLUT EXPRESSÉMENT TOUTE GARANTIE IMPLICITE, Y COMPRIS, SANS S'Y LIMITER, LES GARANTIES DE QUALITÉ MARCHANDE, D'ADÉQUATION À UN USAGE PARTICULIER, DE TITRE DE PROPRIÉTÉ ET D'ABSENCE DE CONTREFAÇON.",
          "GWAGS NE GARANTIT PAS QUE LE SITE SERA ININTERROMPU, EXEMPT D'ERREURS, SÉCURISÉ OU EXEMPT DE VIRUS OU D'AUTRES COMPOSANTS NUISIBLES, NI QUE LES DÉFAILLANCES SERONT CORRIGÉES. GWAGS NE FAIT AUCUNE DÉCLARATION QUANT À L'EXACTITUDE, À L'EXHAUSTIVITÉ, À LA FIABILITÉ OU À L'ACTUALITÉ DE TOUT CONTENU OU DE TOUTE INFORMATION FOURNIS PAR L'INTERMÉDIAIRE DU SITE.",
          "VOUS RECONNAISSEZ QUE VOTRE UTILISATION DU SITE S'EFFECTUE À VOS PROPRES RISQUES.",
        ] },
        { heading: '17. Limitation de Responsabilité', body: [
          "DANS TOUTE LA MESURE PERMISE PAR LE DROIT APPLICABLE, GWAGS, SES DIRIGEANTS, ADMINISTRATEURS, EMPLOYÉS, MANDATAIRES, FILIALES, PARTENAIRES ET PRESTATAIRES DE SERVICES NE POURRONT ÊTRE TENUS RESPONSABLES DE TOUT DOMMAGE INDIRECT, ACCESSOIRE, SPÉCIAL, CONSÉCUTIF OU PUNITIF, Y COMPRIS, SANS S'Y LIMITER, TOUTE PERTE DE PROFITS, DE REVENUS, DE DONNÉES, DE CLIENTÈLE OU D'OPPORTUNITÉ COMMERCIALE, RÉSULTANT DE OU LIÉ À VOTRE UTILISATION DU SITE OU À VOTRE INCAPACITÉ À L'UTILISER, À TOUT CONTENU, À TOUTE CONTRIBUTION OU À TOUT SERVICE OBTENU PAR L'INTERMÉDIAIRE DU SITE, QUE CE SOIT SUR LE FONDEMENT D'UNE GARANTIE, D'UN CONTRAT, D'UNE RESPONSABILITÉ DÉLICTUELLE (Y COMPRIS LA NÉGLIGENCE), D'UNE DISPOSITION LÉGALE OU DE TOUTE AUTRE THÉORIE JURIDIQUE, MÊME SI GWAGS A ÉTÉ INFORMÉ DE LA POSSIBILITÉ DE TELS DOMMAGES.",
          "EN AUCUN CAS LA RESPONSABILITÉ GLOBALE DE GWAGS ENVERS VOUS AU TITRE DE L'ENSEMBLE DES RÉCLAMATIONS DÉCOULANT DU SITE OU DES PRÉSENTES CONDITIONS, OU S'Y RAPPORTANT, NE POURRA EXCÉDER LE MOINDRE DES DEUX MONTANTS SUIVANTS : (A) LE MONTANT QUE VOUS AVEZ VERSÉ À GWAGS, LE CAS ÉCHÉANT, AU COURS DES DOUZE (12) MOIS PRÉCÉDANT L'ÉVÉNEMENT À L'ORIGINE DE LA RÉCLAMATION, OU (B) CENT DOLLARS AMÉRICAINS (100 USD).",
          "CERTAINES JURIDICTIONS N'AUTORISENT PAS L'EXCLUSION OU LA LIMITATION DE CERTAINS DOMMAGES. SI CES LOIS VOUS SONT APPLICABLES, IL EST POSSIBLE QUE TOUT OU PARTIE DES EXCLUSIONS OU LIMITATIONS CI-DESSUS NE VOUS SOIT PAS APPLICABLE, ET VOUS POURRIEZ DISPOSER DE DROITS SUPPLÉMENTAIRES.",
        ] },
        { heading: '18. Indemnisation', body: [
          "Dans toute la mesure permise par le droit applicable, vous acceptez de défendre, d'indemniser et de tenir Gwags, ainsi que ses dirigeants, administrateurs, employés, mandataires, filiales, partenaires et prestataires de services, à couvert de toute réclamation, tout dommage, toute perte, toute responsabilité, tout coût et toute dépense (y compris les honoraires d'avocat raisonnables) découlant de, ou liés à : (a) votre utilisation du Site ; (b) vos Contributions ; (c) votre violation des présentes Conditions ; (d) votre violation de toute loi ou réglementation applicable ; ou (e) votre violation des droits d'un tiers, y compris ses droits de propriété intellectuelle, ses droits à la vie privée ou ses droits patrimoniaux.",
          "Gwags se réserve le droit, à ses frais, d'assumer la défense exclusive et le contrôle de toute affaire soumise à indemnisation de votre part, et vous acceptez de coopérer avec Gwags dans la défense de ces réclamations.",
        ] },
        { heading: '19. Résiliation', body: [
          "Gwags peut, à sa seule et absolue discrétion, suspendre, restreindre ou résilier votre accès au Site à tout moment, avec ou sans motif et avec ou sans préavis. En cas de résiliation, l'ensemble des droits et licences qui vous ont été accordés au titre des présentes Conditions prend fin immédiatement.",
          "Les sections suivantes survivent à la résiliation des présentes Conditions : les Sections 7 (Propriété Intellectuelle), 9 (Contributions des Utilisateurs), 10 (Communications Électroniques), 11 (Dons), 16 (Exclusion de Garanties), 17 (Limitation de Responsabilité), 18 (Indemnisation), 19 (Résiliation), 20 (Règlement des Différends), 21 (Droit Applicable et Juridiction Compétente) et 24 (Dispositions Générales).",
        ] },
        { heading: '20. Règlement des Différends', body: [
          "Avant d'engager toute procédure judiciaire formelle découlant des présentes Conditions ou du Site, ou s'y rapportant, vous et Gwags convenez chacun de tenter au préalable de résoudre le différend par voie de négociation de bonne foi. La partie à l'origine du différend adresse à l'autre partie une description écrite de sa réclamation, accompagnée des informations pertinentes et d'une proposition de résolution. Les avis destinés à Gwags doivent être adressés à contact@gwags.org. Gwags vous adressera ses avis à l'adresse électronique associée à votre Compte ou à toute autre adresse que vous aurez communiquée.",
          "Si l'une des parties ne répond pas à l'avis initial dans un délai de trente (30) jours, ou si le différend demeure non résolu à l'expiration d'un délai de soixante (60) jours à compter de la réception de l'avis initial, chaque partie peut alors porter sa réclamation devant les instances compétentes décrites à la Section 21.",
        ] },
        { heading: '21. Droit Applicable et Juridiction Compétente', body: [
          { term: '(a) Droit Applicable', desc: "Les présentes Conditions et votre utilisation du Site sont régies et interprétées conformément aux lois des juridictions dans lesquelles Gwags Institution d'Impact Global est constituée, à savoir : (i) les lois de l'État de Washington (États-Unis d'Amérique) ; et (ii) les lois de la République du Cameroun, dans chaque cas sans égard aux principes de conflit de lois." },
          { term: '(b) Juridiction Exclusive', desc: "Pour tout différend lié aux activités ou à la constitution de Gwags aux États-Unis, vous consentez à la compétence exclusive des juridictions étatiques et fédérales situées dans l'État de Washington. Pour tout différend lié aux activités ou à la constitution de Gwags au Cameroun, la juridiction compétente est déterminée conformément au droit camerounais applicable." },
          { term: '(c) Divisibilité Juridictionnelle', desc: "Si une juridiction d'un pays juge une disposition des présentes Conditions nulle, illicite ou inopposable au regard de son droit, cette décision est sans effet sur la validité, la licéité ou le caractère exécutoire de cette disposition au regard du droit de l'autre juridiction dans laquelle Gwags est constituée. L'interprétation des présentes Conditions par chaque juridiction s'effectue de manière indépendante." },
        ] },
        { heading: '22. Utilisation Internationale', body: [
          "Gwags a son siège et exerce ses activités à la fois aux États-Unis et au Cameroun. Le Site et son Contenu sont régis par les lois mentionnées à la Section 21. Gwags ne garantit pas que le Site ou son Contenu soient appropriés ou disponibles dans tous les lieux. Si vous accédez au Site depuis un pays autre que les États-Unis ou le Cameroun, vous le faites de votre propre initiative et êtes seul responsable du respect de l'ensemble des lois locales applicables.",
        ] },
        { heading: '23. Force Majeure', body: [
          "Gwags ne saurait être tenu responsable de tout manquement ou retard dans l'exécution de ses obligations au titre des présentes Conditions lorsque ce manquement ou ce retard résulte de circonstances échappant à son contrôle raisonnable, y compris, sans s'y limiter : les cas fortuits ; les catastrophes naturelles ; les inondations ; les incendies ; les tremblements de terre ; les épidémies ou pandémies ; la guerre ; l'invasion ; les hostilités (qu'une guerre soit déclarée ou non) ; les menaces ou actes terroristes ; les émeutes ou autres troubles civils ; les ordonnances, lois ou mesures gouvernementales ; les embargos ou blocus ; les situations d'urgence nationale ou régionale ; les grèves ou conflits du travail ; les pannes ou interruptions de télécommunications ou d'électricité ; les cyberattaques ou violations de données ; les perturbations de l'infrastructure Internet ou des réseaux ; la défaillance de prestataires de services tiers ; ou tout autre événement échappant au contrôle raisonnable de l'Institution.",
          "Pendant la durée d'un tel événement, les obligations de Gwags au titre des présentes Conditions sont suspendues dans la mesure où elles sont affectées, et Gwags ne saurait être réputé en défaut ou en violation des présentes Conditions de ce fait.",
        ] },
        { heading: '24. Dispositions Générales', body: [
          { term: '(a) Intégralité de l’Accord', desc: "Les présentes Conditions, ainsi que notre Politique de Confidentialité et toute Condition Particulière applicable, constituent l'intégralité de l'accord entre vous et Gwags relatif au Site et remplacent tout accord, toute déclaration, toute garantie et tout accord antérieur ou contemporain portant sur le même objet." },
          { term: '(b) Divisibilité', desc: "Si une juridiction compétente juge une disposition des présentes Conditions nulle, illicite ou inopposable, les autres dispositions demeurent pleinement en vigueur. La disposition nulle, illicite ou inopposable est modifiée dans la mesure minimale nécessaire pour la rendre valide, licite et opposable tout en préservant son intention initiale." },
          { term: '(c) Absence de Renonciation', desc: "Le fait pour Gwags de ne pas exercer un droit ou de ne pas faire respecter une disposition des présentes Conditions ne constitue pas une renonciation à ce droit ou à cette disposition. Toute renonciation à une disposition des présentes Conditions n'est valable que si elle est faite par écrit et signée par Gwags." },
          { term: '(d) Cession', desc: "Vous ne pouvez céder, transférer ou déléguer les présentes Conditions, ni aucun des droits ou obligations qui en découlent, sans le consentement écrit préalable de Gwags. Gwags peut céder les présentes Conditions, en tout ou en partie, à tout moment et sans préavis." },
          { term: '(e) Titres', desc: "Les titres des sections sont fournis à titre indicatif uniquement et n'affectent pas l'interprétation des présentes Conditions." },
          { term: '(f) Modifications des Présentes Conditions', desc: "Gwags se réserve le droit de modifier, de compléter ou de remplacer les présentes Conditions à tout moment. Les modifications prennent effet dès leur publication sur le Site, accompagnées d'une date de « Dernière mise à jour » actualisée. Votre utilisation continue du Site après de telles modifications vaut acceptation des Conditions révisées. Nous vous encourageons à consulter régulièrement les présentes Conditions." },
        ] },
        { heading: '25. Contact', body: [
          "Pour toute question relative aux présentes Conditions, veuillez contacter :",
          "Gwags Institution d'Impact Global",
          { term: 'E-mail', desc: 'contact@gwags.org' },
          { term: 'Pour toute question relative aux dons', desc: 'donate@gwags.org' },
          { term: 'Pour toute question d’accessibilité', desc: 'contact@gwags.org' },
        ] },
      ],
    },
    privacy: {
      title: 'Politique de Confidentialité',
      updated: 'Dernière mise à jour : septembre 2026',
      intro: [
        "Gwags Institution d'Impact Global, institution à but non lucratif constituée aux États-Unis et en République du Cameroun, ainsi que ses filiales, programmes et entités opérationnelles (« Gwags », « l'Institution », « nous », « notre », « nos »), s'engage à assurer un traitement licite, loyal et transparent des données à caractère personnel.",
        "La présente politique de confidentialité (la « Politique ») a pour objet de vous informer sur les données à caractère personnel que nous collectons, les raisons pour lesquelles nous les collectons, les cas dans lesquels nous les partageons, la manière dont nous les conservons et les protégeons, ainsi que sur la façon de gérer les communications que nous vous adressons et d'exercer les droits dont vous pouvez disposer à l'égard de vos données à caractère personnel. La présente Politique s'applique aux données à caractère personnel collectées par l'intermédiaire de ce site web et de tout autre site web, portail, formulaire, enquête ou service numérique exploité ou maintenu par Gwags (collectivement, « le Site »).",
        "En accédant au Site ou en l'utilisant, vous reconnaissez avoir lu et compris la présente Politique. Si vous n'approuvez pas les pratiques de traitement des données décrites aux présentes, veuillez cesser d'utiliser le Site.",
        "Des traductions de la présente Politique sont disponibles en français. En cas d'incohérence entre la version anglaise et la version française, la version anglaise prévaut.",
        "Nous pouvons mettre à jour la présente Politique de temps à autre afin de refléter l'évolution de nos pratiques et du droit applicable. En cas de modification substantielle, nous publierons un avis sur le Site. Nous vous encourageons à consulter régulièrement la présente Politique.",
      ],
      sections: [
        { heading: "1. Champ d'Application de la Présente Politique", body: [
          "La présente Politique s'applique aux données à caractère personnel que nous collectons par l'intermédiaire du Site, y compris au moyen des formulaires de contact, des demandes de partenariat, du traitement des dons, des fonctionnalités de l'annuaire du réseau, des interactions liées aux bourses, des inscriptions aux événements et de toute autre interaction numérique gérée par Gwags.",
          "La présente Politique ne s'applique à aucune application, intégration ou site web tiers susceptible d'être relié au Site ou accessible depuis celui-ci. Nous ne sommes pas responsables du contenu, des fonctionnalités ou des pratiques de confidentialité de tout site tiers lié. Les pratiques de collecte et d'utilisation des données de tout site tiers lié sont régies par la politique de confidentialité et les conditions d'utilisation propres à ce tiers. Nous vous encourageons à en prendre connaissance.",
        ] },
        { heading: '2. Données que Nous Collectons à Votre Sujet', body: [
          { term: '(a) Données que Vous Fournissez Directement', desc: "Nous collectons des données à caractère personnel lorsque vous nous les fournissez volontairement. Cela peut inclure :" },
          { list: [
            "votre nom, votre adresse électronique, votre numéro de téléphone, votre pays de résidence et votre affiliation organisationnelle lorsque vous soumettez un formulaire de contact, une demande de partenariat ou toute autre communication par l'intermédiaire du Site ;",
            "votre nom, votre adresse électronique, les détails de votre moyen de paiement et le montant de votre don lorsque vous effectuez un don par l'intermédiaire du Site ;",
            "toute donnée à caractère personnel contenue dans les propositions, messages, commentaires, documents ou autres éléments que vous soumettez au moyen de nos formulaires ou portails ;",
            "votre nom, vos informations académiques et toute autre donnée que vous fournissez lorsque vous posez votre candidature à un programme de Gwags, y compris le Programme Gwags Scholars ; et",
            "toute autre donnée à caractère personnel que vous choisissez de fournir dans le cadre de votre interaction avec le Site.",
          ] },
          "Vous demeurez toujours libre de fournir ou non des données à caractère personnel. Certaines données sont toutefois nécessaires pour bénéficier de certaines fonctionnalités du Site ou pour participer à certains programmes. Le choix de ne pas fournir ces données peut limiter votre capacité à utiliser ces fonctionnalités ou à participer à ces programmes.",
          { term: '(b) Données que Vous Fournissez au Sujet de Tiers', desc: "Ne fournissez aucune donnée à caractère personnel concernant un tiers, sauf si vous y êtes autorisé ou tenu par le droit ou un contrat applicable. Si vous fournissez des données à caractère personnel concernant une autre personne, vous déclarez lui avoir communiqué une copie de la présente Politique et avoir obtenu son consentement lorsque celui-ci est requis." },
          { term: '(c) Données que Nous Collectons Automatiquement', desc: "Lorsque vous visitez le Site, nous pouvons collecter automatiquement certaines données techniques, notamment :" },
          { list: [
            "votre adresse de protocole Internet (« IP »), les informations relatives à votre fournisseur d'accès à Internet (« FAI »), le type et la langue de votre navigateur, ainsi que le type d'appareil utilisé ;",
            "des données relatives à votre interaction avec le Site, y compris la page de provenance, les pages consultées, le temps passé sur ces pages et les parcours de navigation ; et",
            "des données collectées au moyen de cookies, de pixels et de technologies similaires, telles que décrites à la Section 5.",
          ] },
          "Nous pouvons associer les données collectées automatiquement aux données que vous fournissez dans d'autres contextes sur le Site afin de personnaliser et d'améliorer votre expérience.",
          { term: '(d) Données que Nous Obtenons de Tiers', desc: "Nous pouvons obtenir des données à caractère personnel vous concernant auprès d'autres sources, y compris des sources publiques, des prestataires de services et des tiers agissant en votre nom ou avec une autorité apparente. Par exemple, nous pouvons recevoir vos données à caractère personnel si une autre personne vous désigne comme contact pour son organisation, ou si un prestataire de services nous communique des données dans le cadre de la fourniture de services liés au Site." },
        ] },
        { heading: '3. Comment Nous Utilisons Vos Données', body: [
          "Nous pouvons utiliser vos données à caractère personnel pour :",
          { list: [
            "répondre à vos demandes, messages et communications soumis par l'intermédiaire du Site ;",
            "traiter et accuser réception des dons, et en délivrer les reçus ;",
            "examiner et répondre aux demandes de partenariat, propositions et autres soumissions ;",
            "administrer les programmes de Gwags, y compris le Programme Gwags Scholars, et évaluer les candidatures ;",
            "gérer l'annuaire du réseau et traiter les demandes d'affiliation au réseau ;",
            "vous adresser des communications transactionnelles, y compris des confirmations de don, des notifications de compte et des correspondances liées à vos soumissions ;",
            "vous adresser des communications institutionnelles, y compris des infolettres, des mises à jour de programmes et d'autres informations que vous avez consenti à recevoir ;",
            "administrer, maintenir et améliorer le Site, y compris en analysant les habitudes d'utilisation et en résolvant les incidents techniques ;",
            "protéger les droits, la sécurité et la sûreté de Gwags, de ses utilisateurs et du public ;",
            "tenir à jour les registres et archives de l'Institution ; et",
            "respecter les lois, règlements, décisions de justice ou procédures légales applicables.",
          ] },
        ] },
        { heading: '4. Bases Légales du Traitement', body: [
          "Nous ne collectons et n'utilisons vos données à caractère personnel que lorsque nous disposons d'une base légale à cet effet en vertu du droit applicable. La base légale dépend de la nature de votre interaction avec nous et peut comprendre :",
          { list: [
            "votre consentement (par exemple, lorsque vous vous abonnez à des communications ou soumettez un formulaire) ;",
            "l'exécution d'un contrat ou de mesures prises à votre demande préalablement à la conclusion d'un contrat ;",
            "le respect d'une obligation légale à laquelle Gwags est soumise ;",
            "nos intérêts légitimes ou ceux d'un tiers, sous réserve que vos droits et libertés fondamentaux ne prévalent pas sur ces intérêts (par exemple, l'administration de nos programmes, l'amélioration du Site ou la protection de nos activités) ; et",
            "la sauvegarde de vos intérêts vitaux ou de ceux d'une autre personne.",
          ] },
          "Lorsque la base légale retenue est le consentement, nous vous en informerons clairement. Vous pouvez retirer votre consentement à tout moment, sans que cela n'affecte la licéité du traitement effectué avant ce retrait.",
        ] },
        { heading: '5. Cookies et Technologies Similaires', body: [
          { term: '(a) Que Sont les Cookies', desc: "Les cookies sont de petits fichiers texte stockés sur votre appareil lorsque vous accédez à un site web. Nous utilisons des cookies et des technologies similaires (y compris des pixels et des balises web) pour collecter des données relatives à votre interaction avec le Site." },
          { term: '(b) Comment Nous Utilisons les Cookies', desc: "Nous pouvons utiliser des cookies afin de :" },
          { list: [
            "permettre le fonctionnement essentiel du Site, notamment la gestion des sessions et la sécurité ;",
            "mémoriser vos préférences et paramètres ;",
            "comprendre la manière dont les visiteurs utilisent le Site, y compris les pages les plus fréquemment consultées ;",
            "analyser la performance du Site et identifier les axes d'amélioration ; et",
            "soutenir les services d'analyse décrits à la Section 5(d).",
          ] },
          { term: '(c) Gestion des Cookies', desc: "Il n'est pas nécessaire d'activer les cookies pour naviguer sur le Site, mais certaines fonctionnalités pourraient ne pas fonctionner correctement sans eux. La plupart des navigateurs permettent de gérer ou de bloquer les cookies au moyen de leurs paramètres. Veuillez noter que la désactivation des cookies peut affecter votre expérience sur le Site. De plus amples informations sur la gestion des cookies sont disponibles à www.aboutcookies.org." },
          { term: "(d) Services d'Analyse Tiers", desc: "Nous pouvons recourir à des services d'analyse tiers, y compris Google Analytics, pour collecter et analyser des informations relatives à l'utilisation du Site. Ces services utilisent des cookies et des technologies similaires pour collecter des données sur l'utilisation du Site et en dégager des tendances, sans nous permettre d'identifier les individus. Vous pouvez consulter les pratiques de Google à l'adresse https://policies.google.com/technologies/partner-sites et vous opposer à la collecte de données par Google Analytics à l'adresse https://tools.google.com/dlpage/gaoptout." },
        ] },
        { heading: '6. Traitement des Paiements', body: [
          "Les dons effectués par l'intermédiaire du Site sont traités par Stripe, Inc. (« Stripe »), processeur de paiement tiers. Lorsque vous effectuez un don, Stripe collecte et traite directement vos informations de paiement (y compris les détails de votre carte). Gwags ne reçoit, ne consulte ni ne conserve les informations complètes de votre carte de paiement.",
          "Si vous établissez un don récurrent, Stripe conserve vos informations de paiement dans la mesure nécessaire au traitement des prélèvements futurs, jusqu'à annulation. L'annulation d'un don récurrent auprès de Gwags n'entraîne pas automatiquement la suppression de vos données de paiement par Stripe. Veuillez consulter la politique de confidentialité de Stripe pour connaître la procédure de demande de suppression de vos données de paiement directement auprès de Stripe.",
          "La collecte et l'utilisation de vos données de paiement par Stripe sont régies par la politique de confidentialité et les conditions de service propres à Stripe. Nous vous encourageons à en prendre connaissance. Gwags ne reçoit que les informations nécessaires pour confirmer et accuser réception de votre don, telles que votre nom, votre adresse électronique, le montant du don et la confirmation de la transaction.",
        ] },
        { heading: '7. Comment Nous Partageons Vos Données', body: [
          { term: '(a) Prestataires de Services', desc: "Nous pouvons partager vos données à caractère personnel avec des prestataires de services qui nous assistent dans l'exploitation du Site et l'exercice de nos fonctions institutionnelles, notamment le traitement des paiements (Stripe), les services de messagerie électronique, les hébergeurs et les prestataires d'analyse. Nos prestataires de services ne sont autorisés à utiliser vos données à caractère personnel que dans la mesure nécessaire à la fourniture de leurs services à Gwags, aux seules fins pour lesquelles ces données leur ont été communiquées, et sont contractuellement tenus de les protéger conformément au droit applicable." },
          { term: "(b) Personnel de l'Institution", desc: "Nous pouvons partager vos données à caractère personnel avec les dirigeants, administrateurs, employés et bénévoles autorisés de Gwags qui ont un besoin légitime d'y accéder dans le cadre de leurs responsabilités institutionnelles." },
          { term: '(c) Organisations du Réseau et Partenaires', desc: "Si vous soumettez des informations dans le cadre d'une demande d'affiliation au réseau ou d'une demande de partenariat, nous pouvons partager les données pertinentes avec la direction de Gwags et, le cas échéant, avec les organisations concernées par l'affiliation ou le partenariat envisagé, aux seules fins d'évaluer et de traiter la demande." },
          { term: '(d) Obligations Légales', desc: "Nous pouvons divulguer vos données à caractère personnel lorsque la loi applicable, une décision de justice, une assignation ou une procédure légale nous y contraint, ou lorsque nous estimons de bonne foi qu'une telle divulgation est nécessaire pour protéger nos droits, votre sécurité ou celle d'autrui, enquêter sur une fraude, ou répondre à une demande d'une autorité publique." },
          { term: '(e) Absence de Vente de Données', desc: "Gwags ne vend, ne loue, ne cède à bail et n'échange vos données à caractère personnel avec aucun tiers à des fins commerciales ou de marketing." },
        ] },
        { heading: '8. Transferts Internationaux de Données', body: [
          "Gwags exerce ses activités à la fois aux États-Unis et en République du Cameroun. Vos données à caractère personnel peuvent être transférées, stockées et traitées aux États-Unis, au Cameroun ou dans tout autre pays où Gwags ou ses prestataires de services disposent d'installations.",
          "La protection des données aux États-Unis est régie par le droit fédéral et le droit des États applicables. La protection des données au Cameroun est régie par la loi n° 2010/012 du 21 décembre 2010 relative à la cybersécurité et au commerce électronique, ainsi que par les textes qui s'y rapportent. Gwags respecte les exigences applicables en matière de protection des données dans ces deux juridictions.",
          "Si vous accédez au Site depuis un pays autre que ces juridictions, vous consentez au transfert, au stockage et au traitement de vos données dans des juridictions dont les normes de protection des données peuvent différer de celles de votre juridiction de résidence. Lorsque le droit applicable l'exige, nous veillerons à ce que des garanties appropriées soient mises en place pour protéger vos données à caractère personnel dans le cadre de tout transfert de cette nature, notamment au moyen de clauses contractuelles types ou d'autres mécanismes reconnus par la loi.",
        ] },
        { heading: '9. Conservation et Stockage des Données', body: [
          { term: '(a) Durée de Conservation', desc: "Nous ne conservons vos données à caractère personnel que pendant la durée raisonnablement nécessaire à la réalisation des finalités pour lesquelles elles ont été collectées, telles que décrites dans la présente Politique, ou conformément aux exigences ou autorisations du droit applicable. Les durées de conservation varient selon la catégorie de données et sont déterminées en fonction de la nature des données, de la sensibilité des informations, des finalités du traitement et des exigences légales applicables." },
          { term: '(b) Registres des Dons', desc: "Les registres relatifs aux dons, y compris l'identité du donateur, le montant du don, la date et son affectation, sont conservés pendant la durée exigée par le droit fiscal, les obligations de reporting financier et les règles de gouvernance applicables aux organismes à but non lucratif dans les juridictions où Gwags est constituée." },
          { term: '(c) Contributions', desc: "Les données fournies par l'intermédiaire des formulaires de contact, des demandes de partenariat et d'autres soumissions sont conservées pendant la durée nécessaire pour répondre à votre demande et la traiter, puis, le cas échéant, aux fins de tenue des registres institutionnels ou conformément aux exigences légales." },
          { term: '(d) Suppression', desc: "À l'expiration de la durée de conservation applicable, nous supprimons ou anonymisons vos données à caractère personnel. Lorsque la suppression n'est pas immédiatement possible (par exemple, parce que les données sont conservées dans des archives de sauvegarde), nous les isolons de manière sécurisée de tout traitement ultérieur jusqu'à ce que leur suppression devienne possible." },
        ] },
        { heading: '10. Sécurité des Données', body: [
          "Nous mettons en œuvre des mesures techniques et organisationnelles appropriées pour protéger vos données à caractère personnel contre tout accès non autorisé, toute divulgation, altération, destruction ou perte. Ces mesures comprennent des contrôles d'accès, un chiffrement lorsque cela est approprié, ainsi que des évaluations de sécurité régulières.",
          "Nous limitons l'accès aux données à caractère personnel au personnel autorisé qui en a besoin dans le cadre de ses responsabilités institutionnelles et qui est soumis à des obligations de confidentialité.",
          "Nous exigeons de nos prestataires de services qu'ils respectent des normes de confidentialité et de sécurité des données au moins équivalentes aux nôtres.",
          "Cela étant, aucune méthode de transmission sur Internet ni aucune méthode de stockage électronique n'est totalement sécurisée. Bien que nous nous efforcions de protéger vos données à caractère personnel, nous ne pouvons garantir leur sécurité absolue. Toute transmission de données vers le Site s'effectue à vos propres risques.",
        ] },
        { heading: '11. Notification des Violations de Données', body: [
          "En cas de violation de données à caractère personnel susceptible d'engendrer un risque pour vos droits et libertés, Gwags notifiera les personnes concernées ainsi que les autorités de protection des données compétentes, conformément au droit applicable et dans les délais qu'il prescrit. Cette notification comprendra, dans la mesure où ces éléments sont connus au moment de la notification, la nature de la violation, les catégories de données concernées, ses conséquences probables, ainsi que les mesures prises ou envisagées pour y remédier et en atténuer les effets.",
        ] },
        { heading: '12. Mineurs', body: [
          "Le Site ne s'adresse pas aux personnes âgées de moins de 13 ans (ou de l'âge minimum équivalent dans votre juridiction). Conformément au Children's Online Privacy Protection Act (COPPA) et aux protections équivalentes prévues par le droit applicable, Gwags ne collecte pas sciemment de données à caractère personnel auprès de mineurs par l'intermédiaire du Site.",
          "Certains programmes de Gwags, y compris le Programme Gwags Scholars, peuvent concerner des personnes de moins de 18 ans. Dans un tel cas, la collecte et le traitement des données à caractère personnel de personnes de moins de 18 ans s'effectuent avec le consentement d'un parent ou d'un tuteur légal, tel que décrit dans nos Conditions d'utilisation.",
          "Si vous constatez que des données à caractère personnel ont été collectées auprès d'un mineur sans le consentement approprié, veuillez nous contacter à contact@gwags.org. Nous prendrons des mesures raisonnables pour supprimer promptement ces données.",
        ] },
        { heading: '13. Vos Droits', body: [
          "Selon votre juridiction et le droit applicable, vous pouvez disposer du droit de :",
          { list: [
            "obtenir la confirmation que nous détenons ou non des données à caractère personnel vous concernant ;",
            "accéder à vos données à caractère personnel et en recevoir une copie ;",
            "corriger ou mettre à jour des données à caractère personnel inexactes ou incomplètes ;",
            "demander la suppression de vos données à caractère personnel, sous réserve des obligations légales de conservation ;",
            "retirer tout consentement précédemment accordé ;",
            "vous opposer à certains traitements de vos données à caractère personnel ou en demander la limitation ;",
            "demander la portabilité de vos données à caractère personnel (c'est-à-dire les recevoir dans un format structuré, couramment utilisé et lisible par machine) ; et",
            "introduire une réclamation auprès de l'autorité de protection des données compétente dans votre juridiction.",
          ] },
          "Pour exercer l'un quelconque de ces droits, veuillez contacter notre Correspondant Confidentialité des Données à contact@gwags.org. Nous accuserons réception de votre demande dans un délai de cinq (5) jours ouvrés et vous apporterons une réponse motivée dans un délai de trente (30) jours, ou vous informerons si une prorogation de ce délai est nécessaire. Nous pouvons vous demander de vérifier votre identité avant de traiter votre demande.",
          "Veuillez noter que certains droits peuvent être limités lorsque nous disposons d'un intérêt légitime prépondérant, d'une obligation légale de conservation des données, ou lorsque des exceptions prévues par le droit applicable trouvent à s'appliquer.",
        ] },
        { heading: '14. Données à Caractère Personnel Sensibles', body: [
          "Nous ne collectons pas intentionnellement de données à caractère personnel sensibles (telles que les données révélant l'origine raciale ou ethnique, les opinions politiques, les convictions religieuses ou philosophiques, l'appartenance syndicale, les données génétiques, les données biométriques, les données de santé ou les données concernant la vie sexuelle ou l'orientation sexuelle) sans votre consentement explicite pour une ou plusieurs finalités déterminées, sauf lorsque le droit applicable l'autorise ou l'exige autrement.",
        ] },
        { heading: '15. Communications par Courriel et Désinscription', body: [
          { term: '(a) Communications Transactionnelles', desc: "Lorsque vous effectuez un don, soumettez un formulaire ou interagissez avec certaines fonctionnalités du Site, nous pouvons vous adresser des communications transactionnelles, y compris des reçus de don, des confirmations et des correspondances directement liées à votre interaction. Ces communications sont nécessaires au traitement de votre demande et ne peuvent faire l'objet d'une désinscription." },
          { term: '(b) Communications Institutionnelles', desc: "Avec votre consentement, nous pouvons vous adresser des infolettres, des mises à jour de programmes et d'autres communications institutionnelles. Vous pouvez vous désabonner de ces communications à tout moment en suivant les instructions de désabonnement qui y figurent ou en nous contactant à contact@gwags.org." },
          { term: '(c) Communications Administratives', desc: "Nous nous réservons le droit de vous adresser des communications administratives relatives au Site, à votre Compte ou à des modifications de nos politiques, dans la mesure permise par le droit applicable. Ces communications ne revêtent pas un caractère promotionnel et ne peuvent faire l'objet d'une désinscription." },
        ] },
        { heading: '16. Signaux « Do Not Track »', body: [
          "Le Site ne répond pas actuellement aux signaux Do Not Track, en l'absence de norme universellement reconnue en la matière. Vous pouvez néanmoins gérer vos préférences en matière de cookies comme décrit à la Section 5(c) et vous opposer aux services d'analyse tiers comme décrit à la Section 5(d). À mesure que les normes du secteur évolueront, nous réexaminerons cette pratique et mettrons à jour la présente Politique en conséquence, le cas échéant.",
        ] },
        { heading: '17. Contenu Multilingue', body: [
          "La présente Politique est disponible en anglais et en français. Les traductions sont fournies pour la commodité des utilisateurs. En cas d'incohérence entre les versions anglaise et française de la présente Politique, la version anglaise prévaut et fait foi.",
        ] },
        { heading: '18. Modifications de la Présente Politique', body: [
          "Gwags se réserve le droit de modifier, de compléter ou de remplacer la présente Politique à tout moment. Les modifications prennent effet dès leur publication sur le Site, accompagnées d'une date de « Dernière mise à jour » actualisée. En cas de modification substantielle, nous publierons un avis bien visible sur le Site. Votre utilisation continue du Site après de telles modifications vaut acceptation de la Politique révisée.",
        ] },
        { heading: '19. Contact', body: [
          "Pour toute question, préoccupation ou demande relative à la présente Politique ou à vos données à caractère personnel, veuillez contacter notre Correspondant Confidentialité des Données :",
          "Gwags Institution d'Impact Global",
          { term: 'E-mail', desc: 'contact@gwags.org' },
          { term: 'Pour toute question de confidentialité relative aux dons', desc: 'donate@gwags.org' },
        ] },
      ],
    },
  },
}