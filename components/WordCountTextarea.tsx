'use client'

function countWords(str: string): number {
  const trimmed = str.trim()
  return trimmed === '' ? 0 : trimmed.split(/\s+/).length
}

interface WordCountTextareaProps {
  value: string
  onChange: (v: string) => void
  /** Omit for an open-ended field: shows a live count with no cap enforced. */
  maxWords?: number
  placeholder?: string
  id?: string
  required?: boolean
  rows?: number
  wordsLabel: string
  error?: boolean
}

export default function WordCountTextarea({ value, onChange, maxWords, placeholder, id, required, rows = 5, wordsLabel, error }: WordCountTextareaProps) {
  const count = countWords(value)

  function handleChange(next: string) {
    if (maxWords === undefined || countWords(next) <= maxWords || next.length < value.length) {
      onChange(next)
    }
  }

  return (
    <>
      <textarea
        id={id}
        required={required}
        className="form-input form-textarea"
        placeholder={placeholder}
        value={value}
        onChange={e => handleChange(e.target.value)}
        rows={rows}
        style={error ? { borderColor: '#c0392b' } : undefined}
      />
      <p className="form-char-count">{maxWords !== undefined ? `${count} / ${maxWords} ${wordsLabel}` : `${count} ${wordsLabel}`}</p>
    </>
  )
}
