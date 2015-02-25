module.exports = function(grunt) {

  grunt.config('copy', {
    main: {
      files: [
        // includes files within path and its sub-directories
       {expand: true, flatten: false, src: ['app/**'], dest: 'tmp/', filter: 'isFile'},

        // flattens results to a single level
        {expand: false, flatten: true, src: ['app/*'], dest: 'tmp/', filter: 'isFile'},
      ]
    }
  });

  grunt.loadNpmTasks('grunt-contrib-copy');

};
