const users = [
  { username: "krz", password: "4322" },
  { username: "admin", password: "admin123" },
];

document.getElementById("loginBtn").addEventListener("click", () => {
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();
  const error = document.getElementById("loginError");

  const user = users.find(u => u.username === username && u.password === password);

  if (user) {
    // Save login state
    localStorage.setItem("loggedInUser", username);
    // Redirect to main page
    window.location.href = "index.html";
  } else {
    error.classList.remove("hidden");
  }
});