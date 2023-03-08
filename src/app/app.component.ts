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
import './beepify/sound/chatGPT/chatGPT-sound-1';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'beepify-extension';

  keySoundKey: any = 'none';
  keySound: any;

  enterSoundKey: any = 'none';
  enterSound: any;

  clickSoundKey: any = 'none';
  clickSound: any;

  chatGPTSoundKey: any = 'none';
  chatGPTSound: any;

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

  chatGPTSounds = [
    {
      key: 'none',
      label: 'No Sound',
      sound: undefined
    },
    {
      key: 'chatGPTSound1',
      label: 'Sound 1',
      sound: chatGPTSound1(),
    }
  ];

  log: any;

  constructor() {
    this.fetchAllSounds();
  }

  ngOnInit(): void {
  }

  fetchAllSounds() {
    this.getFromStorage('keySound');
    this.getFromStorage('enterSound');
    this.getFromStorage('clickSound');
    this.getFromStorage('chatGPTSound');
  }

  selectSound(type: any, key: any, sound: any, targetElement: any) {
    if (type === 'keySound') {
      this.keySoundKey = key;
    }
    if (type === 'enterSound') {
      this.enterSoundKey = key;
    }
    if (type === 'clickSound') {
      this.clickSoundKey = key;
    }
    if (type === 'chatGPTSound') {
      this.chatGPTSoundKey = key;
    }
    if (key !== 'none') {
      if (sound) {
        setTimeout(() => {
          this.playSound(sound);
        }, 100);
        console.log('sound', {key, sound: sound});
        this.setToStorage(type, {key, sound: sound});
        setTimeout(() => {
          this.fetchAllSounds();
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
    // @ts-ignore
    chrome.storage.local.set(data);
  }

  getFromStorage(key: any): any {
    // @ts-ignore
    chrome.storage.local.get(key, (result: any) => {
      if (key === 'keySound' && result?.keySound?.key) {
        Array.from(document.querySelectorAll('.key-sound-selector')).forEach((el) => el.classList.remove('selection-chip-active'));
        this.keySoundKey = result?.keySound?.key ?? 'none';
        const soundSelectorElement = document.getElementById(this.keySoundKey);
        if (soundSelectorElement) {
          soundSelectorElement.className = soundSelectorElement.className + ' selection-chip-active';
        }
      }
      if (key === 'enterSound' && result?.enterSound?.key) {
        Array.from(document.querySelectorAll('.enter-sound-selector')).forEach((el) => el.classList.remove('selection-chip-active'));
        this.enterSoundKey = result?.enterSound?.key ?? 'none';
        const soundSelectorElement = document.getElementById(this.enterSoundKey);
        if (soundSelectorElement) {
          soundSelectorElement.className = soundSelectorElement.className + ' selection-chip-active';
        }
      }
      if (key === 'clickSound' && result?.clickSound?.key) {
        Array.from(document.querySelectorAll('.click-sound-selector')).forEach((el) => el.classList.remove('selection-chip-active'));
        this.clickSoundKey = result?.clickSound?.key ?? 'none';
        const soundSelectorElement = document.getElementById(this.clickSoundKey);
        if (soundSelectorElement) {
          soundSelectorElement.className = soundSelectorElement.className + ' selection-chip-active';
        }
      }
      if (key === 'chatGPTSound' && result?.chatGPTSound?.key) {
        Array.from(document.querySelectorAll('.chatGPT-sound-selector')).forEach((el) => el.classList.remove('selection-chip-active'));
        this.chatGPTSoundKey = result?.chatGPTSound?.key ?? 'none';
        const soundSelectorElement = document.getElementById(this.chatGPTSoundKey);
        if (soundSelectorElement) {
          soundSelectorElement.className = soundSelectorElement.className + ' selection-chip-active';
        }
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
