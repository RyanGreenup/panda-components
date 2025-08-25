import { definePreset } from "@pandacss/dev";
import pandaPreset from "@pandacss/preset-panda";
import dracula from "./themes/dracula";
import synthwave from "./themes/synthwave";
import LightTheme from "./themes/light";

const prefersDarkTheme = dracula;
const darkTheme = dracula;

const backgroundTransition = "background-color 0.2s ease, color 0.2s ease";

export default definePreset({
  name: "my-preset",
  presets: [pandaPreset],
  conditions: {
    light: "[data-color-mode=light] &",
    dark: "[data-color-mode=dark] &",
    synthwaveTheme: "[data-theme=synthwave] &",
  },
  globalCss: {
    "html, body": {
      backgroundColor: "base.100",
      color: "base.content",
      // TODO: Should we use dvh for chrome or is vh good enough?
      minHeight: "100vh",
    },
    "*": {
      transition: backgroundTransition,
    },
  },
  theme: {
    tokens: {},

    semanticTokens: {
      colors: {
        // Base color system with dark mode
        base: {
          100: {
            value: {
              base: LightTheme.base[100].value,
              _dark: darkTheme.base[100].value,
              _osDark: dracula.base[100].value,
              _synthwaveTheme: synthwave.base[100].value,
            },
            description: "Adaptive lightest base color",
          },
          200: {
            value: {
              base: LightTheme.base[200].value,
              _dark: darkTheme.base[200].value,
              _osDark: prefersDarkTheme.base[200].value,
              _synthwaveTheme: synthwave.base[200].value,
            },
            description: "Adaptive light base color",
          },
          300: {
            value: {
              base: LightTheme.base[300].value,
              _dark: darkTheme.base[300].value,
              _osDark: prefersDarkTheme.base[300].value,
              _synthwaveTheme: synthwave.base[300].value,
            },
            description: "Adaptive medium base color",
          },
          content: {
            value: {
              base: LightTheme.base.content.value,
              _dark: darkTheme.base.content.value,
              _osDark: prefersDarkTheme.base.content.value,
              _synthwaveTheme: synthwave.base.content.value,
            },
            description: "Adaptive base content color",
          },
        },
        content: {
          primary: {
            value: {
              base: LightTheme.content.primary.value,
              _dark: darkTheme.content.primary.value,
              _osDark: prefersDarkTheme.content.primary.value,
              _synthwaveTheme: synthwave.content.primary.value,
            },
          },
          secondary: {
            value: {
              base: LightTheme.content.secondary.value,
              _dark: darkTheme.content.secondary.value,
              _osDark: prefersDarkTheme.content.secondary.value,
              _synthwaveTheme: synthwave.content.secondary.value,
            },
          },
          accent: {
            value: {
              base: LightTheme.content.accent.value,
              _dark: darkTheme.content.accent.value,
              _osDark: prefersDarkTheme.content.accent.value,
              _synthwaveTheme: synthwave.content.accent.value,
            },
          },
          neutral: {
            value: {
              base: LightTheme.content.neutral.value,
              _dark: darkTheme.content.neutral.value,
              _osDark: prefersDarkTheme.content.neutral.value,
              _synthwaveTheme: synthwave.content.neutral.value,
            },
          },
          info: {
            value: {
              base: LightTheme.content.info.value,
              _dark: darkTheme.content.info.value,
              _synthwaveTheme: synthwave.content.info.value,
            },
          },
          success: {
            value: {
              base: LightTheme.content.success.value,
              _dark: darkTheme.content.success.value,
              _synthwaveTheme: synthwave.content.success.value,
            },
          },
          warning: {
            value: {
              base: LightTheme.content.warning.value,
              _dark: darkTheme.content.warning.value,
              _synthwaveTheme: synthwave.content.warning.value,
            },
          },
          error: {
            value: {
              base: LightTheme.content.error.value,
              _dark: darkTheme.content.error.value,
              _synthwaveTheme: synthwave.content.error.value,
            },
          },
        },
        // Brand colors with dark mode
        primary: {
          value: {
            base: LightTheme.primary.value,
            _dark: darkTheme.primary.value,
            _osDark: prefersDarkTheme.primary.value,
            _synthwaveTheme: synthwave.primary.value,
          },
          description: "Adaptive primary brand color",
        },
        secondary: {
          value: {
            base: LightTheme.secondary.value,
            _dark: darkTheme.secondary.value,
            _osDark: prefersDarkTheme.secondary.value,
            _synthwaveTheme: synthwave.secondary.value,
          },
          description: "Adaptive secondary brand color",
        },
        accent: {
          value: {
            base: LightTheme.accent.value,
            _dark: darkTheme.accent.value,
            _osDark: prefersDarkTheme.accent.value,
            _synthwaveTheme: synthwave.accent.value,
          },
          description: "Adaptive accent brand color",
        },
        neutral: {
          value: {
            base: LightTheme.neutral.value,
            _dark: darkTheme.neutral.value,
            _osDark: prefersDarkTheme.neutral.value,
            _synthwaveTheme: synthwave.neutral.value,
          },
          description: "Adaptive neutral brand color",
        },
        info: {
          value: {
            base: LightTheme.info.value,
            _dark: darkTheme.info.value,
            _osDark: prefersDarkTheme.info.value,
            _synthwaveTheme: synthwave.info.value,
          },
          description: "Adaptive info brand color",
        },
        success: {
          value: {
            base: LightTheme.success.value,
            _dark: darkTheme.success.value,
            _osDark: prefersDarkTheme.success.value,
            _synthwaveTheme: synthwave.success.value,
          },
          description: "Adaptive success brand color",
        },
        warning: {
          value: {
            base: LightTheme.warning.value,
            _dark: darkTheme.warning.value,
            _osDark: prefersDarkTheme.warning.value,
            _synthwaveTheme: synthwave.warning.value,
          },
          description: "Adaptive warning brand color",
        },
        error: {
          value: {
            base: LightTheme.error.value,
            _dark: darkTheme.error.value,
            _osDark: prefersDarkTheme.error.value,
            _synthwaveTheme: synthwave.error.value,
          },
          description: "Adaptive error brand color",
        },
        link: {
          default: {
            value: {
              base: "oklch(0.55 0.15 264)",
              _dark: "oklch(0.75 0.12 264)",
              _osDark: "oklch(0.75 0.12 264)",
            },
            description: "Interactive link color",
          },
          hover: {
            value: {
              base: "oklch(0.50 0.18 264)",
              _dark: "oklch(0.70 0.15 264)",
              _osDark: "oklch(0.70 0.15 264)",
            },
            description: "Link hover state color",
          },
          underline: {
            value: {
              base: "oklch(0.85 0.05 264)",
              _dark: "oklch(0.40 0.18 264)",
              _osDark: "oklch(0.40 0.18 264)",
            },
            description: "Link underline decoration color",
          },
        },
        text: {
          headings: {
            1: {
              value: {
                base: LightTheme.base.content.value,
                _dark: darkTheme.base.content.value,
                _osDark: prefersDarkTheme.base.content.value,
              },
            },
            2: {
              value: {
                base: LightTheme.base.content.value,
                _dark: darkTheme.base.content.value,
                _osDark: prefersDarkTheme.base.content.value,
              },
            },
            3: {
              value: {
                base: LightTheme.base.content.value,
                _dark: darkTheme.base.content.value,
                _osDark: prefersDarkTheme.base.content.value,
              },
            },
            4: {
              value: {
                base: LightTheme.base.content.value,
                _dark: darkTheme.base.content.value,
                _osDark: prefersDarkTheme.base.content.value,
              },
            },
            5: {
              value: {
                base: LightTheme.base.content.value,
                _dark: darkTheme.base.content.value,
                _osDark: prefersDarkTheme.base.content.value,
              },
            },
            6: {
              value: {
                base: LightTheme.base.content.value,
                _dark: darkTheme.base.content.value,
                _osDark: prefersDarkTheme.base.content.value,
              },
            },
          },
          code: {
            bg: {
              value: {
                base: "oklch(0.35 0.02 264)",
                _dark: darkTheme.base[200].value,
                _osDark: prefersDarkTheme.base[200].value,
                _synthwaveTheme: synthwave.base[200].value,
              },
            },
            content: {
              value: {
                base: "oklch(0.95 0.02 264)",
                _dark: darkTheme.base.content.value,
                _osDark: prefersDarkTheme.base.content.value,
                _synthwaveTheme: synthwave.base.content.value,
              },
            },
          },
        },
      },
      radii: {
        selector: {
          value: {
            base: LightTheme.radius.selector.value,
            _dark: darkTheme.radius.selector.value,
            _osDark: prefersDarkTheme.radius.selector.value,
            _synthwaveTheme: synthwave.radius.selector.value,
          },
        },
        field: {
          value: {
            base: LightTheme.radius.field.value,
            _dark: darkTheme.radius.field.value,
            _osDark: prefersDarkTheme.radius.field.value,
            _synthwaveTheme: synthwave.radius.field.value,
          },
        },
        box: {
          value: {
            base: LightTheme.radius.box.value,
            _dark: darkTheme.radius.box.value,
            _osDark: prefersDarkTheme.radius.box.value,
            _synthwaveTheme: synthwave.radius.box.value,
          },
        },
        size: {
          value: {
            base: LightTheme.size.selector.value,
            _dark: darkTheme.size.selector.value,
            _osDark: prefersDarkTheme.size.selector.value,
            _synthwaveTheme: synthwave.size.selector.value,
          },

          field: {
            value: {
              base: LightTheme.size.field.value,
              _dark: darkTheme.size.field.value,
              _osDark: prefersDarkTheme.size.field.value,
              _synthwaveTheme: synthwave.size.field.value,
            },
          },
        },
        border: {
          width: {
            value: {
              base: LightTheme.border.value,
              _dark: darkTheme.border.value,
              _osDark: prefersDarkTheme.border.value,
              _synthwaveTheme: synthwave.border.value,
            },
          },
          default: {
            value: {
              // Daisy UI uses base-300 for border color
              base: `${LightTheme.border.value} solid ${LightTheme.base[300].value}`,
              _dark: `${darkTheme.border.value} solid ${darkTheme.base[300].value}`,
              _osDark: `${prefersDarkTheme.border.value} solid ${prefersDarkTheme.base[300].value}`,
              _synthwaveTheme: `${synthwave.border.value} solid ${synthwave.base[300].value}`,
            },
          },
        },
        depth: {
          value: {
            base: LightTheme.depth.value,
            _dark: darkTheme.depth.value,
            _osDark: prefersDarkTheme.depth.value,
            _synthwaveTheme: synthwave.depth.value,
          },
        },
        noise: {
          value: {
            base: LightTheme.noise.value,
            _dark: darkTheme.noise.value,
            _osDark: prefersDarkTheme.noise.value,
            _synthwaveTheme: synthwave.noise.value,
          },
        },
      },
    },
  },
});
