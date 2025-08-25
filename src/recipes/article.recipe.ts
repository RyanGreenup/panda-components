import { defineRecipe } from "@pandacss/dev";

export const articleRecipe = defineRecipe({
  className: "article",
  description: "Professional article layout with typography",
  base: {
    // Layout
    maxWidth: "65ch",
    marginX: "auto",
    paddingX: {
      base: "1.5rem",
      md: "2rem",
      lg: "3rem",
    },
    paddingY: {
      base: "2rem",
      md: "3rem",
      lg: "4rem",
    },

    // Typography base
    fontSize: {
      base: "1rem",
      lg: "1.125rem",
    },
    lineHeight: "1.75",
    color: "base.content",
    backgroundColor: "base.100",

    // Headings
    "& h1": {
      fontSize: {
        base: "2.25rem",
        md: "2.5rem",
        lg: "3rem",
      },
      fontWeight: "800",
      lineHeight: "1.2",
      marginTop: "0",
      marginBottom: "2rem",
      color: "base.content",
    },

    "& h2": {
      fontSize: {
        base: "1.875rem",
        md: "2rem",
        lg: "2.25rem",
      },
      fontWeight: "700",
      lineHeight: "1.3",
      marginTop: "3rem",
      marginBottom: "1.5rem",
      color: "base.content",
    },

    "& h3": {
      fontSize: {
        base: "1.5rem",
        md: "1.625rem",
        lg: "1.75rem",
      },
      fontWeight: "600",
      lineHeight: "1.4",
      marginTop: "2.5rem",
      marginBottom: "1rem",
      color: "base.content",
    },

    // Paragraphs
    "& p": {
      marginBottom: "1.5rem",
      textAlign: "justify",
      hyphens: "auto",
    },

    // Links
    "& a": {
      color: "link.default",
      textDecoration: "underline",
      textDecorationColor: "link.underline",
      textUnderlineOffset: "0.125rem",
      transition: "all 0.2s",
      _hover: {
        color: "link.hover",
        textDecorationColor: "link.default",
      },
    },

    // Lists
    "& ul, & ol": {
      marginBottom: "1.5rem",
      paddingLeft: "1.5rem",
    },

    "& li": {
      marginBottom: "0.5rem",
      paddingLeft: "0.5rem",
    },

    // Code blocks
    "& pre": {
      backgroundColor: "text.code.bg",
      color: "text.code.content",
      borderRadius: "0.5rem",
      padding: "1.5rem",
      marginBottom: "1.5rem",
      overflowX: "auto",
      fontSize: "0.875rem",
      lineHeight: "1.5",
    },

    "& code": {
      backgroundColor: "bg.code",
      padding: "0.125rem 0.375rem",
      borderRadius: "0.25rem",
      fontSize: "0.875em",
      fontFamily: "monospace",
    },

    "& pre code": {
      backgroundColor: "transparent",
      padding: "0",
      fontSize: "inherit",
    },

    // Blockquotes
    "& blockquote": {
      borderLeftWidth: "4px",
      borderLeftColor: "border.default",
      paddingLeft: "1.5rem",
      marginY: "2rem",
      fontStyle: "italic",
      color: "text.secondary",
    },

    // Horizontal rules
    "& hr": {
      marginY: "3rem",
      borderColor: "border.default",
    },

    // Tables
    "& table": {
      width: "100%",
      marginBottom: "2rem",
      borderCollapse: "collapse",
    },

    "& th": {
      borderBottomWidth: "2px",
      borderColor: "border.strong",
      padding: "0.75rem",
      textAlign: "left",
      fontWeight: "600",
    },

    "& td": {
      borderBottomWidth: "1px",
      borderColor: "border.subtle",
      padding: "0.75rem",
    },

    // Special note styling
    "& .note": {
      backgroundColor: "bg.accent",
      borderLeftWidth: "4px",
      borderLeftColor: "link.default",
      borderRadius: "0.5rem",
      padding: "1rem 1.5rem",
      marginY: "2rem",

      "& .title": {
        fontWeight: "600",
        marginBottom: "0.5rem",
        color: "link.default",
      },
    },

    // Footnotes
    "& .footnotes": {
      marginTop: "4rem",
      paddingTop: "2rem",
      borderTopWidth: "1px",
      borderColor: "border.default",
      fontSize: "0.875rem",
    },

    // Responsive adjustments
    "@media print": {
      fontSize: "11pt",
      lineHeight: "1.5",
      color: "black",
      backgroundColor: "white",
    },
  },
});
