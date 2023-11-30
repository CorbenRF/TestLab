import Swiper from 'https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.mjs'


$(".accordion").accordion({
    heightStyle: "content",
    collapsible: true,
    active: false,
    icons: false,
  });

  var swiper = new Swiper(".mySwiper", {
    // setWrapperSize: true,
    slidesPerView: 3,
      spaceBetween: 30,
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    watchSlidesVisibility: true,
    breakpoints: {
      1240: {
          slidesPerView:3,
          spaceBetween: 30,
      },
      480: {
          slidesPerView:2,
          spaceBetween: 24,
      },
      0: {
        slidesPerView:1,
        spaceBetween: 10,
    },

  }
  });

  // burger func

  let burger = document.querySelector('.burger');
let menu = document.querySelector('.nav__service');
let menuLinks = menu.querySelectorAll('.nav__link');
burger.addEventListener('click',
  function () {
    burger.classList.toggle('burger--active');
    menu.classList.toggle('nav--active');

    document.body.classList.toggle('stop-scroll');
  }
)
menuLinks.forEach(function (el) {
  el.addEventListener('click', function () {
    burger.classList.remove('burger--active');
    menu.classList.remove('nav--active');
    document.body.classList.remove('stop-scroll');

  })
})

// burger func end