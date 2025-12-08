document.addEventListener("DOMContentLoaded", () => {
  const divAvt = document.getElementById("avatar-container");
  const registerbtn = document.getElementById("registerbtn");
  const Signinbtn = document.getElementById("Signinbtn");
  const name_id = document.getElementById("name-id");

  const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

  if (loggedInUser && loggedInUser.firstName) {
    registerbtn.style.display = "none";
    Signinbtn.style.display = "none";
    divAvt.style.display = "flex";
    name_id.textContent = `${loggedInUser.firstName} ${
      loggedInUser.lastName || ""
    }`;
  } else {
    divAvt.style.display = "none";
    registerbtn.style.display = "block";
    Signinbtn.style.display = "block";
  }

  if (divAvt) {
    divAvt.addEventListener("click", () => {
      window.location.href = "profile.html";
    });
  }

  const logoutBtn = document.getElementById("logout-btn");
  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      localStorage.removeItem("loggedInUser");
      location.href = "login.html";
    });
  }

  const user = JSON.parse(localStorage.getItem("loggedInUser"));
  if (!user) {
    window.location.href = "login.html";
    return;
  }

  document.getElementById("fixed-name").textContent =
    user.firstName + " " + user.lastName;
  document.getElementById("fixed-email").textContent =
    user.email || "user@example.com";

  const fields = {
    age: user.age || "N/A",
    location: user.location || "Unknown",
    joined: user.joinedDate || "N/A",
    orders: user.ordersPlaced || "0",
    favorites: user.favoritesCount || "0",
    points: user.rewardPoints || "0",
    membership: user.membershipTier || "Premium",
    favoriteCoffee: user.favoriteCoffee || "Unknown",
    brewMethod: user.brewMethod || "Unknown",
    delivery: user.deliveryPref || "Unknown",
  };

  for (const key in fields) {
    const el = document.querySelector(`[data-field=${key}]`);
    if (el) el.textContent = fields[key];
  }

  const editBtn = document.getElementById("editBtn");
  editBtn.addEventListener("click", function () {
    const fieldEls = document.querySelectorAll("[data-field]");
    const isEditing = this.textContent === "Save Profile";

    if (isEditing) {
      const updatedUser =
        JSON.parse(localStorage.getItem("loggedInUser")) || {};

      fieldEls.forEach((field) => {
        if (field.dataset.field === "membership") return;

        const input = field.querySelector("input");
        if (input) {
          const value = input.value;
          updatedUser[field.dataset.field] = value;
          field.textContent = value;
        }
      });

      localStorage.setItem("loggedInUser", JSON.stringify(updatedUser));
      this.textContent = "Edit Profile";
    } else {
      fieldEls.forEach((field) => {
        if (field.dataset.field === "membership") return;
        const currentValue = field.textContent;
        field.innerHTML = `<input type="text" value="${currentValue}" />`;
      });

      this.textContent = "Save Profile";
    }
  });
});
