export const transformNote = (letter, octave) => `${letter}_${octave}`

export const reverseTransformNote = note => {
  const [letter, octave] = note.split('_')

  return [letter, parseInt(octave, 10)]
}

export const formatLetter = letter => letter
  .replace('Sharp', '#')
  .replace('Flat', '♭')
  .toUpperCase()
