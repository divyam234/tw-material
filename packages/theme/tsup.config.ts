import {defineConfig} from "tsup";

export default defineConfig({
  clean: true,
  target: "es2019",
  entry: ["src"],
  format: ["esm", "cjs"],
  treeshake: true,
  dts: true,
});
