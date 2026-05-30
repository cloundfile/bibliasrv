'use client';

import { createContext, useContext, useState, useEffect, useCallback } from 'react';

const AccessibilityContext = createContext();

export function useAccessibility() {
  const ctx = useContext(AccessibilityContext);
  if (!ctx) throw new Error('useAccessibility must be used within AccessibilityProvider');
  return ctx;
}

const FONT_SIZES = ['small', 'medium', 'large', 'xlarge'];
const FONT_LABELS = { small: 'P', medium: 'M', large: 'G', xlarge: 'XG' };

const MODE_CYCLE = [
  { theme: 'light', highContrast: false, label: 'Claro', aria: 'Alternar para modo escuro' },
  { theme: 'dark', highContrast: false, label: 'Escuro', aria: 'Alternar para alto contraste' },
  { theme: 'dark', highContrast: true, label: 'Alto Contraste', aria: 'Alternar para modo claro' },
];

export default function AccessibilityProvider({ children }) {
  const [fontSize, setFontSize] = useState('medium');
  const [highContrast, setHighContrast] = useState(false);
  const [theme, setTheme] = useState('light');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    try {
      const savedSize = localStorage.getItem('biblia-font-size');
      const savedContrast = localStorage.getItem('biblia-high-contrast');
      const savedTheme = localStorage.getItem('biblia-theme');
      if (FONT_SIZES.includes(savedSize)) setFontSize(savedSize);
      if (savedContrast === 'true') setHighContrast(true);
      if (savedTheme === 'light' || savedTheme === 'dark') setTheme(savedTheme);
    } catch {}
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    document.documentElement.setAttribute('data-font-size', fontSize);
    try { localStorage.setItem('biblia-font-size', fontSize); } catch {}
  }, [fontSize, mounted]);

  useEffect(() => {
    if (!mounted) return;
    document.documentElement.setAttribute('data-high-contrast', String(highContrast));
    try { localStorage.setItem('biblia-high-contrast', String(highContrast)); } catch {}
  }, [highContrast, mounted]);

  useEffect(() => {
    if (!mounted) return;
    if (theme === 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.removeAttribute('data-theme');
    }
    try { localStorage.setItem('biblia-theme', theme); } catch {}
  }, [theme, mounted]);

  const currentModeIdx = MODE_CYCLE.findIndex(
    m => m.theme === theme && m.highContrast === highContrast
  );

  const cycleMode = useCallback(() => {
    const nextIdx = (currentModeIdx + 1) % MODE_CYCLE.length;
    const next = MODE_CYCLE[nextIdx];
    setTheme(next.theme);
    setHighContrast(next.highContrast);
  }, [currentModeIdx]);

  const increaseFont = useCallback(() => {
    setFontSize(prev => {
      const idx = FONT_SIZES.indexOf(prev);
      return FONT_SIZES[Math.min(idx + 1, FONT_SIZES.length - 1)];
    });
  }, []);

  const decreaseFont = useCallback(() => {
    setFontSize(prev => {
      const idx = FONT_SIZES.indexOf(prev);
      return FONT_SIZES[Math.max(idx - 1, 0)];
    });
  }, []);

  const currentMode = currentModeIdx >= 0 ? MODE_CYCLE[currentModeIdx] : MODE_CYCLE[0];

  return (
    <AccessibilityContext.Provider value={{
      fontSize,
      fontLabel: FONT_LABELS[fontSize],
      modeLabel: currentMode.label,
      modeNextAria: MODE_CYCLE[(currentModeIdx + 1) % MODE_CYCLE.length].aria,
      cycleMode,
      increaseFont,
      decreaseFont,
      isMinFont: fontSize === 'small',
      isMaxFont: fontSize === 'xlarge',
    }}>
      {children}
    </AccessibilityContext.Provider>
  );
}
