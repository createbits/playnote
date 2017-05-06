'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.scale = undefined;

var _IonianScale = require('./scales/IonianScale');

var _AeolianScale = require('./scales/AeolianScale');

var _DorianScale = require('./scales/DorianScale');

var _PhrygianScale = require('./scales/PhrygianScale');

var _LydianScale = require('./scales/LydianScale');

var _MixolydianScale = require('./scales/MixolydianScale');

var _LocrianScale = require('./scales/LocrianScale');

var _PentatonicScale = require('./scales/PentatonicScale');

var _NoteTransformer = require('./NoteTransformer');

var _IntervalCalculator = require('./IntervalCalculator');

var scales = {
  major: _IonianScale.scale,
  minor: _AeolianScale.scale,

  ionian: _IonianScale.scale,
  aeolian: _AeolianScale.scale,

  dorian: _DorianScale.scale,
  phrygian: _PhrygianScale.scale,
  lydian: _LydianScale.scale,
  mixolydian: _MixolydianScale.scale,
  locrian: _LocrianScale.scale,

  pentatonic: _PentatonicScale.scale
};

var retrieveNote = function retrieveNote(letter, octave, degree, scaleIntervals) {
  var scaleIntervalIndex = (degree - 1) % scaleIntervals.length;
  var interval = scaleIntervals[scaleIntervalIndex];

  var note = (0, _NoteTransformer.transformNote)(letter, octave + Math.floor((degree - 1) / scaleIntervals.length));
  return (0, _IntervalCalculator.getIntervals)(note, [interval])[0];
};

var scale = exports.scale = function scale(letter) {
  var scaleKey = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'major';

  var scaleIntervals = scales[scaleKey];

  if (!scaleIntervals) {
    throw new Error('Scale "' + scaleKey + '" not recognized');
  }

  var degrees = (0, _IntervalCalculator.getIntervals)((0, _NoteTransformer.transformNote)(letter, 4), scaleIntervals).map(function (n) {
    return (0, _NoteTransformer.reverseTransformNote)(n)[0];
  });

  return {
    getDegree: function getDegree(indexPlusOne) {
      return degrees[indexPlusOne - 1];
    },
    getDegrees: function getDegrees() {
      return degrees;
    },
    base: function base(octave) {
      return {
        note: function note(degree) {
          return retrieveNote(letter, octave, degree, scaleIntervals);
        },
        notes: function notes(degrees) {
          return degrees.map(function (d) {
            return retrieveNote(letter, octave, d, scaleIntervals);
          });
        }
      };
    }
  };
};