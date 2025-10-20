# Global Color System & Theming

## Color Palette

### 🎨 LIGHT MODE (Minimal Cream & Coral)
- bgPrimary: #FFF9F3 (Cream background base)
- bgSecondary: #FFF3E9 (Section contrast)
- bgSurface: #FFFFFF (Cards, surfaces)
- textPrimary: #3A2D28 (Mocha brown - replaces harsh black)
- textSecondary: #6E5C55 (Dusty taupe - subtext)
- textMuted: #A48C82 (Warm sand - muted content)
- textAccent: #E85D45 (Coral highlight - headings/buttons)
- textHighlight: #D7745B (Terracotta - emphasis text)
- border: #E8D5C8 (Soft border tone)
- buttonPrimary: #E85D45 (Coral CTA)
- buttonHover: #D94A33 (Darker coral hover)
- buttonText: #FFFFFF (White text on coral button)
- cardBg: #FFFFFF (Card surface)
- cardBorder: #F2E5D9 (Card border)
- link: #FF6F61 (Coral link)
- linkHover: #D94A33 (Link hover coral)

### 🌑 DARK MODE (Warm Futuristic)
- bgPrimary: #181210 (Deep warm black)
- bgSecondary: #1E1614 (Slightly lighter section)
- bgSurface: #241A17 (Cards, surfaces)
- textPrimary: #F6E8D8 (Warm ivory - soft off-white)
- textSecondary: #DAB9A0 (Muted apricot - subtext)
- textMuted: #A47B61 (Antique bronze - low contrast)
- textAccent: #FF8A5C (Neon coral - accent)
- textHighlight: #FFC48A (Golden blush - highlight text)
- border: #3C2E2A (Warm deep border)
- buttonPrimary: #FF8A5C (Coral CTA)
- buttonHover: #FF9966 (Glow hover effect)
- buttonText: #1E1614 (Dark text on light button)
- cardBg: #241A17 (Card background)
- cardBorder: #3C2E2A (Card border)
- link: #FF9D6E (Soft ember - link)
- linkHover: #FFB185 (Warm coral hover)

## Tailwind CSS Classes

### Background Colors
- Light mode primary: `bg-light-bgPrimary`
- Light mode secondary: `bg-light-bgSecondary`
- Light mode surface: `bg-light-bgSurface`
- Dark mode primary: `bg-dark-bgPrimary`
- Dark mode secondary: `bg-dark-bgSecondary`
- Dark mode surface: `bg-dark-bgSurface`

### Text Colors
- Light mode primary: `text-light-textPrimary`
- Light mode secondary: `text-light-textSecondary`
- Light mode muted: `text-light-textMuted`
- Light mode accent: `text-light-textAccent`
- Light mode highlight: `text-light-textHighlight`
- Dark mode primary: `text-dark-textPrimary`
- Dark mode secondary: `text-dark-textSecondary`
- Dark mode muted: `text-dark-textMuted`
- Dark mode accent: `text-dark-textAccent`
- Dark mode highlight: `text-dark-textHighlight`

### Button Colors
- Light mode primary: `bg-light-buttonPrimary`
- Light mode hover: `bg-light-buttonHover`
- Light mode text: `text-light-buttonText`
- Dark mode primary: `bg-dark-buttonPrimary`
- Dark mode hover: `bg-dark-buttonHover`
- Dark mode text: `text-dark-buttonText`

### Link Colors
- Light mode: `text-light-link`
- Light mode hover: `text-light-linkHover`
- Dark mode: `text-dark-link`
- Dark mode hover: `text-dark-linkHover`

### Border Colors
- Light mode: `border-light-border`
- Dark mode: `border-dark-border`

### Card Colors
- Light mode background: `bg-light-cardBg`
- Light mode border: `border-light-cardBorder`
- Dark mode background: `bg-dark-cardBg`
- Dark mode border: `border-dark-cardBorder`

## CSS Variables

You can also use CSS variables directly:

### Background Colors
- `var(--color-bg-primary)` - Primary background
- `var(--color-bg-secondary)` - Secondary background
- `var(--color-bg-surface)` - Surface background

### Text Colors
- `var(--color-text-primary)` - Primary text
- `var(--color-text-secondary)` - Secondary text
- `var(--color-text-muted)` - Muted text
- `var(--color-text-accent)` - Accent text
- `var(--color-text-highlight)` - Highlight text

### Border Colors
- `var(--color-border)` - Border color

### Button Colors
- `var(--color-button-primary)` - Primary button background
- `var(--color-button-hover)` - Button hover state
- `var(--color-button-text)` - Button text color

### Card Colors
- `var(--color-card-bg)` - Card background
- `var(--color-card-border)` - Card border

### Link Colors
- `var(--color-link)` - Link color
- `var(--color-link-hover)` - Link hover color

### Legacy Variables (for backward compatibility)
- `var(--bg-color)` - Background color
- `var(--text-primary)` - Primary text color
- `var(--text-secondary)` - Secondary text color
- `var(--text-accent)` - Accent text color
- `var(--text-muted)` - Muted text color
- `var(--primary-color)` - Primary color
- `var(--secondary-color)` - Secondary color
- `var(--accent-color)` - Accent color

Example usage:
```css
.my-element {
  background-color: var(--bg-color);
  color: var(--text-primary);
}
```

## Theme Toggle

The theme is controlled by the `ThemeToggle` component which adds/removes the `dark` class on the `<html>` element. The user's preference is stored in localStorage.