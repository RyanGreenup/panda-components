
import { defineRecipe, defineSlotRecipe } from "@pandacss/dev";

export const treeRecipe = defineSlotRecipe({
  className: "tree",
  description: "Tree view component with consistent styling",
  slots: [
    "container",
    "label",
    "interactiveElement",
    "itemContent",
    "itemText",
    "icon",
    "fileIcon",
    "folderIcon",
    "loadingSpinner",
    "branchWrapper",
    "branchIndicator",
    "branchContent",
    "indentGuide"
  ],
  base: {
    container: {
      fontFamily: "mono",
      fontSize: "sm",
      lineHeight: "1.5",
      color: "base.content",
      backgroundColor: "base.100",
      border: "1px solid",
      borderColor: "base.300",
      borderRadius: "box",
      padding: "2",
    },

    label: {
      fontSize: "xs",
      fontWeight: "semibold",
      color: "base.content",
      textTransform: "uppercase",
      letterSpacing: "wide",
      padding: "1 2",
      marginBottom: "1",
      borderBottom: "1px solid",
      borderColor: "base.300",
    },

    interactiveElement: {
      display: "flex",
      alignItems: "center",
      padding: "1 2",
      cursor: "pointer",
      borderRadius: "1",
      transition: "background-color 150ms cubic-bezier(0.4, 0, 0.2, 1)",

      _hover: {
        backgroundColor: "base.200",
      },

      "&[data-selected='true']": {
        backgroundColor: "primary",
        color: "base.content",
      },

      "&[data-focus='true']": {
        outline: "2px solid",
        outlineColor: "primary",
        outlineOffset: "1px",
      },
    },

    itemContent: {
      display: "flex",
      alignItems: "center",
      width: "100%",
      minHeight: "7", // 28px equivalent
    },

    itemText: {
      flex: "1",
      overflow: "hidden",
      textOverflow: "ellipsis",
      whiteSpace: "nowrap",
      userSelect: "none",
    },

    icon: {
      width: "4",
      height: "4",
      marginRight: "2",
      flexShrink: "0",
    },

    fileIcon: {
      color: "info",
    },

    folderIcon: {
      color: "warning",
    },

    loadingSpinner: {
      animation: "spin",
      color: "content.neutral",
    },

    branchWrapper: {
      position: "relative",
    },

    branchIndicator: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexShrink: "0",
      width: "4",
      height: "4",
      marginRight: "1",
      color: "base.content",
      transform: "rotate(0deg)",
      transition: "transform 250ms cubic-bezier(0.4, 0, 0.2, 1)",

      "&[data-state='open']": {
        transform: "rotate(90deg)",
      },
    },

    branchContent: {
      paddingLeft: "4",
      overflow: "hidden",
      transition: "max-height 350ms cubic-bezier(0.4, 0, 0.2, 1), opacity 250ms cubic-bezier(0.4, 0, 0.2, 1)",

      "&[data-state='open']": {
        animation: "expandBranch",
        maxHeight: "1000px",
        opacity: "1",
      },

      "&[data-state='closed']": {
        animation: "collapseBranch",
        maxHeight: "0",
        opacity: "0",
      },
    },

    indentGuide: {
      position: "absolute",
      left: "3",
      top: "0",
      bottom: "0",
      width: "1px",
      backgroundColor: "base.300",
      opacity: "0.5",
    },
  },

  variants: {
    size: {
      sm: {
        container: {
          padding: "3",
          fontSize: "xs",
        },
        interactiveElement: {
          padding: "1",
        },
        itemText: {
          fontSize: "xs",
        },
      },
      md: {
        container: {
          padding: "4",
          fontSize: "sm",
        },
        interactiveElement: {
          padding: "1.5",
        },
        itemText: {
          fontSize: "sm",
        },
      },
      lg: {
        container: {
          padding: "5",
          fontSize: "base",
        },
        interactiveElement: {
          padding: "2",
        },
        itemText: {
          fontSize: "base",
        },
      },
    },

    focused: {
      true: {
        container: {
          borderColor: "primary",
          boxShadow: "0 0 0 1px token(colors.primary)",
        },
      },
    },

    disabled: {
      true: {
        container: {
          opacity: "0.5",
          pointerEvents: "none",
        },
      },
    },

    animationSpeed: {
      slow: {
        branchContent: {
          transition: "all 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
        },
        branchIndicator: {
          transition: "transform 0.5s cubic-bezier(0.4, 0, 0.2, 1), color 0.3s ease",
        },
      },
      normal: {
        branchContent: {
          transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        },
        branchIndicator: {
          transition: "transform 0.3s cubic-bezier(0.4, 0, 0.2, 1), color 0.2s ease",
        },
      },
      fast: {
        branchContent: {
          transition: "all 0.15s cubic-bezier(0.4, 0, 0.2, 1)",
        },
        branchIndicator: {
          transition: "transform 0.15s cubic-bezier(0.4, 0, 0.2, 1), color 0.1s ease",
        },
      },
    },
  },

  defaultVariants: {
    size: "md",
    animationSpeed: "normal",
  },
});
