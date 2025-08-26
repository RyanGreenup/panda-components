import { For, createEffect, onMount } from "solid-js";
import { styled } from "../../../styled-system/jsx";
import { center } from "../../../styled-system/patterns";
import { createKeybinding, useKeybinding } from "./hooks/useKeybinding";
import { useResizeHandle } from "./hooks/useResizeHandle";

const NavbarHeight = "4rem";
const BottomDashHeight = "4rem";
const SidebarWidth = "20rem"; // 20rem 320px - wider for desktop sidebar
export const SidebarWidthPx = 320;
const sidebarWidthVar = "--sidebar-width";
const sidebarWidthVarWrapped = `var(${sidebarWidthVar}, 20rem)`;
const ResizeHandleWidth = "8px"; // Standard resize handle width
const ScrollbarWidth = "8px"; // Standard scrollbar width

// Toggle IDs - centralized to prevent typos and ensure consistency
const ToggleIds = {
  drawer: "drawer-toggle",
  navbar: "navbar-toggle", 
  bottomDash: "bottomdash-toggle",
} as const;
const zIndices = {
  resizeHandle: 20,
};
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

/**
 * Shared base styles for drawer-related positioned elements
 */
const drawerElementBase = {
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

/**
 * Shared styles for drawer visibility states
 */
const drawerVisibilityStates = {
  "[data-peer=drawer]:checked ~ &": {},
} as const;

const Navbar = styled("nav", {
  base: {
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
    "[data-peer=navbar]:checked ~ &": {
      transform: "translateY(-100%)",
    },
  },
});

const NavBrand = styled("div", {
  base: {
    fontSize: "lg",
    fontWeight: "bold",
    color: "base.content",
  },
});

const NavLinks = styled("div", {
  base: {
    display: "flex",
    alignItems: "center",
    gap: "6",
  },
});

const NavLink = styled("a", {
  base: {
    color: "base.content",
    textDecoration: "none",
    fontSize: "md",
    fontWeight: "medium",
    transition: transitions.strings.interactiveAll,
    _hover: {
      color: "primary",
    },
  },
});

const DrawerToggle = styled("input", {
  base: {
    display: "none",
  },
});

const NavbarToggle = styled("input", {
  base: {
    display: "none",
  },
});

const BottomDashToggle = styled("input", {
  base: {
    display: "none",
  },
});

const DrawerButton = styled("label", {
  base: {
    display: "flex",
    alignItems: "center",
    cursor: "pointer",
    padding: "2",
    borderRadius: "md",
    transition: transitions.strings.interactiveAll,
    _hover: {
      backgroundColor: "base.300",
    },
  },
});

const HamburgerIcon = styled("div", {
  base: {
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
  },
});

const Overlay = styled("label", {
  base: {
    ...drawerElementBase,
    right: "0",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    zIndex: "40",
    opacity: "0",
    visibility: "hidden",
    cursor: "pointer",
    display: {
      base: "block", // Mobile: show overlay
      md: "none", // Desktop: no overlay needed
    },
    ...drawerVisibilityStates,
    "[data-peer=drawer]:checked ~ &": {
      opacity: "1",
      visibility: "visible",
    },
  },
});

const Sidebar = styled("div", {
  base: {
    ...drawerElementBase,
    position: "fixed", // Keep fixed positioning
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
    zIndex: {
      base: "50", // Mobile: over content
      md: "10", // Desktop: below overlays but above content
    },
    transform: "translateX(-100%)",
    ...drawerVisibilityStates,
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
  },
});

const BottomDash = styled("div", {
  base: {
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
  },
});

const BottomNavLink = styled("a", {
  base: {
    color: "base.content",
    textDecoration: "none",
    fontSize: "sm",
    fontWeight: "medium",
    padding: "2",
    borderRadius: "md",
    transition: transitions.strings.interactiveAll,
    _hover: {
      color: "primary",
      backgroundColor: "base.300",
    },
  },
});

const BottomDrawerButton = styled("label", {
  base: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "base.content",
    fontSize: "sm",
    fontWeight: "medium",
    padding: "2",
    borderRadius: "md",
    cursor: "pointer",
    transition: transitions.strings.interactiveAll,
    _hover: {
      color: "primary",
      backgroundColor: "base.300",
    },
  },
});

const BottomNavButton = styled("label", {
  base: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "base.content",
    fontSize: "sm",
    fontWeight: "medium",
    padding: "2",
    borderRadius: "md",
    cursor: "pointer",
    transition: transitions.strings.interactiveAll,
    _hover: {
      color: "primary",
      backgroundColor: "base.300",
    },
  },
});

