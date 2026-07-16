---
name: Ascendant Editorial
colors:
  surface: '#f8faf8'
  surface-dim: '#d8dad9'
  surface-bright: '#f8faf8'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f2f4f2'
  surface-container: '#eceeec'
  surface-container-high: '#e6e9e7'
  surface-container-highest: '#e1e3e1'
  on-surface: '#191c1b'
  on-surface-variant: '#434843'
  inverse-surface: '#2e3130'
  inverse-on-surface: '#eff1ef'
  outline: '#737973'
  outline-variant: '#c3c8c1'
  surface-tint: '#4d6453'
  primary: '#061b0e'
  on-primary: '#ffffff'
  primary-container: '#1b3022'
  on-primary-container: '#819986'
  inverse-primary: '#b4cdb8'
  secondary: '#37684e'
  on-secondary: '#ffffff'
  secondary-container: '#baefce'
  on-secondary-container: '#3d6e54'
  tertiary: '#101916'
  on-tertiary: '#ffffff'
  tertiary-container: '#242e2a'
  on-tertiary-container: '#8b9691'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#d0e9d4'
  primary-fixed-dim: '#b4cdb8'
  on-primary-fixed: '#0b2013'
  on-primary-fixed-variant: '#364c3c'
  secondary-fixed: '#baefce'
  secondary-fixed-dim: '#9ed2b3'
  on-secondary-fixed: '#002112'
  on-secondary-fixed-variant: '#1e5038'
  tertiary-fixed: '#dae5df'
  tertiary-fixed-dim: '#bec9c3'
  on-tertiary-fixed: '#141e1a'
  on-tertiary-fixed-variant: '#3f4945'
  background: '#f8faf8'
  on-background: '#191c1b'
  surface-variant: '#e1e3e1'
typography:
  display-lg:
    fontFamily: Sora
    fontSize: 64px
    fontWeight: '700'
    lineHeight: '1.1'
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Sora
    fontSize: 40px
    fontWeight: '600'
    lineHeight: '1.2'
  headline-lg-mobile:
    fontFamily: Sora
    fontSize: 32px
    fontWeight: '600'
    lineHeight: '1.2'
  headline-md:
    fontFamily: Sora
    fontSize: 24px
    fontWeight: '600'
    lineHeight: '1.3'
  body-lg:
    fontFamily: Hanken Grotesk
    fontSize: 18px
    fontWeight: '400'
    lineHeight: '1.6'
  body-md:
    fontFamily: Hanken Grotesk
    fontSize: 16px
    fontWeight: '400'
    lineHeight: '1.6'
  label-caps:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: '500'
    lineHeight: '1.0'
    letterSpacing: 0.1em
rounded:
  sm: 0.125rem
  DEFAULT: 0.25rem
  md: 0.375rem
  lg: 0.5rem
  xl: 0.75rem
  full: 9999px
spacing:
  unit: 8px
  container-max: 1280px
  gutter: 24px
  margin-desktop: 64px
  margin-mobile: 20px
---

## Brand & Style

The design system is crafted for a premium collegiate society that bridges the gap between academic structure and creative expression. The brand personality is **sophisticated, intentional, and visionary**. It aims to evoke a sense of prestige while remaining accessible to a modern, innovative student body.

The visual style is a fusion of **Modern Minimalism** and **Editorial Precision**. It utilizes expansive whitespace, a structured grid inspired by high-end print magazines, and subtle glassmorphism to add depth without clutter. The aesthetic focuses on "The Space Between," where the layout feels as curated as the content it hosts.

Key visual principles:
- **Asymmetric Balance:** Intentional use of off-center elements to create a dynamic, "collage-like" feel.
- **Micro-interactions:** Smooth, slow-ease transitions that mimic the graceful movement of flight.
- **Architectural Framing:** Use of thin lines and varied border weights to compartmentalize information cleanly.

## Colors

The palette is derived directly from the botanical and avian influences of the logo. 

