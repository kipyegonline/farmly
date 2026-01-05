# Header Architecture

## Component Hierarchy

```
app/home.tsx
│
├── Header (index.tsx)                    [Container Component]
│   ├── Scroll detection logic
│   ├── Sticky positioning
│   ├── Dynamic styling based on scroll
│   │
│   ├── DesktopHeader.tsx                [Desktop Layout - Hidden on mobile]
│   │   ├── Logo with Link
│   │   │   ├── Leaf icon (animated float)
│   │   │   └── Brand text (gradient)
│   │   └── Dark mode toggle button
│   │
│   └── MobileHeader.tsx                 [Mobile Layout - Hidden on desktop]
│       ├── Compact logo with Link
│       ├── Dark mode toggle button
│       └── Menu burger button
│
└── MobileDrawer.tsx                     [Slide-out Navigation]
    └── Category list (animated)
```

## Data Flow

```
Parent Component (app/home.tsx)
│
├── State Management
│   ├── darkMode: boolean
│   ├── setDarkMode: () => void
│   ├── mobileMenuOpen: boolean
│   ├── setMobileMenuOpen: (open: boolean) => void
│   └── categories: string[]
│
├── Props passed to Header ──────────┐
│   ├── darkMode                     │
│   ├── toggleDarkMode               │
│   ├── mobileMenuOpen               │
│   └── setMobileMenuOpen            │
│                                    │
├── Props passed to MobileDrawer ────┤
│   ├── mobileMenuOpen               │
│   ├── setMobileMenuOpen            │
│   └── categories                   │
│                                    │
└── Header Component ◄───────────────┘
    │
    ├── DesktopHeader ◄───────┐
    │   ├── darkMode          │
    │   └── toggleDarkMode    │ Props forwarded
    │                         │
    └── MobileHeader ◄────────┤
        ├── darkMode          │
        ├── toggleDarkMode    │
        ├── mobileMenuOpen    │
        └── setMobileMenuOpen │
                              │
                              └─ Shared Props
```

## Interaction Flow

### Dark Mode Toggle
```
User clicks dark mode button
    ↓
MobileHeader/DesktopHeader triggers onClick
    ↓
Calls toggleDarkMode() from props
    ↓
Parent component updates darkMode state
    ↓
All components re-render with new darkMode value
    ↓
Tailwind classes update dynamically
```

### Mobile Menu
```
User clicks menu button (MobileHeader)
    ↓
setMobileMenuOpen(true) called
    ↓
Parent component updates mobileMenuOpen state
    ↓
MobileDrawer receives mobileMenuOpen={true}
    ↓
Drawer slides in from right
    ↓
User clicks category or backdrop
    ↓
setMobileMenuOpen(false) called
    ↓
Drawer slides out
```

### Scroll Effect
```
User scrolls page
    ↓
Header's scroll event listener fires
    ↓
Updates local 'scrolled' state
    ↓
Header container classes change
    ↓
Shadow, background, border adjust
    ↓
Smooth 500ms transition applied
```

## Responsive Breakpoints

```
Screen Size          Desktop Header    Mobile Header    Drawer
─────────────────────────────────────────────────────────────────
0px - 767px (base)       Hidden           Visible       Available
768px+ (md)              Visible          Hidden        Hidden
```

## Styling Layers

```
┌─────────────────────────────────────────────────────────┐
│ Header Container (index.tsx)                            │
│ ┌─────────────────────────────────────────────────────┐ │
│ │ Positioning: sticky top-0 z-50                      │ │
│ │ Background: backdrop-blur-xl with opacity           │ │
│ │ Border: Dynamic based on scroll & darkMode          │ │
│ │ Shadow: Appears on scroll                           │ │
│ └─────────────────────────────────────────────────────┘ │
│                                                           │
│ ┌──────────────────────┐  ┌──────────────────────┐      │
│ │ Desktop Header       │  │ Mobile Header        │      │
│ │ - h-20 (80px)        │  │ - h-16 (64px)        │      │
│ │ - hidden md:flex     │  │ - md:hidden          │      │
│ │ - Larger elements    │  │ - Compact elements   │      │
│ └──────────────────────┘  └──────────────────────┘      │
└─────────────────────────────────────────────────────────┘
```

## Animation Timeline

### Page Load
```
0ms    ───►  Header mounts
0ms    ───►  Scroll listener attached
100ms  ───►  Desktop logo fade-in starts
200ms  ───►  Mobile logo fade-in starts
300ms  ───►  Dark mode button appears
```

