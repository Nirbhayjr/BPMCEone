// Theme management utility
export type Theme = 'dark' | 'light';

const THEME_KEY = 'theme';
const DEFAULT_THEME: Theme = 'dark';

export const getTheme = (): Theme => {
  if (typeof window === 'undefined') return DEFAULT_THEME;
  
  const stored = localStorage.getItem(THEME_KEY);
  return (stored === 'light' || stored === 'dark') ? stored : DEFAULT_THEME;
};

export const setTheme = (theme: Theme): void => {
  if (typeof window === 'undefined') return;
  
  localStorage.setItem(THEME_KEY, theme);
  
  if (theme === 'dark') {
    document.documentElement.classList.add('dark');
  } else {
    document.documentElement.classList.remove('dark');
  }
};

export const initTheme = (): void => {
  const theme = getTheme();
  setTheme(theme);
};

export const toggleTheme = (): Theme => {
  const current = getTheme();
  const next = current === 'dark' ? 'light' : 'dark';
  setTheme(next);
  return next;
};
