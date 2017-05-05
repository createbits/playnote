# Playnote

Play your favorite instrument in the browser with support for scales and complex intervals.

```js
import { init, scale, play, note, wait } from 'playnote'

init('/mp3/soundSprite.mp3').then(async () => {
  play(note('dSharp', 4))
  await wait(2000)
  play(scale('d', 'major').base(4).note(1))
  await wait(2000)
  play(scale('c', 'minor').base(4).notes([1, 3, 5]))
})
```

It uses [howler.js](https://github.com/goldfire/howler.js) to play the notes. If you need a sound sprite check out the [piano sprite](./assets/pianoSprite.mp3) in the assets folder.
