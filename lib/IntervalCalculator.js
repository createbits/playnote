'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getIntervals = undefined;

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _NoteTransformer = require('./NoteTransformer');

var _NotePlayer = require('./NotePlayer');

var _NoteMap = require('./NoteMap');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Get's whole steps offset for major distances
 *
 * @param {number} distance
 * @returns {number}
 */
var getOffsetForMajorDistances = function getOffsetForMajorDistances(distance) {
  if (distance <= 3) return 0;
  if (distance <= 7) return 1;
  if (distance <= 12) return 2;

  return 3;
};

/**
 * Calculate amount of half steps to walk to reach the note.
 *
 * @param {string} type
 * @param {number} distance
 * @returns {number}
 */
var calculateHalfSteps = function calculateHalfSteps(_ref) {
  var type = _ref.type,
      distance = _ref.distance;

  if (distance > 15) throw new Error('Cannot calculate distances bigger than 15');

  if (type === 'octave') return 0;

  if (type === 'major') return (distance - 1) * 2 - getOffsetForMajorDistances(distance);

  if (type === 'minor') return calculateHalfSteps({ type: 'major', distance: distance }) - 1;

  if (type === 'tritone') return calculateHalfSteps({ type: 'major', distance: 2 }) * 3;

  if (type === 'augmented') return calculateHalfSteps({ type: 'perfect', distance: distance }) + 1;

  if (type === 'diminished') return calculateHalfSteps({ type: 'perfect', distance: distance }) - 1;

  if (type === 'perfect') {
    switch (distance) {
      case 4:
        return 5;
      case 5:
        return 7;
      case 11:
        return 17;
      case 15:
        return 24;
      default:
        throw new Error('Cannot calculate perfect distance with number ' + distance);
    }
  }

  throw new Error('Did not recognize interval with type "' + type + '" and number ' + distance);
};

/**
 * Get note letter (with sharp and flat considered)
 *
 * @param {string} baseNoteLetter
 * @param {number} halfSteps
 * @param {number} intervalDistance
 */
var getIntervalInfo = function getIntervalInfo(baseNoteLetter, halfSteps, intervalDistance) {
  var baseRootNoteIndex = _NotePlayer.rootNoteLetters.indexOf(baseNoteLetter.charAt(0));
  var intervalRootNoteLetterIndex = baseRootNoteIndex + (intervalDistance - 1);
  var intervalRootNoteLetter = _NotePlayer.rootNoteLetters[intervalRootNoteLetterIndex % 7];

  var halfStepsFromC = (_NoteMap.noteMap[baseNoteLetter].halfStepIndex + halfSteps) % 12;

  return {
    letter: Object.keys(_NoteMap.noteMap).filter(function (letter) {
      return letter.startsWith(intervalRootNoteLetter) && _NoteMap.noteMap[letter].halfStepIndex === halfStepsFromC;
    })[0],
    octave: Math.floor(intervalRootNoteLetterIndex / 7)
  };
};

/**
 * Return distance for intervals which do not have to specify it
 *
 * @param {string} type
 * @param {number|undefined} distance
 * @returns {number}
 */
var adjustDistanceForSpecialIntervals = function adjustDistanceForSpecialIntervals(type, distance) {
  if (type === 'octave') return 1;
  if (type === 'tritone') return 4;

  return distance;
};

/**
 * Calculate intervals by providing a base note and intervals.
 *
 * @param {string} baseNote
 * @param {array} intervals
 *
 * @return {array} Array of notes
 */
var getIntervals = exports.getIntervals = function getIntervals(baseNote, intervals) {
  var _reverseTransformNote = (0, _NoteTransformer.reverseTransformNote)(baseNote),
      _reverseTransformNote2 = (0, _slicedToArray3.default)(_reverseTransformNote, 2),
      baseNoteLetter = _reverseTransformNote2[0],
      baseNoteOctave = _reverseTransformNote2[1];

  return intervals.map(function (interval) {
    var type = interval.type,
        _interval$octave = interval.octave,
        octave = _interval$octave === undefined ? 0 : _interval$octave;

    var halfStepsDistance = calculateHalfSteps(interval);

    var shortestHalfSteps = halfStepsDistance % 12;
    var distance = adjustDistanceForSpecialIntervals(type, interval.distance);

    var _getIntervalInfo = getIntervalInfo(baseNoteLetter, shortestHalfSteps, distance),
        intervalLetter = _getIntervalInfo.letter,
        moreOctaveToAdd = _getIntervalInfo.octave;

    var octaveToAdd = octave + moreOctaveToAdd;
    var intervalOctave = baseNoteOctave + octaveToAdd;

    if (!intervalOctave || !intervalLetter) {
      throw new Error('Could not define interval for ' + type + ' - ' + distance + ' with base ' + baseNote);
    }

    return (0, _NoteTransformer.transformNote)(intervalLetter, intervalOctave);
  });
};