import './assets/style.scss';

// Change navbar height after passed #first elem
const firstElem = document.querySelector('#first');
const navBarElem = document.querySelector('.navbar__block');

const firstElemObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) { navBarElem.classList.add('shrink') }
    else { navBarElem.classList.remove('shrink') }
  })
}, { threshold: 0.1 });

firstElemObserver.observe(firstElem);

// Range slider
const sliderRange = document.querySelector('.range input');

sliderRange.addEventListener('input', (e) => {
  document.querySelector('.range-labels li.active').classList.remove('active');
  document.querySelector(`.range-labels li[data-value="${e.target.value}"]`).classList.add('active');
  document.querySelector('.results-block p.active').classList.remove('active');
  document.querySelector(`.results-block p[data-target="${e.target.value}"]`).classList.add('active');
});

let sliderLabel = document.querySelectorAll('.range-labels li');
sliderLabel.forEach((label) => {
  label.addEventListener('click', (elem) => {
    document.querySelector('.range-labels li.active').classList.remove('active');
    elem.target.classList.add('active');

    sliderRange.value = elem.target.dataset.value;
    document.querySelector('.results-block p.active').classList.remove('active');
    document.querySelector(`.results-block p[data-target="${elem.target.dataset.value}"]`).classList.add('active');
  });
});


// Lottie Library
LottieInteractivity.create({
  mode: 'scroll',
  player: '#deuxLottie',
  actions: [
    {
      visibility: [0, 1],
      type: 'seek',
      frames: [0, 129]
    }
  ]
});

LottieInteractivity.create({
  mode: 'scroll',
  player: '#troisLottie',
  actions: [
    {
      visibility: [0, 1],
      type: 'seek',
      frames: [0, 90]
    }
  ]
});

LottieInteractivity.create({
  mode: 'scroll',
  player: '#unLottie',
  actions: [
    {
      visibility: [0, 1],
      type: 'seek',
      frames: [0, 375]
    }
  ]
});

/*
  Motion using scrollMagic & GSAP

  use scrollMagic to detect scroll viewport (maybe use IntersectionObserver?)

  use GSAP to move the nyamuk around, the nyamuk to be move need an ID to be targeted.
*/

var fireAnimation = true;

/* 
  content-running
  Run code when arrive here using IntersectionObserver
*/
const contentRunning = document.querySelector('#content-running');
const runningAnimation = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    /* 
      Kalau dah intersect, play the animation  
      Kalau dah keluar intersect, play the redo animation
      transform: transform scaleX(-1);
    */

    if (entry.isIntersecting && fireAnimation) {
      /* Tweening~ */
      let dudeTimeline = gsap.timeline();
      dudeTimeline.to("#the-dude", { x: '70vw', duration: 3 })
        .to("#the-dude", { scaleX: -1, duration: 0.33 })
        .to("#the-dude", { x: 0, duration: 5 })

      let mosquitoTimeline = gsap.timeline();
      mosquitoTimeline.to("#mosquito-behind-dude", { x: '88vw', duration: 3.33 })
        .to("#mosquito-behind-dude", { scaleX: -1, duration: 0.25 })
        .to("#mosquito-behind-dude", { x: '10vw', duration: 5.25 })

      fireAnimation = false;
    }

    // GSDevTools.create();
  })
}, { threshold: 0.25 });

runningAnimation.observe(contentRunning);