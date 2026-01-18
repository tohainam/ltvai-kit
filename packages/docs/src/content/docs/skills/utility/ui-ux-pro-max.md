---
title: UI/UX Pro Max
description: Comprehensive UI/UX design intelligence với 50+ styles, color palettes, và typography
---

import { Aside, Tabs, TabItem } from "@astrojs/starlight/components";

## Overview

`/ui-ux-pro-max` là Utility Skill cung cấp comprehensive design intelligence cho UI/UX development.

<Aside type="tip">
  Sử dụng `/ui-ux-pro-max` khi cần design guidelines, color palettes, hoặc UI component recommendations.
</Aside>

## Capabilities

| Category | Count | Examples |
|----------|-------|----------|
| UI Styles | 50+ | Glassmorphism, Minimalism, Brutalism |
| Color Palettes | 97 | By product type (SaaS, E-commerce, etc.) |
| Font Pairings | 57 | Display + Body combinations |
| UX Guidelines | 99 | Best practices và anti-patterns |
| Chart Types | 25 | Data visualization options |
| Tech Stacks | 9 | React, Vue, Next.js, Flutter, etc. |

## Quick Start

```
/ui-ux-pro-max Design a dashboard for analytics SaaS
```

Claude sẽ cung cấp:
- Recommended style
- Color palette
- Typography
- Component structure
- Accessibility checklist

## Search Domains

<Tabs>
  <TabItem label="Product Type">
    ```
    /ui-ux-pro-max SaaS analytics dashboard
    ```

    Returns product-specific recommendations:
    - Color schemes for SaaS
    - Dashboard layout patterns
    - Data visualization best practices
  </TabItem>

  <TabItem label="Style">
    ```
    /ui-ux-pro-max glassmorphism card design
    ```

    Returns style-specific guidelines:
    - Blur và transparency values
    - Border và shadow specs
    - Background treatments
  </TabItem>

  <TabItem label="Typography">
    ```
    /ui-ux-pro-max font pairing for tech blog
    ```

    Returns typography recommendations:
    - Display font options
    - Body font matches
    - Size và weight scales
  </TabItem>

  <TabItem label="Color">
    ```
    /ui-ux-pro-max color palette for health app
    ```

    Returns color system:
    - Primary, secondary, accent
    - Semantic colors (success, error, warning)
    - Dark mode variants
  </TabItem>
</Tabs>

## Rule Categories

### Priority: CRITICAL

**Accessibility**
- Color contrast ratios (WCAG AA minimum)
- Focus states visible
- Alt text for images
- ARIA labels where needed
- Keyboard navigation support

**Touch & Interaction**
- 44x44px minimum touch targets
- Hover vs tap considerations
- Loading state indicators

### Priority: HIGH

**Performance**
- Image optimization
- Reduced motion support
- Layout stability (no CLS)

**Layout & Responsive**
- Viewport meta tag
- Responsive font sizes
- No horizontal scroll
- Proper z-index management

### Priority: MEDIUM

**Typography & Color**
- Line height (1.5-1.7 for body)
- Line length (45-75 characters)
- Consistent font pairing

**Animation**
- Duration: 150-300ms for micro
- Use transform, not layout props
- Loading state animations

**Style Selection**
- Consistent style throughout
- SVG icons (no emoji in production)

### Priority: LOW

**Charts & Data**
- Appropriate chart type for data
- Accessible color schemes
- Table alternatives for mobile

## UI Styles Reference

| Style | Use Case | Key Characteristics |
|-------|----------|---------------------|
| **Glassmorphism** | Modern dashboards | Blur, transparency, subtle borders |
| **Minimalism** | Content-focused | White space, limited colors |
| **Brutalism** | Bold statements | Raw aesthetics, strong contrasts |
| **Neumorphism** | Soft interfaces | Soft shadows, monochrome |
| **Bento Grid** | Feature showcases | Grid-based, varied sizes |
| **Dark Mode** | Developer tools | Low brightness, high contrast |

## Tech Stack Support

| Stack | Features |
|-------|----------|
| **React** | Component patterns, hooks |
| **Next.js** | App router, RSC patterns |
| **Vue** | Composition API patterns |
| **Svelte** | Reactive patterns |
| **Tailwind** | Utility classes, config |
| **shadcn/ui** | Component examples |
| **SwiftUI** | iOS native patterns |
| **React Native** | Mobile patterns |
| **Flutter** | Cross-platform patterns |

## Example Output

```
/ui-ux-pro-max landing page for developer tool
```

```markdown
## Design System Recommendation

### Style: Minimalist + Dark Mode
Developer tools benefit from:
- Dark backgrounds (reduces eye strain)
- High contrast code blocks
- Clean typography

### Color Palette
- Background: #0a0a0a
- Surface: #1a1a1a
- Primary: #3b82f6 (Blue)
- Text: #fafafa
- Muted: #71717a

### Typography
- Display: Inter (600-700 weight)
- Body: Inter (400 weight)
- Mono: JetBrains Mono

### Component Structure
1. Hero with code demo
2. Feature grid (3 columns)
3. Code examples section
4. Pricing comparison
5. Footer with docs links

### Accessibility Checklist
- [ ] Color contrast > 4.5:1
- [ ] Focus indicators visible
- [ ] Skip to content link
- [ ] Keyboard navigation
```

## Pre-Delivery Checklist

Trước khi deliver UI, check:

```markdown
## Accessibility
- [ ] Color contrast ratios pass WCAG AA
- [ ] All interactive elements have focus states
- [ ] Images have alt text
- [ ] Forms have labels

## Performance
- [ ] Images optimized (WebP, lazy loading)
- [ ] Reduced motion respected
- [ ] No layout shifts

## Responsive
- [ ] Works on 320px width
- [ ] Touch targets 44x44px minimum
- [ ] No horizontal scroll

## Consistency
- [ ] Single style throughout
- [ ] Color palette consistent
- [ ] Typography scale consistent
```

## Integration

`/ui-ux-pro-max` works well with:

- **Brainstorming**: Get design direction for new features
- **Implementing**: Apply design guidelines during implementation
- **Reviewing**: Check UI/UX quality

## Best Practices

1. **Be Specific**: Mention product type và target audience
2. **Mention Constraints**: Existing brand colors, accessibility requirements
3. **Ask for Alternatives**: "Show me 3 style options"
4. **Request Rationale**: "Explain why this palette works"

## Related

- [Mermaid.js v11](/skills/utility/mermaidjs-v11/) - Create visual diagrams
- [React Best Practices](/skills/utility/react-best-practices/) - Optimize React components
- [Brainstorming](/skills/producer/brainstorming/) - Plan UI features
