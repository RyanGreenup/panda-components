import { styled } from "../../../styled-system/jsx";
import { css } from "../../../styled-system/css";
import { createUniqueId } from "solid-js";
import { useKeybinding, createKeybinding } from "./hooks/useKeybinding";

const NavbarHeight = "4rem";
const BottomDashHeight = "4rem";
const DrawerWidth = "80";
/**
 * Consistent Animation to ensure everything moves in lockstep
 */
const translateTransition = {
  bottomDash: "transform 0.3s ease",
  drawer: "all 0.3s ease",
};
/**
 * Drawer Height on Small Displays. On Small Displays the dash is visible so it
 * must adjust
 */
const DrawerHeightSM = `calc(100dvh - ${NavbarHeight} - ${BottomDashHeight})`;

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
  transition: "all 0.3s ease",
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
    transition: "all 0.2s ease",
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

const DrawerButton = styled("label", {
  base: {
    display: "flex",
    alignItems: "center",
    cursor: "pointer",
    padding: "2",
    borderRadius: "md",
    transition: "all 0.2s ease",
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
      transition: "all 0.3s ease",
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
    ...drawerVisibilityStates,
    "[data-peer=drawer]:checked ~ &": {
      opacity: "1",
      visibility: "visible",
    },
  },
});

const Drawer = styled("div", {
  base: {
    ...drawerElementBase,
    width: DrawerWidth,
    backgroundColor: "base.100",
    borderRight: "default",
    boxShadow: "lg",
    zIndex: "50",
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
    transition: translateTransition.bottomDash,
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
    transition: "all 0.2s ease",
    _hover: {
      color: "primary",
      backgroundColor: "base.300",
    },
  },
});

const DrawerContent = styled("div", {
  base: {
    padding: "6",
    height: "full",
    overflow: "auto",
  },
});

const DrawerHeader = styled("div", {
  base: {
    fontSize: "xl",
    fontWeight: "bold",
    color: "base.content",
    marginBottom: "6",
    paddingBottom: "4",
    borderBottom: "default",
  },
});

const DrawerNav = styled("nav", {
  base: {
    display: "flex",
    flexDirection: "column",
    gap: "2",
  },
});

const DrawerNavLink = styled("a", {
  base: {
    color: "base.content",
    textDecoration: "none",
    fontSize: "md",
    fontWeight: "medium",
    padding: "3",
    borderRadius: "md",
    transition: "all 0.2s ease",
    _hover: {
      backgroundColor: "base.200",
      color: "primary",
    },
  },
});

export default function Layout() {
  const drawerId = createUniqueId();

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

  // Global keybindings
  useKeybinding(createKeybinding("b", { ctrlKey: true }), toggleDrawer);
  useKeybinding(createKeybinding("Escape"), closeDrawer);

  return (
    <div>
      <DrawerToggle type="checkbox" id={drawerId} data-peer="drawer" />
      <Navbar>
        <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
          <DrawerButton for={drawerId}>
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

      <Overlay onClick={closeDrawer} />
      <Drawer>
        <DrawerContent>
          <DrawerHeader>Menu</DrawerHeader>
          <DrawerNav>
            <DrawerNavLink href="/">Home</DrawerNavLink>
            <DrawerNavLink href="/docs">Documentation</DrawerNavLink>
            <DrawerNavLink href="/components">Components</DrawerNavLink>
            <DrawerNavLink href="/examples">Examples</DrawerNavLink>
            <DrawerNavLink href="/about">About</DrawerNavLink>
          </DrawerNav>
        </DrawerContent>
      </Drawer>

      <BottomDash>
        <BottomNavLink href="/">Home</BottomNavLink>
        <BottomNavLink href="/docs">Docs</BottomNavLink>
        <BottomNavLink href="/components">Components</BottomNavLink>
        <BottomNavLink href="/examples">Examples</BottomNavLink>
      </BottomDash>
    </div>
  );
}
