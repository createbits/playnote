'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.formatLetter = exports.reverseTransformNote = exports.transformNote = undefined;

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var transformNote = exports.transformNote = function transformNote(letter, octave) {
  return letter + '_' + octave;
};

var reverseTransformNote = exports.reverseTransformNote = function reverseTransformNote(note) {
  var _note$split = note.split('_'),
      _note$split2 = (0, _slicedToArray3.default)(_note$split, 2),
      letter = _note$split2[0],
      octave = _note$split2[1];

  return [letter, parseInt(octave, 10)];
};

var formatLetter = exports.formatLetter = function formatLetter(letter) {
  return letter.replace('Sharp', '#').replace('Flat', '♭').toUpperCase();
};