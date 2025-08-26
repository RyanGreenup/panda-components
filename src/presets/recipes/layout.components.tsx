/**
 * Layout components using styled() for SSR compatibility
 * Direct approach that works better with SolidStart
 */

import { cx } from "../../../styled-system/css";
import { layout } from "../../../styled-system/recipes/layout";
import { JSX } from "solid-js";

const layoutClasses = layout();

// Create styled components that apply recipe classes directly
export const Navbar = (props: JSX.IntrinsicElements["nav"]) => {
  const { class: className, ...restProps } = props;
  return <nav {...restProps} class={cx(layout().navbar, className)} />;
};

// Create styled components that apply recipe classes directly
export const MainContent = (props: JSX.IntrinsicElements["div"]) => {
  const { class: className, ...restProps } = props;
  return <div {...restProps} class={cx(layout().mainContent, className)} />;
};

// TODO run the layout() once
export const BottomDash = (props: JSX.IntrinsicElements["div"]) => {
  const { class: className, ...restProps } = props;
  return <div {...restProps} class={cx(layout().bottomDash, className)} />;
};

export const Sidebar = (props: JSX.IntrinsicElements["div"]) => {
  const { class: className, ...restProps } = props;
  return <div {...restProps} class={cx(layout().sidebar, className)} />;
};

export const Overlay = (props: JSX.IntrinsicElements["label"]) => {
  const { class: cls, ...restProps } = props;
  return <label {...restProps} class={cx(layout().overlay, cls)} />;
};

export const SidebarHeader = (props: JSX.IntrinsicElements["div"]) => {
  const { class: cls, ...restProps } = props;
  return <div {...restProps} class={cx(layout().sidebarHeader, cls)} />;
};

// TODO should I just export this with
// <HamburgerIcon>
//   <span></span>
//   <span></span>
//   <span></span>
// </HamburgerIcon>
export const HamburgerIcon = (props: JSX.IntrinsicElements["div"]) => {
  const { class: cls, ...restProps } = props;
  return <div {...restProps} class={cx(layout().hamburgerIcon, cls)} />;
};

// Export as a namespace for cleaner imports
export const LayoutComponents = {
  Navbar,
  MainContent,
  BottomDash,
  Sidebar,
  Overlay,
  HamburgerIcon,
};
