import { useCallback, useEffect, useRef } from 'react';
import { useUnsavedChanges, UseUnsavedChangesOptions } from './useUnsavedChanges';

export interface UseFormWithUnsavedChangesOptions extends UseUnsavedChangesOptions {
  resetOnSubmit?: boolean;
}

export const useFormWithUnsavedChanges = (options: UseFormWithUnsavedChangesOptions = {}) => {
  const { resetOnSubmit = true, ...unsavedChangesOptions } = options;
  const { 
    hasUnsavedChanges, 
    markAsChanged, 
    markAsSaved, 
    resetUnsavedChanges,
    isBlocking 
  } = useUnsavedChanges(unsavedChangesOptions);

  const initialValuesRef = useRef<Record<string, any>>({});
  const currentValuesRef = useRef<Record<string, any>>({});

  // Set initial form values
  const setInitialValues = useCallback((values: Record<string, any>) => {
    initialValuesRef.current = { ...values };
    currentValuesRef.current = { ...values };
  }, []);

  // Track a field change
  const handleFieldChange = useCallback((fieldName: string, value: any) => {
    currentValuesRef.current[fieldName] = value;
    
    // Check if current values differ from initial values
    const hasChanges = Object.keys(currentValuesRef.current).some(key => 
      currentValuesRef.current[key] !== initialValuesRef.current[key]
    );

    if (hasChanges && !hasUnsavedChanges) {
      markAsChanged();
    } else if (!hasChanges && hasUnsavedChanges) {
      markAsSaved();
    }
  }, [hasUnsavedChanges, markAsChanged, markAsSaved]);

  // Create a wrapper for onChange handlers
  const createChangeHandler = useCallback((fieldName: string, originalHandler?: (value: any) => void) => {
    return (value: any) => {
      handleFieldChange(fieldName, value);
      originalHandler?.(value);
    };
  }, [handleFieldChange]);

  // Mark form as submitted (saved)
  const markFormAsSubmitted = useCallback(() => {
    if (resetOnSubmit) {
      // Update initial values to current values
      initialValuesRef.current = { ...currentValuesRef.current };
      markAsSaved();
    }
  }, [resetOnSubmit, markAsSaved]);

  // Reset form to initial state
  const resetForm = useCallback(() => {
    currentValuesRef.current = { ...initialValuesRef.current };
    resetUnsavedChanges();
  }, [resetUnsavedChanges]);

  return {
    hasUnsavedChanges,
    isBlocking,
    setInitialValues,
    handleFieldChange,
    createChangeHandler,
    markFormAsSubmitted,
    resetForm,
    markAsChanged,
    markAsSaved
  };
};