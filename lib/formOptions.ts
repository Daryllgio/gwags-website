// Shared option lists for the application/affiliation forms. Follows the same
// pattern as lib/countries.ts: the canonical value stored in form state and
// submitted to the API/emails is always the English string; a separate FR
// map supplies the localized label shown to French-language visitors.

export const FUND_SECTORS = [
  'Health', 'Education', 'Economic Opportunity', 'Community Development', 'Youth Empowerment',
  'Environment & Climate', 'Agriculture', 'Water & Sanitation', 'Disability & Inclusion',
  'Food Security & Nutrition', 'Arts & Culture', 'Gender Equality', 'Humanitarian Aid',
  'Human Rights & Social Justice', 'Peace & Social Cohesion', 'Other',
]

export const FUND_SECTOR_LABELS_FR: Record<string, string> = {
  'Health': 'Santé',
  'Education': 'Éducation',
  'Economic Opportunity': 'Opportunités économiques',
  'Community Development': 'Développement communautaire',
  'Youth Empowerment': 'Autonomisation des jeunes',
  'Environment & Climate': 'Environnement et climat',
  'Agriculture': 'Agriculture',
  'Water & Sanitation': 'Eau et assainissement',
  'Disability & Inclusion': 'Handicap et inclusion',
  'Food Security & Nutrition': 'Sécurité alimentaire et nutrition',
  'Arts & Culture': 'Arts et culture',
  'Gender Equality': 'Égalité des genres',
  'Humanitarian Aid': 'Aide humanitaire',
  'Human Rights & Social Justice': 'Droits humains et justice sociale',
  'Peace & Social Cohesion': 'Consolidation de la paix et cohésion sociale',
  'Other': 'Autre',
}

export const SOCIAL_PLATFORMS = ['Facebook', 'LinkedIn', 'X', 'Instagram']

// Ranges are the same literal text in both languages, so no _LABELS_FR map is needed.
export const ORGANIZATION_SIZE = ['1-10', '11-50', '51-100', '101-300', '300-500', '500-750', '750-1000', '1000-3000', '3000-5000', '5000+']

export const YEAR_OF_STUDY = ['1st Year', '2nd Year', '3rd Year', '4th Year', '5th Year or above']

export const YEAR_OF_STUDY_LABELS_FR: Record<string, string> = {
  '1st Year': '1re année',
  '2nd Year': '2e année',
  '3rd Year': '3e année',
  '4th Year': '4e année',
  '5th Year or above': '5e année ou plus',
}

export const SCHOLARS_REFERRAL = ['Social media', 'Your university', 'Friend or family', 'Gwags website', 'Other']

export const SCHOLARS_REFERRAL_LABELS_FR: Record<string, string> = {
  'Social media': 'Réseaux sociaux',
  'Your university': 'Votre université',
  'Friend or family': 'Ami ou famille',
  'Gwags website': 'Site web de Gwags',
  'Other': 'Autre',
}

export const FUND_REFERRAL = ['Social media', 'Partner organization', 'Gwags website', 'Other']

export const FUND_REFERRAL_LABELS_FR: Record<string, string> = {
  'Social media': 'Réseaux sociaux',
  'Partner organization': 'Organisation partenaire',
  'Gwags website': 'Site web de Gwags',
  'Other': 'Autre',
}

export const NETWORK_REFERRAL = ['Social media', 'Partner organization', 'Gwags website', 'Gwags team member', 'Other']

export const NETWORK_REFERRAL_LABELS_FR: Record<string, string> = {
  'Social media': 'Réseaux sociaux',
  'Partner organization': 'Organisation partenaire',
  'Gwags website': 'Site web de Gwags',
  'Gwags team member': "Membre de l'équipe Gwags",
  'Other': 'Autre',
}
