// --- Gestion du thème via icône 🌗 ---
const iconToggle = document.getElementById('themeSwitch');

if (iconToggle) {
  iconToggle.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);

    // met à jour le switch s'il existe aussi
    const switchToggle = document.getElementById('theme-toggle');
    if (switchToggle) {
      switchToggle.checked = newTheme === 'dark';
    }
  });
}

// --- Gestion du thème via le switch slider ---
const switchToggle = document.getElementById('theme-toggle');

if (switchToggle) {
  switchToggle.addEventListener('change', function () {
    const theme = this.checked ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);

    // met à jour l'icône si elle existe aussi
    const iconToggle = document.getElementById('themeSwitch');
    if (iconToggle) {
      // rien à faire ici, juste garder la synchro
    }
  });
}

// --- Appliquer le thème au chargement ---
const storedTheme = localStorage.getItem('theme') || 'light';
document.documentElement.setAttribute('data-theme', storedTheme);

// Met à jour le switch si besoin
if (switchToggle) {
  switchToggle.checked = storedTheme === 'dark';
}
