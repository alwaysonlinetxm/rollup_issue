import commonjs from 'rollup-plugin-commonjs';
import nodeResolve from 'rollup-plugin-node-resolve';
import json from 'rollup-plugin-json';
import nodeBuildin from 'rollup-plugin-node-builtins';
import globals from "rollup-plugin-node-globals";
import babel from "rollup-plugin-babel";

export default {
  entry: 'index.js',
  dest: 'dist/bundle.js',
  format: 'cjs',
  plugins: [
    nodeResolve({
      preferBuiltins: true
    }), // for support external module in node_modules
    json(),
    babel({
      exclude: "node_modules/**",
    }), // before global and buildin to solve "'default' is not exported by xxx..."
    globals(), // to include Node globals
    nodeBuildin(), // to include Node builtins, some modules may depand on global
    commonjs(), // in the end to solve many problems
  ]
};
