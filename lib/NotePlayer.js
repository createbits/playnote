'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.rootNoteLetters = exports.playSequence = exports.play = exports.wait = exports.scale = exports.intervals = exports.note = exports.init = undefined;

var _toArray2 = require('babel-runtime/helpers/toArray');

var _toArray3 = _interopRequireDefault(_toArray2);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _NoteSpriteCalculator = require('./NoteSpriteCalculator');

var _NoteTransformer = require('./NoteTransformer');

var _IntervalCalculator = require('./IntervalCalculator');

var _ScaleMapper = require('./ScaleMapper');

var _howler = require('howler');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var sprite = (0, _NoteSpriteCalculator.getNoteSpriteData)();

var audioSource = void 0;

var init = exports.init = function () {
  var _ref = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee(src) {
    return _regenerator2.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            return _context.abrupt('return', new Promise(function (res) {
              return audioSource = new _howler.Howl({
                src: [src],
                loop: false,
                autoplay: false,
                sprite: sprite,
                onload: res
              });
            }));

          case 1:
          case 'end':
            return _context.stop();
        }
      }
    }, _callee, undefined);
  }));

  return function init(_x) {
    return _ref.apply(this, arguments);
  };
}();

var note = exports.note = _NoteTransformer.transformNote;

var intervals = exports.intervals = _IntervalCalculator.getIntervals;

var scale = exports.scale = function scale(baseNote, mode) {
  return (0, _ScaleMapper.scale)(baseNote, mode);
};

var wait = exports.wait = function wait(ms) {
  return new Promise(function (res) {
    return setTimeout(res, ms);
  });
};

var play = exports.play = function play(notes) {
  var fadeMs = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : -1;
  var waitFadeMs = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

  if (!Array.isArray(notes)) notes = [notes];

  if (!audioSource) throw new Error('Not initialized (call init)');

  var ids = notes.map(function (n) {
    return audioSource.play(n);
  });

  if (fadeMs > -1) {
    wait(waitFadeMs).then(function () {
      return ids.forEach(function (id) {
        return audioSource.fade(1, 0, fadeMs, id);
      });
    });
  }
};

var playSequence = exports.playSequence = function () {
  var _ref2 = (0, _asyncToGenerator3.default)(_regenerator2.default.mark(function _callee2(noteSequence) {
    var _noteSequence, n, restNoteSequence;

    return _regenerator2.default.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _noteSequence = (0, _toArray3.default)(noteSequence), n = _noteSequence[0], restNoteSequence = _noteSequence.slice(1);

            if (!n.offset) {
              _context2.next = 4;
              break;
            }

            _context2.next = 4;
            return wait(n.offset);

          case 4:

            play(n.notes, n.length * 0.2, n.length * 0.8);

            _context2.next = 7;
            return wait(n.length - n.length * 0.1);

          case 7:
            return _context2.abrupt('return', restNoteSequence.length > 0 ? playSequence(restNoteSequence) : null);

          case 8:
          case 'end':
            return _context2.stop();
        }
      }
    }, _callee2, undefined);
  }));

  return function playSequence(_x4) {
    return _ref2.apply(this, arguments);
  };
}();

exports.rootNoteLetters = _NoteSpriteCalculator.rootNoteLetters;