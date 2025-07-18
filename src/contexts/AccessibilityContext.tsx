import React, { createContext, useContext, useState, useEffect } from 'react';
import { prefersReducedMotion } from '../utils/accessibility';

interface AccessibilityContextType {
  reducedMotion: boolean;
  highContrast: boolean;
  fontSize: 'normal' | 'large' | 'extra-large';
  setReducedMotion: (value: boolean) => void;
  setHighContrast: (value: boolean) => void;
  setFontSize: (size: 'normal' | 'large' | 'extra-large') => void;
}

const AccessibilityContext = createContext<AccessibilityContextType | undefined>(undefined);

export const useAccessibility = () => {
  const context = useContext(AccessibilityContext);
  if (!context) {
    throw new Error('useAccessibility must be used within AccessibilityProvider');
  }
  return context;
};

export const AccessibilityProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [reducedMotion, setReducedMotion] = useState(prefersReducedMotion());
  const [highContrast, setHighContrast] = useState(false);
  const [fontSize, setFontSize] = useState<'normal' | 'large' | 'extra-large'>('normal');

  // Listen for system preference changes
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handleChange = (e: MediaQueryListEvent) => {
      setReducedMotion(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  // Apply classes to document body
  useEffect(() => {
    document.body.classList.toggle('reduced-motion', reducedMotion);
    document.body.classList.toggle('high-contrast', highContrast);
    document.body.classList.remove('font-normal', 'font-large', 'font-extra-large');
    document.body.classList.add(`font-${fontSize}`);
  }, [reducedMotion, highContrast, fontSize]);

  // Save preferences to localStorage
  useEffect(() => {
    localStorage.setItem('a11y-reduced-motion', String(reducedMotion));
    localStorage.setItem('a11y-high-contrast', String(highContrast));
    localStorage.setItem('a11y-font-size', fontSize);
  }, [reducedMotion, highContrast, fontSize]);

  // Load preferences from localStorage on mount
  useEffect(() => {
    const savedReducedMotion = localStorage.getItem('a11y-reduced-motion');
    const savedHighContrast = localStorage.getItem('a11y-high-contrast');
    const savedFontSize = localStorage.getItem('a11y-font-size');

    if (savedReducedMotion !== null) {
      setReducedMotion(savedReducedMotion === 'true');
    }
    if (savedHighContrast !== null) {
      setHighContrast(savedHighContrast === 'true');
    }
    if (savedFontSize && ['normal', 'large', 'extra-large'].includes(savedFontSize)) {
      setFontSize(savedFontSize as 'normal' | 'large' | 'extra-large');
    }
  }, []);

  const value = {
    reducedMotion,
    highContrast,
    fontSize,
    setReducedMotion,
    setHighContrast,
    setFontSize,
  };

  return (
    <AccessibilityContext.Provider value={value}>
      {children}
    </AccessibilityContext.Provider>
  );
};

export default AccessibilityContext;