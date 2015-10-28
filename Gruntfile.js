'use strict';
module.exports = function (grunt) {

    /**
     /**
     * Load required Grunt tasks. These are installed based on the versions listed
     * in `package.json` when you do `npm install` in this directory.
     */
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-compass');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-conventional-changelog');
    grunt.loadNpmTasks('grunt-bump');
    grunt.loadNpmTasks('grunt-karma');
    grunt.loadNpmTasks('grunt-ng-annotate');
    grunt.loadNpmTasks('grunt-html2js');
    grunt.loadNpmTasks('grunt-shell');
    grunt.loadNpmTasks('grunt-protractor-runner');
    grunt.loadNpmTasks('grunt-protractor-webdriver');
    grunt.loadNpmTasks('grunt-git');
    grunt.loadNpmTasks('grunt-debug-task');
    grunt.loadNpmTasks('grunt-usemin');
    grunt.loadNpmTasks('grunt-replace');
    

    /**
     * list with all external vendor files
     * @type {Array}
     */
    var vendorJSFiles = [];
    /**
     * recepie variable, read the recepie to get the specified modules and place them in app
     */
    var java2daysConfigFile = grunt.file.readJSON('modules.java2days.json');
    /**
     * this is used for fetching 1 by 1 each of the module so we can solve the dependencies
     */
    var tempConfigFile = {};
    var commonModuleDependencyFile = {};

    var src = [
        'vendor/*'
    ];
    grunt.file.expand({filter: 'isDirectory'}, src).forEach(function (path) {
        if (grunt.file.exists(path, 'bower.json')) {
            var result = grunt.file.readJSON(path + '/bower.json');
            if (result.main instanceof Array) {
                result.main.forEach(function (element) {
                    element = element.replace('\'', '');
                    element = element.replace('./', '');
                    vendorJSFiles.push(path + '/' + element);
                });
            } else {
                var element = result.main;
                element = element.replace('\'', '');
                element = element.replace('./', '');
                vendorJSFiles.push(path + '/' + element);
            }
        } else {
            console.log('no bower json found in: ' + path);
            var src = [
                path + '/*.js',
                '!' + path + '/*.min.js',
                path + '/*.css'
            ];
            grunt.file.expand({filter: 'isFile'}, src).forEach(function (filePath) {
                vendorJSFiles.push(filePath);
            });
        }
    });

    /**
     * Load in our build configuration file.
     */
    var userConfig = require('./build.config.js');;
    /**
     * This is the configuration object Grunt uses to give each plugin its
     * instructions.
     */
    var taskConfig = {
        /**
         * We read in our `package.json` file so we can access the package name and
         * version. It's already there, so we don't repeat ourselves here.
         */
        pkg: grunt.file.readJSON('package.json'),
        /**
         * The banner is the comment that is placed at the top of our compiled
         * source files. It is first processed as a Grunt template, where the `<%=`
         * pairs are evaluated based on this very configuration object.
         */
        meta: {
            banner: '/**\n' +
            ' * <%= pkg.name %> - v<%= pkg.version %> - <%= grunt.template.today("yyyy-mm-dd") %>\n' +
            ' * <%= pkg.homepage %>\n' +
            ' *\n' +
            ' * Copyright (c) <%= grunt.template.today("yyyy") %> <%= pkg.author %>\n' +
            ' * Licensed <%= pkg.licenses.type %> <<%= pkg.licenses.url %>>\n' +
            ' */\n'
        },
        /**
         * Creates a changelog on a new version.
         */
        changelog: {
            options: {
                dest: 'CHANGELOG.md',
                template: 'changelog.tpl'
            }
        },
        /**
         * this adds the possibility to debug the tasks in grunt usage
         * @example grunt debug test  = this will open chrome console and debug the task named test
         */
        debug: {
            options: {
                open: true // do not open node-inspector in Chrome automatically
            }
        },
        /**
         * Increments the version number, etc.
         */
        bump: {
            options: {
                files: [
                    'package.json',
                    'bower.json'
                ],
                commit: false,
                commitMessage: 'chore(release): v%VERSION%',
                commitFiles: [
                    'package.json',
                    'client/bower.json'
                ],
                createTag: false,
                tagName: 'v%VERSION%',
                tagMessage: 'Version %VERSION%',
                push: false,
                pushTo: 'origin'
            }
        },
        /**
         * The directories to delete when `grunt clean` is executed.
         * onuninstall target uninstalls business module
         */
        clean: {
            build: {
                src: ['<%= build_dir %>', '<%= compile_dir %>']
            },
            onuninstall: {
                expand: true,
                src: ['<%= grunt.task.current.args[0] %>'],
                cwd: 'src/app/'
            },
            sassmodules: {
                src: 'src/assets/sass/modules'
            },
            emptyProject: {
                src: ['src/app/myupc/**/*', 'src/common/general/**/*']
            }
        },
        /**
         * The `copy` task just copies files from A to B. We use it here to copy
         * our project assets (images, fonts, etc.) and javascripts into
         * `build_dir`, and then to copy the assets to `compile_dir`.
         */
        copy: {
            build_app_assets: {
                files: [
                    {
                        src: ['**/*.*','!sass/**/*.*'],
                        dest: '<%= build_dir %>/assets/',
                        cwd: 'src/assets',
                        expand: true
                    }
                ]
            },
            build_modules_assets: {
                files: [
                    {
                        src: ['app/myupc/**/*.json', 'common/**/*.json'],
                        dest: '<%= build_dir %>/assets/bundles/',
                        cwd: 'src',
                        expand: true,
                        flatten: true
                    }
                ]
            },
            build_appjs: {
                files: [
                    {
                        src: ['<%= app_files.js %>'],
                        dest: '<%= build_dir %>/',
                        cwd: '.',
                        expand: true
                    }
                ]
            },
            build_vendorjs: {
                files: [
                    {
                        src: [
                            vendorJSFiles
                        ],
                        dest: '<%= build_dir %>/',
                        cwd: '.',
                        expand: true
                    }
                ]
            },
            build_modulescss: {
                files: [
                    {
                        src: ['**/*.scss'],
                        dest: 'src/assets/sass/modules/',
                        cwd: 'src/app/myupc/',
                        expand: true,
                        flatten: true
                    },
                    {
                        src: ['**/*.scss'],
                        dest: 'src/assets/sass/modules/',
                        cwd: 'src/common/general/',
                        expand: true,
                        flatten: true
                    },
                    {
                        src: ['**/images/*.*'],
                        dest: '<%= build_dir %>/assets/images',
                        cwd: 'src/app/myupc/',
                        expand: true,
                        flatten: true
                    }
                ]
            },
            build_vendorcss: {
                files: [
                    {
                        src: [
                            '<%= vendor_custom_files.css %>'
                        ],
                        dest: '<%= build_dir %>/',
                        cwd: '.',
                        expand: true
                    }
                ]
            },
            compile_assets: {
                files: [
                    {
                        src: ['**/*.*','!css/**/*.*'],
                        dest: '<%= compile_dir %>/assets',
                        cwd: '<%= build_dir %>/assets',
                        expand: true
                    },
                    {
                        src: [
                            '<%= vendor_custom_files.css %>'
                        ],
                        dest: '<%= compile_dir %>/',
                        cwd: '.',
                        expand: true
                    }
                ]
            },
            index_html: {
                src: '<%= build_dir %>/index.html',
                dest: '<%= compile_dir %>/index.html'
            },
        },

        /**
         * `grunt concat` concatenates multiple source files into a single file.
         */
        concat: {
            options: {
                banner: '<%= meta.banner %>'
            },
            dist: {}
        },
        /**
         * `ngAnnotate` annotates the sources before minifying. That is, it allows us
         * to code without the array syntax.
         */
        ngAnnotate: {
            compile: {
                files: [
                    {
                        src: ['<%= app_files.js %>'],
                        cwd: '<%= build_dir %>',
                        dest: '<%= build_dir %>',
                        expand: true,
                        add: true,
                        remove: true,
                        enable: true
                    },
                    {
                        src: ['<%= vendor_files.js %>', '<%= vendor_custom_files.js %>'],
                        cwd: '<%= build_dir %>',
                        dest: '<%= build_dir %>',
                        expand: true,
                        add: true,
                        remove: true,
                        enable: true
                    }
                ]
            }
        },
        uglify: {
            options: {
                mangle:true
            }
        },
        /**
         * HTML2JS is a Grunt plugin that takes all of your template files and
         * places them into JavaScript files as strings that are added to
         * AngularJS's template cache. This means that the templates too become
         * part of the initial payload as one JavaScript file. Neat!
         */
        html2js: {
            /**
             * These are the templates from `src/app`.
             */
            app: {
                options: {
                    base: 'src/app'
                },
                src: ['<%= app_files.atpl %>'],
                dest: '<%= build_dir %>/templates-app.js'
            },
            /**
             * These are the templates from `src/common`.
             */
            common: {
                options: {
                    base: 'src/common'
                },
                src: ['<%= app_files.ctpl %>'],
                dest: '<%= build_dir %>/templates-common.js'
            },
            vendor_custom: {
                options: {
                    base: ''
                },
                src: ['<%= app_files.vctpl %>'],
                dest: '<%= build_dir %>/templates-vendor_custom.js'
            }
        },
        /**
         * The Karma configurations.
         */
        karma: {
            unit: {
                basePath: '../',
                configFile: 'karma/karma.conf.js',
                options: {
                    frameworks: ['jasmine'],
                    singleRun: true,
                    browsers: ['PhantomJS'],
                    files: [
                        'vendor/angular/angular.js',
                        'vendor/angular-mocks/angular-mocks.js',
                        'karma/tests/*.tests.js',
                        'src/**/*.js'
                    ]
                }
            },
            continuous: {
                singleRun: true
            }
        },
        protractor: {
            options: {
                configFile: "karma/protractorConf.js", // Default config file
                keepAlive: true, // If false, the grunt process stops when the test fails.
                noColor: false, // If true, protractor will not use colors in its output.
                args: {
                    // Arguments passed to the command
                }
            },
            run: {// Grunt requires at least one target to run so you can simply put 'all: {}' here too.
                options: {
//                configFile: "e2e.conf.js", // Target-specific config file
                    args: {} // Target-specific arguments
                }
            }
        },
        protractor_webdriver: {
            run: {
                options: {
                    keepAlive: true,
                    path: 'node_modules/protractor/bin/',
                    command: 'webdriver-manager start --standalone'
                }
            }
        },
        sass: {
            build: {
                options: {
                    compass: true
                },
                files: {
                    '<%= build_dir %>/assets/css/style.css': '<%= app_files.scss %>'
                }
            },
            compile: {
                files: {
                    '<%= build_dir %>/assets/<%= pkg.name %>-<%= pkg.version %>.css': '<%= app_files.scss %>'
                },
                options: {
                    style: 'compressed'
                }
            }
        },
        /**
         * The `index` task compiles the `index.html` file as a Grunt template. CSS
         * and JS files co-exist here but they get split apart later.
         */
        index: {
            /**
             * During development, we don't want to have wait for compilation,
             * concatenation, minification, etc. So to avoid these steps, we simply
             * add all script files directly to the `<head>` of `index.html`. The
             * `src` property contains the list of included files.
             */
            build: {
                dir: '<%= build_dir %>',
                src: [
                    vendorJSFiles,
                    '<%= build_dir %>/src/**/*.js',
                    '<%= html2js.common.dest %>',
                    '<%= html2js.app.dest %>',
                    '<%= html2js.vendor_custom.dest %>',
                    '<%= build_dir %>/assets/css/style.css'
                ]
            }
        },
        /**
         * This task compiles the karma template so that changes to its file array
         * don't have to be managed manually.
         */
        karmaconfig: {
            unit: {
                dir: '<%= build_dir %>',
                src: [
                    '<%= vendor_custom_files.js %>',
                    '<%= html2js.app.dest %>',
                    '<%= html2js.common.dest %>',
                    '<%= test_files.js %>'
                ]
            }
        },
        useminPrepare: {
            html: '<%= build_dir %>/index.html',
            options: {
                dest: '<%= compile_dir %>'
            }
        },
        usemin: {
            html: '<%= compile_dir %>/index.html'
        },
        replace: {
            dist: {
                options: {
                    patterns: [
                        {
                            match: 'moduleDependencies',
                            replacement: JSON.stringify(generateDependencies())
                        }
                    ]
                },
                files: [
                    {
                        expand: true,
                        flatten: true,
                        src: ['src/app/base/app.js'],
                        dest: 'dist/src/app/base'
                    }
                ]
            }
        }
    };

    /**
     * The `compile` task gets your app ready for deployment by concatenating and
     * minifying your code.
     */
    grunt.registerTask('jsar', [
        'build',
        'copy:compile_assets',
        'ngAnnotate',
        'copy:index_html',
        'useminPrepare',
        'concat',
        'ngAnnotate',
        'uglify',
        'cssmin',
        'usemin'
    ]);

    grunt.registerTask('test', [
        'karma:unit'
    ]);


    grunt.initConfig(grunt.util._.extend(taskConfig, userConfig));


    /**
     * The default task is to build and compile.
     */
    grunt.registerTask('default', ['build', 'compile']);

    /**
     * The `build` task gets your app ready to run for development and testing.
     */
    grunt.registerTask('build', [
        'clean:build',
        //'getJSFilesBower',
        'html2js',
        //'concat:build_css',
        'copy:build_modulescss',
        'copy:build_app_assets',
        'copy:build_modules_assets',
        'copy:build_appjs',
        'copy:build_vendorjs',
        'buildMenu',
        //'copy:build_vendorcss',
        'sass:build',
        'clean:sassmodules',
        'index:build',
        'replace'
    ]);


    grunt.registerTask('build_sass', ['copy:build_modulescss', 'sass:build']);
    grunt.registerTask('compile_sass', ['sass:compile']);


    /**
     * A utility function to get all app JavaScript sources.
     */
    function filterForJS(files) {
        return files.filter(function (file) {
            return file.match(/\.js$/);
        });
    }

    /**
     * A utility function to get all app CSS sources.
     */
    function filterForCSS(files) {
        return files.filter(function (file) {
            return file.match(/\.css$/);
        });
    }

    /**
     * The index.html template includes the stylesheet and javascript sources
     * based on dynamic names calculated in this Gruntfile. This task assembles
     * the list into variables for the template to use and then runs the
     * compilation.
     */
    grunt.registerMultiTask('index', 'Process index.html template', function () {
        var dirRE = new RegExp('^(' + grunt.config('build_dir') + '|' + grunt.config('compile_dir') + ')\/', 'g');
        var jsFiles = filterForJS(this.filesSrc).map(function (file) {
            return file.replace(dirRE, '');
        });
        var cssFiles = filterForCSS(this.filesSrc).map(function (file) {
            return file.replace(dirRE, '');
        });

        grunt.file.copy('src/index.html', this.data.dir + '/index.html', {
            process: function (contents, path) {
                return grunt.template.process(contents, {
                    data: {
                        scripts: jsFiles,
                        styles: cssFiles,
                        version: grunt.config('pkg.version')
                    }
                });
            }
        });
    });

    /**
     * In order to avoid having to specify manually the files needed for karma to
     * run, we use grunt to manage the list for us. The `karma/*` files are
     * compiled as grunt templates for use by Karma. Yay!
     */
    grunt.registerMultiTask('karmaconfig', 'Process karma config templates', function () {
        var jsFiles = filterForJS(this.filesSrc);

        grunt.file.copy('karma/karma-unit.tpl.js', grunt.config('build_dir') + '/karma-unit.js', {
            process: function (contents, path) {
                return grunt.template.process(contents, {
                    data: {
                        scripts: jsFiles
                    }
                });
            }
        });
    });
    grunt.registerTask('getJSFilesBower', function () {

        function callback(abspath, rootdir, subdir, filename) {

            if (filename === 'bower.json') {
                var result = grunt.file.readJSON(abspath);
                var absPathCutted = abspath.replace('bower.json', '');
                if (result.main instanceof Array) {
                    result.main.forEach(function (element) {
                        element = element.replace('\'', '');
                        element = element.replace('./', '');
                        vendorJSFiles.push(absPathCutted + element);
                    });
                } else {
                    var element = result.main;
                    element = element.replace('\'', '');
                    element = element.replace('./', '');
                    vendorJSFiles.push(absPathCutted + element);
                }
            }
        }

        grunt.file.recurse('vendor', callback);
        //console.log(vendorJSFiles);
    });

    grunt.registerTask('firstInstall', [
        'emptyProject',
        'installModules',
        'build'
    ]);

    grunt.registerTask('installModules', function () {
        grunt.task.run('upcModulesInstall');
        grunt.task.run('commonModulesInstall');
    });


    grunt.registerTask('upcModulesInstall', function () {
        tempConfigFile = java2daysConfigFile;
        grunt.config.set('gitclone', tempConfigFile);
        grunt.task.run('gitclone');
    });

    grunt.registerTask('commonModulesInstall', function () {

        //create the
        grunt.config.set('gitclone', tempConfigFile);

        var keys = Object.keys(java2daysConfigFile);

        for (var i = 0; i < keys.length; i++) {
            //console.log(keys[i] + "=" + JSON.stringify(java2daysConfigFile[keys[i]]));


            try {
                var moduleDependencies = grunt.file.readJSON(java2daysConfigFile[keys[i]].options.directory + '/moduleDependencies.json');
            }
            catch (err) {
                continue;
            }

            //console.log('DEPENDENCIES FROM '+ java2daysConfigFile[keys[i]].options.directory + '/moduleDependencies.json   ' + JSON.stringify(moduleDependencies));
            var moduleDependenciesKeys = Object.keys(moduleDependencies);

            var dependExists = false;
            for (var j = 0; j < moduleDependenciesKeys.length; j++) {
                dependExists = false;
                var storedDependenciesKeys = Object.keys(commonModuleDependencyFile);


                for (var k = 0; k < storedDependenciesKeys.length; k++) {
                    if (moduleDependencies[moduleDependenciesKeys[j]] == commonModuleDependencyFile[storedDependenciesKeys[k]]) {
                        dependExists = true;
                    }
                }
                if (!dependExists) {
                    commonModuleDependencyFile[moduleDependenciesKeys[j]] = moduleDependencies[moduleDependenciesKeys[j]];
                } else {
                    console.log("This should not happen at this stage");
                }
            }
        }

        //console.log("DEPENDENCIES: " + JSON.stringify(commonModuleDependencyFile));

        //set the credentials
        for (var key in commonModuleDependencyFile) {
            commonModuleDependencyFile[key].options.repository = commonModuleDependencyFile[key].options.repository.replace('username', credentials.username);
            commonModuleDependencyFile[key].options.repository = commonModuleDependencyFile[key].options.repository.replace('password', credentials.password);
        }
        grunt.config.set('gitclone', commonModuleDependencyFile);

        grunt.task.run('gitclone');
    });

    grunt.registerTask('emptyProject', function () {
        grunt.task.run('clean:emptyProject');
    });

    var menuItemList = [];
    grunt.registerTask('buildMenu', function () {
        grunt.file.recurse('src/app', populateMenuItemsFile);
        grunt.file.recurse('src/common', populateMenuItemsFile);
        grunt.file.write('dist/assets/bundles/mainMenuItems.json', JSON.stringify(menuItemList));
    });

    function populateMenuItemsFile(abspath, rootdir, subdir, filename) {
        if (filename.indexOf('menu.json') > -1) {
            var file = grunt.file.readJSON(abspath);
            menuItemList.push(file);
        }
    }

    //////////////////////////////////////////////////////////
    //Install module dependencies for the application
    //////////////////////////////////////////////////////////
    function generateDependencies(){
        var depsNotNeeded = ['base', 'skin', 'common.camera'];
        var dependencieKeys = Object.keys(java2daysConfigFile);
        var modules = new Array();
        for(var i = 0, dep; dep = dependencieKeys[i]; i++){
            var module = new Object();
            module.name = java2daysConfigFile[dep].options.hasOwnProperty('module') ? java2daysConfigFile[dep].options.module : dep;
            try {
                var moduleDependencies = grunt.file.readJSON(java2daysConfigFile[dep].options.directory + '/moduleDependencies.json');
                module.dependsOf = separateSubDependenciesByModuleName(moduleDependencies);
            }
            catch (err) {
                //directory not found
            }
            modules.push(module);
        }
        var allModules = removeDependenciesDuplicates(modules);
        var cleanModules = removeNotNestedDependencies(allModules);
        return cleanModules.sort();
    }

    function removeDependenciesDuplicates(allModules){
        var subDependencies = new Array();
        for(var i = 0, module; module = allModules[i]; i++){
            if(module.hasOwnProperty('dependsOf')){
                for(var j = 0, subModule; subModule = module.dependsOf[j]; j++){
                    if(subDependencies.indexOf(subModule) == -1){
                        subDependencies.push(subModule);
                    }
                }
                delete module.dependsOf;
            }
            subDependencies.push(module.name);
        }
        return subDependencies;
    }

    function separateSubDependenciesByModuleName(allModules){
        var depends = new Array();
        for(var key in allModules){
            var depName = allModules[key].options.hasOwnProperty("module") ?  allModules[key].options.module : key;
            depends.push(depName);
        }
        return depends;
    }

    function removeNotNestedDependencies(allModules){
        var depsNotNeeded = ['base', 'skin', 'common.camera'];
        var cleanModules = new Array();
        for(var i = 0, module; module = allModules[i]; i++){
            if(depsNotNeeded.indexOf(module) == -1){
                cleanModules.push(module)
            }
        }
        return cleanModules;
    }


};
