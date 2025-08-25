import { ComponentProps, JSX, Show, splitProps } from "solid-js";
import { styled } from "../../styled-system/jsx";
import AlertCircle from "lucide-solid/icons/alert-circle";
import Info from "lucide-solid/icons/info";
import AlertTriangle from "lucide-solid/icons/alert-triangle";
import CheckCircle from "lucide-solid/icons/check-circle";
import XCircle from "lucide-solid/icons/x-circle";

const StyledCallout = styled("div", {
  base: {
    display: "flex",
    gap: "3",
    padding: "4",
    borderRadius: "box",
    borderLeft: "4px solid",
    backgroundColor: "base.200",
    color: "base.content",
    fontSize: "sm",
    lineHeight: "relaxed",
    position: "relative",
    overflow: "hidden",
    transition: "all 0.2s ease",
    "&::before": {
      content: '""',
      position: "absolute",
      top: 0,
      left: 0,
      width: "4px",
      height: "100%",
      transition: "width 0.2s ease",
    },
    _hover: {
      "&::before": {
        width: "6px",
      },
    },
  },
  variants: {
    type: {
      note: {
        borderLeftColor: "info",
        backgroundColor: "info/10",
        "&::before": {
          backgroundColor: "info",
        },
      },
      tip: {
        borderLeftColor: "success",
        backgroundColor: "success/10",
        "&::before": {
          backgroundColor: "success",
        },
      },
      important: {
        borderLeftColor: "primary",
        backgroundColor: "primary/10",
        "&::before": {
          backgroundColor: "primary",
        },
      },
      warning: {
        borderLeftColor: "warning",
        backgroundColor: "warning/10",
        "&::before": {
          backgroundColor: "warning",
        },
      },
      caution: {
        borderLeftColor: "error",
        backgroundColor: "error/10",
        "&::before": {
          backgroundColor: "error",
        },
      },
    },
  },
  defaultVariants: {
    type: "note",
  },
});

const IconWrapper = styled("div", {
  base: {
    flexShrink: 0,
    display: "flex",
    alignItems: "flex-start",
    paddingTop: "0.5",
  },
  variants: {
    type: {
      note: {
        color: "info",
      },
      tip: {
        color: "success",
      },
      important: {
        color: "primary",
      },
      warning: {
        color: "warning",
      },
      caution: {
        color: "error",
      },
    },
  },
});

const Content = styled("div", {
  base: {
    flex: "1",
    "& > *:first-child": {
      marginTop: "0",
    },
    "& > *:last-child": {
      marginBottom: "0",
    },
    "& p": {
      margin: "0.5em 0",
    },
    "& code": {
      backgroundColor: "base.300",
      padding: "0.125em 0.25em",
      borderRadius: "0.25em",
      fontSize: "0.875em",
      fontFamily: "monospace",
    },
  },
});

const Title = styled("div", {
  base: {
    fontWeight: "semibold",
    marginBottom: "1",
    textTransform: "uppercase",
    letterSpacing: "wider",
    fontSize: "xs",
  },
  variants: {
    type: {
      note: {
        color: "info",
      },
      tip: {
        color: "success",
      },
      important: {
        color: "primary",
      },
      warning: {
        color: "warning",
      },
      caution: {
        color: "error",
      },
    },
  },
});

const iconMap = {
  note: Info,
  tip: CheckCircle,
  important: AlertCircle,
  warning: AlertTriangle,
  caution: XCircle,
};

const titleMap = {
  note: "Note",
  tip: "Tip",
  important: "Important",
  warning: "Warning",
  caution: "Caution",
};

export interface CalloutProps extends ComponentProps<typeof StyledCallout> {
  type?: "note" | "tip" | "important" | "warning" | "caution";
  title?: string;
  children: JSX.Element;
}

export function Callout(props: CalloutProps) {
  const [local, others] = splitProps(props, ["type", "title", "children"]);
  const type = () => local.type || "note";
  const Icon = () => iconMap[type()];
  const defaultTitle = () => titleMap[type()];

  return (
    <StyledCallout type={type()} {...others}>
      <IconWrapper type={type()}>
        <Icon size={20} />
      </IconWrapper>
      <Content>
        <Show when={local.title !== null}>
          <Title type={type()}>{local.title || defaultTitle()}</Title>
        </Show>
        {local.children}
      </Content>
    </StyledCallout>
  );
}
