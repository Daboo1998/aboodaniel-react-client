# Unsaved Changes Implementation

This document describes the implementation of a popup that asks users if they're sure they want to leave the page while entering forms.

## Overview

The implementation consists of two main hooks that work together to detect unsaved changes in forms and show confirmation dialogs:

1. **`useUnsavedChanges`** - Core hook for detecting unsaved changes and handling navigation
2. **`useFormWithUnsavedChanges`** - Higher-level hook that automatically tracks form field changes

## Implementation Details

### Core Hook: `useUnsavedChanges`

Location: `src/hooks/useUnsavedChanges.tsx`

This hook provides:
- **Browser navigation protection**: Shows a confirmation dialog when users try to refresh, close the tab, or navigate away using browser controls
- **React Router navigation protection**: Shows a confirmation dialog when users navigate within the app using React Router
- **Flexible configuration**: Customizable message and conditional activation

Key features:
- Uses `beforeunload` event for browser navigation
- Uses React Router's `history.block()` for in-app navigation
- Provides methods to mark changes as saved/unsaved

### Form Hook: `useFormWithUnsavedChanges`

Location: `src/hooks/useFormWithUnsavedChanges.tsx`

This hook provides:
- **Automatic change tracking**: Compares current form values with initial values
- **Change handler creation**: Creates wrapped onChange handlers that automatically track changes
- **Form lifecycle management**: Handles form submission and reset scenarios

## Integration

The hooks have been integrated into the following components:

### 1. Authentication Forms
- **LoginPageLayout** (`src/components/layouts/pages/authentication/LoginPageLayout.tsx`)
- **RegisterPageLayout** (`src/components/layouts/pages/authentication/RegisterPageLayout.tsx`)

Features:
- Tracks changes to email, password, and remember user checkbox
- Shows confirmation when navigating away with unsaved credentials
- Automatically clears tracking after successful login/registration

### 2. Contact Form
- **ContactPageLayout** (`src/components/layouts/pages/general/ContactPageLayout.tsx`)

Features:
- Tracks changes to all form fields (email, name, subject, message)
- Handles pre-filled fields for logged-in users
- Clears tracking after successful message submission

### 3. Experience Management Forms
- **AddExperiencePopup** (`src/components/molecules/popups/experience/AddExperiencePopup.tsx`)

Features:
- Tracks changes to all experience fields
- Shows confirmation when closing popup with unsaved data
- Resets tracking when popup is canceled or experience is successfully added

### 4. Chat Interface
- **AskMeAnything** (`src/components/layouts/pages/general/AskMeAnything/index.tsx`)

Features:
- Shows confirmation when user has typed a message but hasn't sent it
- Clears tracking after message is sent

## Testing

A test page has been created at `/test-unsaved-changes` to verify the functionality:

- **Test Page**: `src/components/test/UnsavedChangesTestPage.tsx`
- **Route**: Added to `src/App.tsx`
- **Navigation**: Added to main navigation bar

### Test Scenarios

1. **Type in form fields** and try to navigate away - should show confirmation
2. **Type in form fields** and try to refresh page - should show browser confirmation
3. **Submit form** - should stop showing confirmations
4. **Reset form** - should stop showing confirmations

## Configuration Options

Both hooks accept configuration options:

```typescript
interface UseUnsavedChangesOptions {
  when?: boolean;          // Whether to activate protection (default: true)
  message?: string;        // Custom confirmation message
}

interface UseFormWithUnsavedChangesOptions extends UseUnsavedChangesOptions {
  resetOnSubmit?: boolean; // Whether to reset tracking on submit (default: true)
}
```

## Usage Examples

### Basic Usage
```typescript
const { markAsChanged, markAsSaved } = useUnsavedChanges({
  when: hasUnsavedData,
  message: "You have unsaved changes. Are you sure you want to leave?"
});
```

### Form Usage
```typescript
const { createChangeHandler, setInitialValues, markFormAsSubmitted } = useFormWithUnsavedChanges({
  message: "You have unsaved form data. Are you sure you want to leave?"
});

// Set initial values
useEffect(() => {
  setInitialValues({ name: "", email: "" });
}, [setInitialValues]);

// Use change handlers
<TextInput onChange={createChangeHandler("name", setName)} />

// Mark as submitted
const handleSubmit = () => {
  // ... submit logic
  markFormAsSubmitted();
};
```

## Browser Compatibility

- **Modern browsers**: Full support for both `beforeunload` and React Router blocking
- **Safari**: Some limitations with `beforeunload` message customization (browser shows generic message)
- **Mobile browsers**: May have different behavior for page navigation

## Build Configuration

### Node.js Compatibility Fix

The project uses react-scripts 4.0.3, which includes an older version of webpack that's incompatible with Node.js v17+. To fix this, the build script has been updated to use the legacy OpenSSL provider:

```json
{
  "scripts": {
    "build": "NODE_OPTIONS='--openssl-legacy-provider' react-scripts build && echo '/* /  200' | cat >build/_redirects "
  }
}
```

This ensures compatibility with newer Node.js versions while maintaining the existing webpack configuration.

## Future Enhancements

Possible improvements:
1. **Auto-save functionality**: Automatically save form data to localStorage
2. **Custom confirmation dialogs**: Replace browser dialogs with custom styled modals
3. **Form validation integration**: Only warn if form has valid but unsaved data
4. **Debounced change detection**: Avoid triggering on every keystroke
5. **Multiple form support**: Handle multiple forms on the same page
6. **Upgrade to newer react-scripts**: Consider upgrading to a newer version of react-scripts for better Node.js compatibility