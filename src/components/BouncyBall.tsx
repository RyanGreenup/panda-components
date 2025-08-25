import { createSignal, JSXElement, Show } from "solid-js";
import { Transition } from "solid-transition-group";
import { css } from "../../styled-system/css";
import { circle } from "../../styled-system/patterns";

export default function Ball(): JSXElement {
  const [hidden, setHidden] = createSignal(true);
  const [size, setSize] = createSignal(50);
  const delta = 50;

  return (
    <FadeIn>
      <Show
        when={!hidden()}
        fallback={
          <button
            onclick={() => {
              setHidden(false);
            }}
            class={css({
              background: "primary",
              px: 4,
              py: 2,
              rounded: "md",
              color: "white",
            })}
          >
            {" "}
            Show Ball{" "}
          </button>
        }
      >
        <div
          class={circle({
            background: "primary",
            transition: "all 0.3s ease-in-out",
            overflow: "auto",
            animation: "bounce",
          })}
          style={{
            width: `${size()}px`,
            height: `${size()}px`,
          }}
          onclick={() => setSize(size() + 50)}
          onContextMenu={(e) => {
            e.preventDefault();
            setSize(Math.max(10, size() - 50));
          }}
        >
          <p>Click to Grow</p>
        </div>
      </Show>
    </FadeIn>
  );
}

function FadeIn(props: { children: JSXElement }) {
  return (
    <Transition
      onEnter={(el, done) => {
        const a = el.animate([{ opacity: 0 }, { opacity: 1 }], {
          duration: 600,
        });
        a.finished.then(done);
      }}
      onExit={(el, done) => {
        const a = el.animate([{ opacity: 0 }, { opacity: 0 }], {
          duration: 600,
        });
        a.finished.then(done);
      }}
    >
      {props.children}
    </Transition>
  );
}
