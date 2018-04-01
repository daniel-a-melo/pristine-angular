const {run} = require('runjs');

function removeDir(dir) {
    run(`rimraf ${dir}`);
}

function webpack(configFile) {
    run(`webpack --config ${configFile} --display-chunks --display-modules --progress`);
}

module.exports = {
    removeDir,
    webpack
};