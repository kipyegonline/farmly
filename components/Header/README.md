# Header Components Documentation

## Overview
The header has been modularized into reusable, maintainable components with clear separation of concerns. This structure makes it easy to modify, test, and extend the header functionality.

## Component Structure

```
components/Header/
├── index.tsx           # Main Header component (container)
├── DesktopHeader.tsx   # Desktop-specific header layout
├── MobileHeader.tsx    # Mobile-specific header layout
├── MobileDrawer.tsx    # Mobile navigation drawer
└── README.md           # This documentation
```

## Components

### 1. Header (index.tsx)
**Main container component that orchestrates all header elements**

**Props:**
```tsx
type HeaderProps = {
  darkMode: boolean;
  toggleDarkMode: () => void;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
};
```

**Features:**
- Scroll detection for dynamic styling
- Sticky positioning
- Backdrop blur effect
- Smooth shadow transitions on scroll
- Responsive to dark mode changes

**Usage:**
```tsx
import Header from '@/components/Header';

<Header
  darkMode={darkMode}
  toggleDarkMode={toggleDarkMode}
  mobileMenuOpen={mobileMenuOpen}
  setMobileMenuOpen={setMobileMenuOpen}
/>
```

---

### 2. DesktopHeader (DesktopHeader.tsx)
**Desktop-specific header layout (visible on md+ screens)**

**Props:**
```tsx
type DesktopHeaderProps = {
  darkMode: boolean;
  toggleDarkMode: () => void;
};
```

**Features:**
- Logo with hover animations (scale + rotate)
- Floating leaf icon animation
- Gradient text effects
- Dark mode toggle button
- Link to homepage
- Interactive ripple effects

**Styling:**
- Height: 80px (h-20)
- Hidden on mobile (hidden md:flex)
- Hover effects on logo group
- Smooth transitions on all interactions

---

### 3. MobileHeader (MobileHeader.tsx)
**Mobile-specific header layout (visible on base to md screens)**

**Props:**
```tsx
type MobileHeaderProps = {
  darkMode: boolean;
  toggleDarkMode: () => void;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
};
```

**Features:**
- Compact logo design
- Dark mode toggle
- Menu burger button
- Link to homepage
- Touch-optimized buttons

**Styling:**
- Height: 64px (h-16)
- Visible only on mobile (md:hidden)
- Smaller icons (size 18-20)
- Interactive scale effects

---

### 4. MobileDrawer (MobileDrawer.tsx)
**Slide-out navigation drawer for mobile devices**

**Props:**
```tsx
type MobileDrawerProps = {
  mobileMenuOpen: boolean;
  setMobileMenuOpen: (open: boolean) => void;
  categories: string[];
};
```

**Features:**
- Slides in from the right
- Displays category navigation
- Staggered fade-in animations
- Interactive hover effects
- Smooth close transition

**Styling:**
- Size: sm (small drawer)
- Position: right
- Animated category items
- Hidden on desktop (md:hidden)

---

## Features

### Animations
All header components include smooth animations:

1. **Scroll Animations:**
   - Shadow appears on scroll
   - Background opacity changes
   - Border intensity adjusts

2. **Hover Effects:**
   - Logo scale and rotation
   - Icon transformations
   - Category item translations
   - Ripple effects on buttons

3. **Entrance Animations:**
   - Fade-in on mount
   - Staggered category reveals
   - Smooth drawer slide-in

### Dark Mode Support
All components fully support dark mode with:
- Dynamic color schemes
- Gradient adjustments
- Icon color changes
- Border and shadow variations

### Responsive Design
- **Desktop (md+):** Full header with larger logo and spacing
- **Mobile (base-md):** Compact header with drawer navigation
- Smooth transitions between breakpoints

---

## Customization

### Changing Colors
Update the Tailwind classes in each component:

```tsx
// From emerald to blue
className="text-emerald-600" → className="text-blue-600"
className="bg-emerald-100" → className="bg-blue-100"
```

### Modifying Logo
Edit `DesktopHeader.tsx` and `MobileHeader.tsx`:

```tsx
<Text className="text-2xl font-bold">
  Your Brand Name
</Text>
```

### Adding Navigation Items
For desktop navigation, update `DesktopHeader.tsx`:

