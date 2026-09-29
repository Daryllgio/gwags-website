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
}

/** Renders a searchable dropdown of states/provinces when country-state-city
 * has subdivision data for the selected country, otherwise falls back to a
 * free-text input (small countries/city-states have no subdivisions). */
export default function RegionStateField({ country, value, onChange, error, id, searchPlaceholder, noMatchesText, textPlaceholder }: RegionStateFieldProps) {
  const states = country ? getStatesForCountry(country) : []

  if (states.length > 0) {
    return (
      <SearchableDropdown
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
