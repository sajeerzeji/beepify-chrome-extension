let fetchedSounds = undefined;

addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    enterBeep();
  } else {
    keyBeep();
  }
});

addEventListener("visibilitychange", (event) => {
  fetchSound('keySound');
  fetchSound('enterSound');
  fetchSound('clickSound');
});

addEventListener('click', (event) => {
  if (!event.target?.attributes?.beepifyControl) {
    clickBeep();
  }
})

function keyBeep() {
  if (fetchedSounds?.keySound?.sound) {
    // const sound = new Audio(keySound1());
    const sound = new Audio(fetchedSounds.keySound.sound);
    sound.play();
  }
}

function enterBeep() {
  if (fetchedSounds?.enterSound?.sound) {
    const sound = new Audio(fetchedSounds.enterSound.sound);
    // const sound = new Audio(enterSound1());
    sound.play();
  }
}

function clickBeep() {
  if (fetchedSounds?.clickSound?.sound) {
    const sound = new Audio(fetchedSounds.clickSound.sound);
    // const sound = new Audio(clickSound1());
    sound.play();
  }
}

function fetchSound(key) {
  chrome.storage.local.get(key, (result) => {
    fetchedSounds = !fetchedSounds ? {} : fetchedSounds;
    console.log('key', key);
    console.log('result', result);
    if (key === 'keySound' && result.keySound && result.keySound.key) {
      fetchedSounds.keySound = result.keySound;
    }
    if (key === 'enterSound' && result.enterSound && result.enterSound.key) {
      fetchedSounds.enterSound = result.enterSound;
    }
    if (key === 'clickSound' && result.clickSound && result.clickSound.key) {
      fetchedSounds.clickSound = result.clickSound;
    }
  });
}

chrome.storage.onChanged.addListener((changes, namespace) => {
  fetchSound('keySound');
  fetchSound('enterSound');
  fetchSound('clickSound');
});

fetchSound('keySound');
fetchSound('enterSound');
fetchSound('clickSound');
