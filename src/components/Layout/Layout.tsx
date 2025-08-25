import { styled } from "../../../styled-system/jsx";
import { css } from "../../../styled-system/css";
import { createUniqueId } from "solid-js";
import { useKeybinding, createKeybinding } from "./hooks/useKeybinding";
import { center } from "../../../styled-system/patterns";

const NavbarHeight = "4rem";
const BottomDashHeight = "4rem";
const SidebarWidth = "20rem"; // 320px - wider for desktop sidebar
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
  }
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

const Overlay = styled("div", {
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
      lg: "none", // Desktop: no overlay needed
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
    width: SidebarWidth,
    backgroundColor: "base.200",
    borderRight: "default",
    boxShadow: {
      base: "lg", // Mobile: shadow over content
      lg: "none", // Desktop: no shadow when beside content
    },
    zIndex: {
      base: "50", // Mobile: over content
      lg: "10", // Desktop: below overlays but above content
    },
    transform: "translateX(-100%)",
    ...drawerVisibilityStates,
    "[data-peer=drawer]:checked ~ &": {
      transform: "translateX(0)",
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
    // On desktop: adjust for visible sidebar
    lg: {
      "[data-peer=drawer]:checked ~ &": {
        left: SidebarWidth,
      },
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

interface LayoutProps {
  children?: any;
}

export default function Layout(props: LayoutProps) {
  const drawerId = createUniqueId();
  const navbarId = createUniqueId();

  const toggleDrawer = () => {
    const drawerToggle = document.getElementById(drawerId) as HTMLInputElement;
    if (drawerToggle) {
      drawerToggle.checked = !drawerToggle.checked;
    }
  };

  const closeDrawer = () => {
    const drawerToggle = document.getElementById(drawerId) as HTMLInputElement;
    if (drawerToggle) {
      drawerToggle.checked = false;
    }
  };

  const toggleNavbar = () => {
    const navbarToggle = document.getElementById(navbarId) as HTMLInputElement;
    if (navbarToggle) {
      navbarToggle.checked = !navbarToggle.checked;
    }
  };

  // Global keybindings
  useKeybinding(createKeybinding("b", { ctrlKey: true }), toggleDrawer);
  useKeybinding(createKeybinding("Escape"), closeDrawer);
  useKeybinding(createKeybinding("m", { ctrlKey: true }), toggleNavbar);

  return (
    <div>
      <NavbarToggle type="checkbox" id={navbarId} data-peer="navbar" />
      <DrawerToggle type="checkbox" id={drawerId} data-peer="drawer" />
      <Navbar>
        <div class={center({ gap: "1rem" })}>
          <DrawerToggleButton drawerId={drawerId} />
          <NavBrand>Panda Components</NavBrand>
        </div>
        <NavLinks>
          <NavLink href="/">Home</NavLink>
          <NavLink href="/docs">Docs</NavLink>
          <NavLink href="/components">Components</NavLink>
        </NavLinks>
      </Navbar>

      <Overlay onClick={closeDrawer} />
      <Sidebar>
        <SidebarContent>
          <SidebarHeader>Menu</SidebarHeader>
          <SidebarNav>
            <SidebarNavLink href="/">Home</SidebarNavLink>
            <SidebarNavLink href="/docs">Documentation</SidebarNavLink>
            <SidebarNavLink href="/components">Components</SidebarNavLink>
            <SidebarNavLink href="/examples">Examples</SidebarNavLink>
            <SidebarNavLink href="/about">About</SidebarNavLink>
            <SidebarNavButton for={navbarId}>Toggle Navbar</SidebarNavButton>
          </SidebarNav>
        </SidebarContent>
      </Sidebar>

      <MainContent>{props.children}</MainContent>

      <BottomDash>
        <BottomNavLink href="/">Home</BottomNavLink>
        <BottomNavLink href="/docs">Docs</BottomNavLink>
        <BottomNavLink href="/components">Components</BottomNavLink>
        <BottomNavLink href="/examples">Examples</BottomNavLink>
        <BottomNavButton for={navbarId}>Nav</BottomNavButton>
        <DrawerToggleButton drawerId={drawerId} />
      </BottomDash>
    </div>
  );
}
