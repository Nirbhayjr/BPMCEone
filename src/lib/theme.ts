// Theme management utility - Force dark mode for premium institutional theme
export type Theme = 'dark';

const THEME_KEY = 'theme';
const DEFAULT_THEME: Theme = 'dark';

export const getTheme = (): Theme => {
  return DEFAULT_THEME;
};

export const setTheme = (): void => {
  if (typeof window === 'undefined') return;
  
  localStorage.setItem(THEME_KEY, 'dark');
  document.documentElement.classList.add('dark');
  
  // Apply theme before first render to prevent flash
  document.documentElement.style.colorScheme = 'dark';
};

export const initTheme = (): void => {
  // Force dark mode immediately
  if (typeof window !== 'undefined') {
    document.documentElement.classList.add('dark');
    document.documentElement.style.colorScheme = 'dark';
    localStorage.setItem(THEME_KEY, 'dark');
  }
};

// Remove toggle functionality - always dark mode
export const toggleTheme = (): Theme => {
  return DEFAULT_THEME;
};