const SidebarContent = styled("div", {
  base: {
    padding: "6",
    mr: {
      base: "0", // Full width on mobile
      md: ResizeHandleWidth, // Leave space for resize handle on desktop
    },
    height: "full",
    overflow: "auto",
  },
});

const MainContent = styled("div", {
  base: {
    position: "fixed",
    top: NavbarHeight,
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
    "[data-peer=navbar]:checked ~ &": {
      top: "0",
    },
    // Adjust for hidden bottom dash - extends to full height on mobile
    "[data-peer=bottomdash]:checked ~ &": {
      bottom: {
        base: "0",
        sm: "0",
      },
    },
    // On desktop: adjust for visible sidebar
    md: {
      "[data-peer=drawer]:checked ~ &": {
        left: sidebarWidthVarWrapped,
      },
    },
    // Disable transitions when resizing
    "&[data-resizing=true]": {
      transition: "none",
    },
  },
});

const SidebarHeader = styled("div", {
  base: {
    fontSize: "xl",
    fontWeight: "bold",
    color: "base.content",
    marginBottom: "6",
    paddingBottom: "4",
    borderBottom: "default",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
});

const CloseButton = styled("label", {
  base: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "8",
    height: "8",
    cursor: "pointer",
    borderRadius: "md",
    transition: transitions.strings.interactiveAll,
    _hover: {
      backgroundColor: "base.300",
    },
    "& span": {
      fontSize: "lg",
      color: "base.content",
    },
  },
});

const SidebarNav = styled("nav", {
  base: {
    display: "flex",
    flexDirection: "column",
    gap: "2",
  },
});

const SidebarNavLink = styled("a", {
  base: {
    color: "base.content",
    textDecoration: "none",
    fontSize: "md",
    fontWeight: "medium",
    padding: "3",
    borderRadius: "md",
    transition: transitions.strings.interactiveAll,
    _hover: {
      backgroundColor: "base.200",
      color: "primary",
    },
  },
});

const SidebarNavButton = styled("label", {
  base: {
    display: "flex",
    alignItems: "center",
    color: "base.content",
    fontSize: "md",
    fontWeight: "medium",
    padding: "3",
    borderRadius: "md",
    cursor: "pointer",
    transition: transitions.strings.interactiveAll,
    _hover: {
      backgroundColor: "base.200",
      color: "primary",
    },
  },
});

const DrawerToggleButton = (props: { drawerId: string }) => (
  <BottomDrawerButton for={props.drawerId}>
    <HamburgerIcon>
      <span></span>
      <span></span>
      <span></span>
    </HamburgerIcon>
  </BottomDrawerButton>
);

const ResizeHandle = styled("div", {
  base: {
    position: "absolute",
    top: "0",
    right: "0",
    width: ResizeHandleWidth,
    height: "full",
    cursor: "col-resize",
    backgroundColor: "transparent",
    display: {
      base: "none", // Hidden on mobile
      md: "block", // Only show on desktop
    },
    transition: "background-color 0.2s ease",
    zIndex: zIndices.resizeHandle, // Above content
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
      width: "0.2rem",
      height: "2rem",
    },
  },
});

interface LayoutProps {
  children?: any;
}

const DummySidebarContent = () => (
  <For each={Array.from({ length: 50 }, (_, i) => i)}>
    {(item) => (
      <SidebarNavLink href={`/item-${item}`}>
        Navigation Item {item + 1}
      </SidebarNavLink>
    )}
  </For>
);

