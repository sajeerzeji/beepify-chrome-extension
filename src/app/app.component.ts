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

  keySoundKey: 'none' | 'keySound1' | 'keySound2' | 'keySound3' | 'keySound4' = 'keySound1';
  keySound: any;

  enterSoundKey: 'none' | 'enterSound1' | 'enterSound2' | 'enterSound3' | 'enterSound4' | 'enterSound5' = 'enterSound1';
  enterSound: any;

  clickSoundKey: 'none' | 'clickSound1' | 'clickSound2' | 'clickSound3' | 'clickSound4' = 'clickSound1';
  clickSound: any;

  keySounds = [
    {
      key: 'none',
      label: 'No Sound',
      sound: undefined
    },
    {
      key: 'keySound1',
      label: 'Sound 1',
      sound: keySound1(),
    },
    {
      key: 'keySound2',
      label: 'Sound 2',
      sound: keySound2()
    },
    {
      key: 'keySound3',
      label: 'Sound 3',
      sound: keySound3()
    },
    {
      key: 'keySound4',
      label: 'Sound 4',
      sound: keySound4()
    }
  ];

  enterSounds = [
    {
      key: 'none',
      label: 'No Sound',
      sound: undefined
    },
    {
      key: 'enterSound1',
      label: 'Sound 1',
      sound: enterSound1()
    },
    {
      key: 'enterSound2',
      label: 'Sound 2',
      sound: enterSound2()
    },
    {
      key: 'enterSound3',
      label: 'Sound 3',
      sound: enterSound3()
    },
    {
      key: 'enterSound4',
      label: 'Sound 4',
      sound: enterSound4()
    },
    {
      key: 'enterSound5',
      label: 'Sound 5',
      sound: enterSound5()
    }
  ];

  clickSounds = [
    {
      key: 'none',
      label: 'No Sound',
      sound: undefined
    },
    {
      key: 'clickSound1',
      label: 'Sound 1',
      sound: clickSound1()
    },
    {
      key: 'clickSound2',
      label: 'Sound 2',
      sound: clickSound2()
    },
    {
      key: 'clickSound3',
      label: 'Sound 3',
      sound: clickSound3()
    },
    {
      key: 'clickSound4',
      label: 'Sound 4',
      sound: clickSound4()
    }
  ];

  log: any;

  constructor() {
    this.addEventListeners();
  }

  ngOnInit(): void {
    // @ts-ignore
    chrome.storage.local.get('any', (result: any) => {
      const newData = Number((result && result.any) ? result.any : 0) + 1;
      // @ts-ignore
      chrome.storage.local.set({any: newData});
      throw new Error('newData ' + newData);
    });
    // @ts-ignore
    this.getFromStorage();
  }

  addEventListeners() {
    addEventListener('message', (event) => {
      throw new Error('Message listener');
      const data = event.data;
      if (data.action === 'beepifyFetchedSound') {
        const sounds = data.sounds;
        const keySound = sounds.keySound;
        const enterSound = sounds.enterSound;
        const clickSound = sounds.clickSound;
        if (keySound) {
          this.keySoundKey = keySound.key;
        }
        if (enterSound) {
          this.enterSoundKey = enterSound.key;
        }
        if (clickSound) {
          this.clickSoundKey = clickSound.key;
        }
      }
    })
  }

  selectSound(type: any, key: any, sound: any, targetElement: any) {
    console.log(targetElement?.attributes?.beepifyControl);
    if (type === 'keySound') {
      this.keySoundKey = key;
    }
    if (type === 'enterSound') {
      this.enterSoundKey = key;
    }
    if (type === 'clickSound') {
      this.clickSoundKey = key;
    }
    if (key !== 'none') {
      if (sound) {
        setTimeout(() => {
          this.playSound(sound);
        }, 100);
        this.setToStorage(type, {key, sound: sound});
        setTimeout(() => {
          this.getFromStorage();
        }, 100)
      }
    }
  }

  playSound(sound: any) {
    new Audio(sound)?.play();
  }

  setToStorage(key: any, value: any) {
    const data: any = {};
    data[key] = value;
    navigator?.serviceWorker?.controller?.postMessage({action: 'beepifySaveSound', data});
  }

  getFromStorage(): any {
    navigator?.serviceWorker?.controller?.postMessage({action: 'beepifyFetchSound'});
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
