import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { announceToScreenReader } from '../utils/accessibility';

/**
 * Custom hook to manage focus and announcements on route change
 * Ensures screen reader users are notified of page changes
 */
export const useFocusOnRouteChange = () => {
  const location = useLocation();

  useEffect(() => {
    const mainContent = document.getElementById('main-content');
    if (mainContent) {
      mainContent.focus();
    }
    window.scrollTo(0, 0);

    // Defer so child-page useEffects run first and set document.title
    const timer = setTimeout(() => {
      const pageTitle = document.title ||
                       document.querySelector('h1')?.textContent ||
                       'Page';
      announceToScreenReader(`Navigated to ${pageTitle}`, 'assertive');
    }, 100);

    return () => clearTimeout(timer);
  }, [location.pathname]);
};

export default useFocusOnRouteChange;