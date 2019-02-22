const menu = document.querySelector('#nav-ul');
const meniIcon = document.querySelector('#main-nav-icon');

meniIcon.addEventListener('click', () => {
    menu.classList.toggle('show');
    meniIcon.classList.toggle('open');
});

function scrollIt(destination, duration = 200, easing = 'linear', callback) {
   const easings = {
    easeOutQuad(t) {
      return t * (2 - t);
    }
  };

  const start = window.pageYOffset;
  const startTime = 'now' in window.performance ? performance.now() : new Date().getTime();
  const documentHeight = Math.max(document.body.scrollHeight, document.body.offsetHeight, document.documentElement.clientHeight, document.documentElement.scrollHeight, document.documentElement.offsetHeight);
  const windowHeight = window.innerHeight || document.documentElement.clientHeight || document.getElementsByTagName('body')[0].clientHeight;
  const destinationOffset = typeof destination === 'number' ? destination : destination.offsetTop;
  const destinationOffsetToScroll = Math.round(documentHeight - destinationOffset < windowHeight ? documentHeight - windowHeight : destinationOffset);

  if ('requestAnimationFrame' in window === false) {
    window.scroll(0, destinationOffsetToScroll);
    if (callback) {
      callback();
    }
    return;
  }

  function scroll() {
    const now = 'now' in window.performance ? performance.now() : new Date().getTime();
    const time = Math.min(1, ((now - startTime) / duration));
    const timeFunction = easings[easing](time);
    window.scroll(0, Math.ceil((timeFunction * (destinationOffsetToScroll - start)) + start));

    if (window.pageYOffset === destinationOffsetToScroll) {
      if (callback) {
        callback();
      }
      return;
    }

    requestAnimationFrame(scroll);
  }
  scroll();
}

document.querySelector('.home-link').addEventListener('click', () => {
  scrollIt(
    document.querySelector('.top'),
    300,
    'easeOutQuad',
    () => console.log(`Just finished scrolling to ${window.pageYOffset}px`)
  );
});

document.querySelector('.about-link').addEventListener('click', () => {
  scrollIt(
    document.querySelector('.about'),
    300,
    'easeOutQuad',
    () => console.log(`Just finished scrolling to ${window.pageYOffset}px`)
  );
});

document.querySelector('.contact-link').addEventListener('click', () => {
  scrollIt(
    document.querySelector('.contact'),
    300,
    'easeOutQuad',
    () => console.log(`Just finished scrolling to ${window.pageYOffset}px`)
  );
});