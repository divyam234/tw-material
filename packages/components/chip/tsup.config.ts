import {defineConfig} from "tsup";

export default defineConfig({
  clean: true,
  target: "es2019",
  format: ["esm", "cjs"],
  dts: true,
  treeshake: true,
});