import typescript from "rollup-plugin-typescript2";

export default {
  input: "./src/index.ts",
  output: {
    file: "./dist/box2d.js",
    name: "box2d",
    format: "iife",
    sourcemap: false,
  },
  plugins: [
    typescript({ clean: true, tsconfigOverride: { compilerOptions: { target: "ES2015", module: "ES2015", declaration: false } } }),
  ]
};
