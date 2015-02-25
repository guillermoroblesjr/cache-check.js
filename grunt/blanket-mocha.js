module.exports = function(grunt) {

  grunt.config('blanket_mocha', {
    test: {
        src: ['./tests/test.html'],
        options : {
            threshold : 60,
            globalThreshold : 65,
            log : true,
            logErrors: true,
            moduleThreshold : 60,
            modulePattern : "./app/src/(.*?)/",
            customThreshold: {
                './app/src/spelling/plurals.js': 50
            }
        }
    }
  });

  grunt.loadNpmTasks('grunt-blanket-mocha');
  grunt.registerTask('coverage', ['blanket_mocha']);
  
};
