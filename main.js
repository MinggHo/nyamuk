import './assets/style.scss';

window.addEventListener('load', function () {
  document.querySelector('#loader').classList.add("exit")
  document.querySelector('body').classList.add("loaded")
  this.setTimeout(() => {
    document.querySelector('#loader').style.visibility = 'hidden';
  }, 2750);
  this.setTimeout(() => this.document.title = "Continue reading...", 8000);
});

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

/* Ensure that the running animation will run once */
var fireAnimation = true;
const contentRunning = document.querySelector('#content-running');
const runningAnimation = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && fireAnimation) {
      let dudeTimeline = gsap.timeline({ repeat: 5 });
      dudeTimeline.to("#the-dude", { x: '120vw', scaleX: 1, duration: 5 })
        .to("#the-dude", { scaleX: -1, duration: 0.2 })
        .to("#the-dude", { x: '-40vw', duration: 5 })

      let mosquitoTimeline = gsap.timeline({ repeat: 5 });
      mosquitoTimeline.to("#mosquito-behind-dude", { x: '125vw', duration: 5 })
        .to("#mosquito-behind-dude", { scaleX: -1, duration: 0.25 })
        .to("#mosquito-behind-dude", { x: '-30vw', duration: 5 })

      fireAnimation = false;
    }
  })
}, { threshold: 0.25 });

runningAnimation.observe(contentRunning);


function show(showValue) {
  const elem = document.getElementsByTagName('web-social-share');
  if (elem && elem.length > 0) {
    elem[0].show = showValue;
  }
}

// Share options
const articleLink = 'https://exclusive.says.com/my/exclusive/why-mosquitoes-bite-you/';
const share = {
  displayNames: true,
  config: [
    {
      facebook: {
        socialShareUrl: articleLink,
        socialSharePopupWidth: 400,
        socialSharePopupHeight: 400
      }
    },
    {
      twitter: {
        socialShareUrl: articleLink,
        socialSharePopupWidth: 300,
        socialSharePopupHeight: 400
      }
    },
    {
      whatsapp: {
        socialShareText: `Why Do Some People Always Get Bitten By Mosquitoes While Others Don't?`,
        socialShareUrl: articleLink
      }
    },
    {
      copy: {
        socialShareUrl: articleLink
      }
    },
    {
      telegram: {
        socialShareText: `Why Do Some People Always Get Bitten By Mosquitoes While Others Don't?`,
        socialShareUrl: articleLink,
        socialSharePopupWidth: 300,
        socialSharePopupHeight: 400
      }
    }
  ]
};

document.addEventListener('DOMContentLoaded', (event) => {
  const elem = document.getElementsByTagName('web-social-share');
  if (elem && elem.length > 0) {
    elem[0].share = share;
  }
});

const openSocialShareButton = document.querySelector("#social-share");

openSocialShareButton.onclick = () => {
  show(true);
}