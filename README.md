## Pristine Angular

#### Description

Pristine Angular is a personal start kit for Angular applications

* Angular 5+
* Tooling: Webpack, Karma, TSLint

### Pre-requisites for setting up a development environment

* Node >= v.6  
* Yarn

### Setting up the development environment

The instructions below assume the use of yarn

- Run `yarn install`
- Run `yarn run run build:vendor` for building the library bundles (aggressive caching of 3rd-party code to speed up Webpack)
- Run `yarn run run start` to run the webpack dev server (port 8080)
- Run `yarn run run lint` to run TSLint against the source code

### Running automated tests

- `yarn run run test` runs the tests using Karma and PhantomJS
- `yarn run run start` and browsing to `http://localhost:8080/tests.html` runs the tests using Jasmine browser runner (only available on dev server)

### Building for production

- Run `yarn run run build:vendorProd` for building uglyfied vendor bundle without angular JIT compiler
- Run `yarn run run build:app` for building for production (uglyfied + angular AOT compilation)

### Debugging

- Debuggin in VSCode should just work. Use task `Launch Chromium against localhost`. Make sure there's no existing Chrome/Chromium instances running

### VSCode recommended extensions

- Debugger for Chrome (Microsoft)
- ESLint (Dirk Baeumer)
- TSLint (egamma)
- TypeScript Importer (pmneo)

### Main improvements to be done


- Update to Webpack 4
    ExtractTextPlugin is deprecated. See https://github.com/webpack-contrib/mini-css-extract-plugin
    ModuleConcatenationPlugin is deprecated
    CommonChunksPlugin is deprecated
- ModuleConcatenationPlugin and Dlls together cause issues. Some modules that were supposed to be delegated ends up not being.
  RxJS 5.5's new lettable operators require ModuleConcatenationPlugins.
- Remove ExtractTextPlugin for non-prod configurations (perfomance reasons)
- Enable HMR (under CLI argument)
- CSS support on vendor : check if resources (images, fonts) referenced by CSS can be loaded
- Review hash on filenames: Incluide hash on dlls and make sure they are stable upon builds. See link #1
- Setup code coverage report. See links #3 and #4
- Replace karma with Jest for running tests. See link #2
- Experiment with Webpack 3's tree shaking feature to decrease vendor bundle size. (it may be necessary to not use DLL bundles though). See link #6

### Adding Ionic support

- https://labs.encoded.io/2016/11/12/ionic2-with-angular-cli/
- https://github.com/ionic-team/ionic-app-scripts#ionic-app-scripts

## Useful links

1 - [Predictable long term caching with webpack](https://medium.com/webpack/predictable-long-term-caching-with-webpack-d3eee1d3fa31)

2 - [Testing angular faster with jest](https://www.xfive.co/blog/testing-angular-faster-jest/)

3 - [Istanbul instrumenter loader](https://github.com/webpack-contrib/istanbul-instrumenter-loader)

4 - [Karma coverage istanbul reporter](https://github.com/mattlewis92/karma-coverage-istanbul-reporter)

5 - [Understanding @ngtools\webpack](https://www.ag-grid.com/ag-grid-webpack-ngtools/)

6 - [How to do proper tree-shaking in Webpack 2](https://blog.craftlab.hu/how-to-do-proper-tree-shaking-in-webpack-2-e27852af8b21)

7 - [AOT don'ts](https://github.com/qdouble/angular-webpack2-starter#aot--donts)

8 - [NGC compiler options](https://github.com/angular/angular/blob/master/tools/%40angular/tsc-wrapped/src/options.ts)

9 - [Webpack 3 official release](https://medium.com/webpack/webpack-3-official-release-15fd2dd8f07b)



