// esbuild.config.mjs
import { build, context } from 'esbuild'
import copy from 'esbuild-plugin-copy'
import { htmlPlugin } from '@craftamap/esbuild-plugin-html'
import { resolve, readFileSync, writeFileSync, mkdirSync } from 'fs'

// Отлавливаем флаг --watch как «dev»
// eslint-disable-next-line no-undef
const isDev = process.argv.includes('--watch')
const outdir = 'dist'
mkdirSync(outdir, { recursive: true })

const common = {
    entryPoints: { code: 'src/code.tsx', ui: 'src/ui.tsx' },
    bundle: true,
    platform: 'browser',
    format: 'cjs',

    target: 'es2020',
    sourcemap: isDev ? 'inline' : false,
    minify: !isDev,
    outdir,
    plugins: [
        // ваши плагины html & copy…
        htmlPlugin({
            /* … */
        }),
        copy({
            /* … */
        }),
    ],
}

if (isDev) {
    const ctx = await context(common)
    await ctx.watch()
    console.log('🚀 watching…')
} else {
    await build(common)
    console.log('✅ build done')
}

// для Figma: ставим global = {} в начало code.js
const text = readFileSync(resolve(outdir, 'code.js'), 'utf8')
writeFileSync(resolve(outdir, 'code.js'), 'var global={};\n' + text)
