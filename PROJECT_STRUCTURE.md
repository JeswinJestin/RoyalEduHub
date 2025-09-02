# Project Structure - Royal Edu Hub

This document provides a detailed overview of the Royal Edu Hub project structure, explaining the purpose and organization of each directory and file.

## 📁 Root Directory Structure

```
royal-edu-hub/
├── 📄 Configuration Files
├── 📚 Documentation
├── 🔧 Build & Development
├── 📦 Source Code
├── 🌐 Public Assets
└── 🚀 Deployment
```

## 📄 Configuration Files

### Core Configuration
- **`package.json`** - Project dependencies, scripts, and metadata
- **`package-lock.json`** - Locked dependency versions for consistent installs
- **`.env`** - Environment variables (not committed to git)
- **`.gitignore`** - Files and directories to exclude from git

### Build & Styling Configuration
- **`tailwind.config.js`** - Tailwind CSS customization and theme configuration
- **`postcss.config.js`** - PostCSS configuration for CSS processing
- **`craco.config.js`** - Create React App configuration override

### Deployment Configuration
- **`vercel.json`** - Vercel deployment settings and redirects
- **`netlify.toml`** - Netlify deployment configuration

## 📚 Documentation

### Core Documentation
- **`README.md`** - Main project documentation and getting started guide
- **`ARCHITECTURE.md`** - Technical architecture and design decisions
- **`CONTRIBUTING.md`** - Development guidelines and contribution standards
- **`DEPLOYMENT.md`** - Deployment instructions and hosting setup
- **`PROJECT_STRUCTURE.md`** - This file - project organization guide

### Setup Guides
- **`GOOGLE_APPS_SCRIPT_SETUP.md`** - Google Apps Script integration setup
- **`CAREERS_APPS_SCRIPT_SETUP.md`** - Career form backend setup
- **`EMAIL_SETUP_GUIDE.md`** - Email notification configuration
- **`COMPREHENSIVE_FORM_SETUP_GUIDE.md`** - Complete form setup guide
- **`GOOGLE_FORMS_SETUP_GUIDE.md`** - Google Forms integration
- **`GOOGLE_FORMS_DEBUG_GUIDE.md`** - Troubleshooting form issues

### Development Notes
- **`careers-form-improvements.md`** - Career form enhancement notes

## 🔧 Build & Development

### IDE Configuration
```
.vscode/
└── settings.json          # VS Code workspace settings
```

### CI/CD
```
.github/
└── workflows/
    └── deploy.yml          # GitHub Actions deployment workflow
```

### Trae AI Configuration
```
.trae/
└── rules/
    └── project_rules.md    # Trae AI project-specific rules
```

### Build Output
```
build/                      # Production build output (generated)
├── static/                 # Compiled CSS and JS files
├── index.html             # Main HTML file
├── manifest.json          # PWA manifest
└── [assets]               # Copied public assets
```

## 📦 Source Code (`src/`)

### Main Application
```
src/
├── App.js                 # Main application component with routing
├── index.js               # Application entry point
└── styles/
    └── globals.css        # Global CSS styles and Tailwind imports
```

### Components Architecture
```
components/
├── animations/            # Animation-related components
│   └── RoutePreloader.js  # Page transition animations
├── iphone/               # iPhone mockup components
│   ├── IphoneFrame.js    # iPhone frame wrapper
│   └── IphoneScreen.js   # iPhone screen content
├── layout/               # Layout and navigation components
│   ├── Header.js         # Main navigation header
│   ├── Footer.js         # Site footer with links
│   └── ScrollToTop.js    # Scroll restoration utility
└── sections/             # Page section components
    ├── HeroSection.js    # Landing page hero
    ├── AboutSection.js   # About us section
    ├── ServicesSection.js # Services overview
    ├── ContactSection.js # Contact form section
    └── CareerSection.js  # Career opportunities
```

### Pages
```
pages/
├── HomePage.js           # Main landing page
├── AboutPage.js          # About us page
├── ServicesPage.js       # Services detail page
├── CoursesPage.js        # Courses catalog
├── ContactPage.js        # Contact form page
├── ContactUsPage.js      # Alternative contact page
├── CareersPage.js        # Career opportunities
├── HelpCenterPage.js     # Help and support
├── PrivacyPolicyPage.js  # Privacy policy
└── TermsPage.js          # Terms of service
```

### Services
```
services/
├── emailService.js              # Contact form email handling
├── careersService.js            # Career form submission
└── emailNotificationService.js  # Email notification utilities
```

