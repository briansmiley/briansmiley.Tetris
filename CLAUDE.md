# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

- **Development server**: `npm run dev` (runs with --host flag for network access)
- **Build**: `npm run build` (includes Prisma client generation and TypeScript compilation)
- **Lint**: `npm run lint` (ESLint with TypeScript support)
- **Preview**: `npm run preview` (preview production build)

## Architecture Overview

This is a Tetris game built with React + TypeScript, featuring both desktop and mobile interfaces with responsive breakpoints.

### Core Architecture

- **Game Logic**: Pure TypeScript implementation in `src/Tetris.ts` - handles all game state, piece movement, line clearing, scoring
- **Rendering Layer**: React components consume game state and render UI
- **Responsive Design**: Uses `use-breakpoint` to switch between `DesktopApp` and `MobileApp` at 440px breakpoint
- **State Management**: Game state managed in core Tetris class, UI state in React components

### Key Files

- `src/Tetris.ts` - Core game engine with all Tetris logic
- `src/TetrisConfig.ts` - Game configuration, piece definitions, colors
- `src/App.tsx` - Main app with responsive breakpoint switching
- `src/DesktopApp.tsx` / `src/AppMobile.tsx` - Platform-specific layouts
- `src/components/BoardDisplay.tsx` - Main game board rendering

### Database & Backend

- **Database**: PostgreSQL via Prisma ORM
- **Schema**: Single `HighScore` model with score, initials, platform, lines cleared
- **API**: Netlify functions for high score CRUD operations (`netlify/functions/`)
- **Client**: React Query for API state management

### Mobile Support

- Touch controls via `react-swipeable` for piece movement
- Separate mobile layout with optimized controls
- Platform detection stored in high scores

### Game Features

- Standard Tetris mechanics with SRS rotation system
- Line clearing animations with timing delays
- Hold piece functionality
- Next piece queue display
- Local and global high scores
- Audio support (theme song)

## Key Patterns

- Game logic is pure TypeScript, completely separate from React rendering
- Mobile/desktop switching handled at top level via breakpoints
- Custom hooks for keyboard input (`useKeysPressed`) and local storage
- Netlify functions use shared controller/service pattern for high scores