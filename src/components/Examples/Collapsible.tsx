import { styled } from "../../../styled-system/jsx";
import { Collapsible } from "../Collapsible";

const Container = styled("div", {
  base: {
    display: "flex",
    flexDirection: "column",
    gap: "spacing.component.lg",
  },
});

const Code = styled("code", {
  base: {
    backgroundColor: "base.300",
    padding: "spacing.component.sm",
    borderRadius: "selector",
    fontSize: "sm",
    fontFamily: "monospace",
  },
});

export function CollapsibleExample() {
  return (
    <Container>
      <Collapsible title="Basic Example">
        <p>
          This is a basic collapsible component. Click the header to toggle
          visibility of this content.
        </p>
      </Collapsible>

      <Collapsible title="With Rich Content" defaultOpen>
        <div style={{ display: "flex", "flex-direction": "column", gap: "1rem" }}>
          <p>
            This collapsible contains multiple elements and starts expanded by
            default.
          </p>
          <ul style={{ "margin-left": "1.5rem", "list-style": "disc" }}>
            <li>First item in a list</li>
            <li>Second item with more text</li>
            <li>Third item</li>
          </ul>
          <p>
            It can contain any JSX content including <Code>code snippets</Code>,
            images, or other components.
          </p>
        </div>
      </Collapsible>

      <Collapsible title="FAQ: How does this work?">
        <p>
          This component uses Panda CSS's peer selector feature with a hidden
          checkbox. When the checkbox is checked (by clicking the label), the
          content becomes visible through CSS transitions.
        </p>
      </Collapsible>

      <Collapsible title="Configuration Options">
        <div style={{ display: "flex", "flex-direction": "column", gap: "0.75rem" }}>
          <p>Available props:</p>
          <ul style={{ "margin-left": "1.5rem", "list-style": "disc" }}>
            <li>
              <Code>title</Code> - The header text (required)
            </li>
            <li>
              <Code>defaultOpen</Code> - Whether to start expanded (optional)
            </li>
            <li>
              <Code>children</Code> - The collapsible content (required)
            </li>
          </ul>
        </div>
      </Collapsible>
    </Container>
  );
}