### Custom Hooks
```
hooks/
└── useScrollAnimation.js # Custom hook for scroll-based animations
```

### Utilities
```
utils/
├── security.js          # Security utilities and validation
└── timeUtils.js         # Time and date utility functions
```

## 🌐 Public Assets (`public/`)

### Core Files
```
public/
├── index.html           # Main HTML template
├── manifest.json        # PWA manifest configuration
├── _headers            # Netlify headers configuration
└── royal-edu-hub-logo.png # Main logo
```

### Image Assets
```
public/
├── team/               # Team member photos
│   ├── dona1.jpeg
│   ├── francis.JPG
│   ├── jeswin.jpeg
│   ├── joslet1.jpeg
│   └── neethu.jpeg
├── testimonials/       # Client testimonial images
│   ├── ashisaaash.png
│   ├── chrisann.png
│   ├── princepabraham.png
│   ├── shinemathews.png
│   └── vinayakchakraborty.png
├── your-hero-image.jpg     # Hero section background
├── your-hero-image-2.jpg   # Alternative hero image
└── spline/                 # 3D assets directory
    └── README.md           # 3D integration instructions
```

## 🚀 Backend Integration

### Google Apps Script
```
google-apps-script/
├── Code.gs                    # Main contact form handler
└── careers-apps-script-code.gs # Career form handler
```

## 📊 File Organization Principles

### Component Organization
1. **By Feature**: Components grouped by functionality
2. **By Type**: Animations, layout, sections separated
3. **Reusability**: Shared components in common directories
4. **Single Responsibility**: Each component has one clear purpose

### Naming Conventions
- **Components**: PascalCase (e.g., `HeroSection.js`)
- **Utilities**: camelCase (e.g., `timeUtils.js`)
- **Services**: camelCase with Service suffix (e.g., `emailService.js`)
- **Pages**: PascalCase with Page suffix (e.g., `HomePage.js`)
- **Hooks**: camelCase with use prefix (e.g., `useScrollAnimation.js`)

### Directory Structure Benefits

1. **Scalability**: Easy to add new features and components
2. **Maintainability**: Clear separation of concerns
3. **Developer Experience**: Intuitive file locations
4. **Code Reuse**: Shared utilities and components
5. **Testing**: Easy to locate and test specific functionality

## 🔍 Key Files Explained

### `src/App.js`
- Main application component
- Routing configuration
- Intro animation logic
- Global state management

### `src/index.js`
- Application entry point
- React DOM rendering
- Global CSS imports

### `tailwind.config.js`
- Custom color palette
- Extended spacing and typography
- Animation configurations
- Responsive breakpoints

### `package.json`
- Project dependencies
- Build and development scripts
- Project metadata
- Deployment configurations

## 📈 Growth Considerations

### Future Structure Enhancements

1. **State Management**
   ```
   src/
   ├── store/              # Global state management
   ├── context/            # React context providers
   └── reducers/           # State reducers
   ```

2. **Testing**
   ```
   src/
   ├── __tests__/          # Test files
   ├── __mocks__/          # Mock data
   └── test-utils/         # Testing utilities
   ```

3. **Internationalization**
   ```
   src/
   ├── locales/            # Translation files
   └── i18n/               # Internationalization config
   ```

4. **API Integration**
   ```
   src/
   ├── api/                # API endpoints
   ├── types/              # TypeScript types
   └── constants/          # Application constants
   ```

## 🛠️ Development Workflow

### Adding New Features
1. Create component in appropriate `components/` subdirectory
2. Add page component in `pages/` if needed
3. Update routing in `App.js`
4. Add services in `services/` for external integrations
5. Update documentation

### File Modification Guidelines
1. **Single Responsibility**: One component per file
2. **Clear Naming**: Descriptive file and component names
3. **Consistent Structure**: Follow existing patterns
4. **Documentation**: Update relevant docs when adding features

## 📋 Maintenance Checklist

### Regular Tasks
- [ ] Review and update dependencies
- [ ] Clean up unused files and components
- [ ] Optimize image assets
- [ ] Update documentation
- [ ] Review and refactor complex components

### Performance Monitoring
- [ ] Bundle size analysis
- [ ] Component render optimization
- [ ] Asset loading performance
- [ ] Animation performance

---

*This project structure is designed for scalability, maintainability, and developer productivity. As the project grows, consider implementing additional organizational patterns like feature-based modules or domain-driven design.*