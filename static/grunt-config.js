/**
 *  @fileOverview Generate Grunt Config
 *  @author PeckZeg
 *  @version 2015-11-27 替换 `underscore` 为 `lodash`
 *           2015-10-01
 */

const glob = require('glob');
const path = require('path');
const _ = require('lodash');
const global_config = require('../config');

const ROOT = './tasks';

const set_config = function(module_name, module_tasks, config) {
    _.each(module_tasks, function(task_config, task_name) {
        config[task_name] = config[task_name] || {};
        config[task_name][module_name] = task_config;
    });
};

var config = module.exports = {
    watch: {
        options: {
            livereload: global_config.livereload.port
        }
    }
};

glob.sync('*', { cwd: ROOT, nodir: true }).forEach(function(file_name) {
    var module_name = file_name.replace(/\.js$/, '').replace(/-/g, '_'),
        module_tasks = require(path.join(__dirname, ROOT, file_name));

    set_config(module_name, module_tasks, config);
});

glob.sync('*/', { cwd: ROOT }).forEach(function(folder_name) {
    var module_pathname = path.join(__dirname, ROOT, folder_name),
        module_name = folder_name.replace(/\//g, '');

    glob.sync('*', { cwd: module_pathname, nodir: true }).forEach(function(file_name) {
        var module_tasks = require(path.join(module_pathname, file_name)),
            module_name_full = file_name.replace(/\.js$/, '')
                                   .replace(/^(\w+)-(\w+)/, '$1_' + module_name + '_$2')
                                   .replace(/-/g, '_');

        set_config(module_name_full, module_tasks, config);
    });
});