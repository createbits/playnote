import {
  calculateNoteStart,
  getNoteSpriteData,
} from '../src/NoteSpriteCalculator'

test('note start to be validly calculated', () => {
  expect(calculateNoteStart('c', 1)).toBe(0)
  expect(calculateNoteStart('d', 1)).toBe(4000)
  expect(calculateNoteStart('c', 2)).toBe(24000)
  expect(calculateNoteStart('f', 1)).toBe(10000)
  expect(calculateNoteStart('f', 3)).toBe(58000)
  expect(calculateNoteStart('b', 3)).toBe(70000)
})

test('get note sprite data validly', () => {
  const spriteData = getNoteSpriteData()

  expect(spriteData['c_1'][0]).toBe(0)
  expect(spriteData['c_1'][1]).toBe(2000)

  expect(spriteData['cFlat_4'][0]).toBe(70000)
  expect(spriteData['cFlat_4'][1]).toBe(2000)

  expect(spriteData['eSharp_2'][0]).toBe(34000)
  expect(spriteData['eSharp_2'][1]).toBe(2000)

  expect(spriteData['f_2'][0]).toBe(34000)
  expect(spriteData['f_2'][1]).toBe(2000)
})
