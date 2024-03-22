import {defineConfig} from "tsup";

export default defineConfig({
  clean: true,
  target: "es2019",
  format: ["esm"],
  entry: ["src/index.ts"],
  treeshake: true,
  dts: true,
});
