import { build } from 'esbuild';
import { cp, mkdir } from 'node:fs/promises';
import { resolve } from 'node:path';

await mkdir('dist', { recursive: true });
await cp(resolve('public'), resolve('dist'), { recursive: true });

await build({
  entryPoints: ['src/main.tsx'],
  bundle: true,
  outdir: 'dist/assets',
  splitting: true,
  format: 'esm',
  sourcemap: false,
  minify: true,
  target: ['es2020'],
  loader: { '.ts': 'ts', '.tsx': 'tsx' },
  define: { 'process.env.NODE_ENV': '"production"' }
});
