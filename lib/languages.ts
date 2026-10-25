import ISO6391 from 'iso-639-1'

/* Language option list for the volunteer form's "Languages spoken"
   multi-select. Built from the iso-639-1 package so the full ISO 639-1 set
   stays in sync with the package rather than a hand-maintained copy. Values
   stored in form state / submitted to the API are the English language names
   (the package's canonical `getName` output), matching how every other form
   option list stores an English canonical string. The package provides only
   English names, so the same label is shown in both languages. */

const PINNED = ['English', 'French']

export const VOLUNTEER_LANGUAGES: string[] = (() => {
  const all = ISO6391.getAllNames().slice().sort((a, b) => a.localeCompare(b))
  const rest = all.filter(name => !PINNED.includes(name))
  return [...PINNED, ...rest]
})()
