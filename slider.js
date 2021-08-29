/* Carousel Slider */
(function () {
  

  const slider = document.querySelector(".carousel"),
    slides = document.querySelector(".carousel__slides"),
    prev = document.querySelector(".carousel__prev"),
    next = document.querySelector(".carousel__next"),
    dotsWrapper = document.querySelector(".carousel__dots"),
    dots = document.querySelectorAll(".carousel__dot");

  window.addEventListener("DOMContentLoaded", function () {
    
function slide(wrapper, items, prev, next) {
  let posX1 = 0,
      posX2 = 0,
      posInitial,
      posFinal,
      threshold = 100,
      slidesItem = items.querySelectorAll('.carousel__slide-item'),
      slidesLength = slidesItem.length,
      slideSize = items.querySelectorAll('.carousel__slide-item')[0].offsetWidth,
      firstSlide =  slidesItem[0],
      lastSlide =  slidesItem[slidesLength - 1],
      cloneFirst = firstSlide.cloneNode(true),
      cloneLast = lastSlide.cloneNode(true),
      index = 0,
      allowShift = true;
  
  // Clone first and last slide
  items.appendChild(cloneFirst);
  items.insertBefore(cloneLast, firstSlide);
  wrapper.classList.add('loaded');
  
  // Mouse events
  items.onmousedown = dragStart;
  
  // Touch events
  items.addEventListener('touchstart', dragStart);
  items.addEventListener('touchend', dragEnd);
  items.addEventListener('touchmove', dragAction);
  
  // Click events
  prev.addEventListener('click', function () { shiftSlide(-1) ;});
  next.addEventListener('click', function () { shiftSlide(1) ;});
  
  // Transition events
  items.addEventListener('transitionend', checkIndex);
  
  function dragStart (e) {
    e = e || window.event;
    e.preventDefault();
    posInitial = items.offsetLeft;
    
    if (e.type == 'touchstart') {
      posX1 = e.touches[0].clientX;
    } else {
      posX1 = e.clientX;
      document.onmouseup = dragEnd;
      document.onmousemove = dragAction;
    }
  }

  function dragAction (e) {
    e = e || window.event;
    
    if (e.type == 'touchmove') {
      posX2 = posX1 - e.touches[0].clientX;
      posX1 = e.touches[0].clientX;
    } else {
      posX2 = posX1 - e.clientX;
      posX1 = e.clientX;
    }
    items.style.left = (items.offsetLeft - posX2) + "px";
  }
  
  function dragEnd (e) {
    posFinal = items.offsetLeft;
    if (posFinal - posInitial < -threshold) {
      shiftSlide(1, 'drag');
    } else if (posFinal - posInitial > threshold) {
      shiftSlide(-1, 'drag');
    } else {
      items.style.left = (posInitial) + "px";
    }

    document.onmouseup = null;
    document.onmousemove = null;
  }
  
  function shiftSlide(dir, action) {
    items.classList.add('shifting');

    if (allowShift) {
    
      if (!action) { posInitial = items.offsetLeft; }

      if (dir == 1) {
        items.style.left = (posInitial - slideSize)-   /*we take into account indents -->*/ 20 + "px";
        index++;      
      } else if (dir == -1) {
        items.style.left = (posInitial + slideSize) +  /*we take into account indents -->*/ 20 + "px";
        index--;      
      }
      currentDots(index);
      
    }
    allowShift = false;

  }
    
  function checkIndex (){
    items.classList.remove('shifting');

    if (index == -1) {
      items.style.left = -(slidesLength * slideSize) - /*we take into account indents -->*/ 120  + "px";
      index = slidesLength - 1;
    }

    if (index == slidesLength) {
      items.style.left = -(1 * slideSize) -  /*we take into account indents -->*/ 20  + "px";
      index = 0;
    }
    
    allowShift = true;
  }

   function currentDots(idx) {

    dots.forEach(dot=> dot.classList.remove('dot--active'));
    if(idx === dots.length){
      dots[0].classList.add('dot--active'); 
     
    }else if(idx < 0){
      dots[dots.length-1].classList.add('dot--active'); 
    }
    else{
      dots[idx].classList.add('dot--active'); 
    }
  }

  function autoPlay(ms) {
    setInterval(() => {
      shiftSlide((1));
    }, ms);
  }
   /*If you need to write manipulations with the auto play button*/
  
  autoPlay(5000);

}

slide(slider, slides, prev, next);
    
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
