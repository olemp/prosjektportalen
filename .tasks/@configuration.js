'use strict';
var autoprefixer = require('autoprefixer-stylus'),
    pkg = require("../package.json");

module.exports = {
    paths: {
        license: "license.md",
        dist: "./dist",
        lib: "./lib",
        build: "./build",
        release: "./release",
        source: "./src",
        nodeModules: "./node_modules",
        temp: "./temp",
        docs: "./docs",
        templates: "./templates",
        templatesTemp: "./_templates",
        scripts: "./.scripts"
    },
    globs: {
        build: "./build/**/*",
        manualConf: "./manual-conf/**/*",
        scripts: "./.scripts/**/*",
        js: "./src/js/**/*.ts*",
        styles: "./src/**/*.styl",
        stylesMain: ["./src/*/pp.main.styl"],
        lib: ["./lib/**/*.js", "./lib/**/**/*.js"],
        test: ["./lib/js/_tests/**/*.js"],
        templates: "./templates/**/*",
        theme: "./templates/root/Theme/Project.spcolor",
        resxJson: "./src/js/**/*.json",
        resx: "./templates/root/*.resx",
    },
    assets: {
        fileTypes: ["png", "md"],
    },
    stylus: {
        compress: false,
        use: [autoprefixer('last 5 versions')]
    },
    lint: {
        formatter: "prose",
        emitError: true
    },
    versionToken: "{package-version}",
    availableLanguages: [1033, 1044],
    siteTemplates: [
        "FullTemplate",
        "LiteTemplate",
    ],
    thirdPartyLibs: [
        "xlsx/dist/xlsx.full.min.js",
        "file-saver/FileSaver.min.js",
    ],
}