'use client'
import { useState } from 'react'
import { Lang } from '@/lib/translations'
import EventDetailPage, { EventDetailData } from '@/components/EventDetailPage'

const content: Record<string, Record<Lang, EventDetailData>> = {
  'camesa-nguti-health-campaign': {
    en: {
      heroTitle: 'CAMESA Nguti Health Campaign',
      sections: [
        {
          heading: 'About the grant',
          body: 'The CAMESA Nguti Health Campaign is the first initiative to receive funding through the Mbal Lekeaka Fund. The Cameroon English Speaking Medical Students\' Association (CAMESA), a medical students\' association with over two decades of experience organizing health campaigns across Cameroon, submitted a proposal to deliver free healthcare services to the Nguti Health District in the South West Region. After review, Gwags approved funding to support the campaign\'s operational and medical supply needs.\n\nThe grant demonstrates the core function of the Mbal Lekeaka Fund: identifying community-led initiatives with clear objectives and operational capacity, and providing the financial support needed to bring them to execution. CAMESA\'s track record of delivering health campaigns across 30 health districts over 23 years made it a strong fit for the fund\'s first allocation.',
        },
        {
          heading: 'Grant details',
          detailGrid: [
            { label: 'Recipient', text: 'CAMESA' },
            { label: 'Initiative', text: 'Nguti Health Campaign' },
            { label: 'Location', text: 'Nguti Health District, South West Region' },
            { label: 'Year', text: '2026' },
          ],
        },
      ],
      gallery: { heading: 'Gallery', count: 10 },
    },
    fr: {
      heroTitle: 'Campagne de Santé CAMESA Nguti',
      sections: [
        {
          heading: 'À propos de la subvention',
          body: 'La Campagne de Santé CAMESA Nguti est la première initiative à recevoir un financement à travers le Fonds Mbal Lekeaka. L\'Association des Étudiants en Médecine Anglophones du Cameroun (CAMESA), une association d\'étudiants en médecine avec plus de deux décennies d\'expérience dans l\'organisation de campagnes de santé à travers le Cameroun, a soumis une proposition pour fournir des services de santé gratuits au District de Santé de Nguti dans la Région du Sud-Ouest. Après examen, Gwags a approuvé le financement pour soutenir les besoins opérationnels et en fournitures médicales de la campagne.\n\nLa subvention démontre la fonction centrale du Fonds Mbal Lekeaka: identifier les initiatives communautaires avec des objectifs clairs et une capacité opérationnelle, et fournir le soutien financier nécessaire pour les mener à exécution. Le bilan de CAMESA dans la livraison de campagnes de santé à travers 30 districts de santé sur 23 ans en a fait un choix solide pour la première allocation du fonds.',
        },
        {
          heading: 'Détails de la subvention',
          detailGrid: [
            { label: 'Bénéficiaire', text: 'CAMESA' },
            { label: 'Initiative', text: 'Campagne de Santé de Nguti' },
            { label: 'Lieu', text: 'District de Santé de Nguti, Région du Sud-Ouest' },
            { label: 'Année', text: '2026' },
          ],
        },
      ],
      gallery: { heading: 'Galerie', count: 10 },
    },
  },
}

export default function MbalEventPage({ params }: { params: { slug: string } }) {
  const [lang, setLang] = useState<Lang>('en')
  const toggleLang = () => setLang(l => l === 'en' ? 'fr' : 'en')
  const page = content[params.slug]
  if (!page) return null
  return <EventDetailPage lang={lang} onToggleLang={toggleLang} data={page[lang]} />
}
