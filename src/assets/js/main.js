(function () {
  "use strict";
  /** Easy selector helper function */
  const select = (el, all = false) => {
    el = el.trim()
    if (all) {
      return [...document.querySelectorAll(el)]
    } else {
      return document.querySelector(el)
    }
  }

  /** Easy event listener function */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all)
    if (selectEl) {
      if (all) {
        selectEl.forEach(e => e.addEventListener(type, listener))
      } else {
        selectEl.addEventListener(type, listener)
      }
    }
  }

  /** Easy on scroll event listener */
  const onscroll = (el, listener) => {
    el.addEventListener('scroll', listener)
  }

  /**After Window Loads */
  window.addEventListener('load', () => {
    /** Preloader */
    let preloader = select('#preloader');
    if (preloader) {
      window.addEventListener('load', () => {
        preloader.remove()
      });
    }

    /** Animation on scroll */
    AOS.init({
      duration: 1000,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });    

    window.addEventListener("scroll", ()=> {
      let header = document.querySelector("#header")
      let backtotop = select('.back-to-top')
      if(window.scrollY > 20) {
        header.classList.add('fixed-top')
        if(window.scrollY > 100) {
          backtotop.classList.add('active')
          backtotop.addEventListener('onclick', () => {
            window.scrollY = 0;
          })
        }else {
          backtotop.classList.remove('active')
        }
      }else {
        if (header.classList.contains('fixed-top')) {
          header.classList.remove('fixed-top');
        }
      }
    })
  });

})()