module.exports = function (config) {
    config.set({

        basePath: './',
        reporters: ['progress', 'coverage', 'html'],

        preprocessors: {
            '!(vendor)/**/*.js': ['coverage'],
            'src/**/*.html': ['ng-html2js'],
        },

        files: [
            'vendor/angular/angular.js',
            'vendor/angular-mocks/angular-mocks.js',
            'vendor/angular-ui-router/release/angular-ui-router.js',
            'src/app/**/*.js',
            'src/common/**/*.js'
        ],

        autoWatch: true,

        frameworks: ['jasmine'],

        browsers: ['Chrome'],

        ngHtml2JsPreprocessor: {
            // strip this from the file path
            stripPrefix: 'src/',
            // create a single module that contains templates from all the files
            moduleName: 'templates'
        },

        plugins: [
            'karma-chrome-launcher',
            'karma-firefox-launcher',
            'karma-phantomjs-launcher',
            'karma-jasmine',
            'karma-junit-reporter',
            'karma-coverage'
        ],

        htmlReporter: {
            outputFile: 'tests/units.html',

            // Optional
            pageTitle: 'Unit Tests',
            subPageTitle: 'angularTest project'
        },

        coverageReporter: {type: 'html', dir: 'coverage/'}

    });
};
