import { defineConfig } from "@pandacss/dev";
import MyPreset from "./src/presets/daisy";
import pandaPreset from "@pandacss/preset-panda";
import { articleRecipe } from "~/recipes/article.recipe";
import { treeRecipe } from "~/components/Tree/tree.recipe";

export default defineConfig({
  // Whether to use css reset
  preflight: true,

  jsxFramework: "solid",



  // Where to look for your css declarations
  include: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./pages/**/*.{js,jsx,ts,tsx}",
    "./src/**/*.mdx",
    "./pages/**/*.mdx",
  ],

  // Files to exclude
  exclude: [],
  presets: [MyPreset, pandaPreset],

  // Useful for theme customization
  theme: {
    extend: {
      recipes: {
        tree: treeRecipe
      },
    },
  },

  // The output directory for your css system
  outdir: "styled-system",
});
