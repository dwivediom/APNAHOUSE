# Apna House - Premium Construction Landing Page

A modern, responsive landing page built with React, Vite, and Tailwind CSS.

## Project Structure

```
interior_disgon/
├── src/
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.jsx      # Navigation bar component
│   │   │   └── Footer.jsx      # Footer component
│   │   ├── sections/
│   │   │   ├── Hero.jsx         # Hero section with language switching
│   │   │   ├── TrustIndicators.jsx  # Trust badges section
│   │   │   ├── GallerySection.jsx   # Image gallery with tabs
│   │   │   └── CTAFooter.jsx        # Call-to-action section
│   │   └── ui/
│   │       ├── Button.jsx       # Reusable button component
│   │       ├── GlassCard.jsx    # Glassmorphism card component
│   │       └── SectionHeading.jsx  # Section heading component
│   ├── constants/
│   │   └── data.js              # All static data (images, content, etc.)
│   ├── App.jsx                  # Main app component (imports all sections)
│   ├── main.jsx                 # Entry point
│   └── index.css                # Tailwind CSS imports
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
└── postcss.config.js
```

## Components Overview

### Layout Components
- **Navbar**: Fixed navigation with mobile menu
- **Footer**: Site footer with contact and social links

### Section Components
- **Hero**: Main hero section with bilingual content switching
- **TrustIndicators**: Three trust badges with icons
- **GallerySection**: Image gallery with elevation/interior tabs
- **CTAFooter**: Call-to-action section before footer

### UI Components
- **Button**: Reusable button with loading states
- **GlassCard**: Glassmorphism effect card
- **SectionHeading**: Consistent section headings

## Getting Started

1. Install dependencies:
```bash
npm install
```

2. Start development server:
```bash
npm run dev
```

3. Build for production:
```bash
npm run build
```

## Features

- ✨ Modern glassmorphism design
- 🌐 Bilingual support (English/Hindi)
- 📱 Fully responsive
- 🎨 Smooth animations and transitions
- 🖼️ Image gallery with hover effects
- ⚡ Fast performance with Vite

