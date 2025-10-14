import { context } from 'esbuild';
import { cp, mkdir } from 'node:fs/promises';
import { resolve } from 'node:path';

await mkdir('dist', { recursive: true });
await cp(resolve('public'), resolve('dist'), { recursive: true });

const ctx = await context({
  entryPoints: ['src/main.tsx'],
  bundle: true,
  outdir: 'dist/assets',
  splitting: true,
  format: 'esm',
  sourcemap: true,
  target: ['es2020'],
  loader: { '.ts': 'ts', '.tsx': 'tsx' },
  define: { 'process.env.NODE_ENV': '"development"' }
});

await ctx.watch();
await ctx.serve({ servedir: 'dist', port: 4173, host: '0.0.0.0' });
console.log('Dev server listening on http://localhost:4173');
