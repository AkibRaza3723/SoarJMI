# SoarJMI — Design System & Style Guide

> **Version:** 1.0 · **Last audited:** July 2026
> **Website:** SoarJMI — the official cultural & tech society of Jamia Millia Islamia, New Delhi.

---

## 1. Design Philosophy

SoarJMI's visual identity is built on the concept of **"Ascendant Editorial"** — a premium, magazine-quality aesthetic that balances warmth and sophistication in its cultural expression with a sharp, cyber-green darkness in its tech persona. The design language is:

- **Dual-themed** — A single codebase that transforms between a warm **Cultural** mode (light, earthy, editorial) and a dark **Tech** mode (deep emerald, terminal-green, cyberpunk).
- **Tonal Layering** — Elevation is conveyed through surface colour shifts rather than heavy drop shadows.
- **Editorial Precision** — Clean typography hierarchies, generous whitespace, and structured grids give the site a publication-grade feel.
- **Alive & Interactive** — Scroll-triggered animations (GSAP), framer-motion transitions, parallax effects, and micro-interactions make the interface feel dynamic and premium.

---

## 2. Dual-Theme Architecture

The site uses a `data-theme` attribute on `<html>` (`cultural` | `tech`) to switch the entire visual identity. All component styles consume CSS custom properties, so the theme swap is instantaneous.

| Aspect | Cultural (Light) | Tech (Dark) |
|---|---|---|
| **Surface** | `#FBF5EC` — warm cream / parchment | `#020c04` — near-black green |
| **Primary** | `#4A2C0A` — rich espresso brown | `#22c55e` — cyber green |
| **Secondary** | `#A0522D` — warm terracotta | `#22c55e` — same cyber green |
| **Tertiary** | `#7A5C28` — muted gold / ochre | `#4ade80` — lighter green |
| **Accent Gradient** | Terracotta → Amber | Green → Lime |
| **On-surface text** | `#2C1F0E` — dark brown | `#e8ffe8` — off-white green |
| **Nav Glassmorphism** | `rgba(251,245,236,0.78)` | `rgba(2,12,4,0.94)` |
| **Glow** | `rgba(160,82,45,0.15)` — terracotta glow | `rgba(34,197,94,0.30)` — green glow |
| **Shadow** | None (tonal layering) | `0 8px 32px rgba(34,197,94,0.10)` |
| **Hero content** | 🎭 Cultural & arts messaging | ⚡ Tech & innovation messaging |
| **Logo** | `/logo2.png` (light variant) | `/logo.png` (dark variant) |

### Theme Toggle
- A pill-shaped button in the navbar with JetBrains Mono label-caps typography.
- Toggles between `🌙 Tech` and `🎭 Cultural`.
- State is persisted in `localStorage` under key `soarjmi-theme`.
- Managed via React Context (`ThemeProvider` → `useTheme` hook).

---

## 3. Colour System

All colours are defined as CSS custom properties on `:root` / `[data-theme]`. The system follows **Material Design 3** token naming for surfaces, with legacy aliases for backward compatibility.

### 3.1 Surface Scale (Cultural)

```
--surface:                    #FBF5EC     ← canvas (body bg)
--surface-dim:                #EDE4D6
--surface-bright:             #FEF9F2
--surface-container-lowest:   #F7EFDF     ← active/floating (level 2)
--surface-container-low:      #F2E8D4     ← card backgrounds
--surface-container:          #EBE0C8     ← section containers (level 1)
--surface-container-high:     #E4D8BD
--surface-container-highest:  #DCCFB2
```

### 3.2 Surface Scale (Tech)

```
--surface:                    #020c04     ← deepest black-green
--surface-container-low:      #041208
--surface-container:          #06180a
--surface-container-high:     #081e0e
--surface-container-highest:  #0b2413
```

### 3.3 Semantic Roles

