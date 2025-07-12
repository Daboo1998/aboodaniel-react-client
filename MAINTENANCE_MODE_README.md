# Maintenance Mode Feature

## Overview
The application now has a maintenance mode feature that allows you to easily switch between the new home page (default) and a maintenance page for the old home page.

## How it works

### Current Setup
- **Default home page**: `/` and `/home` now show the new home page (`NewHomePageLayout`)
- **Old home page**: Available at `/old-home` with maintenance mode capability
- **Maintenance flag**: Controlled by environment variable `REACT_APP_MAINTENANCE_MODE`

### Environment Variable
The maintenance mode is controlled by the `REACT_APP_MAINTENANCE_MODE` environment variable in the `.env` file:

```bash
# Set to 'true' to show maintenance page instead of old home page
REACT_APP_MAINTENANCE_MODE=false
```

### Usage

#### Normal Operation (Default)
```bash
REACT_APP_MAINTENANCE_MODE=false
```
- `/` and `/home` → New home page
- `/old-home` → Old home page (accessible)

#### Maintenance Mode
```bash
REACT_APP_MAINTENANCE_MODE=true
```
- `/` and `/home` → New home page
- `/old-home` → Maintenance page (shows "Under Maintenance" message)

## Files Modified

1. **`src/App.tsx`**
   - Updated routing to make new home page the default
   - Added maintenance page route at `/old-home`
   - Added maintenance mode flag logic

2. **`src/components/layouts/pages/general/MaintenancePageLayout.tsx`**
   - New component that shows either maintenance message or old home page

3. **`src/components/layouts/pages/general/MaintenancePageLayout.styled.ts`**
   - Styled components for the maintenance page

4. **`.env`**
   - Added maintenance mode environment variable

## Switching Maintenance Mode

To enable maintenance mode:
1. Edit the `.env` file
2. Change `REACT_APP_MAINTENANCE_MODE=false` to `REACT_APP_MAINTENANCE_MODE=true`
3. Restart the development server

To disable maintenance mode:
1. Edit the `.env` file
2. Change `REACT_APP_MAINTENANCE_MODE=true` to `REACT_APP_MAINTENANCE_MODE=false`
3. Restart the development server

## Routes Summary

| Route | Component | Description |
|-------|-----------|-------------|
| `/` | NewHomePageLayout | Default home page |
| `/home` | NewHomePageLayout | Default home page |
| `/old-home` | MaintenancePageLayout | Old home page or maintenance page |
| `/new-home` | (removed) | Previously new home page route |