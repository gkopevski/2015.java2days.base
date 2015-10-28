/**
 * This file/module contains all configuration for the build process.
 */
module.exports = {
    /**
     * The `build_dir` folder is where our projects are compiled during
     * development and the `compile_dir` folder is where our app resides once it's
     * completely built.
     */
    build_dir: 'www',
    compile_dir: 'www-bin',

    /**
     * This is a collection of file patterns that refer to our app code (the
     * stuff in `src/`). These file paths are used in the configuration of
     * build tasks. `js` is all project javascript, less tests. `ctpl` contains
     * our reusable components' (`src/common`) template HTML files, while
     * `atpl` contains the same, but for our app's code. `html` is just our
     * main HTML file, `less` is our main stylesheet, and `unit` contains our
     * app's unit tests.
     */
    app_files: {
        js: ['src/**/*.js', '!src/**/*.spec.js', '!src/assets/**/*.js'],
        jsunit: ['src/*.spec.js'],
        protractor: ['karma/e2e/**/*.spec.js'],

        coffee: ['src/**/*.coffee', '!src/**/*.spec.coffee'],
        coffeeunit: ['src/**/*.spec.coffee'],

        atpl: ['src/app/**/*.tpl.html'],
        ctpl: ['src/common/**/*.tpl.html'],
        vctpl: ['vendorCustom/**/*.tpl.html'],


        html: ['src/index.html'],
        less: 'src/less/main.less',
        scss: 'src/assets/sass/*.scss',
        module: ['src/app/myupc/products/*.js', 'src/app/myupc/products/*.spec.js', 'src/app/myupc/products/**/*.js']

    },

    /**
     * This is a collection of files used during testing only.
     */
    test_files: {
        js: [
            'vendor/angular-mocks/angular-mocks.js'
        ]
    },

    /**
     * This is the same as `app_files`, except it contains patterns that
     * reference vendor code (`vendor/`) that we need to place into the build
     * process somewhere. While the `app_files` property ensures all
     * standardized files are collected for compilation, it is the user's job
     * to ensure non-standardized (i.e. vendor-related) files are handled
     * appropriately in `vendor_files.js`.
     *
     * The `vendor_files.js` property holds files to be automatically
     * concatenated and minified with our project source files.
     *
     * The `vendor_files.css` property holds any CSS files to be automatically
     * included in our app.
     *
     * The `vendor_files.assets` property holds any assets to be copied along
     * with our app's assets. This structure is flattened, so it is not
     * recommended that you use wildcards.
     */
    vendor_files: {
        js: ['vendor/**/*.js'],
        css: [],
        assets: [
            'vendor/leaflet/dist/images/layers.png',
            'vendor/leaflet/dist/images/layers-2x.png',
            'vendor/leaflet/dist/images/marker-icon.png',
            'vendor/leaflet/dist/images/marker-icon-2x.png',
            'vendor/leaflet/dist/images/marker-shadow.png',
            'vendor/ng-slider/dist/img/jslider.png'
        ]
    },
    vendor_custom_files: {
        js: [
            'vendorCustom/ADB_Helper/ADB_Helper.js',
            'vendorCustom/crypto-js/tripledes.js',
            'vendorCustom/iScroll/iscroll.js',
            'vendorCustom/iScroll/ng-iscroll.min.js',
            'vendorCustom/toolbox-date/toolbox-date.js',
            'vendorCustom/webtoolkit/webtoolkit.sha1.js',
            'vendorCustom/rules/angular-rules.js',
            'vendorCustom/rules/angular-rules-loader-static-files.js',
            'vendorCustom/rules/angular-rules-storage-cookie.js',
            'vendorCustom/rules/angular-rules-storage-local.js',
            'vendorCustom/ang-accordion/js/ang-accordion.js',
            'vendorCustom/loggly-jslogger-master/src/loggly.tracker.min.js',
            'vendorCustom/loggly-jslogger-master/src/loggly.tracker.min.map'

        ],
        css: [
            'vendorCustom/ang-accordion/css/ang-accordion.css'
        ],
        assets: [
            'vendorCustom/leaflet-search/icon_current_position.png',
            'vendorCustom/leaflet-search/loader.png',
            'vendorCustom/leaflet-search/search-icon.png',
            'vendorCustom/leaflet-search/search-icon-mobile.png',
            'vendorCustom/ang-accordion/images/down-icon.png',
            'vendorCustom/ang-accordion/images/right-icon.png'
        ]
    }
};
