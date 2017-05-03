import { range, flatMap } from 'lodash'
import { transformNote } from './NoteTransformer'
import { noteMap } from './NoteMap'

export const rootNoteLetters = Object.keys(noteMap).filter(note => note.length === 1)

const notePlayLengthMs = 2000
const octavePlayLength = notePlayLengthMs * 12

const getSingleNoteSpriteData = (letter, octave) => {
  return [
    { key: letter, start: calculateNoteStart(letter, octave) }
  ]
}

export const calculateNoteStart = (letter, octave) => (
  (octave - 1) * octavePlayLength + noteMap[letter].spriteNoteStart * notePlayLengthMs
)

const noteSpriteData = range(1, 9).reduce((acc, octaveNum) => {
  const singleNotes = flatMap(
    Object.keys(noteMap),
    noteLetter => getSingleNoteSpriteData(noteLetter, octaveNum),
  )

  return {
    ...acc,
    ...singleNotes.reduce((noteAcc, noteData) => ({
      ...noteAcc,
      [transformNote(noteData.key, octaveNum)]: [noteData.start, 2000],
    }), {})
  }
}, {})

export const getNoteSpriteData = () => noteSpriteData
