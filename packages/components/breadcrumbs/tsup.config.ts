import {defineConfig} from "tsup";

export default defineConfig({
  clean: true,
  target: "es2019",
  format: ["esm"],
  dts: true,
  treeshake: true,
});
