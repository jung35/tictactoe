module.exports = function(grunt) {

    grunt.config.set('sass', {
        dev: {
            files: [
                {
                    expand: true,
                    cwd: 'assets/styles/',
                    src: ['style.scss'],
                    dest: '.tmp/public/styles/',
                    ext: '.css'
                }
            ],
            options: {
                style: 'compressed',
                loadPath: [
                    'bower_components/bootstrap-sass-official/assets/stylesheets'
                ]
            }
        }
    });

    grunt.loadNpmTasks('grunt-contrib-sass');
};
