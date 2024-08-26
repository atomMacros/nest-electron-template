import { join, resolve } from "node:path";
import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueSetupExtend from "vite-plugin-vue-setup-extend";
import { VitePluginDoubleshot } from "vite-plugin-doubleshot";

const pathResolve = (dir: string) => {
  return resolve(__dirname, ".", dir);
};

// https://vitejs.dev/config/
export default defineConfig({
  root: join(__dirname, "src/render"),
  base: "./",
  plugins: [
    vue(),
    vueSetupExtend(),
    VitePluginDoubleshot({
      type: "electron",
      main: "dist/main/index.js",
      entry: "src/main/index.ts",
      outDir: "dist/main",
      external: ["electron"],
      electron: {
        build: {
          config: "./electron-builder.config.js",
        },
        preload: {
          entry: "src/preload/index.ts",
          outDir: "dist/preload",
        },
      },
    }),
  ],
  resolve: {
    alias: {
      "@render": join(__dirname, "src/render"),
      "@main": join(__dirname, "src/main"),
    },
  },
  optimizeDeps: {
    include: [
      pathResolve("mode_modules/element-plus/lib/locale/lang/zh-cn"),
      pathResolve("node_modules/element-plus/lib/locale/lang/en"),
      pathResolve("node_modules/element-plus/lib/locale/lang/zh-tw"),
      // '../../node_modules/element-plus/lib/locale/lang/zh-cn',
      // '../../node_modules/element-plus/lib/locale/lang/en',
      // '../../node_modules/element-plus/lib/locale/lang/zh-tw'

      // 'element-plus/lib/locale/lang/zh-cn',
      // 'element-plus/lib/locale/lang/en',
      // 'element-plus/lib/locale/lang/zh-tw',

      // 'element-plus/lib/locale/lang/zh-cn',
      // 'element-plus/lib/locale/lang/en',
      // 'element-plus/lib/locale/lang/zh-tw'
    ],
  },
  build: {
    outDir: join(__dirname, "dist/render"),
    emptyOutDir: true,
    chunkSizeWarningLimit: 1500,
    rollupOptions: {
      output: {
        entryFileNames: `assets/[name].[hash].js`,
        chunkFileNames: `assets/[name].[hash].js`,
        assetFileNames: `assets/[name].[hash].[ext]`,
        compact: true,
        manualChunks: {
          vue: ["vue", "vue-router", "pinia"],
          echarts: ["echarts"],
        },
      },
    },
  },
  css: { preprocessorOptions: { css: { charset: false } } },
  define: {
    __VUE_I18N_LEGACY_API__: JSON.stringify(false),
    __VUE_I18N_FULL_INSTALL__: JSON.stringify(false),
    __INTLIFY_PROD_DEVTOOLS__: JSON.stringify(false),
    __VERSION__: JSON.stringify(process.env.npm_package_version),
  },
});
