const keyStokeSounds = [
  new Audio("/sounds/keystroke1.mp3"),
  new Audio("/sounds/keystroke2.mp3"),
  new Audio("/sounds/keystroke3.mp3"),
  new Audio("/sounds/keystroke4.mp3"),
];

function useKeyboardSound() {
  const playRandomKeyStrokeSound = () => {
    // choose an integer index between 0 and length-1
    const idx = Math.floor(Math.random() * keyStokeSounds.length);
    const randomSound = keyStokeSounds[idx];
    if (!randomSound) {
      // nothing to play, bail out
      return;
    }

    randomSound.currentTime = 0;

    randomSound
      .play()
      .catch((error) => console.log("Audio Play failed: ", error));
  };
  return { playRandomKeyStrokeSound };
}

export default useKeyboardSound;
