# Cursor Rules for Mystic Advisor

This directory contains Cursor-specific rules that help the AI assistant understand the project structure, conventions, and best practices.

## Rule Files

### 1. `project-overview.mdc` (Always Applied)
**Scope**: All files  
**Purpose**: High-level project information including tech stack, dual brand system, and key features.

**Key Topics:**
- SvelteKit 2 + Svelte 5 setup
- Asteria vs Cosmo brand variants
- Project structure overview
- Development commands

### 2. `svelte-components.mdc`
**Scope**: `*.svelte` files  
**Purpose**: Svelte 5 component patterns and best practices.

**Key Topics:**
- Svelte 5 runes ($state, $derived, $effect)
- Props and events patterns
- Component structure conventions
- Accessibility requirements
- Brand-aware component patterns

### 3. `typescript.mdc`
**Scope**: `*.ts`, `*.tsx` files  
**Purpose**: TypeScript coding standards and patterns.

**Key Topics:**
- Type definitions and interfaces
- SvelteKit type imports
- GSAP integration types
- Error handling patterns
- Browser-only code checks

### 4. `styling.mdc`
**Scope**: `*.css`, `*.svelte` files  
**Purpose**: CSS architecture and design system.

**Key Topics:**
- Design tokens (Asteria & Cosmo)
- Component styling patterns
- Responsive design breakpoints
- Accessibility (reduced motion, focus states)
- Glass morphism effects
- Brand-specific overrides

### 5. `animation-gsap.mdc`
**Scope**: Animation-related code  
**Purpose**: GSAP animation patterns and best practices.

**Key Topics:**
- GSAP + Svelte 5 integration
- ScrollTrigger patterns
- Timeline animations
- Cleanup and performance
- Reduced motion support
- Common animation recipes

### 6. `routing-navigation.mdc`
**Scope**: Routing and navigation  
**Purpose**: SvelteKit routing patterns and navigation guidelines.

**Key Topics:**
- File-based routing structure
- Layout patterns
- Navigation methods
- Page data loading
- Preloading strategies
- Brand-specific routes

### 7. `tarot-system.mdc`
**Scope**: Tarot feature development  
**Purpose**: Tarot card reading system implementation guide.

**Key Topics:**
- Tarot data structures
- Card components
- Reading generation
- Animation patterns
- UX considerations
- Integration guidelines

### 8. `deployment-netlify.mdc`
**Scope**: Build and deployment  
**Purpose**: Netlify deployment configuration and best practices.

**Key Topics:**
- Build configuration
- Environment variables
- PWA deployment
- Performance optimization
- Pre-deployment checklist
- Troubleshooting

## How Rules Are Applied

### Automatic Application
- **project-overview.mdc**: Applied to every request (has `alwaysApply: true`)

### File-Type Based
Rules automatically apply when editing matching file types:
- **svelte-components.mdc**: `*.svelte` files
- **typescript.mdc**: `*.ts`, `*.tsx` files
- **styling.mdc**: `*.css` files and Svelte components

### Manual Application
Some rules have descriptions that allow Cursor to fetch them when relevant:
- **animation-gsap.mdc**: Applied when working with animations
- **routing-navigation.mdc**: Applied when working with routes/navigation
- **tarot-system.mdc**: Applied when working on tarot features
- **deployment-netlify.mdc**: Applied when working on build/deployment

## Adding New Rules

To create a new rule:

1. Create a `.mdc` file in `.cursor/rules/`
2. Add frontmatter metadata:
   ```markdown
   ---
   alwaysApply: true  # OR
   globs: *.ext       # OR
   description: "When to use this rule"
   ---
   ```
3. Write the rule content in Markdown
4. Reference files using: `[filename.ext](mdc:path/to/filename.ext)`

## Editing Existing Rules

Rules can be updated anytime. Changes take effect immediately in new conversations.

## Benefits

These rules help the AI assistant:
- ✅ Understand project architecture instantly
- ✅ Follow consistent coding patterns
- ✅ Respect project conventions
- ✅ Generate code that matches your style
- ✅ Navigate the codebase efficiently
- ✅ Avoid common pitfalls
- ✅ Suggest appropriate solutions

## Maintenance

**Update rules when:**
- Adding new frameworks/libraries
- Changing coding conventions
- Introducing new features
- Updating dependencies
- Refactoring architecture

Keep rules concise and focused on actionable information.