| Token | Cultural | Tech |
|---|---|---|
| `--primary` | `#4A2C0A` | `#22c55e` |
| `--on-primary` | `#FBF5EC` | `#010801` |
| `--secondary` | `#A0522D` | `#22c55e` |
| `--tertiary` | `#7A5C28` | `#4ade80` |
| `--error` | `#9B2020` | `#F87171` |
| `--outline` | `#9E825E` | `#22c55e` |
| `--outline-variant` | `#D4BFA0` | `rgba(34,197,94,0.15)` |

### 3.4 Legacy Aliases

These are maintained for existing component consumption:

```css
--bg-primary:   var(--surface)
--bg-secondary: var(--surface-container-low)
--bg-card:      var(--surface-container-lowest)

--accent-1:     var(--secondary)        /* Primary accent */
--accent-2:     var(--secondary-fixed-dim)
--accent-3:     var(--tertiary-fixed)

--text-primary:   var(--on-surface)
--text-secondary: var(--on-surface-variant)
--text-muted:     var(--outline)

--border:         var(--outline-variant)
--glow:           theme-specific rgba
```

### 3.5 Gradients

```css
--gradient-hero:    linear-gradient(135deg, surface → container → highest)
--gradient-accent:  linear-gradient(135deg, secondary → secondary-fixed-dim)
```

---

## 4. Typography

### 4.1 Font Stack

| Role | Font | CSS Variable | Loaded via |
|---|---|---|---|
| **Display / Headings** | Sora | `--font-display` / `--font-sora` | `next/font/google` |
| **Body** | Hanken Grotesk | `--font-body` / `--font-hanken` | `next/font/google` |
| **Monospace / Labels** | JetBrains Mono | `--font-mono` / `--font-jetbrains` | `next/font/google` |
| **Logo Title** | Orbitron | `--font-orbitron` | `next/font/google` |

Font variables are applied on `<html>` via className injection from `layout.tsx`.

### 4.2 Type Scale

| Token | Size | Weight | Use |
|---|---|---|---|
| `--fs-display-lg` | `clamp(2.5rem, 5vw, 4rem)` | 700 | Hero headlines, page titles |
| `--fs-headline-lg` | `clamp(2rem, 3.5vw, 2.5rem)` | 600 | Section titles |
| `--fs-headline-md` | `1.5rem` | 600 | Sub-headings |
| `--fs-body-lg` | `1.125rem` | 400 | Lead paragraphs, descriptions |
| `--fs-body-md` | `1rem` | 400 | Standard body text |
| `--fs-label-caps` | `0.75rem` | 500 | Eyebrows, chips, metadata labels |

### 4.3 Utility Classes

```
.type-display-lg     — Sora / 64px / 700 / tight tracking (-0.02em) / line-height 1.1
.type-headline-lg    — Sora / 40px / 600 / line-height 1.2
.type-headline-md    — Sora / 24px / 600 / line-height 1.3
.type-body-lg        — Hanken Grotesk / 18px / 400 / line-height 1.6
.type-body-md        — Hanken Grotesk / 16px / 400 / line-height 1.6
.type-label-caps     — JetBrains Mono / 12px / 500 / uppercase / letter-spacing 0.1em
```

### 4.4 Typography Conventions

- **Section eyebrows**: `0.85rem`, weight 700, uppercase, letter-spacing `0.14em`, coloured with `--accent-1`.
- **Section titles**: Use `.section-title` class — `clamp(2rem, 5vw, 3.5rem)`, weight 700, tracking `-0.02em`.
- **Accent text**: Key words use `.accent-gradient` for a gradient-clipped text effect.
- **Headings** (`h1`–`h6`): Automatically inherit `font-family: var(--font-display)`.
- **Logo title "SoarJMI"**: Uses `Orbitron` at `clamp(3rem, 7.5vw, 6rem)`, weight 800. The "JMI" portion is coloured with `--primary`.

---

## 5. Spacing & Layout

### 5.1 Spacing Tokens

```css
--spacing-unit:     8px
--container-max:    1280px
--gutter:           24px
--margin-desktop:   64px
--margin-mobile:    20px
```

