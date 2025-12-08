document.getElementById("signup-form").addEventListener("submit", function(e) {
  e.preventDefault();

  const firstName = document.getElementById("firstname").value.trim();
  const lastName = document.getElementById("lastname").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("pass").value.trim();

  const newUser = { firstName, lastName, email, password };

  // Get users array or initialize
  let users = JSON.parse(localStorage.getItem("users")) || [];

  // Check if email already exists
  if (users.some(user => user.email === email)) {
    alert("Email already registered! Please use another or sign in.");
    return;
  }

  users.push(newUser);
  localStorage.setItem("users", JSON.stringify(users));

  alert("Account created successfully! Please sign in.");
  window.location.href = "login.html";
});
