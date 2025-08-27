import {
  defineRecipe,
  defineSlotRecipe,
  SystemStyleObject,
} from "@pandacss/dev";
import { css } from "vinxi/dist/types/lib/plugins/css";

// TODO Refactor into tokens
const BottomDashHeight = "4rem";
const SidebarWidth = "20rem"; // 20rem 320px - wider for desktop sidebar
export const SidebarWidthPx = 320;
const sidebarWidthVar = "--sidebar-width";
const sidebarWidthVarWrapped = `var(${sidebarWidthVar}, 20rem)`;
const ResizeHandleWidth = "8px"; // Standard resize handle width
const ScrollbarWidth = "8px"; // Standard scrollbar width
const NavbarHeight = "4rem";
const SidebarPadding = "6";

const zIndices = {
  resizeHandle: 20,
};
const sidebarZIndex = {
  base: "50", // Mobile: over content
  md: "10", // Desktop: below overlays but above content
  navbar: "60",
};

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

const navbarStyle: SystemStyleObject = {
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  width: "full",
  height: {
    base: "navbar.height",
  },
  paddingX: "navbar.x",
  paddingY: "navbar.y",
  backgroundColor: "base.200",
  transition: transitions.strings.layoutTransform,
  _navbarToggle: {
    transform: "translateY(-100%)",
  },
  // Style the internal content
  gap: "4",
  // Add a shadow
  boxShadow: "lg",
  position: "relative",
  zIndex: sidebarZIndex.navbar,
};

// TODO move all the spacing stuff into a variants location
const mainContentStyle: SystemStyleObject = {
  position: "fixed",
  top: "navbar.height",
  left: "0",
  right: "0",
  bottom: {
    base: BottomDashHeight,
    sm: "0",
  },
  backgroundColor: "base.100",
  overflow: "auto",
  transition: transitions.strings.layoutAll,
  // Adjust for hidden navbar
  _navbarToggle: {
    top: "0",
  },
  // Adjust for hidden bottom dash - extends to full height on mobile
  _bottomDashToggle: {
    bottom: {
      base: "0",
      sm: "0",
    },
  },
  // On desktop: adjust for visible sidebar
  md: {
    _drawerToggle: {
      left: sidebarWidthVarWrapped,
    },
  },
  // Disable transitions when resizing
  "&[data-resizing=true]": {
    transition: "none",
  },
};

const BottomDashSty: SystemStyleObject = {
  display: "flex",
  position: "fixed",
  bottom: "0",
  left: "0",
  right: "0",
  height: BottomDashHeight,
  backgroundColor: "base.200",
  borderTop: "default",
  alignItems: "center",
  justifyContent: "center",
  zIndex: "30",
  gap: "6",
  transform: {
    base: "translateY(0)",
    sm: "translateY(100%)",
  },
  transition: transitions.strings.layoutTransform,
  "[data-peer=bottomdash]:checked ~ &": {
    transform: {
      base: "translateY(100%)",
      sm: "translateY(100%)",
    },
  },
};

/**
 * Shared base styles for drawer-related positioned elements
 */
export const drawerElementBase: SystemStyleObject = {
  position: "fixed",
  top: NavbarHeight,
  left: "0",
  bottom: {
    base: BottomDashHeight,
    sm: "0",
  },
  transition: transitions.strings.layoutAll,
  "[data-peer=navbar]:checked ~ &": {
    top: "0",
  },
  "[data-peer=bottomdash]:checked ~ &": {
    bottom: {
      base: "0",
      sm: "0",
    },
  },
} as const;

const SidebarSty: SystemStyleObject = {
  // Layout
  ...drawerElementBase,
  width: {
    base: SidebarWidth,
    md: sidebarWidthVarWrapped, // Use CSS variable on desktop
  },
  backgroundColor: "base.200",
  borderRight: "default",
  boxShadow: {
    base: "lg", // Mobile: shadow over content
    md: "none", // Desktop: no shadow when beside content
  },
  zIndex: sidebarZIndex,
  transform: "translateX(-100%)",
  "[data-peer=drawer]:checked ~ &": {
    transform: "translateX(0)",
  },
  // Conditional transitions
  "&[data-resizing=true]": {
    transition: "transform 0.3s ease, top 0.3s ease, bottom 0.3s ease", // Keep transform, top and bottom, remove width during resize
  },
  "&:not([data-resizing=true])": {
    transition:
      "transform 0.3s ease, width 0.2s ease, top 0.3s ease, bottom 0.3s ease", // All transitions when not resizing
  },
  // Adjust for the Handle
  mr: {
    base: "0", // Full width on mobile
    md: ResizeHandleWidth, // Leave space for resize handle on desktop
  },
};

