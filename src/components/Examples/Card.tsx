import { styled } from "../../../styled-system/jsx";
import { Card } from "../Card";

const Button = styled("button", {
  base: {
    padding: "2 4",
    borderRadius: "selector",
    fontWeight: "medium",
    cursor: "pointer",
    transition: "all 0.2s ease",
    px: 4,
    py: 2,
    color: "content.primary",
  },
  variants: {
    variant: {
      primary: {
        backgroundColor: "primary",
        color: "content.primary",
        _hover: {
          opacity: 0.9,
        },
      },
      secondary: {
        backgroundColor: "secondary",
        color: "content.secondary",
        _hover: {
          opacity: 0.9,
        },
      },
    },
  },
  defaultVariants: {
    variant: "primary",
  },
});

export function CardExample() {
  return (
    <div style={{ display: "flex", gap: "1rem", "flex-wrap": "wrap" }}>
      <Card variant="default" style={{ width: "300px" }}>
        <Card.Header>
          <Card.Title>Default Card</Card.Title>
        </Card.Header>
        <Card.Body>
          <p>This is a default card with hover effect and shadow.</p>
        </Card.Body>
        <Card.Footer>
          <Button variant="secondary">Cancel</Button>
          <Button variant="primary">Action</Button>
        </Card.Footer>
      </Card>

      <Card variant="bordered" style={{ width: "300px" }}>
        <Card.Header>
          <Card.Title>Bordered Card</Card.Title>
        </Card.Header>
        <Card.Body>
          <p>This card has a border instead of a shadow.</p>
        </Card.Body>
        <Card.Footer>
          <Button variant="primary">Learn More</Button>
        </Card.Footer>
      </Card>

      <Card variant="ghost" padding="lg" style={{ width: "300px" }}>
        <Card.Title>Ghost Card</Card.Title>
        <p style={{ "margin-top": "1rem" }}>
          This is a ghost card with no background or borders.
        </p>
      </Card>
    </div>
  );
}
