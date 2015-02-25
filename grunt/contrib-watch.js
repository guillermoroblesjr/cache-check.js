module.exports = function(grunt) {

  grunt.config('watch', {
    livereload: {
      options: {
        livereload: true,
      },
      files: ['app/**/*'],
      tasks: [],
    },
    jshint: {
      files: ['<%= jshint.config.src %>', '<%= jshint.app.src %>'],
      tasks: ['jshint']
    }
  });

  grunt.loadNpmTasks('grunt-contrib-watch');

};
