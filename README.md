# All Around Photos LLC Website

A modern, responsive website for All Around Photos LLC - a professional drone photography business specializing in commercial and residential property inspections, real estate photography, and aerial cinematography.

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS with custom design system
- **Fonts**: Inter (primary), Playfair Display (accent)
- **Code Quality**: ESLint, Prettier
- **Package Manager**: npm

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Available Scripts

- `npm run dev` - Start development server with Turbopack
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run lint:fix` - Run ESLint with auto-fix
- `npm run format` - Format code with Prettier
- `npm run format:check` - Check code formatting
- `npm run type-check` - Run TypeScript type checking
- `npm run clean` - Clean build artifacts

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── (public)/          # Public pages (home, gallery, services)
│   ├── (protected)/       # Protected pages (client galleries, admin)
│   ├── api/               # API routes
│   ├── globals.css        # Global styles with Tailwind
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Homepage
├── components/            # React components
│   ├── ui/                # Reusable UI components
│   ├── layout/            # Layout components (Header, Footer)
│   ├── gallery/           # Gallery-related components
│   └── forms/             # Form components
├── lib/                   # Utility functions and configurations
│   ├── utils.ts           # Common utilities
│   └── constants.ts       # Application constants
└── types/                 # TypeScript type definitions
    ├── index.ts           # Core types
    ├── api.ts             # API response types
    └── globals.d.ts       # Global type declarations
```

## Design System

### Colors
- **Primary**: Deep blue (#1e40af) - Professional, trustworthy
- **Secondary**: Sky blue (#0ea5e9) - Modern, aerial theme  
- **Accent**: Orange (#f97316) - Call-to-action, energy
- **Neutral**: Gray scale for text and backgrounds
- **Success**: Green (#10b981)
- **Warning**: Amber (#f59e0b)

### Typography
- **Primary Font**: Inter - Clean, modern sans-serif
- **Accent Font**: Playfair Display - Elegant serif for headings

### Responsive Breakpoints
- **Mobile**: 320px+
- **Tablet**: 768px+
- **Desktop**: 1024px+
- **Large Desktop**: 1440px+

## Features

- 🎨 Custom design system with Tailwind CSS
- 📱 Fully responsive design
- ⚡ Next.js 15 with App Router and Turbopack
- 🔍 SEO optimized with structured data
- 🎯 TypeScript for type safety
- 🎨 ESLint + Prettier for code quality
- 🚀 Performance optimized

## License

Private - All rights reserved by All Around Photos LLC