### 5.2 Container

```css
.container {
  width: 100%;
  max-width: var(--container-max);   /* 1280px */
  margin-inline: auto;
  padding-inline: var(--gutter);     /* 24px */
}
```

### 5.3 Section Patterns

| Pattern | Padding | Max-width |
|---|---|---|
| Standard section | `100px 6%` | `1200px` |
| Compact section (mobile) | `60px 4%` | Full width |
| Feature section (publication) | `120px 6% 110px` | `1160px` |
| Hero section | `100px 0 24px` | `1200px` inner grid |
| FAQ / Guidance | `100px 6%` | `860px` |

### 5.4 Grid Patterns

- **Hero content**: `grid-template-columns: 1.2fr 0.8fr` → collapses to `1fr` at `900px`.
- **Leadership/Mentors**: `repeat(2, 1fr)` at `1000px` max → `1fr` at `700px`.
- **Team cards**: Flex-wrap with `justify-content: center`, gap `28px`.
- **Testimonials**: `1fr 1.15fr 1fr` (center card slightly larger) → `1fr` at `900px`.
- **Pillars (Guidance)**: `repeat(4, 1fr)` → `repeat(2, 1fr)` → `1fr`.
- **Publication metadata**: `repeat(2, 1fr)` table-like grid.

---

## 6. Border Radius

```css
--radius-sm:    0.125rem    /* 2px — chips, rectangular tags */
--radius:       0.25rem     /* 4px */
--radius-md:    0.375rem    /* 6px */
--radius-lg:    0.5rem      /* 8px — cards */
--radius-xl:    0.75rem     /* 12px */
--radius-full:  9999px      /* pill buttons, avatars */
```

### Usage Conventions

| Element | Radius |
|---|---|
| Buttons (primary, secondary) | `9999px` (pill) |
| Cards (`.glass-card`) | `--radius-lg` (8px) |
| FAQ items | `16px` |
| Testimonial cards | `20px` |
| Modal | `28px` |
| Image cards (hero track) | `0px` (sharp editorial) |
| Chips / tags | `--radius-sm` (2px) or `50px` |
| Avatars | `50%` or `200px` |
| Logo frame | `12px` → `24px` on splash |
| Dropdown menus | `12px` |
| Mobile dropdown | `14px` |

---

## 7. Elevation & Surfaces

The system uses **tonal layering** rather than heavy box-shadows:

```
Level 0 — .surface-0 → var(--surface)                   ← page canvas
Level 1 — .surface-1 → var(--surface-container)          ← section containers
Level 2 — .surface-2 → var(--surface-container-lowest)   ← floating/active cards
```

### Cards (`.glass-card`)

```css
background: var(--surface-container-low);
border: 1px solid var(--outline-variant);
border-radius: var(--radius-lg);
box-shadow: var(--shadow-card);                /* none in cultural, subtle in tech */

:hover {
  background: var(--surface-container);
  border-color: var(--secondary);
  box-shadow: 0 8px 32px var(--glow);
}
```

### Glassmorphism (`.glass`)

```css
background: var(--nav-bg);                     /* 78% opacity warm cream / 94% dark green */
backdrop-filter: blur(20px);
border-bottom: 1px solid var(--border);
```

---

## 8. Component Inventory

### 8.1 Navigation (`Navbar.tsx`)

- **Fixed** at top, `z-index: 1000`.
- Transparent by default → glassmorphic on scroll (`.nav-scrolled`).
- Scroll threshold: `60px`.
- Logo: `SoarLogo` (38px) + "Soar**JMI**" brand text.
- Links: flex row, `gap: 40px`, with hover underline animation (`--gradient-accent`).
- Dropdown: Absolute-positioned, `12px` border-radius, slide-in transform.
- Mobile: Hamburger (3-line → X animation) at `≤ 768px`, dropdown with `220px` width.
- Theme toggle button in nav-actions.

### 8.2 Logo Splash (`LogoSplash.tsx`)

