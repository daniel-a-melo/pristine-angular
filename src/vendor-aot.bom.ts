/*
Vendor BOM
Generates the DLL Vendor (check config/webpack.vendor.js)

Every change here requires rebuilding the vendor DLL
(yarn build:vendor)
*/

// CoreJS
import 'core-js/es6';
import 'core-js/es7/reflect';
import 'core-js/es7/array';

// Angular
import '@angular/platform-browser';
import '@angular/core';
import '@angular/common';
import '@angular/forms';
import '@angular/http';
import '@angular/router';

// RxJS
import 'rxjs.bom';

