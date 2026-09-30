'use client'
import SearchableDropdown from './SearchableDropdown'
import { SOCIAL_PLATFORMS } from '@/lib/formOptions'

export interface SocialRow {
  platform: string
  url: string
}

interface SocialMediaRowsProps {
  rows: SocialRow[]
  onChange: (rows: SocialRow[]) => void
  addLabel: string
  removeLabel: string
  platformPlaceholder: string
  urlPlaceholder: string
  noMatchesText?: string
  max?: number
}

export default function SocialMediaRows({ rows, onChange, addLabel, removeLabel, platformPlaceholder, urlPlaceholder, noMatchesText = 'No matches', max = 4 }: SocialMediaRowsProps) {
  const usedPlatforms = new Set(rows.map(r => r.platform).filter(Boolean))

  function updateRow(i: number, patch: Partial<SocialRow>) {
    onChange(rows.map((r, idx) => idx === i ? { ...r, ...patch } : r))
  }

  function addRow() {
    if (rows.length >= max) return
    onChange([...rows, { platform: '', url: '' }])
  }

  function removeRow(i: number) {
    onChange(rows.filter((_, idx) => idx !== i))
  }

  return (
    <div className="smr-wrap">
      {rows.map((row, i) => {
        const availableOptions = SOCIAL_PLATFORMS.filter(p => p === row.platform || !usedPlatforms.has(p))
        return (
          <div className="smr-row" key={i}>
            <div className="smr-platform">
              <SearchableDropdown
                searchable={false}
                options={availableOptions}
                value={row.platform}
                onChange={v => updateRow(i, { platform: v })}
                placeholder={platformPlaceholder}
                noMatchesText={noMatchesText}
              />
            </div>
            <input
              className="form-input smr-url"
              type="url"
              placeholder={urlPlaceholder}
              value={row.url}
              onChange={e => updateRow(i, { url: e.target.value })}
            />
            {i > 0 && (
              <button type="button" className="smr-remove" onClick={() => removeRow(i)} aria-label={removeLabel}>×</button>
            )}
          </div>
        )
      })}
      {rows.length < max && (
        <button type="button" className="smr-add" onClick={addRow}>+ {addLabel}</button>
      )}
    </div>
  )
}
