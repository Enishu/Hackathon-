const themeToggle = document.getElementById("themeToggle");
const root = document.documentElement;

// Activer thème sombre
function enableDarkMode() {
  root.classList.add("dark");
  themeToggle.textContent = "☀️ Mode clair";
  localStorage.setItem("theme", "dark");
}

// Activer thème clair
function enableLightMode() {
  root.classList.remove("dark");
  themeToggle.textContent = "🌙 Mode sombre";
  localStorage.setItem("theme", "light");
}

// Vérifier thème existant
const savedTheme = localStorage.getItem("theme");

if (savedTheme === "dark") {
  enableDarkMode();
} else if (savedTheme === "light") {
  enableLightMode();
} else {
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
  const hour = new Date().getHours();
  const isNightTime = hour >= 20 || hour < 6;

  if (prefersDark || isNightTime) {
    enableDarkMode();
  } else {
    enableLightMode();
  }
}

// Toggle manuel
themeToggle.addEventListener("click", () => {
  if (root.classList.contains("dark")) {
    enableLightMode();
  } else {
    enableDarkMode();
  }
});
