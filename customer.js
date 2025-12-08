document.addEventListener("DOMContentLoaded", () => {
  // ===== STAR RATING =====
  const stars = document.querySelectorAll(".rating .star");
  let selectedRating = 0;

  stars.forEach((star) => {
    star.addEventListener("click", () => {
      selectedRating = parseInt(star.dataset.value);
      stars.forEach((s) => s.classList.remove("selected"));
      for (let i = 0; i < selectedRating; i++)
        stars[i].classList.add("selected");
    });

    star.addEventListener("mouseover", () =>
      highlightStars(star.dataset.value)
    );
    star.addEventListener("mouseout", () => highlightStars(selectedRating));
  });

  function highlightStars(rating) {
    stars.forEach((star) => {
      if (star.dataset.value <= rating) star.classList.add("selected");
      else star.classList.remove("selected");
    });
  }

  // ===== POPUP =====
  const popup = document.getElementById("popup");
  const popupContent = popup.querySelector(".popup-content");
  const popupMessage = document.getElementById("popup-message");
  const popupClose = document.getElementById("popup-close");

  const showPopup = (message, type = "success") => {
    popupMessage.textContent = message;
    popupContent.classList.remove("success", "error");
    popupContent.classList.add(type);
    popup.style.display = "flex";
  };

  popupClose.addEventListener("click", () => (popup.style.display = "none"));
  window.addEventListener("click", (e) => {
    if (e.target === popup) popup.style.display = "none";
  });

  // ===== FORM SUBMISSION =====
  const reviewForm = document.getElementById("reviewForm");
  reviewForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("name").value.trim();
    const comment = document.getElementById("comment").value.trim();

    if (selectedRating === 0)
      return showPopup("☕ Oops! Don’t forget to rate us before submitting.");
    if (!name || !comment)
      return showPopup("Please fill in both name and comment.", "error");

    // Reset form and rating
    reviewForm.reset();
    selectedRating = 0;
    highlightStars(0);

    // Show thank you popup
    showPopup("✨ Thank you! Your feedback helps us brew a better experience.");
  });

  // ===== READ MORE TOGGLES =====
  document.querySelectorAll(".read-more").forEach((btn) => {
    btn.addEventListener("click", () => {
      const comment = btn.previousElementSibling;
      comment.classList.toggle("expanded");
      btn.textContent = comment.classList.contains("expanded")
        ? "Read less"
        : "Read more";
    });
  });

  // ===== LIKE & HELPFUL BUTTONS =====
  document.querySelectorAll(".like-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      btn.classList.toggle("liked");
      btn.innerHTML = btn.classList.contains("liked")
        ? '<i class="fa-solid fa-thumbs-up"></i> Liked'
        : '<i class="fa-regular fa-thumbs-up"></i> Like';
    });
  });

  document.querySelectorAll(".helpful-btn").forEach((btn) => {
    btn.addEventListener("click", () => {
      btn.classList.toggle("helpfuled");
      btn.innerHTML = btn.classList.contains("helpfuled")
        ? '<i class="fa-solid fa-circle-question"></i> Marked'
        : '<i class="fa-regular fa-circle-question"></i> Helpful';
    });
  });
});
