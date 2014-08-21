module.exports = function(grunt) {
    // Project Configuration
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        //npm install grunt-ftp-deploy --save-dev
        'ftp-deploy': {
            build: {
                auth: {
                    host: 'view.ui.naver.com',
                    port: 2001,
                    authKey:'key1'
                },
                src: './',
                dest: 'ftpTest/nt10926',
                exclusions: ['./node_modules','./node_modules/*','./.git/*','.ftppass','.gitignore']
            }
        }
    });

    grunt.loadNpmTasks('grunt-ftp-deploy');

    grunt.task.registerTask('default',['ftp-deploy']);
};