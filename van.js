document.addEventListener('DOMContentLoaded', () => {
  const slides = document.querySelectorAll('.carousel .slides img');
  const prevBtn = document.querySelector('.carousel .prev');
  const nextBtn = document.querySelector('.carousel .next');

  let currentIndex = 0;

  // Function to show slide at currentIndex
  function showSlide(index) {
    // Loop around
    if (index < 0) {
      currentIndex = slides.length - 1;
    } else if (index >= slides.length) {
      currentIndex = 0;
    } else {
      currentIndex = index;
    }

    // Move the slides container by translating
    const slidesContainer = document.querySelector('.carousel .slides');
    slidesContainer.style.transform = `translateX(-${currentIndex * 100}%)`;

    // Update active class for accessibility if needed (optional)
    slides.forEach((slide, i) => {
      slide.classList.toggle('active', i === currentIndex);
    });
  }

  // Event listeners for buttons
  prevBtn.addEventListener('click', () => {
    showSlide(currentIndex - 1);
  });

  nextBtn.addEventListener('click', () => {
    showSlide(currentIndex + 1);
  });

  // Optional: Auto slide every 5 seconds
  let autoSlideInterval = setInterval(() => {
    showSlide(currentIndex + 1);
  }, 4000);

  // Pause auto slide on hover
  const carousel = document.querySelector('.carousel');
  carousel.addEventListener('mouseenter', () => clearInterval(autoSlideInterval));
  carousel.addEventListener('mouseleave', () => {
    autoSlideInterval = setInterval(() => {
      showSlide(currentIndex + 1);
    }, 4000);
  });

  // Initialize first slide
  showSlide(currentIndex);
});



var divAvt = document.getElementById("avatar-container");
var registerbtn = document.getElementById("registerbtn");
var Signinbtn = document.getElementById("Signinbtn");
var name_id = document.getElementById("name-id");

var userID = localStorage.getItem("userID") || "";
var userName = localStorage.getItem("userName") || "";

if (userID != "") {
  registerbtn.style.display = "none";
  Signinbtn.style.display = "none";
  divAvt.style.display = "flex";
  name_id.innerHTML = userName;
} else {
  divAvt.style.display = "none";
  registerbtn.style.display = "block";
  Signinbtn.style.display = "block";
}
