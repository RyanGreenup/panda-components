import { Accessor, createSignal } from "solid-js";
import { css } from "../../../styled-system/css";
import { box, circle, vstack } from "../../../styled-system/patterns";
import { HStack } from "../../../styled-system/jsx";

export default function Counter() {
  const [count, setCount] = createSignal(2);

  return (
    <div
      class={box({
        background: "base.200",
        rounded: "md",
        borderWidth: "medium",
        borderColor: "base.300",
        border: "{border.default}",
        width: "md",
        p: 4,
        m: 4,
      })}
    >
      <HStack>
        <BouncyBall size={count} />
        <div class={vstack()}>
          <div>
            <h2 class={css({ m: 0 })}> I am a Counter</h2>
            <p>The current count is {count()}</p>
          </div>
          <button
            class={css({
              background: "primary",
              px: 4,
              py: 2,
              rounded: "lg",
              color: "content.primary",
            })}
            onClick={() => setCount(count() + 1)}
          >
            Count: {count()}
          </button>
        </div>
      </HStack>
    </div>
  );
}

interface BallProps {
  size: Accessor<number>;
}
function BouncyBall(props: BallProps) {
  return (
    <div
      class={circle({
        background: "primary",
        transition: "all 0.3s ease-in-out",
        overflow: "auto",
        animation: "bounce",
      })}
      style={{
        width: `${props.size()}rem`,
        height: `${props.size()}rem`,
      }}
      // onclick={() => setSize(size() + 50)}
      // onContextMenu={(e) => {
      //   e.preventDefault();
      //   setSize(Math.max(10, size() - 50));
      // }}
    ></div>
  );
}
