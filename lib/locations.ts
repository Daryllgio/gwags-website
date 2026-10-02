import { Country, State } from 'country-state-city'
import { COUNTRIES } from './countries'

/* Bridges our curated COUNTRIES list (plain English names, used everywhere
   for display/value consistency) to country-state-city's ISO2 codes, which
   are required to look up states/regions. Most names match directly; the
   handful that don't (different official-name conventions between the two
   lists) are corrected here by ISO code rather than by renaming either
   list, so COUNTRIES stays the single source of truth for what's shown and
   submitted. */

const NAME_TO_ISO = new Map(Country.getAllCountries().map(c => [c.name, c.isoCode]))

const ISO_OVERRIDES: Record<string, string> = {
  'Antigua and Barbuda': 'AG',
  'Bahamas': 'BS',
  'Cabo Verde': 'CV',
  'Congo (Republic)': 'CG',
  'Congo (Democratic Republic)': 'CD',
  'Eswatini': 'SZ',
  'Fiji': 'FJ',
  'Gambia': 'GM',
  'North Macedonia': 'MK',
  'Palestine': 'PS',
  'Papua New Guinea': 'PG',
  'Saint Kitts and Nevis': 'KN',
  'Saint Vincent and the Grenadines': 'VC',
  'São Tomé and Príncipe': 'ST',
  'Timor-Leste': 'TL',
  'Trinidad and Tobago': 'TT',
  'Vatican City': 'VA',
}

const COUNTRY_ISO: Record<string, string> = {}
for (const name of COUNTRIES) {
  COUNTRY_ISO[name] = ISO_OVERRIDES[name] ?? NAME_TO_ISO.get(name) ?? ''
}

/** States/provinces/regions for a country from our COUNTRIES list. Returns
 * an empty array for countries country-state-city has no subdivisions for
 * (e.g. small city-states) — callers should fall back to a free-text field
 * in that case rather than showing an empty dropdown. */
export function getStatesForCountry(countryName: string): string[] {
  const iso = COUNTRY_ISO[countryName]
  if (!iso) return []
  return State.getStatesOfCountry(iso).map(s => s.name)
}

const COUNTRY_DIAL_CODE: Record<string, string> = {}
for (const name of COUNTRIES) {
  const iso = COUNTRY_ISO[name]
  const phonecode = iso ? Country.getCountryByCode(iso)?.phonecode : undefined
  // country-state-city's phonecode is inconsistent: most countries give a bare
  // number ('237'), but some NANP members already include the '+' and an area
  // code ('+1-268' for Antigua) — strip any existing '+' before adding our own
  // so every result has exactly one.
  COUNTRY_DIAL_CODE[name] = phonecode ? `+${phonecode.replace(/^\+/, '')}` : ''
}

/** International calling code (e.g. '+237') for a country in our COUNTRIES
 * list, or '' if unknown. */
export function getDialCode(countryName: string): string {
  return COUNTRY_DIAL_CODE[countryName] ?? ''
}
