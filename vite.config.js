import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'
const pathResolve = (dir) => resolve(__dirname, dir) 

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, __dirname)
  return {
    // base: env.VITE_APP_API_HOST,
    css: {},
    build: {
      outDir: "dist",
      minify: "terser", // 不设置此内容，控制台报错“build.terserOptions is specified but build.minify is not set to use Terser. Note Vite now defaults to use esbuild for minification. If you still prefer Terser, set build.minify to "terser".”
      terserOptions: {
        compress: {
          keep_infinity: true, // 防止Infinity被压缩成 1/0，可能导致Chrome上的性能
          drop_console: true, // 生产环境去除console
          drop_debugger: true, // 生产环境去除debugger
        },
      },
    },
    resolve: {
      alias: {
        "@": pathResolve("/src"),
        views: pathResolve("./src/views"),
        components: pathResolve("./src/components"),
        assets: pathResolve("./src/assets"),
      },
    },
    plugins: [vue()],
    server: {
      cors: true,
      host: "0.0.0.0",
      port: "8083",
      proxy: {
        "/api": {},
      },
    },
  };
})
