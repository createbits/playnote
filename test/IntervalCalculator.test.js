import {
  getIntervals,
} from '../src/IntervalCalculator'

test('get note intervals', () => {
  expect(getIntervals('c_2', [
    { type: 'major', distance: 3 },
    { type: 'perfect', distance: 5 },
    { type: 'minor', distance: 6 },
  ])).toEqual(['e_2', 'g_2', 'aFlat_2'])

  expect(getIntervals('d_3', [
    { type: 'minor', distance: 3 },
    { type: 'perfect', distance: 5 },
  ])).toEqual(['f_3', 'a_3'])

  expect(getIntervals('cSharp_4', [
    { type: 'major', distance: 3 },
    { type: 'perfect', distance: 4 },
  ])).toEqual(['eSharp_4', 'fSharp_4'])

  expect(getIntervals('e_5', [
    { type: 'major', distance: 2 },
    { type: 'minor', distance: 3 },
    { type: 'perfect', distance: 4 },
  ])).toEqual(['fSharp_5', 'g_5', 'a_5'])

  expect(getIntervals('a_4', [
    { type: 'major', distance: 3 },
    { type: 'perfect', distance: 5 },
    { type: 'major', distance: 7 },
  ])).toEqual(['cSharp_5', 'e_5', 'gSharp_5'])

  expect(getIntervals('f_1', [
    { type: 'tritone' },
  ])).toEqual(['b_1'])

  expect(getIntervals('f_1', [
    { type: 'octave', octave: 1 },
    { type: 'octave', octave: 2 },
    { type: 'major', distance: 3, octave: 3 },
  ])).toEqual(['f_2', 'f_3', 'a_4'])

  expect(getIntervals('c_4', [
    { type: 'major', distance: 3 },
    { type: 'major', distance: 9 },
    { type: 'perfect', distance: 11 },
    { type: 'augmented', distance: 11 },
    { type: 'major', distance: 13 },
    { type: 'perfect', distance: 15 },
  ])).toEqual(['e_4', 'd_5', 'f_5', 'fSharp_5', 'a_5', 'c_6'])

  expect(getIntervals('eFlat_3', [
    { type: 'minor', distance: 3 },
    { type: 'minor', distance: 3, octave: 2 },
    { type: 'tritone', octave: -1 },
  ])).toEqual(['gFlat_3', 'gFlat_5', 'a_2'])

  expect(getIntervals('g_3', [
    { type: 'perfect', distance: 4 },
    { type: 'augmented', distance: 15 },
  ])).toEqual(['c_4', 'gSharp_5'])

  expect(getIntervals('b_4', [{ type: 'major', distance: 2 }])).toEqual(['cSharp_5'])
  expect(getIntervals('a_4', [{ type: 'major', distance: 3 }])).toEqual(['cSharp_5'])
  expect(getIntervals('g_3', [{ type: 'perfect', distance: 4 }])).toEqual(['c_4'])
  expect(getIntervals('gFlat_4', [{ type: 'major', distance: 3 }])).toEqual(['bFlat_4'])

  expect(() => getIntervals('dSharp_3', [{ type: 'major', distance: 3 }])).toThrow()
})