- **Full-viewport** landing intro section.
- GSAP elastic-out logo reveal (`scale: 0, rotate: -180` → `scale: 1`).
- Scroll-pinned shrink animation (desktop only, `≥ 769px`).
- Typewriter quote effect using `typewriter-effect` library.
- Decorative SVG wave overlays with `var(--splash-wave)`.
- 18 particle dots with `particle-float` CSS animation.
- `.float-anim` — `4s ease-in-out infinite` bounce.

### 8.3 Hero Section (`HeroSection.tsx`)

- **Two-column grid** layout: text (1.2fr) + orbital illustration (0.8fr).
- Content animated via Framer Motion (`staggerChildren: 0.15`).
- Badge pill with pulsing dot (`pulse-glow` keyframe).
- Stats row with gradient-clipped values.
- Bottom image track: GSAP scroll-scrub horizontal slide (desktop) / CSS marquee (mobile).
- Image cards: `280×160px`, sharp 0px radius, hover lift + scale.
- Decorative concentric circle backgrounds.

### 8.4 Founder & Mentors (`FounderMentorsSection.tsx`)

- GSAP scroll-triggered card entrances (founder from left, mentors from right).
- Cards: `20px` radius, `3px` gradient accent bar at top.
- Avatar: `64px` circle with rotating gradient glow ring (`spin-slow 6s`).
- Quote: italic, left-bordered with `--accent-1`.
- Social pills: outlined, pill-shaped.
- Grid: `repeat(2, 1fr)` at `max-width: 1000px`.

### 8.5 About Section (`AboutSection.tsx`)

- Multi-paragraph text with section eyebrow.
- Badge row: `50px` pill-shaped badges with border.
- Motion slide-in from left.

### 8.6 Testimonials (`TestimonialsSection.tsx`)

- Carousel with 3-card display (desktop) / 1-card (mobile).
- Center card has `1.15fr` emphasis and `active` glow.
- Wing badges: color-coded (Cultural = terracotta, Tech = purple).
- Navigation dots + arrow button.
- AnimatePresence for slide transitions.

### 8.7 Moving Gallery (`MovingGallery.tsx`)

- GSAP infinite horizontal scroll (left-to-right, `30s` duration).
- Images: `Next/Image` with `fill`, rounded `24px`, hover scale `1.10`.
- Pause on hover (desktop only, checks `hover: hover` media query).
- Double-rendered image array for seamless loop.

### 8.8 FAQ Section (`FAQSection.tsx`)

- Accordion pattern with AnimatePresence.
- Cards: `16px` radius, hover glow + accent border.
- Chevron rotation on expand (`180deg`).
- Staggered entrance (delay `index * 0.08`).

### 8.9 Guidance Section (`GuidanceSection.tsx`)

- Top gradient rule separator (`--gradient-accent`, `0.35` opacity).
- 4-column pillar grid (responsive to 2-col, then 1-col).
- Mentor word cards with gradient accent bar.

### 8.10 Team Section (`TeamSection.tsx`)

- Two tiers: Executive Board (EB) cards and Department Head cards.
- **EB cards**: `280×380px`, `36px 28px` padding, `90px` avatar.
- **Head cards**: `210×285px`, `26px 20px` padding, `64px` avatar.
- Hover: avatar scale `1.1` + rotate `-5deg`, top glow orb.
- Gradient divider line between content and footer tags.
- `cardFadeIn` CSS keyframe entrance.

### 8.11 Events Page (`events/page.tsx`)

- Timeline layout with alternating left/right cards.
- SVG S-curve track (desktop) / straight line (mobile) with progressive path draw.
- Milestone nodes: spinning gradient-bordered circles with number labels.
- GSAP scroll-triggered card bloom from sides (desktop) / slide from bottom (mobile).
- Ambient floating particle system (spawns every 550ms).
- Popup modal on card click.

### 8.12 Event Popup Modal (`EventPopupModal.tsx`)

