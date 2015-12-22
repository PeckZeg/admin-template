/**
 *  @fileOverview Grunt Config File
 *  @author PeckZeg
 *  @version 2015-12-11
 */

const loadGruntTasks = require('load-grunt-tasks');
const config = require('../config');
const gruntProfile = require('./grunt-profile');

module.exports = function(grunt) {
    grunt.initConfig(gruntProfile.config);
    gruntProfile.registerTasks(grunt);
    require('load-grunt-tasks')(grunt);
    grunt.registerTask('default', [
        'compass',
        'rename',
        'autoprefixer',
        'cssmin',
        'clean',
        'watch'
    ]);
};