const sidebarContentSty: SystemStyleObject = {
  // Content within the sidebar
  padding: SidebarPadding,
  height: "full",
  overflow: "auto",
};

const OverlaySty: SystemStyleObject = {
  ...drawerElementBase,
  right: "0",
  backgroundColor: "black/50",
  zIndex: "40",
  opacity: "0",
  visibility: "hidden",
  cursor: "pointer",
  display: {
    base: "block", // Mobile: show overlay
    md: "none", // Desktop: no overlay needed
  },
  "[data-peer=drawer]:checked ~ &": {
    opacity: "1",
    visibility: "visible",
  },
};

const SidebarHeaderSty: SystemStyleObject = {
  fontSize: "xl",
  fontWeight: "bold",
  color: "base.content",
  marginBottom: "6",
  paddingBottom: "4",
  borderBottom: "default",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};

const HamburgerIconSty: SystemStyleObject = {
  width: "6",
  height: "6",
  display: "flex",
  flexDirection: "column",
  justifyContent: "space-around",
  "& span": {
    width: "full",
    height: "0.5",
    backgroundColor: "base.content",
    borderRadius: "sm",
    transition: transitions.strings.layoutAll,
  },
  "[data-peer=drawer]:checked ~ * &": {
    "& span:nth-child(1)": {
      transform: "rotate(45deg) translate(5px, 5px)",
    },
    "& span:nth-child(2)": {
      opacity: "0",
    },
    "& span:nth-child(3)": {
      transform: "rotate(-45deg) translate(7px, -6px)",
    },
  },
};

const resizeHandleSty: SystemStyleObject = {
  position: "absolute",
  top: "0",
  right: "0", // Default position
  width: ResizeHandleWidth,
  height: "full",
  cursor: "col-resize",
  backgroundColor: "transparent",
  display: {
    base: "none", // Hidden on mobile
    md: "block", // Only show on desktop
  },
  transition: `background-color ${transitions.interactive.duration} ${transitions.interactive.easing}, right ${transitions.layout.duration} ${transitions.layout.easing}`,
  zIndex: zIndices.resizeHandle, // Above content
  // Position based on drawer state
  "[data-peer=drawer]:checked ~ * &": {
    right: "-8px", // Move to edge when drawer is open
  },
  _hover: {
    backgroundColor: "base.200",
    "&::before": {
      opacity: "1",
      backgroundColor: "primary",
      animation: "pulse 1s infinite",
      transform: "translate(-50%, -50%) scale(3)",
    },
  },
  _active: {
    backgroundColor: "base.300",
  },
  // Resize Pill
  "&::before": {
    content: '""',
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    borderRadius: "full",
    opacity: "0.3",
    transition: "opacity 0.2s ease, transform 0.3s ease-in-out",
    pointerEvents: "none",
    backgroundColor: "base.content",
    width: "0.5",
    height: "8",
  },
};

export const layout = defineSlotRecipe({
  className: "layout",
  description: "Responsive Sidebar Layout",
  slots: [
    "navbar",
    "mainContent",
    "bottomDash",
    "sidebarContent",
    "sidebar",
    "overlay",
    "sidebarHeader",
    "hamburgerIcon",
    "resizeHandle",
  ],
  base: {
    navbar: navbarStyle,
    mainContent: mainContentStyle,
    bottomDash: BottomDashSty,
    sidebar: SidebarSty,
    sidebarContent: sidebarContentSty,
    overlay: OverlaySty,
    sidebarHeader: SidebarHeaderSty,
    hamburgerIcon: HamburgerIconSty,
    resizeHandle: resizeHandleSty,
  },
});
