let fetchedSounds = undefined;

addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    enterBeep();
  } else {
    keyBeep();
  }
});

addEventListener("visibilitychange", (event) => {
  console.log('Visibility changed');
  // chrome.storage.local.set({any: 1});
  chrome.storage.local.get('any', (result) => {
    console.log('result', result);
    const newData = Number((result && result.any) ? result.any : 0) + 1;
    chrome.storage.local.set({any: newData});
    console.log('newData', newData);
  });
  navigator.serviceWorker.addEventListener("controllerchange", (evt) => {
    console.log('Visibility changed');
    navigator.serviceWorker.controller.postMessage({action: 'beepifyFetchSound'});
  });
});

addEventListener('click', (event) => {
  if (!event.target?.attributes?.beepifyControl) {
    clickBeep();
  }
})

addEventListener('message', (event) => {
  console.log('Message listener');
  const data = event.data;
  if (data?.action === 'beepifyFetchedSound') {
    fetchedSounds = data.sounds;
  }
});

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
