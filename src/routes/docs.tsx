import { RouteSectionProps } from "@solidjs/router";
import { createSignal } from "solid-js";
import { article } from "../../styled-system/recipes";

export default function ArticlesLayout(props: RouteSectionProps) {
  const [getTheme, setTheme] = createSignal<string>();
  return (
    <div class={article()} data-theme={getTheme}>
      {props.children}
    </div>
  );
}
