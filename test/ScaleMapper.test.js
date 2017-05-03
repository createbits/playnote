import { scale } from '../src/ScaleMapper'

test('validly maps default major scale', () => {
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

test('validly maps ionian / major scale', () => {
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

test('validly maps aeolian / minor scale', () => {
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
