import { reverseTransformNote, transformNote } from './NoteTransformer'
import { rootNoteLetters } from './NotePlayer'
import { noteMap } from './NoteMap'

/**
 * Get's whole steps offset for major distances
 *
 * @param {number} distance
 * @returns {number}
 */
const getOffsetForMajorDistances = (distance) => {
  if (distance <= 3) return 0
  if (distance <= 7) return 1
  if (distance <= 12) return 2

  return 3
}

/**
 * Calculate amount of half steps to walk to reach the note.
 *
 * @param {string} type
 * @param {number} distance
 * @returns {number}
 */
const calculateHalfSteps = ({ type, distance }) => {
  if (distance > 15) throw new Error('Cannot calculate distances bigger than 15')

  if (type === 'octave') return 0

  if (type === 'major') return (distance - 1) * 2 - getOffsetForMajorDistances(distance)

  if (type === 'minor') return calculateHalfSteps({ type: 'major', distance }) - 1

  if (type === 'tritone') return calculateHalfSteps({ type: 'major', distance: 2 }) * 3

  if (type === 'augmented') return calculateHalfSteps({ type: 'perfect', distance }) + 1

  if (type === 'perfect') {
    switch (distance) {
      case 4: return 5
      case 5: return 7
      case 11: return 17
      case 15: return 24
      default: throw new Error(`Cannot calculate perfect distance with number ${distance}`)
    }
  }

  throw new Error(`Did not recognize interval with type "${type}" and number ${distance}`)
}

/**
 * Get note letter (with sharp and flat considered)
 *
 * @param {string} baseNoteLetter
 * @param {number} halfSteps
 * @param {number} intervalDistance
 */
const getIntervalInfo = (baseNoteLetter, halfSteps, intervalDistance) => {
  const baseRootNoteIndex = rootNoteLetters.indexOf(baseNoteLetter.charAt(0))
  const intervalRootNoteLetterIndex = baseRootNoteIndex + (intervalDistance - 1)
  const intervalRootNoteLetter = rootNoteLetters[(intervalRootNoteLetterIndex) % 7]

  const halfStepsFromC = (noteMap[baseNoteLetter].halfStepIndex + halfSteps) % 12

  return {
    letter: Object.keys(noteMap).filter(
      letter => letter.startsWith(intervalRootNoteLetter)
      && noteMap[letter].halfStepIndex === halfStepsFromC
    )[0],
    octave: Math.floor(intervalRootNoteLetterIndex / 7),
  }
}

/**
 * Return distance for intervals which do not have to specify it
 *
 * @param {string} type
 * @param {number|undefined} distance
 * @returns {number}
 */
const adjustDistanceForSpecialIntervals = (type, distance) => {
  if (type === 'octave') return 1
  if (type === 'tritone') return 4

  return distance
}

/**
 * Calculate intervals by providing a base note and intervals.
 *
 * @param {string} baseNote
 * @param {array} intervals
 *
 * @return {array} Array of notes
 */
export const getIntervals = (baseNote, intervals) => {
  const [baseNoteLetter, baseNoteOctave] = reverseTransformNote(baseNote)

  return intervals.map(interval => {
    const { type, octave = 0 } = interval
    const halfStepsDistance = calculateHalfSteps(interval)

    const shortestHalfSteps = halfStepsDistance % 12
    const distance = adjustDistanceForSpecialIntervals(type, interval.distance)

    const { letter: intervalLetter, octave: moreOctaveToAdd, } = getIntervalInfo(
      baseNoteLetter,
      shortestHalfSteps,
      distance,
    )

    const octaveToAdd = octave + moreOctaveToAdd
    const intervalOctave = baseNoteOctave + octaveToAdd

    if (!intervalOctave || !intervalLetter) {
        throw new Error(
          `Could not define interval for ${type} - ${distance} with base ${baseNote}`,
        )
    }

    return transformNote(intervalLetter, intervalOctave)
  })
}
