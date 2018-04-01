const {run, help} = require('runjs');
const {removeDir, webpack} = require('./runfile-shared.js');

function clean_source() {
    run('rimraf ./src/**/*.js && rimraf ./src/**/*.map && rimraf ./src/**/*metadata.json');
}

function clean() {
    removeDir('dist');
    removeDir('aot');
    clean_source();
}

function aot_compile() {
    clean();
    run('ngc -p tsconfig-aot.json');
}

function start() {
    run('webpack-dev-server -w --inline --progress --port 8080 --debug');
}

function test() {
    run('karma start');
}

function lint() {
    run('tslint src/**/*.ts{,x}');
}

const build = {
    app() {
        clean();
        webpack('config/webpack.prod.js');
    },
    profile() {
        removeDir('dist');
        run('webpack --config config/webpack.prod.js --profile --json > app-bundle-stats.json');
    },
    vendor() {
        removeDir('lib');
        webpack('config/webpack.vendor.js');
    },
    vendorProfile() {
        removedir('lib');
        run('webpack --config config/webpack.vendor.js --profile --json > vendor-bundle-stats.json');
    },
    vendorProd() {
        removeDir('lib');
        webpack('config/webpack.vendor.prod.js');
    }
}

help(clean, 'Remove distribution and AOT compilation directories');
help(start, 'Starts Webpack dev web server');
help(test, 'Runs automated tests');
help(lint, 'Runs TSLint');
help(build.app, 'Runs production build for application code');
help(build.vendor, 'Build vendor DLL without production optimizations');
help(build.vendorProd, 'Build vendor DLL with production optimizations');

module.exports = {
    clean_source,
    clean,
    start,
    test,
    lint,
    build
};



