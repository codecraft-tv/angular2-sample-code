(function(global) {
  SystemJS.typescriptOptions = {
    target: "es5",
    module: "system",
    moduleResolution: "node",
    sourceMap: true,
    emitDecoratorMetadata: true,
    experimentalDecorators: true,
    noImplicitAny: true,
    suppressImplicitAnyIndexErrors: true
  };
  System.config({
    transpiler: "ts",
    meta: {
      typescript: {
        exports: "ts"
      }
    },
    paths: {
      "npm:": "https://unpkg.com/"
    },
    map: {
      app: "app",
      "@angular/core": "npm:@angular/core/bundles/core.umd.min.js",
      "@angular/common": "npm:@angular/common/bundles/common.umd.min.js",
      "@angular/compiler": "npm:@angular/compiler/bundles/compiler.umd.min.js",
      "@angular/platform-browser":
        "npm:@angular/platform-browser/bundles/platform-browser.umd.min.js",
      "@angular/platform-browser-dynamic":
        "npm:@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.min.js",

      "@angular/common/http": "npm:@angular/common/bundles/common-http.umd.js",
      "@angular/platform-browser":
        "npm:@angular/platform-browser/bundles/platform-browser.umd.js",
      "@angular/platform-browser-dynamic":
        "npm:@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js",
      "@angular/http": "npm:@angular/http/bundles/http.umd.js",
      "@angular/router": "npm:@angular/router/bundles/router.umd.js",
      "@angular/forms": "npm:@angular/forms/bundles/forms.umd.js",

      rxjs: "npm:rxjs",
      "angular-in-memory-web-api":
        "npm:angular-in-memory-web-api/bundles/in-memory-web-api.umd.js",
      ts: "npm:plugin-typescript/lib/plugin.js",
      typescript: "npm:typescript/lib/typescript.js"
    },
    packages: {
      app: { defaultExtension: "ts" },
      "rxjs/ajax": { main: "index.js", defaultExtension: "js" },
      "rxjs/operators": { main: "index.js", defaultExtension: "js" },
      "rxjs/testing": { main: "index.js", defaultExtension: "js" },
      "rxjs/websocket": { main: "index.js", defaultExtension: "js" },
      rxjs: { main: "index.js", defaultExtension: "js" }
    }
  });
})(this);
