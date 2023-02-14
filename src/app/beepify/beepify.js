addEventListener('keypress', (event) => {
  if (event.key === 'Enter') {
    enterBeep();
  } else {
    keyBeep();
  }
});

function keyBeep() {
  const snd = new Audio(keySound1());
  // const snd = new Audio(keySound2());
  // const snd = new Audio(keySound2());
  // const snd = new Audio(keySound4());
  snd.play();
}

function enterBeep() {
  const snd = new Audio(enterSound1());
  // const snd = new Audio(enterSound1());
  // const snd = new Audio(enterSound2());
  // const snd = new Audio(enterSound3());
  // const snd = new Audio(enterSound4());
  // const snd = new Audio(enterSound5());
  snd.play();
}
