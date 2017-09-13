angularVersion = "@5.0.0-beta.6";

/**
 * WEB ANGULAR VERSION
 * (based on systemjs.config.js in angular.io)
 * System configuration for Angular samples
 * Adjust as necessary for your application needs.
 */
(function (global) {
  System.config({
    // DEMO ONLY! REAL CODE SHOULD NOT TRANSPILE IN THE BROWSER
    transpiler: 'ts',
    typescriptOptions: {
      // Copy of compiler options in standard tsconfig.json
      "target": "es5",
      "module": "commonjs",
      "moduleResolution": "node",
      "sourceMap": true,
      "emitDecoratorMetadata": true,
      "experimentalDecorators": true,
      "lib": ["es2015", "dom"],
      "noImplicitAny": true,
      "suppressImplicitAnyIndexErrors": true
    },
    meta: {
      'typescript': {
        "exports": "ts"
      }
    },
    paths: {
      // paths serve as alias
      'npm:': 'https://unpkg.com/'
    },
    // map tells the System loader where to look for things
    map: {
      // our app is within the app folder
      'app': 'app',

      // angular bundles
      '@angular/animations': 'npm:@angular/animations' + angularVersion + '/bundles/animations.umd.js',
      '@angular/animations/browser': 'npm:@angular/animations' + angularVersion + '/bundles/animations-browser.umd.js',
      '@angular/core': 'npm:@angular/core' + angularVersion + '/bundles/core.umd.js',
      '@angular/common': 'npm:@angular/common' + angularVersion + '/bundles/common.umd.js',
      '@angular/common/http': 'npm:@angular/common' + angularVersion + '/bundles/common-http.umd.js',
      '@angular/compiler': 'npm:@angular/compiler' + angularVersion + '/bundles/compiler.umd.js',
      '@angular/platform-browser': 'npm:@angular/platform-browser' + angularVersion + '/bundles/platform-browser.umd.js',
      '@angular/platform-browser/animations': 'npm:@angular/platform-browser' + angularVersion + '/bundles/platform-browser-animations.umd.js',
      '@angular/platform-browser-dynamic': 'npm:@angular/platform-browser-dynamic' + angularVersion + '/bundles/platform-browser-dynamic.umd.js',
      '@angular/http': 'npm:@angular/http' + angularVersion + '/bundles/http.umd.js',
      '@angular/router': 'npm:@angular/router' + angularVersion + '/bundles/router.umd.js',
      '@angular/router/upgrade': 'npm:@angular/router' + angularVersion + '/bundles/router-upgrade.umd.js',
      '@angular/forms': 'npm:@angular/forms' + angularVersion + '/bundles/forms.umd.js',
      '@angular/upgrade': 'npm:@angular/upgrade' + angularVersion + '/bundles/upgrade.umd.js',
      '@angular/upgrade/static': 'npm:@angular/upgrade' + angularVersion + '/bundles/upgrade-static.umd.js',

      // other libraries
      'rxjs':                      'npm:rxjs@5.0.1',
      'tslib':                     'npm:tslib/tslib.js',
      'angular-in-memory-web-api': 'npm:angular-in-memory-web-api/bundles/in-memory-web-api.umd.js',
      'ts':                        'npm:plugin-typescript@5.2.7/lib/plugin.js',
      'typescript':                'npm:typescript@2.3.2/lib/typescript.js',

    },
    // packages tells the System loader how to load when no filename and/or no extension
    packages: {
      app: {
        main: './main.ts',
        defaultExtension: 'ts',
        meta: {
          './*.ts': {
            loader: 'systemjs-angular-loader.js'
          }
        }
      },
      rxjs: {
        defaultExtension: 'js'
      }
    }
  });

})(this);

/*
Copyright 2016 Google Inc. All Rights Reserved.
Use of this source code is governed by an MIT-style license that
can be found in the LICENSE file at http://angular.io/license
*/