- Full-screen overlay: `rgba(0,0,0,0.7)` + `blur(12px)`.
- Modal: `max-width: 820px`, `28px` radius, `max-height: 90vh` with scroll.
- Scale + blur entrance animation.
- Photo gallery carousel with autoplay (4s), keyboard nav, skeleton loading.
- Gradient dividers between sections.
- Close button: `rotate(90deg) scale(1.1)` on hover with glow.

### 8.13 Publication Page (`publication/page.tsx`)

- Split layout: info panel (left) + magazine card (right, `360px`).
- 3D tilt on hover using GSAP (perspective `900px`).
- Magazine cover: `3:4` aspect ratio, `12px` radius.
- Metadata grid: 2-column bordered table.
- Highlights list: editorial chevron-prefixed items.
- CTA buttons: "Read Online" (primary fill) + "Download PDF" (ghost outline).

### 8.14 404 Page (`not-found.tsx`)

- Theme-aware illustrations: broken circuit (tech) vs. empty stage (cultural).
- Glitch 404 effect with `clip-path` pseudo-elements.
- Mouse-following radial glow.
- Terminal/console widget with typewriter animation.
- 24 floating particles.

### 8.15 Footer (`Footer.tsx`)

- Simple centered layout: logo + brand + tagline + copyright.
- Bordered top separator.
- `max-width: 600px`.

---

## 9. Buttons

### Primary (`.btn-primary`)

```css
display: inline-flex;
padding: 12px 28px;
background: var(--gradient-accent);          /* or var(--primary) on some pages */
color: #fff / var(--on-primary);
font-family: var(--font-display);
font-weight: 600–700;
border-radius: 9999px;                       /* pill */
box-shadow: 0 4px 20px var(--glow);

:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 30px var(--glow);
}
```

### Secondary (`.btn-secondary`)

```css
display: inline-flex;
padding: 11px 27px;
background: transparent;
color: var(--secondary) / var(--text-primary);
border: 1px solid var(--secondary) / var(--border);
border-radius: 9999px;

:hover {
  background: var(--secondary) / var(--bg-card);
  color: var(--on-secondary);
}
```

---

## 10. Form Elements

### Input (`.input-editorial`)

- Underline-only style (no borders except bottom).
- `border-bottom: 1px solid var(--outline-variant)` → `var(--secondary)` on focus.
- Transparent background.
- Placeholder: `color: var(--outline)`.

### Input Label (`.input-label`)

- JetBrains Mono, `12px`, uppercase, wide tracking (`0.1em`).
- Colour: `var(--on-surface-variant)`.

---

## 11. Chips & Tags

### Standard Chip (`.chip`)

```css
padding: 4px 10px;
background: var(--tertiary-fixed);
color: var(--primary);
font-family: var(--font-mono);
font-size: 0.75rem;
letter-spacing: 0.05em;
border-radius: var(--radius-sm);            /* 2px — rectangular */
text-transform: uppercase;
```

### Badge/Pill

```css
padding: 6px 14px;
border-radius: 50px;
border: 1px solid var(--border);
background: var(--bg-card);
font-size: 0.8rem;
font-weight: 600;
```

### Wing Badge (Testimonials)

```css
.cultural { background: rgba(232,112,74, 0.1); color: var(--accent-1); border: 1px solid rgba(232,112,74, 0.25); }
.tech     { background: rgba(108,99,255, 0.1); color: var(--accent-3); border: 1px solid rgba(108,99,255, 0.2); }
```

---

## 12. Animation Language

### 12.1 Libraries

| Library | Version | Use |
|---|---|---|
| **GSAP** | ^3.15.0 | Scroll-triggered animations, timelines, scrub effects, matchMedia |
| **Framer Motion** | ^12.42.2 | Component-level entrance animations, AnimatePresence, useInView |
| **typewriter-effect** | ^2.22.0 | Typewriter text in logo splash |
| **CSS Keyframes** | — | Ambient loops (float, glow, spin, particles, marquee) |

### 12.2 CSS Keyframe Library

