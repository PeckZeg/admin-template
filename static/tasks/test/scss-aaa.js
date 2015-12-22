/**
 *  @fileOverview Bootstrap v3.3.5
 *  @author PeckZeg
 *  @version 2015-12-11
 */

module.exports = {
    compass: {
        options: {
            // clean: true,
            sassDir: 'src/scss-bootstrap',
            specify: 'src/scss-bootstrap/aaa.scss',
            cssDir: 'dest/css',
            outputStyle: 'compressed',
            noLineComments: true,
        }
    },

    rename: {
        files: [
            {
                src: ['dest/css/aaa.css'],
                dest: 'dest/css/aaa.3.3.5.min.css'
            }
        ]
    },

    watch: {
        files: [
            'src/scss-bootstrap/**/*.scss',
        ],

        tasks: ['task/scss/test/aaa']
    }
};