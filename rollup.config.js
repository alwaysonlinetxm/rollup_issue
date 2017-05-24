import commonjs from 'rollup-plugin-commonjs';
import nodeResolve from 'rollup-plugin-node-resolve';
import json from 'rollup-plugin-json';

export default {
  entry: 'index.js',
  dest: 'dist/bundle.js',
  format: 'cjs',
  plugins: [
    json(),
    nodeResolve(), // for support external module in node_modules
    commonjs()
  ]
};
