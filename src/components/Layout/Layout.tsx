import { css } from "../../../styled-system/css";
import { Center } from "../../../styled-system/jsx";
import { circle } from "../../../styled-system/patterns";

export default function Layout() {
  return (
    <Center class={css({ m: "5000rem" })}>
      <div
        class={circle({
          bg: "primary",
          color: "content.primary",
          animation: "bounce",
          width: "5",
          height: "5",
        })}
      ></div>
    </Center>
  );
}
