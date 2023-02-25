chrome.runtime.onInstalled.addListener(() => {
  // console.log('onInstalled...');
});

self.addEventListener("visibilitychange", (event) => {
  console.log('Visibility changed');
});

self.addEventListener('message', (event) => {
  const data = event.data;
  if (data.action === 'beepifySaveSound') {
    chrome.storage.local.get(["beepifySounds"]).then((sounds) => {
      sounds = sounds ? sounds : {};
      const keySound = data.data.keySound;
      const enterSound = data.data.enterSound;
      const clickSound = data.data.clickSound;
      if (keySound) {
        sounds.keySound = keySound;
      }
      if (enterSound) {
        sounds.enterSound = enterSound;
      }
      if (clickSound) {
        sounds.clickSound = clickSound;
      }
      chrome.storage.local.set({ 'beepifySounds': sounds }).then(() => {
        console.log("Value is set to ", sounds);
      });
    });
  } else if (data.action === 'beepifyFetchSound') {
    chrome.storage.local.get(["beepifySounds"]).then((sounds) => {
      event.source.postMessage({action: 'beepifyFetchedSound', sounds});
    });
  }
})
