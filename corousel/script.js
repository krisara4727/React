let currentIndex = 0;
console.log("script loaded");

const slides = document.querySelectorAll(".slide");
function showSlide(index) {
  console.log("show");
  slides.forEach((slide, i) => {
    slide.style.transform = `translateX(-${(index * 100) / 3}%)`;
  });
}

function prevSlide() {
  currentIndex = (currentIndex - 1 + slides.length) % slides.length;
  showSlide(currentIndex);
}

function nextSlide() {
  currentIndex = (currentIndex + 1) % slides.length;
  showSlide(currentIndex);
}

showSlide(currentIndex);
