'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getNoteSpriteData = exports.calculateNoteStart = exports.rootNoteLetters = undefined;

var _defineProperty2 = require('babel-runtime/helpers/defineProperty');

var _defineProperty3 = _interopRequireDefault(_defineProperty2);

var _extends3 = require('babel-runtime/helpers/extends');

var _extends4 = _interopRequireDefault(_extends3);

var _lodash = require('lodash');

var _NoteTransformer = require('./NoteTransformer');

var _NoteMap = require('./NoteMap');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var rootNoteLetters = exports.rootNoteLetters = Object.keys(_NoteMap.noteMap).filter(function (note) {
  return note.length === 1;
});

var notePlayLengthMs = 2000;
var octavePlayLength = notePlayLengthMs * 12;

var getSingleNoteSpriteData = function getSingleNoteSpriteData(letter, octave) {
  return [{ key: letter, start: calculateNoteStart(letter, octave) }];
};

var calculateNoteStart = exports.calculateNoteStart = function calculateNoteStart(letter, octave) {
  return (octave - 1) * octavePlayLength + _NoteMap.noteMap[letter].spriteNoteStart * notePlayLengthMs;
};

var noteSpriteData = (0, _lodash.range)(1, 9).reduce(function (acc, octaveNum) {
  var singleNotes = (0, _lodash.flatMap)(Object.keys(_NoteMap.noteMap), function (noteLetter) {
    return getSingleNoteSpriteData(noteLetter, octaveNum);
  });

  return (0, _extends4.default)({}, acc, singleNotes.reduce(function (noteAcc, noteData) {
    return (0, _extends4.default)({}, noteAcc, (0, _defineProperty3.default)({}, (0, _NoteTransformer.transformNote)(noteData.key, octaveNum), [noteData.start, 2000]));
  }, {}));
}, {});

var getNoteSpriteData = exports.getNoteSpriteData = function getNoteSpriteData() {
  return noteSpriteData;
};