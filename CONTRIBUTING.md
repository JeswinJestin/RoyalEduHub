# Contributing to Royal Edu Hub

Thank you for your interest in contributing to Royal Edu Hub! This document provides guidelines and information for contributors.

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn
- Git
- Code editor (VS Code recommended)

### Development Setup

1. **Fork the repository**
   ```bash
   git clone https://github.com/your-username/royal-edu-hub.git
   cd royal-edu-hub
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm start
   ```

## 📋 Code Standards

### File Structure
```
src/
├── components/
│   ├── animations/     # Animation components
│   ├── iphone/         # iPhone mockup components
│   ├── layout/         # Header, Footer, etc.
│   └── sections/       # Page sections
├── hooks/              # Custom React hooks
├── pages/              # Page components
├── services/           # API and external services
├── styles/             # Global styles
└── utils/              # Utility functions
```

### Naming Conventions

- **Components**: PascalCase (e.g., `HeroSection.js`)
- **Files**: PascalCase for components, camelCase for utilities
- **Variables**: camelCase (e.g., `showIntro`)
- **Constants**: UPPER_SNAKE_CASE (e.g., `INTRO_DURATION_MS`)
- **CSS Classes**: kebab-case or Tailwind classes

### Component Guidelines

1. **Functional Components**: Use functional components with hooks
2. **Props**: Use destructuring and provide default values
3. **State**: Use useState and useEffect appropriately
4. **Performance**: Use React.memo, useMemo, useCallback when needed

```javascript
// Good component structure
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const ComponentName = ({ prop1, prop2 = 'default' }) => {
  const [state, setState] = useState(false);

  useEffect(() => {
    // Effect logic
  }, [dependencies]);

  return (
    <motion.div className="component-styles">
      {/* Component content */}
    </motion.div>
  );
};

export default ComponentName;
```

### Styling Guidelines

1. **Tailwind First**: Use Tailwind CSS classes primarily
2. **Custom CSS**: Only when Tailwind is insufficient
3. **Responsive Design**: Mobile-first approach
4. **Dark Theme**: Maintain dark theme consistency

```javascript
// Good styling example
<div className="bg-gray-900 text-white p-6 rounded-lg shadow-xl hover:shadow-2xl transition-shadow duration-300">
```

### Animation Standards

1. **Framer Motion**: For complex animations and page transitions
2. **CSS Transitions**: For simple hover effects
3. **Performance**: Use transform and opacity for smooth animations
4. **Duration**: Keep animations between 200-500ms for UI interactions

```javascript
// Animation example
const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.3 }
};
```

## 🔧 Development Workflow

### Branch Naming
- `feature/description` - New features
- `fix/description` - Bug fixes
- `docs/description` - Documentation updates
- `refactor/description` - Code refactoring

### Commit Messages
Use conventional commit format:
```
type(scope): description

feat(hero): add intro animation with fade transition
fix(forms): resolve validation error handling
docs(readme): update installation instructions
```

### Pull Request Process

1. **Create Feature Branch**
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. **Make Changes**
   - Follow code standards
   - Add tests if applicable
   - Update documentation

3. **Test Your Changes**
   ```bash
   npm start  # Test in development
   npm run build  # Test production build
   ```

4. **Submit Pull Request**
   - Clear title and description
   - Reference related issues
   - Include screenshots for UI changes

## 🧪 Testing

### Manual Testing
- Test on different screen sizes
- Verify animations work smoothly
- Check form functionality
- Test intro animation behavior

### Browser Support
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## 📝 Documentation

### Code Comments
- Comment complex logic
- Explain animation timings
- Document component props

```javascript
/**
 * Hero section with intro animation
 * @param {boolean} showAnimation - Whether to show the intro animation
 * @param {function} onAnimationComplete - Callback when animation finishes
 */
const HeroSection = ({ showAnimation, onAnimationComplete }) => {
  // Component logic
};
```

### README Updates
- Update features list for new functionality
- Add new dependencies to tech stack
- Update installation instructions if needed

## 🐛 Bug Reports

When reporting bugs, include:
- Browser and version
- Steps to reproduce
- Expected vs actual behavior
- Screenshots or videos
- Console errors

## 💡 Feature Requests

For new features:
- Describe the use case
- Explain the expected behavior
- Consider impact on existing functionality
- Provide mockups if applicable

## 📞 Getting Help

- Create an issue for bugs or questions
- Join our development discussions
- Check existing issues before creating new ones

## 🎯 Code Review Checklist

- [ ] Code follows naming conventions
- [ ] Components are properly structured
- [ ] Animations are smooth and performant
- [ ] Responsive design works on all devices
- [ ] No console errors or warnings
- [ ] Documentation is updated
- [ ] Commit messages follow convention

---

Thank you for contributing to Royal Edu Hub! 🎓