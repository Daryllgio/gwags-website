'use client'
import { useRef, useState } from 'react'

interface FileUploadFieldProps {
  id?: string
  file: File | null
  onChange: (file: File | null) => void
  /** Comma-separated extensions, e.g. ".pdf,.doc,.docx,.jpg,.jpeg,.png" */
  accept: string
  formatsLabel: string
  maxSizeBytes: number
  maxSizeLabel: string
  chooseLabel: string
  removeLabel: string
  invalidTypeError: string
  tooLargeError: string
  error?: boolean
}

export default function FileUploadField({
  id, file, onChange, accept, formatsLabel, maxSizeBytes, maxSizeLabel,
  chooseLabel, removeLabel, invalidTypeError, tooLargeError, error,
}: FileUploadFieldProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [localError, setLocalError] = useState('')

  const acceptedExts = accept.split(',').map(s => s.trim().toLowerCase())

  function handleFile(f: File | null) {
    setLocalError('')
    if (!f) {
      onChange(null)
      return
    }
    const ext = f.name.slice(f.name.lastIndexOf('.')).toLowerCase()
    if (!acceptedExts.includes(ext)) {
      setLocalError(invalidTypeError)
      onChange(null)
      if (inputRef.current) inputRef.current.value = ''
      return
    }
    if (f.size > maxSizeBytes) {
      setLocalError(tooLargeError)
      onChange(null)
      if (inputRef.current) inputRef.current.value = ''
      return
    }
    onChange(f)
  }

  return (
    <div className="fuf-wrap">
      <input
        ref={inputRef}
        id={id}
        type="file"
        accept={accept}
        className="fuf-native-input"
        onChange={e => handleFile(e.target.files?.[0] ?? null)}
      />
      <div className="fuf-row">
        <button
          type="button"
          className="fuf-choose-btn"
          style={error ? { borderColor: '#c0392b' } : undefined}
          onClick={() => inputRef.current?.click()}
        >
          {chooseLabel}
        </button>
        {file && (
          <div className="fuf-filename">
            <span className="fuf-filename-text">{file.name}</span>
            <button type="button" className="fuf-remove" onClick={() => handleFile(null)} aria-label={removeLabel}>×</button>
          </div>
        )}
      </div>
      <p className="fuf-meta">{formatsLabel} · {maxSizeLabel}</p>
      {localError && <p className="form-field-error" style={{ color: '#c0392b', fontSize: '13px', margin: '4px 0 0' }}>{localError}</p>}
    </div>
  )
}
