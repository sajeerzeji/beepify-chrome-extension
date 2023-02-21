addEventListener('keydown', (event) => {
  if (event.key === 'Enter') {
    enterBeep();
  } else {
    keyBeep();
  }
});

addEventListener('click', (event) => {
  clickBeep();
})

function keyBeep() {
  const sound = new Audio(keySound1());
  // const sound = new Audio(keySound2());
  // const sound = new Audio(keySound2());
  // const sound = new Audio(keySound4());
  sound.play();
}

function enterBeep() {
  const sound = new Audio(enterSound1());
  // const sound = new Audio(enterSound1());
  // const sound = new Audio(enterSound2());
  // const sound = new Audio(enterSound3());
  // const sound = new Audio(enterSound4());
  // const sound = new Audio(enterSound5());
  sound.play();
}

function clickBeep() {
  const sound = new Audio(clickSound1());
  // const sound = new Audio(clickSound2());
  // const sound = new Audio(clickSound3());
  // const sound = new Audio(clickSound4());
  sound.play();
}
