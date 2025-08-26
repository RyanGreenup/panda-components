import { defineRecipe, defineSlotRecipe } from "@pandacss/dev";

// TODO Refactor into tokens
const NavbarHeight = "4rem";

// TODO Refactor into tokens

/**
 * Consistent Animation System - All transitions in one place for maintainability
 */
const transitions = {
  // Core layout animations - these should all be in sync
  layout: {
    duration: "0.3s",
    easing: "ease",
    full: "all 0.3s ease",
  },
  // Interactive element animations - faster for better responsiveness
  interactive: {
    duration: "0.2s",
    easing: "ease",
    full: "all 0.2s ease",
  },
  // Specific transition strings for convenience
  strings: {
    layoutTransform: "transform 0.3s ease",
    layoutAll: "all 0.3s ease",
    interactiveAll: "all 0.2s ease",
    // Combined transitions for complex elements
    drawerSlide: "transform 0.3s ease, all 0.3s ease",
    overlayFade: "all 0.3s ease",
  },
} as const;


export const layout = defineSlotRecipe({
  className: "layout",
  description: "Responsive Sidebar Layout",
  slots: ["navbar"],
  base: {
    navbar: {
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      width: "full",
      height: {
        base: NavbarHeight,
      },
      paddingX: "4",
      paddingY: "3",
      backgroundColor: "base.200",
      borderBottom: "default",
      boxShadow: "sm",
      transition: transitions.strings.layoutTransform,
      _navbarToggle: {
        transform: "translateY(-100%)",
      },
      // Style the internal content
      gap: "4",
    },
  },
  variants: {},
  defaultVariants: {},
});
