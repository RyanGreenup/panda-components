import { RouteSectionProps } from "@solidjs/router";
import { createSignal } from "solid-js";
import { article } from "../../styled-system/recipes";
import Layout from "~/components/Layout/Layout";

export default function MainLayout(props: RouteSectionProps) {
  const [getTheme, setTheme] = createSignal<string>();
  return <Layout>{props.children}</Layout>;
}
