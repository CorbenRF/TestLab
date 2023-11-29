import Swiper from 'https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.mjs'


$(".accordion").accordion({
    heightStyle: "content",
    collapsible: true,
    active: false,
    icons: false,
  });

  var swiper = new Swiper(".mySwiper", {
    slidesPerView: auto,
      spaceBetween: 30,
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });

  // burger func

//   let burger = document.querySelector('.burger');
// let menu = document.querySelector('.nav__service');
// let menuLinks = menu.querySelectorAll('.nav__link');
// burger.addEventListener('click',
//   function () {
//     burger.classList.toggle('burger--active');
//     menu.classList.toggle('nav--active');

//     document.body.classList.toggle('stop-scroll');
//   }
// )
// menuLinks.forEach(function (el) {
//   el.addEventListener('click', function () {
//     burger.classList.remove('burger--active');
//     menu.classList.remove('nav--active');
//     document.body.classList.remove('stop-scroll');

//   })
// })

// burger func end