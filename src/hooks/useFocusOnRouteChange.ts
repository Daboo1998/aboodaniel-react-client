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
    // Focus the main content area
    const mainContent = document.getElementById('main-content');
    if (mainContent) {
      mainContent.focus();
    }

    // Get the page title from the document or a heading
    const pageTitle = document.title || 
                     document.querySelector('h1')?.textContent || 
                     'Page';
    
    // Announce the page change to screen readers
    announceToScreenReader(`Navigated to ${pageTitle}`, 'assertive');

    // Scroll to top on route change
    window.scrollTo(0, 0);
  }, [location.pathname]);
};

export default useFocusOnRouteChange;