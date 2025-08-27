/**
 * Layout components using styled() for SSR compatibility
 * Direct approach that works better with SolidStart
 */

import { children, JSX, splitProps } from "solid-js";
import { cx, sva } from "../../../styled-system/css";
import { layout } from "../../../styled-system/recipes/layout";

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
  const [local, others] = splitProps(props, ["class", "children"]);
  const safeChildren = children(() => local.children);
  // TODO Review this, do we want to have a fixed inner style?
  // we need it though to pad for the handle
  // return (
  //   <div {...others} class={cx(layout().sidebar, local.class)}>
  //     <div class={layout().sidebarContent}>{safeChildren()}</div>
  //   </div>
  // );

  return (
    <div {...others} class={cx(layout().sidebar, local.class)}>
      {safeChildren()}
    </div>
  );
};

export const SidebarContent = (props: JSX.IntrinsicElements["div"]) => {
  const [local, others] = splitProps(props, ["class", "children"]);
  const safeChildren = children(() => local.children);
  return (
    <div {...others} class={cx(layout().sidebarContent, local.class)}>
      {safeChildren()}
    </div>
  );
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
  const [local, others] = splitProps(props, ["class", "children"]);
  const safeChildren = children(() => local.children);

  return (
    <div {...others} class={cx(layout().hamburgerIcon, local.class)}>
      <span></span>
      <span></span>
      <span></span>
      {safeChildren()}
    </div>
  );
};

export const ResizeHandle = (props: JSX.IntrinsicElements["div"]) => {
  const [local, others] = splitProps(props, ["class"]);
  return <div {...others} class={cx(layout().resizeHandle, local.class)} />;
};

// Export as a namespace for cleaner imports
export const LayoutComponents = {
  Navbar,
  MainContent,
  BottomDash,
  Sidebar,
  Overlay,
  HamburgerIcon,
  ResizeHandle,
};
