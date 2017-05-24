import commonjs from 'rollup-plugin-commonjs';
import resolve from 'rollup-plugin-node-resolve';

export default {
  entry: 'index.js',
  dest: 'dist/bundle.js',
  format: 'cjs',
  plugins: [
    resolve(), // for support external module in node_modules
    commonjs()
  ]
};
