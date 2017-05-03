import { scale as ionianScale } from './scales/IonianScale'
import { scale as aeolianScale } from './scales/AeolianScale'
import { reverseTransformNote, transformNote } from './NoteTransformer'
import { getIntervals } from './IntervalCalculator'

const scales = {
  major: ionianScale,
  minor: aeolianScale,

  ionian: ionianScale,
  aeolian: aeolianScale,
}

const retrieveNote = (letter, octave, degree, scaleIntervals) => {
  const scaleIntervalIndex = (degree - 1) % scaleIntervals.length
  const interval = scaleIntervals[scaleIntervalIndex]

  const note = transformNote(letter, octave + Math.floor((degree - 1) / scaleIntervals.length))
  return getIntervals(note, [interval])[0]
}

export const scale = (letter, scaleKey = 'major') => {
  const scaleIntervals = scales[scaleKey]

  if (!scaleIntervals) {
    throw new Error(`Scale "${scaleKey}" not recognized`)
  }

  const degrees = getIntervals(transformNote(letter, 4), scaleIntervals)
    .map(n => reverseTransformNote(n)[0])

  return {
    getDegree: (indexPlusOne) => degrees[indexPlusOne - 1],
    getDegrees: () => degrees,
    base: octave => ({
      note: degree => retrieveNote(letter, octave, degree, scaleIntervals),
      notes: degrees => degrees.map(d => retrieveNote(letter, octave, d, scaleIntervals)),
    })
  }
}
