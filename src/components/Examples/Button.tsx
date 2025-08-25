import Minus from "lucide-solid/icons/minus";
import Star from "lucide-solid/icons/star";
import { createSignal } from "solid-js";
import { styled } from "../../../styled-system/jsx";
import { Button } from "../Button";

const Container = styled("div", {
  base: {
    display: "flex",
    flexDirection: "column",
    gap: "4",
  },
});

const Row = styled("div", {
  base: {
    display: "flex",
    gap: "2",
    flexWrap: "wrap",
    alignItems: "center",
  },
});

const Label = styled("h3", {
  base: {
    fontSize: "lg",
    fontWeight: "semibold",
    color: "base.content",
    marginBottom: "2",
  },
});

export function ButtonExample() {
  const [loading, setLoading] = createSignal(false);

  const handleLoadingClick = () => {
    setLoading(true);
    setTimeout(() => setLoading(false), 2000);
  };

  return (
    <Container>
      <div>
        <Label>Variants</Label>
        <Row>
          <Button variant="primary">Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="accent">Accent</Button>
          <Button variant="neutral">Neutral</Button>
          <Button variant="info">Info</Button>
          <Button variant="success">Success</Button>
          <Button variant="warning">Warning</Button>
          <Button variant="error">Error</Button>
        </Row>
      </div>

      <div>
        <Label>Special Variants</Label>
        <Row>
          <Button variant="ghost">Ghost</Button>
          <Button variant="link">Link Button</Button>
          <Button variant="outline">Outline</Button>
        </Row>
      </div>

      <div>
        <Label>Sizes</Label>
        <Row>
          <Button size="xs">Extra Small</Button>
          <Button size="sm">Small</Button>
          <Button size="md">Medium</Button>
          <Button size="lg">Large</Button>
          <Button size="xl">Extra Large</Button>
        </Row>
      </div>

      <div>
        <Label>Shapes</Label>
        <Row>
          <Button shape="square" size="md">
            <Star size={16} />
          </Button>
          <Button shape="circle" size="md">
            <Minus size={16} />
          </Button>
          <Button shape="circle" size="lg">
            A
          </Button>
        </Row>
      </div>

      <div>
        <Label>States</Label>
        <Row>
          <Button disabled>Disabled</Button>
          <Button loading={loading()} onClick={handleLoadingClick}>
            {loading() ? "Loading..." : "Click to Load"}
          </Button>
        </Row>
      </div>

      <div>
        <Label>Full Width</Label>
        <Button fullWidth variant="primary">
          Full Width Button
        </Button>
      </div>
    </Container>
  );
}
