import typescript from "rollup-plugin-typescript2";
import dts from "rollup-plugin-dts";

// 根据此参数区分是生成dts还是js
const gendts = false;

let config;
if (!gendts) {
  config = {
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
} else {
  config = [
    {
      input: "./build/box2d.d.ts",
      output: [{ file: "dist/box2d.d.ts", format: "es" }],
      plugins: [dts()],
    },
  ];
}

export default config;