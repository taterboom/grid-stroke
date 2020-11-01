import path from "path"
import rollupTypescript from "rollup-plugin-typescript2"
import { nodeResolve } from "@rollup/plugin-node-resolve"
import commonjs from "@rollup/plugin-commonjs"
import less from "rollup-plugin-less"
import babel from '@rollup/plugin-babel'
import { terser } from 'rollup-plugin-terser';
import pkg from "./package.json"

export default [
  {
    input: path.resolve("./src/index.tsx"),
    output: [
      {
        file: "dist/index.esm.js",
        format: "es",
      },
      {
        name: "GridStroke",
        file: "dist/index.umd.js",
        format: "umd",
        globals: {
          "react-color": "ReactColor",
        },
      },
    ],
    plugins: [
      rollupTypescript(),
      babel({
        include: ['src/**'],
        extensions: ['.js', '.ts', '.tsx'],
        babelHelpers: 'runtime',
        presets: [
          '@babel/preset-env',
          '@babel/preset-typescript',
        ],
        plugins: [
          [
            '@babel/plugin-transform-runtime',
            {
              regenerator: false,
              // useESModules: isModule,
            },
          ],
        ],
      }),
      nodeResolve(),
      commonjs(),
      less({
        output: "dist/index.css",
      }),
      terser(),
    ],
    external: Object.keys(pkg.peerDependencies),
  },
]