### Scroll Event
```
0ms    ───►  Scroll detected
0ms    ───►  scrolled state updates to true
0ms    ───►  Transition begins (duration: 500ms)
500ms  ───►  Shadow fully visible
500ms  ───►  Background opacity at 95%
500ms  ───►  Border fully opaque
```

### Mobile Drawer Open
```
0ms    ───►  Menu button clicked
0ms    ───►  mobileMenuOpen set to true
0ms    ───►  Drawer begins slide-in
300ms  ───►  Drawer fully visible
0ms    ───►  Category items start animating
50ms   ───►  Category 1 fades in
100ms  ───►  Category 2 fades in
150ms  ───►  Category 3 fades in
... (staggered by 50ms)
```

## File Dependencies

```
index.tsx
├── Imports
│   ├── React (useState, useEffect)
│   ├── @mantine/core (Box)
│   ├── ./DesktopHeader
│   └── ./MobileHeader
└── Exports: default Header

DesktopHeader.tsx
├── Imports
│   ├── React
│   ├── @mantine/core (Flex, Box, Text, Button)
│   ├── lucide-react (Leaf, Sun, Moon)
│   └── next/link
└── Exports: default DesktopHeader

MobileHeader.tsx
├── Imports
│   ├── React
│   ├── @mantine/core (Flex, Box, Text, Button)
│   ├── lucide-react (Leaf, Sun, Moon, Menu)
│   └── next/link
└── Exports: default MobileHeader

MobileDrawer.tsx
├── Imports
│   ├── React
│   ├── @mantine/core (Drawer, Stack, Text)
│   └── (No icon dependencies)
└── Exports: default MobileDrawer
```

## CSS Classes Breakdown

### From globals.css (Custom)
```css
.animate-float        /* Floating animation for leaf icon */
.gradient-text        /* Animated gradient on brand text */
.interactive-scale    /* Bounce scale effect on hover */
.ripple-effect        /* Click ripple animation */
.animate-fadeInRight  /* Fade in from right (drawer items) */
.backdrop-blur-xl     /* Strong backdrop blur effect */
```

### From Tailwind (Utility)
```css
/* Layout */
.sticky, .top-0, .z-50, .h-16, .h-20
.flex, .hidden, .md:flex, .md:hidden

/* Spacing */
.px-4, .py-2, .gap-md, .gap-sm

/* Colors */
.text-emerald-600, .bg-gray-900, .border-gray-700

/* Effects */
.transition-all, .duration-300, .duration-500
.hover:scale-110, .hover:rotate-12
.rounded-full, .rounded-lg, .rounded-xl

/* Responsive */
.sm:px-6, .lg:px-8, .md:hidden
```

## State Management

### Local State (within Header component)
```tsx
const [scrolled, setScrolled] = useState(false);
// Tracks whether user has scrolled past threshold
// Used for: Dynamic styling of header container
```

### Props State (from parent)
```tsx
darkMode: boolean              // Global dark mode state
toggleDarkMode: () => void     // Toggle dark mode function
mobileMenuOpen: boolean        // Drawer open/closed state
setMobileMenuOpen: (open: boolean) => void  // Update drawer state
```

## Event Handlers

```tsx
// In Header (index.tsx)
useEffect(() => {
  const handleScroll = () => {
    setScrolled(window.scrollY > 20);
  };
  window.addEventListener('scroll', handleScroll);
  return () => window.removeEventListener('scroll', handleScroll);
}, []);

// In DesktopHeader/MobileHeader
onClick={toggleDarkMode}  // Button click handler

// In MobileHeader
onClick={() => setMobileMenuOpen(!mobileMenuOpen)}  // Menu toggle

// In MobileDrawer
onClose={() => setMobileMenuOpen(false)}  // Drawer close handler
```

## Performance Optimizations

1. **Component Splitting**
   - Desktop/Mobile components separated
   - CSS display: none instead of conditional rendering
   - Reduces re-renders

2. **Event Listeners**
   - Single scroll listener in parent Header
   - Proper cleanup on unmount
   - No memory leaks

3. **CSS Animations**
   - GPU-accelerated transforms
   - Will-change hints where needed
   - Smooth 60fps animations

4. **Code Splitting**
   - Each component in separate file
   - Better tree-shaking
   - Smaller bundle sizes

## Best Practices Applied

✓ Component composition over inheritance
✓ Clear prop types with TypeScript
✓ Single responsibility per component
✓ Proper event listener cleanup
✓ Accessibility considerations
✓ Responsive design from mobile-first
✓ Smooth transitions and animations
✓ Dark mode support throughout
✓ Semantic HTML structure
✓ Reusable and maintainable code
