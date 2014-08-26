'use strict';

module.exports = function (grunt) {
    // load all grunt tasks
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    // configurable paths
    var config = {
        app: 'src',
        dist: 'dist'
    };

    grunt.initConfig({
        config: config,
        watch: {
            recess: {
                files: ['<%= config.app %>/styles/{,*/}*.less'],
                tasks: ['recess']
            }
        },
        clean: {
            dist: {
                files: [
                    {
                        dot: true,
                        src: [
                            '.tmp',
                            '<%= config.dist %>/*'
                        ]
                    }
                ]
            },
            server: '.tmp'
        },
        recess: {
            dist: {
                options: {
                    compile: true
                },
                files: {
                    '<%= config.app %>/styles/main.css': ['<%= config.app %>/styles/main.less']
                }
            }
        },
        rev: {
            dist: {
                files: {
                    src: [
                        '<%= config.dist %>/scripts/{,*/}*.js',
                        '<%= config.dist %>/styles/{,*/}*.css',
                        '<%= config.dist %>/images/{,*/}*.{png,jpg,jpeg,gif,webp}',
                        '<%= config.dist %>/fonts/*'
                    ]
                }
            }
        },
        imagemin: {
            dist: {
                files: [
                    {
                        expand: true,
                        cwd: '<%= config.app %>/images',
                        src: '{,*/}*.{png,jpg,jpeg}',
                        dest: '<%= config.dist %>/images'
                    }
                ]
            }
        },
        svgmin: {
            dist: {
                files: [
                    {
                        expand: true,
                        cwd: '<%= config.app %>/images',
                        src: '{,*/}*.svg',
                        dest: '<%= config.dist %>/images'
                    }
                ]
            }
        },
        cssmin: {
            dist: {
                files: {
                    '<%= config.dist %>/styles/main.css': [
                        '.tmp/styles/{,*/}*.css',
                        '<%= config.app %>/styles/{,*/}*.css'
                    ]
                }
            }
        },
        copy: {
            dist: {
                files: [
                    {
                        expand: true,
                        dot: true,
                        cwd: '<%= config.app %>',
                        dest: '<%= config.dist %>',
                        src: [
                            '*.{ico,txt}',
                            'fonts/*',
                            '.htaccess',
                            'images/{,*/}*.{webp,gif}'
                        ]
                    }
                ]
            }
        },
        concurrent: {
            dist: [
                'recess',
                'imagemin',
                'svgmin'
            ]
        }
    });

    grunt.renameTask('regarde', 'watch');

    grunt.registerTask('build', [
        'clean:dist',
        'concurrent',
        'cssmin',
        'uglify',
        'copy',
        'rev',
    ]);

    grunt.registerTask('default', [
        'build',
        'watch'
    ]);
};
