# Asteria & Cosmo PWA Implementation Guide

## Overview

This codebase implements two brand variants as specified in `asteria_pwa_homepage_figma_spec_svelte_kit_scaffold.md`:

1. **Asteria Guide** (Luxury) - `/asteria` route
2. **Cosmo Note** ($10 variant) - `/cosmo` route

## Project Structure

```
src/
├── lib/
│   ├── components/
│   │   ├── Altar.svelte              ✓ GSAP-powered altar animation
│   │   ├── PalmPress.svelte          ✓ 2-second hold interaction
│   │   ├── RevealSection.svelte      ✓ ScrollTrigger-based reveal
│   │   ├── Hero.svelte               ✓ Asteria hero section
│   │   ├── CreatorStrip.svelte       ✓ Proof carousel
│   │   ├── QuizTeaser.svelte         ✓ Interactive quiz teaser
│   │   ├── HowItWorks.svelte         ✓ 3-step process
│   │   ├── TeaserDemo.svelte         ✓ Free preview with paywall
│   │   ├── JourneysGrid.svelte       ✓ 4 journey types
│   │   ├── PricingRibbon.svelte      ✓ 3 pricing tiers
│   │   ├── ResonancePanel.svelte     ✓ Statistics display
│   │   ├── EthicsAccordion.svelte    ✓ Ethics & transparency
│   │   ├── FAQ.svelte                ✓ Schema-ready Q&A
│   │   ├── InstallCTA.svelte         ✓ PWA install prompt
│   │   ├── Newsletter.svelte         ✓ Email signup
│   │   ├── FooterMain.svelte         ✓ Full footer
│   │   └── cosmo/
│   │       ├── HeroCosmo.svelte      ✓ Cosmo hero variant
│   │       └── TeaserCosmo.svelte    ✓ Cosmo teaser variant
│   ├── utils/
│   │   └── inview.ts                 ✓ IntersectionObserver utility
│   ├── gsap.ts                       ✓ GSAP + ScrollTrigger setup
│   └── styles/
│       └── tokens.css                ✓ Both brand token systems
├── routes/
│   ├── +page.svelte                  → Redirects to /asteria
│   ├── asteria/
│   │   ├── +layout.svelte            ✓ Sets data-brand="asteria"
│   │   └── +page.svelte              ✓ Asteria homepage
│   └── cosmo/
│       ├── +layout.svelte            ✓ Sets data-brand="cosmo"
│       └── +page.svelte              ✓ Cosmo homepage
└── app.css                           ✓ Global styles + animations

static/
└── manifest.webmanifest              ✓ PWA manifest
```

## Key Features Implemented

### 1. Brand Theming System
- **CSS Variables** switch automatically based on `data-brand` attribute
- **Asteria**: Glass morphism, serif fonts, luxury colors
- **Cosmo**: Flat cards, grotesk fonts, gradient accents

### 2. GSAP Animations
- **Altar Component**: Floating orbs, parallax tilt, seal burst animation
- **RevealSection**: ScrollTrigger-based entrance animations
- **PalmPress**: 2-second hold interaction with progress ring

### 3. Accessibility
- All interactive elements keyboard accessible
- `prefers-reduced-motion` respected throughout
- Proper ARIA labels and semantic HTML
- Focus indicators on all interactive elements

### 4. PWA Features
- Progressive web app manifest
- Platform-aware install instructions
- Offline-ready architecture

### 5. Component Library
All components follow the spec with:
- Responsive grid layouts (desktop/tablet/mobile)
- Glass morphism effects (Asteria)
- Flat cards with gradients (Cosmo)
- Smooth transitions and reveals

## Running the Project

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Development server:**
   ```bash
   npm run dev
   ```

3. **Build for production:**
   ```bash
   npm run build
   ```

4. **Preview production build:**
   ```bash
   npm run preview
   ```

## Routes

- `/` - Auto-redirects to `/asteria`
- `/asteria` - Luxury brand homepage (Asteria Guide)
- `/cosmo` - $10 brand homepage (Cosmo Note)

## Brand Switching

The brand theme is controlled by the `data-brand` attribute on the `<body>` element:

```svelte
<!-- Asteria -->
<svelte:body data-brand="asteria" />

<!-- Cosmo -->
<svelte:body data-brand="cosmo" />
```

CSS automatically applies the correct token overrides.

## Animation Guidelines

### GSAP Usage
- Altar: Subtle parallax (±6° tilt), idle float animations
- ScrollTrigger: Section reveals on 30% visibility
- PalmPress: 2000ms hold with wobble cancellation

### Reduced Motion
All animations disabled when user prefers reduced motion:
```css
@media (prefers-reduced-motion: reduce) {
  * {
    animation-duration: 0.01ms !important;
    transition-duration: 0.01ms !important;
  }
}
```

## Styling System

### Asteria Tokens
```css
--bg: #0C0A1A
--ink: #EDEBFF
--love: #F06FA3
--career: #F2C14E
--destiny: #9C6CFF
--clarity: #30D5C8
--glass: rgba(255,255,255,0.06)
```

### Cosmo Tokens
```css
--bg: #0E1B2E
--ink: #EAF3FF
--accent1: #7CF7FF
--accent2: #7AA7FF
--accent3: #C07CFF
--glass: transparent (flat cards)
```

## Component Props

### RevealSection
```svelte
<RevealSection y={24} duration={0.3}>
  <YourComponent />
</RevealSection>
```

### Altar
```svelte
<Altar bind:this={altarRef} on:sealed={handleSealed}>
  <div>[Your sigil SVG]</div>
</Altar>
```

### PalmPress
```svelte
<PalmPress holdMs={2000} on:complete={handleComplete} />
```

## Known Issues

- RevealSection warning about unused `y` prop is a false positive (used in GSAP)
- Manifest icons need actual PNG files (currently placeholders)

## Next Steps

1. Add actual icon assets to `/static/icons/`
2. Implement real payment integration
3. Add service worker for offline support
4. Create additional route pages (ritual, result, etc.)
5. Add analytics tracking
6. Implement actual newsletter signup backend

## Spec Compliance

✅ All sections from spec implemented
✅ Both brand variants working
✅ GSAP animations as specified
✅ Responsive layouts
✅ Accessibility features
✅ PWA manifest
✅ Proper routing structure

Refer to `asteria_pwa_homepage_figma_spec_svelte_kit_scaffold.md` for detailed design specifications.

