import { useColorScheme } from 'nativewind';
import { useEffect } from 'react';
import { useStore } from '../store/useStore';

export function useTheme() {
  const { colorScheme, setColorScheme: setNWColorScheme } = useColorScheme();
  const isDark = useStore((state) => state.isDark);
  const setIsDark = useStore((state) => state.setIsDark);
  const toggleTheme = useStore((state) => state.toggleTheme);

  // Sync Zustand store theme state to NativeWind
  useEffect(() => {
    const targetScheme = isDark ? 'dark' : 'light';
    if (colorScheme !== targetScheme) {
      setNWColorScheme(targetScheme);
    }
  }, [isDark, colorScheme, setNWColorScheme]);

  const colors = {
    // Semantic colors mapping (WCAG AA compliant contrast ratio of >= 4.5:1)
    background: isDark ? '#0f172a' : '#ffffff', // slate-900 / white
    surface: isDark ? '#1e293b' : '#f8fafc', // slate-800 / slate-50
    surfaceCard: isDark ? '#1e293b' : '#ffffff', // slate-800 / white
    border: isDark ? '#334155' : '#e2e8f0', // slate-700 / slate-200
    borderSubtle: isDark ? '#1e293b' : '#f1f5f9', // slate-800 / slate-100
    
    text: isDark ? '#f8fafc' : '#0f172a', // slate-50 / slate-900
    textSecondary: isDark ? '#cbd5e1' : '#475569', // slate-300 / slate-600
    textMuted: isDark ? '#94a3b8' : '#64748b', // slate-400 / slate-500
    
    brandPurple: isDark ? '#c084fc' : '#7d50a0',
    brandOrange: isDark ? '#ff9d78' : '#f56e41',
    
    // Status colors
    success: isDark ? '#34d399' : '#16a34a', // emerald-400 / emerald-600
    warning: isDark ? '#facc15' : '#ca8a04', // amber-400 / amber-600
    error: isDark ? '#f87171' : '#dc2626', // red-400 / red-600
    info: isDark ? '#60a5fa' : '#2563eb', // blue-400 / blue-600
  };

  return {
    isDark,
    colorScheme: isDark ? 'dark' : 'light',
    setColorScheme: (scheme: 'light' | 'dark') => setIsDark(scheme === 'dark'),
    toggleColorScheme: toggleTheme,
    colors,
  };
}
