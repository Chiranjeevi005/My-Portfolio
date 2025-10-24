# Interests Section Architecture

## Component Structure

```mermaid
graph TD
    A[Interests Section] --> B[Section Container]
    A --> C[Background Elements]
    B --> D[Section Header]
    B --> E[Wave Visualization]
    B --> F[Interest Capsules]
    B --> G[Microcopy]
    
    D --> D1[Title: "Curiosity in Motion"]
    D --> D2[Subtitle: "A reflection of passions..."]
    
    E --> E1[SVG Wave Path - Light Mode]
    E --> E2[SVG Wave Path - Dark Mode]
    E --> E3[Continuous Animation]
    E --> E4[Parallax Effect]
    
    F --> F1[Capsule 1: Travel]
    F --> F2[Capsule 2: Edutainment]
    F --> F3[Capsule 3: Volunteering]
    F --> F4[Capsule 4: Business Strategy]
    F --> F5[Capsule 5: AI Tools]
    F --> F6[Capsule 6: Movies]
    F --> F7[Capsule 7: Cultural Enrichment]
    
    F1 --> F1A[Emoji]
    F1 --> F1B[Tooltip with Tagline]
```

## Key Features Implemented

1. **Wave Visualization**
   - Smooth sine wave path using SVG
   - Gradient colors matching theme (Coral Terracotta blend for light mode, Neon Coral to Golden Blush for dark mode)
   - Continuous animation with yoyo effect
   - Parallax scroll effect

2. **Interest Capsules**
   - Glassmorphic design with backdrop blur
   - Positioning along the wave path
   - Hover expansion (1.3× scale)
   - Continuous pulse animation
   - Tooltip display on hover with taglines

3. **Color System Integration**
   - Light Mode:
     - Wave Glow: Coral (#E85D45) fading into Terracotta (#D7745B)
     - Capsule BG: Semi-transparent white rgba(255,255,255,0.6)
     - Text: Mocha Brown (#3A2D28) / Accent: Coral (#E85D45)
   - Dark Mode:
     - Wave Glow: Neon Coral (#FF8A5C) fading into Golden Blush (#FFC48A)
     - Capsule BG: Deep warm translucent rgba(36,26,23,0.7)
     - Text: Warm Ivory (#F6E8D8) / Accent: Golden Blush (#FFC48A)

4. **Animations & Microinteractions**
   - Scroll-triggered entrance animations
   - Continuous wave shimmer animation
   - Capsule pulse animation every few seconds
   - Fade-in reveal for capsules as they enter viewport
   - Responsive alignment for mobile devices

## Technical Implementation

- Built with Next.js + Tailwind CSS v4
- Uses framer-motion for smooth hover interactions
- Uses GSAP for complex scroll-triggered animations
- Fully supports dark/light mode via dark: classes and global CSS variables
- Maintains consistent spacing and padding with px-6 py-16 md:px-12 md:py-24