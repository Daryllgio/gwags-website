'use client'
import SearchableDropdown from './SearchableDropdown'
import { getStatesForCountry } from '@/lib/locations'

interface RegionStateFieldProps {
  country: string
  value: string
  onChange: (v: string) => void
  error?: boolean
  id?: string
  searchPlaceholder: string
  noMatchesText: string
  textPlaceholder?: string
  /** Shown (and the field disabled) while no country is selected yet. */
  disabledPlaceholder: string
}

/** Disabled with `disabledPlaceholder` until a country is selected. Once one
 * is, renders a searchable dropdown of states/provinces when country-state-city
 * has subdivision data for it, otherwise falls back to a free-text input
 * (small countries/city-states have no subdivisions). Keyed by `country` so
 * switching countries always remounts fresh — clearing any typed search text
 * left over from the previous country rather than carrying it forward. */
export default function RegionStateField({ country, value, onChange, error, id, searchPlaceholder, noMatchesText, textPlaceholder, disabledPlaceholder }: RegionStateFieldProps) {
  if (!country) {
    return (
      <SearchableDropdown
        key="__no_country__"
        id={id}
        options={[]}
        value=""
        onChange={() => {}}
        disabled
        placeholder={disabledPlaceholder}
        noMatchesText={noMatchesText}
      />
    )
  }

  const states = getStatesForCountry(country)

  if (states.length > 0) {
    return (
      <SearchableDropdown
        key={country}
        id={id}
        options={states}
        value={value}
        onChange={onChange}
        error={error}
        placeholder={searchPlaceholder}
        noMatchesText={noMatchesText}
      />
    )
  }

  return (
    <input
      key={country}
      id={id}
      className="form-input"
      type="text"
      value={value}
      onChange={e => onChange(e.target.value)}
      placeholder={textPlaceholder}
      style={error ? { borderColor: '#c0392b' } : undefined}
    />
  )
}