export default function Layout(props: LayoutProps) {
  // These refs are safe to use with definite assignment assertion (!) because:
  // 1. The JSX elements with matching refs are rendered (sync) below
  // 2. SolidJS assigns refs during element creation
  // 3. Usage of these refs can only occur after they are rendered
  let drawerRef!: HTMLInputElement;
  let navbarRef!: HTMLInputElement;
  let bottomDashRef!: HTMLInputElement;
  let sidebarRef!: HTMLDivElement;
  let mainContentRef!: HTMLDivElement;
  const SidebarDelta = 100;

  const toggleDrawer = () => {
    drawerRef.checked = !drawerRef.checked;
  };

  const closeDrawer = () => {
    drawerRef.checked = false;
  };

  const toggleNavbar = () => {
    navbarRef.checked = !navbarRef.checked;
  };

  const toggleBottomDash = () => {
    bottomDashRef.checked = !bottomDashRef.checked;
  };


  // Resize handle functionality
  const { width, isResizing, handleMouseDown, setWidth } = useResizeHandle({
    initialWidth: SidebarWidthPx,
    minWidth: 200,
    maxWidth: 600,
  });

  // Keyboard resize functions
  const increaseSidebarWidth = () => {
    const currentWidth = width();
    const newWidth = Math.min(600, currentWidth + SidebarDelta); // Increase by 20px, max 600px
    setWidth(newWidth);
  };

  const decreaseSidebarWidth = () => {
    const currentWidth = width();
    const newWidth = Math.max(200, currentWidth - SidebarDelta); // Decrease by 20px, min 200px
    setWidth(newWidth);
  };

  const resetSidebarWidth = () => {
    setWidth(SidebarWidthPx); // Reset to default width
  };

  // Update CSS variable when width changes
  onMount(() => {
    createEffect(() => {
      const widthValue = `${width()}px`;
      document.documentElement.style.setProperty(sidebarWidthVar, widthValue);

      // Toggle data attribute on sidebar and main content to control transitions
      const resizingValue = isResizing().toString();
      if (sidebarRef) {
        sidebarRef.setAttribute("data-resizing", resizingValue);
      }
      if (mainContentRef) {
        mainContentRef.setAttribute("data-resizing", resizingValue);
      }
    });
  });

  // Global keybindings
  useKeybinding(createKeybinding("b", { ctrlKey: true }), toggleDrawer);
  useKeybinding(createKeybinding("Escape"), closeDrawer);
  useKeybinding(createKeybinding("m", { ctrlKey: true }), toggleNavbar);
  useKeybinding(createKeybinding("d", { altKey: true }), toggleBottomDash);

  // Sidebar resize keybindings
  useKeybinding(createKeybinding("]", { ctrlKey: true }), increaseSidebarWidth);
  useKeybinding(createKeybinding("[", { ctrlKey: true }), decreaseSidebarWidth);
  useKeybinding(
    createKeybinding("0", { ctrlKey: true, shiftKey: true }),
    resetSidebarWidth,
  );

  return (
    <div>
      <NavbarToggle type="checkbox" ref={navbarRef} data-peer="navbar" id={ToggleIds.navbar} />
      <BottomDashToggle
        type="checkbox"
        ref={bottomDashRef}
        data-peer="bottomdash"
        id={ToggleIds.bottomDash}
      />
      <DrawerToggle type="checkbox" ref={drawerRef} data-peer="drawer" id={ToggleIds.drawer} />
      <Navbar>
        <div class={center({ gap: "1rem" })}>
          <DrawerButton for={ToggleIds.drawer}>
            <HamburgerIcon>
              <span></span>
              <span></span>
              <span></span>
            </HamburgerIcon>
          </DrawerButton>
          <NavBrand>Panda Components</NavBrand>
        </div>
        <NavLinks>
          <NavLink href="/">Home</NavLink>
          <NavLink href="/docs">Docs</NavLink>
          <NavLink href="/components">Components</NavLink>
        </NavLinks>
      </Navbar>

      <Overlay for={ToggleIds.drawer} />
      <Sidebar ref={sidebarRef}>
        <SidebarContent>
          <SidebarHeader>
            Menu
            <CloseButton for={ToggleIds.drawer}>
              <span>✕</span>
            </CloseButton>
          </SidebarHeader>
          <SidebarNav>
            <SidebarNavLink href="/">Home</SidebarNavLink>
            <SidebarNavLink href="/docs">Documentation</SidebarNavLink>
            <SidebarNavLink href="/components">Components</SidebarNavLink>
            <SidebarNavLink href="/examples">Examples</SidebarNavLink>
            <SidebarNavLink href="/about">About</SidebarNavLink>
            <SidebarNavButton for={ToggleIds.navbar}>
              Toggle Navbar
            </SidebarNavButton>
            <SidebarNavButton for={ToggleIds.bottomDash}>
              Toggle Bottom Dash
            </SidebarNavButton>
            <DummySidebarContent />
          </SidebarNav>
        </SidebarContent>
        <ResizeHandle onMouseDown={handleMouseDown} onTouchStart={handleMouseDown} />
      </Sidebar>

      <MainContent ref={mainContentRef}>{props.children}</MainContent>

      <BottomDash>
        <BottomNavLink href="/">Home</BottomNavLink>
        <BottomNavLink href="/docs">Docs</BottomNavLink>
        <BottomNavLink href="/components">Components</BottomNavLink>
        <BottomNavLink href="/examples">Examples</BottomNavLink>
        <BottomNavButton for={ToggleIds.navbar}>Nav</BottomNavButton>
        <BottomDrawerButton for={ToggleIds.drawer}>
          <HamburgerIcon>
            <span></span>
            <span></span>
            <span></span>
          </HamburgerIcon>
        </BottomDrawerButton>
      </BottomDash>
    </div>
  );
}
