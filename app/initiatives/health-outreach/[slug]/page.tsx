'use client'
import { useLang } from '@/lib/useLang'
import { Lang } from '@/lib/translations'
import EventDetailPage, { EventDetailData } from '@/components/EventDetailPage'

const content: Record<string, Record<Lang, EventDetailData>> = {
  'nguti-health-campaign': {
    en: {
      heroTitle: 'Nguti Health Campaign',
      heroImage: '/images/health-outreach/nguti-health-campaign/2T8A1064.jpg',
      heroImagePosition: '50% 85%',
      sections: [
        {
          heading: 'About the campaign',
          body: 'The Nguti Health Campaign was a week-long medical outreach organized in the Nguti Health District, located in the Kupe Manenguba Division of Cameroon\'s South West Region. Delivered in partnership with several organizations, including the Ministry of Public Health of Cameroon and the Cameroon English Speaking Medical Students\' Association (CAMESA), the campaign brought together over 120 medical professionals to deliver free healthcare services to an underserved population of approximately 1,700 people across 11 communities.\n\nGwags supported the campaign through the Mbal Lekeaka Fund, its grant program channeling resources into community-led initiatives. The Nguti Health District\'s remote location and limited medical infrastructure make it one of the areas where this type of intervention is needed most.',
        },
        {
          heading: 'Campaign details',
          detailGridCompact: true,
          detailGrid: [
            { label: 'Location', text: 'Nguti Health District, South West Region, Cameroon' },
            { label: 'Delivered by', text: 'CAMESA' },
            { label: 'Duration', text: 'One week' },
            { label: 'Services', text: 'Medical and dental consultations, surgical interventions, ophthalmology consultations, laboratory screenings, and community health education', fullWidth: true },
          ],
        },
      ],
      stats: {
        heading: 'Our impact',
        subheading: 'Impact numbers from the Nguti Health Campaign.',
        items: [
          { value: '1,700+', label: 'beneficiaries targeted' },
          { value: '120+', label: 'medical professionals deployed' },
        ],
      },
      gallery: {
        heading: 'Gallery',
        count: 17,
        images: [
          '/images/health-outreach/nguti-health-campaign/2T8A1068.jpg',
          '/images/health-outreach/nguti-health-campaign/2T8A1061.jpg',
          '/images/health-outreach/nguti-health-campaign/2T8A0972.jpg',
          '/images/health-outreach/nguti-health-campaign/2T8A0662.jpg',
          '/images/health-outreach/nguti-health-campaign/2T8A0741.jpg',
          '/images/health-outreach/nguti-health-campaign/2T8A0872.jpg',
          '/images/health-outreach/nguti-health-campaign/2T8A0939.jpg',
          '/images/health-outreach/nguti-health-campaign/2T8A1049.jpg',
          '/images/health-outreach/nguti-health-campaign/2T8A0635.jpg',
          '/images/health-outreach/nguti-health-campaign/2T8A0982.jpg',
          '/images/health-outreach/nguti-health-campaign/2T8A1080.jpg',
          '/images/health-outreach/nguti-health-campaign/2T8A0447.jpg',
          '/images/health-outreach/nguti-health-campaign/2T8A1023.jpg',
          '/images/health-outreach/nguti-health-campaign/2T8A0574.jpg',
          '/images/health-outreach/nguti-health-campaign/2T8A0374.jpg',
          '/images/health-outreach/nguti-health-campaign/2T8A1056.jpg',
          '/images/health-outreach/nguti-health-campaign/2T8A1031.jpg',
        ],
      },
    },
    fr: {
      heroTitle: 'Campagne de Santé de Nguti',
      heroImage: '/images/health-outreach/nguti-health-campaign/2T8A1064.jpg',
      heroImagePosition: '50% 85%',
      sections: [
        {
          heading: 'À propos de la campagne',
          body: 'La Campagne de Santé de Nguti était une mission médicale d\'une semaine organisée dans le District de Santé de Nguti, situé dans le Département de la Kupe Manenguba, Région du Sud-Ouest du Cameroun. Réalisée en partenariat avec plusieurs organisations, dont le Ministère de la Santé Publique du Cameroun et la Cameroon English Speaking Medical Students\' Association (CAMESA), la campagne a rassemblé plus de 120 professionnels de santé pour fournir des services de santé gratuits à une population mal desservie d\'environ 1 700 personnes à travers 11 communautés.\n\nGwags a soutenu la campagne à travers le Fonds Mbal Lekeaka, son programme de subventions qui canalise des ressources vers des initiatives communautaires. L\'emplacement isolé du District de Santé de Nguti et son infrastructure médicale limitée en font l\'une des zones où ce type d\'intervention est le plus nécessaire.',
        },
        {
          heading: 'Détails de la campagne',
          detailGridCompact: true,
          detailGrid: [
            { label: 'Lieu', text: 'District de Santé de Nguti, Région du Sud-Ouest, Cameroun' },
            { label: 'Réalisé par', text: 'CAMESA' },
            { label: 'Durée', text: 'Une semaine' },
            { label: 'Services', text: 'Consultations médicales et dentaires, interventions chirurgicales, consultations en ophtalmologie, dépistages en laboratoire et éducation sanitaire communautaire', fullWidth: true },
          ],
        },
      ],
      stats: {
        heading: 'Notre impact',
        subheading: 'Chiffres d\'impact de la Campagne de Santé de Nguti.',
        items: [
          { value: '1 700+', label: 'bénéficiaires ciblés' },
          { value: '120+', label: 'professionnels de santé déployés' },
        ],
      },
      gallery: {
        heading: 'Galerie',
        count: 17,
        images: [
          '/images/health-outreach/nguti-health-campaign/2T8A1068.jpg',
          '/images/health-outreach/nguti-health-campaign/2T8A1061.jpg',
          '/images/health-outreach/nguti-health-campaign/2T8A0972.jpg',
          '/images/health-outreach/nguti-health-campaign/2T8A0662.jpg',
          '/images/health-outreach/nguti-health-campaign/2T8A0741.jpg',
          '/images/health-outreach/nguti-health-campaign/2T8A0872.jpg',
          '/images/health-outreach/nguti-health-campaign/2T8A0939.jpg',
          '/images/health-outreach/nguti-health-campaign/2T8A1049.jpg',
          '/images/health-outreach/nguti-health-campaign/2T8A0635.jpg',
          '/images/health-outreach/nguti-health-campaign/2T8A0982.jpg',
          '/images/health-outreach/nguti-health-campaign/2T8A1080.jpg',
          '/images/health-outreach/nguti-health-campaign/2T8A0447.jpg',
          '/images/health-outreach/nguti-health-campaign/2T8A1023.jpg',
          '/images/health-outreach/nguti-health-campaign/2T8A0574.jpg',
          '/images/health-outreach/nguti-health-campaign/2T8A0374.jpg',
          '/images/health-outreach/nguti-health-campaign/2T8A1056.jpg',
          '/images/health-outreach/nguti-health-campaign/2T8A1031.jpg',
        ],
      },
    },
  },
}

export default function HealthEventPage({ params }: { params: { slug: string } }) {
  const [lang, toggleLang] = useLang()
  const page = content[params.slug]
  if (!page) return null
  return <EventDetailPage lang={lang} onToggleLang={toggleLang} data={page[lang]} />
}
