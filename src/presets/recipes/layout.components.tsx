/**
 * Layout components using styled() for SSR compatibility
 * Direct approach that works better with SolidStart
 */

import { cx } from "../../../styled-system/css";
import { layout } from "../../../styled-system/recipes/layout";
import { JSX } from "solid-js";

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

// Export as a namespace for cleaner imports
export const LayoutComponents = {
  Navbar,
  MainContent,
};