```css
@keyframes float          — 4s translateY(-12px) bounce
@keyframes pulse-glow     — 2s box-shadow pulsing
@keyframes spin-slow      — Variable duration (6s–20s) full rotation
@keyframes particle-float — 8s translateY(100vh → -100px) with scale and opacity
@keyframes bounce         — 1.5s gentle scroll hint arrow
```

### 12.3 Easing Conventions

| Use | Easing |
|---|---|
| Content entrances | `[0.22, 1, 0.36, 1]` (custom bezier — smooth overshoot) |
| Nav scroll transition | `cubic-bezier(0.4, 0, 0.2, 1)` |
| GSAP scroll reveals | `power3.out` / `back.out(1.6)` |
| Card hovers | `ease` / `0.3s` duration |
| Modal overlay | `cubic-bezier(0.16, 1, 0.3, 1)` in, `cubic-bezier(0.55, 0, 1, 0.45)` out |

### 12.4 Scroll Animation Patterns

- **Pin & scrub**: Hero image track slides horizontally while section is pinned.
- **Entrance bloom**: Cards slide in from left/right (desktop) or bottom (mobile) on scroll.
- **Path draw**: SVG timeline path progressively draws with `strokeDashoffset`.
- **Parallax mouse-follow**: 404 page radial glow tracks cursor.
- **Elastic reveal**: Logo splash with elastic-out entrance (`scale: 0, rotate: -180`).

### 12.5 Transition Defaults

- Background/colour changes: `0.3s–0.4s ease`.
- Card hovers: `transform 0.3s, box-shadow 0.3s`.
- Theme transition: `background-color 0.4s ease, color 0.4s ease`.
- All transitions use `will-change: transform` where needed.

---

## 13. Responsive Strategy

### 13.1 Breakpoints

| Breakpoint | Target |
|---|---|
| `≤ 1024px` | Tablet — pillar grids reduce columns |
| `≤ 900px` | Tablet — hero goes single column, testimonials stack, image cards shrink |
| `≤ 768px` | Mobile — nav links hide, hamburger appears, mobile dropdown shows |
| `≤ 700px` | Mobile — mentor grid goes single column |
| `≤ 680px` | Mobile — events cards slide from bottom instead of sides |
| `≤ 600px` | Mobile — team/publication sections shrink padding |
| `≤ 500px` | Small mobile — about pillars go single column |
| `≤ 480px` | Small mobile — aggressive padding reduction, nav brand shrinks, full-width CTAs |

### 13.2 Mobile Adaptations

- Hero illustration (orbital rings) **hides** on mobile (`≤ 900px`).
- Image track: GSAP scroll-scrub → CSS marquee animation.
- Grids collapse to single column.
- CTAs stack vertically and go `width: 100%`.
- Cards reduce in size (e.g., `280×160px` → `160×100px`).
- Section padding reduces from `100px 6%` → `60px 4%`.
- GSAP `matchMedia()` used for responsive animation switching.

---

## 14. Scrollbar

```css
::-webkit-scrollbar         { width: 6px; }
::-webkit-scrollbar-track   { background: var(--surface-container-low); }
::-webkit-scrollbar-thumb   { background: var(--secondary); border-radius: 10px; }
```

---

## 15. Section Pattern — Anatomy

Every major section follows this structure:

```
┌─────────────────────────────────────────┐
│  Eyebrow  (accent colour, uppercase,    │
│            mono font, 0.85rem)          │
│                                         │
│  Section Title  (.section-title)        │
│  with <span class="accent-gradient">    │
│                                         │
│  Optional description  (text-muted)     │
│                                         │
│  ─── Content Grid / Cards ───           │
│                                         │
│  Optional top/bottom accent line        │
│  (gradient-accent, 0.35 opacity)        │
└─────────────────────────────────────────┘
```

### Alternating Backgrounds

Sections alternate between `var(--bg-primary)` and `var(--bg-secondary)`:

