import { RouteSectionProps } from "@solidjs/router";
import { createSignal } from "solid-js";
import { article } from "../../styled-system/recipes";

export default function ArticlesLayout(props: RouteSectionProps) {
  return <div class={article()}>{props.children}</div>;
}

