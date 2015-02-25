module.exports = function(grunt) {

  grunt.config('clean', {
    build: ['tmp'],
  });

  grunt.loadNpmTasks('grunt-contrib-clean');

};
