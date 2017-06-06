//---------//
// Imports //
//---------//

import commonjs from 'rollup-plugin-commonjs';
import nodeResolve from 'rollup-plugin-node-resolve';
import json from 'rollup-plugin-json';
import nodeBuildin from 'rollup-plugin-node-builtins';
import globals from "rollup-plugin-node-globals";
import babel from "rollup-plugin-babel";
import replace from 'rollup-plugin-replace';

//------//
// Init //
//------//

const getModuleRe = /.*\/(.*?)\.js'$/
  , warn = msg => console.warn(msg)
  ;


//------//
// Main //
//------//

export default {
  entry: 'index.js',
  dest: 'dist/bundle.js',
  format: 'iife',
  plugins: [
    nodeResolve({
      preferBuiltins: true
    }), // for support external module in node_modules
    replace({
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV) // for react
    }),
    json(),
    babel({
      exclude: "node_modules/**",
    }), // before global and buildin to solve "'default' is not exported by xxx..."
    globals(), // to include Node globals
    nodeBuildin(), // to include Node builtins, some modules may depand on global
    commonjs(), // in the end to solve many problems
  ],
  onwarn(aWarning) {
    const { code, frame, loc, message, url } = aWarning
      , moduleName = getModuleName(message)
      ;

    if (
      code === 'MISSING_EXPORT'
      && startsWith('\u0000commonjs-proxy:', loc.file)
      && startsWith("'default' is not exported by", message)
      && notActuallyMissingDefaultExport(frame, moduleName)
    ) {
      // do nothing
      console.warn(aWarning.toString());
      return
    } else {
      const lines = [message, url, `${loc.file} (${loc.line}:${loc.column})`, frame];
      lines.forEach(warn);
    }
  }
};

//-------------//
// Helper Fxns //
//-------------//

function startsWith(startsWithThis, aString) {
  return aString.slice(0, startsWithThis.length) === startsWithThis;
}

function getModuleName(warningMessage) {
  return warningMessage.match(getModuleRe)[1];
}

function notActuallyMissingDefaultExport(frame, moduleName) {
  const safeDefaultExportRe = new RegExp(
    `export default ( ${moduleName} && ${moduleName}['default'] ) || ${moduleName};`
  );

  return safeDefaultExportRe.test(frame);
}
