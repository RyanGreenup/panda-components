import { definePreset } from "@pandacss/dev";
import pandaPreset from "@pandacss/preset-panda";

import { layout } from "./recipes/layout.recipe";
import myPreset from "./daisy";

const spacing = {
  navbar: {
    x: { value: "1rem" },
    y: { value: "0.75rem" },
    height: { value: "4rem" },
  },
};

const layoutPreset = definePreset({
  name: "layout-preset",
  presets: [myPreset],
  conditions: {
    navbarToggle: "[data-peer=navbar]:checked ~ &",
    drawerToggle: "[data-peer=drawer]:checked ~ &",
    bottomDashToggle: "[data-peer=bottomdash]:checked ~ &",
  },
  theme: {
    extend: {
      tokens: {
        spacing,
      },
    },

    slotRecipes: {
      layout: layout,
    },
  },
});

export default layoutPreset;
