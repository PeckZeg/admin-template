/**
 *  @fileOverview Grunt Profile Generator
 *  @author PeckZeg
 *  @version 2015-12-22
 *               * 新增导出 tasks 列表
 *               * 增加一个批量注册 task 的方法
 *      2015-12-21
 */

const TASKS_DIR = './tasks';

const glob = require('glob');
const path = require('path');
const _ = require('lodash');
const globalConfig = require('../config');

function setConfig(targetName, targetTasks) {
    _.each(targetTasks, function(task, taskName) {
        _.set(profile.config, taskName + '.' + targetName, task);
    });
}

function setTask(targetName, targetTasks) {
    var taskName = 'task/' + targetName.replace(/-/g, '/'),
        taskList = _(targetTasks).keys().map(function(taskName) {
            if (taskName != 'watch') return taskName + ':' + targetName;
        }).compact().value();

    _.set(profile.tasks, taskName, taskList);
}

var profile = module.exports = {
    config: {
        watch: {
            options: {
                livereload: globalConfig.livereload.port
            }
        }
    },

    tasks: { },

    registerTasks: function(grunt) {
        _.each(this.tasks, function(taskList, taskName) {
            grunt.registerTask(taskName, taskList);
        });
    }
};

glob.sync('*', { cwd: TASKS_DIR, nodir: true }).forEach(function(fileName) {
    var extname = path.extname(fileName),
        targetName = path.basename(fileName, extname),
        targetTasks = require(path.join(__dirname, TASKS_DIR, fileName));

    setConfig(targetName, targetTasks);
    setTask(targetName, targetTasks);
});

glob.sync('*/', { cwd: TASKS_DIR }).forEach(function(folderName) {
    var targetDir = path.join(__dirname, TASKS_DIR, folderName),
        moduleNmae = folderName.replace(/\//g, '');

    glob.sync('*', { cwd: targetDir, nodir: true }).forEach(function(fileName) {
        var targetTasks = require(path.join(targetDir, fileName)),
            extname = path.extname(fileName),
            targetName = path.basename(fileName, extname).split('-');

        targetName.splice(1, 0, moduleNmae);
        targetName = targetName.join('-');

        setConfig(targetName, targetTasks);
        setTask(targetName, targetTasks);
    });
});