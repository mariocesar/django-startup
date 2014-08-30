'use strict';

module.exports = function (grunt) {
    // load all grunt tasks
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    // configurable paths
    var staticsConfig = {
        src: 'src',
        dist: 'dist'
    };

    grunt.initConfig({
        config: staticsConfig,
        watch: {
            less: {
                files: ['<%= config.src %>/styles/**/*.less'],
                tasks: ['clean:styles', 'less']
            },
            coffee: {
                files: ['<%= config.src %>/coffee/**/*.coffee'],
                tasks: ['coffee']
            },
            uglify: {
                files: ['<%= config.src %>/scripts/**/*.js'],
                tasks: ['clean:scripts', 'uglify']
            },
            images: {
                files: ['<%= config.src %>/images/**/*'],
                tasks: ['clean:images', 'imagemin', 'copy']
            }
        },
        clean: {
            styles: [ '<%= config.dist %>/styles/' ],
            scripts: [ '<%= config.dist %>/scripts/' ],
            images: [ '<%= config.dist %>/images/']
        },
        less: {
            development: {
                options: {
                    compress: false,
                    optimization: 1,
                    sourceMap: false,
                    outputSourceFiles: true
                },
                files: {
                    '<%= config.dist %>/styles/main.css': ['<%= config.src %>/styles/main.less']
                }
            },
            production: {
                options: {
                    compress: true,
                    report: 'min',
                    optimization: 5,
                    cleancss: true,
                    outputSourceFiles: false
                },
                files: {
                    '<%= config.dist %>/styles/main.min.css': ['<%= config.src %>/styles/main.less']
                }
            }
        },
        coffee: {
            compile: {
                expand: true,
                flatten: true,
                compile: true,
                cwd: '<%= config.src %>/coffee/',
                src: '**/*.coffee',
                dest: '<%= config.src %>/scripts/',
                ext: '.js'
            }
        },
        uglify: {
            options: {
                report: 'min'
            },
            scripts: {
                expand: true,
                cwd: '<%= config.src %>/scripts',
                src: '**/*.js',
                dest: '<%= config.dist %>/scripts',
                ext: '.min.js'
            }
        },
        imagemin: {
            dist: {
                files: [
                    {
                        expand: true,
                        cwd: '<%= config.src %>/images',
                        src: '{,*/}*.{png,jpg,jpeg}',
                        dest: '<%= config.dist %>/images'
                    }
                ]
            }
        },
        copy: {
            dist: {
                files: [
                    {
                        expand: true,
                        dot: true,
                        cwd: '<%= config.src %>',
                        dest: '<%= config.dist %>',
                        src: [
                            '*.{ico,txt}',
                            'fonts/**/*',
                            'scripts/**/*',
                            'images/**/*'
                        ]
                    }
                ]
            }
        },
        concurrent: {
            dist: [
                'less',
                'coffee',
                'imagemin',
            ]
        }
    });

    grunt.renameTask('regarde', 'watch');

    grunt.registerTask('build', [
        'clean',
        'concurrent',
        'uglify',
        'copy'
    ]);

    grunt.registerTask('default', [
        'build',
        'watch'
    ]);
};
