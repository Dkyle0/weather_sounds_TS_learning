const cardsContainerElement: HTMLElement | null = document.querySelector('.cards');
const backgroundElement: HTMLElement | null = document.querySelector('.background');
const voluemeElement: HTMLInputElement | null = document.querySelector<HTMLInputElement>('input[type="range"]');
const audioPlayer = document.getElementById('audioPlayer') as HTMLAudioElement;

const selectMusic = (bgImageSrc: string): string => {
  if (bgImageSrc.includes('rainy')) {
    return './assets/sounds/rain.mp3'
  } else if (bgImageSrc.includes('summer')) {
    return './assets/sounds/summer.mp3'
  } else if (bgImageSrc.includes('winter')) {
    return './assets/sounds/winter.mp3'
  }

  return '';
}

if (cardsContainerElement) {
  cardsContainerElement.addEventListener('click', (event) => {
    if (event.target instanceof HTMLElement) {
      const card: Element | null = event.target.closest('.card');
      if (card) {
        const bgImage: HTMLElement | null = card.querySelector('.background-image');
        if (bgImage instanceof HTMLImageElement && backgroundElement) {
          const audioSrc: string = selectMusic(bgImage.src);
          const isLastSrc: boolean = audioPlayer.src.includes(audioSrc.slice(2));
          if (isLastSrc && audioPlayer.paused === false)
          {
            audioPlayer.pause();
          } 
          else {
            if (audioPlayer.paused === false || !isLastSrc) {
              audioPlayer.src = audioSrc;
              backgroundElement.style.backgroundImage = `url(${bgImage.src})`;
            }
            audioPlayer.play().catch(error => console.error('Ошибка при воспроизведении:', error));
          }
        }
      }
    }
  });
}

if (voluemeElement) {
  voluemeElement.addEventListener('click', () => {
    audioPlayer.volume = Number(voluemeElement.value) / 100;
  })
  
}
