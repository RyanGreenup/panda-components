import { For, JSXElement } from "solid-js";
import Counter from "~/components/Examples/Counter";
import Layout from "~/components/Layout/Layout";
import { VStack } from "../../styled-system/jsx/vstack.mjs";
import { center } from "../../styled-system/patterns";

export default function Page() {
  return (
    <Layout>
      <For each={Array.from({ length: 50 }, (_, i) => i)}>
        {(index) => <Counter />}
      </For>
    </Layout>
  );
}

const ceterline = (props: { children: JSXElement }) => (
  <div class={center({ flex: "none" })}>
    <VStack>{props.children}</VStack>
  </div>
);
