import {Component, OnInit} from '@angular/core';
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
export class AppComponent implements OnInit {
  title = 'beepify-extension';

  keySound: 'none' | 'keySound1' | 'keySound2' | 'keySound3' | 'keySound4' = 'keySound1';
  enterSound: 'none' | 'enterSound1' | 'enterSound2' | 'enterSound3' | 'enterSound4' | 'enterSound5' = 'enterSound1';
  clickSound: 'none' | 'clickSound1' | 'clickSound2' | 'clickSound3' | 'clickSound4' = 'clickSound1';

  sounds: any = {
    keySound1: keySound1,
    keySound2: keySound2,
    keySound3: keySound3,
    keySound4: keySound4,
    enterSound1: enterSound1,
    enterSound2: enterSound2,
    enterSound3: enterSound3,
    enterSound4: enterSound4,
    enterSound5: enterSound5,
    clickSound1: clickSound1,
    clickSound2: clickSound2,
    clickSound3: clickSound3,
    clickSound4: clickSound4
  };

  log: any;

  constructor() {
    this.addEventListeners();
  }

  ngOnInit(): void {
    // @ts-ignore
    this.getFromStorage('keySound');
    this.getFromStorage('enterSound');
    this.getFromStorage('clickSound');
  }

  addEventListeners() {
    addEventListener('beepifyFetchSoundRequest', (event) => {
      this.dispatchSounds();
    })
  }

  dispatchSounds() {
    const data: any = {
      keySound: this.keySound,
      enterSound: this.enterSound,
      clickSound: this.clickSound
    };
    document.dispatchEvent(new CustomEvent('beepifyFetchSoundResponse', data))
  }

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
    if (key !== 'none') {
      const sound = this.sounds[key];
      if (sound) {
        setTimeout(() => {
          this.playSound(sound());
        }, 100);
        this.setToStorage(type, key);
        this.dispatchSounds();
      }
    }
  }

  playSound(sound: any) {
    new Audio(sound)?.play();
  }

  setToStorage(key: any, value: any) {
    key = key ? JSON.stringify(key) : '';
    value = value ? JSON.stringify(value) : '';
    const val: any = {};
    val[key] = value;
    // @ts-ignore
    chrome.storage.local.set(value, () => {});
  }

  getFromStorage(key: any): any {
    // @ts-ignore
    chrome.storage.sync.get([key]).then((res: any) => {
      if (key === 'keySound' && res) {
        // @ts-ignore
        this.keySound = JSON.stringify(res);
      }
      if (key === 'enterSound' && res) {
        this.enterSound = res;
      }
      if (key === 'clickSound' && res) {
        this.clickSound = res;
      }
    });
  }

  getChrome(key: string, defaults = {}): Promise<any> {
    return new Promise((resolve, reject) => {
      // @ts-ignore
      if (window['chrome'] !== undefined && window['chrome'].storage !== undefined) {
        let saveObj = {};
        // @ts-ignore
        saveObj[key] = defaults;
        // @ts-ignore
        window['chrome'].storage.sync.get(/* String or Array */saveObj, (data) => this.zone.run(() => {
          resolve(data[key]);
        }));
      } else {
        // @ts-ignore
        let object =  (localStorage.getItem(key) === null) ? defaults : JSON.parse(localStorage.getItem(key));
        resolve(object);
      }
    });
  }
}
