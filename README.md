# Playnote

Play your favorite instrument in the browser with support for scales and complex intervals.

```js
import { init, scale, play, note } from 'playnote'

init('/mp3/soundSprite.mp3').then(() => {
  play(note('dSharp', 3))
  play(scale('d', 'minor').base(3).note(1))
  play(scale('c', 'major').base(3).notes(5, 7, 9))
})
```
