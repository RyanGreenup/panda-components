import { ComponentProps, JSX, Show, splitProps } from "solid-js";
import { styled } from "../../styled-system/jsx";

const StyledButton = styled("button", {
  base: {
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "2",
    fontWeight: "medium",
    borderRadius: "selector",
    transition: "all 0.2s ease",
    cursor: "pointer",
    border: "none",
    outline: "none",
    textDecoration: "none",
    userSelect: "none",
    _disabled: {
      opacity: "0.5",
      cursor: "not-allowed",
    },
    _focus: {
      outline: "2px solid",
      outlineColor: "primary",
      outlineOffset: "2px",
    },
    _hover: {
      transform: "scale(1.05)",
    },
  },
  variants: {
    variant: {
      primary: {
        backgroundColor: "primary",
        color: "content.primary",
        _hover: {
          opacity: "0.9",
        },
        _active: {
          transform: "scale(0.98)",
        },
      },
      secondary: {
        backgroundColor: "secondary",
        color: "content.secondary",
        _hover: {
          opacity: "0.9",
        },
        _active: {
          transform: "scale(0.98)",
        },
      },
      accent: {
        backgroundColor: "accent",
        color: "content.accent",
        _hover: {
          opacity: "0.9",
        },
        _active: {
          transform: "scale(0.98)",
        },
      },
      neutral: {
        backgroundColor: "neutral",
        color: "content.neutral",
        _hover: {
          opacity: "0.9",
        },
        _active: {
          transform: "scale(0.98)",
        },
      },
      info: {
        backgroundColor: "info",
        color: "content.info",
        _hover: {
          opacity: "0.9",
        },
        _active: {
          transform: "scale(0.98)",
        },
      },
      success: {
        backgroundColor: "success",
        color: "content.success",
        _hover: {
          opacity: "0.9",
        },
        _active: {
          transform: "scale(0.98)",
        },
      },
      warning: {
        backgroundColor: "warning",
        color: "content.warning",
        _hover: {
          opacity: "0.9",
        },
        _active: {
          transform: "scale(0.98)",
        },
      },
      error: {
        backgroundColor: "error",
        color: "content.error",
        _hover: {
          opacity: "0.9",
        },
        _active: {
          transform: "scale(0.98)",
        },
      },
      ghost: {
        backgroundColor: "transparent",
        color: "base.content",
        _hover: {
          backgroundColor: "base.200",
        },
        _active: {
          backgroundColor: "base.300",
        },
      },
      link: {
        backgroundColor: "transparent",
        color: "primary",
        padding: "0",
        height: "auto",
        textDecoration: "underline",
        _hover: {
          opacity: "0.8",
        },
        _active: {
          opacity: "0.6",
        },
      },
      outline: {
        backgroundColor: "transparent",
        color: "base.content",
        border: "2px solid",
        borderColor: "base.content",
        _hover: {
          backgroundColor: "base.content",
          color: "base.100",
        },
        _active: {
          transform: "scale(0.98)",
        },
      },
    },
    size: {
      xs: {
        height: "6",
        paddingX: "2",
        fontSize: "xs",
      },
      sm: {
        height: "8",
        paddingX: "3",
        fontSize: "sm",
      },
      md: {
        height: "10",
        paddingX: "4",
        fontSize: "md",
      },
      lg: {
        height: "12",
        paddingX: "6",
        fontSize: "lg",
      },
      xl: {
        height: "14",
        paddingX: "8",
        fontSize: "xl",
      },
    },
    shape: {
      default: {},
      square: {
        aspectRatio: "1",
        padding: "0",
      },
      circle: {
        aspectRatio: "1",
        borderRadius: "full",
        padding: "0",
      },
    },
    fullWidth: {
      true: {
        width: "full",
      },
    },
  },
  defaultVariants: {
    variant: "primary",
    size: "md",
    shape: "default",
  },
});

export interface ButtonProps extends ComponentProps<typeof StyledButton> {
  children: JSX.Element;
  loading?: boolean;
}

export function Button(props: ButtonProps) {
  const [local, others] = splitProps(props, [
    "children",
    "loading",
    "disabled",
  ]);

  return (
    <StyledButton
      disabled={local.disabled || local.loading}
      aria-busy={local.loading}
      {...others}
    >
      <Show when={local.loading}>
        <LoadingSpinner />
      </Show>
      {local.children}
    </StyledButton>
  );
}

function LoadingSpinner() {
  return (
    <div
      style={{
        display: "inline-block",
        animation: "spin 1s linear infinite",
        "border-radius": "50%",
        height: "1rem",
        width: "1rem",
        "border-bottom": "2px solid currentColor",
      }}
    />
  );
}
