/**
 *  @fileOverview Grunt Config Generator
 *  @author PeckZeg
 *  @version 2015-12-22
 */

const TASKS_DIR = './tasks';

const glob = require('glob');
const path = require('path');
const _ = require('lodash');
const globalConfig = require('../config');

function setConfig(config, moduleName, moduleTasks) {
    _.each(moduleTasks, function(taskConfig, taskName) {
        _.set(config, taskName + '.' + moduleName, taskConfig);
    });
}

var config = module.exports = {
    watch: {
        options: {
            livereload: globalConfig.livereload.port
        }
    }
};

var tasks = { };

glob.sync('*', { cwd: TASKS_DIR, nodir: true }).forEach(function(fileName) {
    var ext = path.extname(fileName),
        moduleName = path.basename(fileName, ext),
        moduleTasks = require(path.join(__dirname, TASKS_DIR, fileName)),
        taskName = 'task/' + moduleName.replace(/-/g, '/'),
        tasks = _(moduleTasks).keys().map(function(subModuleName) {
            return subModuleName + ':' + moduleName;
        }).value();

    setConfig(config, moduleName, moduleTasks);

    console.log(taskName, tasks)
});



console.log(JSON.stringify(config, null, 2));