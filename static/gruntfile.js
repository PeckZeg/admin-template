/**
 *  @fileOverview Grunt Config File
 *  @author PeckZeg
 *  @version 2015-12-11
 */

const load_grunt_tasks = require('load-grunt-tasks');
const config = require('../config');
const grunt_config = require('./grunt-config');

module.exports = function(grunt) {
    grunt.registerTask('scss/global', ['compass:a', 'rename:a', 'watch:a']);
    
    grunt.initConfig({
        compass: {
            a: {
                options: {
                    sassDir: 'src/scss-bootstrap',
                    specify: 'src/scss-bootstrap/1.scss',
                    cssDir: 'dest/css',
                    noLineComments: true
                }
            }
        },

        rename: {
            a: {
                files: [{
                    src: 'dest/css/1.css',
                    dest: 'dest/css/a.css'
                }]
            }
        },

        watch: {
            a: {
                files: [
                    'src/scss-bootstrap/**/*.scss'
                ],

                tasks: ['scss/global']
            }
        }
    });

    load_grunt_tasks(grunt);

    grunt.registerTask('default', [
        'scss/global'
    ]);
};