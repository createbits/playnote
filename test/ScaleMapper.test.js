import { scale } from '../src/ScaleMapper'

test('default major scale', () => {
  expect(scale('d').getDegrees()).toEqual(
    ['d', 'e', 'fSharp', 'g', 'a', 'b', 'cSharp'],
  )
})

test('validly retrieves a single degree', () => {
  expect(scale('c').getDegree(1)).toEqual('c')
  expect(scale('c').getDegree(7)).toEqual('b')
  expect(scale('c', 'minor').getDegree(7)).toEqual('bFlat')
  expect(scale('c', 'minor').getDegree(5)).toEqual('g')
  expect(scale('c', 'ionian').getDegree(5)).toEqual('g')
  expect(scale('f', 'ionian').getDegree(4)).toEqual('bFlat')
  expect(scale('cSharp', 'minor').getDegree(3)).toEqual('e')
})

test('ionian / major scale', () => {
  expect(scale('c', 'ionian').getDegrees()).toEqual(
    ['c', 'd', 'e', 'f', 'g', 'a', 'b'],
  )
  expect(scale('c', 'major').getDegrees()).toEqual(
    ['c', 'd', 'e', 'f', 'g', 'a', 'b'],
  )
  expect(scale('f', 'ionian').getDegrees()).toEqual(
    ['f', 'g', 'a', 'bFlat', 'c', 'd', 'e'],
  )
  expect(scale('cSharp', 'major').getDegrees()).toEqual(
    ['cSharp', 'dSharp', 'eSharp', 'fSharp', 'gSharp', 'aSharp', 'bSharp'],
  )
  expect(scale('aFlat', 'major').getDegrees()).toEqual(
    ['aFlat', 'bFlat', 'c', 'dFlat', 'eFlat', 'f', 'g'],
  )
})

test('aeolian / minor scale', () => {
  expect(scale('c', 'minor').getDegrees()).toEqual(
    ['c', 'd', 'eFlat', 'f', 'g', 'aFlat', 'bFlat'],
  )
  expect(scale('a', 'aeolian').getDegrees()).toEqual(
    ['a', 'b', 'c', 'd', 'e', 'f', 'g'],
  )
  expect(scale('aFlat', 'minor').getDegrees()).toEqual(
    ['aFlat', 'bFlat', 'cFlat', 'dFlat', 'eFlat', 'fFlat', 'gFlat'],
  )
  expect(scale('bFlat', 'aeolian').getDegrees()).toEqual(
    ['bFlat', 'c', 'dFlat', 'eFlat', 'f', 'gFlat', 'aFlat'],
  )
})

test('retrieve note relatively to scale', () => {
  const cMinorScale = scale('c', 'minor')

  expect(cMinorScale.base(3).note(1)).toEqual('c_3')
  expect(cMinorScale.base(3).notes([1, 3, 5, 8, 9])).toEqual(
    ['c_3', 'eFlat_3', 'g_3', 'c_4', 'd_4'],
  )

  expect(scale('dSharp', 'minor').base(2).note(2)).toEqual('eSharp_2')

  expect(scale('dFlat', 'major').base(4).notes([1, 8, 9])).toEqual(
    ['dFlat_4', 'dFlat_5', 'eFlat_5'],
  )

  expect(scale('a', 'minor').base(4).notes([1, 2, 3, 4, 5, 6, 7, 8])).toEqual(
    ['a_4', 'b_4', 'c_5', 'd_5', 'e_5', 'f_5', 'g_5', 'a_5'],
  )

  expect(scale('g', 'major').base(3).notes([1, 4, 8, 11])).toEqual(
    ['g_3', 'c_4', 'g_4', 'c_5'],
  )
})

test('gregorian scales', () => {
  expect(scale('d', 'dorian').base(4).notes([1, 2, 3, 4, 5, 6, 7, 8])).toEqual(
    ['d_4', 'e_4', 'f_4', 'g_4', 'a_4', 'b_4', 'c_5', 'd_5'],
  )

  expect(scale('e', 'phrygian').base(4).notes([1, 2, 3, 4, 5, 6, 7, 8])).toEqual(
    ['e_4', 'f_4', 'g_4', 'a_4', 'b_4', 'c_5', 'd_5', 'e_5'],
  )

  expect(scale('f', 'lydian').base(4).notes([1, 2, 3, 4, 5, 6, 7, 8])).toEqual(
    ['f_4', 'g_4', 'a_4', 'b_4', 'c_5', 'd_5', 'e_5', 'f_5'],
  )

  expect(scale('g', 'mixolydian').base(4).notes([1, 2, 3, 4, 5, 6, 7, 8])).toEqual(
    ['g_4', 'a_4', 'b_4', 'c_5', 'd_5', 'e_5', 'f_5', 'g_5'],
  )

  expect(scale('b', 'locrian').base(4).notes([1, 2, 3, 4, 5, 6, 7, 8])).toEqual(
    ['b_4', 'c_5', 'd_5', 'e_5', 'f_5', 'g_5', 'a_5', 'b_5'],
  )

  expect(scale('c', 'lydian').base(4).notes([1, 2, 3, 4, 5, 6, 7, 8])).toEqual(
    ['c_4', 'd_4', 'e_4', 'fSharp_4', 'g_4', 'a_4', 'b_4', 'c_5'],
  )

  expect(scale('b', 'phrygian').base(4).notes([1, 2, 3, 4, 5, 6, 7, 8])).toEqual(
    ['b_4', 'c_5', 'd_5', 'e_5', 'fSharp_5', 'g_5', 'a_5', 'b_5'],
  )

  expect(scale('c', 'mixolydian').base(4).notes([1, 2, 3, 4, 5, 6, 7, 8])).toEqual(
    ['c_4', 'd_4', 'e_4', 'f_4', 'g_4', 'a_4', 'bFlat_4', 'c_5'],
  )
})

test('pentatonic scale', () => {
  expect(scale('c', 'pentatonic').base(5).notes([1, 2, 3, 4, 5, 6, 7])).toEqual(
    ['c_5', 'd_5', 'e_5', 'g_5', 'a_5', 'c_6', 'd_6'],
  )

  expect(scale('e', 'pentatonic').base(3).notes([1, 2, 3, 4, 5, 6, 7])).toEqual(
    ['e_3', 'fSharp_3', 'gSharp_3', 'b_3', 'cSharp_4', 'e_4', 'fSharp_4'],
  )

  expect(scale('dFlat', 'pentatonic').base(4).notes([1, 2, 3, 4, 5])).toEqual(
    ['dFlat_4', 'eFlat_4', 'f_4', 'aFlat_4', 'bFlat_4'],
  )
})
