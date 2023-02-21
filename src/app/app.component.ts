import { Component } from '@angular/core';
import './beepify/sound/key/key-sound-1';
import './beepify/sound/key/key-sound-2';
import './beepify/sound/key/key-sound-3';
import './beepify/sound/key/key-sound-4';
import './beepify/sound/enter/enter-sound-1';
import './beepify/sound/enter/enter-sound-2';
import './beepify/sound/enter/enter-sound-3';
import './beepify/sound/enter/enter-sound-4';
import './beepify/sound/enter/enter-sound-5';
import './beepify/sound/click/click-sound-1';
import './beepify/sound/click/click-sound-2';
import './beepify/sound/click/click-sound-3';
import './beepify/sound/click/click-sound-4';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'beepify-extension';

  keySound: 'none' | 'keySound1' | 'keySound2' | 'keySound3' | 'keySound4' = 'none';
  enterSound: 'none' | 'enterSound1' | 'enterSound2' | 'enterSound3' | 'enterSound4' | 'enterSound5' = 'none';
  clickSound: 'none' | 'clickSound1' | 'clickSound2' | 'clickSound3' | 'clickSound4' = 'none';

  selectSound(type: any, key: any) {
    if (type === 'keySound') {
      this.keySound = key;
    }
    if (type === 'enterSound') {
      this.enterSound = key;
    }
    if (type === 'clickSound') {
      this.clickSound = key;
    }
  }

  playSound(sound: any) {
    new Audio(sound)?.play();
  }
}