```tsx
<Flex align="center" gap="md">
  <Button variant="subtle">About</Button>
  <Button variant="subtle">Articles</Button>
  <Button variant="subtle">Contact</Button>
  {/* Dark mode toggle */}
</Flex>
```

For mobile, update the `categories` prop in your parent component and pass to `MobileDrawer`.

### Adjusting Header Height
In `Header` component (index.tsx), modify:
- Desktop: `h-20` (80px)
- Mobile: `h-16` (64px)

---

## Integration Guide

### Step 1: Import Components
```tsx
import Header from '@/components/Header';
import MobileDrawer from '@/components/Header/MobileDrawer';
```

### Step 2: Set Up State
```tsx
const [darkMode, setDarkMode] = useState(false);
const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

const toggleDarkMode = () => setDarkMode(!darkMode);
```

### Step 3: Define Categories (if using drawer)
```tsx
const categories = [
  "Sustainable Agriculture",
  "Organic Farming",
  "Agroecology",
  "Soil Health",
  "Water Management",
];
```

### Step 4: Render Components
```tsx
<Box>
  <Header
    darkMode={darkMode}
    toggleDarkMode={toggleDarkMode}
    mobileMenuOpen={mobileMenuOpen}
    setMobileMenuOpen={setMobileMenuOpen}
  />

  <MobileDrawer
    mobileMenuOpen={mobileMenuOpen}
    setMobileMenuOpen={setMobileMenuOpen}
    categories={categories}
  />

  {/* Your page content */}
</Box>
```

---

## Styling Classes Used

### Custom Classes (from globals.css)
- `animate-float` - Continuous floating animation
- `gradient-text` - Animated gradient text
- `interactive-scale` - Scale on hover with bounce
- `ripple-effect` - Click ripple animation
- `animate-fadeInRight` - Fade in from right
- `backdrop-blur-xl` - Strong backdrop blur

### Tailwind Classes
- Responsive: `hidden md:flex`, `md:hidden`
- Transitions: `transition-all duration-300`
- Colors: `text-emerald-600`, `bg-gray-900`
- Spacing: `gap-md`, `px-4`, `py-2`
- Effects: `hover:scale-110`, `hover:rotate-12`

---

## Performance Considerations

1. **Scroll Listener:**
   - Single scroll event listener in main Header
   - Properly cleaned up on unmount
   - Debounced via React state

2. **Animations:**
   - GPU-accelerated transforms
   - CSS transitions for smooth performance
   - No layout thrashing

3. **Component Splitting:**
   - Desktop/Mobile components load conditionally via CSS
   - Reduced bundle size
   - Better code splitting

---

## Accessibility

All header components include:
- Semantic HTML structure
- Keyboard navigation support
- ARIA labels where needed
- Focus states on interactive elements
- High contrast in dark mode
- Touch-friendly target sizes (mobile)

---

## Testing

### Manual Testing Checklist
- [ ] Logo links to homepage
- [ ] Dark mode toggle works
- [ ] Mobile menu opens/closes
- [ ] Scroll changes header appearance
- [ ] All animations are smooth
- [ ] Responsive at all breakpoints
- [ ] Touch interactions work on mobile
- [ ] Keyboard navigation functions
- [ ] Dark mode styling correct

---

## Future Enhancements

Potential improvements:
1. Add search functionality
2. Include user account menu
3. Add notification bell
4. Implement breadcrumbs
5. Add language switcher
6. Include progress bar for reading articles
7. Add keyboard shortcuts
8. Implement sticky sub-navigation

---

## Troubleshooting

### Header not showing
- Check z-index (should be z-50)
- Verify component is imported correctly
- Ensure parent has proper structure

### Scroll effect not working
- Check if scroll listener is attached
- Verify window object is available (client-side)
- Ensure state is updating properly

### Mobile menu not opening
- Check `mobileMenuOpen` state
- Verify `setMobileMenuOpen` is passed correctly
- Ensure MobileDrawer is rendered

### Dark mode not working
- Verify `darkMode` state is properly managed
- Check if `dark` class is added to document
- Ensure dark mode Tailwind classes are correct

---

## Support

For issues or questions:
1. Check this documentation
2. Review component source code
3. Test in isolation
4. Check browser console for errors
5. Verify all dependencies are installed

---

## Version History

- **v1.0** - Initial modular header structure
- Separate Desktop/Mobile components
- MobileDrawer extracted
- Improved animations
- Enhanced dark mode support
