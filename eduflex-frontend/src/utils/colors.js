function getVar(name, fallback = '') {
  if (typeof window === 'undefined') return fallback;
  return getComputedStyle(document.documentElement).getPropertyValue(name).trim() || fallback;
}

const colors = {
  primary: {
    main: getVar('--color-primary-main', '#2563eb'),
    light: getVar('--color-primary-light', '#60a5fa'),
    dark: getVar('--color-primary-dark', '#1d4ed8'),
    50: getVar('--color-primary-50', '#eff6ff'),
    100: getVar('--color-primary-100', '#dbeafe'),
    200: getVar('--color-primary-200', '#bfdbfe'),
    500: getVar('--color-primary-500', '#3b82f6'),
    600: getVar('--color-primary-600', '#2563eb'),
    700: getVar('--color-primary-700', '#1d4ed8'),
    800: getVar('--color-primary-800', '#1e40af'),
    900: getVar('--color-primary-900', '#1e3a8a'),
  },
  secondary: {
    main: getVar('--color-secondary-main', '#16a34a'),
    light: getVar('--color-secondary-light', '#4ade80'),
    dark: getVar('--color-secondary-dark', '#15803d'),
    50: getVar('--color-secondary-50', '#f0fdf4'),
    100: getVar('--color-secondary-100', '#dcfce7'),
    200: getVar('--color-secondary-200', '#bbf7d0'),
    500: getVar('--color-secondary-500', '#22c55e'),
    600: getVar('--color-secondary-600', '#16a34a'),
    700: getVar('--color-secondary-700', '#15803d'),
  },
  accent: {
    main: getVar('--color-accent-main', '#9333ea'),
    light: getVar('--color-accent-light', '#c084fc'),
    dark: getVar('--color-accent-dark', '#7e22ce'),
    50: getVar('--color-accent-50', '#faf5ff'),
    100: getVar('--color-accent-100', '#f3e8ff'),
    200: getVar('--color-accent-200', '#e9d5ff'),
  },
  neutral: {
    white: getVar('--color-neutral-white', '#ffffff'),
    50: getVar('--color-neutral-50', '#f8fafc'),
    100: getVar('--color-neutral-100', '#f1f5f9'),
    200: getVar('--color-neutral-200', '#e2e8f0'),
    300: getVar('--color-neutral-300', '#cbd5e1'),
    400: getVar('--color-neutral-400', '#94a3b8'),
    500: getVar('--color-neutral-500', '#64748b'),
    600: getVar('--color-neutral-600', '#475569'),
    700: getVar('--color-neutral-700', '#334155'),
    800: getVar('--color-neutral-800', '#1e293b'),
    900: getVar('--color-neutral-900', '#0f172a'),
  }
};

export default colors;