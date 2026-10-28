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

// ── Volunteer application options ──

export const VOLUNTEER_GENDER = ['Woman', 'Man', 'Prefer not to say']

export const VOLUNTEER_GENDER_LABELS_FR: Record<string, string> = {
  'Woman': 'Femme',
  'Man': 'Homme',
  'Prefer not to say': 'Je préfère ne pas répondre',
}

export const VOLUNTEER_STATUS = ['Student', 'Employed', 'Self-employed', 'Unemployed', 'Other']

export const VOLUNTEER_STATUS_LABELS_FR: Record<string, string> = {
  'Student': 'Étudiant(e)',
  'Employed': 'Salarié(e)',
  'Self-employed': 'Travailleur(se) indépendant(e)',
  'Unemployed': 'Sans emploi',
  'Other': 'Autre',
}

export const VOLUNTEER_AVAILABILITY = ['5 to 10 hours', '11 to 15 hours', '16 to 20 hours', 'More than 20 hours']

export const VOLUNTEER_AVAILABILITY_LABELS_FR: Record<string, string> = {
  '5 to 10 hours': '5 à 10 heures',
  '11 to 15 hours': '11 à 15 heures',
  '16 to 20 hours': '16 à 20 heures',
  'More than 20 hours': 'Plus de 20 heures',
}

export const VOLUNTEER_REFERRAL = ['Social media', 'University', 'Friend or family', 'Gwags website', 'Partner organization', 'Other']

export const VOLUNTEER_REFERRAL_LABELS_FR: Record<string, string> = {
  'Social media': 'Réseaux sociaux',
  'University': 'Université',
  'Friend or family': 'Proche',
  'Gwags website': 'Site web de Gwags',
  'Partner organization': 'Organisation partenaire',
  'Other': 'Autre',
}

// Flat alphabetical list of volunteer skills (English canonical value →
// French label), with "Other" pinned last so its reveal-a-text-field
// behavior reads naturally at the bottom of the list.
export const VOLUNTEER_SKILLS = [
  'Accounting and Financial Management', 'Administrative Support', 'Community Health Education',
  'Content Creation and Copywriting', 'Data Collection and Analysis', 'Event Planning and Coordination',
  'Fundraising', 'Grant Writing', 'Graphic Design', 'Healthcare Services', 'Human Resources',
  'Legal Research', 'Partnership Development', 'Photography', 'Policy Research and Analysis',
  'Program Coordination', 'Public Relations and Media Outreach', 'Report Writing',
  'Social Media Management', 'Translation and Interpretation', 'UX/UI Design',
  'Video Production and Editing', 'Web Development', 'Workshop Facilitation', 'Other',
]

export const VOLUNTEER_SKILL_LABELS_FR: Record<string, string> = {
  'Accounting and Financial Management': 'Comptabilité et gestion financière',
  'Administrative Support': 'Soutien administratif',
  'Community Health Education': 'Éducation communautaire en santé',
  'Content Creation and Copywriting': 'Création de contenu et rédaction',
  'Data Collection and Analysis': 'Collecte et analyse de données',
  'Event Planning and Coordination': "Planification et coordination d'événements",
  'Fundraising': 'Collecte de fonds',
  'Grant Writing': 'Rédaction de demandes de subvention',
  'Graphic Design': 'Design graphique',
  'Healthcare Services': 'Services de santé',
  'Human Resources': 'Ressources humaines',
  'Legal Research': 'Recherche juridique',
  'Partnership Development': 'Développement de partenariats',
  'Photography': 'Photographie',
  'Policy Research and Analysis': 'Recherche et analyse de politiques publiques',
  'Program Coordination': 'Coordination de programmes',
  'Public Relations and Media Outreach': 'Relations publiques et relations avec les médias',
  'Report Writing': 'Rédaction de rapports',
  'Social Media Management': 'Gestion des réseaux sociaux',
  'Translation and Interpretation': 'Traduction et interprétation',
  'UX/UI Design': 'Conception UX/UI',
  'Video Production and Editing': 'Production et montage vidéo',
  'Web Development': 'Développement web',
  'Workshop Facilitation': "Animation d'ateliers",
  'Other': 'Autre',
}
