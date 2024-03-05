import commonjs from '@rollup/plugin-commonjs';
import eslint from '@rollup/plugin-eslint';
import json from '@rollup/plugin-json';
import nodeResolve from '@rollup/plugin-node-resolve';
import run from '@rollup/plugin-run';
import typescript from '@rollup/plugin-typescript';
import copy from 'rollup-plugin-copy';
import dotenv from 'rollup-plugin-dotenv';
import nodeExternals from 'rollup-plugin-node-externals';
import tsconfigPaths from 'rollup-plugin-tsconfig-paths';

const dev = process.env.ROLLUP_WATCH === 'true';

export default {
  input: ['src/index.ts'],
  externals: [
    nodeExternals()
  ],
  resolve: {
    plugins: [tsconfigPaths(
      {
        tsConfigPath: './tsconfig.json'
      }
    )]
  },
	plugins: [
    commonjs(),
    copy({
      targets: [
        { src: 'src/list', dest: 'dist' },
      ]
    }),
    typescript(
      {
        tsconfig: 'tsconfig.json',
        sourceMap: true,
        inlineSourceMap: true,
        inlineSources: true,
      }
    ),
    nodeResolve({
      extensions: ['.ts', '.js'],
      preferBuiltins: true,
    }),
    eslint({
      fix: true,
      throwOnError: true,
      throwOnWarning: false,
      include: ['src/**/*.ts'],
      exclude: ['node_modules/**', 'dist/**'],
    }),
    json(),
    dotenv(),
    dev && run(
      {
        execArgv: ['-r', 'source-map-support/register'],
      }
    )
  ],
  output: [
    {
      dir: 'dist',
      format: 'cjs',
      sourcemap: true,
    }
  ],
};