- **Primary (Deep Forest):** Used for primary headings, heavy brand elements, and high-importance buttons. It provides the "grounding" force of the design.
- **Secondary (Ethereal Mint):** A soft, versatile green used for highlights, accents, and supportive UI elements. It represents innovation and growth.
- **Tertiary (Dusty Sage):** Used for subtle backgrounds, containers, and borders to create soft layering.
- **Neutral (Off-White/Parchment):** The canvas color. It is warmer than pure white, giving the interface an organic, premium "paper" feel.

Functional colors (Success, Warning, Error) should be desaturated to match this earthy, sophisticated tone.

## Typography

This design system uses a typographic hierarchy that mirrors a modern editorial layout.

- **Headlines:** Sora provides a bold, geometric, and futuristic feel. It should be used for all major headers to establish a strong brand voice.
- **Body:** Hanken Grotesk is chosen for its exceptional legibility and contemporary "grotesque" character. It feels professional yet approachable.
- **Technical Accents:** JetBrains Mono is introduced for small labels, metadata, and overlines. This adds a "structured/coded" layer to the creative aesthetic, nodding to the innovation aspect of the society.

Use generous tracking for labels and tight leading for large display headers to create visual tension.

## Layout & Spacing

The layout follows a **12-column fluid grid** for desktop, collapsing to **4 columns** for mobile. 

The rhythm is dictated by "Breathable Density." While components themselves are tightly structured, the space between sections is expansive (using multiples of 64px or 80px) to maintain a premium feel. 

**Reflow Rules:**
- **Desktop:** Large imagery and text blocks should stagger, creating a vertical flow that feels like a physical collage.
- **Tablet:** Shift to a more symmetrical 8-column layout with center-aligned typography for readability.
- **Mobile:** Single column focus. Margins are reduced to 20px to maximize real estate for high-quality imagery.

## Elevation & Depth

This design system avoids heavy drop shadows, opting instead for **Tonal Layering** and **Frosted Glass**.

- **Surface Levels:** 
  - Level 0: Neutral background (Off-white).
  - Level 1: Tertiary containers (Dusty Sage) used for cards or content blocks.
  - Level 2: Pure white surfaces for active states or floating menus.
- **Glassmorphism:** Navigation bars and overlays use a 20px backdrop-blur with 60% opacity of the Off-White color. This suggests transparency and "soaring" over content.
- **Outlines:** Use 1px solid borders in a slightly darker shade than the surface they sit on (Primary color at 10% opacity) to define edges without adding visual weight.

## Shapes

The shape language is **structured yet softened**. 

While the brand is creative, it is also "Modern" and "Architectural," so we avoid overly bubbly shapes. A subtle 4px radius (Soft) is the standard for cards and inputs, providing a clean edge that feels precise. 

**Exceptions:**
- **Buttons:** Large action buttons should use a full pill-shape (Rounded-xl) to contrast against the rectangular grid and signify interactivity.
- **Images:** Images should remain sharp (0px radius) to emphasize the editorial "cut-out" collage aesthetic.

## Components

- **Buttons:** 
  - *Primary:* Deep Forest green fill, white Sora text, pill-shaped.
  - *Secondary:* Ghost style with a 1px Mint border and Mint text.
- **Cards:** 
  - Flat containers with a subtle 1px border. No shadows. On hover, the background shifts slightly to a Mint tint.
- **Input Fields:** 
  - Underlined style (rather than boxed) to maintain the editorial feel. The label uses the JetBrains Mono "Label-caps" style.
- **Chips/Tags:** 
  - Small, rectangular blocks with 2px radius. Uses the Tertiary color background with Deep Forest text.
- **Lists:** 
  - Clean, wide-spaced lists separated by thin 1px horizontal lines. Bullet points are replaced with small Mint-colored chevrons or geometric dots.
- **Collage Gallery:** 
  - A specialized component where images are placed with varying aspect ratios and slight overlaps, mimicking a physical collage board.