/*
Vendor BOM
Generates the DLL Vendor (check config/webpack.vendor.js)

Every change here requires rebuilding the vendor DLL
(yarn build:vendor)
*/

// Zone.js
if (process.env.ENV === 'production') {
  // Production
} else {
  // Development
  Error['stackTraceLimit'] = Infinity;
  require('zone.js/dist/long-stack-trace-zone');
}


// CoreJS
import 'core-js/es6';
import 'core-js/es7/reflect';
import 'core-js/es7/array';

// Angular
import '@angular/platform-browser';
import '@angular/platform-browser-dynamic';
import '@angular/core';
import '@angular/common';
import '@angular/forms';
import '@angular/http';
import '@angular/router';
// [REVIEW] WORKAROUND: This package must be part of vendor DLL in order to jasmine browser runner to work
import '@angular/platform-browser-dynamic/testing';


// RxJS
import 'rxjs.bom';
