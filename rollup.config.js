import commonjs from 'rollup-plugin-commonjs';
import nodeResolve from 'rollup-plugin-node-resolve';
import json from 'rollup-plugin-json';
// import globals from "rollup-plugin-node-globals";
import babel from "rollup-plugin-babel";

export default {
  entry: 'index.js',
  dest: 'dist/bundle.js',
  format: 'cjs',
  plugins: [
    nodeResolve(), // for support external module in node_modules
    commonjs(),
    // globals(),
    json(),
    babel({
      exclude: "node_modules/**",
      // plugins appears to be ignored. use .babelrc
    })
  ]
};
