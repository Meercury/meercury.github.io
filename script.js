(() => {
  const root = document.documentElement;
  const toggle = document.querySelector('.theme-toggle');
  const label = document.querySelector('.theme-label');
  const icon = document.querySelector('.theme-icon');
  const year = document.querySelector('#current-year');

  let savedTheme = null;
  try {
    savedTheme = localStorage.getItem('homepage-theme');
  } catch {
    // The page still works when browser storage is unavailable.
  }

  const setTheme = (theme) => {
    const isDark = theme === 'dark';
    root.dataset.theme = isDark ? 'dark' : 'light';
    toggle?.setAttribute('aria-pressed', String(isDark));
    toggle?.setAttribute('aria-label', `Switch to ${isDark ? 'light' : 'dark'} mode`);
    if (label) label.textContent = `${isDark ? 'Light' : 'Dark'} mode`;
    if (icon) icon.textContent = isDark ? '☀' : '◐';
  };

  setTheme(savedTheme === 'dark' ? 'dark' : 'light');

  toggle?.addEventListener('click', () => {
    const nextTheme = root.dataset.theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    try {
      localStorage.setItem('homepage-theme', nextTheme);
    } catch {
      // Theme switching remains available for this visit.
    }
  });

  if (year) year.textContent = String(new Date().getFullYear());
})();
