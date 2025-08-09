# Multilingual Dashboard Monorepo

A modern multilingual dashboard built with React, Redux Toolkit, Material-UI, and Tailwind CSS in a Turborepo monorepo structure.

## 🏗 Architecture

```
repo-root/
├── apps/
│   ├── admin-app/          # Main dashboard application ✅
│   └── public-app/         # Simple public app ✅
├── packages/
│   ├── shared-ui/          # Reusable UI (Header, Switchers, Empty/Error states) ✅
│   └── shared-store/       # Redux slices, RTK Query api, types, hooks ✅
├── package.json            # Root workspace configuration ✅
├── turbo.json             # Turborepo pipeline configuration ✅
├── tsconfig.base.json     # Base TypeScript configuration ✅
├── tailwind.config.js     # Shared Tailwind configuration ✅
└── README.md              # Documentation ✅
```

## 🚀 Features

- **Multilingual Support**: English & Persian with RTL layout
- **Theme System**: Light/Dark mode with persistence
- **Real API**: Integration with https://reqres.in
- **Modern Stack**: React 18, TypeScript, Redux Toolkit, Material-UI
- **Monorepo**: Scalable architecture with shared packages

## 📦 Packages

### Apps

- **admin-app**: Main dashboard with user management (port 3000) ✅
- **public-app**: Simple public application (port 3001) ✅

### Shared Packages

- **shared-ui**: Reusable components (Header, Switchers, Empty/Error states)
- **shared-store**: Redux slices, RTK Query API, types, hooks

## 🛠 Development

```bash
# Install dependencies
npm install

# Start development servers
npm run dev

# Or run individual apps:
# Admin dashboard (port 3000)
cd apps/admin-app && npm run dev

# Public app (port 3001)
cd apps/public-app && npm run dev

# Build all apps and packages
npm run build

# Run tests
npm run test

# Type checking
npm run typecheck

# Lint code
npm run lint

# Format code
npm run format
```

## 🧪 Testing

- **Unit Tests**: Jest + React Testing Library for components and store
- **E2E Tests**: Playwright for critical user flows
- **Type Safety**: TypeScript strict mode across all packages

## 🌐 API Integration

The dashboard integrates with the Reqres API (https://reqres.in) for:

- User list with pagination
- Individual user details
- Real-time data fetching with RTK Query

## 🎨 UI/UX

- **Material-UI**: Professional component library
- **Tailwind CSS**: Utility-first styling
- **Responsive Design**: Mobile-first approach
- **Accessibility**: ARIA compliant components
- **RTL Support**: Full right-to-left layout for Persian

## 🔧 Configuration

- **Turborepo**: Optimized build pipeline
- **TypeScript**: Strict mode with path mapping
- **ESLint + Prettier**: Code quality and formatting
- **Tailwind**: Design system with CSS variables
