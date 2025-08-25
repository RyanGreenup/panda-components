import  ArrowLeft  from "lucide-solid/icons/arrow-left";
import { HStack, styled } from "../../../styled-system/jsx";
import { circle } from "../../../styled-system/patterns";
import { Callout } from "../Callout";

const Container = styled("div", {
  base: {
    display: "flex",
    flexDirection: "column",
    gap: "4",
  },
});

export function CalloutExample() {
  return (
    <Container>
      <Callout type="note">
        This is a note callout. Use it for supplementary information that users
        might find helpful.
      </Callout>

      <Callout type="tip">
        This is a tip callout. Great for best practices and recommendations that
        can improve the user's experience.
      </Callout>

      <Callout type="important">
        This is an important callout. Use it to highlight critical information
        that users should pay attention to.
      </Callout>

      <Callout type="warning">
        This is a warning callout. Use it to alert users about potential issues
        or things they should be careful about.
      </Callout>

      <Callout type="caution">
        This is a caution callout. Use it for serious warnings about actions
        that might have negative consequences.
      </Callout>

      <Callout type="note" title="Custom Title">
        You can override the default title by passing a custom title prop.
      </Callout>

      <Callout type="tip" title="">
        Pass an empty string as title to hide the title completely while keeping
        the icon.
      </Callout>

      <Callout type="important">
        <p>Callouts support rich content including:</p>

        <HStack>
          <BouncyBall />
          <ul style={{ "margin-left": "1.5rem", "list-style": "disc" }}>
            <li>Multiple paragraphs</li>
            <li>Lists like this one</li>
            <li>
              Inline <code>code snippets</code>
            </li>
            <li>And any other JSX content like the ball <ArrowLeft/></li>
          </ul>
        </HStack>
      </Callout>
    </Container>
  );
}

const BouncyBall = () => (
  <div
    class={circle({
      bg: "primary",
      color: "content.primary",
      width: 5,
      height: 5,
      animation: "bounce",
    })}
  ></div>
);
