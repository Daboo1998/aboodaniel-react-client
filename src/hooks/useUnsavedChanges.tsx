import { useEffect, useRef, useState, useCallback } from 'react';
import { useHistory } from 'react-router-dom';

export interface UseUnsavedChangesOptions {
  when?: boolean;
  message?: string;
}

export const useUnsavedChanges = (options: UseUnsavedChangesOptions = {}) => {
  const {
    when = true,
    message = 'You have unsaved changes. Are you sure you want to leave this page?'
  } = options;

  const history = useHistory();
  const [isBlocking, setIsBlocking] = useState(false);
  const savedCallback = useRef<() => void>();

  // Track if there are unsaved changes
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);

  // Function to mark form as dirty (has unsaved changes)
  const markAsChanged = useCallback(() => {
    setHasUnsavedChanges(true);
  }, []);

  // Function to mark form as saved (no unsaved changes)
  const markAsSaved = useCallback(() => {
    setHasUnsavedChanges(false);
  }, []);

  // Function to reset unsaved changes state
  const resetUnsavedChanges = useCallback(() => {
    setHasUnsavedChanges(false);
  }, []);

  // Handle browser refresh/close
  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      if (when && hasUnsavedChanges) {
        event.preventDefault();
        event.returnValue = message;
        return message;
      }
    };

    if (when && hasUnsavedChanges) {
      window.addEventListener('beforeunload', handleBeforeUnload);
      setIsBlocking(true);
    } else {
      window.removeEventListener('beforeunload', handleBeforeUnload);
      setIsBlocking(false);
    }

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, [when, hasUnsavedChanges, message]);

  // Handle navigation within the app (React Router)
  useEffect(() => {
    if (when && hasUnsavedChanges) {
      const unblock = history.block((location, action) => {
        return message;
      });

      return unblock;
    }
  }, [history, when, hasUnsavedChanges, message]);

  return {
    hasUnsavedChanges,
    markAsChanged,
    markAsSaved,
    resetUnsavedChanges,
    isBlocking
  };
};