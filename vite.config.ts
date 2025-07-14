import reactRefresh from '@vitejs/plugin-react-refresh'
import { dirname, resolve } from 'path'
import { fileURLToPath } from 'url'
import { defineConfig } from 'vite'
import { viteSingleFile } from 'vite-plugin-singlefile'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

export default defineConfig({
    root: './src',
    base: './',
    plugins: [reactRefresh(), viteSingleFile()],
    resolve: {
        alias: {
            '@': resolve(__dirname, 'src'),
            '@app': resolve(__dirname, 'src/app'),
            '@pages': resolve(__dirname, 'src/pages'),
            '@widgets': resolve(__dirname, 'src/widgets'),
            '@features': resolve(__dirname, 'src/features'),
            '@entities': resolve(__dirname, 'src/entities'),
            '@shared': resolve(__dirname, 'src/shared'),
        },
    },
    build: {
        target: 'esnext',
        assetsInlineLimit: 100000000,
        chunkSizeWarningLimit: 100000000,
        cssCodeSplit: false,
        outDir: '../dist', // кладём ui.html в dist/
        emptyOutDir: true, // чистим dist один раз
        rollupOptions: {
            input: {
                ui: resolve(__dirname, 'src/index.html'),
            },
            output: { inlineDynamicImports: true },
        },
    },
    define: {
        __DEV__: JSON.stringify(process.env.NODE_ENV !== 'production'),
    },
})
