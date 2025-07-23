# AI-Voca-2 Design System Documentation

## Overview

AI-Voca-2 uses a comprehensive design system built on Tailwind CSS with custom semantic tokens, ensuring consistent visual hierarchy, theming, and responsive behavior across the application.

## Architecture

### Core Technologies
- **Tailwind CSS**: Utility-first CSS framework
- **Custom CSS Variables**: Semantic color tokens and design variables
- **Responsive Design**: Mobile-first approach with breakpoint-specific styles
- **Dark/Light Mode**: Automatic theme switching support

## Color System

### Semantic Color Tokens
All colors are defined as HSL values in CSS variables for consistent theming:

```css
:root {
  /* Primary brand colors */
  --primary: 220 70% 50%;           /* Main brand blue */
  --primary-foreground: 210 40% 98%; /* Text on primary */
  
  /* Background system */
  --background: 0 0% 100%;          /* Page background */
  --foreground: 224 71.4% 4.1%;     /* Main text color */
  
  /* Muted colors for secondary content */
  --muted: 220 14.3% 95.9%;         /* Subtle backgrounds */
  --muted-foreground: 220 8.9% 46.1%; /* Secondary text */
  
  /* Accent colors for highlights */
  --accent: 220 14.3% 95.9%;        /* Accent backgrounds */
  --accent-foreground: 220 8.9% 46.1%; /* Text on accents */
}
```

### Usage Guidelines
- **Never use direct colors**: Always use semantic tokens
- **Example**: Use `text-primary` instead of `text-blue-500`
- **Consistency**: All components follow the same color semantics

## Typography

### Font System
```css
:root {
  --font-sans: 'Inter', system-ui, sans-serif;
  --font-mono: 'Fira Code', monospace;
}
```

### Text Hierarchy
- **Headings**: Use semantic sizing (`text-xl`, `text-2xl`, etc.)
- **Body Text**: Default `text-base` with responsive adjustments
- **Muted Text**: `text-muted-foreground` for secondary information

## Spacing & Layout

### Container System
```css
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}
```

### Responsive Breakpoints
- **Mobile**: Default (no prefix)
- **Tablet**: `sm:` (640px+)
- **Desktop**: `md:` (768px+)
- **Large**: `lg:` (1024px+)

## Component Patterns

### Card Components
```tsx
// Standard card with glass effect
<Card className="hover-lift glass">
  <CardContent className="p-4 sm:p-6">
    // Content
  </CardContent>
</Card>
```

### Button Variants
```tsx
// Primary action
<Button size="lg" className="hover-scale">
  Primary Action
</Button>

// Secondary action
<Button variant="outline" className="hover-lift">
  Secondary Action
</Button>
```

## Animation System

### Custom Utility Classes

#### Hover Effects
```css
/* Smooth scaling on hover */
.hover-scale {
  @apply transition-transform duration-200 hover:scale-105;
}

/* Lift effect with shadow */
.hover-lift {
  @apply transition-all duration-300 hover:translate-y-[-2px] hover:shadow-lg;
}

/* Glow effect for brand elements */
.hover-glow {
  @apply transition-all duration-300 hover:shadow-glow;
}
```

#### Layout Animations
```css
/* Fade in with slide up */
.fade-in {
  animation: fade-in 0.3s ease-out;
}

/* Scale in for modals/popups */
.scale-in {
  animation: scale-in 0.2s ease-out;
}
```

### Glass Morphism
```css
.glass {
  @apply bg-white/10 backdrop-blur-sm border border-white/20;
}
```

## Gradients & Visual Effects

### Brand Gradients
```css
:root {
  --gradient-primary: linear-gradient(135deg, hsl(var(--primary)), hsl(var(--primary-glow)));
  --gradient-surface: linear-gradient(180deg, hsl(var(--background)), hsl(var(--muted)));
}
```

### Text Gradients
```css
.text-gradient {
  @apply bg-gradient-to-r from-primary to-primary-glow bg-clip-text text-transparent;
}
```

### Shadow System
```css
:root {
  --shadow-elegant: 0 10px 30px -10px hsl(var(--primary) / 0.3);
  --shadow-glow: 0 0 40px hsl(var(--primary-glow) / 0.4);
}
```

## Responsive Design Patterns

### Mobile-First Approach
```tsx
// Example: Responsive spacing and sizing
<div className="p-4 sm:p-6 lg:p-8">
  <h1 className="text-2xl sm:text-3xl lg:text-4xl">
    Responsive Title
  </h1>
</div>
```

### Grid Layouts
```tsx
// Responsive grid that stacks on mobile
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
  {items.map(item => (
    <Card key={item.id}>
      // Card content
    </Card>
  ))}
</div>
```

## Icon System

### Lucide React Icons
- **Consistent sizing**: Use `w-4 h-4`, `w-5 h-5`, `w-6 h-6` for different scales
- **Semantic colors**: Apply color classes that match the design system
- **Responsive sizing**: Use responsive classes for mobile optimization

```tsx
// Example icon usage
<Brain className="w-6 h-6 sm:w-8 sm:h-8 text-primary" />
```

## Dark Mode Support

### Automatic Theme Variables
The design system automatically handles dark mode through CSS variables:

```css
@media (prefers-color-scheme: dark) {
  :root {
    --background: 224 71.4% 4.1%;
    --foreground: 210 40% 98%;
    /* ... other dark mode variables */
  }
}
```

## Best Practices

### Do's ✅
- Use semantic color tokens (`text-primary`, `bg-muted`)
- Apply responsive classes for mobile-first design
- Use hover effects for interactive elements
- Maintain consistent spacing with Tailwind's spacing scale
- Use glass morphism effects for modern UI elements

### Don'ts ❌
- Never use direct color values (`text-blue-500`)
- Avoid fixed widths without responsive alternatives
- Don't mix different animation durations inconsistently
- Avoid custom CSS when Tailwind utilities exist
- Don't break the semantic color system

## File Structure

```
src/
├── index.css                 # Global styles and CSS variables
├── tailwind.config.ts        # Tailwind configuration
├── components/
│   └── ui/                   # Reusable UI components
└── pages/                    # Page components using design system
```

## Implementation Example

```tsx
// Complete component following design system
export const ExampleComponent: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto space-y-6 p-4 sm:p-6">
      {/* Hero section with responsive text */}
      <div className="text-center space-y-4">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gradient">
          Design System Example
        </h1>
        <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto">
          This component follows all design system guidelines
        </p>
      </div>

      {/* Interactive cards grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        <Card className="hover-lift glass">
          <CardContent className="p-4 sm:p-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 rounded-lg bg-primary/10">
                <Star className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold">Feature Title</h3>
                <p className="text-sm text-muted-foreground">
                  Feature description using semantic colors
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* CTA with hover effects */}
      <div className="text-center pt-6">
        <Button size="lg" className="hover-scale">
          Call to Action
        </Button>
      </div>
    </div>
  );
};
```

This design system ensures consistency, maintainability, and excellent user experience across all devices and themes.