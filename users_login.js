const users = [
  { username: "krz", password: "4322" },
  { username: "admin", password: "admin123" },
];

//localStorage.setItem("loggedIn", false);

console.log("Before login:", localStorage.getItem("loggedIn"));

document.getElementById("loginBtn").addEventListener("click", () => {
  const username = document.getElementById("username").value.trim();
  const password = document.getElementById("password").value.trim();
  const error = document.getElementById("loginError");

  const user = users.find(u => u.username === username && u.password === password);

  if (user) {
    localStorage.setItem("loggedInUser", username);
    localStorage.setItem("loggedIn", "true");
    localStorage.setItem("lastActive", Date.now());
    
    console.log("Directing to the index page for user:", localStorage.getItem("loggedInUser"), ".")
    console.log("loggedIn:", localStorage.getItem("loggedIn"))

    window.location.href = "index.html";
  } else {
    error.classList.remove("hidden");
  }
});

