document.addEventListener("DOMContentLoaded", () => {
  const divAvt = document.getElementById("avatar-container");
  const registerbtn = document.getElementById("registerbtn");
  const Signinbtn = document.getElementById("Signinbtn");
  const name_id = document.getElementById("name-id");
  const avatarImg = document.querySelector("#avatar-container img.avatar");

  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

  if (loggedInUser) {
    registerbtn.style.display = "none";
    Signinbtn.style.display = "none";
    divAvt.style.display = "flex";

    // Display full name
    name_id.textContent = `${loggedInUser.firstName} ${loggedInUser.lastName}`;

    // Avatar click → profile
    if (avatarImg) {
      avatarImg.addEventListener("click", () => {
        window.location.href = "profile.html";
      });
    }
  } else {
    divAvt.style.display = "none";
    registerbtn.style.display = "block";
    Signinbtn.style.display = "block";

    // Avatar click → login (if shown for some reason)
    if (avatarImg) {
      avatarImg.addEventListener("click", () => {
        window.location.href = "login.html";
      });
    }
  }
});

// Logout button
document.getElementById("logout-btn")?.addEventListener("click", () => {
  localStorage.removeItem("loggedInUser");
  location.reload();
});
