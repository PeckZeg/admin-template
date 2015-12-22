/**
 *  @fileOverview Bootstrap v3.3.5 (改
 *  @author PeckZeg
 *  @version 2015-12-22
 */

module.exports = {
    compass: {
        options: {
            sassDir: 'src/scss-bootstrap',
            specify: 'src/scss-bootstrap/!.scss',
            cssDir: 'dest/css/bootstrap',
            noLineComments: true,
        }
    },

    rename: {
        files: [{
            src: ['dest/css/bootstrap/!.css'],
            dest: 'dest/css/bootstrap.css'
        }]
    },

    autoprefixer: {
        options: {
            browsers: ['last 5 versions', 'ie 7', 'ie 8', 'ie 9'],
            map: true
        },
        src: '<%= rename["scss-bootstrap"].files[0].dest %>',
        dest: '<%= rename["scss-bootstrap"].files[0].dest %>',
    },

    cssmin: {
        options: {
            shorthandCompacting: false,
            roundingPrecision: -1
        },

        files: [{
            src: '<%= rename["scss-bootstrap"].files[0].dest %>',
            dest: 'dest/css/bootstrap.min.css'
        }],
    },

    clean: {
        src: ['<%= compass["scss-bootstrap"].options.cssDir %>']
    },

    watch: {
        files: [
            'src/scss-bootstrap/**/*.scss',
        ],

        tasks: ['task/scss/bootstrap']
    }
};