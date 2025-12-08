document.getElementById("signin-form").addEventListener("submit", function(e) {
  e.preventDefault();

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("pass").value.trim();

  let users = JSON.parse(localStorage.getItem("users")) || [];

  // Find matching user
  const matchedUser = users.find(user => user.email === email && user.password === password);

  if (matchedUser) {
    localStorage.setItem("loggedInUser", JSON.stringify(matchedUser));
    alert("Login successful!");
    window.location.href = "index.html";
  } else {
    alert("Invalid email or password.");
  }
});
