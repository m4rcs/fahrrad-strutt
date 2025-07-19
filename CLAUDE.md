# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a single-page website for "Fahrrad Strutt", a bicycle shop in Rodenbach, Germany. The site is built with Vite, TypeScript, and uses Bulma CSS framework with fullpage.js for scroll navigation.

## Development Commands

- `bun run dev` - Start development server with Vite
- `bun run build` - Build for production (runs TypeScript compiler first, then Vite build)
- `bun run preview` - Preview production build locally

## Architecture

### Tech Stack
- **Build Tool**: Vite 7.0.5
- **Language**: TypeScript 5.8.3 with strict configuration
- **Styling**: Sass/SCSS with Bulma 1.0.4 CSS framework (using modern @use syntax)
- **Navigation**: Custom scroll navigation library (src/scroll-nav.ts) for full-screen section scrolling
- **Fonts**: Lato (headings) and Rubik (body text) via @fontsource
- **Icons**: Lucide-static
- **Extensions**: bulma-block-list 1.1.0 for styled lists

### Project Structure
- `index.html` - Main HTML with all page content in sections
- `src/main.ts` - Entry point, initializes custom scroll navigation and mobile burger menu
- `src/scroll-nav.ts` - Custom scroll navigation library with wheel, touch, and keyboard support
- `src/main.scss` - Main stylesheet using modern Sass @use syntax with Bulma 1.0.4 and extensions

### Key Design Patterns
- Single-page application with anchor-based navigation using custom scroll library
- Responsive design using Bulma's breakpoint system
- Full-screen sections with centered content columns
- Mobile-first approach with burger menu for navigation
- Grayscale-to-color hover effects on brand icons
- Custom scroll navigation supports wheel, touch, keyboard, and URL hash navigation

### Content Sections
The site contains these main sections accessible via navbar:
- Home (services overview)
- Opening hours
- Contact information
- Brand partnerships
- JobRad and Bikeleasing information
- Location map
- Legal impressum

Note: Several offer sections are commented out in the HTML, suggesting seasonal or temporary content management.
