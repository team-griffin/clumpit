import babel from 'rollup-plugin-babel';
import localResolve from 'rollup-plugin-local-resolve';

export default {
  input: 'src/index.ts',
  output: [
    {
      file: 'dist/es/clumpit.js',
      format: 'es',
    },
    {
      file: 'dist/cjs/clumpit.js',
      format: 'cjs',
    },
  ],
  plugins: [
    localResolve(),
    babel({
      exclude: 'node_modules/**',
      // plugins: ['external-helpers'],
      extensions: ['.js', '.jsx', '.ts', '.tsx'],
    }),
  ],
};