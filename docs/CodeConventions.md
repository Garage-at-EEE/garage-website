# Code Conventions

## Naming Conventions

### Components
- **File & Directory Names**: Use `PascalCase`
  - Example: `Button.jsx`, `Header.jsx`, `Modal.jsx`
  - Directory structure: `/src/components/ComponentName/ComponentName.jsx`
- **Component Naming**: Export components with the same `PascalCase` name as the file
  - Example: `export default function Button() { ... }`
- **Component Props Objects**: Use `PascalCase` for prop interfaces/types when documented

### Routes
- **File & Directory Names**: Use `PascalCase`
  - Example: `/src/routes/AboutUs/AboutUs.jsx`
  - Example: `/src/routes/ContactUs/ContactUs.jsx`
- **Route Component Naming**: Export route components with descriptive `PascalCase` names
  - Example: `export default function AboutUs() { ... }`

### Contexts
- **File & Directory Names**: Use `PascalCase` with provider suffix
  - Example: `AuthProvider.jsx`, `CartProvider.jsx`
- **Context Naming**: Create contexts with descriptive names
  - Example: `const AuthContext = createContext()`
  - Provider component: `export default function AuthProvider({ children }) { ... }`

### Hooks
- **File & Directory Names**: Use `camelCase` with `use` prefix
  - Example: `useBreakpoint.jsx`, `useFetch.jsx`, `useFetchPoints.jsx`
- **Hook Naming**: Hooks must start with `use` prefix
  - Example: `export default function useBreakpoint() { ... }`

### Utilities & Constants
- **File Names**: Use `camelCase`
  - Example: `constants.jsx`, `urlValidation.jsx`
- **Function Names**: Use `camelCase`
  - Example: `const validateUrl = (url) => { ... }`
- **Constant Names**: Use `SCREAMING_SNAKE_CASE` for constants
  - Example: `const API_BASE_URL = 'https://...'`
  - Example: `const MAX_FILE_SIZE = 5242880`

### Variables & Functions
- **Regular Variables**: Use `camelCase`
  - Example: `const userName = 'John'`
  - Example: `let isLoading = false`
- **Regular Functions**: Use `camelCase`
  - Example: `function handleClick() { ... }`
  - Example: `const calculateTotal = (items) => { ... }`
- **Boolean Variables**: Prefix with `is`, `has`, `can`, or similar
  - Example: `isActive`, `hasError`, `canSubmit`

## Styling Conventions

### CSS Modules
- **File Naming**: Use `ComponentName.module.css`
  - Example: `Button.module.css`, `Header.module.css`
- **Class Naming**: Use `camelCase` for class names
  - Example: `.container { }`, `.primaryButton { }`, `.headerNavigation { }`
- **Organization**: Co-locate CSS module with its component in the same directory

### Inline Styles
- Use CSS modules as the primary styling approach
- Reserve inline styles for dynamic, calculated styles only
- When using inline styles, use `camelCase` for property names (already handled by React)

## File Organization

### Component Structure
```jsx
// Imports (external, then internal)
import React from 'react';
import PropTypes from 'prop-types'; // if used

// Component-specific imports
import styles from './ComponentName.module.css';
import { utilityFunction } from '../../utils/utilities';

// Component definition
export default function ComponentName({ prop1, prop2 }) {
  // State and hooks
  const [state, setState] = React.useState();

  // Handlers and logic
  const handleClick = () => {
    // ...
  };

  // Render
  return (
    <div className={styles.container}>
      {/* JSX */}
    </div>
  );
}

// PropTypes (if used)
ComponentName.propTypes = {
  prop1: PropTypes.string,
  prop2: PropTypes.number,
};
```

### Directory Structure
- Components: `src/components/ComponentName/ComponentName.jsx`
- Contexts: `src/contexts/ContextName.jsx`
- Hooks: `src/hooks/useHookName.jsx`
- Routes: `src/routes/RouteName/RouteName.jsx`
- Utilities: `src/utils/utilityName.jsx`
- Styles: Co-locate with components as `ComponentName.module.css`

## Import/Export Conventions

### Default Exports
- Use default exports for components, contexts, and hooks
  - Example: `export default function Button() { ... }`
- Example in consumption: `import Button from './components/Button/Button'`

### Named Exports
- Use named exports for utility functions and constants when multiple items are exported from a file
  - Example: `export const validateEmail = (email) => { ... }`
  - Example: `export const API_BASE_URL = 'https://...'`
- Example in consumption: `import { validateEmail, API_BASE_URL } from './utils/constants'`

### Import Order
1. External dependencies (React, third-party libraries)
2. Internal contexts and hooks
3. Internal components
4. Utilities and constants
5. Styles (CSS modules)

```jsx
import React from 'react';
import axios from 'axios';

import { AuthContext } from '../../contexts/AuthProvider';
import Button from './Button/Button';
import { validateInput } from '../../utils/validation';
import styles from './MyComponent.module.css';
```

## Summary

| Type | Format | Example |
|------|--------|---------|
| Components | PascalCase | `Button.jsx`, `Header.jsx` |
| Routes | PascalCase | `AboutUs.jsx`, `ContactUs.jsx` |
| Contexts | PascalCase (with Provider) | `AuthProvider.jsx` |
| Hooks | camelCase (with use prefix) | `useBreakpoint.jsx` |
| Utilities | camelCase | `constants.jsx`, `urlValidation.jsx` |
| Variables | camelCase | `userName`, `isActive` |
| Functions | camelCase | `handleClick()`, `calculateTotal()` |
| Constants | SCREAMING_SNAKE_CASE | `API_BASE_URL`, `MAX_FILE_SIZE` |
| CSS Classes | camelCase | `.container`, `.primaryButton` |
| Boolean vars | is/has/can prefix | `isLoading`, `hasError`, `canSubmit` |
