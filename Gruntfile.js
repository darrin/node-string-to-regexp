module.exports = function (grunt) {
    'use strict';

    var jsFiles = ['Grunfile.js', '*.js', 'tests/*.js', 'bin/*.js'];

    // ===========================================================================
    // CONFIGURE GRUNT ===========================================================
    // ===========================================================================
    grunt.initConfig({

        // get the configuration info from package.json ----------------------------
        // this way we can use things like name and version (pkg.name)
        pkg: grunt.file.readJSON('package.json'),

        nodeunit: {
            all: ['tests/*.test.js'],
            options: {
                reporter: 'junit',
                reporterOptions: {
                    output: './build/reports/nodeunit/'
                }
            }
        },

        // configure jshint to validate js files -----------------------------------
        jshint: {
            options: {
                jshintrc: '.jshintrc',
                reporter: require('jshint-stylish')
            },
            all: jsFiles
        },

        watch: {
            options: {
                atBegin : true
            },
            jshint: {
                files: [jsFiles],
                tasks: ['jshint']
            },
            nodeunit: {
                files: [jsFiles],
                tasks: ['nodeunit']
            }
        }, // watch

        concurrent: {
            // Restart the server
            dev: {
                tasks: ['watch:jshint', 'watch:nodeunit'],
                options: {
                    logConcurrentOutput: true
                }
            }
        } // concurrent
    });

    require('load-grunt-tasks')(grunt);

    
    grunt.registerTask('ci', '', function () {
        var taskList = [
            'concurrent:dev'
        ];
        grunt.task.run(taskList);
    });

    grunt.registerTask('default', '', 'ci');
};

