import {defineConfig} from "tsup";

export default defineConfig({
  entry: ["./modal","./button","./popover","./menu","./dropdown","./box","!./**/*.stories.tsx","index.ts"],
  clean: true,
  target: "es2022",
  dts:true,
  treeshake: true,
  bundle: true,
  format: ["esm"],
  // banner: {js: '"use client";'},
});
