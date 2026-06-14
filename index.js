/*
AI-assisted project:
The initial JavaScript idea was generated with AI support and then manually customized.
This file contains authentication logic, logout, theme toggle, reveal animations and download action.
*/

document.addEventListener("DOMContentLoaded", function () {
  const loginScreen = document.getElementById("loginScreen");
  const portfolio = document.getElementById("portfolio");
  const loginForm = document.getElementById("loginForm");
  const usernameInput = document.getElementById("username");
  const passwordInput = document.getElementById("password");
  const loginError = document.getElementById("loginError");
  const logoutBtn = document.getElementById("logoutBtn");
  const themeToggle = document.getElementById("themeToggle");
  const downloadBtn = document.getElementById("downloadBtn");
  const navLinks = document.querySelectorAll(".nav a");
  const revealItems = document.querySelectorAll(".reveal");

  const DEMO_USERNAME = "test";
  const DEMO_PASSWORD = "test";

  function showPortfolio() {
    loginScreen.classList.add("hidden");
    portfolio.classList.remove("hidden");
    triggerRevealAnimation();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function showLogin() {
    portfolio.classList.add("hidden");
    loginScreen.classList.remove("hidden");
    usernameInput.value = "";
    passwordInput.value = "";
    loginError.textContent = "";
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function validateLogin(username, password) {
    if (!username.trim() || !password.trim()) {
      loginError.textContent = "Please fill in all fields";
      return false;
    }

    if (username !== DEMO_USERNAME || password !== DEMO_PASSWORD) {
      loginError.textContent = "Invalid username or password";
      return false;
    }

    loginError.textContent = "";
    return true;
  }

  loginForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const username = usernameInput.value;
    const password = passwordInput.value;

    if (validateLogin(username, password)) {
      showPortfolio();
    }
  });

  logoutBtn.addEventListener("click", function () {
    showLogin();
  });

  themeToggle.addEventListener("click", function () {
    document.body.classList.toggle("dark-mode");
    themeToggle.textContent = document.body.classList.contains("dark-mode") ? "☀️" : "🌙";
  });

  downloadBtn.addEventListener("click", function () {
    window.print();
  });

  navLinks.forEach(function (link) {
    link.addEventListener("click", function (event) {
      event.preventDefault();
      const targetId = this.getAttribute("href");
      const targetSection = document.querySelector(targetId);

      if (targetSection) {
        targetSection.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  });

  function triggerRevealAnimation() {
    revealItems.forEach(function (item) {
      item.classList.remove("show");
    });

    const observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("show");
          }
        });
      },
      {
        threshold: 0.12
      }
    );

    revealItems.forEach(function (item) {
      observer.observe(item);
    });
  }

  showLogin();
});