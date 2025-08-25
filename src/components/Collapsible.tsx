import { ComponentProps, JSX, splitProps, createUniqueId } from "solid-js";
import { styled } from "../../styled-system/jsx";
import ChevronRight from "lucide-solid/icons/chevron-right";

const Container = styled("div", {
  base: {
    borderRadius: "md",
    overflow: "hidden",
    backgroundColor: "base.200",
    border: "default",
    m: 2,
  },
});

const HiddenInput = styled("input", {
  base: {
    display: "none",
    srOnly: true,
  },
});

const Trigger = styled("label", {
  base: {
    display: "flex",
    alignItems: "center",
    gap: "spacing.component.md",
    cursor: "pointer",
    color: "base.content",
    fontWeight: "semibold",
    py: 2,
    userSelect: "none",
    transition: "all 0.2s ease",
    border: "default",
    backgroundColor: {
      base: "base.200",
      _hover: "base.300",
    },
    _active: {
      backgroundColor: "base.300",
      transform: "scale(0.99)",
    },
  },
});

const contentAnimation = "transform 0.3s ease";
const ChevronIcon = styled("div", {
  base: {
    display: "flex",
    alignItems: "center",
    transition: contentAnimation,
    "[data-peer=collapsible]:checked ~ * &": {
      transform: "rotate(90deg)",
    },
  },
});

const Content = styled("div", {
  base: {
    maxHeight: "0",
    overflow: "hidden",
    transition: contentAnimation,
    backgroundColor: "base.100",
    "[data-peer=collapsible]:checked ~ &": {
      maxHeight: "full",
      py: 4,
      px: 4,
    },
  },
});

const ContentInner = styled("div", {
  base: {
    paddingX: "spacing.card.padding.sm",
    color: "base.content",
    fontSize: "sm",
    lineHeight: "relaxed",
  },
});

const Title = styled("span", {
  base: {
    flex: "1",
  },
});

export interface CollapsibleProps extends ComponentProps<typeof Container> {
  title: string;
  children: JSX.Element;
  defaultOpen?: boolean;
}

export function Collapsible(props: CollapsibleProps) {
  const [local, others] = splitProps(props, [
    "title",
    "children",
    "defaultOpen",
  ]);
  const id = createUniqueId();

  return (
    <Container {...others}>
      <HiddenInput
        type="checkbox"
        id={id}
        data-peer="collapsible"
        checked={local.defaultOpen}
      />
      <Trigger for={id}>
        <ChevronIcon>
          <ChevronRight size={16} />
        </ChevronIcon>
        <Title>{local.title}</Title>
      </Trigger>
      <Content>
        <ContentInner>{local.children}</ContentInner>
      </Content>
    </Container>
  );
}