```
LogoSplash    → gradient-hero
Hero          → bg-primary
Mentors       → bg-primary
About         → bg-primary
Testimonials  → bg-secondary
Gallery       → bg-primary
Guidance      → bg-secondary
FAQ           → bg-secondary
Footer        → bg-primary
```

---

## 16. Image Handling

- **Cloudinary** is used for all member photos, event images, and gallery content (`res.cloudinary.com`).
- **Next.js `<Image>`** used for the logo and gallery images (with `fill` + `object-fit: cover`).
- **Raw `<img>`** used inside styled-jsx components (hero image tracks, event cards, modals).
- Image hover: `transform: scale(1.05–1.10)` with `transition: transform 0.5–0.7s ease`.
- Gallery images are lazy-loaded except the first (`loading="eager"`).
- Skeleton shimmer animation shown during image loading.

---

## 17. Icon Language

The site uses **emoji icons** throughout rather than an icon library:

- 🎭 Cultural · ⚡ Tech
- 🎵 🖼️ 💃 🎬 🎨 — Cultural orbiting icons
- 💻 🤖 🔗 📡 🚀 — Tech orbiting icons
- 📅 🕐 📍 — Event metadata
- ✦ — Founder/mentor badges
- ★ — Guest mentor badge
- › — Editorial list markers

For UI controls (nav arrows, close buttons, gallery controls), inline SVGs are used for precision.

---

## 18. Technology Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 16.2.10 (App Router) |
| Language | TypeScript |
| React | 19.2.4 |
| Styling | Tailwind CSS 4 + styled-jsx (co-located) |
| Animations | GSAP 3.15 + Framer Motion 12 |
| Fonts | `next/font/google` (Sora, Hanken Grotesk, JetBrains Mono, Orbitron) |
| Images | Cloudinary CDN + Next.js `<Image>` |

### Styling Approach

The project uses a **hybrid styling strategy**:

1. **`globals.css`** — Design tokens (CSS custom properties), base resets, utility classes, and shared component styles.
2. **Styled-jsx (`<style jsx>`)** — Component-scoped styles co-located inside each `.tsx` file. This is the primary styling method for components.
3. **Tailwind CSS** — Used sparingly for quick utility needs (flex, gap, padding in some components).

### Conventions

- Components are `'use client'` (client components) throughout.
- All components live in `app/components/`.
- Data files live in `app/data/`.
- Context providers in `app/context/`.
- Pages use the Next.js App Router file conventions (`page.tsx`).

---

## 19. Accessibility Notes

- Interactive elements have `aria-label` attributes.
- FAQ items use `aria-expanded`.
- Image tracks pause on hover (`animation-play-state: paused`).
- Keyboard navigation implemented in modal (Escape to close, Arrow keys for gallery).
- Decorative SVGs have `aria-hidden="true"`.
- Focus-visible outlines on clickable timeline cards.
- Color contrast is maintained through carefully chosen on-surface values.

---

## 20. Quick Reference — CSS Class Glossary

| Class | Purpose |
|---|---|
| `.accent-gradient` | Gradient-clipped text |
| `.glass` | Glassmorphic panel |
| `.glass-card` | Standard card with border, bg, hover glow |
| `.btn-primary` | Filled pill button |
| `.btn-secondary` | Ghost pill button |
| `.section-title` | Large section heading |
| `.type-display-lg` | Display-level typography |
| `.type-body-lg` | Lead paragraph typography |
| `.type-label-caps` | Monospace uppercase label |
| `.chip` | Rectangular tag |
| `.input-editorial` | Underline-styled input |
| `.float-anim` | 4s float bounce animation |
| `.container` | Max-width centered wrapper |
| `.divider` | Horizontal rule |
| `.editorial-list` | Chevron-prefixed list |
| `.theme-toggle` | Theme switch button |
| `.surface-0/1/2` | Elevation surface layers |

---

*This document is the single source of truth for SoarJMI's visual design system. All new components and pages should consume these tokens, follow these patterns, and maintain consistency with the established aesthetic.*
