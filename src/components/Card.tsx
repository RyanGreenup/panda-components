import { ComponentProps, JSX, splitProps } from "solid-js";
import { styled } from "../../styled-system/jsx";

const StyledCard = styled("div", {
  base: {
    display: "flex",
    flexDirection: "column",
    borderRadius: "box",
    overflow: "hidden",
    transition: "all 0.2s ease",
    color: "base.content",
    background: "base.200",
  },
  variants: {
    variant: {
      default: {
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
        _hover: {
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
        },
      },
      bordered: {
        border: "default",
        // borderWidth: "medium",
        // borderStyle: "solid",
        // borderColor: "base.300",
      },
      ghost: {
        backgroundColor: "transparent",
        boxShadow: "none",
      },
    },
    padding: {
      none: { padding: "0" },
      sm: { padding: "4" },
      md: { padding: "6" },
      lg: { padding: "8" },
    },
  },
  defaultVariants: {
    variant: "default",
    padding: "md",
  },
});

const CardHeader = styled("div", {
  base: {
    padding: "4",
    borderBottom: "1px solid",
    borderColor: "base.200",
  },
});

const CardBody = styled("div", {
  base: {
    padding: "4",
    flex: "1",
  },
});

const CardFooter = styled("div", {
  base: {
    padding: "4",
    borderTop: "1px solid",
    borderColor: "base.200",
    display: "flex",
    gap: "2",
    justifyContent: "flex-end",
  },
});

const CardTitle = styled("h3", {
  base: {
    fontSize: "xl",
    fontWeight: "semibold",
    color: "base.content",
    margin: "0",
  },
});

export interface CardProps extends ComponentProps<typeof StyledCard> {
  children: JSX.Element;
}

export function Card(props: CardProps) {
  const [local, others] = splitProps(props, ["children"]);
  return <StyledCard {...others}>{local.children}</StyledCard>;
}

Card.Header = CardHeader;
Card.Body = CardBody;
Card.Footer = CardFooter;
Card.Title = CardTitle;
