module.exports = function(grunt) {

  grunt.config('connect', {
    options: {
      hostname: 'localhost',
      livereload: true,
    },
    dev: {
      options: {
        base: 'tmp/app',
        port: 8000,
        open: true
      }
    },
    tests: {
      options: {
        base: ['.', './tests'],
        port: 8001,
        open: true
      }
    },
    prod: {
      options: {
        keepalive: true,
      },
    },
  });

  grunt.loadNpmTasks('grunt-contrib-connect');

};
