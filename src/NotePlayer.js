import { rootNoteLetters, getNoteSpriteData } from './NoteSpriteCalculator'
import { transformNote } from './NoteTransformer'
import { getIntervals } from './IntervalCalculator'
import { scale as mapScale } from './ScaleMapper'
import { Howl } from 'howler'

const sprite = getNoteSpriteData()

let audioSource

export const init = async (src) => new Promise(
  res => audioSource = new Howl({
    src: [src],
    loop: false,
    autoplay: false,
    sprite,
    onload: res,
  }),
)

export const note = transformNote

export const intervals = getIntervals

export const scale = (baseNote, mode) => mapScale(baseNote, mode)

export const wait = ms => new Promise(res => setTimeout(res, ms))

export const play = (notes, fadeMs = -1, waitFadeMs = 0) => {
  if (!Array.isArray(notes)) notes = [notes]

  if (!audioSource) throw new Error('Not initialized (call init)')

  const ids = notes.map(n => audioSource.play(n))

  if (fadeMs > -1) {
    wait(waitFadeMs).then(() => ids.forEach(id => audioSource.fade(1, 0, fadeMs, id)))
  }
}

export const playSequence = async (noteSequence) => {
  const [n, ...restNoteSequence] = noteSequence

  if (n.offset) await wait(n.offset)

  play(n.notes, n.length * 0.2, n.length * 0.8)

  await wait(n.length - (n.length * 0.1))

  return restNoteSequence.length > 0 ? playSequence(restNoteSequence) : null
}

export { rootNoteLetters }
