/* Carousel Slider */
(function () {
  let slideIndex = 1;

  const slides = document.querySelector(".carousel__slides"),
    slideItems = slides.querySelectorAll(".carousel__slide-item"),
    prev = document.querySelector(".carousel__prev"),
    next = document.querySelector(".carousel__next"),
    dotsWrapper = document.querySelector(".carousel__dots"),
    dots = document.querySelectorAll(".carousel__dot");

  window.addEventListener("DOMContentLoaded", function () {
    slidesWidth(slideItems);
    showSlides(1);
    function slidesWidth(elem) {
      slides.style.width = `${100 * elem.length}%`;
    }
    function showSlides(index) {
      if (index > slideItems.length) {
        slideIndex = 1;
      }
      if (index < 1) {
        slideIndex = slideItems.length;
      }

      dots.forEach((dot) => dot.classList.remove("dot--active"));
      dots[slideIndex - 1].classList.add("dot--active");
      slides.style.transform = `translateX(${
        -(100 / slideItems.length) * (slideIndex - 1)
      }%)`;
    }

    function nextSlide(index) {
      showSlides((slideIndex += index));
    }

    function currentSlide(index) {
      showSlides((slideIndex = index));
    }

    prev.addEventListener("click", function () {
      nextSlide(-1);
    });
    next.addEventListener("click", function () {
      nextSlide(1);
    });


    dotsWrapper.addEventListener("click", function (event) {
      const target = event.target;
     
      for (let i = 0; i <= slideItems.length + 1; i++) {
        if (
          target &&
          target.classList.contains("carousel__dot") &&
          target == dots[i - 1]
        ) {
          currentSlide(i);
        }
      }
    });

    function autoPlay(ms) {
      setInterval(() => {
        showSlides((slideIndex += 1));
      }, ms);
      
      /*If you need to write manipulations with the auto play button*/
    }
    autoPlay(5000);
    /* Swipe event */

    let touchstartX = 0;
    let touchendX = 0;

    function handleGesture() {
      if (touchendX < touchstartX) {
        nextSlide(1);
      }
      if (touchendX > touchstartX) {
        nextSlide(-1);
      }
    }

    slides.addEventListener("touchstart", (e) => {
      touchstartX = e.changedTouches[0].screenX;
    });

    slides.addEventListener("touchend", (e) => {
      touchendX = e.changedTouches[0].screenX;
      handleGesture();
    });
  });
})();

/* Fade Slider */

(function () {
  let slideIndex = 1;
  const slides = document.querySelectorAll(".fade__slide-item"),
    prev = document.querySelector(".fade__prev"),
    next = document.querySelector(".fade__next"),
    dotsWrapper = document.querySelector(".fade__dots"),
    dots = document.querySelectorAll(".fade__dot");

  window.addEventListener("DOMContentLoaded", function () {
    showSlides(1);
    function showSlides(index) {
      if (index > slides.length) {
        slideIndex = 1;
      }
      if (index < 1) {
        slideIndex = slides.length;
      }
      slides.forEach((dot) => dot.classList.remove("show"));
      dots.forEach((dot) => dot.classList.remove("dot--active"));

      slides[slideIndex - 1].classList.add("show");
      dots[slideIndex - 1].classList.add("dot--active");
    }

    function nextSlide(index) {
      showSlides((slideIndex += index));
    }

    function currentSlide(index) {
      showSlides((slideIndex = index));
    }

    function autoPlay(ms) {
      setInterval(() => {
        showSlides((slideIndex += 1));
      }, ms);
    }

    /* Calling the autoPlay function of a slider dependency */

    prev.addEventListener("click", function () {
      nextSlide(-1);
    });

    next.addEventListener("click", function () {
      nextSlide(1);
    });

    dotsWrapper.addEventListener("click", function (event) {
      const target = event.target;
      for (let i = 0; i <= slides.length; i++) {
        if (
          target &&
          target.classList.contains("fade__dot") &&
          target == dots[i - 1]
        ) {
          currentSlide(i);
        }
      }
    });

    let touchstartX = 0;
    let touchendX = 0;

    function handleGesture() {
      if (touchendX < touchstartX) {
        nextSlide(1);
      }
      if (touchendX > touchstartX) {
        nextSlide(-1);
      }
    }

    slides.forEach((slide) => {
      slide.addEventListener("touchstart", (e) => {
        touchstartX = e.changedTouches[0].screenX;
      });

      slide.addEventListener("touchend", (e) => {
        touchendX = e.changedTouches[0].screenX;
        handleGesture();
      });
    });
  });
})();
